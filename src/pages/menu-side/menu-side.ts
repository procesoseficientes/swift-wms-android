import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, Nav, MenuController } from "ionic-angular";
import { Enums } from "../../enums/enums";
import { NavigationProvider } from "../../providers/navigation/navigation";
// import { WorkspacePage } from "../workspace/workspace";
// import { MyTasksPage } from "../my-tasks/my-tasks";
// import { TaskSentPage } from "../task-sent/task-sent";
// import { InfoCenterPage } from "../info-center/info-center";
// import { MoreTransactionsPage } from "../more-transactions/more-transactions";

import { DeviceProvider } from "../../providers/device/device";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../../providers/translate/translate";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { AppVersion } from "@ionic-native/app-version";

@IonicPage()
@Component({
    selector: "page-menu-side",
    templateUrl: "menu-side.html"
})
export class MenuSidePage {
    @ViewChild(Nav) nav: Nav;
    rootPage: string = "WorkspacePage";
    version: string = "1";
    isAndroid: boolean = false;
    loginId: string = "";
    loginName: string = "";

    constructor(
        public navCtrl: NavController,
        public navigation: NavigationProvider,
        public menuCtrl: MenuController,
        public device: DeviceProvider,
        private userInteraction: UserInteractionProvider,
        private translate: TranslateProvider,
        private appVersion: AppVersion,
        private settings: UserSettingsProvider
    ) {}

    async ionViewDidLoad() {
        this.userInteraction.hideLoading();
        this.isAndroid = false;
        this.isAndroid = await this.device.isAndroid();
        this.loginId = this.settings.loginId;
        this.loginName = this.settings.userCredentials.userName;

        if (this.isAndroid) {
            this.getVersion();
        } else {
            this.userInteraction.version = `V.${this.version}@`;
        }
    }

    async getVersion() {
        this.version = await this.appVersion.getVersionNumber();
        this.userInteraction.version = `V.${this.version}@`;
    }

    async goToPrinterConfiguration() {
        // let alertMessage = await this.translate.translateGroupValue(
        //     Enums.Translation.Groups.Alerts,
        //     Enums.Translation.Alert.DoYouWantToProceedNewQuery
        // );

        //let navigationStack = this.navigation.tabs[1].navigationStack;
        // if (navigationStack.length > 0) {
        //     let userConfirm: Enums.YesNo = await this.userInteraction.showConfirmMessage(
        //         alertMessage
        //     );
        //     if (userConfirm === Enums.YesNo.Yes) {
        //         this.navigation.tabs[1].navigationStack.length = 0;
        //     } else {
        //         return;
        //     }
        // }
        this.navigation.tabs[1].navigationStack.length = 0;
        await this.nav.getActiveChildNav().select(1);
        this.navigation.taskSentNavCtrl.setRoot(
            Enums.Page.PrinterConfiguration,
            {}
        );
        this.navigation.tabs[1].navigationStack.push(
            Enums.Page.PrinterConfiguration
        );
        this.navigation.changeActiveTab(Enums.Page.TaskSent);
        this.menuCtrl.close();
    }

    async userWantsExitApp() {
        let message = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Messages,
            Enums.Translation.Message.ConfirmExit
        );

        let result = await this.userInteraction.showConfirmMessage(message);
        if (result === Enums.YesNo.Yes) {
            this.device.exitApp();
        }
    }
}
