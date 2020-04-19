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
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const models_1 = require("../../models/models");
const reception_1 = require("../../providers/reception/reception");
const _ = require("lodash");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const translate_1 = require("../../providers/translate/translate");
const device_1 = require("../../providers/device/device");
const configuration_1 = require("../../providers/configuration/configuration");
const picking_1 = require("../../providers/picking/picking");
let GeneralReceptionSeriesPage = class GeneralReceptionSeriesPage {
    constructor(navCtrl, navParams, navigation, workspace, reception, userInteractionProvider, translate, device, settings, configuration, userInteraction, pickingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.reception = reception;
        this.userInteractionProvider = userInteractionProvider;
        this.translate = translate;
        this.device = device;
        this.settings = settings;
        this.configuration = configuration;
        this.userInteraction = userInteraction;
        this.pickingProvider = pickingProvider;
        this.materialStatus = "";
        this.clientOwner = "";
        this.licenseId = 0;
        this.taskId = 0;
        this.serial = "";
        this.detail = [];
        this.isAndroid = false;
        this.statusList = [];
        this.regimenTask = enums_1.Enums.Regime.General;
        this.material = models_1.Model.Factory.createMaterial();
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    userWantsToAddSeriesRank() {
        this.navParams.data.operationType = enums_1.Enums.TaskType.Reception;
        return this.navigation.pushPage(enums_1.Enums.Page.AddSeriesRank, this.workspace, this.navCtrl, this.navParams.data);
    }
    processBarcodeScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scanData = scanData;
            this.serial = scanData;
            if (this.checkIfSerieExists()) {
                return this.showDeleteSerieConfirmation(this.serial);
            }
            else {
                return this.insertSerie(this.serial);
            }
        });
    }
    scanBarcode() {
        return this.device.scan();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
            let params = this.navParams.data;
            this.clientOwner = params.clientOwner;
            this.taskId = params.taskId;
            this.licenseId = params.licenseId;
            this.material = params.material;
            this.regimenTask = params.regime;
            //---
            let configWhere = models_1.DataRequest.Factory.createGetConfigurationRequest(this.settings.userCredentials);
            configWhere.paramType = enums_1.Enums.ConfigurationParamType.Status;
            configWhere.paramGroup = enums_1.Enums.ConfigurationParamGroup.Status;
            let configs = yield this.configuration.findConfigurations(configWhere);
            this.statusList = _.orderBy(configs, "numericValue", "desc");
            this.materialStatus = params.materialStatus;
            //---
            this.action = params.action;
            this.detail = params.detail;
            this.material.quantity = this.material.SerialNumbers.length;
            this.receptionSubtype = params.taskSubtype;
            this.isReceptionByPurchaseDocument =
                params.isReceptionByPurchaseDocument;
            yield this.checkMaterialStatus();
            this.userInteractionProvider.hideLoading();
        });
    }
    checkMaterialStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            let defaultStatus = _.find(this.statusList, status => {
                return status.numericValue === 1;
            });
            if (this.material.qualityControl === enums_1.Enums.YesNo.Yes) {
                let configuration = _.find(this.statusList, status => {
                    return status.numericValue === 2;
                });
                if (configuration && this.isReceptionByPurchaseDocument) {
                    this.materialStatus = configuration.paramName;
                    this.statusDisabled = true;
                }
                else if (configuration && !this.isReceptionByPurchaseDocument) {
                    this.materialStatus = defaultStatus.paramName;
                    this.statusDisabled = false;
                }
                else {
                    let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.QAStatusIsNotAvailable);
                    this.userInteraction.showError(message);
                    this.materialStatus = defaultStatus.paramName;
                    this.statusDisabled = false;
                }
            }
            else {
                this.materialStatus = defaultStatus.paramName;
                this.statusDisabled = false;
            }
        });
    }
    backButtonAction() {
        return __awaiter(this, void 0, void 0, function* () {
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
                return this.navigation.popPage(this.workspace, this.navCtrl, params);
            }
            else {
                yield this.addMaterialToLicense(this.action);
                return this.navigation.popPage(this.workspace, this.navCtrl, params);
            }
        });
    }
    keyPressSerie(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key === enums_1.Enums.KeyCode.Enter) {
                if (!this.serial)
                    return;
                if (this.checkIfSerieExists()) {
                    return this.showDeleteSerieConfirmation(this.serial);
                }
                else {
                    return this.insertSerie(this.serial);
                }
            }
        });
    }
    checkIfSerieExists() {
        let serie = this.material.SerialNumbers.find((serialNumber) => {
            return serialNumber.serial === this.serial;
        });
        return !!serie;
    }
    insertSerie(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteractionProvider.showLoading();
                let serieRequest = models_1.DataRequest.Factory.createInsertMaterialBySerialNumberRequest(this.licenseId, this.material.materialId, serie, this.settings.userCredentials);
                let response = yield this.reception.insertMaterialBySerialNumber(serieRequest);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    ++this.material.quantity;
                    let serial = models_1.Model.Factory.createSerialNumber();
                    serial.id = Number(response.DbData);
                    serial.licenseId = this.licenseId;
                    serial.materialId = this.material.materialId;
                    serial.serial = this.serial;
                    this.material.SerialNumbers.push(serial);
                }
                else {
                    yield this.userInteractionProvider.hideLoading();
                    let code = response.Codigo && response.Codigo > 0
                        ? response.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError;
                    this.userInteractionProvider.showCustomError(code);
                }
            }
            catch (reason) {
                this.userInteractionProvider.showError(reason);
            }
            finally {
                this.userInteractionProvider.hideLoading();
                this.serial = "";
            }
        });
    }
    deleteSerie(s) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serie = _.find(this.material.SerialNumbers, (sN) => {
                    return sN.serial === s;
                });
                let serieRequest = models_1.DataRequest.Factory.createDeleteMaterialBySerialNumberRequest(serie.id, this.settings.userCredentials);
                let response = yield this.reception.deleteMaterialBySerialNumber(serieRequest);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    --this.material.quantity;
                    _.pull(this.material.SerialNumbers, serie);
                }
                else {
                    this.userInteractionProvider.showError(response.Mensaje);
                }
                this.userInteractionProvider.hideLoading();
            }
            catch (reason) {
                this.userInteractionProvider.showError(reason);
            }
            finally {
                this.userInteractionProvider.hideLoading();
                this.serial = "";
            }
        });
    }
    showDeleteSerieConfirmation(s) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteractionProvider.hideLoading();
            let confirmation = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DeleteSerie);
            let result = yield this.userInteractionProvider.showConfirmMessage(confirmation);
            if (result === enums_1.Enums.YesNo.Yes) {
                yield this.userInteractionProvider.showLoading();
                return this.deleteSerie(s);
            }
            else {
                return Promise.resolve();
            }
        });
    }
    addMaterialToLicense(action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteractionProvider.showLoading();
                let addMaterial = models_1.DataRequest.Factory.createAddMaterialToLicenseRequest(this.settings.userCredentials);
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
                let result = yield this.reception.addMaterialToLicense(addMaterial);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.material.materialStatus = this.materialStatus;
                    return Promise.resolve();
                }
                else {
                    this.detail = [];
                    this.material.quantity = 0;
                    this.material.SerialNumbers = [];
                    this.userInteractionProvider.showError(result.Mensaje);
                }
            }
            catch (reason) {
                this.userInteractionProvider.showError(reason.message);
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
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        this.userInteractionProvider.activeAlert = null;
                        yield this.rollBackSeries();
                        return this.acceptSeries();
                    })
                }
            ];
            return this.userInteractionProvider.showOptionAlert(null, buttons, enums_1.Enums.Translation.Alert.RollbackSeries);
        });
    }
    acceptSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            this.material.quantity = this.material.SerialNumbers.length;
            let exists = _.find(this.detail, (material) => {
                return material.materialId === this.material.materialId;
            });
            if (exists && this.material.SerialNumbers.length == 0) {
                this.detail = _.filter(this.detail, (materialDetail) => {
                    return (materialDetail.materialId != this.material.materialId);
                });
            }
            let action;
            action = exists
                ? enums_1.Enums.ReceptionAction.Update
                : enums_1.Enums.ReceptionAction.Insert;
            yield this.addMaterialToLicense(action);
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
        });
    }
    rollBackSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(this.licenseId, null, this.material.materialId, enums_1.Enums.TaskType.Reception, this.settings.userCredentials);
                let response = yield this.pickingProvider.rollbackSerialNumbersOnProcess(request);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.material.quantity = 0;
                    this.material.SerialNumbers = [];
                    return Promise.resolve();
                }
                else {
                    yield this.userInteraction.hideLoading();
                    yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            return Promise.resolve();
        });
    }
};
GeneralReceptionSeriesPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-general-reception-series",
        templateUrl: "general-reception-series.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        reception_1.ReceptionProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        configuration_1.ConfigurationProvider,
        user_interaction_1.UserInteractionProvider,
        picking_1.PickingProvider])
], GeneralReceptionSeriesPage);
exports.GeneralReceptionSeriesPage = GeneralReceptionSeriesPage;
//# sourceMappingURL=general-reception-series.js.map