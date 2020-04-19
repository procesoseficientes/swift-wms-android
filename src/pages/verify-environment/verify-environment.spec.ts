import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { VerifyEnvironmentPage } from "./verify-environment";
import { NavController } from "ionic-angular";
import { NavControllerMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { UnitTesting } from "../../common/common.unit";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";

describe("VerifyEnvironmentPage Component", () => {
    let fixture: any;
    let component: VerifyEnvironmentPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let settings = UserSettingsProviderMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("");
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [VerifyEnvironmentPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(VerifyEnvironmentPage)
                ],
                providers: [
                    {
                        provide: NavController,
                        useValue: navController
                    },
                    {
                        provide: DeviceProvider,
                        useValue: deviceMock
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: settings
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(VerifyEnvironmentPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        expect(component instanceof VerifyEnvironmentPage).toBe(true);
    });

    describe("Valid Test", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should show last login", () => {
            let credentials = UnitTesting.getTestCredentials();
            component.userWantsToCheckLastUserLogged();
            return expect(component.lastUserLogged).toBe(
                credentials.loginId,
                "User must be BCORADO@L3W as it was the last logged user."
            );
        });

        it("Battery level should be greater than -1", () => {
            component.userWantsCheckBattery();
            return expect(component.batteryLevel).toBeGreaterThan(
                -1,
                "Battery level must be greater than -1"
            );
        });

        it("User should can exit App", () => {
            return expect(component.userWantsExitApp()).toBeUndefined(
                "User should can Exit App"
            );
        });

        it("User should be able to set root page", () => {
            let execute = async () => {
                let startSession = component.userWantStartSession();
                return expect(startSession).not.toBeUndefined(
                    "User should be able to set Root page"
                );
            };

            return execute();
        });
    });

    describe("Invalid Tests", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should NOT show last login", () => {
            component.userWantsToCheckLastUserLogged();
            return expect(component.lastUserLogged).not.toBe(
                "BCORADO",
                "User must NOT be BCORADO as it was the last logged user."
            );
        });

        it("Battery level should be lesser than 50", () => {
            component.userWantsCheckBattery();
            return expect(component.batteryLevel).toBeLessThan(
                50,
                "Battery level must be greater than -1"
            );
        });

        it("WiFi should NOT be active", () => {
            let execute = async () => {
                await component.userWantsCheckWireless();
                return expect(component.wirelessInfo.status).toBeFalsy(
                    "Wireless status should be false"
                );
            };

            return execute();
        });

        it("Bluetooth should NOT be active", () => {
            let execute = async () => {
                await component.userWantsCheckBluetooth();
                return expect(component.bluetoothInfo.status).toBeFalsy(
                    "Bluetooth status should be false"
                );
            };

            return execute();
        });

        it("Data should NOT be loading", () => {
            let execute = async () => {
                let operation = await component.userWantStartSession();
                return expect(operation).toBeUndefined(
                    "Data should NOT be loading"
                );
            };

            return execute();
        });
    });
});
