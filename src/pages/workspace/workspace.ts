import { Component, ViewChild } from "@angular/core";
import { IonicPage, Tabs, NavController, MenuController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { Enums } from "../../enums/enums";
@IonicPage()
@Component({
    selector: "page-workspace",
    templateUrl: "workspace.html"
})
export class WorkspacePage {
    @ViewChild("myTabs") tabRef: Tabs;

    myTaskRoot = Enums.Page.MyTasks;
    taskSentRoot = Enums.Page.TaskSent;
    infoCenterRoot = Enums.Page.InfoCenter;
    moreTransactionsRoot = Enums.Page.MoreTransactions;

    myTaskNavCtrl: NavController;
    infoCenterNavCtrl: NavController;

    constructor(
        public navCtrl: NavController,
        public navigation: NavigationProvider,
        public menuCtrl: MenuController
    ) {}

    changeTab(tabName: Enums.Page): void {
        this.navigation.changeActiveTab(tabName);
    }

    async changeCurrentTab(
        TabNumber: Enums.Tab,
        TabName: Enums.Page
    ): Promise<void> {
        this.navigation.changeActiveTab(TabName);
        await this.tabRef.select(TabNumber);
        return Promise.resolve();
    }
    
    tabsEnabled = true;

    enableTabs(enable: boolean): void {
        this.tabsEnabled = enable;
    }
}
