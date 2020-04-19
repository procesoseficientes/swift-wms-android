import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { ReceptionProvider } from "../../providers/reception/reception";
import * as _ from "lodash";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../../providers/translate/translate";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import { PickingProvider } from "../../providers/picking/picking";

@IonicPage()
@Component({
    selector: "page-general-reception-series",
    templateUrl: "general-reception-series.html"
})
export class GeneralReceptionSeriesPage {
    materialStatus: string = "";
    material: Model.Material;
    clientOwner: string = "";
    licenseId: number = 0;
    taskId: number = 0;
    serial: string = "";
    detail: Array<Model.Material> = [];
    action: Enums.ReceptionAction;
    scanToken: Subscription;
    scanData: string;
    isAndroid: boolean = false;
    receptionSubtype: Enums.TaskSubType;
    statusList: Array<Model.Configuration> = [];
    isReceptionByPurchaseDocument: boolean;
    statusDisabled: boolean;
    regimenTask: Enums.Regime = Enums.Regime.General;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private reception: ReceptionProvider,
        private userInteractionProvider: UserInteractionProvider,
        private translate: TranslateProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private configuration: ConfigurationProvider,
        private userInteraction: UserInteractionProvider,
        private pickingProvider: PickingProvider
    ) {
        this.material = Model.Factory.createMaterial();
    }
    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    userWantsToAddSeriesRank(): Promise<void> {
        this.navParams.data.operationType = Enums.TaskType.Reception;
        return this.navigation.pushPage(
            Enums.Page.AddSeriesRank,
            this.workspace,
            this.navCtrl,
            this.navParams.data
        );
    }

    private async processBarcodeScan(scanData: string): Promise<void> {
        this.scanData = scanData;
        this.serial = scanData;
        if (this.checkIfSerieExists()) {
            return this.showDeleteSerieConfirmation(this.serial);
        } else {
            return this.insertSerie(this.serial);
        }
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    async ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );

        let params = <Model.GeneralReceptionSeriesParam>this.navParams.data;
        this.clientOwner = params.clientOwner;
        this.taskId = params.taskId;
        this.licenseId = params.licenseId;
        this.material = params.material;
        this.regimenTask = params.regime;

        //---
        let configWhere = DataRequest.Factory.createGetConfigurationRequest(
            this.settings.userCredentials
        );
        configWhere.paramType = Enums.ConfigurationParamType.Status;
        configWhere.paramGroup = Enums.ConfigurationParamGroup.Status;

        let configs: Array<
            Model.Configuration
        > = await this.configuration.findConfigurations(configWhere);
        this.statusList = _.orderBy(configs, "numericValue", "desc");

        this.materialStatus = params.materialStatus;
        //---

        this.action = params.action;
        this.detail = params.detail;
        this.material.quantity = this.material.SerialNumbers.length;
        this.receptionSubtype = params.taskSubtype;
        this.isReceptionByPurchaseDocument =
            params.isReceptionByPurchaseDocument;
        await this.checkMaterialStatus();
        this.userInteractionProvider.hideLoading();
    }

    async checkMaterialStatus() {
        let defaultStatus = _.find(this.statusList, status => {
            return status.numericValue === 1;
        });
        if (this.material.qualityControl === Enums.YesNo.Yes) {
            let configuration = _.find(this.statusList, status => {
                return status.numericValue === 2;
            });
            if (configuration && this.isReceptionByPurchaseDocument) {
                this.materialStatus = configuration.paramName;
                this.statusDisabled = true;
            } else if (configuration && !this.isReceptionByPurchaseDocument) {
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
    }

    async backButtonAction(): Promise<void> {
        let params = {
            material: this.material,
            action: this.action,
            licenseId: this.licenseId,
            taskId: this.taskId,
            clientOwner: this.clientOwner,
            detail: this.detail,
            taskSubtype: this.receptionSubtype,
            regime: this.regimenTask
        };

        if (this.material.SerialNumbers.length === 0) {
            return this.navigation.popPage(
                this.workspace,
                this.navCtrl,
                params
            );
        } else {
            await this.addMaterialToLicense(this.action);
            return this.navigation.popPage(
                this.workspace,
                this.navCtrl,
                params
            );
        }
    }

    public async keyPressSerie(key: number): Promise<void> {
        if (key === Enums.KeyCode.Enter) {
            if (!this.serial) return;
            if (this.checkIfSerieExists()) {
                return this.showDeleteSerieConfirmation(this.serial);
            } else {
                return this.insertSerie(this.serial);
            }
        }
    }

    private checkIfSerieExists(): boolean {
        let serie = this.material.SerialNumbers.find(
            (serialNumber: Model.MaterialSerialNumber) => {
                return serialNumber.serial === this.serial;
            }
        );
        return !!serie;
    }

    private async insertSerie(serie: string): Promise<void> {
        try {
            await this.userInteractionProvider.showLoading();
            let serieRequest = DataRequest.Factory.createInsertMaterialBySerialNumberRequest(
                this.licenseId,
                this.material.materialId,
                serie,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.reception.insertMaterialBySerialNumber(
                serieRequest
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                ++this.material.quantity;
                let serial: Model.MaterialSerialNumber = Model.Factory.createSerialNumber();
                serial.id = Number(response.DbData);
                serial.licenseId = this.licenseId;
                serial.materialId = this.material.materialId;
                serial.serial = this.serial;
                this.material.SerialNumbers.push(serial);
            } else {
                await this.userInteractionProvider.hideLoading();
                let code: Enums.CustomErrorCodes =
                    response.Codigo && response.Codigo > 0
                        ? response.Codigo
                        : Enums.CustomErrorCodes.UnknownError;
                this.userInteractionProvider.showCustomError(code);
            }
        } catch (reason) {
            this.userInteractionProvider.showError(reason);
        } finally {
            this.userInteractionProvider.hideLoading();
            this.serial = "";
        }
    }

    private async deleteSerie(s: string): Promise<void> {
        try {
            let serie = _.find(
                this.material.SerialNumbers,
                (sN: Model.MaterialSerialNumber) => {
                    return sN.serial === s;
                }
            );
            let serieRequest = DataRequest.Factory.createDeleteMaterialBySerialNumberRequest(
                serie.id,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.reception.deleteMaterialBySerialNumber(
                serieRequest
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                --this.material.quantity;
                _.pull(this.material.SerialNumbers, serie);
            } else {
                this.userInteractionProvider.showError(response.Mensaje);
            }
            this.userInteractionProvider.hideLoading();
        } catch (reason) {
            this.userInteractionProvider.showError(reason);
        } finally {
            this.userInteractionProvider.hideLoading();
            this.serial = "";
        }
    }

    public async showDeleteSerieConfirmation(s: string): Promise<void> {
        await this.userInteractionProvider.hideLoading();

        let confirmation = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Alerts,
            Enums.Translation.Alert.DeleteSerie
        );
        let result = await this.userInteractionProvider.showConfirmMessage(
            confirmation
        );
        if (result === Enums.YesNo.Yes) {
            await this.userInteractionProvider.showLoading();
            return this.deleteSerie(s);
        } else {
            return Promise.resolve();
        }
    }

    private async addMaterialToLicense(
        action: Enums.ReceptionAction
    ): Promise<void> {
        try {
            await this.userInteractionProvider.showLoading();
            let addMaterial: DataRequest.AddMaterialToLicense = DataRequest.Factory.createAddMaterialToLicenseRequest(
                this.settings.userCredentials
            );

            addMaterial.licenseId = this.licenseId;
            addMaterial.barcode = this.material.barcodeId;
            addMaterial.qty = this.material.quantity;
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
            addMaterial.sourceLicenseId = null;
            addMaterial.enteredMeasurementUnit = this.material.measurementUnit;
            addMaterial.enteredMeasurementUnitQty = this.material.measurementQty;
            addMaterial.enteredMeasurementUnitConversionFactor = this.material.quantity;

            let result: DataResponse.Operation = await this.reception.addMaterialToLicense(
                addMaterial
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                this.material.materialStatus = this.materialStatus;
                return Promise.resolve();
            } else {
                this.detail = [];
                this.material.quantity = 0;
                this.material.SerialNumbers = [];
                this.userInteractionProvider.showError(result.Mensaje);
            }
        } catch (reason) {
            this.userInteractionProvider.showError(reason.message);
        }
    }

    public async confirmRollbackSeries(): Promise<any> {
        let buttonNo: string = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Buttons,
            Enums.Translation.Button.No
        );
        let buttonYes: string = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Buttons,
            Enums.Translation.Button.Yes
        );

        let buttons = [
            {
                text: buttonNo,
                role: "cancel",
                handler: () => {
                    this.userInteractionProvider.activeAlert = null;
                }
            },
            {
                text: buttonYes,
                handler: async () => {
                    this.userInteractionProvider.activeAlert = null;
                    await this.rollBackSeries();
                    return this.acceptSeries();
                }
            }
        ];
        return this.userInteractionProvider.showOptionAlert(
            null,
            buttons,
            Enums.Translation.Alert.RollbackSeries
        );
    }

    private async acceptSeries(): Promise<void> {
        this.material.quantity = this.material.SerialNumbers.length;

        let exists: Model.Material = _.find(
            this.detail,
            (material: Model.Material) => {
                return material.materialId === this.material.materialId;
            }
        );
        if (exists && this.material.SerialNumbers.length == 0) {
            this.detail = _.filter(
                this.detail,
                (materialDetail: Model.Material) => {
                    return (
                        materialDetail.materialId != this.material.materialId
                    );
                }
            );
        }
        let action: Enums.ReceptionAction;
        action = exists
            ? Enums.ReceptionAction.Update
            : Enums.ReceptionAction.Insert;

        await this.addMaterialToLicense(action);

        let params = {
            material: this.material,
            action: this.action,
            licenseId: this.licenseId,
            taskId: this.taskId,
            clientOwner: this.clientOwner,
            detail: this.detail,
            taskSubtype: this.receptionSubtype,
            regime: this.regimenTask
        };

        return this.navigation.popPage(this.workspace, this.navCtrl, params);
    }

    private async rollBackSeries(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let request: DataRequest.RollbackSerialNumbersOnProcess = DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(
                this.licenseId,
                null,
                this.material.materialId,
                Enums.TaskType.Reception,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.pickingProvider.rollbackSerialNumbersOnProcess(
                request
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                this.material.quantity = 0;
                this.material.SerialNumbers = [];
                return Promise.resolve();
            } else {
                await this.userInteraction.hideLoading();
                await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (reason) {
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
        return Promise.resolve();
    }
}
