import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Model, DataResponse } from "../../models/models";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { SecurityProvider } from "../../providers/security/security";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { DeviceProvider } from "../../providers/device/device";
import { AppVersion } from "@ionic-native/app-version";
import { ApiClientV3Provider } from "../../providers/api-client/api-client.v3";
import { File } from '@ionic-native/file';
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
        private appVersion: AppVersion,
        private api: ApiClientV3Provider, 
        private file: File
    ) {
        this.userCredentials = Model.Factory.createUserCredentials();
    }

    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            password: ["", []],
            loginId: ['', [Validators.pattern("^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z])$")]]
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
    public userWantsCheckPin() {
        this.userCredentials.loginId = this.userCredentials.loginId.toLocaleUpperCase();
        this.userInteraction
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
            this.validateUserPin(this.userCredentials);
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

    public validateUserPin(
        userCredentials: Model.UserCredentials
    ) {
        this.file.checkFile(this.file.externalApplicationStorageDirectory, 'conf.json').then(
            _ => {
                console.log('conf exists')
                this.file.readAsText(this.file.externalApplicationStorageDirectory, 'conf.json').then(val => {
                    console.log(val)
                    const conf = JSON.parse(val)
                    userCredentials.communicationAddress = conf.url  
                    

                    this.api.login(userCredentials).then(
                        login => {
                            if (login.loginStatus == Enums.StatusLogin.active) {
                                this.saveCredentials(userCredentials, login);
                                this.saveUserSettings(userCredentials);
                
                                this.userInteraction.showLoading();
                                this.navCtrl.setRoot(Enums.Page.VerifyEnvironment);
                            } else {
                                this.userInteraction.hideLoading();
                                this.userInteraction.showCustomError(
                                    Enums.CustomErrorCodes.UserIsBloqued
                                );
                            }
                        }
                    ).catch(
                        reason => {
                            this.userInteraction.hideLoading();
                            this.userInteraction.showError(reason);
                        }
                    )
                }).catch(err => {
                    console.error(err)
                    throw err
                })
            }).catch(err => {
                console.error('conf doesn\'t exist', err)
                this.file.writeFile(this.file.externalApplicationStorageDirectory, 'conf.json', '{"url":"localhost:6661"}', {replace: true})
                throw "No hay archivo de configuración en el telefono"
            }
        );
    }

    public formIsNotValid(): boolean {
        return !this.loginForm.valid;
    }
}
