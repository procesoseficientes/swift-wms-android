import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { Enums } from "../../enums/enums";

@Injectable()
export class PickingProvider {
    getPickingHeaders(
        _task: DataRequest.GetTaskList
    ): any /* Promise<Array<Model.PickingTaskHeader>> */ {}
    getHeaders(
        _tasks: Array<DataResponse.Task>
    ): any /* Promise<Array<Model.PickingTaskHeader>> */ {}
    addSerialNumbersToTasks(
        _pickingTasks: Array<Model.PickingTaskHeader>
    ): any /*  */ {}
    cancelPickingDetailLine(
        _task: DataRequest.CancelPickingDetailLine
    ): any /* Promise<DataResponse.Operation> */ {}
    getSerialNumbersForPicking(
        _task: DataRequest.GetRequestedSerialNumbersInDiscretionalPickingByLicense
    ): any /* Promise<Array<Model.MaterialSerialNumber>> */ {}
    updateScannedSerialNumberToProcess(
        _request: DataRequest.UpdateScannedSerialNumberToProcess
    ): Promise<DataResponse.Operation> {
        if (_request.serialNumber === "FAILED") {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Invalid Serial number"
                })
            );
        } else if (_request.serialNumber === "ERROR") {
            return Promise.reject("Invalid Operation");
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }
    rollbackSerialNumbersOnProcess(
        _request: DataRequest.RollbackSerialNumbersOnProcess
    ): Promise<DataResponse.Operation> {
        if (_request.licenseId === 0) {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Invalid license ID"
                })
            );
        } else if (_request.licenseId === -1) {
            return Promise.reject("Invalid Operation");
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }
    updateSetActiveSerialNumber(
        _request: DataRequest.UpdateSetActiveSerialNumber
    ): Promise<DataResponse.Operation> {
        if (_request.serialNumber === "FAILED") {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Invalid Serial number"
                })
            );
        } else if (_request.serialNumber === "ERROR") {
            return Promise.reject("Invalid Operation");
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    registerGeneralDispatch(
        _request: DataRequest.RegisterGeneralDispatch
    ): Promise<DataResponse.Operation> {
        if (_request.materialBarcode === "") {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Invalid material barcode"
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    ValidateIfPickingLicenseIsAvailable(
        _request: DataRequest.ValidateIfPickingLicenseIsAvailable
    ): Promise<
        Array<DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE>
    > {
        if (!_request.materialId) {
            return Promise.reject("Invalid Operation, must provide materialId");
        } else if (_request.materialId === "arium/100041") {
            return Promise.resolve([
                {
                    LICENSE_ID: 0,
                    MATERIAL_ID: "",
                    QTY: 0,
                    TONE: "",
                    CALIBER: "",
                    SPOT_TYPE: Enums.LocationType.Floor,
                    USED_MT2: 1,
                    TASK_SUBTYPE: "",
                    IS_DISCRETIONARY: 0,
                    QUANTITY_PENDING: 1,
                    SERIAL_NUMBER_REQUESTS: 1
                } as DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE
            ]);
        } else {
            return Promise.resolve([]);
        }
    }

    updateLocationTargetTask(
        _request: DataRequest.UpdateLocationTargetTask
    ): Promise<DataResponse.Operation> {
        if (_request.locationSpotTarget === "ERROR") {
            return Promise.reject("Invalid Operation");
        } else if (_request.locationSpotTarget === "FAILED") {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Invalid Location"
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    public insertLicenseDispatch(
        _request: DataRequest.InsertLicenseDispatch
    ): Promise<DataResponse.Operation> {
        if (_request.wavePickingId == -1) {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Fail insert license dispatch"
                })
            );
        } else {
            let operation = Model.Factory.createSuccessOperation();
            operation.DbData = "388396";
            return Promise.resolve(operation);
        }
    }

    public getLastDispatchLicenseGeneratedByWavePicking(
        request: DataRequest.GetLastDispatchLicenseGeneratedByWavePicking
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_LAST_DISPATCH_LICENSE_GENERATED_BY_WAVE_PICKING
        >
    > {
        return Promise.resolve([
            {
                LICENSE_ID: 388396
            }
        ]);
    }

    public registerGeneralDispatchByRegimeGeneral(
        _request: DataRequest.RegisterGeneralDispatchByRegimeGeneral
    ): Promise<DataResponse.Operation> {
        if (_request.wavePickingId == -1) {
            return Promise.resolve(
                Model.Factory.createFaultOperation(<Model.CustomError>{
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: "Fail register license dispatch"
                })
            );
        } else {
            let operation = Model.Factory.createSuccessOperation();
            operation.DbData = "388396";
            Promise.resolve(operation);
        }
    }

    public getLicenseDispatchByWavePicking(
        request: DataRequest.GetLicenseDispatchByWavePicking
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_BY_WAVE_PICKING>
    > {
        return Promise.resolve([
            {
                LOCATION_SPOT_TARGET: "B01-P01",
                LICENSE_ID: 388396,
                CURRENT_LOCATION: "B01-PO2"
            }
        ]);
    }
}
