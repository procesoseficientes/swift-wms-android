import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { ProcessGeneralPickingPage } from "./process-general-picking";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { PickingProvider } from "../../providers/picking/picking";
import { PickingProvider as PickingProviderMock } from "../../providers/picking/picking.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { LocationProvider } from "../../providers/location/location";
import { LocationProvider as LocationProviderMock } from "../../providers/location/location.mock";
import { ChargeProvider } from "../../providers/charge/charge";
import { ChargeProvider as ChargeProviderMock } from "../../providers/charge/charge.mock";
import { LabelProvider } from "../../providers/label/label";
import { LabelProvider as LabelProviderMock } from "../../providers/label/label.mock";
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";

describe("ProcessGeneralPickingPage Component", () => {
    let fixture: any;
    let component: ProcessGeneralPickingPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let device = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [ProcessGeneralPickingPage, TranslatePipeMock],
                imports: [IonicModule.forRoot(ProcessGeneralPickingPage)],
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
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
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
                        provide: ChargeProvider,
                        useClass: ChargeProviderMock
                    },
                    {
                        provide: LabelProvider,
                        useClass: LabelProviderMock
                    },
                    {
                        provide: PrinterProvider,
                        useClass: PrinterProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(ProcessGeneralPickingPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof ProcessGeneralPickingPage).toBe(
            true
        );
    });

    describe("Valid Tests", () => {
        it("Should be able to go back from ProcessGeneralPickingPage to GeneralPickingPage", () => {
            let execute = async () => {
                component.taskHeader = <Model.PickingTaskHeader>{
                    Material: Model.Factory.createMaterial()
                };
                let execution = await component.backButtonAction();
                return expect(execution).toBeUndefined(
                    "Must be able to go back from ProcessGeneralPickingPage to GeneralPickingPage"
                );
            };
            return execute();
        });

        it("Scanned location should be equal", () => {
            let execute = async () => {
                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.SourceLocation
                );
                return expect(component.currentScan).toBe(
                    Enums.PickingScan.SourceLocation,
                    "Component's currentScan value should be source location."
                );
            };
            return execute();
        });

        it("Should be able to show the scan icon", () => {
            let execute = async () => {
                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.SourceLocation
                );

                let showScanIcon = component.showScanIcon(
                    Enums.PickingScan.SourceLocation
                );
                return expect(showScanIcon).toBeTruthy(
                    "Must be able to show the scan icon"
                );
            };
            return execute();
        });

        it("Should be able to process location validating with locationSpotSource", () => {
            let execute = async () => {
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.task.locationSpotSource = "B01-P02-F01-NU";
                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.SourceLocation
                );

                let execution = await component.userWantToProcessScannedData(
                    "B01-P02-F01-NU"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Must be able to process location validating with locationSpotSource"
                );
            };
            return execute();
        });

        it("Should be able to process location using batchRequested = 1", () => {
            let execute = async () => {
                component.currentScan = Enums.PickingScan.SourceLocation;
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.taskHeader.Tasks[0].locationSpotSource =
                    "B01-P02-F01-NU";
                component.taskHeader.Material.batchRequested = Enums.YesNo.Yes;
                component.task.locationSpotSource = "";

                let execution = await component.userWantToProcessScannedData(
                    "B01-P02-F01-NU"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Must be able to process location using batchRequested = 1"
                );
            };
            return execute();
        });

        it("Should be able to process location using batchRequested = 0", () => {
            let execute = async () => {
                component.currentScan = Enums.PickingScan.SourceLocation;
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.processSku.materialId = "arium/100041";
                component.taskHeader.Material.batchRequested = Enums.YesNo.No;
                component.task.locationSpotSource = "";

                let execution = await component.userWantToProcessScannedData(
                    "B01-P02-F01-NU"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Must be able to process location using batchRequested = 0"
                );
            };
            return execute();
        });

        it("Should be able to process license validating if batchRequested is 1", () => {
            let execute = async () => {
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.taskHeader.Material.batchRequested = Enums.YesNo.Yes;
                component.taskHeader.Tasks[0].licenseIdSource = 388396;
                component.processSku.sourceLocation = "B01-P02-F01-NU";
                component.taskHeader.Tasks[0].locationSpotSource =
                    "B01-P02-F01-NU";

                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.LicenseId
                );

                let execution = await component.userWantToProcessScannedData(
                    "388396"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Must be able to process license validating if batchRequested is 1"
                );
            };

            return execute();
        });

        it("Should be able to process license validating if batchRequested is 0", () => {
            let execute = async () => {
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.taskHeader.Material.batchRequested = Enums.YesNo.No;
                component.task.licenseIdSource = 1234;
                component.processSku.materialId = "arium/100041";
                component.currentScan = Enums.PickingScan.LicenseId;

                let execution = await component.userWantToProcessScannedData(
                    "388396"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Must be able to process license validating if batchRequested is 1"
                );
            };
            return execute();
        });

        it("Should be able to process material scanned", () => {
            let execute = async () => {
                component.processSku.licenseId = 388396;
                component.task.barcodeId = "arium/100041";
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.MaterialBarcode
                );

                let operation = await component.userWantToProcessScannedData(
                    "arium/100041"
                );

                return expect(operation.Resultado).not.toBe(
                    Enums.OperationResult.Success,
                    "Must be able to process material scanned"
                );
            };
            return execute();
        });

        it("Should be able to process picking", () => {
            let execute = async () => {
                component.processSku.materialBarcode = "arium/100041";
                let execution = await component.userWantsToProcessPicking();

                return expect(execution).toBeFalsy(
                    "Must be able to process picking"
                );
            };
            return execute();
        });

        it("Should be able to do rollback to series on the current license", () => {
            let execute = async () => {
                component.task.licenseIdSource = 388396;
                let execution = await component.userWantsToRollbackSeries();
                return expect(execution).toBeUndefined(
                    "Must be able to do rollback to series on the current license"
                );
            };
            return execute();
        });

        it("Should be able insert picking license dispatch", () => {
            let execute = async () => {
                component.task.wavePickingId = 4864;
                let execution = await component.insertLicenseDispatch();
                return expect(component.licenseDispatchId).toBe(
                    388396,
                    "Must be able to insert picking license dispatch"
                );
            };
            return execute();
        });
    });

    describe("Invalid Tests", () => {
        it("Should not process license validation if batchRequested is null", () => {
            let execute = async () => {
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.taskHeader.Material.batchRequested = null;
                component.task.licenseIdSource = 1234;
                component.processSku.materialId = "arium/100041";
                component.currentScan = Enums.PickingScan.LicenseId;

                let execution = await component.userWantToProcessScannedData(
                    "388396"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Must not process license falidation if batchRequested is null"
                );
            };
            return execute();
        });

        it("Should not process license validation if the API response not provide locations", () => {
            let execute = async () => {
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.taskHeader.Material.batchRequested = Enums.YesNo.No;
                component.task.licenseIdSource = 1234;
                component.processSku.materialId = "arium/100041456";
                component.currentScan = Enums.PickingScan.LicenseId;

                let execution = await component.userWantToProcessScannedData(
                    "388396"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Must not to process license validation if the API response not provide locations"
                );
            };
            return execute();
        });

        it("Should not process location while batchRequested = 1", () => {
            let execute = async () => {
                component.currentScan = Enums.PickingScan.SourceLocation;
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.taskHeader.Tasks[0].locationSpotSource = "";
                component.taskHeader.Material.batchRequested = Enums.YesNo.Yes;
                component.task.locationSpotSource = "";

                let execution = await component.userWantToProcessScannedData(
                    "B01-P02-F01-NU"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Must not process location while batchRequested = 1"
                );
            };
            return execute();
        });

        it("Should not process location while batchRequested = 0 and the API not provide locations", () => {
            let execute = async () => {
                component.currentScan = Enums.PickingScan.SourceLocation;
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.processSku.materialId = "arium/1000415617895";
                component.taskHeader.Material.batchRequested = Enums.YesNo.No;
                component.task.locationSpotSource = "";

                let execution = await component.userWantToProcessScannedData(
                    "B01-P02-F01-NU"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Must not process location while batchRequested = 0"
                );
            };
            return execute();
        });

        it("Should not process location while batchRequested is null", () => {
            let execute = async () => {
                component.currentScan = Enums.PickingScan.SourceLocation;
                component.taskHeader = Model.Factory.createPickingTaskHeader();
                component.processSku.materialId = "arium/1000415617895";
                component.taskHeader.Material.batchRequested = null;
                component.task.locationSpotSource = "";

                let execution = await component.userWantToProcessScannedData(
                    "B01-P02-F01-NU"
                );

                return expect(execution.Resultado).toBe(
                    Enums.OperationResult.Fail,
                    "Must not process location while batchRequested is null"
                );
            };
            return execute();
        });

        it("Should not set the currentScan property if not is a valid value", () => {
            let execute = async () => {
                component.currentScan = undefined;
                component.userWantsToChangeCurrentScan(100);

                return expect(component.currentScan).toBeUndefined(
                    "Must not set the currentScan property if not is a valid value"
                );
            };
            return execute();
        });

        it("Should not change currentScan property if sourceLocation is empty", () => {
            let execute = async () => {
                component.currentScan = undefined;
                component.processSku.sourceLocation = "";
                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.LicenseId
                );

                return expect(component.currentScan).toBeUndefined(
                    "Must not change currentScan property if sourceLocation is empty"
                );
            };
            return execute();
        });

        it("Should not change currentScan property if licenseId is empty", () => {
            let execute = async () => {
                component.currentScan = undefined;
                component.processSku.licenseId = null;
                component.userWantsToChangeCurrentScan(
                    Enums.PickingScan.MaterialBarcode
                );

                return expect(component.currentScan).toBeUndefined(
                    "Must not change currentScan property if licenseId is empty"
                );
            };
            return execute();
        });

        it("Should be able insert picking license dispatch", () => {
            let execute = async () => {
                component.task.wavePickingId = -1;
                component.licenseDispatchId = -1;
                let execution = await component.insertLicenseDispatch();
                return expect(component.licenseDispatchId).toBe(
                    -1 ,
                    "Must be able to insert picking license dispatch"
                );
            };
            return execute();
        });
    });
});
