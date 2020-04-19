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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const location_suggestion_1 = require("../../providers/location-suggestion/location-suggestion");
const enums_1 = require("../../enums/enums");
const device_1 = require("../../providers/device/device");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const translate_1 = require("../../providers/translate/translate");
const location_1 = require("../../providers/location/location");
const configuration_1 = require("../../providers/configuration/configuration");
let LocationSuggestionReceptionPage = class LocationSuggestionReceptionPage {
    constructor(navCtrl, navigation, workspace, navParams, userInteraction, settings, locationSuggestion, device, translate, location, configuration) {
        this.navCtrl = navCtrl;
        this.navigation = navigation;
        this.workspace = workspace;
        this.navParams = navParams;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.locationSuggestion = locationSuggestion;
        this.device = device;
        this.translate = translate;
        this.location = location;
        this.configuration = configuration;
        this.listSuggestionZone = [];
        this.listSuggestionMaterial = [];
        this.countClassInLicense = 0;
        this.licenseId = 0;
        this.taskId = 0;
        this.isAndroid = false;
        this.detail = [];
        this.showLocationByZona = false;
        this.showLocationByMaterial = false;
        this.parameterSuggestionMaterial = 0;
        this.currentScan = enums_1.Enums.SuggestedLocationScan
            .LocationByZone;
        this.suggestion = "zone";
        this.useMaterialSubFamily = false;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            yield this.getParameterSubFamily();
        });
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.showLocationByZona = false;
                this.showLocationByMaterial = false;
                this.generalReceptionParam = this
                    .navParams.data;
                switch (this.generalReceptionParam.showSuggestedLocation) {
                    case enums_1.Enums.ShowSuggestedLocation.All:
                        this.showLocationByZona = true;
                        this.showLocationByMaterial = true;
                        break;
                    case enums_1.Enums.ShowSuggestedLocation.SlottingByZona:
                        this.showLocationByZona = true;
                        break;
                    case enums_1.Enums.ShowSuggestedLocation.Material:
                        this.showLocationByMaterial = true;
                        break;
                }
                this.licenseId = this.generalReceptionParam.licenseId;
                if (this.showLocationByZona) {
                    this.listSuggestionZone = yield this.getLocationSuggestion();
                }
                if (this.showLocationByMaterial) {
                    this.listSuggestionMaterial = yield this.getLocationSuggestionByMaterialList();
                    if (this.listSuggestionMaterial.length <= 0) {
                        this.showLocationByMaterial = false;
                    }
                }
                let parameter = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.SuggestionToLocate, enums_1.Enums.ParameterId.DisplaySuggestionMaterial, this.settings.userCredentials);
                let configShowMaterial = yield this.configuration.getParameter(parameter);
                this.parameterSuggestionMaterial = Number(configShowMaterial[0].VALUE);
                this.generalReceptionParam.comesFrom =
                    enums_1.Enums.Page.LocationSuggestion;
                if (this.showLocationByZona == false &&
                    this.showLocationByMaterial == false) {
                    this.navigationPage(enums_1.Enums.Page.LocateGeneralReceptionLicense, this.generalReceptionParam);
                }
                if (this.showLocationByZona == false &&
                    this.parameterSuggestionMaterial == 0) {
                    this.navigationPage(enums_1.Enums.Page.LocateGeneralReceptionLicense, this.generalReceptionParam);
                }
                this.scanToken = this.device.subscribeToScanner(data => this.userWantToProcessScannedData(data));
                yield this.userInteraction.hideLoading();
            }
            catch (exception) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(exception);
            }
        });
    }
    getLocationSuggestion() {
        return __awaiter(this, void 0, void 0, function* () {
            let listLocation = yield this.getLocationSuggestionToServer();
            let listSuggestionZone = [];
            if (listLocation.length > 0) {
                this.countClassInLicense = listLocation[0].COUNT_CLASS_IN_LICENSE;
            }
            yield listLocation.forEach(ll => {
                let zone = listSuggestionZone.find(lsZ => {
                    return (ll.ZONE == lsZ.ZONE &&
                        ll.WAREHOUSE_CODE == lsZ.WAREHOUSE_CODE);
                });
                let newLocation = {
                    LOCATION: ll.LOCATION,
                    SPOT_TYPE: ll.SPOT_TYPE,
                    MAX_WEIGHT: ll.MAX_WEIGHT,
                    LOCATION_WEIGHT: ll.LOCATION_WEIGHT,
                    LOCATION_VOLUME: ll.LOCATION_VOLUME,
                    VOLUME: ll.VOLUME,
                    AVAILABLE: 0,
                    AVAIBLE_ICON: "checkmark",
                    AVAILABLE_WEIGHT: ll.AVAILABLE_WEIGHT,
                    WEIGHT_ICON: ll.WEIGHT_ICON,
                    WEIGHT_ICON_COLOR: ll.WEIGHT_ICON_COLOR,
                    AVAILABLE_VOLUME: ll.AVAILABLE_VOLUME,
                    VOLUME_ICON: ll.VOLUME_ICON,
                    VOLUME_ICON_COLOR: ll.VOLUME_ICON_COLOR
                };
                switch (newLocation.SPOT_TYPE) {
                    case enums_1.Enums.TypeLocation.Rack.toString():
                        newLocation.AVAILABLE = newLocation.LOCATION_WEIGHT;
                        break;
                    case enums_1.Enums.TypeLocation.Floor.toString():
                        newLocation.AVAILABLE = newLocation.VOLUME;
                        break;
                }
                if (!zone) {
                    let newZone = {
                        SLOTTING_ZONE_ID: ll.SLOTTING_ZONE_ID,
                        WAREHOUSE_CODE: ll.WAREHOUSE_CODE,
                        ZONE_ID: ll.ZONE_ID,
                        ZONE: ll.ZONE,
                        MANDATORY: ll.MANDATORY,
                        COUNT_CLASS: ll.COUNT_CLASS,
                        COUNT_CLASS_IN_LICENSE: ll.COUNT_CLASS_IN_LICENSE,
                        DIFFERENCE_OF_CLASSES: ll.DIFFERENCE_OF_CLASSES,
                        LOCATIONS: [],
                        ICON: "arrow-dropdown",
                        SHOW_DETAIL: true
                    };
                    newZone.LOCATIONS.push(newLocation);
                    listSuggestionZone.push(newZone);
                }
                else {
                    let locations = zone.LOCATIONS;
                    locations.push(newLocation);
                    zone.LOCATIONS = locations;
                }
            });
            return Promise.resolve(listSuggestionZone);
        });
    }
    getLocationSuggestionToServer() {
        return __awaiter(this, void 0, void 0, function* () {
            let suggestedLocation = models_1.DataRequest.Factory.createSuggestedLocation(this.generalReceptionParam.licenseId, this.settings.userCredentials);
            return this.locationSuggestion.getLocationSuggestion(suggestedLocation);
        });
    }
    getLocationSuggestionByMaterialList() {
        return __awaiter(this, void 0, void 0, function* () {
            let listLocationMaterial = yield this.getLocationSuggestionByMaterial();
            let listSuggestionMaterial = [];
            yield listLocationMaterial.forEach(LLM => {
                let material = listSuggestionMaterial.find(LSM => {
                    return (LLM.MATERIAL_ID == LSM.MATERIAL_ID &&
                        LLM.LOCATION_SPOT == LSM.LOCATION_SPOT);
                });
                if (material !== null) {
                    let newMaterial = {
                        BATCH: LLM.BATCH,
                        CALIBER: LLM.CALIBER,
                        DATE_EXPIRATION: LLM.DATE_EXPIRATION,
                        LOCATION_SPOT: LLM.LOCATION_SPOT,
                        MATERIAL_ID: LLM.MATERIAL_ID,
                        QTY: LLM.QTY,
                        TONE: LLM.TONE,
                        TONE_AND_CALIBER_ID: LLM.TONE_AND_CALIBER_ID,
                        ICON: "arrow-dropdown",
                        SHOW_DETAIL: true
                    };
                    listSuggestionMaterial.push(newMaterial);
                }
            });
            return Promise.resolve(listSuggestionMaterial);
        });
    }
    getLocationSuggestionByMaterial() {
        return __awaiter(this, void 0, void 0, function* () {
            let suggestedLocation = models_1.DataRequest.Factory.createSuggestedLocation(this.generalReceptionParam.licenseId, this.settings.userCredentials);
            return this.locationSuggestion.getLocationSuggestionByMaterial(suggestedLocation);
        });
    }
    showScanIcon(option) {
        this.currentScan = option;
        return option === this.currentScan;
    }
    userWantsToChangeCurrentScan(newScan) {
        this.currentScan = newScan;
    }
    scanBarcode() {
        return this.device.scan();
    }
    navigationPage(page, param) {
        this.navigation.pushPage(page, this.workspace, this.navCtrl, param);
    }
    userWantToProcessScannedData(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                yield this.processLocationByZone(scanData);
                yield this.userInteraction.hideLoading();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(!isNaN(error) ? error : enums_1.Enums.CustomErrorCodes.InvalidInput, scanData);
            }
        });
    }
    processLocationByZone(location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.generalReceptionParam.locationScan = location;
                // Verifica en que opcion escaneo la ubicacion
                if (this.currentScan === enums_1.Enums.SuggestedLocationScan.LocationByZone) {
                    let page = null;
                    if (this.listSuggestionZone && this.listSuggestionZone.length > 0) {
                        yield this.listSuggestionZone.forEach((zone) => __awaiter(this, void 0, void 0, function* () {
                            let result = zone.LOCATIONS.find(locationZone => {
                                return location == locationZone.LOCATION;
                            });
                            if (result) {
                                // Verifica que no exista diferencia de clases
                                if (zone.DIFFERENCE_OF_CLASSES > 0 && zone.MANDATORY == enums_1.Enums.YesNo.Yes) {
                                    let alertMessage = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.CreateANewLicenseWithIncompatibleClasses);
                                    let userConfirm = yield this.userInteraction.showConfirmMessage(alertMessage);
                                    if (userConfirm == enums_1.Enums.YesNo.Yes) {
                                        page = enums_1.Enums.Page.LicenseClassLocation;
                                    }
                                    else {
                                        return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
                                    }
                                }
                                else {
                                    page = yield this.validateLocation(location);
                                    if (!page) {
                                        return Promise.resolve();
                                    }
                                }
                            }
                            else {
                                page = yield this.validateLocation(location);
                                if (!page) {
                                    return Promise.resolve();
                                }
                            }
                            if (!page) {
                                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.LocationDoesntExist, location);
                                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(location, enums_1.Enums.CustomErrorCodes
                                    .LocationDoesntExist)));
                            }
                            this.generalReceptionParam.location = location;
                            this.generalReceptionParam.comesFrom = enums_1.Enums.Page.LocationSuggestion;
                            switch (page) {
                                case enums_1.Enums.Page.LocateGeneralReceptionLicense:
                                    this.navigation.pushPage(page, this.workspace, this.navCtrl, this.generalReceptionParam);
                                    break;
                            }
                        }));
                    }
                    else {
                        page = yield this.validateLocation(location);
                        if (!page) {
                            return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
                        }
                        this.generalReceptionParam.location = location;
                        this.generalReceptionParam.comesFrom =
                            enums_1.Enums.Page.LocationSuggestion;
                        this.navigation.pushPage(page, this.workspace, this.navCtrl, this.generalReceptionParam);
                    }
                }
                else if (this.currentScan === enums_1.Enums.SuggestedLocationScan.Material) {
                    // Escaneado en MATERIAL
                    var Material = this.listSuggestionMaterial.find(listMaterial => {
                        return location == listMaterial.LOCATION_SPOT;
                    });
                    if (!Material) {
                        let page = yield this.validateLocation(location);
                        if (!page) {
                            return;
                        }
                    }
                    this.generalReceptionParam.location = location;
                    this.generalReceptionParam.comesFrom = enums_1.Enums.Page.LocationSuggestion;
                    this.navigationPage(enums_1.Enums.Page.LocateGeneralReceptionLicense, this.generalReceptionParam);
                }
                yield this.userInteraction.hideLoading();
                return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(error.message, enums_1.Enums.CustomErrorCodes.InvalidInput)));
            }
        });
    }
    validateLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            let validateLocationRequest = models_1.DataRequest.Factory.createValidateLocationForStorageRequest(this.licenseId, location, this.taskId, this.settings.userCredentials);
            let validateResult = yield this.location.validateLocationForStorage(validateLocationRequest);
            if (validateResult.Resultado === enums_1.Enums.OperationResult.Success) {
                return Promise.resolve(enums_1.Enums.Page.LocateGeneralReceptionLicense);
            }
            else {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(validateResult.Codigo && validateResult.Codigo > 0
                    ? validateResult.Codigo
                    : enums_1.Enums.CustomErrorCodes.UnknownError, validateResult.DbData);
                return Promise.resolve(null);
            }
        });
    }
    toggleDetails(suggestion) {
        if (suggestion.SHOW_DETAIL) {
            suggestion.SHOW_DETAIL = false;
            suggestion.ICON = "arrow-dropright";
        }
        else {
            suggestion.SHOW_DETAIL = true;
            suggestion.ICON = "arrow-dropdown";
        }
    }
    backButtonAction() {
        this.generalReceptionParam.actionBack = true;
        return this.navigation.popPage(this.workspace, this.navCtrl, this.generalReceptionParam);
    }
    getParameterSubFamily() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let requestParameter = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.MaterialSubFamily, enums_1.Enums.ParameterId.UseMaterialSubFamily, this.settings.userCredentials);
                let parameter = yield this.configuration.getParameter(requestParameter);
                if (parameter && parameter.length && Number(parameter[0].VALUE) === enums_1.Enums.YesNo.Yes) {
                    this.useMaterialSubFamily = true;
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
LocationSuggestionReceptionPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-location-suggestion-reception",
        templateUrl: "location-suggestion-reception.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        ionic_angular_1.NavParams,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        location_suggestion_1.LocationSuggestionProvider,
        device_1.DeviceProvider,
        translate_1.TranslateProvider,
        location_1.LocationProvider,
        configuration_1.ConfigurationProvider])
], LocationSuggestionReceptionPage);
exports.LocationSuggestionReceptionPage = LocationSuggestionReceptionPage;
//# sourceMappingURL=location-suggestion-reception.js.map