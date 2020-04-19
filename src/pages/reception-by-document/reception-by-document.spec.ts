import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { ReceptionByDocumentPage } from "./reception-by-document";
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
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { ReceptionProvider } from "../../providers/reception/reception";
import { ReceptionProvider as ReceptionProviderMock } from "../../providers/reception/reception.mock";
import { Enums } from "../../enums/enums";

describe("ReceptionByDocumentPage Component", () => {
    let fixture: any;
    let component: ReceptionByDocumentPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [ReceptionByDocumentPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(ReceptionByDocumentPage)
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
                        provide: ReceptionProvider,
                        useClass: ReceptionProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(ReceptionByDocumentPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof ReceptionByDocumentPage).toBe(true);
    });

    describe("Valid tests", () => {
        it("Should validateDocument", () => {
            let execute = async () => {
                let result = await component.validateDocument("MC-3161");

                expect(result.Codigo).toBe(
                    3161,
                    "validateDocument's result's code should be 3161"
                );

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "gotoCreateLicensePage result must be successful"
                );
            };
            return execute();
        });

        it("Should createReceptionFromDocument", () => {
            let execute = async () => {
                let result = await component.validateDocument("MC-3161");
                expect(result.Codigo).toBe(
                    3161,
                    "createReceptionFromDocument's result's code should be 3161"
                );
                expect(result.DbData).toBe(
                    Enums.DocumentType.TransferRequest,
                    "createReceptionFromDocument's result's dbdata should be TRANSFER_REQUEST"
                );

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "gotoCreateLicensePage result must be successful"
                );
            };
            return execute();
        });
    });
});
