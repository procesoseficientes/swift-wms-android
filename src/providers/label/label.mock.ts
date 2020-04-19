import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Model, DataRequest, DataResponse } from "../../models/models";

@Injectable()
export class LabelProvider {
    api: ApiClientV3Provider;

    getLabelInfo(
        _labelInfoRequest: DataRequest.GetLabelInfo
    ): Promise<Model.LabelInfo> {
        if (_labelInfoRequest.labelId == 1) {
            return Promise.reject("Label does not exist");
        }
        let labelInfo: Model.LabelInfo = {
            labelId: 0,
            loginId: "",
            licenseId: 378237,
            materialId: "",
            materialName: "",
            qty: 0,
            policyCode: "",
            sourceLocation: "",
            targetLocation: "",
            transitLocation: "",
            batch: "",
            vin: "",
            tone: "",
            caliber: "",
            serialNumber: "",
            status: "",
            weight: 0,
            wavePickingId: 0,
            taskSubType: "",
            warehouseTarget: "",
            clientName: "",
            clientCode: "",
            stateCode: 0,
            regime: "",
            transferRequestId: 0,
            dateTime: new Date(),
            loginName: "",
            docNum: 0,
            docEntry: 0
        };
        return Promise.resolve(labelInfo);
    }

    public async insertPickingLabel(
        request: DataRequest.InsertPickingLabels
    ): Promise<DataResponse.Operation> {
        return Model.Factory.createSuccessOperation();
    }

    public async updatePickingLabel(
        request: DataRequest.UpdatePickingLabel
    ): Promise<DataResponse.Operation> {
        return Model.Factory.createSuccessOperation();
    }

    public async deletePickingLabel(
        request: DataRequest.DeletePickingLabel
    ): Promise<DataResponse.Operation> {
        return Model.Factory.createSuccessOperation();
    }
}
