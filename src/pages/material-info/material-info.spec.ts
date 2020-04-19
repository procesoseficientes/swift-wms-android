import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { MaterialInfoPage } from "./material-info";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { LicenseProvider } from "../../providers/license/license";
import { LicenseProvider as LicenseProviderMock } from "../../providers/license/license.mock";
import { MaterialProvider } from "../../providers/material/material";
import { MaterialProvider as MaterialProviderMock } from "../../providers/material/material.mock";
import { Model } from "../../models/models";
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";
import { PipesModule } from "../../pipes/pipes.module";
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";

describe("MaterialInfoPage Component", () => {
    let fixture: any;
    let component: MaterialInfoPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            navParams.data = <Model.MaterialInfoParams>{
                materialId: "viscosa/VCA1030"
            };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [MaterialInfoPage, TranslatePipeMock],
                imports: [IonicModule.forRoot(MaterialInfoPage), PipesModule],
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
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: MaterialProvider,
                        useClass: MaterialProviderMock
                    },
                    {
                        provide: LicenseProvider,
                        useClass: LicenseProviderMock
                    },
                    {
                        provide: PrinterProvider,
                        useClass: PrinterProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(MaterialInfoPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof MaterialInfoPage).toBe(true);
    });

    describe("Valid tests", () => {
        it("Should get materialInfo", () => {
            let execute = async () => {
                await component.getMaterial("viscosa/VCA1030");

                return expect(component.materialInfo.materialId).toBe(
                    "viscosa/VCA1030",
                    "Component's materialId should be the same as the one sent on the request"
                );
            };
            return execute();
        });

        it("Should get inventory info", () => {
            let execute = async () => {
                await component.getInventoryInfo("viscosa/VCA1030");

                expect(component.inventory.length).toBeGreaterThan(
                    1,
                    "Component's inventory detail should be of lenght greater than 1."
                );

                expect(component.inventory[0].materialId).toBe(
                    "viscosa/VCA1030",
                    "Component's inventory detail's materialId should be VISCOSA/VCA1030."
                );

                return expect(component.inventory[0].qty).toBeGreaterThan(
                    0,
                    "Component's inventory detail's quantity should be greater than zero."
                );
            };
            return execute();
        });

        it("Should be able to toggle material's details on", () => {
            let execute = async () => {
                await component.getInventoryInfo("viscosa/VCA1030");

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
                await component.getInventoryInfo("viscosa/VCA1030");

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
