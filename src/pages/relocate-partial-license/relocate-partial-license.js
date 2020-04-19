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
const translate_1 = require("../../providers/translate/translate");
const device_1 = require("../../providers/device/device");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const printer_1 = require("../../providers/printer/printer");
const enums_1 = require("../../enums/enums");
const reception_1 = require("../../providers/reception/reception");
const _ = require("lodash");
const configuration_1 = require("../../providers/configuration/configuration");
const license_1 = require("../../providers/license/license");
const material_1 = require("../../providers/material/material");
const picking_1 = require("../../providers/picking/picking");
const location_suggestion_1 = require("../../providers/location-suggestion/location-suggestion");
let RelocatePartialLicensePage = class RelocatePartialLicensePage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, configuration, reception, translate, device, settings, printer, license, materialProvider, pickingProvider, locationSuggestion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.configuration = configuration;
        this.reception = reception;
        this.translate = translate;
        this.device = device;
        this.settings = settings;
        this.printer = printer;
        this.license = license;
        this.materialProvider = materialProvider;
        this.pickingProvider = pickingProvider;
        this.locationSuggestion = locationSuggestion;
        this.currentSegment = "scanMaterial";
        this.detail = [];
        this.material = models_1.Model.Factory.createMaterial();
        this.scanData = "arium/100001";
        this.statusList = [];
        this.detailLicense = [];
        this.isAndroid = false;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isAndroid = this.device.isAndroid();
                this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
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
                        this.updateDetailList(params.material, params.action, params.material.materialStatus);
                    }
                }
                else if (!params.actionBack) {
                    this.detail = [];
                }
                let request = models_1.DataRequest.Factory.createAvailableLicenseDetailRequest(this.settings.userCredentials, this.sourceLicenseId);
                this.detailLicense = yield this.license.getAvailableLicenseDetail(request);
                this.currentScan = enums_1.Enums.ReceptionScanner.Material;
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
                yield this.userInteraction.hideLoading();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    scanBarcode() {
        return this.device.scan();
    }
    processBarcodeScan(scanData) {
        this.scanData = scanData;
        this.showBarcodeSegment();
        if (this.currentScan === enums_1.Enums.ReceptionScanner.Material) {
            this.userInteraction.hideLoading();
            return this.processMaterialScan(scanData);
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
                this.navigation.pushPage(enums_1.Enums.Page.RelocatePartialLicenseSeries, this.workspace, this.navCtrl, {
                    baseLicenseId: this.sourceLicenseId,
                    licenseId: this.targetLicenseId,
                    material: this.material,
                    clientOwner: this.clientOwner,
                    detail: this.detail,
                    policyCode: this.policyCode,
                    materialStatus: this.materialStatus,
                    location: "",
                    comesFrom: enums_1.Enums.Page.RelocatePartialLicense
                });
            }
            yield this.userInteraction.hideLoading();
            return Promise.resolve(true);
        });
    }
    getScannedMaterial(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let materialRequest = models_1.DataRequest.Factory.createGetScannedMaterialByLicenseInReceptionTaskRequest(barcode, this.clientOwner, this.sourceLicenseId, null, this.settings.userCredentials);
                let result = yield this.reception.validateBarcodeForLicense(materialRequest);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let getMaterialRequest = models_1.DataRequest.Factory.createGetMaterialRequest(this.settings.userCredentials);
                    getMaterialRequest.barcodeId = barcode;
                    getMaterialRequest.clientOwner = this.clientOwner;
                    this.material = yield this.materialProvider.getMaterialByBarcode(getMaterialRequest);
                    let materialExistsInSourceLicense = _.find(this.detailLicense, material => {
                        return (material.MATERIAL_ID === this.material.materialId);
                    });
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
                        let materialExistsInDetail = _.find(this.detail, material => {
                            return (material.materialId === this.material.materialId);
                        });
                        if (materialExistsInDetail &&
                            materialExistsInDetail.serialNumberRequests ===
                                enums_1.Enums.YesNo.Yes) {
                            this.material.SerialNumbers =
                                materialExistsInDetail.SerialNumbers;
                        }
                    }
                    else {
                        this.material = models_1.Model.Factory.createMaterial();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.MaterialDoesntBelongToLicense);
                        return Promise.resolve(false);
                    }
                    return Promise.resolve(true);
                }
                else {
                    this.material = models_1.Model.Factory.createMaterial();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(false);
                }
            }
            catch (reason) {
                this.material = models_1.Model.Factory.createMaterial();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidSku, barcode);
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
    locateLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.detail.length < 1)
                    return Promise.resolve();
                yield this.userInteraction.showLoading();
                let licenseRequest = models_1.DataRequest.Factory.createValidateStatusInMaterialsLicenseRequest(this.targetLicenseId, this.settings.userCredentials);
                let result = yield this.reception.validateStatusInMaterialsLicense(licenseRequest);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let params = {
                        baseLicenseId: this.sourceLicenseId,
                        licenseId: this.targetLicenseId,
                        detail: this.detail,
                        clientOwner: this.clientOwner,
                        policyCode: this.policyCode,
                        location: "",
                        comesFrom: enums_1.Enums.Page.RelocatePartialLicense
                    };
                    yield this.userInteraction.hideLoading();
                    this.navigation.pushPage(enums_1.Enums.Page.LocatePartialLicense, this.workspace, this.navCtrl, params);
                    return Promise.resolve();
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                    return Promise.resolve();
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
        });
    }
    validateSuggestedLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let validateSuggestedLocation = models_1.DataRequest.Factory.createSuggestedLocation(this.targetLicenseId, this.settings.userCredentials);
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
                    let code = result.Codigo && result.Codigo > 0 ? result.Codigo : enums_1.Enums.CustomErrorCodes.UnknownError;
                    this.userInteraction.showCustomError(code);
                    return Promise.resolve();
                }
                yield this.userInteraction.hideLoading();
            }
            catch (exception) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
            finally {
                yield this.userInteraction.hideLoading();
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
                            let request = models_1.DataRequest.Factory.createGetLicensePrintFormatRequest(this.sourceLicenseId, 0, this.settings.userCredentials);
                            let format = yield this.printer.getLicensePrintFormat(request);
                            format.FORMAT = format.FORMAT.replace(new RegExp(this.sourceLicenseId.toString(), "g"), this.targetLicenseId.toString());
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
                        let request = models_1.DataRequest.Factory.createGetStatusPrintFormatRequest(this.materialStatus, null, this.clientOwner, this.settings.userCredentials);
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
                        yield this.userInteraction.showLoading();
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        let result = yield this.rollbackLicense();
                        if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                            yield this.navigation.popPage(this.workspace, this.navCtrl, {
                                licenseId: this.sourceLicenseId
                            });
                            yield this.userInteraction.hideLoading();
                        }
                        else {
                            yield this.userInteraction.hideLoading();
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                        }
                    })
                }
            ];
            return this.userInteraction.showOptionAlert(null, buttons, enums_1.Enums.Translation.Alert.RollbackLicense);
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
    rollbackLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let license = models_1.DataRequest.Factory.createRollBackLicenseRequest(this.targetLicenseId, this.settings.userCredentials);
                yield this.rollBackSeries();
                return this.reception.rollbackLicense(license);
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                return models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.DataBaseError,
                    message: e
                });
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    rollBackSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(this.sourceLicenseId, null, null, enums_1.Enums.TaskType.PartialRelocation, this.settings.userCredentials);
            let response = yield this.pickingProvider.rollbackSerialNumbersOnProcess(request);
            if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                return Promise.resolve();
            }
            else {
                return Promise.reject(response.Mensaje);
            }
        });
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
    keyPressQuantity(keyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (keyCode === enums_1.Enums.KeyCode.Enter &&
                this.material.materialId !== "" &&
                this.material.quantity > 0) {
                let materialExistsInSourceLicense = _.find(this.detailLicense, material => {
                    return material.MATERIAL_ID === this.material.materialId;
                });
                let qty = 0;
                this.detail.forEach((m) => {
                    if (m.materialId === this.material.materialId) {
                        qty += m.quantity * m.measurementQty;
                    }
                });
                qty += this.material.quantity * this.material.measurementQty;
                if (qty > materialExistsInSourceLicense.AVAILABLE_QTY) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes
                        .QuantityInLicenseIsGreaterThanLicenseSource);
                    return;
                }
                let validateIfAllowRelocation = models_1.DataRequest.Factory.createValidateIfStatusOfLicenseAllowsRelocationRequest(this.settings.userCredentials);
                validateIfAllowRelocation.licenseId = this.sourceLicenseId;
                validateIfAllowRelocation.materialId = this.material.materialId;
                let result = yield this.license.validateIfStatusOfLicenseAllowsRealloc(validateIfAllowRelocation);
                if (result.Resultado == enums_1.Enums.OperationResult.Success) {
                    this.checkIfMaterialIsOnTheDetail();
                }
                else {
                    let code = result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError;
                    this.userInteraction.showCustomError(code);
                }
            }
        });
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
                let validateInventory = models_1.DataRequest.Factory.createValidateInventoryForRealloc(this.settings.userCredentials);
                validateInventory.sourceLicense = this.sourceLicenseId;
                validateInventory.materialId = this.material.materialId;
                validateInventory.quantityUnits = qty;
                let resultValidate = yield this.reception.validateInventoryForRealloc(validateInventory);
                if (resultValidate.Resultado === enums_1.Enums.OperationResult.Success) {
                    let addMaterial = models_1.DataRequest.Factory.createAddMaterialToLicenseRequest(this.settings.userCredentials);
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
                }
                else {
                    yield this.userInteraction.hideLoading();
                    let code = resultValidate.Codigo && resultValidate.Codigo > 0
                        ? resultValidate.Codigo
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
    }
    suggestedLocation(ShowSuggestedLocation) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let params = {
                    baseLicenseId: this.sourceLicenseId,
                    licenseId: this.targetLicenseId,
                    detail: this.detail,
                    clientOwner: this.clientOwner,
                    policyCode: this.policyCode,
                    location: "",
                    comesFrom: enums_1.Enums.Page.RelocatePartialLicense,
                    showSuggestedLocation: ShowSuggestedLocation,
                    taskId: 0,
                    material: this.material
                };
                this.navigation.pushPage(enums_1.Enums.Page.LocationSuggestionRelocatePartial, this.workspace, this.navCtrl, params);
                return Promise.resolve();
            }
            catch (exception) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
        });
    }
};
RelocatePartialLicensePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-relocate-partial-license",
        templateUrl: "relocate-partial-license.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        configuration_1.ConfigurationProvider,
        reception_1.ReceptionProvider,
        translate_1.TranslateProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        printer_1.PrinterProvider,
        license_1.LicenseProvider,
        material_1.MaterialProvider,
        picking_1.PickingProvider,
        location_suggestion_1.LocationSuggestionProvider])
], RelocatePartialLicensePage);
exports.RelocatePartialLicensePage = RelocatePartialLicensePage;
//# sourceMappingURL=relocate-partial-license.js.map