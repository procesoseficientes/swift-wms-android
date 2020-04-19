import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataRequest, DataResponse } from "../../models/models";

@Injectable()
export class GeneralTransferProvider {
    constructor(public api: ApiClientV3Provider) {}

    public registerGeneralTransferPicking(
        request: DataRequest.RegisterGeneralTransferPicking
    ): Promise<DataResponse.Operation> {
        return this.api.registerGeneralTransferPicking(request);
    }

    public registerGeneralTransferReception(
        request: DataRequest.RegisterGeneralTransferReception
    ): Promise<DataResponse.Operation> {
        return this.api.registerGeneralTransferReception(request);
    }
}
