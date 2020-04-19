import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { InfoCenterPage } from "./info-center";
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

describe("InfoCenterPage Component", () => {
    let fixture: any;
    let component: InfoCenterPage;

        beforeEach(
            async(() => {
                let navController = NavControllerMock.instance();
                let navParams = NavParamsMock.instance();
                let userInteraction = UserInteractionProviderMock.instance("123");
                navParams.data = { lastOption: Enums.InfoCenterOption.Sku };
                let deviceMock = DeviceProviderMock.instance(userInteraction);
                TestBed.configureTestingModule({
                    declarations: [InfoCenterPage, TranslatePipeMock],
                    imports: [
                        IonicModule.forRoot(InfoCenterPage)
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
                        }
                    ]
                });
            })
        );

    const loadComponent = () => {
        fixture = TestBed.createComponent(InfoCenterPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    afterAll(() => {
        component.ionViewDidLeave();
    });

    it("Should be created", () => {
        return expect(component instanceof InfoCenterPage).toBe(true);
    });

    describe("Valid Tests", () => {
        it("Scanned object success", () => {
            let execute = async () => {
                component.scanData = "123";
                component.selectedOption = Enums.InfoCenterOption.Sku;
                let result = await component.processBarcodeScan(
                    component.scanData
                );

                expect(result).toBeTruthy("ScanBarcode Result should be true.");

                return expect(component.inputSearch).toBe(
                    "123",
                    "Incorrect value scanned."
                );
            };
            return execute();
        });
    });
});
