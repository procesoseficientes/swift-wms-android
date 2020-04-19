import { CreateLicensePage } from "./create-license";
import { IonicModule, NavController, NavParams } from "ionic-angular";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { async, TestBed } from "@angular/core/testing";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UnitTesting } from "../../common/common.unit";
import { Model, DataRequest } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { LicenseProvider } from "../../providers/license/license";
import { ReceptionProvider } from "../../providers/reception/reception";
import { LicenseProvider as LicenseProviderMock } from "../../providers/license/license.mock";
import { ReceptionProvider as ReceptionProviderMock } from "../../providers/reception/reception.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { Enums } from "../../enums/enums";

describe("CreateLicensePage Component", () => {
    let fixture: any;
    let component: CreateLicensePage;
    let settings: UserSettingsProviderMock;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let licenseParam: Model.CreateLicenseParam = { taskId: 123 };
            let navParams = NavParamsMock.instance();
            navParams.data = licenseParam;
            let userInteraction = UserInteractionProviderMock.instance("123");
            settings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [CreateLicensePage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(CreateLicensePage)
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
                    {
                        provide: UserSettingsProvider,
                        useValue: settings
                    },
                    {
                        provide: LicenseProvider,
                        useClass: LicenseProviderMock
                    },
                    {
                        provide: ReceptionProvider,
                        useClass: ReceptionProviderMock
                    },
                    {
                        provide: NavigationProvider,
                        useClass: NavigationProviderMock
                    },
                    {
                        provide: WorkspacePage,
                        useClass: WorkspacePage
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(CreateLicensePage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        expect(component instanceof CreateLicensePage).toBe(true);
    });

    describe("Valid Test", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should create license", () => {
            let execute = async () => {
                await component.loadReceptionHeader();
                let result = await component.userWantsToCreateLicense();
                expect(result).toBeDefined(
                    "Result must return a operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must return be successful"
                );
            };
            return execute();
        });

        it("Should complete task", () => {
            let execute = async () => {
                let result = await component.userWantsToCompleteTask();
                expect(result).toBeDefined(
                    "Result must return a operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must return be successful"
                );
            };
            return execute();
        });

        it("Should back to the Workspace", () => {
            let result = component.backButtonAction();
            expect(result).toBeUndefined(
                "Result must not return a value as it is chaning to the workspace page"
            );
        });


    });

    describe("Invalid Test", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should not create license", () => {
            let execute = async () => {
                await component.loadReceptionHeader();
                component.createLicense.login = "BCORADO@L3W";
                let result = await component.userWantsToCreateLicense();
                expect(result).toBeDefined(
                    "Result must return operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Result must return be Fail"
                );
            };
            return execute();
        });

        it("Should raise exception in method create license", () => {
            let execute = async () => {
                component.createLicense = null;
                let result = await component.userWantsToCreateLicense();
                expect(result).toBeDefined(
                    "Result must return operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Result must return be Fail"
                );
            };
            return execute();
        });

        it("Should raise exception in get Reception Header", () => {
            let execute = async () => {
                component.receptionRequest = null;
                let result = await component.loadReceptionHeader();
                expect(result).toBeDefined(
                    "Result must return operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Result must return be Fail"
                );
            };

            return execute();
        });

        it("Should not complete task", () => {
            let execute = async () => {
                await component.loadReceptionHeader();
                component.receptionHeader.taskId = null;
                component.receptionRequest = DataRequest.Factory.createReceptionRequest(
                    UnitTesting.getTestCredentials()
                );
                let result = await component.userWantsToCompleteTask();
                expect(result).toBeDefined(
                    "Result must return operation object"
                );
                return expect(result.Mensaje).toBe(
                    "Bad request",
                    "Result must return be Fail"
                );
            };
            return execute();
        });

        it("Should raise exception in method loadReceptionHeader", () => {
            let execute = async () => {
                component.receptionRequest = null;
                component.settings.loginId = null;
                component.navParams = null;
                let result = await component.loadReceptionHeader();
                expect(result).toBeDefined(
                    "Result must return operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Result must return be Fail"
                );
            };
            return execute();
        });

        it("Should raise exception in method complete task", () => {
            let execute = async () => {
                component.receptionRequest = null;
                component.settings.loginId = "";
                let result = await component.userWantsToCompleteTask();
                expect(result).toBeDefined(
                    "Result must return operation object"
                );
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Result must return be Fail"
                );
            };
            return execute();
        });


    });
});
