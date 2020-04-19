import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataResponse, DataRequest } from "../../models/models";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../../providers/translate/translate";
import { DeviceProvider } from "../../providers/device/device";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { PrinterProvider } from "../../providers/printer/printer";
import { Enums } from "../../enums/enums";
import { ReceptionProvider } from "../../providers/reception/reception";
import { Subscription } from "rxjs/Subscription";
import * as _ from "lodash";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import { LicenseProvider } from "../../providers/license/license";
import { MaterialProvider } from "../../providers/material/material";
import { PickingProvider } from "../../providers/picking/picking";
import { LocationSuggestionProvider } from "../../providers/location-suggestion/location-suggestion";
@IonicPage()
@Component({
    selector: "page-relocate-partial-license",
    templateUrl: "relocate-partial-license.html"
})
export class RelocatePartialLicensePage {
    sourceLicenseId: number;
    targetLicenseId: number;
    currentSegment: string = "scanMaterial";
    detail: Array<Model.Material> = [];
    currentScan: Enums.ReceptionScanner;
    material: Model.Material = Model.Factory.createMaterial();
    scanToken: Subscription;
    scanData: string = "arium/100001";
    clientOwner: string;
    policyCode: string;
    statusList: Array<Model.Configuration> = [];
    materialStatus: string;
    detailLicense: Array<
        DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_DETAIL
    > = [];
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private configuration: ConfigurationProvider,
        private reception: ReceptionProvider,
        private translate: TranslateProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private printer: PrinterProvider,
        private license: LicenseProvider,
        private materialProvider: MaterialProvider,
        private pickingProvider: PickingProvider,
        private locationSuggestion: LocationSuggestionProvider
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
            let params = this.navParams.data;
            this.targetLicenseId = params.targetLicenseId || params.licenseId;
            this.sourceLicenseId = params.sourceLicenseId || params.baseLicenseId;
            this.clientOwner = params.clientOwner;
            this.policyCode = params.policyCode;
            if (params.detail) {
                this.detail = params.detail;
            }

            if (params.material) {
                this.detail = params.detail;
                if (params.material.SerialNumbers.length !== 0) {
                    this.updateDetailList(
                        params.material,
                        params.action,
                        params.material.materialStatus
                    );
                }
            } else if (!params.actionBack) {
                this.detail = [];
            }

            let request: DataRequest.GetAvailableLicenseDetail = DataRequest.Factory.createAvailableLicenseDetailRequest(
                this.settings.userCredentials,
                this.sourceLicenseId
            );
            this.detailLicense = await this.license.getAvailableLicenseDetail(
                request
            );
            this.currentScan = Enums.ReceptionScanner.Material;

            let configWhere = DataRequest.Factory.createGetConfigurationRequest(
                this.settings.userCredentials
            );
            configWhere.paramType = Enums.ConfigurationParamType.Status;
            configWhere.paramGroup = Enums.ConfigurationParamGroup.Status;

            let configs: Array<
                Model.Configuration
            > = await this.configuration.findConfigurations(configWhere);
            let defaultConfig: Model.Configuration;
            this.statusList = _.orderBy(configs, "numericValue", "desc");
            defaultConfig = _.find(configs, c => {
                return c.numericValue === Enums.YesNo.Yes;
            });
            this.materialStatus = defaultConfig.paramName;

            await this.userInteraction.hideLoading();
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

    public processBarcodeScan(scanData: string): Promise<boolean> {
        this.scanData = scanData;
        this.showBarcodeSegment();

        if (this.currentScan === Enums.ReceptionScanner.Material) {
            this.userInteraction.hideLoading();
            return this.processMaterialScan(scanData);
        }
        this.userInteraction.hideLoading();
        return Promise.resolve(true);
    }

