import { LicenseChargesPage } from "./license-charges";
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
import { ChargeProvider } from "../../providers/charge/charge";
import { ChargeProvider as ChargeProviderMock } from "../../providers/charge/charge.mock";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UnitTesting } from "../../common/common.unit";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";

describe("LicenseChargesPage Component", () => {
    let fixture: any;
    let component: LicenseChargesPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();

            let chargeParams: Model.LicenseChargesParam = <Model.LicenseChargesParam>{
                licenseId: 1,
                taskId: 1,
                charges: UnitTesting.getDefaultTypeCharges(),
                wavePickingId: 1,
                transType: Enums.TransType.Picking
            };

            let navParams = NavParamsMock.instance();
            navParams.data = chargeParams;
            let userInteraction = UserInteractionProviderMock.instance("123");
            let settings = UserSettingsProviderMock.instance("BCORADO@L3W");

            TestBed.configureTestingModule({
                declarations: [LicenseChargesPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(LicenseChargesPage)
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
                    WorkspacePage,
                    {
                        provide: NavigationProvider,
                        useClass: NavigationProviderMock
                    },
                    {
                        provide: ChargeProvider,
                        useClass: ChargeProviderMock
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
        fixture = TestBed.createComponent(LicenseChargesPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
        component.backButtonAction();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        expect(component instanceof LicenseChargesPage).toBe(true);
    });

    describe("Valid tests", () => {
        it("Should save license charges and go into Picking if path", () => {
            const execute = async () => {
                component.transType = Enums.TransType.Picking;
                let result = await component.saveChargesInLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Changes should be saved to license charges"
                );
            };

            return execute();
        });

        it("Should save license charges and go into GeneralReception if path", () => {
            const execute = async () => {
                component.transType = Enums.TransType.GeneralReception;
                let result = await component.saveChargesInLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Changes should be saved to license charges"
                );
            };

            return execute();
        });
    });

    describe("Invalid tests", () => {
        it("Should NOT save license charges and have a failed operation as response", () => {
            const execute = async () => {
                component.charges[0].typeChargeId = 0;
                let result = await component.saveChargesInLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Changes should be NOT saved to license charges but get a response from the API"
                );
            };

            return execute();
        });

        it("Should NOT save license charges and go into function's catch path", () => {
            const execute = async () => {
                component.charges[0].typeChargeId = -1;
                let result = await component.saveChargesInLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Changes should be NOT saved to license charges and get NO response from the API"
                );
            };

            return execute();
        });
    });
});
