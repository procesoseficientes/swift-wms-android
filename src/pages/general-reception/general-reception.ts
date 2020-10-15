import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import * as _ from "lodash";
import { ReceptionProvider } from "../../providers/reception/reception";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../../providers/translate/translate";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { PrinterProvider } from "../../providers/printer/printer";
import { LocationSuggestionProvider } from "../../providers/location-suggestion/location-suggestion";

@IonicPage()
@Component({
    selector: "page-general-reception",
    templateUrl: "general-reception.html"
})
export class GeneralReceptionPage {
    clientOwner: string = "";
    licenseId: number = 0;
    taskId: number = 0;
    detail: Array<Model.Material> = [];
    currentSegment: string = "scanMaterial";
    statusList: Array<Model.Configuration> = [];
    materialStatus: string;
    material: Model.Material;
    currentScan: Enums.ReceptionScanner;
    scanToken: Subscription;
    scanData: string = "arium/100001";
    isAndroid: boolean = false;
    statusDisabled: boolean = false;
    receptionSubtype: Enums.TaskSubType;
    isReceptionByPurchaseDocument: boolean = false;
    regimenTask: Enums.Regime = Enums.Regime.General;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private configuration: ConfigurationProvider,
        private reception: ReceptionProvider,
        private userInteraction: UserInteractionProvider,
        private translate: TranslateProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private printer: PrinterProvider,
        private locationSuggestion: LocationSuggestionProvider
    ) {
        this.material = Model.Factory.createMaterial();
    }

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    async ionViewDidLoad(): Promise<void> {
        this.isAndroid = this.device.isAndroid();
        let params = <Model.GeneralReceptionParam>this.navParams.data;
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
        this.material = Model.Factory.createMaterial();
        this.currentScan = Enums.ReceptionScanner.Material;
        this.clientOwner = params.clientOwner;
        this.taskId = params.taskId;
        this.licenseId = params.licenseId;
        this.receptionSubtype = params.taskSubtype;
        this.regimenTask = params.regime;

        let configWhere = DataRequest.Factory.createGetConfigurationRequest(
            this.settings.userCredentials
        );
        configWhere.paramType = Enums.ConfigurationParamType.Status;
        configWhere.paramGroup = Enums.ConfigurationParamGroup.Status;

        let configs: Array<Model.Configuration> = await this.configuration.findConfigurations(
            configWhere
        );
        let defaultConfig: Model.Configuration;
        this.statusList = _.orderBy(configs, "numericValue", "desc");
        defaultConfig = _.find(configs, c => {
            return c.numericValue === Enums.YesNo.Yes;
        });
        this.materialStatus = defaultConfig.paramName;

        let whereSubtype = DataRequest.Factory.createGetConfigurationRequest(
            this.settings.userCredentials
        );
        whereSubtype.paramType = Enums.ConfigurationParamType.System;
        whereSubtype.paramGroup = Enums.ConfigurationParamGroup.TypeReception;
        let subTypeConfigs: Array<Model.Configuration> = await this.configuration.findConfigurations(
            whereSubtype
        );
        let findSubtype = _.find(subTypeConfigs, subType => {
            return subType.paramName == this.receptionSubtype;
        });
        if (findSubtype) {
            this.isReceptionByPurchaseDocument = true;
        }
    }

    async ionViewDidEnter(): Promise<void> {
        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );
        this.userInteraction.hideLoading();
    }

    showScanBarcode(): boolean {
        return this.currentSegment === "scanMaterial";
    }

    showBarcodeSegment(): void {
        if (!this.showScanBarcode()) {
            this.currentSegment = "scanMaterial";
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

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    public processBarcodeScan(scanData: string): Promise<boolean> {
        this.scanData = scanData;
        this.showBarcodeSegment();

        switch (this.currentScan) {
            case Enums.ReceptionScanner.Material:
                this.userInteraction.hideLoading();
                return this.processMaterialScan(scanData);
            case Enums.ReceptionScanner.Batch:
                this.material.batch = scanData;
                if (this.material.isCar === Enums.YesNo.Yes) {
                    this.currentScan = Enums.ReceptionScanner.VIN;
                } else {
                    this.currentScan = Enums.ReceptionScanner.None;
                }
                break;
            case Enums.ReceptionScanner.VIN:
                this.material.vin = scanData;
                this.currentScan = Enums.ReceptionScanner.None;
                break;
            default:
                break;
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
            let action: Enums.ReceptionAction = Enums.ReceptionAction.Insert;
            if (
                _.find(this.detail, (material: Model.Material) => {
                    return material.materialId === this.material.materialId;
                })
            ) {
                action = Enums.ReceptionAction.Update;
            }

            this.navigation.pushPage(
                Enums.Page.GeneralReceptionSeries,
                this.workspace,
                this.navCtrl,
                <Model.GeneralReceptionSeriesParam>{
                    material: this.material,
                    licenseId: this.licenseId,
                    taskId: this.taskId,
                    clientOwner: this.clientOwner,
                    materialStatus: this.materialStatus,
                    action: action,
                    detail: this.detail,
                    taskSubtype: this.receptionSubtype,
                    isReceptionByPurchaseDocument: this
                        .isReceptionByPurchaseDocument,
                    regime: this.regimenTask
                }
            );
        }
        if (this.material.batchRequested === Enums.YesNo.Yes) {
            this.currentScan = Enums.ReceptionScanner.Batch;
        } else if (this.material.isCar === Enums.YesNo.Yes) {
            this.currentScan = Enums.ReceptionScanner.VIN;
        } else {
            this.currentScan = Enums.ReceptionScanner.None;
        }
        return Promise.resolve(true);
    }

    async getScannedMaterial(barcode: string): Promise<boolean> {
        try {
            let materialRequest: DataRequest.GetScannedMaterialByLicenseInReceptionTask = DataRequest.Factory.createGetScannedMaterialByLicenseInReceptionTaskRequest(
                barcode,
                this.clientOwner,
                this.licenseId,
                this.taskId,
                this.settings.userCredentials
            );

            console.log(materialRequest)

            let result = await this.reception.validateBarcodeForLicense(
                materialRequest
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                let operation = await this.reception.getScannedMaterialByLicenseInReceptionTask(
                    materialRequest
                );
                if (operation.Resultado === Enums.OperationResult.Success) {
                    this.material = operation.ObjectData;
                    let defaultStatus = _.find(this.statusList, status => {
                        return status.numericValue === 1;
                    });
                    if (this.material.qualityControl === Enums.YesNo.Yes) {
                        let configuration = _.find(this.statusList, status => {
                            return status.numericValue === 2;
                        });
                        if (
                            configuration &&
                            this.isReceptionByPurchaseDocument
                        ) {
                            this.materialStatus = configuration.paramName;
                            this.statusDisabled = true;
                        } else if (
                            configuration &&
                            !this.isReceptionByPurchaseDocument
                        ) {
                            this.materialStatus = defaultStatus.paramName;
                            this.statusDisabled = false;
                        } else {
                            let message = await this.translate.translateGroupValue(
                                Enums.Translation.Groups.Alerts,
                                Enums.Translation.Alert.QAStatusIsNotAvailable
                            );
                            this.userInteraction.showError(message);
                            this.materialStatus = defaultStatus.paramName;
                            this.statusDisabled = false;
                        }
                    } else {
                        this.materialStatus = defaultStatus.paramName;
                        this.statusDisabled = false;
                    }

                    let materialExists = _.find(this.detail, material => {
                        return material.materialId === this.material.materialId;
                    });
                    if (
                        materialExists &&
                        materialExists.serialNumberRequests === Enums.YesNo.Yes
                    )
                        this.material.SerialNumbers =
                            materialExists.SerialNumbers;
                    return Promise.resolve(true);
                } else {
                    this.userInteraction.showCustomError(
                        operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : Enums.CustomErrorCodes.UnknownError
                    );
                    return Promise.resolve(false);
                }
            } else {
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(false);
            }
        } catch (reason) { console.log(reason)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
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

    async keyPressQuantity(keyCode: Enums.KeyCode): Promise<void> {
        if (
            keyCode === Enums.KeyCode.Enter &&
            this.material.materialId !== "" &&
            this.material.quantity > 0
        ) {
            if (!this.validateScannedMaterialFields()) {
                return this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.FieldsRequired
                );
            }    
            else if (!this.validateTolerance()){
                this.userInteraction.showError('El material esta vencido o no cumple con la tolerancia de expiración')      
            }
            else if (!this.validateCar()){
                this.userInteraction.showError('No se puede ingresar mas de 1 unindad con el mismo vin')
            }
            else {
                await this.checkIfMaterialIsOnTheDetail();
            }
        }
    }

    validateTolerance(): boolean{

        let today = new Date();
        let todayDateOnly: Date = new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23,
            59,
            59,
            999
        );

        let expirationDate = new Date(this.material.expirationDate) 

        let ToleranceDate = new Date()
        if (this.material.expirationTolerance>=0){
            ToleranceDate.setDate(todayDateOnly.getDate()+this.material.expirationTolerance)
        }

        if (
            this.material.batchRequested === Enums.YesNo.Yes &&
            (expirationDate.getTime() <= ToleranceDate.getTime())
        ) {    
            return false;
        }
        return true;
    }

    validateCar(): boolean{
        if (this.material.isCar === Enums.YesNo.Yes && this.material.quantity>1) {
            return false;
        }
        return true;
    }

    validateScannedMaterialFields(): boolean {
       

        if (
            this.material.batchRequested === Enums.YesNo.Yes &&
            (!this.material.batch)
        ) {    
            return false;
        }

        if (
            this.material.handleCaliber === Enums.YesNo.Yes &&
            !this.material.caliber
        ) {
            return false;
        }

        if (
            this.material.handleTone === Enums.YesNo.Yes &&
            !this.material.tone
        ) {
            return false;
        }

        if (this.material.isCar === Enums.YesNo.Yes && !this.material.vin) {
            return false;

        }

        return true;
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
            let addMaterial: DataRequest.AddMaterialToLicense = DataRequest.Factory.createAddMaterialToLicenseRequest(
                this.settings.userCredentials
            );

            addMaterial.licenseId = this.licenseId;
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
            addMaterial.enteredMeasurementUnit = this.material.measurementUnit;
            addMaterial.enteredMeasurementUnitQty = this.material.quantity;
            addMaterial.enteredMeasurementUnitConversionFactor = this.material.measurementQty;
            addMaterial.sourceLicenseId = null;

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
            return Promise.resolve(false);
        } catch (reason) { console.log(reason)
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

        this.detail.forEach(det => {
            if (det.materialId === material.materialId) {
                det.batch = material.batch;
                det.expirationDate = material.expirationDate;
                det.tone = material.tone;
                det.caliber = material.caliber;
                det.vin = material.vin;
            }
        });
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
                        } catch (e) { console.log(e)
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

    async locateLicense(): Promise<void> {
        try {
            if (this.detail.length < 1) return Promise.resolve();

            let params = {
                licenseId: this.licenseId,
                taskId: this.taskId,
                detail: this.detail,
                taskSubtype: this.receptionSubtype,
                clientOwner: this.clientOwner,
                isGeneralReception: this.isReceptionByPurchaseDocument,
                comesFrom: Enums.Page.GeneralReception,
                regime: this.regimenTask
            };
            this.navigation.pushPage(
                Enums.Page.LocateGeneralReceptionLicense,
                this.workspace,
                this.navCtrl,
                params
            );
            return Promise.resolve();
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }
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
                        try {
                            await this.userInteraction.showLoading();
                            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                            let result = await this.rollbackLicense();
                            if (
                                result.Resultado ===
                                Enums.OperationResult.Success
                            ) {
                                await this.navigation.popPage(
                                    this.workspace,
                                    this.navCtrl,
                                    {
                                        taskId: this.taskId,
                                        regime: this.regimenTask
                                    }
                                );
                                this.userInteraction.hideLoading();
                            } else {
                                await this.userInteraction.hideLoading();
                                this.userInteraction.showCustomError(
                                    Enums.CustomErrorCodes.DataBaseError
                                );
                            }
                        } catch (error) { console.log(error)
                            this.userInteraction.showCustomError(
                                Enums.CustomErrorCodes.DataBaseError
                            );
                        } finally {
                            await this.userInteraction.hideLoading();
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

    rollbackLicense(): Promise<DataResponse.Operation> {
        let license: DataRequest.RollBackLicense = DataRequest.Factory.createRollBackLicenseRequest(
            this.licenseId,
            this.settings.userCredentials
        );
        return this.reception.rollbackLicense(license);
    }

    async validateSuggestedLocation(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let validateSuggestedLocation: DataRequest.SuggestedLocation = DataRequest.Factory.createSuggestedLocation(
                this.licenseId,
                this.settings.userCredentials
            );

            let result: DataResponse.Operation = await this.locationSuggestion.validateSuggestedLocation(
                validateSuggestedLocation
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                switch (Number(result.DbData)) {
                    case Enums.ShowSuggestedLocation.No:
                        return this.locateLicense();
                    case Enums.ShowSuggestedLocation.SlottingByZona:
                        return this.suggestedLocation(
                            Enums.ShowSuggestedLocation.SlottingByZona
                        );
                    case Enums.ShowSuggestedLocation.Material:
                        return this.suggestedLocation(
                            Enums.ShowSuggestedLocation.Material
                        );
                    case Enums.ShowSuggestedLocation.All:
                        return this.suggestedLocation(
                            Enums.ShowSuggestedLocation.All
                        );
                }
            } else {
                await this.userInteraction.hideLoading();
                let code: Enums.CustomErrorCodes =
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError;
                this.userInteraction.showCustomError(code);
                return Promise.resolve();
            }
            await this.userInteraction.hideLoading();
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }
    }

    async suggestedLocation(
        showSuggestedLocation: Enums.ShowSuggestedLocation
    ): Promise<void> {
        try {
            let params = {
                licenseId: this.licenseId,
                taskId: this.taskId,
                clientOwner: this.clientOwner,
                detail: this.detail,
                taskSubtype: this.receptionSubtype,
                isGeneralReception: this.isReceptionByPurchaseDocument,
                showSuggestedLocation: showSuggestedLocation,
                location: "",
                regime: this.regimenTask
            };
            this.navigation.pushPage(
                Enums.Page.LocationSuggestion,
                this.workspace,
                this.navCtrl,
                params
            );
            return Promise.resolve();
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }
    }
}
