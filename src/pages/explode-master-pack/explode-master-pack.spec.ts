import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { ExplodeMasterPackPage } from "./explode-master-pack";
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
import { Model, DataResponse } from "../../models/models";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { LicenseProvider } from "../../providers/license/license";
import { LicenseProvider as LicenseProviderMock } from "../../providers/license/license.mock";
import { MasterpackProvider } from "../../providers/masterpack/masterpack";
import { MasterpackProvider as MasterPackProviderMock } from "../../providers/masterpack/masterpack.mock";
import { Enums } from "../../enums/enums";

describe("RelocatePartialLicensePage Component", () => {
    let fixture: any;
    let component: ExplodeMasterPackPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();

            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);
            let navParams = NavParamsMock.instance();

            TestBed.configureTestingModule({
                declarations: [ExplodeMasterPackPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(ExplodeMasterPackPage)
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
                        provide: MasterpackProvider,
                        useClass: MasterPackProviderMock
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
                        provide: LicenseProvider,
                        useClass: LicenseProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(ExplodeMasterPackPage);
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
        return expect(component instanceof ExplodeMasterPackPage).toBe(true);
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

        it("Scanned license should exist and material is masterpack", () => {
            let execute = async () => {
                component.changeCurrentScan(Enums.MasterPackScan.LicenseId);
                expect(component.currentScan).toBe(
                    Enums.MasterPackScan.LicenseId,
                    "Component's currentScan value should be License"
                );

                component.scanData = "480440";
                let result = await component.processBarcodeScan(
                    component.scanData
                );
                expect(result).toBeTruthy("ScanBarcode Result should be true.");
                expect(component.licenseId).toBe(
                    480440,
                    "Component's license's current batch should be the same as scanned before"
                );

                component.changeCurrentScan(
                    Enums.MasterPackScan.MaterialBarcode
                );
                expect(component.currentScan).toBe(
                    Enums.MasterPackScan.MaterialBarcode,
                    "Component's currentScan value should be Material"
                );

                component.scanData = "viscosa/MS00001";
                result = await component.processBarcodeScan(component.scanData);

                return expect(component.material.MATERIAL_ID).toBe(
                    "viscosa/MS00001",
                    "Component's material's current batch should be the same as scanned before"
                );
            };
            return execute();
        });

        it("Explode MasterPack should success", () => {
            let execute = async () => {
                component.changeCurrentScan(Enums.MasterPackScan.LicenseId);
                expect(component.currentScan).toBe(
                    Enums.MasterPackScan.LicenseId,
                    "Component's currentScan value should be License"
                );

                component.scanData = "480440";
                let result = await component.processBarcodeScan(
                    component.scanData
                );
                expect(result).toBeTruthy("ScanBarcode Result should be true.");
                expect(component.licenseId).toBe(
                    480440,
                    "Component's license's current batch should be the same as scanned before"
                );

                component.changeCurrentScan(
                    Enums.MasterPackScan.MaterialBarcode
                );
                expect(component.currentScan).toBe(
                    Enums.MasterPackScan.MaterialBarcode,
                    "Component's currentScan value should be Material"
                );

                component.scanData = "viscosa/MS00001";
                result = await component.processBarcodeScan(component.scanData);

                expect(component.material.MATERIAL_ID).toBe(
                    "viscosa/MS00001",
                    "Component's material's current batch should be the same as scanned before"
                );

                let resultExplode = await component.explodeMasterPack();
                return expect(resultExplode).toBeTruthy(
                    "Operation result must be success!!"
                );
            };
            return execute();
        });
    });
});
