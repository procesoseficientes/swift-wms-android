import { Injectable } from "@angular/core";
import { DataRequest, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class PhysicalCountProvider {
    constructor(private api: ApiClientV3Provider) {}

    public getLocationsForCount(
        request: DataRequest.GetLocationsForCount
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>> {
        return this.api.getLocationsForCount(request);
    }

    public validateScannedLocationForCount(
        request: DataRequest.ValidateScannedLocationForCount
    ): Promise<DataResponse.Operation> {
        return this.api.validateScannedLocationForCount(request);
    }

    public getNextMaterialForCount(
        request: DataRequest.GetNextMaterialForCount
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>> {
        return this.api.getNextMaterialForCount(request);
    }

    public getValidateLicenseExists(
        request: DataRequest.GetValidateLicenseExists
    ): Promise<DataResponse.Operation> {
        return this.api.getValidateLicenseExists(request);
    }

    public getMaterialByBarcodeForPhysicalCount(
        request: DataRequest.GetMaterialByBarcode
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>> {
        return this.api.getMaterialByBarcodeForPhysicalCount(request);
    }

    public validateRecountedMaterialForTask(
        request: DataRequest.ValidateRecountedMaterialForTask
    ): Promise<DataResponse.Operation> {
        return this.api.validateRecountedMaterialForTask(request);
    }

    public insertCountExecutionOperation(
        request: DataRequest.InsertCountExecutionOperation
    ): Promise<DataResponse.Operation> {
        return this.api.insertCountExecutionOperation(request);
    }

    public finishLocation(
        request: DataRequest.FinishLocation
    ): Promise<DataResponse.OP_WMS_SP_FINISH_LOCATION> {
        return this.api.finishLocation(request);
    }

    public recountLocation(
        request: DataRequest.RecountLocation
    ): Promise<DataResponse.OP_WMS_SP_RECOUNT_LOCATION> {
        return this.api.recountLocation(request);
    }
}
