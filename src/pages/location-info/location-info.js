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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const enums_1 = require("../../enums/enums");
const models_1 = require("../../models/models");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const location_1 = require("../../providers/location/location");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const license_1 = require("../../providers/license/license");
const _ = require("lodash");
const translate_1 = require("../../providers/translate/translate");
const configuration_1 = require("../../providers/configuration/configuration");
let LocationInfoPage = class LocationInfoPage {
    constructor(navCtrl, navParams, userInteraction, settings, location, navigation, workspace, license, translate, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.location = location;
        this.navigation = navigation;
        this.workspace = workspace;
        this.license = license;
        this.translate = translate;
        this.configuration = configuration;
        this.currentSegment = enums_1.Enums.LocationInfoSegments
            .LocationDescription;
        this.locationId = "";
        this.inventory = [];
        this.unit = "";
        this.showRegime = false;
        this.locationInfo = models_1.Model.Factory.createLocationInfo();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getParameterFiscal();
            this.loadLocationInfo();
            this.populateInventoryDetail();
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            lastOption: enums_1.Enums.InfoCenterOption.Location
        });
    }
    populateInventoryDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGetInventoryByLocationSpotRequest(this.locationId, this.settings.userCredentials);
                let response = yield this.license.getInventoryByLocationSpot(request, this.settings.userCredentials);
                this.inventory = _(response)
                    .groupBy((license) => license.licenseId)
                    .map((value, key) => ({
                    licenseId: Number(key),
                    policyCode: value[0].policyCode,
                    clientOwner: value[0].clientOwner,
                    statusName: value[0].statusName,
                    regime: value[0].regime,
                    Inventory: value
                }))
                    .value();
                this.userInteraction.hideLoading();
                return Promise.resolve();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(error);
            }
        });
    }
    loadLocationInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.locationId = this.navParams
                    .data.locationId;
                let locationInfoRequest = models_1.DataRequest.Factory.createGetLocationInfoRequest(this.locationId, this.settings.userCredentials);
                this.locationInfo = yield this.location.getLocationInfo(locationInfoRequest);
                if (this.locationInfo.spotType === enums_1.Enums.LocationType.Floor) {
                    this.unit = "mt2";
                }
                this.userInteraction.hideLoading();
                return Promise.resolve();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, this.locationId);
                return this.navigation.popPage(this.workspace, this.navCtrl, {
                    lastOption: enums_1.Enums.InfoCenterOption.Location
                });
            }
        });
    }
    toggleDetails(detail) {
        if (detail.showDetails) {
            detail.showDetails = false;
            detail.icon = "arrow-dropright";
            return false;
        }
        else {
            detail.showDetails = true;
            detail.icon = "arrow-dropdown";
            return true;
        }
    }
    goToMaterialInfo(detail) {
        return this.navigation.pushPage(enums_1.Enums.Page.MaterialInfo, this.workspace, this.navCtrl, {
            materialId: detail.materialId,
            licenseId: detail.licenseId,
            locationSpot: detail.currentLocation,
            isMoreResults: false
        });
    }
    goToLicenseInfo(detail) {
        return this.navigation.pushPage(enums_1.Enums.Page.LicenseInfo, this.workspace, this.navCtrl, {
            licenseId: detail.licenseId,
            locationSpot: detail.currentLocation
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
LocationInfoPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-location-info",
        templateUrl: "location-info.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        location_1.LocationProvider,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        license_1.LicenseProvider,
        translate_1.TranslateProvider,
        configuration_1.ConfigurationProvider])
], LocationInfoPage);
exports.LocationInfoPage = LocationInfoPage;
//# sourceMappingURL=location-info.js.map