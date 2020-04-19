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
const models_1 = require("../../models/models");
const _ = require("lodash");
const enums_1 = require("../../enums/enums");
let NavigationProvider = class NavigationProvider {
    constructor() {
        this.tabs = models_1.Model.Factory.createNavigationTabs();
    }
    changeActiveTab(tabName) {
        this.tabs.forEach((tab) => {
            tab.isActive = tab.tabName === tabName;
        });
    }
    get currentTab() {
        return _.find(this.tabs, (tab) => {
            return tab.isActive;
        });
    }
    pushPage(page, workspace, navCtrl, params = null) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentTab = this.currentTab;
            if (_.find(currentTab.navigationStack, currentPage => {
                return currentPage === page;
            }))
                return;
            currentTab.navigationStack.push(page);
            return this.changeRoot(currentTab, page, workspace, navCtrl, params);
        });
    }
    popPage(workspace, navCtrl, params = null, times = 1) {
        let currentTab = this.currentTab;
        for (let t = 0; t < times; ++t) {
            currentTab.navigationStack.pop();
        }
        let lastPage = _.last(currentTab.navigationStack);
        let newPage = currentTab.navigationStack.length < 1
            ? currentTab.tabName
            : lastPage;
        return this.changeRoot(currentTab, newPage, workspace, navCtrl, params);
    }
    setNewRoot(newPage, workspace, navCtrl, params = null) {
        let currentTab = this.currentTab;
        currentTab.navigationStack = [];
        currentTab.currentRoot = newPage;
        return this.changeRoot(currentTab, newPage, workspace, navCtrl, params);
    }
    shouldExitApp() {
        let currentTab = this.currentTab;
        return (currentTab.tabName === currentTab.currentRoot &&
            currentTab.navigationStack.length === 0);
    }
    changeRoot(currentTab, newPage, workspace, navCtrl, params) {
        switch (currentTab.tabName) {
            case enums_1.Enums.Page.MyTasks:
                workspace.myTaskRoot = newPage;
                break;
            case enums_1.Enums.Page.InfoCenter:
                workspace.infoCenterRoot = newPage;
                break;
            case enums_1.Enums.Page.MoreTransactions:
                workspace.moreTransactionsRoot = newPage;
                break;
            case enums_1.Enums.Page.TaskSent:
                workspace.taskSentRoot = newPage;
                break;
        }
        return navCtrl.setRoot(newPage, params);
    }
};
NavigationProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], NavigationProvider);
exports.NavigationProvider = NavigationProvider;
//# sourceMappingURL=navigation.js.map