import { Component } from "@angular/core";
import { Platform, App } from "ionic-angular";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { TranslateService } from "@ngx-translate/core";
import { ViewController } from "ionic-angular/navigation/view-controller";
import { NavigationProvider } from "../providers/navigation/navigation";
import { UserInteractionProvider } from "../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../providers/translate/translate";
import { Enums } from "../enums/enums";
import { DeviceProvider } from "../providers/device/device";

@Component({
    templateUrl: "app.html"
})
export class Swift3pl {
    rootPage: any;

    constructor(
        private platform: Platform,
        private statusBar: StatusBar,
        private splashScreen: SplashScreen,
        private app: App,
        private navigation: NavigationProvider,
        private userInteraction: UserInteractionProvider,
        private translateProvider: TranslateProvider,
        public translate: TranslateService,
        public device: DeviceProvider
    ) {
        this.initializeApp();
    }

    /**
     *
     */

    initializeApp() {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.rootPage = "StartSessionPage";
            this.translate.addLangs(["en", "es"]);
            this.translate.setDefaultLang("en");
            let userLang = navigator.language.split("-")[0];
            this.translate.use(userLang);
        });

        this.platform.registerBackButtonAction(() => {
            let nav = this.app.getActiveNav();
            let activeView: ViewController = nav.getActive();

            if (activeView != null) {
                if (typeof activeView.instance.backButtonAction === "function")
                    activeView.instance.backButtonAction();
                else if (typeof activeView.instance.workspace !== "undefined") {
                    if (this.navigation.shouldExitApp()) {
                        this.promptExitApp();
                    } else {
                        this.navigation.popPage(
                            activeView.instance.workspace,
                            nav
                        );
                    }
                } else {
                    this.promptExitApp();
                }
            }
        });
    }

    async promptExitApp() {
        let message = await this.translateProvider.translateGroupValue(
            Enums.Translation.Groups.Messages,
            Enums.Translation.Message.ConfirmExit
        );

        let result = await this.userInteraction.showConfirmMessage(message);
        if (result === Enums.YesNo.Yes) {
            this.device.exitApp();
        }
    }
}
