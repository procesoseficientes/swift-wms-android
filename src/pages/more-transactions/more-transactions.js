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
const enums_1 = require("../../enums/enums");
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
let MoreTransactionsPage = class MoreTransactionsPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
    }
    ionViewDidLoad() {
        this.navigation.moreTransNavCtrl = this.navCtrl;
    }
    ionViewDidEnter() {
        this.navigation.moreTransNavCtrl = this.navCtrl;
    }
    goToManifestCertification() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.ManifestCertification, this.workspace, this.navCtrl);
        });
    }
    goToReceptionByDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.ReceptionByDocument, this.workspace, this.navCtrl);
        });
    }
    goToMergeLicenses() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.MergeLicense, this.workspace, this.navCtrl);
        });
    }
    goToExplodeMasterPack() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.ExplodeMasterPack, this.workspace, this.navCtrl);
        });
    }
    goToDispatchOfLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.DispatchOfLicense, this.workspace, this.navCtrl);
        });
    }
};
MoreTransactionsPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-more-transactions",
        templateUrl: "more-transactions.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider])
], MoreTransactionsPage);
exports.MoreTransactionsPage = MoreTransactionsPage;
//# sourceMappingURL=more-transactions.js.map