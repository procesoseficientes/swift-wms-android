import { Observable } from "rxjs/Observable";
import { BatteryStatusResponse } from "@ionic-native/battery-status";
import { Model } from "../../models/models";
import { Subscription } from "rxjs/Subscription";

export interface IDevice {
    scan(): Promise<boolean>;

    subscribeToScanner(process: (data: string) => Promise<any>): Subscription;

    getBatteryLevel(): Observable<BatteryStatusResponse>;

    getBluetoothState(): Promise<Model.BluetoothInfo>;

    getWirelessInfo(): Promise<Model.WirelessInfo>;

    takePicture(): Promise<string>;

    sleep(_time: number): Promise<any>;

    subscribeToEvents(): void;

    unsubscribeToEvents(): void;

    exitApp(): void;

    getUuid(): string;

    isAndroid(): boolean;
}
