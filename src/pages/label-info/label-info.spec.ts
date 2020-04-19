import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { LabelInfoPage } from "./label-info";
import { NavController, NavParams } from "ionic-angular";
import { NavControllerMock, NavParamsMock } from "ionic-mocks";
import { TranslatePipe as TranslatePipeMock } from "../../mocks/ngx-translate-service/translate.pipe";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../../providers/user-interaction/user-interaction.mock";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../../providers/navigation/navigation.mock";
import { WorkspacePage } from "../workspace/workspace";
import { LabelProvider } from "../../providers/label/label";
import { LabelProvider as LabelProviderMock } from "../../providers/label/label.mock";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../../providers/user-settings/user-settings.mock";
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";
import { Model } from "../../models/models";

describe("GeneralReceptionPage Component", () => {
    let fixture: any;
    let component: LabelInfoPage;
    let navParams = NavParamsMock.instance();

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();

            navParams.data = <Model.LabelInfoParams>{
                labelId: 3
            };
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [LabelInfoPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(LabelInfoPage)
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
                        provide: UserSettingsProvider,
                        useValue: userSettings
                    },
                    {
                        provide: LabelProvider,
                        useClass: LabelProviderMock
                    },
                    {
                        provide: PrinterProvider,
                        useValue: PrinterProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(LabelInfoPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
        component.printLabel();
    });

    it("Should be created", () => {
        return expect(component instanceof LabelInfoPage).toBe(true);
    });

    describe("Valid tests", () => {
        it("Should get Material info", () => {
            let execute = async () => {
                await component.loadLabelInfo();

                return expect(component.labelInfo.licenseId).toBe(
                    378237,
                    "Component's should return a object with valid info"
                );
            };
            return execute();
        });
    });

    describe("Invalid tests", () => {
        beforeEach(() => {
            component.navParams.data = <Model.LabelInfoParams>{
                labelId: 1
            };
            loadComponent();
        });
        it("Should not get Material info", () => {
            let execute = async () => {
                await component.loadLabelInfo();

                return expect(component.labelInfo.licenseId).toBe(
                    0,
                    "Component's should not return a object with valid info"
                );
            };
            return execute();
        });
    });
});
