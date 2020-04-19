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
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const _ = require("lodash");
let TaskSentPage = class TaskSentPage {
    constructor(navCtrl, navParams, workspace, navigator, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.workspace = workspace;
        this.navigator = navigator;
        this.settings = settings;
        this.maxTransactions = 50;
        this.transactions = [];
    }
    ionViewDidLoad() {
        this.navigator.taskSentNavCtrl = this.navCtrl;
    }
    ionViewDidEnter() {
        this.navigator.taskSentNavCtrl = this.navCtrl;
        this.transactions = _.orderBy(this.settings.logOperator, "id", "desc");
        this.transactions = _.filter(this.transactions, (transaction) => {
            return (transaction.loginId == this.settings.userCredentials.loginId);
        });
    }
    showTaskType(taskType) {
        return taskType.toString();
    }
};
TaskSentPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-task-sent",
        templateUrl: "task-sent.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        workspace_1.WorkspacePage,
        navigation_1.NavigationProvider,
        user_settings_1.UserSettingsProvider])
], TaskSentPage);
exports.TaskSentPage = TaskSentPage;
//# sourceMappingURL=task-sent.js.map