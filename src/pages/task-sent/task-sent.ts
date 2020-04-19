import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import * as _ from "lodash";
@IonicPage()
@Component({
    selector: "page-task-sent",
    templateUrl: "task-sent.html"
})
export class TaskSentPage {
    maxTransactions: number = 50;
    transactions: Array<Model.TransactionOperator> = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public workspace: WorkspacePage,
        public navigator: NavigationProvider,
        private settings: UserSettingsProvider
    ) {}

    ionViewDidLoad() {
        this.navigator.taskSentNavCtrl = this.navCtrl;
    }

    ionViewDidEnter() {
        this.navigator.taskSentNavCtrl = this.navCtrl;
        this.transactions = _.orderBy(this.settings.logOperator, "id", "desc");
        this.transactions = _.filter(
            this.transactions,
            (transaction: Model.TransactionOperator) => {
                return (
                    transaction.loginId == this.settings.userCredentials.loginId
                );
            }
        );
    }

    showTaskType(taskType: Enums.TaskTypeLog) {
        return taskType.toString();
    }
}