    private async processMaterialScan(scanData: string): Promise<boolean> {
        let action = await this.getScannedMaterial(scanData);

        if (!action) {
            this.userInteraction.hideLoading();
            return Promise.resolve(false);
        }

        if (this.material.serialNumberRequests === Enums.YesNo.Yes) {
            await this.userInteraction.showLoading();

            this.navigation.pushPage(
                Enums.Page.RelocatePartialLicenseSeries,
                this.workspace,
                this.navCtrl,
                <Model.RelocatePartialLicenseSeriesParams>{
                    baseLicenseId: this.sourceLicenseId,
                    licenseId: this.targetLicenseId,
                    material: this.material,
                    clientOwner: this.clientOwner,
                    detail: this.detail,
                    policyCode: this.policyCode,
                    materialStatus: this.materialStatus,
                    location: "",
                    comesFrom: Enums.Page.RelocatePartialLicense
                }
            );
        }
        await this.userInteraction.hideLoading();
        return Promise.resolve(true);
    }

    async getScannedMaterial(barcode: string): Promise<boolean> {
        try {
            let materialRequest: DataRequest.GetScannedMaterialByLicenseInReceptionTask = DataRequest.Factory.createGetScannedMaterialByLicenseInReceptionTaskRequest(
                barcode,
                this.clientOwner,
                this.sourceLicenseId,
                null,
                this.settings.userCredentials
            );

            let result = await this.reception.validateBarcodeForLicense(
                materialRequest
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                let getMaterialRequest = DataRequest.Factory.createGetMaterialRequest(
                    this.settings.userCredentials
                );
                getMaterialRequest.barcodeId = barcode;
                getMaterialRequest.clientOwner = this.clientOwner;
                this.material = await this.materialProvider.getMaterialByBarcode(
                    getMaterialRequest
                );

                let materialExistsInSourceLicense = _.find(
                    this.detailLicense,
                    material => {
                        return (
                            material.MATERIAL_ID === this.material.materialId
                        );
                    }
                );
                if (materialExistsInSourceLicense) {
                    this.material.batch = materialExistsInSourceLicense.BATCH;
                    this.material.expirationDate =
                        materialExistsInSourceLicense.DATE_EXPIRATION;
                    this.material.tone = materialExistsInSourceLicense.TONE;
                    this.material.caliber =
                        materialExistsInSourceLicense.CALIBER;
                    this.material.vin = materialExistsInSourceLicense.VIN;
                    this.materialStatus =
                        materialExistsInSourceLicense.STATUS_CODE;
                    let materialExistsInDetail = _.find(
                        this.detail,
                        material => {
                            return (
                                material.materialId === this.material.materialId
                            );
                        }
                    );
                    if (
                        materialExistsInDetail &&
                        materialExistsInDetail.serialNumberRequests ===
                            Enums.YesNo.Yes
                    ) {
                        this.material.SerialNumbers =
                            materialExistsInDetail.SerialNumbers;
                    }
                } else {
                    this.material = Model.Factory.createMaterial();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.MaterialDoesntBelongToLicense
                    );
                    return Promise.resolve(false);
                }
                return Promise.resolve(true);
            } else {
                this.material = Model.Factory.createMaterial();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(false);
            }
        } catch (reason) {
            this.material = Model.Factory.createMaterial();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InvalidSku,
                barcode
            );
            return Promise.resolve(false);
        }
    }

    changeCurrentScan(newScan: Enums.ReceptionScanner): void {
        this.currentScan = newScan;
    }

    showScanIcon(option: Enums.ReceptionScanner): boolean {
        return option === this.currentScan;
    }

    async locateLicense(): Promise<void> {
        try {
            if (this.detail.length < 1) return Promise.resolve();
            await this.userInteraction.showLoading();
            let licenseRequest = DataRequest.Factory.createValidateStatusInMaterialsLicenseRequest(
                this.targetLicenseId,
                this.settings.userCredentials
            );
            let result: DataResponse.Operation = await this.reception.validateStatusInMaterialsLicense(
                licenseRequest
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                let params = <Model.LocatePartialLicenseParams>{
                    baseLicenseId: this.sourceLicenseId,
                    licenseId: this.targetLicenseId,
                    detail: this.detail,
                    clientOwner: this.clientOwner,
                    policyCode: this.policyCode,
                    location: "",
                    comesFrom: Enums.Page.RelocatePartialLicense
                };
                await this.userInteraction.hideLoading();
                this.navigation.pushPage(
                    Enums.Page.LocatePartialLicense,
                    this.workspace,
                    this.navCtrl,
                    params
                );
                return Promise.resolve();
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
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
            await this.userInteraction.hideLoading()
        }
    }

    async validateSuggestedLocation(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let validateSuggestedLocation: DataRequest.SuggestedLocation = DataRequest.Factory.createSuggestedLocation(
                this.targetLicenseId,
                this.settings.userCredentials
            );
            let result: DataResponse.Operation = await this.locationSuggestion.validateSuggestedLocation(
                validateSuggestedLocation
            );

            if(result.Resultado === Enums.OperationResult.Success){
                switch(Number(result.DbData)){
                    case Enums.ShowSuggestedLocation.No:
                        return this.locateLicense();
                    case Enums.ShowSuggestedLocation.SlottingByZona:
                        return this.suggestedLocation(Enums.ShowSuggestedLocation.SlottingByZona);
                    case Enums.ShowSuggestedLocation.Material:
                        return this.suggestedLocation(Enums.ShowSuggestedLocation.Material);
                    case Enums.ShowSuggestedLocation.All:
                        return this.suggestedLocation(Enums.ShowSuggestedLocation.All);
                }
            }else{
                await this.userInteraction.hideLoading();
                let code: Enums.CustomErrorCodes = result.Codigo && result.Codigo > 0 ? result.Codigo : Enums.CustomErrorCodes.UnknownError;
                this.userInteraction.showCustomError(code);
                return Promise.resolve();
            }
            await this.userInteraction.hideLoading();

        }catch(exception){
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }finally{
            await this.userInteraction.hideLoading();
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
                                this.sourceLicenseId,
                                0,
                                this.settings.userCredentials
                            );
                            let format = await this.printer.getLicensePrintFormat(
                                request
                            );

                            format.FORMAT = format.FORMAT.replace(
                                new RegExp(
                                    this.sourceLicenseId.toString(),
                                    "g"
                                ),
                                this.targetLicenseId.toString()
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
                            null,
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

    backButtonAction(): Promise<any> {
        return Promise.all([
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.No
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.Yes
            )
        ]).then(arrResult => {
            let buttons = [
                {
                    text: arrResult[0],
                    role: "cancel",
                    handler: () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                    }
                },
                {
                    text: arrResult[1],
                    handler: async () => {
                        await this.userInteraction.showLoading();
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        let result = await this.rollbackLicense();
                        if (
                            result.Resultado === Enums.OperationResult.Success
                        ) {
                            await this.navigation.popPage(
                                this.workspace,
                                this.navCtrl,
                                <Model.LicenseInfoParams>{
                                    licenseId: this.sourceLicenseId
                                }
                            );
                            await this.userInteraction.hideLoading();
                        } else {
                            await this.userInteraction.hideLoading();
                            this.userInteraction.showCustomError(
                                Enums.CustomErrorCodes.DataBaseError
                            );
                        }
                    }
                }
            ];
            return this.userInteraction.showOptionAlert(
                null,
                buttons,
                Enums.Translation.Alert.RollbackLicense
            );
        });
    }

    showScanBarcode(): boolean {
        return this.currentSegment === "scanMaterial";
    }

    showBarcodeSegment(): void {
        if (!this.showScanBarcode()) {
            this.currentSegment = "scanMaterial";
        }
    }

    async rollbackLicense(): Promise<DataResponse.Operation> {
        try {
            let license: DataRequest.RollBackLicense = DataRequest.Factory.createRollBackLicenseRequest(
                this.targetLicenseId,
                this.settings.userCredentials
            );
            await this.rollBackSeries();
            return this.reception.rollbackLicense(license);
        } catch (e) {
            await this.userInteraction.hideLoading();
            return Model.Factory.createFaultOperation({
                code: Enums.CustomErrorCodes.DataBaseError,
                message: e
            });
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    private async rollBackSeries(): Promise<void> {
        let request: DataRequest.RollbackSerialNumbersOnProcess = DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(
            this.sourceLicenseId,
            null,
            null,
            Enums.TaskType.PartialRelocation,
            this.settings.userCredentials
        );
        let response: DataResponse.Operation = await this.pickingProvider.rollbackSerialNumbersOnProcess(
            request
        );
        if (response.Resultado === Enums.OperationResult.Success) {
            return Promise.resolve();
        } else {
            return Promise.reject(response.Mensaje);
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

    async keyPressQuantity(keyCode: Enums.KeyCode): Promise<void> {
        if (
            keyCode === Enums.KeyCode.Enter &&
            this.material.materialId !== "" &&
            this.material.quantity > 0
        ) {
            let materialExistsInSourceLicense = _.find(
                this.detailLicense,
                material => {
                    return material.MATERIAL_ID === this.material.materialId;
                }
            );
            let qty = 0;
            this.detail.forEach((m: Model.Material) => {
                if (m.materialId === this.material.materialId) {
                    qty += m.quantity * m.measurementQty;
                }
            });
            qty += this.material.quantity * this.material.measurementQty;
            if (qty > materialExistsInSourceLicense.AVAILABLE_QTY) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes
                        .QuantityInLicenseIsGreaterThanLicenseSource
                );
                return;
            }
            let validateIfAllowRelocation: DataRequest.ValidateIfStatusOfLicenseAllowsRelocation = DataRequest.Factory.createValidateIfStatusOfLicenseAllowsRelocationRequest(
                this.settings.userCredentials
            );
            validateIfAllowRelocation.licenseId = this.sourceLicenseId;
            validateIfAllowRelocation.materialId = this.material.materialId;
            let result: DataResponse.Operation = await this.license.validateIfStatusOfLicenseAllowsRealloc(
                validateIfAllowRelocation
            );
            if (result.Resultado == Enums.OperationResult.Success) {
                this.checkIfMaterialIsOnTheDetail();
            } else {
                let code: Enums.CustomErrorCodes =
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError;
                this.userInteraction.showCustomError(code);
            }
        }
    }

    public async addMaterialToLicense(
        action: Enums.ReceptionAction
    ): Promise<boolean> {
        try {
            let qty = this.material.quantity * this.material.measurementQty;
            if (action === Enums.ReceptionAction.Update) {
                this.detail.forEach(material => {
                    if (
                        material.materialId === this.material.materialId &&
                        material.measurementUnit !==
                            this.material.measurementUnit
                    ) {
                        qty += material.quantity * material.measurementQty;
                    }
                });
            }
            let validateInventory: DataRequest.ValidateInventoryForRealloc = DataRequest.Factory.createValidateInventoryForRealloc(
                this.settings.userCredentials
            );
            validateInventory.sourceLicense = this.sourceLicenseId;
            validateInventory.materialId = this.material.materialId;
            validateInventory.quantityUnits = qty;

            let resultValidate = await this.reception.validateInventoryForRealloc(
                validateInventory
            );
            if (resultValidate.Resultado === Enums.OperationResult.Success) {
                let addMaterial: DataRequest.AddMaterialToLicense = DataRequest.Factory.createAddMaterialToLicenseRequest(
                    this.settings.userCredentials
                );

                addMaterial.licenseId = this.targetLicenseId;
                addMaterial.barcode = this.material.barcodeId;
                addMaterial.qty = qty;
                addMaterial.lastLogin = this.settings.login;
                addMaterial.volumeFactor = this.material.volumeFactor;
                addMaterial.weight = this.material.weight;
                addMaterial.dateExpiration = this.material.expirationDate;
                addMaterial.batch = this.material.batch;
                addMaterial.vin = this.material.vin;
                addMaterial.paramName = this.materialStatus;
                addMaterial.tone = this.material.tone;
                addMaterial.caliber = this.material.caliber;
                addMaterial.action = action;
                addMaterial.sourceLicenseId = this.sourceLicenseId;

                let result: DataResponse.Operation = await this.reception.addMaterialToLicense(
                    addMaterial
                );
                if (result.Resultado === Enums.OperationResult.Success) {
                    this.updateDetailList(
                        this.material,
                        action,
                        this.materialStatus
                    );
                    this.material = Model.Factory.createMaterial();
                    this.currentScan = Enums.ReceptionScanner.Material;
                    this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                } else {
                    await this.userInteraction.hideLoading();
                    let code: Enums.CustomErrorCodes =
                        result.Codigo && result.Codigo > 0
                            ? result.Codigo
                            : Enums.CustomErrorCodes.UnknownError;
                    this.userInteraction.showCustomError(code);
                }
            } else {
                await this.userInteraction.hideLoading();
                let code: Enums.CustomErrorCodes =
                    resultValidate.Codigo && resultValidate.Codigo > 0
                        ? resultValidate.Codigo
                        : Enums.CustomErrorCodes.UnknownError;
                this.userInteraction.showCustomError(code);
            }

            return Promise.resolve(false);
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        }
    }

    private async checkIfMaterialIsOnTheDetail(): Promise<void> {
        await this.userInteraction.showLoading();
        let materialExists = _.find(this.detail, m => {
            return (
                m.materialId === this.material.materialId &&
                m.measurementUnit === this.material.measurementUnit
            );
        });

        if (materialExists) {
            let buttons = await Promise.all([
                this.translate.translateGroupValue(
                    Enums.Translation.Groups.Buttons,
                    Enums.Translation.Button.Add
                ),
                this.translate.translateGroupValue(
                    Enums.Translation.Groups.Buttons,
                    Enums.Translation.Button.Replace
                )
            ]).then(arrResult => {
                let buttons = [
                    {
                        text: arrResult[0],
                        handler: () => {
                            this.addMaterialToLicense(
                                Enums.ReceptionAction.Add
                            );
                            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        }
                    },
                    {
                        text: arrResult[1],
                        handler: () => {
                            this.addMaterialToLicense(
                                Enums.ReceptionAction.Update
                            );
                            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        }
                    }
                ];
                return Promise.resolve(buttons);
            });
            await this.userInteraction.hideLoading();
            this.userInteraction.showOptionAlert(
                null,
                buttons,
                Enums.Translation.Alert.MaterialAlreadyInLicense
            );
            return Promise.resolve();
        } else {
            let action = Enums.ReceptionAction.Insert;
            let materialNoMeasurement = _.find(this.detail, m => {
                return m.materialId === this.material.materialId;
            });
            if (materialNoMeasurement) {
                action = Enums.ReceptionAction.Add;
            }
            await this.addMaterialToLicense(action);
            return Promise.resolve();
        }
    }

    private updateDetailList(
        material: Model.Material,
        action: Enums.ReceptionAction,
        status: string
    ): void {
        material.materialStatus = status;
        if (action === Enums.ReceptionAction.Insert) this.detail.push(material);
        else {
            let foundMaterial: Model.Material = this.detail.find(
                (m: Model.Material) => {
                    return (
                        m.materialId === material.materialId &&
                        m.measurementUnit === material.measurementUnit
                    );
                }
            );
            if (action === Enums.ReceptionAction.Add && !foundMaterial) {
                this.detail.push(material);
            } else {
                foundMaterial.quantity =
                    action === Enums.ReceptionAction.Update
                        ? Number(material.quantity)
                        : Number(material.quantity) +
                          Number(foundMaterial.quantity);
            }
        }
    }

    async suggestedLocation(ShowSuggestedLocation: Enums.ShowSuggestedLocation): Promise<void> {
        try{
            let params = {
                baseLicenseId: this.sourceLicenseId,
                licenseId: this.targetLicenseId,
                detail: this.detail,
                clientOwner: this.clientOwner,
                policyCode: this.policyCode,
                location: "",
                comesFrom: Enums.Page.RelocatePartialLicense,
                showSuggestedLocation: ShowSuggestedLocation,
                taskId: 0,
                material: this.material
            };

            this.navigation.pushPage(
                Enums.Page.LocationSuggestionRelocatePartial,
                this.workspace,
                this.navCtrl,
                params
            );
            return Promise.resolve();
        }catch(exception){
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }finally {
            await this.userInteraction.hideLoading();
        }
    }

}
