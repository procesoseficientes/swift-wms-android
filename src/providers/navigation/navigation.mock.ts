import { Injectable } from "@angular/core";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { WorkspacePage } from "../../pages/workspace/workspace";
import { NavController } from "ionic-angular/navigation/nav-controller";

@Injectable()
export class NavigationProvider {
    tabs: Array<Model.NavigationTab>;
    _currentTab: Model.NavigationTab;

    public static instance(): NavigationProvider {
        return new NavigationProvider();
    }

    set currentTab(value: Model.NavigationTab) {
        this._currentTab = value;
    }

    get currentTab(): Model.NavigationTab {
        return this._currentTab;
    }

    changeActiveTab(tabName: Enums.Page): any /*  */ {
        if (tabName === Enums.Page.MyTasks) {
            this.currentTab = {
                isActive: true,
                currentRoot: null,
                tabName: Enums.Page.MyTasks,
                navigationStack: []
            };
        }
        if (tabName === Enums.Page.InfoCenter) {
            this.currentTab = {
                isActive: true,
                currentRoot: null,
                tabName: Enums.Page.InfoCenter,
                navigationStack: []
            };
        }
        if (tabName === Enums.Page.TaskSent) {
            this.currentTab = {
                isActive: true,
                currentRoot: null,
                tabName: Enums.Page.TaskSent,
                navigationStack: []
            };
        }
        if (tabName === Enums.Page.MoreTransactions) {
            this.currentTab = {
                isActive: true,
                currentRoot: null,
                tabName: Enums.Page.MoreTransactions,
                navigationStack: []
            };
        }
        return tabName;
    }

    pushPage(
        _page: Enums.Page,
        _workspace: WorkspacePage,
        _navCtrl: NavController
    ): any /*  */ {}
    popPage(_workspace: WorkspacePage, _navCtrl: NavController): any /*  */ {}
    setNewRoot(
        _newPage: Enums.Page,
        _workspace: WorkspacePage,
        _navCtrl: NavController
    ): any /*  */ {}
    shouldExitApp(): any /* boolean */ {}
    changeRoot(
        _currentTab: Model.NavigationTab,
        _newPage: Enums.Page,
        _workspace: WorkspacePage,
        _navCtrl: NavController
    ): any /*  */ {}
}
