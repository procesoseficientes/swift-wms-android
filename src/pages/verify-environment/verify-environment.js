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
const device_1 = require("../../providers/device/device");
const core_2 = require("@angular/core");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const app_update_1 = require("@ionic-native/app-update");
let VerifyEnvironmentPage = class VerifyEnvironmentPage {
    constructor(navCtrl, device, zone, settings, userInteraction, appUpdate) {
        this.navCtrl = navCtrl;
        this.device = device;
        this.zone = zone;
        this.settings = settings;
        this.userInteraction = userInteraction;
        this.appUpdate = appUpdate;
        this.batteryLevel = 0;
        this.lastUserLogged = "";
        this.isAndroid = false;
    }
    checkBattery() {
        this.device
            .getBatteryLevel()
            .subscribe((status) => {
            this.batteryLevel = status.level;
            this.zone.run(() => { }); // FIXME: Remove this import and bind field to observable
        });
    }
    checkWireless() {
        this.device.getWirelessInfo().then(wirelessInfo => {
            this.wirelessInfo = wirelessInfo;
        });
    }
    checkBluetooth() {
        this.device.getBluetoothState().then(bluetoothInfo => {
            this.bluetoothInfo = bluetoothInfo;
        });
    }
    checkLastUserLogged() {
        this.lastUserLogged = this.settings.loginId;
    }
    userWantsCheckWireless() {
        this.checkWireless();
    }
    userWantsCheckBluetooth() {
        this.checkBluetooth();
    }
    userWantsExitApp() {
        this.device.exitApp();
    }
    userWantStartSession() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            return this.navCtrl.setRoot("MenuSidePage");
        });
    }
    userWantsCheckBattery() {
        this.checkBattery();
    }
    userWantsToCheckLastUserLogged() {
        this.checkLastUserLogged();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.checkBluetooth();
            this.checkWireless();
            this.checkLastUserLogged();
            this.checkBattery();
            this.userInteraction.hideLoading();
            this.isAndroid = yield this.device.isAndroid();
            if (this.isAndroid) {
                var updateUrl = `${this.settings.userCredentials.communicationAddress}/v3/updateXml`;
                let result = yield this.appUpdate
                    .checkAppUpdate(updateUrl)
                    .then(() => { });
                return result;
            }
        });
    }
};
VerifyEnvironmentPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-verify-environment",
        templateUrl: "verify-environment.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        device_1.DeviceProvider,
        core_2.NgZone,
        user_settings_1.UserSettingsProvider,
        user_interaction_1.UserInteractionProvider,
        app_update_1.AppUpdate])
], VerifyEnvironmentPage);
exports.VerifyEnvironmentPage = VerifyEnvironmentPage;
//# sourceMappingURL=verify-environment.js.map