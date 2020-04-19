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
const enums_1 = require("../../enums/enums");
let SuggestedPickingPage = class SuggestedPickingPage {
    constructor(navCtrl, navParams, navigation, workspace, picking, userInteraction, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.picking = picking;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.wavePickingId = 0;
        this.materialId = "";
        this.materialName = "";
        this.listLicense = [];
        this.task = models_1.Model.Factory.createTask();
        this.materials = [];
        this.licenseDispatchId = 0;
        this.projectId = "";
    }
    ionViewDidLoad() {
        let params = this.navParams.data;
        if (params.materialId) {
            this.wavePickingId = params.wavePickingId;
            this.materialId = params.materialId;
            this.materialName = params.materialName;
            this.task = params.task;
            this.taskHeader = params.taskHeader;
            this.materials = params.materials;
            this.labelId = params.labelId;
            this.licenseDispatchId = params.labelDispatchId;
            this.projectId = params.projectId;
            this.loadSuggestedLicenses();
        }
        else {
            this.wavePickingId = params.wavePickingId;
            this.backButtonAction();
        }
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            wavePickingId: this.wavePickingId
        }, 1);
    }
    loadSuggestedLicenses() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetSuggestedDispatchLicense(this.materialId, this.wavePickingId, this.projectId, this.settings.userCredentials);
            try {
                this.userInteraction.showLoading();
                let result = yield this.picking.getSuggestedDispatchLicense(request);
                if (result != null && result.length > 0) {
                    this.listLicense = result;
                }
                else {
                    this.backButtonAction();
                }
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InsertDataBaseError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    userWantsToProcessSku(license) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.task.locationSpotSource = license.LOCATION;
                this.task.licenseIdSource = license.LICENCE_ID;
                this.task.quantityPending = (this.taskHeader.qty > license.QTY) ? license.QTY : this.taskHeader.qty;
                let resultActualizaStatus = yield this.completeTask(this.task);
                if (resultActualizaStatus.Resultado ===
                    enums_1.Enums.OperationResult.Success) {
                    this.userInteraction.hideLoading();
                    this.navigation.pushPage(enums_1.Enums.Page.ProcessGeneralPicking, this.workspace, this.navCtrl, {
                        task: this.task,
                        taskHeader: this.taskHeader,
                        labelId: this.labelId,
                        materials: this.materials,
                        processSku: null,
                        labelDispatchId: this.licenseDispatchId
                    });
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(resultActualizaStatus.Codigo &&
                        resultActualizaStatus.Codigo > 0
                        ? resultActualizaStatus.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
            }
            catch (error) {
                this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    completeTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.picking.completeTask(task, this.settings.loginId);
        });
    }
};
SuggestedPickingPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-suggested-picking",
        templateUrl: "suggested-picking.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        picking_1.PickingProvider,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider])
], SuggestedPickingPage);
exports.SuggestedPickingPage = SuggestedPickingPage;
//# sourceMappingURL=suggested-picking.js.map