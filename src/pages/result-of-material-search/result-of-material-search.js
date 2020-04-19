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
const enums_1 = require("../../enums/enums");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const material_1 = require("../../providers/material/material");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
let ResultOfMaterialSearchPage = class ResultOfMaterialSearchPage {
    constructor(navCtrl, navParams, userInteraction, settings, material, navigation, workspace) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.material = material;
        this.navigation = navigation;
        this.workspace = workspace;
        this.materials = [];
        this.selectedOption = "";
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let params = this.navParams.data;
                yield this.getMaterials(params.materialId);
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    getMaterials(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let materialRequest = models_1.DataRequest.Factory.createGetMaterialRequest(this.settings.userCredentials);
                materialRequest.barcodeId = materialId;
                this.materials = yield this.material.getMaterialByBarcodeOrName(materialRequest);
                if (this.materials == null || this.materials.length == 0) {
                    yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, materialId);
                    return this.navigation.popPage(this.workspace, this.navCtrl, {});
                }
                else if (this.materials.length == 1) {
                    return this.navigation.pushPage(enums_1.Enums.Page.MaterialInfo, this.workspace, this.navCtrl, {
                        materialId: this.materials[0].materialId,
                        isMoreResults: true
                    });
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, materialId);
                return this.navigation.popPage(this.workspace, this.navCtrl, {});
            }
        });
    }
    gotoLocateMaterialInfo(material) {
        return __awaiter(this, void 0, void 0, function* () {
            material.showDetails = true;
            yield this.userInteraction.showLoading();
            yield this.navigation.pushPage(enums_1.Enums.Page.MaterialInfo, this.workspace, this.navCtrl, {
                materialId: material.materialId,
                isMoreResults: true
            });
            return Promise.resolve();
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {});
    }
};
ResultOfMaterialSearchPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-result-of-material-search",
        templateUrl: "result-of-material-search.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        material_1.MaterialProvider,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage])
], ResultOfMaterialSearchPage);
exports.ResultOfMaterialSearchPage = ResultOfMaterialSearchPage;
//# sourceMappingURL=result-of-material-search.js.map