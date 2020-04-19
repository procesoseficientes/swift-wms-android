import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataRequest, DataResponse } from "../../models/models";

@Injectable()
export class CheckpointProvider {
    constructor(private api: ApiClientV3Provider) {}

    getCheckPointsByUser(
        request: DataRequest.GetCheckPointsByUser
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_CHECKPOINTS_BY_USER>> {
        return this.api.getCheckPointsByUser(request);
    }
}
