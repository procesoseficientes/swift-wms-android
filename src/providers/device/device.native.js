"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../../enums/enums");
const Observable_1 = require("rxjs/Observable");
const models_1 = require("../../models/models");
class DeviceProviderNative {
    constructor(diagnostic, batteryStatus, networkInterface, hotspot, bluetoothSerial, platform, device, zone) {
        this.diagnostic = diagnostic;
        this.batteryStatus = batteryStatus;
        this.networkInterface = networkInterface;
        this.hotspot = hotspot;
        this.bluetoothSerial = bluetoothSerial;
        this.platform = platform;
        this.device = device;
        this.zone = zone;
        DeviceProviderNative.batteryStatusLevel = 100;
        DeviceProviderNative.connectionStatus = "";
        DeviceProviderNative.unattendedNotifications = 0;
    }
    scan() {
        //FIXME: We must return EMDK plugin
        return Promise.resolve(true);
    }
    subscribeToScanner(process) {
        return new Observable_1.Observable(observer => {
            this.zone.runOutsideAngular(() => {
                window.plugins.intentShim.registerBroadcastReceiver({
                    filterActions: ["com.ionic.datawedge.ACTION"],
                    filterCategories: [
                        "com.android.intent.category.DEFAULT"
                    ]
                }, (intent) => {
                    this.zone.run(() => {
                        let data = intent.extras["com.symbol.datawedge.data_string"];
                        observer.next(data); //FIXME: This observer must complete in a proper way
                    });
                });
            });
        }).subscribe(process);
    }
    getBatteryLevel() {
        return this.batteryStatus.onChange();
    }
    getBluetoothState() {
        let bluetoothInfo = models_1.Model.Factory.createBluetoothInfo();
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
    getWirelessInfo() {
        let wirelessInfo = models_1.Model.Factory.createWirelessInfo();
        let resultSet = {
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
    get cameraOptions() {
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
    takePicture() {
        return this.camera.getPicture(this.cameraOptions);
    }
    sleep(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
    exitApp() {
        this.platform.exitApp();
    }
    getUuid() {
        return this.device.uuid;
    }
    subscribeToEvents() {
        this.batteryStatus.onChange().subscribe((status) => {
            DeviceProviderNative.batteryStatusLevel = status.level; // FIXME: This variable must bind with the obversable method
        });
        this.e.subscribe(enums_1.Enums.Messages.ConnectionChange, (status) => {
            DeviceProviderNative.connectionStatus = status.iconName;
            DeviceProviderNative.isConnected = status.connected;
            DeviceProviderNative.connectionColor = status.color;
        });
    }
    unsubscribeToEvents() {
        this.e.unsubscribe(enums_1.Enums.Messages.ConnectionChange);
    }
    isAndroid() {
        return true;
    }
    /**
     * Search only integer numbers on the 'currentValues' array
     * @param currentValues must be an array of current values on the input
     */
    getIntegerNumbers(currentValues) {
        //Array for only valid values
        let newValues = [];
        //For each value, verify if it's number
        currentValues.forEach((value) => {
            let parsedValue = parseInt(value);
            //If parsed value is number, that must be allowed
            if (!isNaN(parsedValue)) {
                newValues.push(parsedValue);
            }
        });
        return Promise.resolve(newValues);
    }
}
DeviceProviderNative.isConnected = false;
exports.DeviceProviderNative = DeviceProviderNative;
//# sourceMappingURL=device.native.js.map