import { async, TestBed } from "@angular/core/testing";
import { IonicModule } from "ionic-angular";
import { PrinterConfigurationPage } from "./printer-configuration";
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
import { PrinterProvider } from "../../providers/printer/printer";
import { PrinterProvider as PrinterProviderMock } from "../../providers/printer/printer.mock";
import { PipesModule } from "../../pipes/pipes.module";

describe("PrinterConfigurationPage Component", () => {
    let fixture: any;
    let component: PrinterConfigurationPage;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = UserInteractionProviderMock.instance("123");
            let userSettings = UserSettingsProviderMock.instance();

            TestBed.configureTestingModule({
                declarations: [PrinterConfigurationPage, TranslatePipeMock],
                imports: [
                    IonicModule.forRoot(PrinterConfigurationPage),
                    PipesModule
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
                        provide: PrinterProvider,
                        useClass: PrinterProviderMock
                    }
                ]
            });
        })
    );

    const loadComponent = () => {
        fixture = TestBed.createComponent(PrinterConfigurationPage);
        component = fixture.componentInstance;
        component.ionViewDidEnter();
    };

    beforeEach(() => {
        loadComponent();
    });

    it("Should be created", () => {
        return expect(component instanceof PrinterConfigurationPage).toBe(true);
    });

    describe("Valid tests", () => {

        it("Should link a printer", () => {
            let execute = async () => {
                await component.refreshPrinters(null);
                component.selectedOption = "ABC";
                let result = await component.linkPrinter();

                return expect(result.friendlyName).toBe("Printer#1", "Should link to printer with friendlyName Printer#1");
            };
            return execute();
        });

        it("Should print test document", () => {
            let execute = async () => {
                let result = await component.printTest();

                return expect(result).toBeFalsy("Should be unable to print test.");
            };
            return execute();
        });

        it("Should refresh printers", () => {
            let execute = async () => {
                await component.refreshPrinters(null);

                return expect(component.printers.length).toBe(
                    3,
                    "Result length should be 3"
                );
            };
            return execute();
        });
    });
});
