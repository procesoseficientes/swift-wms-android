import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { WorkspacePage } from "./workspace";
import { NavController } from "ionic-angular";
import { NavControllerMock } from "ionic-mocks";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { Enums } from "../../enums/enums";

describe("WorkspacePage Component", () => {
    let fixture: any;
    let component: WorkspacePage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navigation = NavigationProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [WorkspacePage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(WorkspacePage)
                ],
                providers: [
                    {
                        provide: NavController,
                        useValue: navController
                    },
                    {
                        provide: NavigationProvider,
                        useValue: navigation
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(WorkspacePage);
        component = fixture.componentInstance;
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof WorkspacePage).toBe(true);
    });

    const specChangeTab = (page:Enums.Page) => {
        component.changeTab(page);
        return expect(component.navigation.currentTab.tabName).toBe(
            page,
            `"User should be in ${page}`
        );
    };

    describe("Valid Test", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should be MyTasksPage", () => {
            return specChangeTab(Enums.Page.MyTasks);
        });

        it("Should be TaskSentPage", () => {
            return specChangeTab(Enums.Page.TaskSent);
        });

        it("Should be InfoCenterPage", () => {
            return specChangeTab(Enums.Page.InfoCenter);
        });

        it("Should be MoreTransactionsPage", () => {
            return specChangeTab(Enums.Page.MoreTransactions);
        });
    });
});
