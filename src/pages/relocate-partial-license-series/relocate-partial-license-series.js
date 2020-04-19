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
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const device_1 = require("../../providers/device/device");
const enums_1 = require("../../enums/enums");
const license_1 = require("../../providers/license/license");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const _ = require("lodash");
const picking_1 = require("../../providers/picking/picking");
const translate_1 = require("../../providers/translate/translate");
const reception_1 = require("../../providers/reception/reception");
const configuration_1 = require("../../providers/configuration/configuration");
let RelocatePartialLicenseSeriesPage = class RelocatePartialLicenseSeriesPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteractionProvider, device, license, settings, picking, translate, reception, configuration, pickingProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteractionProvider = userInteractionProvider;
        this.device = device;
        this.license = license;
        this.settings = settings;
        this.picking = picking;
        this.translate = translate;
        this.reception = reception;
        this.configuration = configuration;
        this.pickingProvider = pickingProvider;
        this.materialStatus = "";
        this.material = models_1.Model.Factory.createMaterial();
        this.detail = [];
        this.scannedSeries = [];
        this.availableSeries = [];
        this.isAndroid = false;
        this.statusList = [];
    }
    userWantsToAddSeriesRank() {
        this.navParams.data.operationType = enums_1.Enums.TaskType.PartialRelocation;
        this.navParams.data.scannedSeries = this.scannedSeries;
        return this.navigation.pushPage(enums_1.Enums.Page.AddSeriesRank, this.workspace, this.navCtrl, this.navParams.data);
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    scanBarcode() {
        return this.device.scan();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
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
            let configWhere = models_1.DataRequest.Factory.createGetConfigurationRequest(this.settings.userCredentials);
            configWhere.paramType = enums_1.Enums.ConfigurationParamType.Status;
            configWhere.paramGroup = enums_1.Enums.ConfigurationParamGroup.Status;
            let configs = yield this.configuration.findConfigurations(configWhere);
            this.statusList = _.orderBy(configs, "numericValue", "desc");
            this.materialStatus = params.materialStatus;
            //---
            this.material.SerialNumbers =
                this.material.SerialNumbers == null
                    ? []
                    : this.material.SerialNumbers;
            this.scannedSeries =
                params.scannedSeries == null ? [] : params.scannedSeries;
            this.material.SerialNumbers.forEach((serial) => {
                let serie = {
                    SERIAL: serial.serial,
                    LICENSE_ID: params.baseLicenseId,
                    MATERIAL_ID: this.materialId
                };
                this.scannedSeries.push(serie);
            });
            this.material.SerialNumbers = [];
            this.getAvailableLicenseSeries();
            this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
            this.userInteractionProvider.hideLoading();
        });
    }
    getAvailableLicenseSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetAvailableLicenseSeriesRequest(this.baseLicenseId, this.materialId, this.settings.userCredentials);
            this.availableSeries = yield this.license.getAvailableLicenseSeries(request);
        });
    }
    processBarcodeScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            this.scanData = scanData;
            if (!this.verifyIfIsValidSerie() && !this.checkIfSerieWasScanned()) {
                this.scanData = "";
                return this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, scanData);
            }
            if (this.checkIfSerieWasScanned()) {
                return this.showDeleteSerieConfirmation(this.scanData);
            }
            else {
                return this.insertSeries(this.scanData);
            }
        });
    }
    insertSeries(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteractionProvider.showLoading();
                let serieRequest = models_1.DataRequest.Factory.createUpdateScannedSerialNumberToProcessRequest(serie, this.baseLicenseId, null, null, this.materialId, enums_1.Enums.TaskType.PartialRelocation, this.settings.userCredentials);
                let response = yield this.picking.updateScannedSerialNumberToProcess(serieRequest);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    let serial = _.find(this.availableSeries, (serialNumber) => {
                        return serialNumber.SERIAL === serie;
                    });
                    _.pull(this.availableSeries, serial);
                    this.scannedSeries.push(serial);
                    yield this.userInteractionProvider.hideLoading();
                }
                else {
                    yield this.userInteractionProvider.hideLoading();
                    this.userInteractionProvider.showCustomError(response.Codigo && response.Codigo > 0
                        ? response.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
                return Promise.resolve(response);
            }
            catch (e) {
                yield this.userInteractionProvider.hideLoading();
                this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                let error = models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: e.message
                });
                return Promise.resolve(error);
            }
            finally {
                this.scanData = "";
            }
        });
    }
    verifyIfIsValidSerie() {
        return this.availableSeries.find((serialNumber) => {
            return serialNumber.SERIAL === this.scanData;
        });
    }
    checkIfSerieWasScanned() {
        let serie = this.scannedSeries.find((serialNumber) => {
            return serialNumber.SERIAL === this.scanData;
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
                    return serie.SERIAL === serialNumber;
                });
                let serieRequest = models_1.DataRequest.Factory.createUpdateSetActiveSerialNumberRequest(this.baseLicenseId, enums_1.Enums.YesNo.No, this.materialId, serialNumber, enums_1.Enums.TaskType.PartialRelocation, this.settings.userCredentials);
                let response = yield this.picking.updateSetActiveSerialNumber(serieRequest);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.availableSeries.push(serie);
                    _.pull(this.scannedSeries, serie);
                    this.getAvailableLicenseSeries();
                    this.userInteractionProvider.hideLoading();
                    return Promise.resolve(response);
                }
                else {
                    yield this.userInteractionProvider.hideLoading();
                    this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                    return Promise.resolve(response);
                }
            }
            catch (reason) {
                yield this.userInteractionProvider.hideLoading();
                this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                let operation = models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: reason
                });
                return Promise.resolve(operation);
            }
            finally {
                this.scanData = "";
            }
        });
    }
    keyPressSerie(key) {
        if (key === enums_1.Enums.KeyCode.Enter) {
            this.processBarcodeScan(this.scanData);
        }
    }
    rollBackSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteractionProvider.showLoading();
                let request = models_1.DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(this.baseLicenseId, null, this.material.materialId, enums_1.Enums.TaskType.PartialRelocation, this.settings.userCredentials);
                let response = yield this.pickingProvider.rollbackSerialNumbersOnProcess(request);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.scannedSeries = [];
                    return Promise.resolve();
                }
                else {
                    yield this.userInteractionProvider.hideLoading();
                    yield this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
            }
            catch (reason) {
                yield this.userInteractionProvider.hideLoading();
                yield this.userInteractionProvider.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            return Promise.resolve();
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
            this.material.SerialNumbers =
                this.material.SerialNumbers == null
                    ? []
                    : this.material.SerialNumbers;
            this.scannedSeries.forEach((serie) => {
                let s = models_1.Model.Factory.createSerialNumber();
                s.serial = serie.SERIAL;
                this.material.SerialNumbers.push(s);
            });
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
            this.navigation.popPage(this.workspace, this.navCtrl, {
                targetLicenseId: this.licenseId,
                sourceLicenseId: this.baseLicenseId,
                clientOwner: this.clientOwner,
                policyCode: this.policyCode,
                detail: this.detail,
                action: action,
                material: this.material
            });
        });
    }
    backButtonAction() {
        return this.confirmRollbackSeries();
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
                addMaterial.sourceLicenseId = this.baseLicenseId;
                let result = yield this.reception.addMaterialToLicense(addMaterial);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.material.materialStatus = this.materialStatus;
                    return Promise.resolve();
                }
                else {
                    this.userInteractionProvider.showError(result.Mensaje);
                }
            }
            catch (reason) {
                this.userInteractionProvider.showError(reason.message);
            }
        });
    }
};
RelocatePartialLicenseSeriesPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-relocate-partial-license-series",
        templateUrl: "relocate-partial-license-series.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        license_1.LicenseProvider,
        user_settings_1.UserSettingsProvider,
        picking_1.PickingProvider,
        translate_1.TranslateProvider,
        reception_1.ReceptionProvider,
        configuration_1.ConfigurationProvider,
        picking_1.PickingProvider])
], RelocatePartialLicenseSeriesPage);
exports.RelocatePartialLicenseSeriesPage = RelocatePartialLicenseSeriesPage;
//# sourceMappingURL=relocate-partial-license-series.js.map