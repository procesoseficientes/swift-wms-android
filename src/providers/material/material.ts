import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";

@Injectable()
export class MaterialProvider {
    constructor(private api: ApiClientV3Provider) {}

    async getMaterial(
        request: DataRequest.GetMaterial
    ): Promise<Model.Material> {
        return this.api.getMaterial(request);
    }

    async getMaterialByBarcodeOrName(
        request: DataRequest.GetMaterial
    ): Promise<Array<Model.Material>> {
        return this.api.getMaterialIdByBarcodeOrName(request);
    }

    async getMaterialByBarcode(
        request: DataRequest.GetMaterial
    ): Promise<Model.Material> {
        let material = await this.api.getMaterialByBarcode(request);
        if (material.UnitMeasurements.length === 0) {
            let baseUnit = <Model.UnitMeasurement>{
                id: 1,
                clientId: material.clientOwner,
                materialId: material.materialId,
                measurementUnit: Enums.BaseUnit.BaseUnit,
                qty: 1,
                barcode: material.barcodeId,
                alternativeBarcode: material.alternateBarcode
            };
            material.UnitMeasurements.push(baseUnit);
        }
        material.measurementUnit = `${
            material.UnitMeasurements[0].measurementUnit
        } 1x${material.UnitMeasurements[0].qty}`;
        material.measurementQty = material.UnitMeasurements[0].qty;
        return Promise.resolve(material);
    }

    updateMaterialProperties(
        request: DataRequest.UpdateMaterialProperties
    ): Promise<DataResponse.Operation> {
        return this.api.updateMaterialProperties(request);
    }

    getInfoBatch(
        request: DataRequest.GetInfoBatch
    ): Promise<DataResponse.OP_WMS_SP_GET_INFO_BATCH> {
        return this.api.getInfoBatch(request);
    }
}
