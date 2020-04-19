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
const enums_1 = require("../../enums/enums");
const task_1 = require("../../providers/task/task");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const socket_api_1 = require("../../providers/socket-api/socket-api");
const broadcast_1 = require("../../providers/broadcast/broadcast");
const translate_1 = require("../../providers/translate/translate");
const badge_1 = require("@ionic-native/badge");
const device_1 = require("../../providers/device/device");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const configuration_1 = require("../../providers/configuration/configuration");
let MyTasksPage = class MyTasksPage {
    constructor(navCtrl, navParams, navigation, workspace, taskProvider, userInteraction, socketApi, broadcast, platform, actionsheetCtrl, translateProvider, badge, device, settings, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.taskProvider = taskProvider;
        this.userInteraction = userInteraction;
        this.socketApi = socketApi;
        this.broadcast = broadcast;
        this.platform = platform;
        this.actionsheetCtrl = actionsheetCtrl;
        this.translateProvider = translateProvider;
        this.badge = badge;
        this.device = device;
        this.settings = settings;
        this.configuration = configuration;
        this.myTasks = [];
        this.isLoadingTasks = false;
        this.isAndroid = false;
        this.handlesFiscalStorage = false;
        this.param = navParams.data;
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            this.workspace.myTaskNavCtrl = this.navCtrl;
            this.requestMyTasks();
            this.broadcastTasksSubscription = this.socketApi.listenToBroadcast((data) => {
                this.processBroadcastTask(data);
            });
            this.broadcastLostSubscription = this.socketApi.listenToBroadcastTasksLost((data) => {
                this.processBroadcastLost(data);
            });
            this.broadcast.requestBroadcastTasksLost();
            try {
                let requestParameter = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.ValidationFiscal, enums_1.Enums.ParameterId.HandlesFiscalStorage, this.settings.userCredentials);
                let parameter = yield this.configuration.getParameter(requestParameter);
                if (parameter &&
                    parameter.length &&
                    Number(parameter[0].VALUE) === enums_1.Enums.YesNo.Yes) {
                    this.handlesFiscalStorage = true;
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.GetDataError);
            }
        });
    }
    requestMyTasks() {
        this.isLoadingTasks = true;
        this.getAssignedTasks().then(() => {
            this.isLoadingTasks = false;
        });
    }
    getColorOfPriorityTask(priority) {
        switch (priority) {
            case enums_1.Enums.TaskPriority.Low:
                return enums_1.Enums.PriorityCircles.Low;
            case enums_1.Enums.TaskPriority.Medium:
                return enums_1.Enums.PriorityCircles.Medium;
            case enums_1.Enums.TaskPriority.High:
                return enums_1.Enums.PriorityCircles.High;
            default:
                return enums_1.Enums.PriorityCircles.Low;
        }
    }
    doRefresh(refresher) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getAssignedTasks();
            if (refresher)
                refresher.complete();
        });
    }
    getAssignedTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.myTasks = yield this.taskProvider.getAssignedTasks();
                if (this.isAndroid) {
                    let taskCount = this.myTasks ? this.myTasks.length : 0;
                    this.badge.set(taskCount);
                    this.badge.clear();
                }
                yield this.userInteraction.hideLoading();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.GetDataError);
            }
        });
    }
    processTask(task) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            if (task.regime == enums_1.Enums.Regime.Fiscal) {
                switch (task.taskSubtype) {
                    case enums_1.Enums.TaskSubType.FiscalReception:
                        this.navigation.pushPage(enums_1.Enums.Page.CreateLicense, this.workspace, this.navCtrl, {
                            taskId: this.getTaskId(task),
                            regime: task.regime
                        });
                        return Promise.resolve(task.taskType);
                    case enums_1.Enums.TaskSubType.FiscalDispatch:
                        this.navigation.pushPage(enums_1.Enums.Page.GeneralPicking, this.workspace, this.navCtrl, {
                            wavePickingId: this.getTaskId(task),
                            projectId: task.projectId,
                            projectCode: task.projectCode,
                            projectName: task.projectName,
                            projectShortName: task.projectShortName,
                            regime: task.regime
                        });
                        return Promise.resolve(task.taskType);
                    case enums_1.Enums.TaskSubType.GeneralTransfer:
                        this.navigation.pushPage(enums_1.Enums.Page.GeneralPicking, this.workspace, this.navCtrl, {
                            wavePickingId: this.getTaskId(task),
                            projectId: task.projectId,
                            projectCode: task.projectCode,
                            projectName: task.projectName,
                            projectShortName: task.projectShortName,
                            regime: task.regime,
                            task: task
                        });
                        return Promise.resolve(task.taskType);
                }
            }
            switch (task.taskType) {
                case enums_1.Enums.TaskType.Reception:
                    this.navigation.pushPage(enums_1.Enums.Page.CreateLicense, this.workspace, this.navCtrl, {
                        taskId: this.getTaskId(task),
                        regime: task.regime
                    });
                    return Promise.resolve(task.taskType);
                case enums_1.Enums.TaskType.Picking:
                    this.navigation.pushPage(enums_1.Enums.Page.GeneralPicking, this.workspace, this.navCtrl, {
                        wavePickingId: this.getTaskId(task),
                        projectId: task.projectId,
                        projectCode: task.projectCode,
                        projectName: task.projectName,
                        projectShortName: task.projectShortName,
                        regime: task.regime,
                        task: task
                    });
                    return Promise.resolve(task.taskType);
                case enums_1.Enums.TaskType.PhysicalCount:
                    this.navigation.pushPage(enums_1.Enums.Page.LocationsPhysicalCount, this.workspace, this.navCtrl, {
                        taskId: this.getTaskId(task)
                    });
                    return Promise.resolve(task.taskType);
                case enums_1.Enums.TaskType.Relocation:
                    this.navigation.pushPage(enums_1.Enums.Page.GeneralReplenishment, this.workspace, this.navCtrl, {
                        wavePickingId: this.getTaskId(task)
                    });
                    return Promise.resolve(task.taskType);
                default:
                    this.userInteraction.hideLoading();
                    return Promise.resolve(task.taskType);
            }
        });
    }
    getTaskId(task) {
        return task.wavePickingId === 0 ? task.id : task.wavePickingId;
    }
    ionViewDidLeave() {
        this.broadcastTasksSubscription.unsubscribe();
        this.broadcastLostSubscription.unsubscribe();
    }
    processBroadcastTask(data) {
        try {
            if (!this.isLoadingTasks)
                this.requestMyTasks();
            this.broadcast.removeBroadcast(data.broadcast);
        }
        catch (error) { }
    }
    processBroadcastLost(data) {
        try {
            if (!this.isLoadingTasks)
                this.requestMyTasks();
            this.broadcast.removeBroadcastTasksLost(data);
        }
        catch (error) { }
    }
    openMenuMoreTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            let actionSheet = this.actionsheetCtrl.create({
                title: yield this.translateProvider.translateGroupValue(enums_1.Enums.Translation.Groups.Tabs, "More-transactions_"),
                cssClass: "action-sheets-basic-page",
                buttons: [
                    {
                        text: yield this.translateProvider.translateGroupValue(enums_1.Enums.Translation.Groups.Title, "Pending-Locate-Wave_"),
                        icon: !this.platform.is("ios") ? "open" : null,
                        handler: () => {
                            this.goToPendingLocateWavePicking();
                        }
                    },
                    {
                        text: yield this.translateProvider.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, "CANCEL_"),
                        role: "cancel",
                        icon: !this.platform.is("ios") ? "close" : null,
                        handler: () => { }
                    }
                ]
            });
            actionSheet.present();
        });
    }
    goToPendingLocateWavePicking() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navigation.pushPage(enums_1.Enums.Page.PendingLocatePickingDispatch, this.workspace, this.navCtrl);
        });
    }
};
MyTasksPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-my-tasks",
        templateUrl: "my-tasks.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        task_1.TaskProvider,
        user_interaction_1.UserInteractionProvider,
        socket_api_1.SocketApiProvider,
        broadcast_1.BroadcastProvider,
        ionic_angular_1.Platform,
        ionic_angular_1.ActionSheetController,
        translate_1.TranslateProvider,
        badge_1.Badge,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        configuration_1.ConfigurationProvider])
], MyTasksPage);
exports.MyTasksPage = MyTasksPage;
//# sourceMappingURL=my-tasks.js.map