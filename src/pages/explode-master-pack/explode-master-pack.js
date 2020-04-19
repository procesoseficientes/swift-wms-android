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
const device_1 = require("../../providers/device/device");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const models_1 = require("../../models/models");
const masterpack_1 = require("../../providers/masterpack/masterpack");
const license_1 = require("../../providers/license/license");
let ExplodeMasterPackPage = class ExplodeMasterPackPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, device, settings, masterpack, license) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.device = device;
        this.settings = settings;
        this.masterpack = masterpack;
        this.license = license;
        this.currentSegment = "scanMaterial";
        this.scanData = "arium/100002";
        this.material = models_1.Model.Factory.createMaterialMasterPack();
        this.detail = [];
        this.isAndroid = false;
        this.licenseId = null;
        this.currentScan = enums_1.Enums.MasterPackScan.LicenseId;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isAndroid = this.device.isAndroid();
                this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
                this.userInteraction.hideLoading();
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
        return __awaiter(this, void 0, void 0, function* () {
            this.scanData = scanData;
            this.showBarcodeSegment();
            this.scanData = scanData;
            switch (this.currentScan) {
                case enums_1.Enums.MasterPackScan.LicenseId:
                    yield this.processLicenseScan(scanData);
                    yield this.userInteraction.hideLoading();
                    break;
                case enums_1.Enums.MasterPackScan.MaterialBarcode:
                    yield this.processMaterialScan(scanData);
                    break;
                default:
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, this.scanData);
            }
            this.userInteraction.hideLoading();
            return Promise.resolve(true);
        });
    }
    processLicenseScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                this.licenseId = Number(scanData.split("-")[0]);
                let request = models_1.DataRequest.Factory.createGetInventoryByLicenseRequest(this.licenseId, this.settings.userCredentials);
                let inventory = yield this.license.getInventoryByLicense(request, this.settings.userCredentials);
                if (inventory.length === 0) {
                    this.detail = [];
                    this.material = models_1.Model.Factory.createMaterialMasterPack();
                    this.licenseId = null;
                    this.currentScan = enums_1.Enums.MasterPackScan.LicenseId;
                    yield this.userInteraction.hideLoading();
                    return this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, scanData);
                }
                this.currentScan = enums_1.Enums.MasterPackScan.MaterialBarcode;
                this.detail = [];
                this.material = models_1.Model.Factory.createMaterialMasterPack();
                this.showScanIcon(enums_1.Enums.MasterPackScan.MaterialBarcode);
                return Promise.resolve(true);
            }
            catch (error) {
                this.currentScan = enums_1.Enums.MasterPackScan.MaterialBarcode;
                this.detail = [];
                this.material = models_1.Model.Factory.createMaterialMasterPack();
                this.showScanIcon(enums_1.Enums.MasterPackScan.MaterialBarcode);
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    processMaterialScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            let action = yield this.getScannedMaterial(scanData);
            if (!action) {
                this.userInteraction.hideLoading();
                return Promise.resolve(false);
            }
            this.currentScan = enums_1.Enums.MasterPackScan.LicenseId;
            this.showScanIcon(enums_1.Enums.MasterPackScan.LicenseId);
        });
    }
    getScannedMaterial(barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let materialValidateRequest = models_1.DataRequest.Factory.createValidateIsMasterPackRequest(barcode, this.settings.userCredentials);
                let result = yield this.masterpack.validateIsMasterPack(materialValidateRequest);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let getMaterialByLicenseRequest = models_1.DataRequest.Factory.createGetMasterPackByLicenseRequest(result.DbData, this.licenseId, this.settings.userCredentials);
                    let resultMaterialByLicenseRequest = yield this.masterpack.getMasterPackByLicence(getMaterialByLicenseRequest);
                    if (resultMaterialByLicenseRequest &&
                        resultMaterialByLicenseRequest.length > 0) {
                        this.material = resultMaterialByLicenseRequest[0];
                        let getMaterialByLicenseDetailRequest = models_1.DataRequest.Factory.createGetMasterPackDetailByLicenceRequest(this.licenseId, result.DbData, this.settings.userCredentials);
                        let resultMasterPackDetailByLicence = yield this.masterpack.getMasterPackDetailByLicence(getMaterialByLicenseDetailRequest);
                        if (resultMasterPackDetailByLicence &&
                            resultMasterPackDetailByLicence.length > 0) {
                            this.detail = resultMasterPackDetailByLicence;
                        }
                        else {
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes
                                .MasterPackDoesNotHaveMaterialsForExplode);
                            this.material = models_1.Model.Factory.createMaterialMasterPack();
                            this.detail = [];
                        }
                    }
                    else {
                        this.material = models_1.Model.Factory.createMaterialMasterPack();
                        this.detail = [];
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes
                            .MasterPackDoesNotHaveMaterialsForExplode);
                        return Promise.resolve(false);
                    }
                    return Promise.resolve(true);
                }
                else {
                    this.material = models_1.Model.Factory.createMaterialMasterPack();
                    this.detail = [];
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(false);
                }
            }
            catch (reason) {
                this.material = models_1.Model.Factory.createMaterialMasterPack();
                this.licenseId = null;
                this.detail = [];
                this.currentScan = enums_1.Enums.MasterPackScan.LicenseId;
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
            finally {
                this.userInteraction.hideLoading();
            }
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
    changeCurrentScan(newScan) {
        switch (newScan) {
            case enums_1.Enums.MasterPackScan.LicenseId:
                break;
            case enums_1.Enums.MasterPackScan.MaterialBarcode:
                if (this.licenseId <= 0)
                    return;
                break;
            default:
                return;
        }
        this.currentScan = newScan;
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    explodeMasterPack() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let explodeMasterPackRequest = models_1.DataRequest.Factory.createExplodeMasterPackRequest(this.licenseId, this.material.MATERIAL_ID, this.settings.login, 1, this.settings.userCredentials);
                let result = yield this.masterpack.explodeMasterPack(explodeMasterPackRequest);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.material = models_1.Model.Factory.createMaterialMasterPack();
                    this.licenseId = null;
                    this.detail = [];
                    this.currentScan = enums_1.Enums.MasterPackScan.LicenseId;
                    this.showScanIcon(enums_1.Enums.MasterPackScan.LicenseId);
                    this.currentSegment = "scanMaterial";
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.Ok);
                    return Promise.resolve(true);
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
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
};
ExplodeMasterPackPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-explode-master-pack",
        templateUrl: "explode-master-pack.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        masterpack_1.MasterpackProvider,
        license_1.LicenseProvider])
], ExplodeMasterPackPage);
exports.ExplodeMasterPackPage = ExplodeMasterPackPage;
//# sourceMappingURL=explode-master-pack.js.map