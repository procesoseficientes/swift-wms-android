import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-wave-picking-dispatch-confirm",
    templateUrl: "wave-picking-dispatch-confirm.html"
})
export class WavePickingDispatchConfirmPage {
    scanToken: Subscription;
    inputSearch: string;
    scanData: string;
    isAndroid: boolean = false;
    wavePickingForLicenseDispatch: DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH = Model.Factory.createWavePickingForLicenseDispatch();
    licenseDispatch: Array<Model.LicenseDispatchExit> = [];
    completedLicenses: number = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private device: DeviceProvider,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private picking: PickingProvider,
        private settings: UserSettingsProvider,
        private configuration: ConfigurationProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter(): void {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );
        let params = <Model.WavePickingLicenseDispatchParams>this.navParams
            .data;
        if (params.wavePickingForLicenseDispatch) {
            this.wavePickingForLicenseDispatch =
                params.wavePickingForLicenseDispatch;
            this.showPage();
        } else {
            this.backButtonAction();
        }
        this.userInteraction.hideLoading();
    }

    processBarcodeScan(scanData: string): Promise<boolean> {
        let licenseCode = scanData.split("-");
        let licenseId =
            licenseCode.length > 0 ? Number(licenseCode[0]) : Number(scanData);
        if (isNaN(licenseId)) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InvalidInput,
                scanData
            );
            return Promise.resolve(false);
        }
        let licenseTemp = this.licenseDispatch.find(l => {
            return l.licenseId == licenseId && l.showScanIcon;
        });
        if (!licenseTemp) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes
                    .LicenseScannedDoesNotMatchWithLicenseDispatch
            );
            return Promise.resolve(false);
        }
        this.scanData = scanData.split("-")[0];
        this.inputSearch = scanData.split("-")[0];
        this.completedLicense();
        return Promise.resolve(true);
    }

    completedLicense() {
        let license = +this.inputSearch;
        let licenseTemp = this.licenseDispatch.find(l => {
            return l.licenseId == license && l.showScanIcon;
        });
        if (licenseTemp) {
            licenseTemp.showScanIcon = false;
            licenseTemp.isComplete = true;
            this.checkLicenses();
        } else {
            this.checkLicenses();
        }
    }

    checkLicenses() {
        this.completedLicenses = 0;
        this.licenseDispatch.forEach(licenseOrgin => {
            if (licenseOrgin.isComplete) {
                this.completedLicenses += 1;
            }
        });
        let licenseTemp = this.licenseDispatch.find(l => {
            return !l.isComplete;
        });

        if (licenseTemp) {
            licenseTemp.showScanIcon = true;
        }
    }

    checkCompletedLicenses(): boolean {
        let completedScanLicenses: boolean = true;
        this.licenseDispatch.forEach(licenseOrgin => {
            if (completedScanLicenses) {
                if (!licenseOrgin.isComplete) {
                    completedScanLicenses = false;
                }
            }
        });
        return completedScanLicenses;
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    backButtonAction(): Promise<any> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }

    private async showPage(): Promise<void> {
        let licenseDispatchForPicking: Array<
            DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING
        > = await this.getWavePickingForLicenseDispatch();
        if (licenseDispatchForPicking.length > 0) {
            let correlative: number = 1;
            licenseDispatchForPicking.forEach(licenseOrgin => {
                let licenseTemp = this.licenseDispatch.find(l => {
                    return l.licenseId == licenseOrgin.LICENSE_ID;
                });
                if (licenseTemp) {
                    let detail: Model.DetailLicenseDispatch = Model.Factory.createDetailLicenseDispatch();
                    detail.materialId = licenseOrgin.MATERIAL_ID;
                    detail.materialName = licenseOrgin.MATERIAL_NAME;
                    detail.qty = licenseOrgin.QTY;
                    detail.qtyOrigin = licenseOrgin.QTY_ORIGIN;
                    licenseTemp.detail.push(detail);
                } else {
                    let license: Model.LicenseDispatchExit = Model.Factory.createLicenseDispatch();
                    license.licenseId = licenseOrgin.LICENSE_ID;
                    license.location = licenseOrgin.CURRENT_LOCATION;
                    license.pickedBy = licenseOrgin.LAST_UPDATED_BY;
                    license.correlative = correlative;
                    correlative += 1;
                    let detail: Model.DetailLicenseDispatch = Model.Factory.createDetailLicenseDispatch();
                    detail.materialId = licenseOrgin.MATERIAL_ID;
                    detail.materialName = licenseOrgin.MATERIAL_NAME;
                    detail.qty = licenseOrgin.QTY;
                    detail.qtyOrigin = licenseOrgin.QTY_ORIGIN;
                    license.detail.push(detail);

                    this.licenseDispatch.push(license);
                }
            });
            if (this.licenseDispatch.length > 0) {
                this.licenseDispatch[0].showScanIcon = true;
                this.userInteraction.hideLoading();
            } else {
                this.userInteraction.hideLoading();
            }

            let request = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.DispatchLicenseExit,
                Enums.ParameterId.ScanAllLicenses,
                this.settings.userCredentials
            );

            let parameter = await this.configuration.getParameter(request);

            if (
                parameter &&
                parameter.length &&
                Number(parameter[0].VALUE) === Enums.YesNo.Yes
            ) {
                this.licenseDispatch.forEach(licenseOrgin => {
                    licenseOrgin.showScanIcon = false;
                    licenseOrgin.isComplete = true;
                });
                this.completedLicenses = this.licenseDispatch.length;
            }
        } else {
            this.userInteraction.hideLoading();
        }
    }

    private getWavePickingForLicenseDispatch(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING>
    > {
        let request: DataRequest.GetLicenseDispatchForPicking = DataRequest.Factory.createGetLicenseDispatchForPickingRequest(
            this.wavePickingForLicenseDispatch.WAVE_PICKING_ID,
            this.settings.userCredentials
        );
        return this.picking.getLicenseDispatchForPicking(request);
    }

    toggleDetails(license: Model.LicenseDispatchExit): boolean {
        this.licenseDispatch.forEach(licenseOrgin => {
            if (licenseOrgin.licenseId !== license.licenseId) {
                licenseOrgin.showDetails = false;
                licenseOrgin.icon = "arrow-dropright-circle";
            }
            licenseOrgin.showScanIcon = false;
        });
        if (!license.isComplete) {
            license.showScanIcon = true;
        } else {
            this.checkLicenses();
        }
        if (license.showDetails) {
            license.showDetails = false;
            license.icon = "arrow-dropright-circle";
            return false;
        } else {
            license.showDetails = true;
            license.icon = "arrow-dropup-circle";
            return true;
        }
    }

    async completedProcessLicensesDispatch() {
        await this.userInteraction.showLoading();
        let listLicenseDispatch: Array<
            DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING
        > = [];

        this.licenseDispatch.forEach(licenseOrgin => {
            licenseOrgin.detail.forEach(detail => {
                let license: DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING = Model.Factory.createLicenseDispatchForPickingRequest();
                license.LICENSE_ID = licenseOrgin.licenseId;
                license.CURRENT_LOCATION = licenseOrgin.location;
                license.LAST_UPDATED_BY = licenseOrgin.pickedBy;
                license.MATERIAL_ID = detail.materialId;
                license.MATERIAL_NAME = detail.materialId;
                license.QTY = detail.qty;
                license.QTY_ORIGIN = detail.qtyOrigin;
                listLicenseDispatch.push(license);
            });
        });

        let request: DataRequest.DispatchLicenseExit = DataRequest.Factory.createDispatchLicenseExitRequest(
            listLicenseDispatch,
            this.wavePickingForLicenseDispatch.WAVE_PICKING_ID,
            this.settings.userCredentials
        );
        let operation: DataResponse.Operation = await this.picking.dispatchLicenseExit(
            request
        );
        if (operation.Resultado === Enums.OperationResult.Success) {
            await this.userInteraction.hideLoading();
            return this.navigation.pushPage(
                Enums.Page.GenerateExitPassFromDispatch,
                this.workspace,
                this.navCtrl,
                <Model.GenerateExitPassFromDispatchnParam>{
                    dispatchNumber: parseInt(operation.DbData)
                }
            );
        } else {
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                operation.Codigo && operation.Codigo > 0
                    ? operation.Codigo
                    : Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    validateInputNumber(detail: Model.DetailLicenseDispatch) {
        let qtyInput: number = detail.qty;
        if (
            isNaN(qtyInput) ||
            detail.qty.toString() === "" ||
            detail.qty > detail.qtyOrigin ||
            detail.qty < 0
        ) {
            if (isNaN(qtyInput)) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput,
                    ""
                );
            } else {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput,
                    detail.qty.toString()
                );
            }
            detail.qty = detail.qtyOrigin;
            return;
        }
    }

    showDocNum(
        wavePickingForLicenseDispatch: DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH
    ): string {
        if (
            wavePickingForLicenseDispatch.CLIENT_NAME ==
            Enums.WaveDispatchConsolidated.Consolidated
        ) {
            return Enums.WaveDispatchLabel.Consolidated.toString();
        } else {
            return wavePickingForLicenseDispatch.DOC_NUM.toString();
        }
    }

    showClientName(
        wavePickingForLicenseDispatch: DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH
    ): string {
        if (
            wavePickingForLicenseDispatch.CLIENT_NAME ==
            Enums.WaveDispatchConsolidated.Consolidated
        ) {
            return Enums.WaveDispatchLabel.Consolidated.toString();
        } else {
            return wavePickingForLicenseDispatch.CLIENT_NAME;
        }
    }

    validateColor(detail: Model.DetailLicenseDispatch) {
        if (detail.qty < detail.qtyOrigin) {
            return Enums.WaveDispatchCssRowName.incompleteRow.toString();
        }
        if (detail.qty == detail.qtyOrigin) {
            return Enums.WaveDispatchCssRowName.completeRow.toString();
        } else {
            return Enums.WaveDispatchCssRowName.notAllowedRow.toString();
        }
    }
}
