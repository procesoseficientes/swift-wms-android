"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const enums_1 = require("../../enums/enums");
const navigation_1 = require("../../providers/navigation/navigation");
// import { WorkspacePage } from "../workspace/workspace";
// import { MyTasksPage } from "../my-tasks/my-tasks";
// import { TaskSentPage } from "../task-sent/task-sent";
// import { InfoCenterPage } from "../info-center/info-center";
// import { MoreTransactionsPage } from "../more-transactions/more-transactions";
const device_1 = require("../../providers/device/device");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const translate_1 = require("../../providers/translate/translate");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const app_version_1 = require("@ionic-native/app-version");
let MenuSidePage = class MenuSidePage {
    constructor(navCtrl, navigation, menuCtrl, device, userInteraction, translate, appVersion, settings) {
        this.navCtrl = navCtrl;
        this.navigation = navigation;
        this.menuCtrl = menuCtrl;
        this.device = device;
        this.userInteraction = userInteraction;
        this.translate = translate;
        this.appVersion = appVersion;
        this.settings = settings;
        this.rootPage = "WorkspacePage";
        this.version = "1";
        this.isAndroid = false;
        this.loginId = "";
        this.loginName = "";
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction.hideLoading();
            this.isAndroid = false;
            this.isAndroid = yield this.device.isAndroid();
            this.loginId = this.settings.loginId;
            this.loginName = this.settings.userCredentials.userName;
            if (this.isAndroid) {
                this.getVersion();
            }
            else {
                this.userInteraction.version = `V.${this.version}@`;
            }
        });
    }
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            this.version = yield this.appVersion.getVersionNumber();
            this.userInteraction.version = `V.${this.version}@`;
        });
    }
    goToPrinterConfiguration() {
        return __awaiter(this, void 0, void 0, function* () {
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
            yield this.nav.getActiveChildNav().select(1);
            this.navigation.taskSentNavCtrl.setRoot(enums_1.Enums.Page.PrinterConfiguration, {});
            this.navigation.tabs[1].navigationStack.push(enums_1.Enums.Page.PrinterConfiguration);
            this.navigation.changeActiveTab(enums_1.Enums.Page.TaskSent);
            this.menuCtrl.close();
        });
    }
    userWantsExitApp() {
        return __awaiter(this, void 0, void 0, function* () {
            let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Messages, enums_1.Enums.Translation.Message.ConfirmExit);
            let result = yield this.userInteraction.showConfirmMessage(message);
            if (result === enums_1.Enums.YesNo.Yes) {
                this.device.exitApp();
            }
        });
    }
};
__decorate([
    core_1.ViewChild(ionic_angular_1.Nav),
    __metadata("design:type", ionic_angular_1.Nav)
], MenuSidePage.prototype, "nav", void 0);
MenuSidePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-menu-side",
        templateUrl: "menu-side.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        navigation_1.NavigationProvider,
        ionic_angular_1.MenuController,
        device_1.DeviceProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        app_version_1.AppVersion,
        user_settings_1.UserSettingsProvider])
], MenuSidePage);
exports.MenuSidePage = MenuSidePage;
//# sourceMappingURL=menu-side.js.map