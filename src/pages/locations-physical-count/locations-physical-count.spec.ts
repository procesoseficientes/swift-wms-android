import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { LocationsPhysicalCountPage } from "./locations-physical-count";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { PipesModule } from "../../pipes/pipes.module";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { PhysicalCountProvider } from "../../providers/physical-count/physical-count";
import { PhysicalCountProvider as PhysicalCountProviderMock } from "../../providers/physical-count/physical-count.mock";
import { Enums } from "../../enums/enums";

describe("LocationsPhysicalCountPage Component", () => {
    let fixture: any;
    let component: LocationsPhysicalCountPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            navParams.data = {
                taskId: "24"
            };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [LocationsPhysicalCountPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(LocationsPhysicalCountPage),
                    PipesModule
                ],
                providers: [
                    {
                        provide: NavController,
                        useValue: navController
                    },
                    {
                        provide: NavParams,
                        useValue: navParams
                    },
                    {
                        provide: NavigationProvider,
                        useClass: NavigationProviderMock
                    },
                    WorkspacePage,
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: DeviceProvider,
                        useValue: deviceMock
                    },
                    {
                        provide: PhysicalCountProvider,
                        useClass: PhysicalCountProviderMock
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(LocationsPhysicalCountPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof LocationsPhysicalCountPage).toBe(
            true
        );
    });

    it("Should get some locations", () => {
        let execute = async () => {
            let result = await component.getLocations();

            return expect(result.length).toBeGreaterThan(
                0,
                "Should yield at least 1 location"
            );
        };
        return execute();
    });

    it("Should validateScannedLocation", () => {
        let execute = async () => {
            let result = await component.validateScannedLocation("B01-P01");

            return expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "Validation should be succesful"
            );
        };
        return execute();
    });
});
