import { Injectable } from "@angular/core";
import { DataRequest, Model, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class ConfigurationProvider {
    constructor(private api: ApiClientV3Provider) {}

    findConfigurations(
        configuration: DataRequest.GetConfiguration
    ): Promise<Array<Model.Configuration>> {
        return this.api.findConfigurations(configuration);
    }

    getParameter(
        request: DataRequest.GetParameter
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_PARAMETER>> {
        return this.api.getParameter(request);
    }
}
