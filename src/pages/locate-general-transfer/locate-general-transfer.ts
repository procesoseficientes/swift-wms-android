import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../../providers/translate/translate";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { PrinterProvider } from "../../providers/printer/printer";
import * as _ from "lodash";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import { RelocateProvider } from "../../providers/relocate/relocate";
import { TransactionOperatorProvider } from "../../providers/transaction-operator/transaction-operator";
import { ChargeProvider } from "../../providers/charge/charge";

import { CheckpointProvider } from "../../providers/checkpoint/checkpoint";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs";
import { LocationProvider } from "../../providers/location/location";

@IonicPage()
@Component({
    selector: "page-locate-general-transfer",
    templateUrl: "locate-general-transfer.html"
})
export class LocateGeneralTransferPage {
    currentSegment: string = "licenseDetail";
    material: Model.Material;
    materialStatus: string;
    statusDisabled: boolean = false;
    statusList: Array<Model.Configuration> = [];
    locationSpot: Model.ShelfSpot; //
    mt2: number = 0;
    usedmt2: number = 0;
    totalPosition: number = 1;
    licenseId: number = 0;
    taskId: number = 0;
    clientOwner: string = "";
    task: Model.Task;
    detail: Array<Model.Material> = [];
    baseLicenseId: number = 0;
    policyCode: string;
    comesFrom: Enums.Page;
    isAndroid: boolean = false;
    scanToken: Subscription;
    scanData: string;
    inputTotalPosition: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        public checkpiont: CheckpointProvider,
        private configuration: ConfigurationProvider,
        private translate: TranslateProvider,
        private settings: UserSettingsProvider,
        private relocate: RelocateProvider,
        private printer: PrinterProvider,
        private charge: ChargeProvider,
        private transactionOperator: TransactionOperatorProvider,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private location: LocationProvider
    ) {
        this.material = Model.Factory.createMaterial();
        this.locationSpot = Model.Factory.createShelfSpot();
    }

    public async validateTotalPositionsOnKeyUp($event: any) {
        try {
            //Get the current values on input
            let values = $event.target.value.split("");

            //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
            let newValues: Array<number> = await this.device.getIntegerNumbers(
                values,
            );
            //Updates the value on event
            $event.target.value = newValues.join("");
        } catch (error) {
            this.userInteraction.showError(error);
        }
    }

    public async validateTotalPositionsOnLostFocus($event: any) {
        try {
            //Get the current values on input
            let values = $event._native.nativeElement.value.split("");

            //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
            let newValues: Array<number> = await this.device.getIntegerNumbers(
                values,
            );

            //Updates the value on event
            $event._native.nativeElement.value = newValues.join("");
            $event._value = $event._native.nativeElement.value;
        } catch (error) {
            this.userInteraction.showError(error);
        }
    }

    async ionViewDidLoad(): Promise<void> {
        let params = this.navParams.data;


        this.task = params.task || Model.Factory.createTask();

        let configWhere = DataRequest.Factory.createGetConfigurationRequest(
            this.settings.userCredentials
        );

        configWhere.paramType = Enums.ConfigurationParamType.Status;
        configWhere.paramGroup = Enums.ConfigurationParamGroup.Status;

        let configs: Array<Model.Configuration> = await this.configuration.findConfigurations(
            configWhere
        );

        this.statusList = _.orderBy(configs, "numericValue", "desc");
        this.material = Model.Factory.createMaterial();
    }

    async ionViewDidEnter() {
        this.userInteraction.hideLoading();
        this.scanToken = this.device.subscribeToScanner(data =>
            this.validateLocation(data)
        );
        let permissions = await this.checkpiont.getCheckPointsByUser(
            <DataRequest.GetCheckPointsByUser>this.settings.userCredentials
        );

        let permission = permissions.find(p => {
            return p.CHECK_ID === "ALLOW_TOTAL_POSITION";
        });

        this.inputTotalPosition = permission !== undefined;
    }

    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }

    public async validateLocation(locationSpot: string): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            this.scanData = locationSpot;
            let validateLocationRequest: DataRequest.ValidateLocationForStorage = DataRequest.Factory.createValidateLocationForStorageRequest(
                this.licenseId,
                locationSpot,
                null,
                this.settings.userCredentials
            );
            validateLocationRequest.taskId = null;
            let validateResult = await this.location.validateLocationForStorage(
                validateLocationRequest
            );
            if (validateResult.Resultado === Enums.OperationResult.Success) {
                return this.getLocation(locationSpot);
            } else {
                this.locationSpot = Model.Factory.createShelfSpot();
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    validateResult.Codigo && validateResult.Codigo > 0
                        ? validateResult.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve();
            }
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    toggleDetails(material: Model.Material): boolean {
        if (
            material.showDetails &&
            material.serialNumberRequests === Enums.YesNo.Yes
        ) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
            return false;
        } else if (material.serialNumberRequests === Enums.YesNo.Yes) {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
            return true;
        }
    }

    changeUsedMt2(): void {
        if (isNaN(this.mt2) || this.mt2.toString() === "") {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InvalidInput,
                ""
            );
            this.mt2 = 0;
            return;
        }

        this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
            this.locationSpot.maxMt2Occupancy -
            (this.usedmt2 + Number(this.mt2));
        if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume < 0)
            this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume = 0;

        if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume > 0) {
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon = "checkmark";
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                "success";
        } else {
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon = "close";
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                "danger";
        }
    }

    showPrintOption(): Promise<any> {
        return Promise.all([
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.PrintLicense
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.PrintStatus
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.Cancel
            )
        ]).then(arrResult => {
            let buttons = [
                {
                    text: arrResult[0],
                    handler: async () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        try {
                            if (!this.settings.printer) {
                                this.userInteraction.showCustomError(
                                    Enums.CustomErrorCodes.PrinterNotConfigured
                                );
                                return;
                            }
                            let request: DataRequest.GetLicensePrintFormat = DataRequest.Factory.createGetLicensePrintFormatRequest(
                                this.licenseId,
                                0,
                                this.settings.userCredentials
                            );
                            let format = await this.printer.getLicensePrintFormat(
                                request
                            );

                            await this.printer.printDocument(
                                this.settings.printer,
                                format.FORMAT
                            );
                        } catch (e) {
                            this.userInteraction.showCustomError(
                                Enums.CustomErrorCodes.UnknownError
                            );
                        }
                    }
                },
                {
                    text: arrResult[1],
                    handler: async () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        if (!this.settings.printer) {
                            this.userInteraction.showCustomError(
                                Enums.CustomErrorCodes.PrinterNotConfigured
                            );
                            return;
                        }
                        let request: DataRequest.GetStatusPrintFormat = DataRequest.Factory.createGetStatusPrintFormatRequest(
                            this.materialStatus,
                            this.taskId,
                            this.clientOwner,
                            this.settings.userCredentials
                        );
                        let format = await this.printer.getStatusPrintFormat(
                            request
                        );

                        await this.printer.printDocument(
                            this.settings.printer,
                            format.FORMAT
                        );
                    }
                },
                {
                    text: arrResult[2],
                    role: "cancel",
                    handler: () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                    }
                }
            ];
            return this.userInteraction.showOptionAlert(null, buttons);
        });
    }

    private generateRegisterPartialRelocation(
        materials: Array<Model.Material>
    ): Array<Promise<DataResponse.Operation>> {
        return materials.map((material: Model.Material) => {
            return this.relocate.registerPartialRelocation(
                DataRequest.Factory.createRegisterPartialRelocationRequest(
                    this.baseLicenseId,
                    this.licenseId,
                    material.quantity * material.measurementQty,
                    this.mt2,
                    this.policyCode,
                    this.locationSpot.locationSpot,
                    this.clientOwner,
                    material.barcodeId,
                    material.materialId,
                    this.settings.userCredentials,
                    this.totalPosition
                )
            );
        });
    }

    public async locateLicense(): Promise<boolean> {
        try {
            await this.userInteraction.showLoading();
            if (isNaN(this.mt2)) {
                await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput,
                    ""
                );
                return Promise.resolve(false);
            }

            if (this.totalPosition < 1 || this.totalPosition == null) {
                throw new Error("Debe ingresar la cantidad de posiciones.");
            }else{
                this.totalPosition = 1;
                let result = await Promise.all(
                    this.generateRegisterPartialRelocation(this.detail)
                );
    
                let failResult = _.find(
                    result,
                    (response: DataResponse.Operation) => {
                        return response.Resultado === Enums.OperationResult.Fail;
                    }
                );
    
                if (failResult) {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        failResult.Codigo && failResult.Codigo > 0
                            ? failResult.Codigo
                            : Enums.CustomErrorCodes.DataBaseError
                    );
                    return Promise.resolve(false);
                } else {
                    await this.userInteraction.hideLoading();
                    await this.saveLog();
                    await this.getLastLicense();
                    let request = DataRequest.Factory.createChargeByMobileRequest(
                        this.licenseId,
                        Enums.TransType.PartialRelocation,
                        this.settings.userCredentials
                    );
                    let charges = await this.charge.getCharges(request);
    
                    let times: number = 2;
                    switch (this.comesFrom) {
                        case Enums.Page.RelocatePartialLicense:
                            times = 3;
                            break;
                        case Enums.Page.LocationSuggestionRelocatePartial:
                            times = 3;
                            break;
                        case Enums.Page.LicenseClassLocation:
                            times = 4;
                            break;
                    }
    
                    if (charges.length) {
                        this.navigation.pushPage(
                            Enums.Page.LicenseCharges,
                            this.workspace,
                            this.navCtrl,
                            <Model.LicenseChargesParam>{
                                charges: charges,
                                licenseId: this.licenseId,
                                taskId: null,
                                transType: Enums.TransType.GeneralTransfer,
                                times: times
                            }
                        );
                        return Promise.resolve(true);
                    } else {
                        this.navigation.popPage(
                            this.workspace,
                            this.navCtrl,
                            <Model.LicenseInfoParams>{ licenseId: this.licenseId },
                            times
                        );
                        return Promise.resolve(true);
                    }
                }
            }
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    private saveLog(): Promise<void> {
        try {
            this.detail.forEach(element => {
                this.transactionOperator.addTransactionByOperator({
                    dateCreated: new Date(),
                    licenseId: this.licenseId,
                    location: this.locationSpot.locationSpot,
                    materialId: element.materialId,
                    materialName: element.materialName,
                    qty: element.quantity,
                    taskType: Enums.TaskTypeLog.PartialRelocation,
                    loginId: this.settings.userCredentials.loginId
                });
            });
        } catch (error) {
            this.userInteraction.toast(
                "error at save log transaction:",
                Enums.ToastTime.Short
            );
        }
        return Promise.resolve();
    }

    async getLastLicense(): Promise<void> {
        try {
            let request: DataRequest.LastLicenseReallocByUser = DataRequest.Factory.createLastLicenseReallocByUser(
                this.licenseId,
                this.settings.userCredentials
            );

            let resultGetLastLicense = await this.relocate.getLastLicenseReallocByUser(
                request
            );
            if (
                resultGetLastLicense.Resultado === Enums.OperationResult.Success
            ) {
                if (Number(resultGetLastLicense.DbData) != this.licenseId) {
                    this.licenseId = Number(resultGetLastLicense.DbData);
                }
            }
        } catch (error) {}
    }

    showScanBarcode(): boolean {
        return this.currentSegment === "location";
    }

    public scanBarcode(): Promise<void> {
        return this.device.scan();
    }

    async getLocation(locationSpot: string): Promise<void> {
        try {
            let locationRequest: DataRequest.GetLocation = DataRequest.Factory.createGetLocationRequest(
                locationSpot,
                this.settings.userCredentials
            );
            this.locationSpot = await this.location.getLocation(
                locationRequest
            );
            this.locationSpot.ShelfSpotVolumeAndWeight = Model.Factory.createShelfSpotVolumeAndWeight();

            if (this.locationSpot.spotType === Enums.LocationType.Rack) {
                let maxWeightAndVolumeRequest: DataRequest.ValidateLocationMaxWeightAndVolume = DataRequest.Factory.createValidateLocationMaxWeightAndVolumeRequest(
                    this.locationSpot.locationSpot,
                    this.licenseId,
                    this.settings.userCredentials
                );
                this.locationSpot.ShelfSpotVolumeAndWeight = await this.location.validateLocationMaxWeightAndVolume(
                    maxWeightAndVolumeRequest
                );
            } else if (
                this.locationSpot.spotType === Enums.LocationType.Floor
            ) {
                let resultGetUsedMt2byLocationSpot = await this.location.getUsedMt2byLocationSpot(
                    locationRequest
                );
                this.usedmt2 = parseInt(resultGetUsedMt2byLocationSpot.DbData);
                this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
                    this.locationSpot.maxMt2Occupancy -
                    (this.usedmt2 + this.mt2);

                if (
                    this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume >
                    0
                ) {
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon =
                        "checkmark";
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                        "success";
                } else {
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon =
                        "close";
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                        "danger";
                }
            }
            return Promise.resolve();
        } catch (reason) {
            this.locationSpot = Model.Factory.createShelfSpot();
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
}
