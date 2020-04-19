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
const label_1 = require("../../providers/label/label");
const printer_1 = require("../../providers/printer/printer");
const reception_1 = require("../../providers/reception/reception");
let GeneralPickingPage = class GeneralPickingPage {
    constructor(navCtrl, navParams, navigation, workspace, picking, reception, userInteraction, translate, settings, label, printer // private generalTransfer: GeneralTransferProvider
    ) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.picking = picking;
        this.reception = reception;
        this.userInteraction = userInteraction;
        this.translate = translate;
        this.settings = settings;
        this.label = label;
        this.printer = printer;
        this.currentSegment = "pendingToWork";
        this.wavePickingId = 0;
        this.licenseDispatchId = 0;
        this.projectId = "";
        this.projectCode = "";
        this.projectName = "";
        this.projectShortName = "";
        this.materials = [];
        this.headers = [];
        this.taskGroupedByMaterial = [];
        this.locationTarget = "";
        this.regimenTask = enums_1.Enums.Regime.General;
        this.finishPicking = false;
        this.isGeneralTransfer = false;
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.wavePickingId = this.navParams.data.wavePickingId;
                this.regimenTask = this.navParams.data.regime;
                this.headers = yield this.getWavePickingHeaders();
                //this.task = null;
                this.task = this.navParams.data.task || null;
                this.isGeneralTransfer = !!this.task;
                this.reqRegisterGenTransReception =
                    this.navParams.data.reqRegisterGenTransReception || null;
                for (let header of this.headers) {
                    var completeTask = 0;
                    for (let complete of header.Tasks) {
                        if (complete.isCompleted == 1) {
                            completeTask += 1;
                        }
                    }
                    if (header.Tasks.length == completeTask) {
                        header.isComplete = true;
                    }
                }
                var countTaskComplete = 0;
                for (let task of this.headers) {
                    if (task.isComplete == true) {
                        countTaskComplete += 1;
                    }
                }
                if (this.headers.length === countTaskComplete) {
                    return this.verifyLicensesDispatchPendingToLocate();
                }
                this.materials = yield this.getPickingMaterials();
                let licensesDispatch = yield this.getLicenseDispatch();
                if (licensesDispatch.length !== 0) {
                    this.licenseDispatchId = licensesDispatch[0].LICENSE_ID;
                }
                if (this.headers &&
                    !this.headers.find(header => {
                        return header.qtyPending > 0;
                    })) {
                    return this.verifyLicensesDispatchPendingToLocate();
                }
                if (this.headers &&
                    this.headers.length > 0 &&
                    this.headers[0].Tasks &&
                    this.headers[0].Tasks.length > 0) {
                    let task = this.headers[0].Tasks[0];
                    this.projectId = task.projectId;
                    this.projectCode = task.projectCode;
                    this.projectName = task.projectName;
                    this.projectShortName = task.projectShortName;
                    this.task = task;
                    this.isGeneralTransfer =
                        this.task.taskSubtype === enums_1.Enums.TaskSubType.GeneralTransfer;
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
    verifyLicensesDispatchPendingToLocate() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.allLicensesDispatchHasAlocated();
            if (result) {
                if (this.task.taskSubtype !== enums_1.Enums.TaskSubType.GeneralTransfer ||
                    (!this.taskGroupedByMaterial.find(detail => detail.Tasks.length > 0) &&
                        this.task.taskSubtype === enums_1.Enums.TaskSubType.GeneralTransfer)) {
                    this.completeTask(this.task, enums_1.Enums.YesNo.Yes);
                    return this.backButtonAction();
                }
            }
            else {
                return this.locateLicenseDispatch(true);
            }
        });
    }
    allLicensesDispatchHasAlocated() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetLicenseDispatchByWavePicking(this.wavePickingId, this.settings.userCredentials);
            let result = yield this.picking.getLicenseDispatchByWavePicking(request);
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
    showDetail(materialId) {
        if (materialId) {
            this.taskGroupedByMaterial = [];
            let materialHeader = _.find(this.headers, (header) => {
                return header.Material.materialId === materialId;
            });
            materialHeader.showDetails = true;
            materialHeader.Tasks = _.orderBy(materialHeader.Tasks, "locationSpotSource", "asc");
            this.taskGroupedByMaterial.push(materialHeader);
            this.currentSegment = "pickingDetail";
        }
        else {
            this.taskGroupedByMaterial = this.headers;
        }
        this.taskGroupedByMaterial.map((task) => {
            let qty = 0;
            task.Tasks.map((taskTemp) => {
                if (taskTemp.materialId === taskTemp.Material.materialId) {
                    qty = qty + taskTemp.quantityPending;
                }
            });
            task.qty = qty;
        });
        this.locationTarget = this.taskGroupedByMaterial[0].Tasks[0].locationSpotTarget;
    }
    printMaterial(materialId) {
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
    confirmFinishWithDifferences(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            let confirmMessage = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.FinishWithDifferences);
            let result = yield this.userInteraction.showConfirmMessage(confirmMessage);
            if (result === enums_1.Enums.YesNo.Yes) {
                return this.finishWithDifferences(materialId);
            }
        });
    }
    finishWithDifferences(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let material = _.find(this.headers, (pickingHeader) => {
                    return pickingHeader.Material.materialId === materialId;
                });
                let request = models_1.DataRequest.Factory.createCancelPickingDetailLineRequest(this.wavePickingId, material.Material.materialId, this.settings.userCredentials);
                let result = yield this.picking.cancelPickingDetailLine(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.headers = yield this.getWavePickingHeaders();
                    if (this.headers &&
                        !this.headers.find(header => {
                            return header.qtyPending > 0;
                        })) {
                        return this.verifyLicensesDispatchPendingToLocate();
                    }
                    for (let header of this.headers) {
                        var completeTask = 0;
                        for (let complete of header.Tasks) {
                            if (complete.isCompleted == 1) {
                                completeTask += 1;
                            }
                        }
                        if (header.Tasks.length == completeTask) {
                            header.isComplete = true;
                        }
                    }
                    var countTaskComplete = 0;
                    for (let task of this.headers) {
                        if (task.isComplete == true) {
                            countTaskComplete += 1;
                        }
                    }
                    if (this.headers.length === countTaskComplete) {
                        return this.verifyLicensesDispatchPendingToLocate();
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
    getWavePickingHeaders() {
        let tasks = models_1.DataRequest.Factory.createGetTaskListRequest(this.wavePickingId, this.settings.userCredentials);
        return this.picking.getPickingHeaders(tasks);
    }
    getPickingMaterials() {
        let request = models_1.DataRequest.Factory.createGetPickingMaterialsWithMeasurementUnitRequest(this.wavePickingId, this.settings.userCredentials);
        return this.picking.getPickingMaterialsWithMeasurementUnit(request);
    }
    toggleDetails(material) {
        if (material.showDetails) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
        }
        else {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
        }
    }
    userWantsToProcessSku(task, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createInsertPickingLabelsRequest(task.wavePickingId, task.clientOwner, this.settings.userCredentials);
                let result = yield this.label.insertPickingLabel(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let resultActualizaStatus = yield this.completeTask(task);
                    if (resultActualizaStatus.Resultado ===
                        enums_1.Enums.OperationResult.Success) {
                        this.licenseDispatchId = parseInt(resultActualizaStatus.DbData);
                        this.userInteraction.hideLoading();
                        this.navigation.pushPage(enums_1.Enums.Page.ProcessGeneralPicking, this.workspace, this.navCtrl, {
                            task: task,
                            taskHeader: header,
                            labelId: Number(result.DbData),
                            materials: this.materials,
                            processSku: null,
                            labelDispatchId: this.licenseDispatchId,
                            regime: this.regimenTask,
                            isGeneralTransfer: this.isGeneralTransfer,
                            wavePickingId: this.wavePickingId
                        });
                    }
                    else {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                            ? result.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                    }
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
    completeTask(task, closeTask) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.picking.completeTask(task, this.settings.loginId, closeTask);
        });
    }
    getLicenseDispatch() {
        let pickingDispatch = models_1.DataRequest.Factory.createGetLastDispatchLicenseGeneratedByWavePicking(this.wavePickingId, this.settings.userCredentials);
        return this.picking.getLastDispatchLicenseGeneratedByWavePicking(pickingDispatch);
    }
    insertLicenseDispatch() {
        return __awaiter(this, void 0, void 0, function* () {
            let insertLicenseDispatchRequest = models_1.DataRequest.Factory.createInsertLicenseDispatch(this.wavePickingId, this.settings.userCredentials);
            let result = yield this.picking.insertLicenseDispatch(insertLicenseDispatchRequest);
            if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                this.licenseDispatchId = parseInt(result.DbData);
            }
            else {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                    ? result.Codigo
                    : enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    printLicenseDispatch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                let request = models_1.DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(this.licenseDispatchId, this.settings.userCredentials);
                let format = yield this.printer.getLicenseDispatchPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    locateLicenseDispatch(isPickingComplete) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.reqRegisterGenTransReception = models_1.DataRequest.Factory.createRegisterGeneralTransferReceptionRequest(this.task, 0, this.settings.userCredentials, this.licenseDispatchId, this.headers[0].Material.materialId, "");
                this.userInteraction.hideLoading();
                this.navigation.pushPage(enums_1.Enums.Page.LocateLicenseDispatch, this.workspace, this.navCtrl, {
                    wavePickingId: this.wavePickingId,
                    locations: [],
                    isPickingTaskComplete: isPickingComplete,
                    regime: this.regimenTask,
                    isGeneralTransfer: this.isGeneralTransfer,
                    task: this.task,
                    reqRegisterGenTransReception: this
                        .reqRegisterGenTransReception
                });
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    suggestedPicking(task, header) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createInsertPickingLabelsRequest(task.wavePickingId, task.clientOwner, this.settings.userCredentials);
                let result = yield this.label.insertPickingLabel(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let resultActualizaStatus = yield this.completeTask(task);
                    if (resultActualizaStatus.Resultado ===
                        enums_1.Enums.OperationResult.Success) {
                        this.licenseDispatchId = parseInt(resultActualizaStatus.DbData);
                        this.navigation.pushPage(enums_1.Enums.Page.SuggestedPickingPage, this.workspace, this.navCtrl, {
                            wavePickingId: this.wavePickingId,
                            task: task,
                            taskHeader: header,
                            materialId: header.Material.materialId,
                            materialName: header.Material.materialName,
                            materials: this.materials,
                            labelDispatchId: this.licenseDispatchId,
                            labelId: Number(result.DbData),
                            projectId: this.projectId,
                            regime: this.regimenTask
                        });
                    }
                    else {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                            ? result.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                    }
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
                this.userInteraction.hideLoading();
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    userWantsToCompleteTask() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction.showLoading();
            try {
                if (this.licenseDispatchId) {
                    let resultRollBackLicense = null;
                    resultRollBackLicense = yield this.rollbackLicense();
                    if (resultRollBackLicense.Resultado !==
                        enums_1.Enums.OperationResult.Success) {
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                        return Promise.resolve(resultRollBackLicense);
                    }
                }
                let result = yield this.completeTask(this.task, enums_1.Enums.YesNo.Yes);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.navigation.popPage(this.workspace, this.navCtrl);
                }
                else {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
                this.userInteraction.hideLoading();
                return Promise.resolve(result);
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                this.userInteraction.hideLoading();
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(reason, enums_1.Enums.CustomErrorCodes.DataBaseError)));
            }
        });
    }
    rollbackLicense() {
        let license = models_1.DataRequest.Factory.createRollBackLicenseRequest(this.licenseDispatchId, this.settings.userCredentials);
        return this.reception.rollbackLicense(license);
    }
};
GeneralPickingPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-general-picking",
        templateUrl: "general-picking.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        picking_1.PickingProvider,
        reception_1.ReceptionProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        user_settings_1.UserSettingsProvider,
        label_1.LabelProvider,
        printer_1.PrinterProvider // private generalTransfer: GeneralTransferProvider
    ])
], GeneralPickingPage);
exports.GeneralPickingPage = GeneralPickingPage;
//# sourceMappingURL=general-picking.js.map