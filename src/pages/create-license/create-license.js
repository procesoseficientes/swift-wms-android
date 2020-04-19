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
const reception_1 = require("../../providers/reception/reception");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const license_1 = require("../../providers/license/license");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const printer_1 = require("../../providers/printer/printer");
const configuration_1 = require("../../providers/configuration/configuration");
let CreateLicensePage = class CreateLicensePage {
    constructor(navCtrl, navParams, navigation, workspace, reception, license, userInteraction, settings, printer, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.reception = reception;
        this.license = license;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.printer = printer;
        this.configuration = configuration;
        this.currentSegment = "createLicense";
        this.materials = [];
        this.regimenTask = enums_1.Enums.Regime.General;
        this.showPolicyAndRegime = false;
        this.loadReceptionObjects();
    }
    loadReceptionObjects() {
        this.receptionHeader = models_1.Model.Factory.createReceptionTaskHeader();
        this.receptionRequest = models_1.DataRequest.Factory.createReceptionRequest(this.settings.userCredentials);
    }
    loadReceptionHeader() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let licenseParam = this
                    .navParams.data;
                this.receptionRequest.serialNumber = licenseParam.taskId;
                this.receptionRequest.taskAssignedTo = this.settings.login;
                this.receptionRequest.regime = licenseParam.regime == undefined ? enums_1.Enums.Regime.General : licenseParam.regime;
                this.receptionHeader = yield this.reception.getReceptionTaskHeader(this.receptionRequest);
                this.createLicense = models_1.DataRequest.Factory.createCreateLicenseRequest(this.receptionHeader.policyCode, this.settings.login, this.receptionHeader.clientCode, this.receptionHeader.regime, this.receptionHeader.taskId, this.settings.userCredentials);
                this.createLicense.regime = this.receptionRequest.regime,
                    this.regimenTask = this.receptionRequest.regime;
                return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(reason, enums_1.Enums.CustomErrorCodes.DataBaseError)));
            }
        });
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.loadReceptionHeader();
            yield this.getParameterFiscal();
            this.userInteraction.hideLoading();
        });
    }
    getParameterFiscal() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let requestParameter = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.ValidationFiscal, enums_1.Enums.ParameterId.HandlesFiscalStorage, this.settings.userCredentials);
                let parameter = yield this.configuration.getParameter(requestParameter);
                if (parameter && parameter.length && Number(parameter[0].VALUE) === enums_1.Enums.YesNo.Yes) {
                    this.showPolicyAndRegime = true;
                }
                return Promise.resolve();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound);
            }
        });
    }
    userWantsToCreateLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction.showLoading();
            try {
                let result = yield this.license.createLicense(this.createLicense);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.navigation.pushPage(enums_1.Enums.Page.GeneralReception, this.workspace, this.navCtrl, {
                        licenseId: parseInt(result.DbData),
                        taskId: this.receptionHeader.taskId,
                        clientOwner: this.receptionHeader.clientCode,
                        taskSubtype: this.receptionHeader.receptionSubType,
                        actionBack: false,
                        regime: this.regimenTask
                    });
                }
                else {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
                return Promise.resolve(result);
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                this.userInteraction.hideLoading();
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(reason, enums_1.Enums.CustomErrorCodes.DataBaseError)));
            }
        });
    }
    userWantsToCompleteTask() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction.showLoading();
            try {
                this.receptionRequest.transType = enums_1.Enums.TransType.GeneralReception;
                this.receptionRequest.loginId = this.settings.loginId;
                this.receptionRequest.login = this.settings.login;
                this.receptionRequest.policyCode = this.receptionHeader.policyCode;
                this.receptionRequest.taskId = this.receptionHeader.taskId;
                this.receptionRequest.status = enums_1.Enums.ReceptionStatus.Completed;
                let result = yield this.reception.completeTask(this.receptionRequest);
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
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
    showDetail() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetTaskDetailForReceptionConsolidatedRequest(this.receptionHeader.taskId, this.settings.userCredentials);
                this.materials = yield this.reception.getTaskDetailForReceptionConsolidated(request);
                this.userInteraction.hideLoading();
                return Promise.resolve();
            }
            catch (ex) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                this.userInteraction.hideLoading();
            }
        });
    }
    userWantsPrintMaterial(material) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.settings.printer.address === "") {
                    this.userInteraction.hideLoading();
                    return;
                }
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialPrintFormat(material.MATERIAL_ID, this.settings.userCredentials);
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
};
CreateLicensePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-create-license",
        templateUrl: "create-license.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        reception_1.ReceptionProvider,
        license_1.LicenseProvider,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        printer_1.PrinterProvider,
        configuration_1.ConfigurationProvider])
], CreateLicensePage);
exports.CreateLicensePage = CreateLicensePage;
//# sourceMappingURL=create-license.js.map