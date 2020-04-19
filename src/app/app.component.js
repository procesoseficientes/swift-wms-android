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
const status_bar_1 = require("@ionic-native/status-bar");
const splash_screen_1 = require("@ionic-native/splash-screen");
const core_2 = require("@ngx-translate/core");
const navigation_1 = require("../providers/navigation/navigation");
const user_interaction_1 = require("../providers/user-interaction/user-interaction");
const translate_1 = require("../providers/translate/translate");
const enums_1 = require("../enums/enums");
const device_1 = require("../providers/device/device");
let Swift3pl = class Swift3pl {
    constructor(platform, statusBar, splashScreen, app, navigation, userInteraction, translateProvider, translate, device) {
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.app = app;
        this.navigation = navigation;
        this.userInteraction = userInteraction;
        this.translateProvider = translateProvider;
        this.translate = translate;
        this.device = device;
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
            let activeView = nav.getActive();
            if (activeView != null) {
                if (typeof activeView.instance.backButtonAction === "function")
                    activeView.instance.backButtonAction();
                else if (typeof activeView.instance.workspace !== "undefined") {
                    if (this.navigation.shouldExitApp()) {
                        this.promptExitApp();
                    }
                    else {
                        this.navigation.popPage(activeView.instance.workspace, nav);
                    }
                }
                else {
                    this.promptExitApp();
                }
            }
        });
    }
    promptExitApp() {
        return __awaiter(this, void 0, void 0, function* () {
            let message = yield this.translateProvider.translateGroupValue(enums_1.Enums.Translation.Groups.Messages, enums_1.Enums.Translation.Message.ConfirmExit);
            let result = yield this.userInteraction.showConfirmMessage(message);
            if (result === enums_1.Enums.YesNo.Yes) {
                this.device.exitApp();
            }
        });
    }
};
Swift3pl = __decorate([
    core_1.Component({
        templateUrl: "app.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.Platform,
        status_bar_1.StatusBar,
        splash_screen_1.SplashScreen,
        ionic_angular_1.App,
        navigation_1.NavigationProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        core_2.TranslateService,
        device_1.DeviceProvider])
], Swift3pl);
exports.Swift3pl = Swift3pl;
//# sourceMappingURL=app.component.js.map