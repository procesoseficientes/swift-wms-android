import { async, TestBed } from "@angular/core/testing";
import {
    IonicModule,
    Platform,
    NavController,
    NavParams,
    App
} from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import {
    NavControllerMock,
    NavParamsMock,
    StatusBarMock,
    PlatformMock,
    SplashScreenMock,
    AppMock
} from "ionic-mocks";
import { Swift3pl } from "./app.component";
import { TranslatePipe as TranslatePipeMock } from "../mocks/ngx-translate-service/translate.pipe";
import { TranslateService } from "@ngx-translate/core";
import { TranslateService as TranslateServiceMock } from "../mocks/ngx-translate-service/translate.service";
import { NavigationProvider } from "../providers/navigation/navigation";
import { NavigationProvider as NavigationProviderMock } from "../providers/navigation/navigation.mock";
import { UserInteractionProvider } from "../providers/user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../providers/user-interaction/user-interaction.mock";
import { TranslateProvider } from "../providers/translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../providers/translate/translate.mock";
import { DeviceProvider } from "../providers/device/device";
import { DeviceProvider as DeviceProviderMock } from "../providers/device/device.mock";

describe("Swift3pl Component", () => {
    let fixture: any;
    let component: Swift3pl;

    beforeEach(
        async(() => {
            let navController = NavControllerMock.instance();
            let navParams = NavParamsMock.instance();
            let userInteraction = new UserInteractionProviderMock("123");
            let statusBar = StatusBarMock.instance();
            let platform = PlatformMock.instance();
            let splashScreen = SplashScreenMock.instance();
            let app = AppMock.instance();
            let deviceMock = DeviceProviderMock.instance(userInteraction);

            TestBed.configureTestingModule({
                declarations: [Swift3pl, TranslatePipeMock],
                imports: [IonicModule.forRoot(Swift3pl)],
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
                    {
                        provide: StatusBar,
                        useValue: statusBar
                    },
                    {
                        provide: Platform,
                        useValue: platform
                    },
                    {
                        provide: SplashScreen,
                        useValue: splashScreen
                    },
                    {
                        provide: App,
                        useValue: app
                    },
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    },
                    {
                        provide: TranslateService,
                        useClass: TranslateServiceMock
                    },
                    {
                        provide: NavigationProvider,
                        useClass: NavigationProviderMock
                    },
                    {
                        provide: DeviceProvider,
                        useValue: deviceMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(Swift3pl);
        component = fixture.componentInstance;
    });

    it("Should be created", () => {
        expect(component instanceof Swift3pl).toBe(true);
    });
});
