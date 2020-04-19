import {
    BatteryStatus,
    BatteryStatusResponse
} from "@ionic-native/battery-status";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { Events, Platform } from "ionic-angular";
import { Enums } from "../../enums/enums";
import { Observable } from "rxjs/Observable";
import { Diagnostic } from "@ionic-native/diagnostic";
import { Model } from "../../models/models";
import { NetworkInterface } from "@ionic-native/network-interface";
import { Hotspot } from "@ionic-native/hotspot";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { IDevice } from "./idevice";
import { Subscription } from "rxjs/Subscription";
import { NgZone } from "@angular/core";
import { Device } from "@ionic-native/device";

export class DeviceProviderNative implements IDevice {
    public static batteryStatusLevel: number;
    public static connectionStatus: string;
    public static isConnected: boolean = false;
    public static connectionColor: string;
    public static unattendedNotifications: number;

    private camera: Camera;
    private e: Events;

    constructor(
        private diagnostic: Diagnostic,
        private batteryStatus: BatteryStatus,
        private networkInterface: NetworkInterface,
        private hotspot: Hotspot,
        private bluetoothSerial: BluetoothSerial,
        private platform: Platform,
        private device: Device,
        private zone: NgZone
    ) {
        DeviceProviderNative.batteryStatusLevel = 100;
        DeviceProviderNative.connectionStatus = "";
        DeviceProviderNative.unattendedNotifications = 0;
    }

    public scan(): Promise<boolean> {
        //FIXME: We must return EMDK plugin
        return Promise.resolve(true);
    }

    public subscribeToScanner(
        process: (data: string) => Promise<any>
    ): Subscription {
        return new Observable(observer => {
            this.zone.runOutsideAngular(() => {
                (<any>window).plugins.intentShim.registerBroadcastReceiver(
                    {
                        filterActions: ["com.ionic.datawedge.ACTION"],
                        filterCategories: [
                            "com.android.intent.category.DEFAULT"
                        ]
                    },
                    (intent: any) => {
                        this.zone.run(() => {
                            let data =
                                intent.extras[
                                    "com.symbol.datawedge.data_string"
                                ];
                            observer.next(data); //FIXME: This observer must complete in a proper way
                        });
                    }
                );
            });
        }).subscribe(process);
    }

    public getBatteryLevel(): Observable<BatteryStatusResponse> {
        return this.batteryStatus.onChange();
    }

    public getBluetoothState(): Promise<Model.BluetoothInfo> {
        let bluetoothInfo: Model.BluetoothInfo = Model.Factory.createBluetoothInfo();

        return this.bluetoothSerial
            .isEnabled()
            .then(() => {
                bluetoothInfo.status = true;
                bluetoothInfo.icon = "checkmark-circle";
                bluetoothInfo.iconColor = "success";
                return Promise.resolve(bluetoothInfo);
            })
            .catch(() => {
                return Promise.resolve(bluetoothInfo);
            });
    }

    public getWirelessInfo(): Promise<Model.WirelessInfo> {
        let wirelessInfo: Model.WirelessInfo = Model.Factory.createWirelessInfo();
        let resultSet: { ipAddress: 0; hotSpotConnectionInfo: 1 } = {
            ipAddress: 0,
            hotSpotConnectionInfo: 1
        };

        return this.diagnostic
            .isWifiAvailable()
            .then(() => {
                return Promise.all([
                    this.networkInterface.getWiFiIPAddress(),
                    this.hotspot.getConnectionInfo()
                ]).then(arrResult => {
                    wirelessInfo.status = true;
                    wirelessInfo.icon = "checkmark-circle";
                    wirelessInfo.iconColor = "success";
                    wirelessInfo.ip = arrResult[resultSet.ipAddress];
                    wirelessInfo.name =
                        arrResult[resultSet.hotSpotConnectionInfo].SSID;
                    return Promise.resolve(wirelessInfo);
                });
            })
            .catch(() => {
                return Promise.resolve(wirelessInfo);
            });
    }

    private get cameraOptions(): CameraOptions {
        return {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.PNG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.CAMERA,
            targetWidth: 800,
            targetHeight: 600,
            correctOrientation: true
        };
    }

    public takePicture(): Promise<string> {
        return this.camera.getPicture(this.cameraOptions);
    }

    public sleep(time: number): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    public exitApp(): void {
        this.platform.exitApp();
    }

    public getUuid(): string {
        return this.device.uuid;
    }

    public subscribeToEvents() {
        this.batteryStatus.onChange().subscribe((status: any) => {
            DeviceProviderNative.batteryStatusLevel = status.level; // FIXME: This variable must bind with the obversable method
        });

        this.e.subscribe(Enums.Messages.ConnectionChange, (status: any) => {
            DeviceProviderNative.connectionStatus = status.iconName;
            DeviceProviderNative.isConnected = status.connected;
            DeviceProviderNative.connectionColor = status.color;
        });
    }

    public unsubscribeToEvents() {
        this.e.unsubscribe(Enums.Messages.ConnectionChange);
    }

    isAndroid(): boolean {
        return true;
    }

    /**
     * Search only integer numbers on the 'currentValues' array
     * @param currentValues must be an array of current values on the input
     */
    public getIntegerNumbers(
        currentValues: Array<any>,
    ): Promise<Array<number>> {
        //Array for only valid values
        let newValues: Array<number> = [];

        //For each value, verify if it's number
        currentValues.forEach((value: string) => {
            let parsedValue = parseInt(value);

            //If parsed value is number, that must be allowed
            if (!isNaN(parsedValue)) {
                newValues.push(parsedValue);
            }
        });

        return Promise.resolve(newValues);
    }
}
