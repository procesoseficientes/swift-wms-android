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
const material_1 = require("../../providers/material/material");
const models_1 = require("../../models/models");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const license_1 = require("../../providers/license/license");
const printer_1 = require("../../providers/printer/printer");
const checkpoint_1 = require("../../providers/checkpoint/checkpoint");
const configuration_1 = require("../../providers/configuration/configuration");
let MaterialInfoPage = class MaterialInfoPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, settings, material, license, printer, checkpoint, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.material = material;
        this.license = license;
        this.printer = printer;
        this.checkpoint = checkpoint;
        this.configuration = configuration;
        this.currentSegment = "skuDescription";
        this.inventory = [];
        this.isMoreResults = false;
        this.checkpointChangeMaterialProperties = false;
        this.showRegime = false;
        this.materialInfo = models_1.Model.Factory.createMaterial();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getParameterFiscal();
            try {
                let params = this.navParams.data;
                this.licenseId = params.licenseId;
                this.locationSpot = params.locationSpot;
                this.isMoreResults = params.isMoreResults;
                yield this.getMaterial(params.materialId);
                if (this.materialInfo) {
                    this.materialInfo.licenseId = this.licenseId;
                    this.materialInfo.locationSpot = this.locationSpot;
                    this.materialInfo.isMoreResults = this.isMoreResults;
                    yield this.getInventoryInfo(this.materialInfo.materialId);
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    getMaterial(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let materialRequest = models_1.DataRequest.Factory.createGetMaterialRequest(this.settings.userCredentials);
                materialRequest.materialId = materialId;
                this.materialInfo = yield this.material.getMaterial(materialRequest);
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, materialId);
                return this.navigation.popPage(this.workspace, this.navCtrl, {
                    licenseId: this.licenseId
                }, this.isMoreResults ? 2 : 1);
            }
        });
    }
    getInventoryInfo(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGetInventoryByMaterialRequest(materialId, this.settings.userCredentials);
                this.inventory = yield this.license.getInventoryByMaterial(request, this.settings.userCredentials);
                this.validateCheckPoint();
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    validateCheckPoint() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGetCheckPointsByUserRequest(this.settings.userCredentials);
                let checkpoints = yield this.checkpoint.getCheckPointsByUser(request);
                if (checkpoints && checkpoints.length > 0) {
                    let checkpoint = checkpoints.find(check => {
                        return (check.CHECK_ID ==
                            enums_1.Enums.CheckPoints.OptionChangeMaterialProperties);
                    });
                    if (checkpoint) {
                        this.checkpointChangeMaterialProperties = true;
                    }
                }
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    showButtonChangeMaterial() {
        return this.checkpointChangeMaterialProperties;
    }
    isMasterPack() {
        return this.materialInfo.isMasterPack === enums_1.Enums.YesNo.Yes;
    }
    handleSeries() {
        return this.materialInfo.serialNumberRequests === enums_1.Enums.YesNo.Yes;
    }
    handleBatch() {
        return this.materialInfo.batchRequested === enums_1.Enums.YesNo.Yes;
    }
    handleTone() {
        return this.materialInfo.handleTone === enums_1.Enums.YesNo.Yes;
    }
    handleCaliber() {
        return this.materialInfo.handleCaliber === enums_1.Enums.YesNo.Yes;
    }
    isVin() {
        return this.materialInfo.isCar === enums_1.Enums.YesNo.Yes;
    }
    explodeInReception() {
        return this.materialInfo.explodeInReception === enums_1.Enums.YesNo.Yes;
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            licenseId: this.licenseId,
            locationId: this.locationSpot
        }, this.isMoreResults ? 2 : 1);
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
    userWantsPrintMaterial() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.settings.printer.address === "") {
                    this.userInteraction.hideLoading();
                    return;
                }
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialPrintFormat(this.materialInfo.materialId, this.settings.userCredentials);
                request.barcodeId = null;
                request.login = this.settings.login;
                let result = yield this.printer.getMaterialPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, result.FORMAT);
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(e);
            }
        });
    }
    printUnitMeasurement(barcodeId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.settings.printer.address === "") {
                    this.userInteraction.hideLoading();
                    return;
                }
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialPrintFormat(this.materialInfo.materialId, this.settings.userCredentials);
                request.barcodeId = barcodeId;
                request.login = this.settings.login;
                let result = yield this.printer.getMaterialPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, result.FORMAT);
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(e);
            }
        });
    }
    modifyMaterial() {
        this.navigation.pushPage(enums_1.Enums.Page.ModifyMaterialProperties, this.workspace, this.navCtrl, this.materialInfo);
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
MaterialInfoPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-material-info",
        templateUrl: "material-info.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        material_1.MaterialProvider,
        license_1.LicenseProvider,
        printer_1.PrinterProvider,
        checkpoint_1.CheckpointProvider,
        configuration_1.ConfigurationProvider])
], MaterialInfoPage);
exports.MaterialInfoPage = MaterialInfoPage;
//# sourceMappingURL=material-info.js.map