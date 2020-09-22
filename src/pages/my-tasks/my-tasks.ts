import { Component } from "@angular/core";
import {
    IonicPage,
    NavParams,
    NavController,
    Platform,
    ActionSheetController
} from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest } from "../../models/models";
import { Enums } from "../../enums/enums";
import { TaskProvider } from "../../providers/task/task";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { SocketApiProvider } from "../../providers/socket-api/socket-api";
import { Subscription } from "rxjs/Subscription";
import { BroadcastProvider } from "../../providers/broadcast/broadcast";
import { TranslateProvider } from "../../providers/translate/translate";
import { Badge } from "@ionic-native/badge";
import { DeviceProvider } from "../../providers/device/device";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-my-tasks",
    templateUrl: "my-tasks.html"
})
export class MyTasksPage {
    param: any;
    myTasks: Array<Model.Task> = [];
    broadcastTasksSubscription: Subscription;
    broadcastLostSubscription: Subscription;
    isLoadingTasks: boolean = false;
    isAndroid: boolean = false;
    handlesFiscalStorage: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private taskProvider: TaskProvider,
        private userInteraction: UserInteractionProvider,
        private socketApi: SocketApiProvider,
        private broadcast: BroadcastProvider,
        public platform: Platform,
        public actionsheetCtrl: ActionSheetController,
        private translateProvider: TranslateProvider,
        private badge: Badge,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private configuration: ConfigurationProvider
    ) {
        this.param = navParams.data;
    }

    async ionViewDidEnter(): Promise<void> {
        this.isAndroid = this.device.isAndroid();
        this.workspace.myTaskNavCtrl = this.navCtrl;
        this.requestMyTasks();
        this.broadcastTasksSubscription = this.socketApi.listenToBroadcast(
            (data: Model.BroadcastFromServer) => {
                this.processBroadcastTask(data);
            }
        );
        this.broadcastLostSubscription = this.socketApi.listenToBroadcastTasksLost(
            (data: Array<Model.Broadcast>) => {
                this.processBroadcastLost(data);
            }
        );
        this.broadcast.requestBroadcastTasksLost();

        try {
            let requestParameter = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.ValidationFiscal,
                Enums.ParameterId.HandlesFiscalStorage,
                this.settings.userCredentials
            );
            let parameter = await this.configuration.getParameter(
                requestParameter
            );
            if (
                parameter &&
                parameter.length &&
                Number(parameter[0].VALUE) === Enums.YesNo.Yes
            ) {
                this.handlesFiscalStorage = true;
            }
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.GetDataError
            );
        }
    }

    requestMyTasks() {
        this.isLoadingTasks = true;
        this.getAssignedTasks().then(() => {
            this.isLoadingTasks = false;
        });
    }

    getColorOfPriorityTask(priority: number): Enums.PriorityCircles {
        switch (priority) {
            case Enums.TaskPriority.Low:
                return Enums.PriorityCircles.Low;
            case Enums.TaskPriority.Medium:
                return Enums.PriorityCircles.Medium;
            case Enums.TaskPriority.High:
                return Enums.PriorityCircles.High;
            default:
                return Enums.PriorityCircles.Low;
        }
    }

    async doRefresh(refresher: any): Promise<void> {
        await this.getAssignedTasks();
        if (refresher) refresher.complete();
    }

    private async getAssignedTasks(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            this.myTasks = await this.taskProvider.getAssignedTasks();
            if (this.isAndroid) {
                let taskCount = this.myTasks ? this.myTasks.length : 0;
                this.badge.set(taskCount);
                this.badge.clear();
            }

            await this.userInteraction.hideLoading();
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.GetDataError
            );
        }
    }

    async processTask(task: Model.Task): Promise<Enums.TaskType> {
        await this.userInteraction.showLoading();

        if (task.regime == Enums.Regime.Fiscal) {
            switch (task.taskSubtype) {
                case Enums.TaskSubType.FiscalReception:
                    this.navigation.pushPage(
                        Enums.Page.CreateLicense,
                        this.workspace,
                        this.navCtrl,
                        <Model.CreateLicenseParam>{
                            taskId: this.getTaskId(task),
                            regime: task.regime
                        }
                    );
                    return Promise.resolve(task.taskType);
                case Enums.TaskSubType.FiscalDispatch:
                    this.navigation.pushPage(
                        Enums.Page.GeneralPicking,
                        this.workspace,
                        this.navCtrl,
                        {
                            wavePickingId: this.getTaskId(task),
                            projectId: task.projectId,
                            projectCode: task.projectCode,
                            projectName: task.projectName,
                            projectShortName: task.projectShortName,
                            regime: task.regime
                        }
                    );
                    return Promise.resolve(task.taskType);
                case Enums.TaskSubType.GeneralTransfer:
                    this.navigation.pushPage(
                        Enums.Page.GeneralPicking,
                        this.workspace,
                        this.navCtrl,
                        {
                            wavePickingId: this.getTaskId(task),
                            projectId: task.projectId,
                            projectCode: task.projectCode,
                            projectName: task.projectName,
                            projectShortName: task.projectShortName,
                            regime: task.regime,
                            task: task
                        }
                    );
                    return Promise.resolve(task.taskType);
            }
        }

        switch (task.taskType) {
            case Enums.TaskType.Reception:
                this.navigation.pushPage(
                    Enums.Page.CreateLicense,
                    this.workspace,
                    this.navCtrl,
                    <Model.CreateLicenseParam>{
                        taskId: this.getTaskId(task),
                        regime: task.regime
                    }
                );
                return Promise.resolve(task.taskType);

            case Enums.TaskType.Picking:
                this.navigation.pushPage(
                    Enums.Page.GeneralPicking,
                    this.workspace,
                    this.navCtrl,
                    {
                        wavePickingId: this.getTaskId(task),
                        projectId: task.projectId,
                        projectCode: task.projectCode,
                        projectName: task.projectName,
                        projectShortName: task.projectShortName,
                        regime: task.regime,
                        task: task
                    }
                );
                return Promise.resolve(task.taskType);
            case Enums.TaskType.PhysicalCount:
                this.navigation.pushPage(
                    Enums.Page.LocationsPhysicalCount,
                    this.workspace,
                    this.navCtrl,
                    {
                        taskId: this.getTaskId(task)
                    }
                );
                return Promise.resolve(task.taskType);
            case Enums.TaskType.Relocation:
                this.navigation.pushPage(
                    Enums.Page.GeneralReplenishment,
                    this.workspace,
                    this.navCtrl,
                    {
                        wavePickingId: this.getTaskId(task)
                    }
                );
                return Promise.resolve(task.taskType);
            default:
                this.userInteraction.hideLoading();
                return Promise.resolve(task.taskType);
        }
    }

    getTaskId(task: Model.Task): number {
        return task.wavePickingId === 0 ? task.id : task.wavePickingId;
    }

    ionViewDidLeave() {
        this.broadcastTasksSubscription.unsubscribe();
        this.broadcastLostSubscription.unsubscribe();
    }

    processBroadcastTask(data: Model.BroadcastFromServer) {
        try {
            if (!this.isLoadingTasks) this.requestMyTasks();
            this.broadcast.removeBroadcast(data.broadcast);
        } catch (error) { console.log(error)}
    }

    processBroadcastLost(data: Array<Model.Broadcast>) {
        try {
            if (!this.isLoadingTasks) this.requestMyTasks();
            this.broadcast.removeBroadcastTasksLost(data);
        } catch (error) { console.log(error)}
    }

    async openMenuMoreTransactions() {
        let actionSheet = this.actionsheetCtrl.create({
            title: await this.translateProvider.translateGroupValue(
                Enums.Translation.Groups.Tabs,
                "More-transactions_"
            ),
            cssClass: "action-sheets-basic-page",
            buttons: [
                {
                    text: await this.translateProvider.translateGroupValue(
                        Enums.Translation.Groups.Title,
                        "Pending-Locate-Wave_"
                    ),
                    icon: !this.platform.is("ios") ? "open" : null,
                    handler: () => {
                        this.goToPendingLocateWavePicking();
                    }
                },
                {
                    text: await this.translateProvider.translateGroupValue(
                        Enums.Translation.Groups.Buttons,
                        "CANCEL_"
                    ),
                    role: "cancel", // will always sort to be on the bottom
                    icon: !this.platform.is("ios") ? "close" : null,
                    handler: () => {}
                }
            ]
        });
        actionSheet.present();
    }

    async goToPendingLocateWavePicking() {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.PendingLocatePickingDispatch,
            this.workspace,
            this.navCtrl
        );
    }
}
