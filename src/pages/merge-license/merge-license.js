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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
const device_1 = require("../../providers/device/device");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const location_1 = require("../../providers/location/location");
const material_1 = require("../../providers/material/material");
const license_1 = require("../../providers/license/license");
const translate_1 = require("../../providers/translate/translate");
let MergeLicensePage = class MergeLicensePage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, device, settings, location, materialProvider, licenseProvider, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.device = device;
        this.settings = settings;
        this.location = location;
        this.materialProvider = materialProvider;
        this.licenseProvider = licenseProvider;
        this.translate = translate;
        this.currentSegment = "scanLocation";
        this.material = models_1.Model.Factory.createMaterial();
        this.currentScan = enums_1.Enums.LicenseMergeScanner.Location;
        this.licenses = [];
        this.isAndroid = false;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
        this.userInteraction.hideLoading();
    }
    scanBarcode() {
        return this.device.scan();
    }
    processBarcodeScan(data) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.currentScan) {
                case enums_1.Enums.LicenseMergeScanner.Location:
                    if (yield this.validateLocation(data)) {
                        this.materialId = null;
                        this.material = models_1.Model.Factory.createMaterial();
                        this.currentScan = enums_1.Enums.LicenseMergeScanner.Material;
                        this.getNewLicensesDetail();
                    }
                    break;
                case enums_1.Enums.LicenseMergeScanner.Material:
                    if (!this.locationText)
                        return;
                    if (yield this.validateMaterial(data)) {
                        this.currentScan = enums_1.Enums.LicenseMergeScanner.None;
                        this.getNewLicensesDetail();
                    }
                    break;
            }
            return Promise.resolve();
        });
    }
    getNewLicensesDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGetInfoOfLicenseInLocationForMergeRequest(this.locationText, this.materialId ? this.materialId : null, this.settings.userCredentials);
                this.licenses = yield this.licenseProvider.getInfoOfLicenseInLocationForMerge(request);
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.GetDataError);
            }
        });
    }
    validateLocation(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetLocationRequest(data, this.settings.userCredentials);
                let location = yield this.location.getLocation(request);
                if (location.locationSpot) {
                    this.locationText = location.locationSpot;
                    this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound);
                    return Promise.resolve(false);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showError(e.message);
                return Promise.resolve(false);
            }
        });
    }
    validateMaterial(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialRequest(this.settings.userCredentials);
                request.barcodeId = data;
                this.material = yield this.materialProvider.getMaterial(request);
                if (this.material) {
                    this.materialId = this.material.materialId;
                    this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound);
                    return Promise.resolve(false);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showError(e.message);
                return Promise.resolve(false);
            }
        });
    }
    mergeLocationLicenses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.licenses.length === 0) {
                    return Promise.resolve(false);
                }
                let confirmMessage = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DoYouWishToContinue);
                let res = yield this.userInteraction.showConfirmMessage(confirmMessage);
                if (res === enums_1.Enums.YesNo.No) {
                    return Promise.resolve(false);
                }
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createMergeLicenseInLocationWithoutDetail(this.locationText, this.materialId ? this.materialId : null, this.settings.userCredentials);
                let result = yield this.licenseProvider.mergeLicenseInLocationWithoutDetail(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success &&
                    result.DbData) {
                    yield this.getProcessedLicensesDetail(result.DbData);
                    yield this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(false);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showError(e.message);
                return Promise.resolve(false);
            }
        });
    }
    getProcessedLicensesDetail(licenses) {
        let newLicenses = licenses
            .split("|")
            .map((license) => {
            return {
                licenseId: Number(license.split("-")[0]),
                licenseDescription: license,
                detail: [],
                icon: "arrow-dropright"
            };
        });
        newLicenses.forEach((license) => __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetInventoryByLicenseRequest(license.licenseId, this.settings.userCredentials);
            let licenseDetail = yield this.licenseProvider.getInventoryByLicense(request, this.settings.userCredentials);
            license.detail = licenseDetail.map((material) => {
                return {
                    materialId: material.materialId,
                    quantity: material.qty,
                    batch: material.batch,
                    expirationDate: material.dateExpiration,
                    tone: material.tone,
                    caliber: material.caliber,
                    headerId: material.pickingDemandHeaderId,
                    docNum: material.docNum
                };
            });
        }));
        return this.navigation.pushPage(enums_1.Enums.Page.MergeLicenseDetail, this.workspace, this.navCtrl, {
            newLicenses: newLicenses,
            locationText: this.locationText,
            materialName: this.material.materialName
                ? this.material.materialName
                : ""
        });
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    changeCurrentScan(newScan) {
        this.currentScan = newScan;
    }
    toggleDetails(license) {
        if (license.showDetails) {
            license.showDetails = false;
            license.icon = "arrow-dropright";
            return false;
        }
        else {
            license.showDetails = true;
            license.icon = "arrow-dropdown";
            return true;
        }
    }
};
MergeLicensePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-merge-license",
        templateUrl: "merge-license.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        location_1.LocationProvider,
        material_1.MaterialProvider,
        license_1.LicenseProvider,
        translate_1.TranslateProvider])
], MergeLicensePage);
exports.MergeLicensePage = MergeLicensePage;
//# sourceMappingURL=merge-license.js.map