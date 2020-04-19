import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Model, DataResponse } from "../../models/models";
import { FormGroup, FormBuilder } from "@angular/forms";
import { LoginIdValidator } from "../../components/validators/login-id.validator";
import { SecurityProvider } from "../../providers/security/security";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { DeviceProvider } from "../../providers/device/device";
import { AppVersion } from "@ionic-native/app-version";
@IonicPage()
@Component({
    selector: "page-start-session",
    templateUrl: "start-session.html"
})
export class StartSessionPage {
    userCredentials: Model.UserCredentials;
    loginForm: FormGroup;
    version: string = "1";
    versionCode: string = "10";
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userInteraction: UserInteractionProvider,
        private formBuilder: FormBuilder,
        private security: SecurityProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private appVersion: AppVersion
    ) {
        this.userCredentials = Model.Factory.createUserCredentials();
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            password: ["", []],
            loginId: LoginIdValidator.createLoginIdFormControl()
        });
    }

    async ionViewDidEnter(): Promise<void> {
        this.isAndroid = false;
        this.isAndroid = await this.device.isAndroid();
        this.setLoginId(this.settings.loginId);
        if (this.isAndroid) {
            this.getVersion();
        } else {
            this.userInteraction.version = `V.${this.version}@`;
        }
    }

    async getVersion() {
        this.version = await this.appVersion.getVersionNumber();
        this.versionCode = String(await this.appVersion.getVersionCode());
        this.userInteraction.version = `V.${this.version}@`;
    }

    async showVersionCode() {
        this.userInteraction
            .toast(this.versionCode, Enums.ToastTime.Short)
            .present();
    }

    public setLoginId(loginId: string): void {
        this.loginForm.controls.loginId.setValue(loginId);
    }

    public userWantsExitApp(): void {
        this.device.exitApp();
    }
    public async userWantsCheckPin(): Promise<boolean> {
        this.userCredentials.loginId = this.userCredentials.loginId.toLocaleUpperCase();
        return this.userInteraction
            .promptForValue<number>(
                Enums.Translation.Title.EnterYourPin,
                Enums.Translation.Message.VerifyPin,
                Enums.Translation.PlaceHolder.Pin,
                Enums.PromptType.Number
            )
            .then(pin => {
                this.userInteraction.showLoading();
                this.userCredentials.password = pin.toString();
                this.userCredentials.deviceId =
                    this.device.getUuid() || this.userCredentials.deviceId;
                return this.validateUserPin(this.userCredentials);
            });
    }

    private saveUserSettings(userCredentials: Model.UserCredentials): void {
        this.settings.loginId = userCredentials.loginId;
        this.settings.userCredentials = userCredentials;
    }

    private saveCredentials(
        userCredentials: Model.UserCredentials,
        loginInfo: DataResponse.Login
    ): void {
        userCredentials.dbPassword = loginInfo.Domain.password;
        userCredentials.dbUser = loginInfo.Domain.user;
        userCredentials.serverIp = loginInfo.Domain.server;
        userCredentials.domain = loginInfo.Domain.domain;
        userCredentials.userName = loginInfo.loginName;
    }

    public async validateUserPin(
        userCredentials: Model.UserCredentials
    ): Promise<boolean> {
        try {
            let login: DataResponse.Login = await this.security.validateCredentials(
                userCredentials
            );
            if (login.loginStatus == Enums.StatusLogin.active) {
                this.saveCredentials(userCredentials, login);
                this.saveUserSettings(userCredentials);

                await this.userInteraction.showLoading();
                await this.navCtrl.setRoot(Enums.Page.VerifyEnvironment);
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.UserIsBloqued
                );
                return Promise.resolve(true);
            }
        } catch (reason) {
            this.userInteraction.hideLoading();
            this.userInteraction.showError(reason);

            return Promise.resolve(false);
        }
    }

    public formIsNotValid(): boolean {
        return !this.loginForm.valid;
    }
}
