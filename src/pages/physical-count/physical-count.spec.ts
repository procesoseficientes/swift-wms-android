import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { PhysicalCountPage } from "./physical-count";
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

describe("", () => {
    let fixture: any;
    let component: PhysicalCountPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            navParams.data = {
                taskId: "24",
                locationSpot: "B01-01"
            };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [PhysicalCountPage, TranslatePipeMock],
                imports: [IonicModule.forRoot(PhysicalCountPage), PipesModule],
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
        fixture = TestBed.createComponent(PhysicalCountPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof PhysicalCountPage).toBe(true);
    });

    it("Should check for count materials", () => {
        let execute = async () => {
            let result = await component.checkForCountMaterials();

            return expect(result).toBeTruthy(
                "Check for count materials should be truthy"
            );
        };
        return execute();
    });

    it("Should be able to finish location", () => {
        let execute = async () => {
            let result = await component.finishLocation();

            return expect(result).toBeTruthy("Finish location must be truthy");
        };
        return execute();
    });

    it("Should get material when scanned", () => {
        let execute = async () => {
            let result = await component.processMaterialScan("viscosa/VCA1030");
            expect(result).toBeTruthy("Process material scan should be truthy");

            return expect(component.material.MATERIAL_ID).toBe(
                "viscosa/VCA1030",
                "Fetched MATERIAL_ID must be viscosa/VCA1030"
            );
        };
        return execute();
    });

    it("Should insert count detail", () => {
        let execute = async () => {
            let result = await component.processMaterial(
                "viscosa/VCA1030",
                null
            );

            return expect(result).toBeTruthy(
                "Process material should be truthy"
            );
        };
        return execute();
    });
});
