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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var PrinterProvider_1;
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const user_settings_1 = require("../user-settings/user-settings");
const bluetooth_serial_1 = require("@ionic-native/bluetooth-serial");
const device_1 = require("../device/device");
const translate_1 = require("../translate/translate");
const enums_1 = require("../../enums/enums");
const api_client_v3_1 = require("../api-client/api-client.v3");
let PrinterProvider = PrinterProvider_1 = class PrinterProvider {
    constructor(http, bluetoothSerial, device, translate, settings, api) {
        this.http = http;
        this.bluetoothSerial = bluetoothSerial;
        this.device = device;
        this.translate = translate;
        this.settings = settings;
        this.api = api;
    }
    discoverPrintersUsingBluetooth() {
        return this.bluetoothSerial.list().then(bluetoothAvailableDevices => {
            let printers = [];
            bluetoothAvailableDevices.forEach((bluetoothDevice) => {
                if (bluetoothDevice.class === enums_1.Enums.BluetoothClass.Printer) {
                    let printer = {
                        address: bluetoothDevice.address,
                        friendlyName: bluetoothDevice.name,
                        isPrinterZebra: false,
                        selected: this.settings.printer &&
                            this.settings.printer.address ===
                                bluetoothDevice.address
                    };
                    printers.push(printer);
                }
            });
            return Promise.resolve(printers);
        });
    }
    discoverPrinters() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.bluetoothSerial.isEnabled();
                return result
                    ? this.discoverPrintersUsingBluetooth()
                    : new Array();
            }
            catch (error) {
                let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.BluetoothDisabled);
                return Promise.reject(translation);
            }
        });
    }
    savePrinter(printer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.settings.printer = printer;
                return Promise.resolve();
            }
            catch (error) {
                let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.SomethingWentWrong);
                return Promise.reject(translation);
            }
        });
    }
    getPrinter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let printer = this.settings.printer;
                return Promise.resolve(printer);
            }
            catch (error) {
                let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.SomethingWentWrong);
                return Promise.reject(translation);
            }
        });
    }
    printDocument(printer, cpclDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let printerEnabled = yield this.bluetoothSerial.isEnabled();
                return printerEnabled
                    ? this.sendDocumentToPrinterUsingBluetooth(printer.address, cpclDocument)
                    : Promise.resolve(false);
            }
            catch (error) {
                let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.CannotEstablishConnectionToPrinter);
                return Promise.reject(translation);
            }
        });
    }
    printTest(printer) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = this
                .settings.userCredentials;
            request.login = this.settings.login;
            let result = yield this.getTestPrintFormat(request);
            return this.printDocument(printer, result.FORMAT);
        });
    }
    sendDocumentToPrinterUsingBluetooth(printerAddress, cpclDocument) {
        return __awaiter(this, void 0, void 0, function* () {
            let s = this.bluetoothSerial.connect(printerAddress).subscribe(() => __awaiter(this, void 0, void 0, function* () {
                let resultWrite;
                try {
                    resultWrite = yield this.bluetoothSerial.write(cpclDocument);
                }
                catch (error) {
                    let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.UnableToSendDocumentToPrinter);
                    return Promise.reject(translation);
                }
                if (resultWrite) {
                    let resultDisconnect = yield this.waitUntilPrinterIsReady();
                    return Promise.resolve(resultDisconnect);
                }
                else {
                    return Promise.resolve(false);
                }
            }), () => __awaiter(this, void 0, void 0, function* () {
                let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.CannotEstablishConnectionToPrinter);
                return Promise.reject(translation);
            }));
            return Promise.resolve(s.closed);
        });
    }
    waitUntilPrinterIsReady() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.verifyIfPrinterIsReady(0);
                let resultDisconnect = yield this.bluetoothSerial.disconnect();
                if (resultDisconnect) {
                    return Promise.resolve(true);
                }
                else {
                    let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.CouldNotDisconnectPrinter);
                    return Promise.reject(translation);
                }
            }
            catch (error) {
                let translation = yield this.translate.translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.CouldNotDisconnectPrinter);
                return Promise.reject(translation);
            }
        });
    }
    verifyIfPrinterIsReady(currentTry) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.bluetoothSerial.read();
            if (result != "")
                //yay printer ready!!!
                return Promise.resolve(true);
            else {
                if (currentTry < PrinterProvider_1.maxTries) {
                    yield this.device.sleep(1000);
                    return this.verifyIfPrinterIsReady(currentTry + 1);
                }
            }
        });
    }
    getLicensePrintFormat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.api.getLicensePrintFormat(request);
            if (response && response.FORMAT.indexOf("\r") === -1) {
                response.FORMAT = response.FORMAT.split("\n").join("\r\n");
            }
            return Promise.resolve(response);
        });
    }
    getLabelPrintFormat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.api.getLabelPrintFormat(request);
            if (response && response.FORMAT.indexOf("\r") === -1) {
                response.FORMAT = response.FORMAT.split("\n").join("\r\n");
            }
            return Promise.resolve(response);
        });
    }
    getMaterialPrintFormat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.api.getMaterialPrintFormat(request);
            if (response && response.FORMAT.indexOf("\r") === -1) {
                response.FORMAT = response.FORMAT.split("\n").join("\r\n");
            }
            return Promise.resolve(response);
        });
    }
    getStatusPrintFormat(request) {
        return this.api.getStatusPrintFormat(request);
    }
    getTestPrintFormat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.api.getTestPrintFormat(request);
            if (response && response.FORMAT.indexOf("\r") === -1) {
                response.FORMAT = response.FORMAT.split("\n").join("\r\n");
            }
            return Promise.resolve(response);
        });
    }
    getLicenseDispatchPrintFormat(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.api.getLicenseDispatchPrintFormat(request);
            if (response && response.FORMAT.indexOf("\r") === -1) {
                response.FORMAT = response.FORMAT.split("\n").join("\r\n");
            }
            return Promise.resolve(response);
        });
    }
    getPrintPassFormatByHH(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.api.getPrintPassFormatByHH(request);
            if (response && response.FORMAT.indexOf("\r") === -1) {
                response.FORMAT = response.FORMAT.split("\n").join("\r\n");
            }
            return Promise.resolve(response);
        });
    }
};
PrinterProvider.maxTries = 30;
PrinterProvider = PrinterProvider_1 = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient,
        bluetooth_serial_1.BluetoothSerial,
        device_1.DeviceProvider,
        translate_1.TranslateProvider,
        user_settings_1.UserSettingsProvider,
        api_client_v3_1.ApiClientV3Provider])
], PrinterProvider);
exports.PrinterProvider = PrinterProvider;
//# sourceMappingURL=printer.js.map