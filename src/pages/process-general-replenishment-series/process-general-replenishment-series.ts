import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../../providers/translate/translate";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { PickingProvider } from "../../providers/picking/picking";
import * as _ from "lodash";
@IonicPage()
@Component({
    selector: "page-process-general-replenishment-series",
    templateUrl: "process-general-replenishment-series.html"
})
export class ProcessGeneralReplenishmentSeriesPage {
    material: Model.Material = Model.Factory.createMaterial();
    task: Model.Task = Model.Factory.createTask();
    taskHeader: Model.PickingTaskHeader;
    scanToken: Subscription;
    scanData: string;
    scannedSeries: Array<Model.MaterialSerialNumber>;
    processSku: Model.ProcessSku;
    labelId: number;
    isAndroid: boolean = false;
    materials: Array<
        DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
    > = [];
    licenseDispatchId: number = 0;
    regimenTask: Enums.Regime = Enums.Regime.General;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteractionProvider: UserInteractionProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private translate: TranslateProvider,
        private picking: PickingProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter(): void {
        this.isAndroid = this.device.isAndroid();
        this.scannedSeries = [];
        this.task = this.navParams.data.task as Model.Task;
        this.labelId = this.navParams.data.labelId;
        this.taskHeader = this.navParams.data
            .taskHeader as Model.PickingTaskHeader;
        this.processSku = this.navParams.data.processSku as Model.ProcessSku;
        this.materials = this.navParams.data.materials;
        this.licenseDispatchId = this.navParams.data.labelDispatchId;
        this.material = this.taskHeader.Material;
        this.material.quantity = this.task.quantityPending;
        this.licenseDispatchId = this.navParams.data.labelDispatchId;
        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );
        this.regimenTask = this.navParams.data.regime;
        this.userInteractionProvider.hideLoading();
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    async processBarcodeScan(scanData: string): Promise<any> {
        this.scanData = scanData;
        if (
            this.task.isDiscretionary === Enums.YesNo.Yes &&
            !this.verifyIfIsValidSerie() &&
            !this.checkIfSerieWasScanned()
        ) {
            this.scanData = "";
            return this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                scanData
            );
        }
        if (this.checkIfSerieWasScanned()) {
            return this.showDeleteSerieConfirmation(this.scanData);
        } else {
            return this.insertSerie(this.scanData);
        }
    }

    private verifyIfIsValidSerie(): Model.MaterialSerialNumber {
        return this.material.SerialNumbers.find(
            (serialNumber: Model.MaterialSerialNumber) => {
                return serialNumber.serial === this.scanData;
            }
        );
    }

    keyPressSerie(key: number): void {
        if (key === Enums.KeyCode.Enter) {
            this.processBarcodeScan(this.scanData);
        }
    }

    private async insertSerie(serie: string): Promise<any> {
        try {
            await this.userInteractionProvider.showLoading();

            let serieRequest = DataRequest.Factory.createUpdateScannedSerialNumberToProcessRequest(
                serie,
                this.task.licenseIdSource,
                1,
                this.task.wavePickingId,
                this.task.materialId,
                Enums.TaskType.GeneralDispatch,
                this.settings.userCredentials
            );

            let response: DataResponse.Operation = await this.picking.updateScannedSerialNumberToProcess(
                serieRequest
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                --this.material.quantity;
                if (this.task.isDiscretionary === Enums.YesNo.Yes) {
                    let serial = _.find(
                        this.material.SerialNumbers,
                        (serialNumber: Model.MaterialSerialNumber) => {
                            return serialNumber.serial === serie;
                        }
                    );
                    _.pull(this.material.SerialNumbers, serial);
                    this.scannedSeries.push(serial);
                } else {
                    let serial: Model.MaterialSerialNumber = Model.Factory.createSerialNumber();
                    serial.wavePickingId = this.task.wavePickingId;
                    serial.assignedTo = this.settings.login;
                    serial.serial = serie;
                    serial.materialId = this.material.materialId;
                    this.scannedSeries.push(serial);
                }
            } else {
                this.userInteractionProvider.showCustomError(
                    response.Codigo && response.Codigo > 0
                        ? response.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
            }
        } catch (reason) {
            this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteractionProvider.hideLoading();
            this.scanData = "";
        }
    }

    private checkIfSerieWasScanned(): boolean {
        let serie = this.scannedSeries.find(
            (serialNumber: Model.MaterialSerialNumber) => {
                return serialNumber.serial === this.scanData;
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
                (serie: Model.MaterialSerialNumber) => {
                    return serie.serial === serialNumber;
                }
            );
            let serieRequest: DataRequest.UpdateSetActiveSerialNumber = DataRequest.Factory.createUpdateSetActiveSerialNumberRequest(
                this.task.licenseIdSource,
                this.task.wavePickingId,
                this.task.materialId,
                serialNumber,
                Enums.TaskType.GeneralDispatch,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.picking.updateSetActiveSerialNumber(
                serieRequest
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                ++this.material.quantity;
                if (this.task.isDiscretionary === Enums.YesNo.Yes) {
                    this.material.SerialNumbers.push(serie);
                }

                _.pull(this.scannedSeries, serie);
                return Promise.resolve(response);
            } else {
                this.userInteractionProvider.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
                return Promise.resolve(response);
            }
        } catch (reason) {
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
            this.userInteractionProvider.hideLoading();
        }
    }

    backButtonAction(): void {
        this.confirmRollbackSeries();
    }

    userWantsToFinishProcesingSeries(): void {
        this.processSku.quantity = this.scannedSeries.length;
        this.navigation.popPage(this.workspace, this.navCtrl, {
            task: this.task,
            taskHeader: this.taskHeader,
            processSku: this.processSku,
            labelId: this.labelId,
            materials: this.materials,
            labelDispatchId: this.licenseDispatchId,
            regime: this.regimenTask
        });
    }

    public async userWantsToRollbackSeries(): Promise<void> {
        try {
            await this.userInteractionProvider.showLoading();
            let request: DataRequest.RollbackSerialNumbersOnProcess = DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(
                this.task.licenseIdSource,
                this.task.wavePickingId,
                this.task.materialId,
                Enums.TaskType.GeneralDispatch,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.picking.rollbackSerialNumbersOnProcess(
                request
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                if (this.task.isDiscretionary === Enums.YesNo.Yes) {
                    this.material.SerialNumbers = this.material.SerialNumbers.concat(
                        this.scannedSeries
                    );
                }

                this.navigation.popPage(
                    this.workspace,
                    this.navCtrl,
                    <Model.ProcessGeneralPickingParams>{
                        task: this.task,
                        taskHeader: this.taskHeader,
                        labelId: this.labelId,
                        materials: this.materials,
                        processSku: this.processSku,
                        labelDispatchId: this.licenseDispatchId,
                        regime: this.regimenTask
                    }
                );
                return Promise.resolve();
            } else {
                await this.userInteractionProvider.hideLoading();
                await this.userInteractionProvider.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
                return Promise.reject(response.Mensaje);
            }
        } catch (reason) {
            await this.userInteractionProvider.hideLoading();
            await this.userInteractionProvider.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.reject(reason.message);
        }
    }

    public async confirmRollbackSeries() {
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
                handler: () => {
                    this.userInteractionProvider.activeAlert = null;
                    return this.userWantsToRollbackSeries();
                }
            }
        ];
        return this.userInteractionProvider.showOptionAlert(
            null,
            buttons,
            Enums.Translation.Alert.RollbackSeries
        );
    }
}
