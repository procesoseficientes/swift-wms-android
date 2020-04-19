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
const reception_1 = require("../../providers/reception/reception");
const models_1 = require("../../models/models");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
let ReceptionByDocumentPage = class ReceptionByDocumentPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, device, reception, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.device = device;
        this.reception = reception;
        this.settings = settings;
        this.documentNumber = "";
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
    processBarcodeScan(scanData) {
        this.validateDocument(scanData);
        return Promise.resolve();
    }
    goToCreateLicensePage(type, taskId) {
        if (type === enums_1.Enums.DocumentType.TransferRequest) {
            let params = { taskId: taskId };
            this.workspace.changeCurrentTab(enums_1.Enums.Tab.MyTasks, enums_1.Enums.Page.MyTasks);
            this.navigation.pushPage(enums_1.Enums.Page.CreateLicense, this.workspace, this.workspace.myTaskNavCtrl, params);
        }
        else {
            this.workspace.changeCurrentTab(enums_1.Enums.Tab.MyTasks, enums_1.Enums.Page.MyTasks);
        }
        this.documentNumber = "";
    }
    validateDocument(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createValidateScannedDocumentForReceptionRequest(documentId, this.settings.userCredentials);
                let result = yield this.reception.validateScannedDocumentForReception(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    yield this.createReceptionFromDocument(result.Codigo);
                    return Promise.resolve(result);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(result);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: e
                }));
            }
        });
    }
    createReceptionFromDocument(documentId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGenerateReceptionDocumentFromCargoManifestRequest(documentId, this.settings.userCredentials);
                let result = yield this.reception.generateReceptionDocumentFromCargoManifest(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let taskId = 0;
                    let type = result.DbData.split("|")[0];
                    if (type === enums_1.Enums.DocumentType.TransferRequest) {
                        taskId = Number(result.DbData.split("|")[3]);
                    }
                    this.userInteraction.hideLoading();
                    this.goToCreateLicensePage(type, taskId);
                    return Promise.resolve(result);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(result);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: e
                }));
            }
        });
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }
    scanBarcode() {
        return this.device.scan();
    }
    keyPressDocument(keyCode) {
        if (keyCode === enums_1.Enums.KeyCode.Enter && this.documentNumber !== "") {
            this.validateDocument(this.documentNumber);
        }
    }
};
ReceptionByDocumentPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-reception-by-document",
        templateUrl: "reception-by-document.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        reception_1.ReceptionProvider,
        user_settings_1.UserSettingsProvider])
], ReceptionByDocumentPage);
exports.ReceptionByDocumentPage = ReceptionByDocumentPage;
//# sourceMappingURL=reception-by-document.js.map