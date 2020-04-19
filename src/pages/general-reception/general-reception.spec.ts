import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { GeneralReceptionPage } from "./general-reception";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import { ConfigurationProvider as ConfigurationProviderMock } from "../../providers/configuration/configuration.mock";
import { ReceptionProvider } from "../../providers/reception/reception";
import { ReceptionProvider as ReceptionProviderMock } from "../../providers/reception/reception.mock";
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";

describe("GeneralReceptionPage Component", () => { // FIXME: Must split this controller with providers
    let fixture: any;
    let component: GeneralReceptionPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let generalReceptionParam: Model.GeneralReceptionParam = <Model.GeneralReceptionParam>{
                licenseId: 452612,
                taskId: 455600,
                clientOwner: "ARIUM"
            };
            let navParams = NavParamsMock.instance();
            navParams.data = generalReceptionParam;
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [GeneralReceptionPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(GeneralReceptionPage)
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
                        provide: ConfigurationProvider,
                        useClass: ConfigurationProviderMock
                    },
                    {
                        provide: ReceptionProvider,
                        useClass: ReceptionProviderMock
                    },
                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
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
                        provide: PrinterProvider,
                        useClass: PrinterProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(GeneralReceptionPage);
        component = fixture.componentInstance;
        component.ionViewDidLoad();
        component.ionViewDidEnter();
    };

    const scanEmptyMaterial = () => {
        let execute = async () => {
            component.changeCurrentScan(Enums.ReceptionScanner.Material);
            expect(component.currentScan).toBe(
                Enums.ReceptionScanner.Material,
                "Component's currentScan value should be Material"
            );

            component.scanData = "EMPTY";
            let result = await component.processBarcodeScan(component.scanData);

            expect(result).toBeTruthy("ScanBarcode Result should be true.");

            return expect(component.material.materialId).not.toBeUndefined(
                "Scanned material should exist."
            );
        };
        return execute();
    };

    const scanSerialNumberMaterial = () => {
        let execute = async () => {
            component.changeCurrentScan(Enums.ReceptionScanner.Material);
            expect(component.currentScan).toBe(
                Enums.ReceptionScanner.Material,
                "Component's currentScan value should be Material"
            );

            component.scanData = "SERIAL";
            let result = await component.processBarcodeScan(component.scanData);

            expect(result).toBeTruthy("ScanBarcode Result should be true.");

            return expect(
                component.material.serialNumberRequests === Enums.YesNo.Yes
            ).toBeTruthy("Scanned material should request serial number");
        };
        return execute();
    };

    beforeEach(() => {
        loadComponent();
    });

    afterAll(() => {
        component.ionViewDidLeave();
    });

    it("Should be created", () => {
        return expect(component instanceof GeneralReceptionPage).toBe(true);
    });

    describe("Valid Tests", () => {
        beforeEach(() => {
            loadComponent();
        });

        it("Should be able to see barcode button", () => {
            component.currentSegment = "scanMaterial";
            return expect(component.showScanBarcode()).toBeTruthy(
                "Should be able to see barcode button."
            );
        });

        it("Detail should be toggled to true, thus showing the details", () => {
            let material: Model.Material = Model.Factory.createMaterial();
            material.serialNumberRequests = Enums.YesNo.Yes;
            material.showDetails = false;
            return expect(component.toggleDetails(material)).toBeTruthy(
                "Material's detail/serial numbers should end up showing."
            );
        });

        it("Scanned material should exist", () => {
            let execute = async () => {
                await scanEmptyMaterial();
                component.material.quantity = 100;

                await component.keyPressQuantity(Enums.KeyCode.Enter);
                expect(component.detail.length).toBeGreaterThan(
                    0,
                    "A detail should've been added"
                );

                expect(component.material.materialId).toBe(
                    "",
                    "Component's material's materialId should be empty after adding a material"
                );
                await scanEmptyMaterial();
                component.material.quantity = 150;
                await component.addMaterialToLicense(
                    Enums.ReceptionAction.Update
                );
                expect(component.detail.length).toBeGreaterThan(
                    0,
                    "There should be at least one detail"
                );

                expect(component.detail[0].quantity).toBe(
                    150,
                    "Component's first material's quantity should be 150"
                );

                await scanEmptyMaterial();
                component.material.quantity = 50;
                await component.addMaterialToLicense(Enums.ReceptionAction.Add);

                expect(component.detail.length).toBeGreaterThan(
                    0,
                    "There should be at least one detail"
                );

                return expect(component.detail[0].quantity).toBe(
                    200,
                    "Component's first material's quantity should be 200"
                );
            };
            return execute();
        });

        it("Scanned material should exist and handle batch", () => {
            let execute = async () => {
                component.changeCurrentScan(Enums.ReceptionScanner.Material);
                expect(component.currentScan).toBe(
                    Enums.ReceptionScanner.Material,
                    "Component's currentScan value should be Material"
                );

                component.scanData = "BATCH";
                let result = await component.processBarcodeScan(
                    component.scanData
                );
                expect(result).toBeTruthy("ScanBarcode Result should be true.");

                expect(
                    component.material.batchRequested === Enums.YesNo.Yes
                ).toBeTruthy("Scanned material should handle batch");

                component.scanData = "201803021629P";
                result = await component.processBarcodeScan(component.scanData);

                return expect(component.material.batch).toBe(
                    component.scanData,
                    "Component's material's current batch should be the same as scanned before"
                );
            };
            return execute();
        });

        it("Scanned material should exist and be a car", () => {
            let execute = async () => {
                component.changeCurrentScan(Enums.ReceptionScanner.Material);
                expect(component.currentScan).toBe(
                    Enums.ReceptionScanner.Material,
                    "Component's currentScan value should be Material"
                );

                component.scanData = "VIN";
                let result = await component.processBarcodeScan(
                    component.scanData
                );

                expect(result).toBeTruthy("ScanBarcode Result should be true.");

                expect(component.material.isCar === Enums.YesNo.Yes).toBeTruthy(
                    "Scanned material should be a car"
                );

                component.scanData = "1B4GP25382B558353";
                await component.processBarcodeScan(component.scanData);

                return expect(component.material.vin).toBe(
                    component.scanData,
                    "Component's material's VIN number should be the same as scanned before"
                );
            };
            return execute();
        });

        it("Scanned material should exist and handle serial", () => {
            let execute = async () => {
                await scanSerialNumberMaterial();
                let result = scanSerialNumberMaterial();

                return expect(result).toBeTruthy(
                    "Scanned material should request serial number"
                );
            };
            return execute();
        });

        it("Should show the barcode icon", () => {
            component.changeCurrentScan(Enums.ReceptionScanner.Material);
            let result = component.showScanIcon(
                Enums.ReceptionScanner.Material
            );
            return expect(result).toBeTruthy("The icon should be shown.");
        });

        it("Should show print options", () => {
            let execute = async () => {
                let result = await component.showPrintOption();
                return expect(result).toBeUndefined(
                    "Should show print options alert"
                );
            };
            return execute();
        });

        it("Should show backbutton actions alert", () => {
            let execute = async () => {
                let result = await component.backButtonAction();

                return expect(result).toBeUndefined(
                    "Should show confirm rollback alert."
                );
            };
            return execute();
        });

        it("Should rollback license", () => {
            let execute = async () => {
                let result: Model.Operation = await component.rollbackLicense();

                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result should be an alert"
                );
            };
            return execute();
        });



        it("Should be able to locate license", () => {
            let execute = async () => {
                await scanEmptyMaterial();
                component.material.quantity = 100;

                await component.keyPressQuantity(Enums.KeyCode.Enter);

                component.licenseId = 1;
                let result: boolean = await component.locateLicense();

                return expect(result).toBeTruthy(
                    "Should be able to locate license, result should be true"
                );
            };
            return execute();
        });
    });

    describe("Invalid Tests", () => {
        beforeEach(() => {
            loadComponent();
        });
        it("Should NOT be able to see barcode button", () => {
            component.currentSegment = "licenseDetail";
            return expect(component.showScanBarcode()).toBeFalsy(
                "Should NOT be able to see barcode button."
            );
        });

        it("Detail should be toggled to false, thus hiding the details", () => {
            let material: Model.Material = Model.Factory.createMaterial();
            material.serialNumberRequests = Enums.YesNo.Yes;
            material.showDetails = true;
            return expect(component.toggleDetails(material)).toBeFalsy(
                "Material's detail/serial numbers should end up hidden."
            );
        });

        it("Scanned material should NOT exist, should enter in the catch", () => {
            let execute = async () => {
                component.currentScan = Enums.ReceptionScanner.Material;
                component.scanData = "ERROR";
                await component.processBarcodeScan(component.scanData);

                return expect(component.material.materialId).toBe("",
                    "Scanned material should exist."
                );
            };
            return execute();
        });

        it("Scanned material should NOT exist, should enter in the else with the operation object result", () => {
            let execute = async () => {
                component.currentScan = Enums.ReceptionScanner.Material;
                component.scanData = "NONE";
                await component.processBarcodeScan(component.scanData);

                return expect(component.material.materialId).toBe("",
                    "Scanned material should exist."
                );
            };
            return execute();
        });

        it("Should NOT show the barcode icon", () => {
            component.changeCurrentScan(Enums.ReceptionScanner.Batch);
            let result = component.showScanIcon(
                Enums.ReceptionScanner.Material
            );
            return expect(result).toBeFalsy("The icon should NOT be shown.");
        });

        it("Should NOT be able to add material to license, should throw an error", () => {
            let execute = async () => {
                component.material.barcodeId = "ERROR";
                let result = await component.addMaterialToLicense(
                    Enums.ReceptionAction.Insert
                );

                return expect(result).toBeFalsy(
                    "Should not be able to add material to license"
                );
            };

            return execute();
        });

        it("Should NOT be able to add material to license, should go into else not into the catch", () => {
            let execute = async () => {
                component.material.barcodeId = "NONE";
                let result = await component.addMaterialToLicense(
                    Enums.ReceptionAction.Insert
                );

                return expect(result).toBeFalsy(
                    "Should not be able to add material to license"
                );
            };

            return execute();
        });

    });
});
