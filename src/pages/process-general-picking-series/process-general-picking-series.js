"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const models_1 = require("../../models/models");
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const device_1 = require("../../providers/device/device");
const enums_1 = require("../../enums/enums");
const translate_1 = require("../../providers/translate/translate");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const picking_1 = require("../../providers/picking/picking");
const _ = require("lodash");
let ProcessGeneralPickingSeriesPage = class ProcessGeneralPickingSeriesPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteractionProvider, device, settings, translate, picking) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteractionProvider = userInteractionProvider;
        this.device = device;
        this.settings = settings;
        this.translate = translate;
        this.picking = picking;
        this.material = models_1.Model.Factory.createMaterial();
        this.task = models_1.Model.Factory.createTask();
        this.isAndroid = false;
        this.materials = [];
        this.licenseDispatchId = 0;
        this.regimenTask = enums_1.Enums.Regime.General;
    }
    userWantsToAddSeriesRank() {
        this.navParams.data.operationType = enums_1.Enums.TaskType.GeneralDispatch;
        this.navParams.data.scannedSeries = this.scannedSeries;
        this.navParams.data.quantity = this.material.quantity;
        this.navParams.data.regime = this.regimenTask;
        return this.navigation.pushPage(enums_1.Enums.Page.AddSeriesRank, this.workspace, this.navCtrl, this.navParams.data);
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        this.scannedSeries =
            this.navParams.data.scannedSeries == null
                ? []
                : this.navParams.data.scannedSeries;
        this.task = this.navParams.data.task;
        this.labelId = this.navParams.data.labelId;
        this.taskHeader = this.navParams.data
            .taskHeader;
        this.processSku = this.navParams.data.processSku;
        this.materials = this.navParams.data.materials;
        this.licenseDispatchId = this.navParams.data.labelDispatchId;
        this.material = this.taskHeader.Material;
        this.regimenTask = this.navParams.data.regime;
        if (this.navParams.data.quantity != null &&
            this.navParams.data.quantity >= 0) {
            this.material.quantity = this.navParams.data.quantity;
        }
        else {
            this.material.quantity = this.task.quantityPending;
        }
        this.licenseDispatchId = this.navParams.data.labelDispatchId;
        if (this.taskHeader.ScannedSeries != null) {
            this.taskHeader.ScannedSeries.forEach(serialEach => {
                if (this.task.isDiscretionary === enums_1.Enums.YesNo.Yes) {
                    let serial = _.find(this.material.SerialNumbers, (serialNumber) => {
                        return serialNumber.serial === serialEach.serial;
                    });
                    _.pull(this.material.SerialNumbers, serial);
                }
                let serialFind = _.find(this.scannedSeries, (serialNumber) => {
                    return serialNumber.serial === serialEach.serial;
                });
                if (!serialFind) {
                    if (this.material.quantity > 0)
                        --this.material.quantity;
                    this.scannedSeries.push(serialEach);
                }
            });
            this.taskHeader.ScannedSeries = [];
        }
        this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
        this.userInteractionProvider.hideLoading();
    }
    scanBarcode() {
        return this.device.scan();
    }
    processBarcodeScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scanData = scanData;
            if (this.task.isDiscretionary === enums_1.Enums.YesNo.Yes &&
                !this.verifyIfIsValidSerie() &&
                !this.checkIfSerieWasScanned()) {
                this.scanData = "";
                return this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, scanData);
            }
            if (this.checkIfSerieWasScanned()) {
                return this.showDeleteSerieConfirmation(this.scanData);
            }
            else {
                return this.insertSerie(this.scanData);
            }
        });
    }
    verifyIfIsValidSerie() {
        return this.material.SerialNumbers.find((serialNumber) => {
            return serialNumber.serial === this.scanData;
        });
    }
    keyPressSerie(key) {
        if (key === enums_1.Enums.KeyCode.Enter) {
            this.processBarcodeScan(this.scanData);
        }
    }
    insertSerie(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteractionProvider.showLoading();
                let serieRequest = models_1.DataRequest.Factory.createUpdateScannedSerialNumberToProcessRequest(serie, this.task.licenseIdSource, 1, this.task.wavePickingId, this.task.materialId, enums_1.Enums.TaskType.GeneralDispatch, this.settings.userCredentials);
                let response = yield this.picking.updateScannedSerialNumberToProcess(serieRequest);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    --this.material.quantity;
                    if (this.task.isDiscretionary === enums_1.Enums.YesNo.Yes) {
                        let serial = _.find(this.material.SerialNumbers, (serialNumber) => {
                            return serialNumber.serial === serie;
                        });
                        _.pull(this.material.SerialNumbers, serial);
                        this.scannedSeries.push(serial);
                    }
                    else {
                        let serial = models_1.Model.Factory.createSerialNumber();
                        serial.wavePickingId = this.task.wavePickingId;
                        serial.assignedTo = this.settings.login;
                        serial.serial = serie;
                        serial.materialId = this.material.materialId;
                        this.scannedSeries.push(serial);
                    }
                }
                else {
                    this.userInteractionProvider.showCustomError(response.Codigo && response.Codigo > 0
                        ? response.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
            }
            catch (reason) {
                this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.userInteractionProvider.hideLoading();
                this.scanData = "";
            }
        });
    }
    checkIfSerieWasScanned() {
        let serie = this.scannedSeries.find((serialNumber) => {
            return serialNumber.serial === this.scanData;
        });
        return !!serie;
    }
    showDeleteSerieConfirmation(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DeleteSerie);
            let result = yield this.userInteractionProvider.showConfirmMessage(message);
            if (result === enums_1.Enums.YesNo.Yes) {
                yield this.userInteractionProvider.showLoading();
                this.deleteSerie(serie);
            }
            return Promise.resolve();
        });
    }
    deleteSerie(serialNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serie = _.find(this.scannedSeries, (serie) => {
                    return serie.serial === serialNumber;
                });
                let serieRequest = models_1.DataRequest.Factory.createUpdateSetActiveSerialNumberRequest(this.task.licenseIdSource, this.task.wavePickingId, this.task.materialId, serialNumber, enums_1.Enums.TaskType.GeneralDispatch, this.settings.userCredentials);
                let response = yield this.picking.updateSetActiveSerialNumber(serieRequest);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    ++this.material.quantity;
                    if (this.task.isDiscretionary === enums_1.Enums.YesNo.Yes) {
                        this.material.SerialNumbers.push(serie);
                    }
                    _.pull(this.scannedSeries, serie);
                    return Promise.resolve(response);
                }
                else {
                    this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                    return Promise.resolve(response);
                }
            }
            catch (reason) {
                this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                let operation = models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: reason
                });
                return Promise.resolve(operation);
            }
            finally {
                this.scanData = "";
                this.userInteractionProvider.hideLoading();
            }
        });
    }
    backButtonAction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.confirmRollbackSeries();
            }
            catch (error) {
                this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
            }
        });
    }
    userWantsToFinishProcesingSeries() {
        this.processSku.quantity = this.scannedSeries.length;
        this.navigation.popPage(this.workspace, this.navCtrl, {
            task: this.task,
            taskHeader: this.taskHeader,
            processSku: this.processSku,
            labelId: this.labelId,
            materials: this.materials,
            labelDispatchId: this.licenseDispatchId,
            completeScanSeries: true,
            regime: this.regimenTask
        });
    }
    userWantsToRollbackSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteractionProvider.showLoading();
                let request = models_1.DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(this.task.licenseIdSource, this.task.wavePickingId, this.task.materialId, enums_1.Enums.TaskType.GeneralDispatch, this.settings.userCredentials);
                let response = yield this.picking.rollbackSerialNumbersOnProcess(request);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    if (this.task.isDiscretionary === enums_1.Enums.YesNo.Yes) {
                        this.material.SerialNumbers = this.material.SerialNumbers.concat(this.scannedSeries);
                    }
                    this.navigation.popPage(this.workspace, this.navCtrl, {
                        task: this.task,
                        taskHeader: this.taskHeader,
                        labelId: this.labelId,
                        materials: this.materials,
                        processSku: this.processSku,
                        labelDispatchId: this.licenseDispatchId,
                        completeScanSeries: false,
                        regime: this.regimenTask
                    });
                    return Promise.resolve();
                }
                else {
                    yield this.userInteractionProvider.hideLoading();
                    yield this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                    return Promise.reject(response.Mensaje);
                }
            }
            catch (reason) {
                yield this.userInteractionProvider.hideLoading();
                yield this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.reject(reason.message);
            }
        });
    }
    confirmRollbackSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            let buttonNo = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.No);
            let buttonYes = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Yes);
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
            return this.userInteractionProvider.showOptionAlert(null, buttons, enums_1.Enums.Translation.Alert.RollbackSeries);
        });
    }
};
ProcessGeneralPickingSeriesPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-process-general-picking-series",
        templateUrl: "process-general-picking-series.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        translate_1.TranslateProvider,
        picking_1.PickingProvider])
], ProcessGeneralPickingSeriesPage);
exports.ProcessGeneralPickingSeriesPage = ProcessGeneralPickingSeriesPage;
//# sourceMappingURL=process-general-picking-series.js.map