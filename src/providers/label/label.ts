import { Injectable } from "@angular/core";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class LabelProvider {
    constructor(private api: ApiClientV3Provider) {}

    public async getLabelInfo(
        labelInfoRequest: DataRequest.GetLabelInfo
    ): Promise<Model.LabelInfo> {
        let labelInfo = await this.api.getLabelInfo(labelInfoRequest);
        let labelInfoResponse = Model.Factory.createLabelInfo();

        labelInfoResponse.labelId = labelInfo.LABEL_ID;
        labelInfoResponse.loginId = labelInfo.LOGIN_ID;
        labelInfoResponse.licenseId = labelInfo.LICENSE_ID;
        labelInfoResponse.materialId = labelInfo.MATERIAL_ID;
        labelInfoResponse.materialName = labelInfo.MATERIAL_NAME;
        labelInfoResponse.qty = labelInfo.QTY;
        labelInfoResponse.policyCode = labelInfo.CODIGO_POLIZA;
        labelInfoResponse.sourceLocation = labelInfo.SOURCE_LOCATION;
        labelInfoResponse.targetLocation = labelInfo.TARGET_LOCATION;
        labelInfoResponse.transitLocation = labelInfo.TRANSIT_LOCATION;
        labelInfoResponse.batch = labelInfo.BATCH;
        labelInfoResponse.vin = labelInfo.VIN;
        labelInfoResponse.tone = labelInfo.TONE;
        labelInfoResponse.caliber = labelInfo.CALIBER;
        labelInfoResponse.serialNumber = labelInfo.SERIAL_NUMBER;
        labelInfoResponse.status = labelInfo.STATUS;
        labelInfoResponse.weight = labelInfo.WEIGHT;
        labelInfoResponse.wavePickingId = labelInfo.WAVE_PICKING_ID;
        labelInfoResponse.taskSubType = labelInfo.TASK_SUBT_YPE;
        labelInfoResponse.warehouseTarget = labelInfo.WAREHOUSE_TARGET;
        labelInfoResponse.clientName = labelInfo.CLIENT_NAME;
        labelInfoResponse.clientCode = labelInfo.CLIENT_CODE;
        labelInfoResponse.stateCode = labelInfo.STATE_CODE;
        labelInfoResponse.regime = labelInfo.REGIMEN;
        labelInfoResponse.transferRequestId = labelInfo.TRANSFER_REQUEST_ID;
        labelInfoResponse.dateTime = labelInfo.DATE_TIME;
        labelInfoResponse.loginName = labelInfo.LOGIN_NAME;
        labelInfoResponse.docNum = labelInfo.DOC_NUM;
        labelInfoResponse.docEntry = labelInfo.DOC_ENTRY;

        return Promise.resolve(labelInfoResponse);
    }

    public async insertPickingLabel(
        request: DataRequest.InsertPickingLabels
    ): Promise<DataResponse.Operation> {
        return this.api.insertPickingLabel(request);
    }

    public async updatePickingLabel(
        request: DataRequest.UpdatePickingLabel
    ): Promise<DataResponse.Operation> {
        return this.api.updatePickingLabel(request);
    }

    public async deletePickingLabel(
        request: DataRequest.DeletePickingLabel
    ): Promise<DataResponse.Operation> {
        return this.api.deletePickingLabel(request);
    }
}
