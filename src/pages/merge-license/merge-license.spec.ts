import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { MergeLicensePage } from "./merge-license";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { LocationProvider } from "../../providers/location/location";
import { LocationProvider as LocationProviderMock } from "../../providers/location/location.mock";
import { MaterialProvider } from "../../providers/material/material";
import { MaterialProvider as MaterialProviderMock } from "../../providers/material/material.mock";
import { LicenseProvider } from "../../providers/license/license";
import { LicenseProvider as LicenseProviderMock } from "../../providers/license/license.mock";
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";

describe("MergeLicensePage Component", () => {
    let fixture: any;
    let component: MergeLicensePage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            navParams.data = { lastOption: Enums.InfoCenterOption.Sku };
            let deviceMock = DeviceProviderMock.instance(userInteraction);
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [MergeLicensePage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(MergeLicensePage)
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
                        provide: DeviceProvider,
                        useValue: deviceMock
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: LocationProvider,
                        useClass: LocationProviderMock
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
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(MergeLicensePage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof MergeLicensePage).toBe(true);
    });

    describe("Valid Tests", () => {
        it("getNewLicensesDetail success", () => {
            let execute = async () => {
                let result = await component.getNewLicensesDetail();

                expect(result).toBeUndefined("Result should be undefined.");

                expect(component.licenses.length).toBe(
                    2,
                    "Should fetch 2 licenses"
                );

                expect(component.licenses[0].detail.length).toBe(
                    2,
                    "First license should have 2 details"
                );

                expect(component.licenses[0].licenseId).toBe(
                    1,
                    "First license should be 1"
                );

                return expect(component.licenses[0].licenseDescription).toBe(
                    "1-arium",
                    "First license description should be 1-arium"
                );
            };
            return execute();
        });

        it("validateLocation must be true", () => {
            let execute = async () => {
                let result = await component.validateLocation("B01-P01");

                expect(result).toBeTruthy("Result must be successful.");

                return expect(component.locationText).toBe(
                    "B01-P01",
                    "locationText must be the same as the parameter sent"
                );
            };

            return execute();
        });

        it("validateMaterial must be true", () => {
            let execute = async () => {
                let result = await component.validateMaterial(
                    "viscosa/VCA1030"
                );

                expect(result).toBeTruthy("Result must be successful.");

                return expect(component.material.materialId).toBe(
                    "viscosa/VCA1030",
                    "Component's materialId must be the same as the parameter sent"
                );
            };

            return execute();
        });

        it("mergeLocationLicenses must be successful", () => {
            let execute = async () => {
                component.locationText = "B01-P01";
                await component.getNewLicensesDetail();
                let result = await component.mergeLocationLicenses();

                return expect(result).toBeTruthy("Result must be successful.");
            };

            return execute();
        });
    });
});
