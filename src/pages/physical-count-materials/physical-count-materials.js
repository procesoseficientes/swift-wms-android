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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
let PhysicalCountMaterialsPage = class PhysicalCountMaterialsPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.locationSpot = "";
        this.taskId = "";
        this.materials = [];
    }
    ionViewDidEnter() {
        let params = this.navParams.data;
        this.locationSpot = params.locationSpot;
        this.taskId = params.taskId;
        this.materials = params.materials;
        this.userInteraction.hideLoading();
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl, {
            taskId: this.taskId,
            locationSpot: this.locationSpot
        });
    }
};
PhysicalCountMaterialsPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-physical-count-materials",
        templateUrl: "physical-count-materials.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider])
], PhysicalCountMaterialsPage);
exports.PhysicalCountMaterialsPage = PhysicalCountMaterialsPage;
//# sourceMappingURL=physical-count-materials.js.map