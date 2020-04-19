import { async, TestBed } from "@angular/core/testing";
import { DeviceProvider } from "./device";
import { Diagnostic } from "@ionic-native/diagnostic";
import { NetworkInterface } from "@ionic-native/network-interface";
import { Hotspot } from "@ionic-native/hotspot";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { Diagnostic as DiagnosticMock } from "../../mocks/@ionic-native/diagnostic/index";
import { NetworkInterface as NetworkInterfaceMock } from "../../mocks/@ionic-native/network-interface/index";
import { HotspotMock } from "@ionic-native-mocks/hotspot";
import { BluetoothSerialMock } from "@ionic-native-mocks/bluetooth-serial";
import { BatteryStatus } from "@ionic-native/battery-status";
import { BatteryStatusMock } from "@ionic-native-mocks/battery-status";
import { UserInteractionProvider } from "../user-interaction/user-interaction";
import { UserInteractionProvider as UserInteractionProviderMock } from "../user-interaction/user-interaction.mock";
import { Platform } from "ionic-angular";
import { Device } from "@ionic-native/device";
import { DeviceMock } from "@ionic-native-mocks/device";

describe("DeviceProvider", () => {
    let provider: DeviceProvider;

    beforeEach(
        async(() => {
            let userInteraction = UserInteractionProviderMock.instance("");
            let platformMock: any = {
                is: (platform: string) => {
                    return platform === "android" ? true : false;
                }
            };
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    DeviceProvider,
                    { provide: Diagnostic, useClass: DiagnosticMock },
                    { provide: BatteryStatus, useClass: BatteryStatusMock },
                    {
                        provide: NetworkInterface,
                        useClass: NetworkInterfaceMock
                    },
                    { provide: Hotspot, useClass: HotspotMock },
                    { provide: BluetoothSerial, useClass: BluetoothSerialMock },

                    {
                        provide: UserInteractionProvider,
                        useValue: userInteraction
                    },
                    { provide: Platform, useValue: platformMock },
                    { provide: Device, useClass: DeviceMock }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(DeviceProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof DeviceProvider).toBe(true);
    });
});
