import { async, TestBed } from "@angular/core/testing";
import { IonicModule, NavParams } from "ionic-angular";
import { MyTasksPage } from "./my-tasks";
import { NavController } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { Enums } from "../../enums/enums";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { PipesModule } from "../../pipes/pipes.module";
import { WorkspacePage } from "../workspace/workspace";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { TaskProvider } from "../../providers/task/task";
import { TaskProvider as TaskProviderMock } from "../../providers/task/task.mock";
import { SocketApiProvider } from "../../providers/socket-api/socket-api";
import { BroadcastProvider } from "../../providers/broadcast/broadcast";
import { BroadcastProvider as BroadcastProviderMock } from "../../providers/broadcast/broadcast.mock";
import { ApiClientV3Provider } from "../../providers/api-client/api-client.v3";
import { ApiClientV3Provider as ApiClientV3ProviderMock } from "../../providers/api-client/api-client.v3.mock";

describe("MyTasksPage Component", () => {
    let fixture: any;
    let component: MyTasksPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("abc");
            let settings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [MyTasksPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(MyTasksPage),
                    PipesModule
                ],
                providers: [
                    {
                        provide: NavController,
                        useValue: navController
                    },
                    {
                        provide: NavigationProvider,
                        useClass: NavigationProviderMock
                    },
                    {
                        provide: NavParams,
                        useValue: navParams
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: WorkspacePage,
                        useClass: WorkspacePage
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: settings
                    },
                    {
                        provide: TaskProvider,
                        useClass: TaskProviderMock
                    },
                    {
                        provide: SocketApiProvider,
                        useClass: SocketApiProvider
                    },
                    {
                        provide: BroadcastProvider,
                        useClass: BroadcastProviderMock
                    },
                    {
                        provide: ApiClientV3Provider,
                        useClass: ApiClientV3ProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(MyTasksPage);
        component = fixture.componentInstance;
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof MyTasksPage).toBe(true);
    });

    describe("Invalid Test", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should update the tasks", () => {
            let execute = async () => {
                let refresh = await component.doRefresh(null);
                return expect(refresh).toBeUndefined(
                    "Refresh value should be undefined"
                );
            };

            return execute();
        });
    });

    describe("Valid Test", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should result should yield green-circle", () => {
            let imgPath = component.getColorOfPriorityTask(
                Enums.TaskPriority.Low
            );

            return expect(imgPath).toBe(
                Enums.PriorityCircles.Low,
                "The result should yield green-circle"
            );
        });

        it("Should result should yield yellow-circle", () => {
            let imgPath = component.getColorOfPriorityTask(
                Enums.TaskPriority.Medium
            );

            return expect(imgPath).toBe(
                Enums.PriorityCircles.Medium,
                "The result should yield yellow-circle"
            );
        });

        it("Should result should yield red-circle", () => {
            let imgPath = component.getColorOfPriorityTask(
                Enums.TaskPriority.High
            );

            return expect(imgPath).toBe(
                Enums.PriorityCircles.High,
                "The result should yield red-circle"
            );
        });

        it("Should result should yield default value as green-circle", () => {
            let imgPath = component.getColorOfPriorityTask(
                Enums.TaskPriority.None
            );

            return expect(imgPath).toBe(
                Enums.PriorityCircles.Low,
                "The result should yield green-circle on the default route"
            );
        });
    });
});
