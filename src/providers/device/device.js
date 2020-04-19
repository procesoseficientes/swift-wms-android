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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const device_dummy_1 = require("./device.dummy");
const device_native_1 = require("./device.native");
const battery_status_1 = require("@ionic-native/battery-status");
const diagnostic_1 = require("@ionic-native/diagnostic");
const network_interface_1 = require("@ionic-native/network-interface");
const hotspot_1 = require("@ionic-native/hotspot");
const bluetooth_serial_1 = require("@ionic-native/bluetooth-serial");
const ionic_angular_1 = require("ionic-angular");
const user_interaction_1 = require("../user-interaction/user-interaction");
const device_1 = require("@ionic-native/device");
let DeviceProvider = class DeviceProvider {
    constructor(diagnostic, batteryStatus, networkInterface, hotspot, bluetoothSerial, platform, zone, userInteraction, device) {
        this.diagnostic = diagnostic;
        this.batteryStatus = batteryStatus;
        this.networkInterface = networkInterface;
        this.hotspot = hotspot;
        this.bluetoothSerial = bluetoothSerial;
        this.platform = platform;
        this.zone = zone;
        this.userInteraction = userInteraction;
        this.device = device;
        this.provider = !this.platform.is("android")
            ? new device_dummy_1.DeviceDummyProvider({
                isPlugged: true,
                level: 66
            }, {
                status: true,
                icon: "close-circle",
                iconColor: "danger",
                ip: "10.0.0.1",
                name: "MobilityFake"
            }, {
                status: true,
                icon: "close-circle",
                iconColor: "danger"
            }, this.userInteraction)
            : new device_native_1.DeviceProviderNative(this.diagnostic, this.batteryStatus, this.networkInterface, this.hotspot, this.bluetoothSerial, this.platform, this.device, this.zone);
    }
    scan() {
        return this.provider.scan();
    }
    subscribeToScanner(process) {
        return this.provider.subscribeToScanner(process);
    }
    getBatteryLevel() {
        return this.provider.getBatteryLevel();
    }
    getBluetoothState() {
        return this.provider.getBluetoothState();
    }
    getWirelessInfo() {
        return this.provider.getWirelessInfo();
    }
    takePicture() {
        return this.provider.takePicture();
    }
    sleep(time) {
        return this.provider.sleep(time);
    }
    exitApp() {
        this.provider.exitApp();
    }
    getUuid() {
        return this.provider.getUuid();
    }
    subscribeToEvents() {
        this.provider.subscribeToEvents();
    }
    unsubscribeToEvents() {
        this.provider.unsubscribeToEvents();
    }
    isAndroid() {
        return this.platform.is("android");
    }
    /**
     * Search only integer numbers on the 'currentValues' array
     * @param currentValues must be an array of current values on the input
     */
    getIntegerNumbers(currentValues) {
        return this.provider.getIntegerNumbers(currentValues);
    }
};
DeviceProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [diagnostic_1.Diagnostic,
        battery_status_1.BatteryStatus,
        network_interface_1.NetworkInterface,
        hotspot_1.Hotspot,
        bluetooth_serial_1.BluetoothSerial,
        ionic_angular_1.Platform,
        core_1.NgZone,
        user_interaction_1.UserInteractionProvider,
        device_1.Device])
], DeviceProvider);
exports.DeviceProvider = DeviceProvider;
//# sourceMappingURL=device.js.map