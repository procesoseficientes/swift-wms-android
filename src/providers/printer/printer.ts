import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { DeviceProvider } from "../device/device";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { TranslateProvider } from "../translate/translate";
import { Enums } from "../../enums/enums";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class PrinterProvider {
    private static readonly maxTries: number = 30;
    constructor(
        public http: HttpClient,
        private bluetoothSerial: BluetoothSerial,
        private device: DeviceProvider,
        private translate: TranslateProvider,
        private settings: UserSettingsProvider,
        private api: ApiClientV3Provider
    ) {}

    private discoverPrintersUsingBluetooth(): Promise<Array<Model.Printer>> {
        return this.bluetoothSerial.list().then(bluetoothAvailableDevices => {
            let printers: Array<Model.Printer> = [];

            bluetoothAvailableDevices.forEach((bluetoothDevice: any) => {
                if (bluetoothDevice.class === Enums.BluetoothClass.Printer) {
                    let printer: Model.Printer = {
                        address: bluetoothDevice.address,
                        friendlyName: bluetoothDevice.name,
                        isPrinterZebra: false,
                        selected:
                            this.settings.printer &&
                            this.settings.printer.address ===
                                bluetoothDevice.address
                    };
                    printers.push(printer);
                }
            });

            return Promise.resolve(printers);
        });
    }

    public async discoverPrinters(): Promise<Array<Model.Printer>> {
        try {
            let result: boolean = await this.bluetoothSerial.isEnabled();
            return result
                ? this.discoverPrintersUsingBluetooth()
                : new Array<Model.Printer>();
        } catch (error) {
            let translation: string = await this.translate.translateMessageFromErrorCode(
                Enums.CustomErrorCodes.BluetoothDisabled
            );
            return Promise.reject(translation);
        }
    }

    public async savePrinter(printer: Model.Printer): Promise<void> {
        try {
            this.settings.printer = printer;
            return Promise.resolve();
        } catch (error) {
            let translation: string = await this.translate.translateMessageFromErrorCode(
                Enums.CustomErrorCodes.SomethingWentWrong
            );
            return Promise.reject(translation);
        }
    }

    public async getPrinter(): Promise<Model.Printer> {
        try {
            let printer = this.settings.printer;
            return Promise.resolve(printer);
        } catch (error) {
            let translation: string = await this.translate.translateMessageFromErrorCode(
                Enums.CustomErrorCodes.SomethingWentWrong
            );
            return Promise.reject(translation);
        }
    }

    public async printDocument(
        printer: Model.Printer,
        cpclDocument: string,
        n = 1
    ): Promise<boolean> {
        try {
            let printerEnabled = await this.bluetoothSerial.isEnabled();
            return printerEnabled
                ? this.sendDocumentToPrinterUsingBluetooth(
                      printer.address,
                      cpclDocument,
                      n
                  )
                : Promise.resolve(false);
        } catch (error) {
            let translation: string = await this.translate.translateMessageFromErrorCode(
                Enums.CustomErrorCodes.CannotEstablishConnectionToPrinter
            );
            return Promise.reject(translation);
        }
    }

    public async printTest(printer: Model.Printer) {
        let request: DataRequest.GetTestPrintFormat = <DataRequest.GetTestPrintFormat>this
            .settings.userCredentials;
        request.login = this.settings.login;
        let result = await this.getTestPrintFormat(request);

        return this.printDocument(printer, result.FORMAT);
    }

    private async sendDocumentToPrinterUsingBluetooth(
        printerAddress: string,
        cpclDocument: string,
        n
    ): Promise<boolean> {
        let s = this.bluetoothSerial.connect(printerAddress).subscribe(
            async () => {
                let resultWrite: Promise<any>;
                try {
                        for(var _i = 0; _i<n; _i++){
                            resultWrite = await this.bluetoothSerial.write(
                                cpclDocument,
                            );
                        }   
                } catch (error) {
                    let translation: string = await this.translate.translateMessageFromErrorCode(
                        Enums.CustomErrorCodes.UnableToSendDocumentToPrinter
                    );
                    return Promise.reject(translation);
                }

                if (resultWrite) {
                    let resultDisconnect = await this.waitUntilPrinterIsReady();
                    return Promise.resolve(resultDisconnect);
                } else {
                    return Promise.resolve(false);
                }
            },
            async () => {
                let translation: string = await this.translate.translateMessageFromErrorCode(
                    Enums.CustomErrorCodes.CannotEstablishConnectionToPrinter
                );
                return Promise.reject(translation);
            }
        );
        return Promise.resolve(s.closed);
    }

    private async waitUntilPrinterIsReady(): Promise<boolean> {
        try {
            await this.verifyIfPrinterIsReady(0);
            let resultDisconnect = await this.bluetoothSerial.disconnect();
            if (resultDisconnect) {
                return Promise.resolve(true);
            } else {
                let translation: string = await this.translate.translateMessageFromErrorCode(
                    Enums.CustomErrorCodes.CouldNotDisconnectPrinter
                );
                return Promise.reject(translation);
            }
        } catch (error) {
            let translation: string = await this.translate.translateMessageFromErrorCode(
                Enums.CustomErrorCodes.CouldNotDisconnectPrinter
            );
            return Promise.reject(translation);
        }
    }

    private async verifyIfPrinterIsReady(currentTry: number): Promise<boolean> {
        let result = await this.bluetoothSerial.read();
        if (result != "")
            //yay printer ready!!!
            return Promise.resolve(true);
        else {
            if (currentTry < PrinterProvider.maxTries) {
                await this.device.sleep(1000);
                return this.verifyIfPrinterIsReady(currentTry + 1);
            }
        }
    }

    public async getLicensePrintFormat(
        request: DataRequest.GetLicensePrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_LICENSE_PRINT_FORMAT> {
        let response = await this.api.getLicensePrintFormat(request);
        if (response && response.FORMAT.indexOf("\r") === -1) {
            response.FORMAT = response.FORMAT.split("\n").join("\r\n");
        }
        return Promise.resolve(response);
    }

    public async getLabelPrintFormat(
        request: DataRequest.GetLabelPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_LABEL_PRINT_FORMAT> {
        let response = await this.api.getLabelPrintFormat(request);
        if (response && response.FORMAT.indexOf("\r") === -1) {
            response.FORMAT = response.FORMAT.split("\n").join("\r\n");
        }
        return Promise.resolve(response);
    }

    public async getMaterialPrintFormat(
        request: DataRequest.GetMaterialPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_MATERIAL_PRINT_FORMAT> {
        let response = await this.api.getMaterialPrintFormat(request);
        if (response && response.FORMAT.indexOf("\r") === -1) {
            response.FORMAT = response.FORMAT.split("\n").join("\r\n");
        }
        return Promise.resolve(response);
    }

    public getStatusPrintFormat(
        request: DataRequest.GetStatusPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_STATUS_PRINT_FORMAT> {
        return this.api.getStatusPrintFormat(request);
    }

    public async getTestPrintFormat(
        request: DataRequest.GetTestPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_TEST_PRINT_FORMAT> {
        let response = await this.api.getTestPrintFormat(request);
        if (response && response.FORMAT.indexOf("\r") === -1) {
            response.FORMAT = response.FORMAT.split("\n").join("\r\n");
        }
        return Promise.resolve(response);
    }

    public async getLicenseDispatchPrintFormat(
        request: DataRequest.GetLicenseDispatchPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_PRINT_FORMAT> {
        let response = await this.api.getLicenseDispatchPrintFormat(request);
        if (response && response.FORMAT.indexOf("\r") === -1) {
            response.FORMAT = response.FORMAT.split("\n").join("\r\n");
        }
        return Promise.resolve(response);
    }

    public async getPrintPassFormatByHH(
        request: DataRequest.GetPrintPassFormatByHH
    ): Promise<DataResponse.OP_WMS_SP_GET_PRINT_PASS_FORMAT_BY_HH> {
        let response = await this.api.getPrintPassFormatByHH(request);
        if (response && response.FORMAT.indexOf("\r") === -1) {
            response.FORMAT = response.FORMAT.split("\n").join("\r\n");
        }
        return Promise.resolve(response);
    }
}
