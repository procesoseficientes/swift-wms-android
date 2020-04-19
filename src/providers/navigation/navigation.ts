import { Injectable } from "@angular/core";
import { Model } from "../../models/models";
import * as _ from "lodash";
import { Enums } from "../../enums/enums";
import { WorkspacePage } from "../../pages/workspace/workspace";
import { NavController } from "ionic-angular/navigation/nav-controller";

@Injectable()
export class NavigationProvider {
    tabs: Array<Model.NavigationTab>;
    moreTransNavCtrl: NavController;
    taskSentNavCtrl: NavController;

    constructor() {
        this.tabs = Model.Factory.createNavigationTabs();
    }

    public changeActiveTab(tabName: Enums.Page): void {
        this.tabs.forEach((tab: Model.NavigationTab) => {
            tab.isActive = tab.tabName === tabName;
        });
    }

    get currentTab(): Model.NavigationTab {
        return _.find(this.tabs, (tab: Model.NavigationTab) => {
            return tab.isActive;
        });
    }

    public async pushPage(
        page: Enums.Page,
        workspace: WorkspacePage,
        navCtrl: NavController,
        params: any = null
    ): Promise<void> {
        let currentTab: Model.NavigationTab = this.currentTab;
        if (
            _.find(currentTab.navigationStack, currentPage => {
                return currentPage === page;
            })
        )
            return;
        currentTab.navigationStack.push(page);
        return this.changeRoot(currentTab, page, workspace, navCtrl, params);
    }

    public popPage(
        workspace: WorkspacePage,
        navCtrl: NavController,
        params: any = null,
        times: number = 1
    ): Promise<void> {
        let currentTab: Model.NavigationTab = this.currentTab;
        for (let t = 0; t < times; ++t) {
            currentTab.navigationStack.pop();
        }
        let lastPage: Enums.Page = _.last(currentTab.navigationStack);
        let newPage: Enums.Page =
            currentTab.navigationStack.length < 1
                ? currentTab.tabName
                : lastPage;
        return this.changeRoot(currentTab, newPage, workspace, navCtrl, params);
    }

    public setNewRoot(
        newPage: Enums.Page,
        workspace: WorkspacePage,
        navCtrl: NavController,
        params: any = null
    ): Promise<void> {
        let currentTab: Model.NavigationTab = this.currentTab;
        currentTab.navigationStack = [];
        currentTab.currentRoot = newPage;
        return this.changeRoot(currentTab, newPage, workspace, navCtrl, params);
    }

    public shouldExitApp(): boolean {
        let currentTab: Model.NavigationTab = this.currentTab;
        return (
            currentTab.tabName === currentTab.currentRoot &&
            currentTab.navigationStack.length === 0
        );
    }

    private changeRoot(
        currentTab: Model.NavigationTab,
        newPage: Enums.Page,
        workspace: WorkspacePage,
        navCtrl: NavController,
        params: any
    ): Promise<void> {
        switch (currentTab.tabName) {
            case Enums.Page.MyTasks:
                workspace.myTaskRoot = newPage;
                break;
            case Enums.Page.InfoCenter:
                workspace.infoCenterRoot = newPage;
                break;
            case Enums.Page.MoreTransactions:
                workspace.moreTransactionsRoot = newPage;
                break;
            case Enums.Page.TaskSent:
                workspace.taskSentRoot = newPage;
                break;
        }
        return navCtrl.setRoot(newPage, params);
    }
}
