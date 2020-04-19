import { Injectable, NgZone } from "@angular/core";
import { BatteryStatusResponse } from "@ionic-native/battery-status";
import { Observable } from "rxjs/Observable";
import { Model } from "../../models/models";
import { DeviceDummyProvider } from "./device.dummy";
import { IDevice } from "./idevice";
import { DeviceProviderNative } from "./device.native";
import { Subscription } from "rxjs/Subscription";
import { BatteryStatus } from "@ionic-native/battery-status";
import { Diagnostic } from "@ionic-native/diagnostic";
import { NetworkInterface } from "@ionic-native/network-interface";
import { Hotspot } from "@ionic-native/hotspot";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { Platform } from "ionic-angular";
import { UserInteractionProvider } from "../user-interaction/user-interaction";
import { Device } from "@ionic-native/device";

@Injectable()
export class DeviceProvider implements IDevice {
    private provider: DeviceProviderNative | DeviceDummyProvider;

    constructor(
        private diagnostic: Diagnostic,
        private batteryStatus: BatteryStatus,
        private networkInterface: NetworkInterface,
        private hotspot: Hotspot,
        private bluetoothSerial: BluetoothSerial,
        private platform: Platform,
        private zone: NgZone,
        private userInteraction: UserInteractionProvider,
        private device: Device
    ) {
        this.provider = !this.platform.is("android")
            ? new DeviceDummyProvider(
                  {
                      isPlugged: true,
                      level: 66
                  },
                  {
                      status: true,
                      icon: "close-circle",
                      iconColor: "danger",
                      ip: "10.0.0.1",
                      name: "MobilityFake"
                  },
                  {
                      status: true,
                      icon: "close-circle",
                      iconColor: "danger"
                  },
                  this.userInteraction
              )
            : new DeviceProviderNative(
                  this.diagnostic,
                  this.batteryStatus,
                  this.networkInterface,
                  this.hotspot,
                  this.bluetoothSerial,
                  this.platform,
                  this.device,
                  this.zone
              );
    }

    public scan(): Promise<any> {
        return this.provider.scan();
    }

    public subscribeToScanner(
        process: (data: string) => Promise<any>
    ): Subscription {
        return this.provider.subscribeToScanner(process);
    }

    public getBatteryLevel(): Observable<BatteryStatusResponse> {
        return this.provider.getBatteryLevel();
    }

    public getBluetoothState(): Promise<Model.BluetoothInfo> {
        return this.provider.getBluetoothState();
    }

    public getWirelessInfo(): Promise<Model.WirelessInfo> {
        return this.provider.getWirelessInfo();
    }

    public takePicture(): Promise<string> {
        return this.provider.takePicture();
    }

    public sleep(time: number): Promise<any> {
        return this.provider.sleep(time);
    }

    public exitApp(): void {
        this.provider.exitApp();
    }

    public getUuid(): string {
        return this.provider.getUuid();
    }

    public subscribeToEvents() {
        this.provider.subscribeToEvents();
    }

    public unsubscribeToEvents() {
        this.provider.unsubscribeToEvents();
    }

    public isAndroid(): boolean {
        return this.platform.is("android");
    }

    /**
     * Search only integer numbers on the 'currentValues' array
     * @param currentValues must be an array of current values on the input
     */
    public getIntegerNumbers(
        currentValues: Array<any>,
    ): Promise<Array<number>> {
        return this.provider.getIntegerNumbers(
            currentValues,
        );
    }
}
