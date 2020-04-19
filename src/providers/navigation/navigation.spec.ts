import { async, TestBed } from "@angular/core/testing";
import { NavigationProvider } from "./navigation";
import { Enums } from "../../enums/enums";
import { WorkspacePage } from "../../pages/workspace/workspace";
import { NavControllerMock } from "ionic-mocks";
import * as _ from "lodash";
import { Model } from "../../models/models";

describe("NavigationProvider", () => {
    let provider: NavigationProvider;
    let workspace: WorkspacePage;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [NavigationProvider]
            });
        })
    );

    const pushPages = () => {
        provider.pushPage(
            Enums.Page.CreateLicense,
            workspace,
            workspace.navCtrl
        );
        provider.pushPage(
            Enums.Page.GeneralReception,
            workspace,
            workspace.navCtrl
        );
        return;
    };

    const getCurrentTab = () => {
        return _.find(provider.tabs, (tab: Model.NavigationTab) => {
            return tab.isActive;
        });
    };

    describe("Invalid tests", () => {
        beforeEach(() => {
            provider = TestBed.get(NavigationProvider);
            workspace = new WorkspacePage(
                NavControllerMock.instance(),
                provider
            );
        });

        it("Should NOT be able to exit app", () => {
            pushPages();
            let result = provider.shouldExitApp();

            return expect(result).toBeFalsy(
                "The result should that the user CANT exit the application"
            );
        });

    });

    describe("Valid tests", () => {
        beforeEach(() => {
            provider = TestBed.get(NavigationProvider);
            workspace = new WorkspacePage(
                NavControllerMock.instance(),
                provider
            );
        });

        it("Should be created", () => {
            return expect(provider instanceof NavigationProvider).toBe(true);
        });

        it("Should change active tab", () => {
            provider.changeActiveTab(Enums.Page.MyTasks);
            let myTasksTab = _.find(
                provider.tabs,
                (tab: Model.NavigationTab) => {
                    return tab.tabName === Enums.Page.MyTasks;
                }
            );
            return expect(myTasksTab.isActive).toBeTruthy(
                "MyTasksPage should be the ACTIVE tab"
            );
        });

        it("Should push page into the navigation stack", () => {
            provider.pushPage(
                Enums.Page.GeneralReception,
                workspace,
                workspace.navCtrl
            );

            let lastPage = _.head(getCurrentTab().navigationStack);

            return expect(lastPage).toBe(
                Enums.Page.GeneralReception,
                "The first page on the navigation stack should be GeneralReception"
            );
        });

        it("Should pop a page from navigation stack", () => {
            pushPages();
            provider.popPage(workspace, workspace.navCtrl);

            let lastPage = _.head(getCurrentTab().navigationStack);

            return expect(lastPage).toBe(
                Enums.Page.CreateLicense,
                "The active page on the navigation stack after poping once should be CreateLicense"
            );
        });

        it("Should set new root", () => {
            pushPages();
            provider.setNewRoot(
                Enums.Page.CreateLicense,
                workspace,
                workspace.navCtrl
            );

            return expect(getCurrentTab().currentRoot).toBe(
                Enums.Page.CreateLicense,
                "The stack current root should be CreateLicense"
            );
        });

        it("Should be able to exit app", () => {
            let result = provider.shouldExitApp();

            return expect(result).toBeTruthy("The result should be able to exit app");
        });

        it("Should only end up with 1 page in the navigation stack", () => {
            provider.pushPage(
                Enums.Page.GeneralReception,
                workspace,
                workspace.navCtrl
            );

            provider.pushPage(
                Enums.Page.GeneralReception,
                workspace,
                workspace.navCtrl
            );

            return expect(getCurrentTab().navigationStack.length).toBe(
                1,
                "Should only push GeneralReception page once"
            );
        });

        it("Should place as root the tabname page as it doesnt have any other page on its navigation stack", () => {
            provider.popPage(
                workspace,
                workspace.navCtrl
            );

            return expect(getCurrentTab().currentRoot).toBe(
                getCurrentTab().tabName,
                "Current tab root should be the same as the current tab name"
            );
        });

        it("Should push page into the InfoCenter navigation stack", () => {
            provider.changeActiveTab(Enums.Page.InfoCenter);
            provider.pushPage(
                Enums.Page.GeneralReception,
                workspace,
                workspace.navCtrl
            );

            let lastPage = _.head(getCurrentTab().navigationStack);

            return expect(lastPage).toBe(
                Enums.Page.GeneralReception,
                "The first page on the InfoCenter navigation stack should be GeneralReception"
            );
        });
        
        it("Should push page into the TaskSent navigation stack", () => {
            provider.changeActiveTab(Enums.Page.TaskSent);
            provider.pushPage(
                Enums.Page.GeneralReception,
                workspace,
                workspace.navCtrl
            );

            let lastPage = _.head(getCurrentTab().navigationStack);

            return expect(lastPage).toBe(
                Enums.Page.GeneralReception,
                "The first page on the TaskSent navigation stack should be GeneralReception"
            );
        });

        it("Should push page into the MoreTransactions navigation stack", () => {
            provider.changeActiveTab(Enums.Page.MoreTransactions);
            provider.pushPage(
                Enums.Page.GeneralReception,
                workspace,
                workspace.navCtrl
            );

            let lastPage = _.head(getCurrentTab().navigationStack);

            return expect(lastPage).toBe(
                Enums.Page.GeneralReception,
                "The first page on the MoreTransactions navigation stack should be GeneralReception"
            );
        });
    });
});
