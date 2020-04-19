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
const enums_1 = require("../../enums/enums");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const license_1 = require("../../providers/license/license");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const _ = require("lodash");
const translate_1 = require("../../providers/translate/translate");
const printer_1 = require("../../providers/printer/printer");
const location_suggestion_1 = require("../../providers/location-suggestion/location-suggestion");
const configuration_1 = require("../../providers/configuration/configuration");
let LicenseInfoPage = class LicenseInfoPage {
    constructor(navCtrl, navParams, workspace, navigation, userInteraction, license, settings, translate, printer, locationSuggestion, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.workspace = workspace;
        this.navigation = navigation;
        this.userInteraction = userInteraction;
        this.license = license;
        this.settings = settings;
        this.translate = translate;
        this.printer = printer;
        this.locationSuggestion = locationSuggestion;
        this.configuration = configuration;
        this.licenseId = 0;
        this.currentLocation = "";
        this.policyCode = "";
        this.clientOwner = "";
        this.inventory = [];
        this.regime = enums_1.Enums.Regime.General;
        this.wavePickingId = 0;
        this.currentSegment = enums_1.Enums.LicenseInfoSegments
            .LicenseDetail;
        this.showRegime = false;
        this.documentDetail = {
            CUSTOMER_NAME: "",
            WAVE_PICKING_ID: 0,
            DOC_NUM: "0",
            DUE_DATE: new Date(),
            PREPARED_BY: "",
            TOTAL_LICENSES: 0,
            CORRELATIVE: 0
        };
        this.showDocument = false;
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getParameterFiscal();
            try {
                let params = this.navParams.data;
                this.licenseId = params.licenseId;
                this.wavePickingId = params.wavePickingId;
                yield this.getLicenseInventory();
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    getLicenseInventory() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetInventoryByLicenseRequest(this.licenseId, this.settings.userCredentials);
            this.inventory = yield this.license.getInventoryByLicense(request, this.settings.userCredentials);
            if (this.inventory.length === 0) {
                this.navigation.popPage(this.workspace, this.navCtrl, {
                    lastOption: enums_1.Enums.InfoCenterOption.License,
                    wavePickingId: this.wavePickingId
                });
                return this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, this.licenseId.toString());
            }
            let licenseInfo = _.first(this.inventory);
            this.wavePickingId = licenseInfo.wavePickingId;
            this.licenseId = licenseInfo.licenseId;
            this.currentLocation = licenseInfo.currentLocation;
            this.policyCode = licenseInfo.policyCode;
            this.clientOwner = licenseInfo.clientOwner;
            this.regime = licenseInfo.regime;
            yield this.loadLicenseDocumentDetail();
        });
    }
    loadLicenseDocumentDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetInfoLicenseDispatch(this.licenseId, this.settings.userCredentials);
            try {
                this.showDocument = false;
                this.userInteraction.showLoading();
                let result = yield this.license.getInfoLicenseDispatch(request);
                if (result != null && result.length > 0) {
                    this.documentDetail = result[0];
                    if (this.wavePickingId > 0) {
                        this.showDocument = true;
                        this.currentSegment =
                            enums_1.Enums.LicenseInfoSegments.DocumentDetail;
                    }
                }
            }
            catch (ex) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            lastOption: enums_1.Enums.InfoCenterOption.License,
            locationId: this.currentLocation
        });
    }
    toggleDetails(detail) {
        if (detail.showDetails &&
            detail.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
            detail.showDetails = false;
            detail.icon = "arrow-dropright";
            return false;
        }
        else if (detail.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
            detail.showDetails = true;
            detail.icon = "arrow-dropdown";
            return true;
        }
    }
    goToMaterialInfo(detail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.MaterialInfo, this.workspace, this.navCtrl, {
                materialId: detail.materialId,
                licenseId: this.licenseId,
                isMoreResults: false
            });
        });
    }
    showRelocationOptions() {
        return Promise.all([
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.PartialRelocation),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.CompleteRelocation),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Cancel)
        ]).then(arrResult => {
            let buttons = [
                {
                    text: arrResult[0],
                    handler: () => {
                        this.userInteraction.activeAlert = null; //FIXME: handle the active alert in userinteraction provider
                        this.userWantsRelocatePartialLicense();
                    }
                },
                {
                    text: arrResult[1],
                    handler: () => {
                        this.userInteraction.activeAlert = null;
                        return this.validateSuggestedLocation();
                    }
                },
                {
                    text: arrResult[3],
                    role: "cancel",
                    handler: () => {
                        this.userInteraction.activeAlert = null;
                    }
                }
            ];
            return this.userInteraction.showOptionAlert(null, buttons);
        });
    }
    relocateFullLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.navigation.pushPage(enums_1.Enums.Page.RelocateFullLicense, this.workspace, this.navCtrl, {
                licenseId: this.licenseId,
                comesFrom: enums_1.Enums.Page.LicenseInfo
            });
        });
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
                            return this.relocateFullLicense();
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
                    showSuggestedLocation: showSuggestedLocation,
                    location: ""
                };
                this.navigation.pushPage(enums_1.Enums.Page.LocationSuggestionFullRelocation, this.workspace, this.navCtrl, params);
                return Promise.resolve();
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
        });
    }
    userWantsRelocatePartialLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            let createLicense = models_1.DataRequest.Factory.createCreateLicenseRequest(this.policyCode, this.settings.login, this.clientOwner, this.regime, null, this.settings.userCredentials);
            try {
                yield this.userInteraction.showLoading();
                let result = yield this.license.createLicense(createLicense);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    yield this.userInteraction.hideLoading();
                    this.navigation.pushPage(enums_1.Enums.Page.RelocatePartialLicense, this.workspace, this.navCtrl, {
                        sourceLicenseId: this.licenseId,
                        targetLicenseId: Number(result.DbData),
                        clientOwner: this.clientOwner,
                        policyCode: this.policyCode,
                        actionBack: false
                    });
                }
                this.userInteraction.hideLoading();
            }
            catch (e) {
                this.userInteraction.hideLoading();
            }
        });
    }
    printLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                if (this.documentDetail.WAVE_PICKING_ID == 0) {
                    let request = models_1.DataRequest.Factory.createGetLicensePrintFormatRequest(this.licenseId, 0, this.settings.userCredentials);
                    let format = yield this.printer.getLicensePrintFormat(request);
                    yield this.printer.printDocument(this.settings.printer, format.FORMAT);
                }
                else {
                    this.printLicenseDispatch(this.licenseId);
                }
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    printLicenseDispatch(licenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                let request = models_1.DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(licenseId, this.settings.userCredentials);
                let format = yield this.printer.getLicenseDispatchPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    showLabel(label) {
        return __awaiter(this, void 0, void 0, function* () {
            let traduction = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Labels, label);
            this.userInteraction.toast(traduction, enums_1.Enums.ToastTime.Short).present();
        });
    }
    getParameterFiscal() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let requestParameter = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.ValidationFiscal, enums_1.Enums.ParameterId.HandlesFiscalStorage, this.settings.userCredentials);
                let parameter = yield this.configuration.getParameter(requestParameter);
                if (parameter && parameter.length && Number(parameter[0].VALUE) === enums_1.Enums.YesNo.Yes) {
                    this.showRegime = true;
                }
                return Promise.resolve();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound);
            }
        });
    }
};
LicenseInfoPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-license-info",
        templateUrl: "license-info.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        workspace_1.WorkspacePage,
        navigation_1.NavigationProvider,
        user_interaction_1.UserInteractionProvider,
        license_1.LicenseProvider,
        user_settings_1.UserSettingsProvider,
        translate_1.TranslateProvider,
        printer_1.PrinterProvider,
        location_suggestion_1.LocationSuggestionProvider,
        configuration_1.ConfigurationProvider])
], LicenseInfoPage);
exports.LicenseInfoPage = LicenseInfoPage;
//# sourceMappingURL=license-info.js.map