import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { ManifiestCertificationSeriesPage } from "./manifiest-certification-series";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { DeviceProvider } from "../../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../../providers/device/device.mock";
import { ManifestCertificationProvider } from "../../providers/manifest-certification/manifest-certification";
import { ManifestCertificationProvider as ManifestCertificationProviderMock } from "../../providers/manifest-certification/manifest-certification.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { TranslateProvider } from "../../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../../providers/translate/translate.mock";

describe("InfoCenterPage Component", () => {
    let fixture: any;
    let component: ManifiestCertificationSeriesPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            let deviceMock = DeviceProviderMock.instance(userInteraction);
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [
                    ManifiestCertificationSeriesPage,
                    TranslatePipeMock
                ],
                imports: [
                    IonicModule.forRoot(ManifiestCertificationSeriesPage)
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
                        provide: ManifestCertificationProvider,
                        useClass: ManifestCertificationProviderMock
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(ManifiestCertificationSeriesPage);
        component = fixture.componentInstance;
    };

    beforeEach(() => {
        loadComponent();
    });

    afterAll(() => {
        component.ionViewDidLeave();
    });

    it("Should be created", () => {
        return expect(
            component instanceof ManifiestCertificationSeriesPage
        ).toBe(true);
    });

    describe("Valid Tests", () => {
        it("getProcessedSeries", () => {
            let execute = async () => {
                component.materialId = "viscosa/VCA1030";
                component.certificationId = 123;
                let result = await component.getProcessedSeries();

                return expect(result.length).toBe(
                    4,
                    "Result should fetch 4 serial numbers."
                );
            };
            return execute();
        });

        it("insertSerie", () => {
            let execute = async () => {
                component.materialId = "viscosa/VCA1030";
                component.certificationId = 123;
                let result = await component.insertSerie("ABC");

                return expect(result.DbData).toBe(
                    "15",
                    "Result DbData should be 15"
                );
            };
            return execute();
        });

        it("deleteSerie", () => {
            let execute = async () => {
                component.materialId = "viscosa/VCA1030";
                component.certificationId = 123;
                let result = await component.deleteSerie("ABC");

                return expect(result.DbData).toBe(
                    "ABC",
                    "Result DbData should be ABC"
                );
            };
            return execute();
        });

        it("validateCompletedCertification", () => {
            let execute = async () => {
                component.certificationId = 123;
                let result = await component.validateCompletedCertification();

                return expect(Number(result.DbData)).toBeGreaterThan(
                    10,
                    "Result DbData should be greater than 10"
                );
            };
            return execute();
        });

        it("markCertificationAsCompleted", () => {
            let execute = async () => {
                component.certificationId = 123;
                component.manifestId = "MC-1234";
                let result = await component.markCertificationAsCompleted();

                expect(result.Codigo).toBe(
                    1234,
                    "Result Codigo should be 1234"
                );

                return expect(Number(result.DbData)).toBe(
                    123,
                    "Result DbData should be greater than 123"
                );
            };
            return execute();
        });
    });
});
