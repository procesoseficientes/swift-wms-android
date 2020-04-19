import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Subscription } from "rxjs/Subscription";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { DeviceProvider } from "../../providers/device/device";
import { Enums } from "../../enums/enums";
import { LicenseProvider } from "../../providers/license/license";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import * as _ from "lodash";
import { PickingProvider } from "../../providers/picking/picking";
import { TranslateProvider } from "../../providers/translate/translate";
import { ReceptionProvider } from "../../providers/reception/reception";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-relocate-partial-license-series",
    templateUrl: "relocate-partial-license-series.html"
})
export class RelocatePartialLicenseSeriesPage {
    materialStatus: string = "";
    baseLicenseId: number;
    licenseId: number;
    scanToken: Subscription;
    scanData: string;
    materialId: string;
    clientOwner: string;
    policyCode: string;
    material: Model.Material = Model.Factory.createMaterial();
    detail: Array<Model.Material> = [];
    scannedSeries: Array<
        DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
    > = [];
    availableSeries: Array<
        DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
    > = [];
    isAndroid: boolean = false;
    statusList: Array<Model.Configuration> = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteractionProvider: UserInteractionProvider,
        private device: DeviceProvider,
        private license: LicenseProvider,
        private settings: UserSettingsProvider,
        private picking: PickingProvider,
        private translate: TranslateProvider,
        private reception: ReceptionProvider,
        private configuration: ConfigurationProvider,
        private pickingProvider: PickingProvider
    ) {}

    userWantsToAddSeriesRank(): Promise<void> {
        this.navParams.data.operationType = Enums.TaskType.PartialRelocation;
        this.navParams.data.scannedSeries = this.scannedSeries;
        return this.navigation.pushPage(
            Enums.Page.AddSeriesRank,
            this.workspace,
            this.navCtrl,
            this.navParams.data
        );
    }

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    async ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        let params = this.navParams.data;
        this.baseLicenseId = params.baseLicenseId;
        this.licenseId = params.licenseId;
        this.materialId = params.material.materialId;
        this.material = params.material;
        this.detail = params.detail;
        this.clientOwner = params.clientOwner;
        this.policyCode = params.policyCode;

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

        this.material.SerialNumbers =
            this.material.SerialNumbers == null
                ? []
                : this.material.SerialNumbers;

        this.scannedSeries =
            params.scannedSeries == null ? [] : params.scannedSeries;

        this.material.SerialNumbers.forEach(
            (serial: Model.MaterialSerialNumber) => {
                let serie: DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES = {
                    SERIAL: serial.serial,
                    LICENSE_ID: params.baseLicenseId,
                    MATERIAL_ID: this.materialId
                };
                this.scannedSeries.push(serie);
            }
        );
        this.material.SerialNumbers = [];
        this.getAvailableLicenseSeries();

        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );

        this.userInteractionProvider.hideLoading();
    }

    public async getAvailableLicenseSeries() {
        let request: DataRequest.GetAvailableLicenseSeries = DataRequest.Factory.createGetAvailableLicenseSeriesRequest(
            this.baseLicenseId,
            this.materialId,
            this.settings.userCredentials
        );

        this.availableSeries = await this.license.getAvailableLicenseSeries(
            request
        );
    }

    async processBarcodeScan(scanData: string): Promise<any> {
        this.scanData = scanData;
        if (!this.verifyIfIsValidSerie() && !this.checkIfSerieWasScanned()) {
            this.scanData = "";
            return this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                scanData
            );
        }

        if (this.checkIfSerieWasScanned()) {
            return this.showDeleteSerieConfirmation(this.scanData);
        } else {
            return this.insertSeries(this.scanData);
        }
    }

    public async insertSeries(serie: string): Promise<DataResponse.Operation> {
        try {
            await this.userInteractionProvider.showLoading();

            let serieRequest = DataRequest.Factory.createUpdateScannedSerialNumberToProcessRequest(
                serie,
                this.baseLicenseId,
                null,
                null,
                this.materialId,
                Enums.TaskType.PartialRelocation,
                this.settings.userCredentials
            );

            let response: DataResponse.Operation = await this.picking.updateScannedSerialNumberToProcess(
                serieRequest
            );

            if (response.Resultado === Enums.OperationResult.Success) {
                let serial = _.find(
                    this.availableSeries,
                    (
                        serialNumber: DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
                    ) => {
                        return serialNumber.SERIAL === serie;
                    }
                );
                _.pull(this.availableSeries, serial);
                this.scannedSeries.push(serial);
                await this.userInteractionProvider.hideLoading();
            } else {
                await this.userInteractionProvider.hideLoading();
                this.userInteractionProvider.showCustomError(
                    response.Codigo && response.Codigo > 0
                        ? response.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
            }

            return Promise.resolve(response);
        } catch (e) {
            await this.userInteractionProvider.hideLoading();
            this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            let error = Model.Factory.createFaultOperation({
                code: Enums.CustomErrorCodes.UnknownError,
                message: e.message
            });
            return Promise.resolve(error);
        } finally {
            this.scanData = "";
        }
    }

    public verifyIfIsValidSerie(): DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES {
        return this.availableSeries.find(
            (
                serialNumber: DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
            ) => {
                return serialNumber.SERIAL === this.scanData;
            }
        );
    }

    public checkIfSerieWasScanned(): boolean {
        let serie = this.scannedSeries.find(
            (
                serialNumber: DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
            ) => {
                return serialNumber.SERIAL === this.scanData;
            }
        );
        return !!serie;
    }

    public async showDeleteSerieConfirmation(serie: string): Promise<void> {
        let message: string = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Alerts,
            Enums.Translation.Alert.DeleteSerie
        );
        let result = await this.userInteractionProvider.showConfirmMessage(
            message
        );
        if (result === Enums.YesNo.Yes) {
            await this.userInteractionProvider.showLoading();
            this.deleteSerie(serie);
        }
        return Promise.resolve();
    }

    public async deleteSerie(serialNumber: string): Promise<Model.Operation> {
        try {
            let serie = _.find(
                this.scannedSeries,
                (
                    serie: DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
                ) => {
                    return serie.SERIAL === serialNumber;
                }
            );
            let serieRequest: DataRequest.UpdateSetActiveSerialNumber = DataRequest.Factory.createUpdateSetActiveSerialNumberRequest(
                this.baseLicenseId,
                Enums.YesNo.No,
                this.materialId,
                serialNumber,
                Enums.TaskType.PartialRelocation,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.picking.updateSetActiveSerialNumber(
                serieRequest
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                this.availableSeries.push(serie);

                _.pull(this.scannedSeries, serie);

                this.getAvailableLicenseSeries();
                this.userInteractionProvider.hideLoading();
                return Promise.resolve(response);
            } else {
                await this.userInteractionProvider.hideLoading();
                this.userInteractionProvider.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
                return Promise.resolve(response);
            }
        } catch (reason) {
            await this.userInteractionProvider.hideLoading();
            this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            let operation = Model.Factory.createFaultOperation(
                <Model.CustomError>{
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: reason
                }
            );
            return Promise.resolve(operation);
        } finally {
            this.scanData = "";
        }
    }

    keyPressSerie(key: number): void {
        if (key === Enums.KeyCode.Enter) {
            this.processBarcodeScan(this.scanData);
        }
    }

    private async rollBackSeries(): Promise<void> {
        try {
            await this.userInteractionProvider.showLoading();
            let request: DataRequest.RollbackSerialNumbersOnProcess = DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(
                this.baseLicenseId,
                null,
                this.material.materialId,
                Enums.TaskType.PartialRelocation,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.pickingProvider.rollbackSerialNumbersOnProcess(
                request
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                this.scannedSeries = [];
                return Promise.resolve();
            } else {
                await this.userInteractionProvider.hideLoading();
                await this.userInteractionProvider.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (reason) {
            await this.userInteractionProvider.hideLoading();
            await this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
        return Promise.resolve();
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

    async acceptSeries(): Promise<void> {
        this.material.SerialNumbers =
            this.material.SerialNumbers == null
                ? []
                : this.material.SerialNumbers;
        this.scannedSeries.forEach(
            (serie: DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES) => {
                let s: Model.MaterialSerialNumber = Model.Factory.createSerialNumber();
                s.serial = serie.SERIAL;
                this.material.SerialNumbers.push(s);
            }
        );
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

        this.navigation.popPage(this.workspace, this.navCtrl, {
            targetLicenseId: this.licenseId,
            sourceLicenseId: this.baseLicenseId,
            clientOwner: this.clientOwner,
            policyCode: this.policyCode,
            detail: this.detail,
            action: action,
            material: this.material
        });
    }

    public backButtonAction(): Promise<any> {
        return this.confirmRollbackSeries();
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
            addMaterial.sourceLicenseId = this.baseLicenseId;

            let result: DataResponse.Operation = await this.reception.addMaterialToLicense(
                addMaterial
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                this.material.materialStatus = this.materialStatus;
                return Promise.resolve();
            } else {
                this.userInteractionProvider.showError(result.Mensaje);
            }
        } catch (reason) {
            this.userInteractionProvider.showError(reason.message);
        }
    }
}
