import { LocateGeneralPickingPage } from "./locate-general-picking";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { async, TestBed } from "@angular/core/testing";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { PickingProvider } from "../../providers/picking/picking";
import { PickingProvider as PickingProviderMock } from "../../providers/picking/picking.mock";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { LocationProvider } from "../../providers/location/location";
import { LocationProvider as LocationProviderMock } from "../../providers/location/location.mock";
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { TaskProvider } from "../../providers/task/task";
import { TaskProvider as TaskProviderMock } from "../../providers/task/task.mock";

describe("LocateGeneralPickingPage Component", () => {
    let fixture: any;
    let component: LocateGeneralPickingPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();

            let locateGeneralPickingParams: Model.LocateGeneralPickingParam = <Model.LocateGeneralPickingParam>{
                wavePickingId: 1
            };

            let navParams = NavParamsMock.instance();
            navParams.data = locateGeneralPickingParams;
            let userInteraction = UserInteractionProviderMock.instance("123");
            let settings = UserSettingsProviderMock.instance();
            let device = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [LocateGeneralPickingPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(LocateGeneralPickingPage)
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
                        provide: PickingProvider,
                        useClass: PickingProviderMock
                    },
                    {
                        provide: LocationProvider,
                        useClass: LocationProviderMock
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: DeviceProvider,
                        useValue: device
                    },
                    {
                        provide: TaskProvider,
                        useClass: TaskProviderMock
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: settings
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(LocateGeneralPickingPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
        component.backButtonAction();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        expect(component instanceof LocateGeneralPickingPage).toBe(true);
    });

    describe("Valid tests", () => {
        it("Should getLocationSpot after scanning it", () => {
            const execute = async () => {
                let result = await component.getLocationSpot(
                    "B01-P01"
                );

                expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "The fetch result should be succesful"
                );

                return expect(component.location.locationSpot).toBe(
                    "B01-P01",
                    "Location spot should be the same as the one sent on the parameter"
                );
            };

            return execute();
        });

        it("Should be able to locatePicking", () => {
            const execute = async () => {
                component.location = <Model.ShelfSpot>{ locationSpot: "B01-P01" };
                let result = await component.locatePicking();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Changes should be saved to license charges"
                );
            };

            return execute();
        });
    });

    describe("Invalid tests", () => {
        it("Should NOT be able to fetch location and it should have a failed operation as response", () => {
            const execute = async () => {
                let result = await component.getLocationSpot("UNKNOWN");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Should not be able to fetch location but get a response from the API"
                );
            };

            return execute();
        });

        it("Should NOT be able to fetch location and it should go into function's catch path", () => {
            const execute = async () => {
                let result = await component.getLocationSpot("ERROR");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Should NOT be able to fetch location and it should go into function's catch path"
                );
            };

            return execute();
        });

        it("Should NOT be able to locate picking and it should have a failed operation as response", () => {
            const execute = async () => {
                component.location = <Model.ShelfSpot>{ locationSpot: "FAILED" };
                let result = await component.locatePicking();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Should NOT be able to locate picking and it should have a failed operation as response"
                );
            };

            return execute();
        });

        it("Should NOT be able to locate picking and it should go into function's catch path", () => {
            const execute = async () => {
                component.location = <Model.ShelfSpot>{ locationSpot: "ERROR" };
                let result = await component.locatePicking();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Should NOT be able to locate picking and it should go into function's catch path"
                );
            };

            return execute();
        });
    });
});
