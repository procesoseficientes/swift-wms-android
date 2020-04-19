import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { RelocateFullLicensePage } from "./relocate-full-license";
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
import { LocationProvider } from "../../providers/location/location";
import { LocationProvider as LocationProviderMock } from "../../providers/location/location.mock";
import { RelocateProvider } from "../../providers/relocate/relocate";
import { RelocateProvider as RelocateProviderMock } from "../../providers/relocate/relocate.mock";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";

describe("InfoCenterPage Component", () => {
    let fixture: any;
    let component: RelocateFullLicensePage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            navParams.data = <Model.RelocateFullLicenseParams>{
                licenseId: 22732
            };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let device = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [RelocateFullLicensePage, TranslatePipeMock],
                imports: [IonicModule.forRoot(RelocateFullLicensePage)],
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
                        provide: DeviceProvider,
                        useValue: device
                    },
                    {
                        provide: LocationProvider,
                        useClass: LocationProviderMock
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: RelocateProvider,
                        useClass: RelocateProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(RelocateFullLicensePage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    afterEach(() => {
        component.ionViewDidLeave();
    });

    it("Should be created", () => {
        return expect(component instanceof RelocateFullLicensePage).toBe(true);
    });

    describe("Valid Tests", () => {
        it("validateLocation should be succesful", () => {
            let execute = async () => {
                let result = await component.validateLocation("B01-P01");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Validation should be succesful"
                );
            };
            return execute();
        });

        it("getLocation should be succesful", () => {
            let execute = async () => {
                let result = await component.getLocation(
                    Enums.LocationType.Rack
                );

                expect(component.locationSpot.spotType).toBe(
                    Enums.LocationType.Rack,
                    "Location should be of type RACK"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "getLocation should be succesful"
                );
            };
            return execute();
        });

        it("getLocation should be succesful", () => {
            let execute = async () => {
                let result = await component.getLocation(
                    Enums.LocationType.Floor
                );

                expect(component.locationSpot.spotType).toBe(
                    Enums.LocationType.Floor,
                    "Location should be of type FLOOR"
                );

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "getLocation should be succesful"
                );
            };
            return execute();
        });

        it("relocateLicense should be succesful", () => {
            let execute = async () => {
                component.licenseId = 1;
                let result = await component.relocateLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "relocateLicense should be succesful"
                );
            };
            return execute();
        });
    });

    describe("Invalid Tests", () => {
        it("validateLocation should NOT be succesful and go through catch", () => {
            let execute = async () => {
                let result = await component.validateLocation("ERROR");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Validation should NOT be succesful and go through catch"
                );
            };
            return execute();
        });

        it("validateLocation should NOT be succesful and go through else path", () => {
            let execute = async () => {
                let result = await component.validateLocation("UNKNOWN");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Validation should NOT be succesful and go through else path"
                );
            };
            return execute();
        });

        it("getLocation should NOT be succesful", () => {
            let execute = async () => {
                let result = await component.getLocation("ERROR");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "getLocation should NOT be succesful"
                );
            };
            return execute();
        });

        it("relocateLicense should NOT be succesful and go through catch", () => {
            let execute = async () => {
                component.licenseId = -1;
                let result = await component.relocateLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "relocateLicense should NOT be succesful and go through catch"
                );
            };
            return execute();
        });

        it("relocateLicense should NOT be succesful and go through else statement", () => {
            let execute = async () => {
                component.licenseId = 0;
                let result = await component.relocateLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "relocateLicense should NOT be succesful and go through else statement"
                );
            };
            return execute();
        });
    });
});
