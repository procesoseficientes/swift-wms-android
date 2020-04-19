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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const models_1 = require("../../models/models");
const forms_1 = require("@angular/forms");
const login_id_validator_1 = require("../../components/validators/login-id.validator");
const security_1 = require("../../providers/security/security");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const device_1 = require("../../providers/device/device");
const app_version_1 = require("@ionic-native/app-version");
let StartSessionPage = class StartSessionPage {
    constructor(navCtrl, navParams, userInteraction, formBuilder, security, device, settings, appVersion) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userInteraction = userInteraction;
        this.formBuilder = formBuilder;
        this.security = security;
        this.device = device;
        this.settings = settings;
        this.appVersion = appVersion;
        this.version = "1";
        this.versionCode = "10";
        this.isAndroid = false;
        this.userCredentials = models_1.Model.Factory.createUserCredentials();
    }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            password: ["", []],
            loginId: login_id_validator_1.LoginIdValidator.createLoginIdFormControl()
        });
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = false;
            this.isAndroid = yield this.device.isAndroid();
            this.setLoginId(this.settings.loginId);
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
            this.versionCode = String(yield this.appVersion.getVersionCode());
            this.userInteraction.version = `V.${this.version}@`;
        });
    }
    showVersionCode() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction
                .toast(this.versionCode, enums_1.Enums.ToastTime.Short)
                .present();
        });
    }
    setLoginId(loginId) {
        this.loginForm.controls.loginId.setValue(loginId);
    }
    userWantsExitApp() {
        this.device.exitApp();
    }
    userWantsCheckPin() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userCredentials.loginId = this.userCredentials.loginId.toLocaleUpperCase();
            return this.userInteraction
                .promptForValue(enums_1.Enums.Translation.Title.EnterYourPin, enums_1.Enums.Translation.Message.VerifyPin, enums_1.Enums.Translation.PlaceHolder.Pin, enums_1.Enums.PromptType.Number)
                .then(pin => {
                this.userInteraction.showLoading();
                this.userCredentials.password = pin.toString();
                this.userCredentials.deviceId =
                    this.device.getUuid() || this.userCredentials.deviceId;
                return this.validateUserPin(this.userCredentials);
            });
        });
    }
    saveUserSettings(userCredentials) {
        this.settings.loginId = userCredentials.loginId;
        this.settings.userCredentials = userCredentials;
    }
    saveCredentials(userCredentials, loginInfo) {
        userCredentials.dbPassword = loginInfo.Domain.password;
        userCredentials.dbUser = loginInfo.Domain.user;
        userCredentials.serverIp = loginInfo.Domain.server;
        userCredentials.domain = loginInfo.Domain.domain;
        userCredentials.userName = loginInfo.loginName;
    }
    validateUserPin(userCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let login = yield this.security.validateCredentials(userCredentials);
                if (login.loginStatus == enums_1.Enums.StatusLogin.active) {
                    this.saveCredentials(userCredentials, login);
                    this.saveUserSettings(userCredentials);
                    yield this.userInteraction.showLoading();
                    yield this.navCtrl.setRoot(enums_1.Enums.Page.VerifyEnvironment);
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UserIsBloqued);
                    return Promise.resolve(true);
                }
            }
            catch (reason) {
                this.userInteraction.hideLoading();
                this.userInteraction.showError(reason);
                return Promise.resolve(false);
            }
        });
    }
    formIsNotValid() {
        return !this.loginForm.valid;
    }
};
StartSessionPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-start-session",
        templateUrl: "start-session.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        user_interaction_1.UserInteractionProvider,
        forms_1.FormBuilder,
        security_1.SecurityProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        app_version_1.AppVersion])
], StartSessionPage);
exports.StartSessionPage = StartSessionPage;
//# sourceMappingURL=start-session.js.map