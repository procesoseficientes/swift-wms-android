import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { LicenseInfoPage } from "./license-info";
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
import { LicenseProvider } from "../../providers/license/license";
import { LicenseProvider as LicenseProviderMock } from "../../providers/license/license.mock";
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";
import { Model } from "../../models/models";
import { PipesModule } from "../../pipes/pipes.module";

describe("LicenseInfoPage Component", () => {
    let fixture: any;
    let component: LicenseInfoPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            navParams.data = <Model.LicenseInfoParams>{ licenseId: 22732 };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [LicenseInfoPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(LicenseInfoPage),
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
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: LicenseProvider,
                        useClass: LicenseProviderMock
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    },
                    {
                        provide: PrinterProvider,
                        useValue: PrinterProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(LicenseInfoPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    afterEach(() => {
        component.printLicense();
        component.showRelocationOptions();
        component.backButtonAction();
    });

    it("Should be created", () => {
        return expect(component instanceof LicenseInfoPage).toBe(true);
    });

    describe("Valid tests", () => {
        it("After loading it should have some data on the inventory property", () => {
            let execute = async () => {
                await component.getLicenseInventory();
                expect(component.inventory.length).toBe(
                    1,
                    "Fetched inventory should have 1 record"
                );
                expect(component.licenseId).toBe(
                    22732,
                    "Fetched licenseid should be 22732"
                );
                expect(component.currentLocation).toBe(
                    "B05-TA-C02-NU",
                    "Fetched currentLocation should be B05-TA-C02-NU"
                );
                expect(component.policyCode).toBe(
                    "K5KPPH3P5",
                    "Fetched policyCode should be K5KPPH3P5"
                );
                return expect(component.clientOwner).toBe(
                    "C00030",
                    "License's clientOwner should be C0030"
                );
            };
            return execute();
        });

        it("Should be able to toggle material's details on", () => {
            let execute = async () => {
                await component.getLicenseInventory();

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
                await component.getLicenseInventory();

                component.inventory[0].showDetails = true;
                let response = component.toggleDetails(component.inventory[0]);

                return expect(response).toBeFalsy(
                    "Details should be toggled off"
                );
            };
            return execute();
        });
    });
});
