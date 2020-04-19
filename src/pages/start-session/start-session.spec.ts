import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { StartSessionPage } from "./start-session";
import { UnitTesting } from "../../common/common.unit";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { SecurityProvider } from "../../providers/security/security";
import { SecurityProvider as SecurityProviderMock } from "../../providers/security/security.mock";
import { FormBuilder } from "@angular/forms";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { Model } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";

describe("StartSessionPage Component", () => {
    let fixture: any;
    let component: StartSessionPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            let settings = UserSettingsProviderMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [StartSessionPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(StartSessionPage),
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
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    FormBuilder,
                    {
                        provide: SecurityProvider,
                        useClass: SecurityProviderMock
                    },
                    { provide: DeviceProvider, useValue: deviceMock },
                    {
                        provide: UserSettingsProvider,
                        useValue: settings
                    }
                ]
            });
        })
    );

    const loadComponent = (userCredentials: Model.UserCredentials) => {
        fixture = TestBed.createComponent(StartSessionPage);
        component = fixture.componentInstance;
        component.userCredentials = userCredentials;
        component.ngOnInit();
        component.setLoginId(userCredentials.loginId);
    };

    beforeEach(() => {
        loadComponent(UnitTesting.getTestCredentials());
    });

    it("Should be created", () => {
        expect(component instanceof StartSessionPage).toBe(true);
    });

    describe("Invalid Test", () => {
        beforeEach(() => {
            let credentials = UnitTesting.getTestCredentials();
            credentials.loginId = "BCORADO";
            loadComponent(credentials);
        });

        it("Form should NOT be valid", () => {
            return expect(component.formIsNotValid()).toBeTruthy(
                "This credentials should NOT be valid"
            );
        });

        it("Should NOT be logged in", () => {
            let execute = async () => {
                let result = await component.validateUserPin(
                    component.userCredentials
                );

                return expect(result).toBe(
                    false,
                    "User must not login successfully"
                );
            };

            return execute();
        });

        it("Should NOT be a valid pin", () => {
            let execute = async () => {
                let result = await component.userWantsCheckPin();

                return expect(result).toBe(false, "User pin must not be valid");
            };

            return execute();
        });
    });

    describe("Valid Test", () => {
        beforeEach(() => {
            loadComponent(UnitTesting.getTestCredentials());
        });

        it("Form should be valid", () => {
            return expect(component.formIsNotValid()).toBeFalsy(
                "This credentials should be valid"
            );
        });

        it("Should be logged in", () => {
            let execute = async () => {
                let result = await component.validateUserPin(
                    component.userCredentials
                );

                return expect(result).toBe(
                    true,
                    "User must login successfully"
                );
            };

            return execute();
        });

        it("Should be a valid pin", () => {
            let execute = async () => {
                let result = await component.userWantsCheckPin();

                return expect(result).toBe(true, "User pin must be valid");
            };

            return execute();
        });
    });
});
