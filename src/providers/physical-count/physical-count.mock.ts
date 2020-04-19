import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class PhysicalCountProvider {
    api: ApiClientV3Provider;

    public async getLocationsForCount(
        request: DataRequest.GetLocationsForCount
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>> {
        let l1 = <DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>{
            LOCATION: "l1"
        };
        let l2 = <DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>{
            LOCATION: "l2"
        };
        let l3 = <DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>{
            LOCATION: "l3"
        };
        let result = [];
        result.push(l1, l2, l3);
        return Promise.resolve(result);
    }

    public async validateScannedLocationForCount(
        request: DataRequest.ValidateScannedLocationForCount
    ): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public async getNextMaterialForCount(
        request: DataRequest.GetNextMaterialForCount
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>> {
        let m1 = <DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>{
            MATERIAL_ID: "viscosa/VCA1030"
        };
        let m2 = <DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>{
            MATERIAL_ID: "viscosa/VCA1031"
        };
        let m3 = <DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>{
            MATERIAL_ID: "viscosa/VCA1032"
        };
        let result = [];
        result.push(m1, m2, m3);
        return result;
    }

    public async getValidateLicenseExists(
        request: DataRequest.GetValidateLicenseExists
    ): Promise<DataResponse.Operation> {
        return null;
    }

    public async getMaterialByBarcodeForPhysicalCount(
        request: DataRequest.GetMaterialByBarcode
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>> {
        let m1 = <DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>{
            MATERIAL_ID: "viscosa/VCA1030"
        };
        let result = [];
        result.push(m1);
        return result;
    }

    public async validateRecountedMaterialForTask(
        request: DataRequest.ValidateRecountedMaterialForTask
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.Mensaje = "OK";
        return Promise.resolve(result);
    }

    public async insertCountExecutionOperation(
        request: DataRequest.InsertCountExecutionOperation
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.Mensaje = "OK";
        return Promise.resolve(result);
    }

    public async finishLocation(
        request: DataRequest.FinishLocation
    ): Promise<DataResponse.OP_WMS_SP_FINISH_LOCATION> {
        let result = <DataResponse.OP_WMS_SP_FINISH_LOCATION>{
            RESULT: "OK"
        };
        return Promise.resolve(result);
    }
}
