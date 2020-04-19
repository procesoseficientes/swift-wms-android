import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { LocationInfoPage } from "./location-info";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { LocationProvider } from "../../providers/location/location";
import { LocationProvider as LocationProviderMock } from "../../providers/location/location.mock";
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { PipesModule } from "../../pipes/pipes.module";
import { LicenseProvider } from "../../providers/license/license";
import { LicenseProvider as LicenseProviderMock } from "../../providers/license/license.mock";

describe("LocationInfoPage Component", () => {
    let fixture: any;
    let component: LocationInfoPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            navParams.data = {
                locationId: "B01-R01-C01-NB"
            };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [LocationInfoPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(LocationInfoPage),
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
                        provide: LocationProvider,
                        useClass: LocationProviderMock
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: LicenseProvider,
                        useClass: LicenseProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(LocationInfoPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof LocationInfoPage).toBe(true);
    });

    describe("Valid Tests", () => {
        it("Should be able to go back from LocationInfoPage to InfoCenterPage", () => {
            let execute = async () => {
                let execution = await component.backButtonAction();
                return expect(execution).toBeUndefined(
                    "Must be able to go back from LocationInfoPage to InfoCenterPage"
                );
            };
            return execute();
        });

        it("Should be able to load LocationInfoPage when this is the current view", () => {
            let execute = async () => {
                let execution = await component.loadLocationInfo();

                return expect(execution).toBeUndefined(
                    "Must be able to load LocationInfoPage when this is the current view"
                );
            };

            return execute();
        });

        it("Should be able to load inventory when this is the current view", () => {
            let execute = async () => {
                let execution = await component.populateInventoryDetail();

                return expect(execution).toBeUndefined(
                    "Must be able to load inventory when this is the current view"
                );
            };

            return execute();
        });

        it("Should be able to toggle material's details on", () => {
            let execute = async () => {
                await component.populateInventoryDetail();

                component.inventory[0].showDetails = false;

                let response = component.toggleDetails(component.inventory[0]);
                return expect(response).toBeTruthy(
                    "Details should be toggled on"
                );
            };
            return execute();
        });

        it("Should be able to toggle material's details off", () => {
            let execute = async () => {
                await component.populateInventoryDetail();

                component.inventory[0].showDetails = true;
                let response = component.toggleDetails(component.inventory[0]);

                return expect(response).toBeFalsy(
                    "Details should be toggled off"
                );
            };
            return execute();
        });
    });

    describe("Invalid Tests", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should not load LocationInfo when the navParams is corrupt", () => {
            let execute = async () => {
                component.navParams.data = null;
                let execution = await component.loadLocationInfo();

                return expect(execution).toBeUndefined(
                    "Must not load LocationInfo when the navParams is corrupt"
                );
            };

            return execute();
        });

        it("Should not load inventory when the navParams is corrupt", () => {
            let execute = async () => {
                component.locationId = null;
                let execution = await component.populateInventoryDetail();

                return expect(execution).toBeDefined(
                    "Must not load inventory when the navParams is corrupt"
                );
            };

            return execute();
        });
    });
});
