import { Observable } from "rxjs/Observable";
import { Model } from "../../models/models";
import { DeviceDummyProvider } from "./device.dummy";
import { IDevice } from "./idevice";
import { BatteryStatusResponse } from "@ionic-native/battery-status";
import { Subscription } from "rxjs/Subscription";
import { UserInteractionProvider } from "../user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../user-interaction/user-interaction";

export class DeviceProvider implements IDevice {
    private provider: DeviceDummyProvider;

    constructor(
        userInteraction: UserInteractionProvider | UserInteractionProviderMock
    ) {
        this.provider = new DeviceDummyProvider(
            {
                isPlugged: true,
                level: 49
            },
            {
                status: false,
                icon: "close-circle",
                iconColor: "danger",
                ip: "10.0.0.1",
                name: "MobilityFake"
            },
            {
                status: false,
                icon: "close-circle",
                iconColor: "danger"
            },
            userInteraction
        );
    }

    public async scan(): Promise<boolean> {
        return this.provider.scan();
    }

    subscribeToScanner(process: (data: string) => Promise<any>): Subscription {
        return this.provider.subscribeToScanner(process);
    }

    public static instance(
        userInteraction: UserInteractionProvider | UserInteractionProviderMock
    ): DeviceProvider {
        return new DeviceProvider(userInteraction);
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

    public subscribeToEvents() {
        this.provider.subscribeToEvents();
    }

    public unsubscribeToEvents() {
        this.provider.unsubscribeToEvents();
    }

    public exitApp(): void {
        this.provider.exitApp();
    }

    public getUuid(): string {
        return this.provider.getUuid();
    }

    public isAndroid(): boolean {
        return false;
    }
}
