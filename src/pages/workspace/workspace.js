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
const enums_1 = require("../../enums/enums");
let WorkspacePage = class WorkspacePage {
    constructor(navCtrl, navigation, menuCtrl) {
        this.navCtrl = navCtrl;
        this.navigation = navigation;
        this.menuCtrl = menuCtrl;
        this.myTaskRoot = enums_1.Enums.Page.MyTasks;
        this.taskSentRoot = enums_1.Enums.Page.TaskSent;
        this.infoCenterRoot = enums_1.Enums.Page.InfoCenter;
        this.moreTransactionsRoot = enums_1.Enums.Page.MoreTransactions;
    }
    changeTab(tabName) {
        this.navigation.changeActiveTab(tabName);
    }
    changeCurrentTab(TabNumber, TabName) {
        return __awaiter(this, void 0, void 0, function* () {
            this.navigation.changeActiveTab(TabName);
            yield this.tabRef.select(TabNumber);
            return Promise.resolve();
        });
    }
};
__decorate([
    core_1.ViewChild("myTabs"),
    __metadata("design:type", ionic_angular_1.Tabs)
], WorkspacePage.prototype, "tabRef", void 0);
WorkspacePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-workspace",
        templateUrl: "workspace.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        navigation_1.NavigationProvider,
        ionic_angular_1.MenuController])
], WorkspacePage);
exports.WorkspacePage = WorkspacePage;
//# sourceMappingURL=workspace.js.map