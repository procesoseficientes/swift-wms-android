import { Injectable } from "@angular/core";
import { DataResponse, Model } from "../../models/models";

@Injectable()
export class PrinterProvider {
    discoverPrinters(): Promise<Array<Model.Printer>> {
        let printers: Array<Model.Printer> = [
            {
                address: "ABC",
                friendlyName: "Printer#1",
                isPrinterZebra: false
            },
            {
                address: "DEF",
                friendlyName: "Printer#2",
                isPrinterZebra: false
            },
            {
                address: "GHI",
                friendlyName: "Printer#3",
                isPrinterZebra: false
            }
        ];
        return Promise.resolve(printers);
    }

    savePrinter(): Promise<void> {
        return Promise.resolve();
    }

    printTest(): Promise<void> {
        return Promise.resolve();
    }

    getLicensePrintFormat(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LICENSE_PRINT_FORMAT>
    > {
        let dummy = [
            {
                FORMAT: "LICENSE"
            }
        ];
        return Promise.resolve(dummy);
    }

    getLabelPrintFormat(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LABEL_PRINT_FORMAT>
    > {
        let dummy = [
            {
                FORMAT: "LABEL"
            }
        ];
        return Promise.resolve(dummy);
    }

    getMaterialPrintFormat(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_MATERIAL_PRINT_FORMAT>
    > {
        let dummy = [
            {
                FORMAT: "MATERIAL"
            }
        ];
        return Promise.resolve(dummy);
    }

    getStatusPrintFormat(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_STATUS_PRINT_FORMAT>
    > {
        let dummy = [
            {
                FORMAT: "STATUS"
            }
        ];
        return Promise.resolve(dummy);
    }
}
