import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { ProcessGeneralPickingSeriesPage } from "./process-general-picking-series";
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
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";
import { PickingProvider } from "../../providers/picking/picking";
import { PickingProvider as PickingProviderMock } from "../../providers/picking/picking.mock";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { UnitTesting } from "../../common/common.unit";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";

describe("ProcessGeneralPickingSeriesPage Component", () => {
    let fixture: any;
    let component: ProcessGeneralPickingSeriesPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let device = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [
                    ProcessGeneralPickingSeriesPage,
                    TranslatePipeMock
                ],
                imports: [
                    IonicModule.forRoot(ProcessGeneralPickingSeriesPage)
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
                        useValue: device
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    },
                    {
                        provide: PickingProvider,
                        useClass: PickingProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(ProcessGeneralPickingSeriesPage);
        component = fixture.componentInstance;
        component.navParams.data = {
            task: UnitTesting.generalPickingSeriesTask(),
            taskHeader: <Model.PickingTaskHeader>{
                wavePickingId: 1,
                qtyPending: 100,
                qtyAssigned: 100,
                Material: Model.Factory.createMaterial(),
                Tasks: [],
                icon: "",
                showDetails: true,
                SerialNumbers: []
            },
            processSku: <Model.ProcessSku>{
                licenseId: 100,
                sourceLocation: "",
                materialBarcode: "",
                materialId: "viscosa/VCA1030",
                quantity: 100,
                wavePickingId: 100,
                useMt2: true,
                usedMt2: 0,
                locationType: Enums.LocationType.Floor,
                requestSerial: true
            }
        };
        component.ionViewDidEnter();
    };

    const scanValidSerie = async () => {
        component.material.SerialNumbers =
            component.task.Material.SerialNumbers;
        await component.processBarcodeScan("88484888");

        expect(component.material.quantity).toBe(
            2,
            "Material required quantity should be 2 after inserting the first serial number"
        );

        expect(component.material.SerialNumbers.length).toBe(
            2,
            "Material serial numbers detail length should be 2 after the insert"
        );

        expect(component.scannedSeries.length).toBe(
            1,
            "Should push inserted serie into scannedSeries array"
        );

        return expect(component.scanData).toBe(
            "",
            "Component's scanData should be emtpy."
        );
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(
            component instanceof ProcessGeneralPickingSeriesPage
        ).toBe(true);
    });

    describe("Valid tests", () => {
        it("Should try to insert serie", () => {
            return scanValidSerie();
        });

        it("Should try to delete serie", () => {
            const execute = async () => {
                await component.processBarcodeScan("88484888");
                await component.deleteSerie("88484888");

                expect(component.material.quantity).toBe(
                    4,
                    "Quantity should be back to 4 after deleting a serie"
                );

                return expect(component.scannedSeries.length).toBe(
                    0,
                    "Component's scannedSeries should be back to 0"
                );
            };

            return execute();
        });

        it("Should try to rollback series", () => {
            const execute = async () => {
                component.backButtonAction();
                let result = await component.userWantsToRollbackSeries();

                return expect(result).toBeUndefined(
                    "Rollback should be succesful."
                );
            };

            return execute();
        });
    });

    describe("Invalid tests", () => {
        it("Should try to insert a serie but fail with response from API", () => {
            const execute = async () => {
                await component.processBarcodeScan("FAILED");
                return expect(component.material.quantity).toBe(
                    3,
                    "Material required quantity should be 3 after failing to insert the serial number"
                );
            };

            return execute();
        });

        it("Should try to insert a serie and catch an error", () => {
            const execute = async () => {
                await component.processBarcodeScan("ERROR");
                return expect(component.material.quantity).toBe(
                    3,
                    "Material required quantity should be 3 after failing to insert the serial number"
                );
            };

            return execute();
        });

        it("Should try to delete serie but get an api response yielding an error", () => {
            const execute = async () => {
                let result = await component.deleteSerie("FAILED");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Delete result should be failed and yield operation error."
                );
            };

            return execute();
        });

        it("Should try to delete serie but should end up on the catch of the function", () => {
            const execute = async () => {
                let result = await component.deleteSerie("ERROR");

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Delete result should be failed and enter on catch."
                );
            };

            return execute();
        });
    });
});
