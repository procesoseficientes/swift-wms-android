import { BatteryStatusResponse } from "@ionic-native/battery-status";
import { Model } from "../../models/models";
import { Observable } from "rxjs/Observable";
import { IDevice } from "./idevice";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { UserInteractionProvider } from "../user-interaction/user-interaction";
import { Enums } from "../../enums/enums";

export class DeviceDummyProvider implements IDevice {
    batteryStatusLevel: number;
    connectionStatus: string;
    isConnected: boolean;
    connectionColor: string;
    unattendedNotifications: number;
    camera: any;
    subject: Subject<string>;

    constructor(
        private batteryStatusInfo: BatteryStatusResponse,
        private wirelessInfo: Model.WirelessInfo,
        private bluetoothInfo: Model.BluetoothInfo,
        private userInteraction: UserInteractionProvider
    ) {
        this.subject = new Subject<string>();
    }

    async scan(): Promise<boolean> {
        return this.userInteraction
            .promptForValue<string>(
                Enums.Translation.Title.Swift3PL,
                Enums.Translation.Message.EnterScanData,
                Enums.Translation.PlaceHolder.ScanData,
                Enums.PromptType.Text
            )
            .then(data => {
                this.subject.next(data);
                return Promise.resolve(true);
            });
    }

    subscribeToScanner(process: (data: string) => Promise<any>): Subscription {
        return this.subject.subscribe(process);
    }

    getBatteryLevel(): Observable<BatteryStatusResponse> {
        return new Observable<BatteryStatusResponse>(observable => {
            observable.next(this.batteryStatusInfo);
            observable.complete();
        });
    }

    getBluetoothState(): Promise<Model.BluetoothInfo> {
        return Promise.resolve(this.bluetoothInfo);
    }

    getWirelessInfo(): Promise<Model.WirelessInfo> {
        return Promise.resolve(this.wirelessInfo);
    }

    exitApp(): void {}

    getUuid(): string {
        return null;
    }

    takePicture(): any /* Promise<string> */ {}
    sleep(_time: number): any /* Promise<any> */ {}
    subscribeToEvents(): any /*  */ {}
    unsubscribeToEvents(): any /*  */ {}

    isAndroid(): boolean {
        return false;
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
