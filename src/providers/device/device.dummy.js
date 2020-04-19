"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const Subject_1 = require("rxjs/Subject");
const enums_1 = require("../../enums/enums");
class DeviceDummyProvider {
    constructor(batteryStatusInfo, wirelessInfo, bluetoothInfo, userInteraction) {
        this.batteryStatusInfo = batteryStatusInfo;
        this.wirelessInfo = wirelessInfo;
        this.bluetoothInfo = bluetoothInfo;
        this.userInteraction = userInteraction;
        this.subject = new Subject_1.Subject();
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userInteraction
                .promptForValue(enums_1.Enums.Translation.Title.Swift3PL, enums_1.Enums.Translation.Message.EnterScanData, enums_1.Enums.Translation.PlaceHolder.ScanData, enums_1.Enums.PromptType.Text)
                .then(data => {
                this.subject.next(data);
                return Promise.resolve(true);
            });
        });
    }
    subscribeToScanner(process) {
        return this.subject.subscribe(process);
    }
    getBatteryLevel() {
        return new Observable_1.Observable(observable => {
            observable.next(this.batteryStatusInfo);
            observable.complete();
        });
    }
    getBluetoothState() {
        return Promise.resolve(this.bluetoothInfo);
    }
    getWirelessInfo() {
        return Promise.resolve(this.wirelessInfo);
    }
    exitApp() { }
    getUuid() {
        return null;
    }
    takePicture() { }
    sleep(_time) { }
    subscribeToEvents() { }
    unsubscribeToEvents() { }
    isAndroid() {
        return false;
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
exports.DeviceDummyProvider = DeviceDummyProvider;
//# sourceMappingURL=device.dummy.js.map