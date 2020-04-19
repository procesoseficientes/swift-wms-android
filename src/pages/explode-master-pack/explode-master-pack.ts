import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Subscription } from "rxjs/Subscription";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { DeviceProvider } from "../../providers/device/device";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { MasterpackProvider } from "../../providers/masterpack/masterpack";
import { LicenseProvider } from "../../providers/license/license";

@IonicPage()
@Component({
    selector: "page-explode-master-pack",
    templateUrl: "explode-master-pack.html"
})
export class ExplodeMasterPackPage {
    currentSegment: string = "scanMaterial";
    scanToken: Subscription;
    scanData: string = "arium/100002";
    material: DataResponse.OP_WMS_GET_MASTER_PACK_BY_LICENSE = Model.Factory.createMaterialMasterPack();
    detail: Array<
        DataResponse.OP_WMS_SP_GET_MASTER_PACK_DETAIL_BY_LICENCE
    > = [];
    isAndroid: boolean = false;
    licenseId: number = null;
    currentScan: Enums.MasterPackScan = Enums.MasterPackScan.LicenseId;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private masterpack: MasterpackProvider,
        private license: LicenseProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    async ionViewDidEnter(): Promise<void> {
        try {
            this.isAndroid = this.device.isAndroid();
            this.scanToken = this.device.subscribeToScanner(data =>
                this.processBarcodeScan(data)
            );
            this.userInteraction.hideLoading();
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    public async processBarcodeScan(scanData: string): Promise<boolean> {
        this.scanData = scanData;
        this.showBarcodeSegment();
        this.scanData = scanData;
        switch (this.currentScan) {
            case Enums.MasterPackScan.LicenseId:
                await this.processLicenseScan(scanData);
                await this.userInteraction.hideLoading();
                break;
            case Enums.MasterPackScan.MaterialBarcode:
                await this.processMaterialScan(scanData);
                break;
            default:
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput,
                    this.scanData
                );
        }
        this.userInteraction.hideLoading();
        return Promise.resolve(true);
    }

    public async processLicenseScan(scanData: string): Promise<boolean> {
        try {
            this.userInteraction.showLoading();
            this.licenseId = Number(scanData.split("-")[0]);
            let request: DataRequest.GetInventoryByLicense = DataRequest.Factory.createGetInventoryByLicenseRequest(
                this.licenseId,
                this.settings.userCredentials
            );
            let inventory = await this.license.getInventoryByLicense(
                request,
                this.settings.userCredentials
            );
            if (inventory.length === 0) {
                this.detail = [];
                this.material = Model.Factory.createMaterialMasterPack();
                this.licenseId = null;
                this.currentScan = Enums.MasterPackScan.LicenseId;
                await this.userInteraction.hideLoading();
                return this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataNotFound,
                    scanData
                );
            }
            this.currentScan = Enums.MasterPackScan.MaterialBarcode;
            this.detail = [];
            this.material = Model.Factory.createMaterialMasterPack();
            this.showScanIcon(Enums.MasterPackScan.MaterialBarcode);
            return Promise.resolve(true);
        } catch (error) {
            this.currentScan = Enums.MasterPackScan.MaterialBarcode;
            this.detail = [];
            this.material = Model.Factory.createMaterialMasterPack();
            this.showScanIcon(Enums.MasterPackScan.MaterialBarcode);
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    private async processMaterialScan(scanData: string): Promise<boolean> {
        let action = await this.getScannedMaterial(scanData);

        if (!action) {
            this.userInteraction.hideLoading();
            return Promise.resolve(false);
        }
        this.currentScan = Enums.MasterPackScan.LicenseId;
        this.showScanIcon(Enums.MasterPackScan.LicenseId);
    }

    async getScannedMaterial(barcode: string): Promise<boolean> {
        try {
            let materialValidateRequest: DataRequest.ValidateIsMasterPack = DataRequest.Factory.createValidateIsMasterPackRequest(
                barcode,
                this.settings.userCredentials
            );

            let result = await this.masterpack.validateIsMasterPack(
                materialValidateRequest
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                let getMaterialByLicenseRequest = DataRequest.Factory.createGetMasterPackByLicenseRequest(
                    result.DbData,
                    this.licenseId,
                    this.settings.userCredentials
                );
                let resultMaterialByLicenseRequest = await this.masterpack.getMasterPackByLicence(
                    getMaterialByLicenseRequest
                );
                if (
                    resultMaterialByLicenseRequest &&
                    resultMaterialByLicenseRequest.length > 0
                ) {
                    this.material = resultMaterialByLicenseRequest[0];
                    let getMaterialByLicenseDetailRequest = DataRequest.Factory.createGetMasterPackDetailByLicenceRequest(
                        this.licenseId,
                        result.DbData,
                        this.settings.userCredentials
                    );
                    let resultMasterPackDetailByLicence = await this.masterpack.getMasterPackDetailByLicence(
                        getMaterialByLicenseDetailRequest
                    );
                    if (
                        resultMasterPackDetailByLicence &&
                        resultMasterPackDetailByLicence.length > 0
                    ) {
                        this.detail = resultMasterPackDetailByLicence;
                    } else {
                        this.userInteraction.showCustomError(
                            Enums.CustomErrorCodes
                                .MasterPackDoesNotHaveMaterialsForExplode
                        );
                        this.material = Model.Factory.createMaterialMasterPack();
                        this.detail = [];
                    }
                } else {
                    this.material = Model.Factory.createMaterialMasterPack();
                    this.detail = [];
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes
                            .MasterPackDoesNotHaveMaterialsForExplode
                    );
                    return Promise.resolve(false);
                }
                return Promise.resolve(true);
            } else {
                this.material = Model.Factory.createMaterialMasterPack();
                this.detail = [];
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(false);
            }
        } catch (reason) {
            this.material = Model.Factory.createMaterialMasterPack();
            this.licenseId = null;
            this.detail = [];
            this.currentScan = Enums.MasterPackScan.LicenseId;
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    showScanBarcode(): boolean {
        return this.currentSegment === "scanMaterial";
    }

    showBarcodeSegment(): void {
        if (!this.showScanBarcode()) {
            this.currentSegment = "scanMaterial";
        }
    }

    changeCurrentScan(newScan: Enums.MasterPackScan) {
        switch (newScan) {
            case Enums.MasterPackScan.LicenseId:
                break;
            case Enums.MasterPackScan.MaterialBarcode:
                if (this.licenseId <= 0) return;
                break;
            default:
                return;
        }
        this.currentScan = newScan;
    }

    showScanIcon(option: Enums.MasterPackScan): boolean {
        return option === this.currentScan;
    }

    async explodeMasterPack(): Promise<boolean> {
        try {
            await this.userInteraction.showLoading();
            let explodeMasterPackRequest: DataRequest.ExplodeMasterPack = DataRequest.Factory.createExplodeMasterPackRequest(
                this.licenseId,
                this.material.MATERIAL_ID,
                this.settings.login,
                1,
                this.settings.userCredentials
            );

            let result = await this.masterpack.explodeMasterPack(
                explodeMasterPackRequest
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                this.material = Model.Factory.createMaterialMasterPack();
                this.licenseId = null;
                this.detail = [];
                this.currentScan = Enums.MasterPackScan.LicenseId;
                this.showScanIcon(Enums.MasterPackScan.LicenseId);
                this.currentSegment = "scanMaterial";
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(Enums.CustomErrorCodes.Ok);
                return Promise.resolve(true);
            } else {
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(false);
            }
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    backButtonAction(): Promise<any> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
}
