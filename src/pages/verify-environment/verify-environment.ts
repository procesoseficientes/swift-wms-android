import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { DeviceProvider } from "../../providers/device/device";
import { BatteryStatusResponse } from "@ionic-native/battery-status";
import { Model } from "../../models/models";
import { NgZone } from "@angular/core";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { AppUpdate } from "@ionic-native/app-update";

@IonicPage()
@Component({
    selector: "page-verify-environment",
    templateUrl: "verify-environment.html"
})
export class VerifyEnvironmentPage {
    bluetoothInfo: Model.BluetoothInfo;
    wirelessInfo: Model.WirelessInfo;
    batteryLevel: number = 0;
    lastUserLogged: string = "";
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        private device: DeviceProvider,
        private zone: NgZone,
        private settings: UserSettingsProvider,
        private userInteraction: UserInteractionProvider,
        private appUpdate: AppUpdate
    ) {}

    private checkBattery(): void {
        this.device
            .getBatteryLevel()
            .subscribe((status: BatteryStatusResponse) => {
                this.batteryLevel = status.level;
                this.zone.run(() => {}); // FIXME: Remove this import and bind field to observable
            });
    }

    private checkWireless(): void {
        this.device.getWirelessInfo().then(wirelessInfo => {
            this.wirelessInfo = wirelessInfo;
        });
    }

    private checkBluetooth(): void {
        this.device.getBluetoothState().then(bluetoothInfo => {
            this.bluetoothInfo = bluetoothInfo;
        });
    }

    private checkLastUserLogged(): void {
        this.lastUserLogged = this.settings.loginId;
    }

    public userWantsCheckWireless(): void {
        this.checkWireless();
    }

    public userWantsCheckBluetooth(): void {
        this.checkBluetooth();
    }
    public userWantsExitApp() {
        this.device.exitApp();
    }
    public async userWantStartSession(): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navCtrl.setRoot("MenuSidePage");
    }

    public userWantsCheckBattery(): void {
        this.checkBattery();
    }

    public userWantsToCheckLastUserLogged(): void {
        this.checkLastUserLogged();
    }

    async ionViewDidEnter(): Promise<void> {
            this.checkBluetooth();
            this.checkWireless();
            this.checkLastUserLogged();
            this.checkBattery();
            this.userInteraction.hideLoading();
            this.isAndroid = await this.device.isAndroid();
            if (this.isAndroid) {
                var updateUrl = `${
                    this.settings.userCredentials.communicationAddress
                }/v3/updateXml`;

                let result = await this.appUpdate
                    .checkAppUpdate(updateUrl)
                    .then(() => {});
                return result;
            }

    }
}
