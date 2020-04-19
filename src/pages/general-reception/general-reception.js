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
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const configuration_1 = require("../../providers/configuration/configuration");
const _ = require("lodash");
const reception_1 = require("../../providers/reception/reception");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const translate_1 = require("../../providers/translate/translate");
const device_1 = require("../../providers/device/device");
const printer_1 = require("../../providers/printer/printer");
const location_suggestion_1 = require("../../providers/location-suggestion/location-suggestion");
let GeneralReceptionPage = class GeneralReceptionPage {
    constructor(navCtrl, navParams, navigation, workspace, configuration, reception, userInteraction, translate, device, settings, printer, locationSuggestion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.configuration = configuration;
        this.reception = reception;
        this.userInteraction = userInteraction;
        this.translate = translate;
        this.device = device;
        this.settings = settings;
        this.printer = printer;
        this.locationSuggestion = locationSuggestion;
        this.clientOwner = "";
        this.licenseId = 0;
        this.taskId = 0;
        this.detail = [];
        this.currentSegment = "scanMaterial";
        this.statusList = [];
        this.scanData = "arium/100001";
        this.isAndroid = false;
        this.statusDisabled = false;
        this.isReceptionByPurchaseDocument = false;
        this.regimenTask = enums_1.Enums.Regime.General;
        this.material = models_1.Model.Factory.createMaterial();
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            let params = this.navParams.data;
            if (params.detail) {
                this.detail = params.detail;
            }
            if (params.material) {
                this.detail = params.detail;
                if (params.material.SerialNumbers.length !== 0) {
                    this.updateDetailList(params.material, params.action, params.material.materialStatus);
                }
            }
            else if (!params.actionBack) {
                this.detail = [];
            }
            this.material = models_1.Model.Factory.createMaterial();
            this.currentScan = enums_1.Enums.ReceptionScanner.Material;
            this.clientOwner = params.clientOwner;
            this.taskId = params.taskId;
            this.licenseId = params.licenseId;
            this.receptionSubtype = params.taskSubtype;
            this.regimenTask = params.regime;
            let configWhere = models_1.DataRequest.Factory.createGetConfigurationRequest(this.settings.userCredentials);
            configWhere.paramType = enums_1.Enums.ConfigurationParamType.Status;
            configWhere.paramGroup = enums_1.Enums.ConfigurationParamGroup.Status;
            let configs = yield this.configuration.findConfigurations(configWhere);
            let defaultConfig;
            this.statusList = _.orderBy(configs, "numericValue", "desc");
            defaultConfig = _.find(configs, c => {
                return c.numericValue === enums_1.Enums.YesNo.Yes;
            });
            this.materialStatus = defaultConfig.paramName;
            let whereSubtype = models_1.DataRequest.Factory.createGetConfigurationRequest(this.settings.userCredentials);
            whereSubtype.paramType = enums_1.Enums.ConfigurationParamType.System;
            whereSubtype.paramGroup = enums_1.Enums.ConfigurationParamGroup.TypeReception;
            let subTypeConfigs = yield this.configuration.findConfigurations(whereSubtype);
            let findSubtype = _.find(subTypeConfigs, subType => {
                return subType.paramName == this.receptionSubtype;
            });
            if (findSubtype) {
                this.isReceptionByPurchaseDocument = true;
            }
        });
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
            this.userInteraction.hideLoading();
        });
    }
    showScanBarcode() {
        return this.currentSegment === "scanMaterial";
    }
    showBarcodeSegment() {
        if (!this.showScanBarcode()) {
            this.currentSegment = "scanMaterial";
        }
    }
    toggleDetails(material) {
        if (material.showDetails &&
            material.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
            return false;
        }
        else if (material.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
            return true;
        }
    }
    scanBarcode() {
        return this.device.scan();
    }
    processBarcodeScan(scanData) {
        this.scanData = scanData;
        this.showBarcodeSegment();
        switch (this.currentScan) {
            case enums_1.Enums.ReceptionScanner.Material:
                this.userInteraction.hideLoading();
                return this.processMaterialScan(scanData);
            case enums_1.Enums.ReceptionScanner.Batch:
                this.material.batch = scanData;
                if (this.material.isCar === enums_1.Enums.YesNo.Yes) {
                    this.currentScan = enums_1.Enums.ReceptionScanner.VIN;
                }
                else {
                    this.currentScan = enums_1.Enums.ReceptionScanner.None;
                }
                break;
            case enums_1.Enums.ReceptionScanner.VIN:
                this.material.vin = scanData;
                this.currentScan = enums_1.Enums.ReceptionScanner.None;
                break;
            default:
                break;
        }
        this.userInteraction.hideLoading();
        return Promise.resolve(true);
    }
    processMaterialScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            let action = yield this.getScannedMaterial(scanData);
            if (!action) {
                this.userInteraction.hideLoading();
                return Promise.resolve(false);
            }
            if (this.material.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
                yield this.userInteraction.showLoading();
                let action = enums_1.Enums.ReceptionAction.Insert;
                if (_.find(this.detail, (material) => {
                    return material.materialId === this.material.materialId;
                })) {
                    action = enums_1.Enums.ReceptionAction.Update;
                }
                this.navigation.pushPage(enums_1.Enums.Page.GeneralReceptionSeries, this.workspace, this.navCtrl, {
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
                });
            }
            if (this.material.batchRequested === enums_1.Enums.YesNo.Yes) {
                this.currentScan = enums_1.Enums.ReceptionScanner.Batch;
            }
            else if (this.material.isCar === enums_1.Enums.YesNo.Yes) {
                this.currentScan = enums_1.Enums.ReceptionScanner.VIN;
            }
            else {
                this.currentScan = enums_1.Enums.ReceptionScanner.None;
            }
            return Promise.resolve(true);
        });
    }
    getScannedMaterial(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let materialRequest = models_1.DataRequest.Factory.createGetScannedMaterialByLicenseInReceptionTaskRequest(barcode, this.clientOwner, this.licenseId, this.taskId, this.settings.userCredentials);
                let result = yield this.reception.validateBarcodeForLicense(materialRequest);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let operation = yield this.reception.getScannedMaterialByLicenseInReceptionTask(materialRequest);
                    if (operation.Resultado === enums_1.Enums.OperationResult.Success) {
                        this.material = operation.ObjectData;
                        let defaultStatus = _.find(this.statusList, status => {
                            return status.numericValue === 1;
                        });
                        if (this.material.qualityControl === enums_1.Enums.YesNo.Yes) {
                            let configuration = _.find(this.statusList, status => {
                                return status.numericValue === 2;
                            });
                            if (configuration &&
                                this.isReceptionByPurchaseDocument) {
                                this.materialStatus = configuration.paramName;
                                this.statusDisabled = true;
                            }
                            else if (configuration &&
                                !this.isReceptionByPurchaseDocument) {
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
                        let materialExists = _.find(this.detail, material => {
                            return material.materialId === this.material.materialId;
                        });
                        if (materialExists &&
                            materialExists.serialNumberRequests === enums_1.Enums.YesNo.Yes)
                            this.material.SerialNumbers =
                                materialExists.SerialNumbers;
                        return Promise.resolve(true);
                    }
                    else {
                        this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                        return Promise.resolve(false);
                    }
                }
                else {
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(false);
                }
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    changeCurrentScan(newScan) {
        this.currentScan = newScan;
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    keyPressQuantity(keyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (keyCode === enums_1.Enums.KeyCode.Enter &&
                this.material.materialId !== "" &&
                this.material.quantity > 0) {
                if (!this.validateScannedMaterialFields()) {
                    return this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.FieldsRequired);
                }
                else {
                    yield this.checkIfMaterialIsOnTheDetail();
                }
            }
        });
    }
    validateScannedMaterialFields() {
        let today = new Date();
        let todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999);
        if (this.material.batchRequested === enums_1.Enums.YesNo.Yes &&
            (!this.material.batch ||
                this.material.expirationDate <= todayDateOnly)) {
            return false;
        }
        if (this.material.handleCaliber === enums_1.Enums.YesNo.Yes &&
            !this.material.caliber) {
            return false;
        }
        if (this.material.handleTone === enums_1.Enums.YesNo.Yes &&
            !this.material.tone) {
            return false;
        }
        if (this.material.isCar === enums_1.Enums.YesNo.Yes && !this.material.vin) {
            return false;
        }
        return true;
    }
    addMaterialToLicense(action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let qty = this.material.quantity * this.material.measurementQty;
                if (action === enums_1.Enums.ReceptionAction.Update) {
                    this.detail.forEach(material => {
                        if (material.materialId === this.material.materialId &&
                            material.measurementUnit !==
                                this.material.measurementUnit) {
                            qty += material.quantity * material.measurementQty;
                        }
                    });
                }
                let addMaterial = models_1.DataRequest.Factory.createAddMaterialToLicenseRequest(this.settings.userCredentials);
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
                let result = yield this.reception.addMaterialToLicense(addMaterial);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.updateDetailList(this.material, action, this.materialStatus);
                    this.material = models_1.Model.Factory.createMaterial();
                    this.currentScan = enums_1.Enums.ReceptionScanner.Material;
                    this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    let code = result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError;
                    this.userInteraction.showCustomError(code);
                }
                return Promise.resolve(false);
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    checkIfMaterialIsOnTheDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            let materialExists = _.find(this.detail, m => {
                return (m.materialId === this.material.materialId &&
                    m.measurementUnit === this.material.measurementUnit);
            });
            if (materialExists) {
                let buttons = yield Promise.all([
                    this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Add),
                    this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Replace)
                ]).then(arrResult => {
                    let buttons = [
                        {
                            text: arrResult[0],
                            handler: () => {
                                this.addMaterialToLicense(enums_1.Enums.ReceptionAction.Add);
                                this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                            }
                        },
                        {
                            text: arrResult[1],
                            handler: () => {
                                this.addMaterialToLicense(enums_1.Enums.ReceptionAction.Update);
                                this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                            }
                        }
                    ];
                    return Promise.resolve(buttons);
                });
                yield this.userInteraction.hideLoading();
                this.userInteraction.showOptionAlert(null, buttons, enums_1.Enums.Translation.Alert.MaterialAlreadyInLicense);
                return Promise.resolve();
            }
            else {
                let action = enums_1.Enums.ReceptionAction.Insert;
                let materialNoMeasurement = _.find(this.detail, m => {
                    return m.materialId === this.material.materialId;
                });
                if (materialNoMeasurement) {
                    action = enums_1.Enums.ReceptionAction.Add;
                }
                yield this.addMaterialToLicense(action);
                return Promise.resolve();
            }
        });
    }
    updateDetailList(material, action, status) {
        material.materialStatus = status;
        if (action === enums_1.Enums.ReceptionAction.Insert)
            this.detail.push(material);
        else {
            let foundMaterial = this.detail.find((m) => {
                return (m.materialId === material.materialId &&
                    m.measurementUnit === material.measurementUnit);
            });
            if (action === enums_1.Enums.ReceptionAction.Add && !foundMaterial) {
                this.detail.push(material);
            }
            else {
                foundMaterial.quantity =
                    action === enums_1.Enums.ReceptionAction.Update
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
    showPrintOption() {
        return Promise.all([
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.PrintLicense),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.PrintStatus),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Cancel)
        ]).then(arrResult => {
            let buttons = [
                {
                    text: arrResult[0],
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        try {
                            if (!this.settings.printer) {
                                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                                return;
                            }
                            let request = models_1.DataRequest.Factory.createGetLicensePrintFormatRequest(this.licenseId, 0, this.settings.userCredentials);
                            let format = yield this.printer.getLicensePrintFormat(request);
                            yield this.printer.printDocument(this.settings.printer, format.FORMAT);
                        }
                        catch (e) {
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                        }
                    })
                },
                {
                    text: arrResult[1],
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        if (!this.settings.printer) {
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                            return;
                        }
                        let request = models_1.DataRequest.Factory.createGetStatusPrintFormatRequest(this.materialStatus, this.taskId, this.clientOwner, this.settings.userCredentials);
                        let format = yield this.printer.getStatusPrintFormat(request);
                        yield this.printer.printDocument(this.settings.printer, format.FORMAT);
                    })
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
    locateLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.detail.length < 1)
                    return Promise.resolve();
                let params = {
                    licenseId: this.licenseId,
                    taskId: this.taskId,
                    detail: this.detail,
                    taskSubtype: this.receptionSubtype,
                    clientOwner: this.clientOwner,
                    isGeneralReception: this.isReceptionByPurchaseDocument,
                    comesFrom: enums_1.Enums.Page.GeneralReception,
                    regime: this.regimenTask
                };
                this.navigation.pushPage(enums_1.Enums.Page.LocateGeneralReceptionLicense, this.workspace, this.navCtrl, params);
                return Promise.resolve();
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
        });
    }
    backButtonAction() {
        return Promise.all([
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.No),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Yes)
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
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        try {
                            yield this.userInteraction.showLoading();
                            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                            let result = yield this.rollbackLicense();
                            if (result.Resultado ===
                                enums_1.Enums.OperationResult.Success) {
                                yield this.navigation.popPage(this.workspace, this.navCtrl, {
                                    taskId: this.taskId,
                                    regime: this.regimenTask
                                });
                                this.userInteraction.hideLoading();
                            }
                            else {
                                yield this.userInteraction.hideLoading();
                                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                            }
                        }
                        catch (error) {
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                        }
                        finally {
                            yield this.userInteraction.hideLoading();
                        }
                    })
                }
            ];
            return this.userInteraction.showOptionAlert(null, buttons, enums_1.Enums.Translation.Alert.RollbackLicense);
        });
    }
    rollbackLicense() {
        let license = models_1.DataRequest.Factory.createRollBackLicenseRequest(this.licenseId, this.settings.userCredentials);
        return this.reception.rollbackLicense(license);
    }
    validateSuggestedLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let validateSuggestedLocation = models_1.DataRequest.Factory.createSuggestedLocation(this.licenseId, this.settings.userCredentials);
                let result = yield this.locationSuggestion.validateSuggestedLocation(validateSuggestedLocation);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    switch (Number(result.DbData)) {
                        case enums_1.Enums.ShowSuggestedLocation.No:
                            return this.locateLicense();
                        case enums_1.Enums.ShowSuggestedLocation.SlottingByZona:
                            return this.suggestedLocation(enums_1.Enums.ShowSuggestedLocation.SlottingByZona);
                        case enums_1.Enums.ShowSuggestedLocation.Material:
                            return this.suggestedLocation(enums_1.Enums.ShowSuggestedLocation.Material);
                        case enums_1.Enums.ShowSuggestedLocation.All:
                            return this.suggestedLocation(enums_1.Enums.ShowSuggestedLocation.All);
                    }
                }
                else {
                    yield this.userInteraction.hideLoading();
                    let code = result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError;
                    this.userInteraction.showCustomError(code);
                    return Promise.resolve();
                }
                yield this.userInteraction.hideLoading();
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
        });
    }
    suggestedLocation(showSuggestedLocation) {
        return __awaiter(this, void 0, void 0, function* () {
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
                this.navigation.pushPage(enums_1.Enums.Page.LocationSuggestion, this.workspace, this.navCtrl, params);
                return Promise.resolve();
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
        });
    }
};
GeneralReceptionPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-general-reception",
        templateUrl: "general-reception.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        configuration_1.ConfigurationProvider,
        reception_1.ReceptionProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        printer_1.PrinterProvider,
        location_suggestion_1.LocationSuggestionProvider])
], GeneralReceptionPage);
exports.GeneralReceptionPage = GeneralReceptionPage;
//# sourceMappingURL=general-reception.js.map