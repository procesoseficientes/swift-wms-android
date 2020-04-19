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
const picking_1 = require("../../providers/picking/picking");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const _ = require("lodash");
const enums_1 = require("../../enums/enums");
const translate_1 = require("../../providers/translate/translate");
const printer_1 = require("../../providers/printer/printer");
let GeneralReplenishmentPage = class GeneralReplenishmentPage {
    constructor(workspace, picking, userInteraction, translate, settings, navCtrl, navParams, navigation, printer) {
        this.workspace = workspace;
        this.picking = picking;
        this.userInteraction = userInteraction;
        this.translate = translate;
        this.settings = settings;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.printer = printer;
        this.currentSegmentReplenishment = "pendingToWork";
        this.wavePickingId = 0;
        this.licenseDispatchId = 0;
        this.materialsToReplenish = [];
        this.headersToReplenish = [];
        this.taskGroupedByMaterialToReplenish = [];
        this.locationTargetToReplenish = "";
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.wavePickingId = this.navParams.data.wavePickingId;
                this.headersToReplenish = yield this.getWavePickingHeadersReplenish();
                this.materialsToReplenish = yield this.getPickingMaterialsReplenish();
                let licensesDispatch = yield this.getLicenseDispatchReplenish();
                if (licensesDispatch.length !== 0) {
                    this.licenseDispatchId = licensesDispatch[0].LICENSE_ID;
                }
                if (this.headersToReplenish.length === 0) {
                    return this.verifyLicensesDispatchPendingToLocateReplenish();
                }
                this.userInteraction.hideLoading();
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
    verifyLicensesDispatchPendingToLocateReplenish() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.allLicensesDispatchHasAlocated();
            if (result) {
                return this.backButtonAction();
            }
            else {
                return this.locateLicenseDispatchReplenish(true);
            }
        });
    }
    allLicensesDispatchHasAlocated() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetTargetLocationByLicenseDispatch(this.wavePickingId, this.settings.userCredentials);
            let result = yield this.picking.getTargetLocationByLicenseDispatch(request);
            if (result != null && result.length == 0) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        });
    }
    backButtonAction() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.navigation.popPage(this.workspace, this.navCtrl);
        });
    }
    showDetailReplenish(materialId) {
        if (materialId) {
            this.taskGroupedByMaterialToReplenish = [];
            let materialHeader = _.find(this.headersToReplenish, (header) => {
                return header.Material.materialId === materialId;
            });
            materialHeader.showDetails = true;
            materialHeader.Tasks = _.orderBy(materialHeader.Tasks, "locationSpotSource", "asc");
            this.taskGroupedByMaterialToReplenish.push(materialHeader);
            this.currentSegmentReplenishment = "pickingDetail";
        }
        else {
            this.taskGroupedByMaterialToReplenish = this.headersToReplenish;
        }
        this.locationTargetToReplenish = this.taskGroupedByMaterialToReplenish[0].Tasks[0].locationSpotTarget;
    }
    printMaterialReplenish(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction.toast(materialId, enums_1.Enums.ToastTime.Short);
            try {
                if (this.settings.printer.address === "") {
                    this.userInteraction.hideLoading();
                    return;
                }
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialPrintFormat(materialId, this.settings.userCredentials);
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
    confirmFinishWithDifferencesReplenish(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirmMessage = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.FinishWithDifferences);
            let result = yield this.userInteraction.showConfirmMessage(confirmMessage);
            if (result === enums_1.Enums.YesNo.Yes) {
                return this.finishReplenishWithDifferences(materialId);
            }
        });
    }
    finishReplenishWithDifferences(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let material = _.find(this.headersToReplenish, (pickingHeader) => {
                    return pickingHeader.Material.materialId === materialId;
                });
                let request = models_1.DataRequest.Factory.createCancelPickingDetailLineRequest(this.wavePickingId, material.Material.materialId, this.settings.userCredentials);
                let result = yield this.picking.cancelPickingDetailLine(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.headersToReplenish = yield this.getWavePickingHeadersReplenish();
                    if (this.headersToReplenish.length === 0) {
                        return this.verifyLicensesDispatchPendingToLocateReplenish();
                    }
                }
                else {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    getWavePickingHeadersReplenish() {
        let tasks = models_1.DataRequest.Factory.createGetTaskListRequest(this.wavePickingId, this.settings.userCredentials);
        return this.picking.getPickingHeaders(tasks);
    }
    getPickingMaterialsReplenish() {
        let request = models_1.DataRequest.Factory.createGetPickingMaterialsWithMeasurementUnitRequest(this.wavePickingId, this.settings.userCredentials);
        return this.picking.getPickingMaterialsWithMeasurementUnit(request);
    }
    toggleDetailsReplenish(material) {
        if (material.showDetails) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
        }
        else {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
        }
    }
    userWantsToProcessSkuReplenish(task, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let result = yield this.completeTaskReplehish(task);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.licenseDispatchId = parseInt(result.DbData);
                    this.userInteraction.hideLoading();
                    this.navigation.pushPage(enums_1.Enums.Page.ProcessGeneralReplenishment, this.workspace, this.navCtrl, {
                        task: task,
                        taskHeader: header,
                        labelId: Number(result.DbData),
                        materials: this.materialsToReplenish,
                        processSku: null,
                        labelDispatchId: this.licenseDispatchId
                    });
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
            }
            catch (error) {
                this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    completeTaskReplehish(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.picking.completeTask(task, this.settings.loginId);
        });
    }
    getLicenseDispatchReplenish() {
        let pickingDispatch = models_1.DataRequest.Factory.createGetLastDispatchLicenseGeneratedByWavePicking(this.wavePickingId, this.settings.userCredentials);
        return this.picking.getLastDispatchLicenseGeneratedByWavePicking(pickingDispatch);
    }
    locateLicenseDispatchReplenish(isPickingComplete) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.hideLoading();
                this.navigation.pushPage(enums_1.Enums.Page.LocateReplenishment, this.workspace, this.navCtrl, {
                    wavePickingId: this.wavePickingId,
                    locations: [],
                    isPickingTaskComplete: isPickingComplete
                });
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
};
GeneralReplenishmentPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-general-replenishment",
        templateUrl: "general-replenishment.html"
    }),
    __metadata("design:paramtypes", [workspace_1.WorkspacePage,
        picking_1.PickingProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        user_settings_1.UserSettingsProvider,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        printer_1.PrinterProvider])
], GeneralReplenishmentPage);
exports.GeneralReplenishmentPage = GeneralReplenishmentPage;
//# sourceMappingURL=general-replenishment.js.map