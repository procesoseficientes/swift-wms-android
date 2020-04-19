import { Injectable } from "@angular/core";
import { DataRequest, Model, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class RelocateProvider {
    constructor(protected api: ApiClientV3Provider) {}

    relocateLicense(
        request: DataRequest.RelocateLicense
    ): Promise<Model.Operation> {
        return this.api.relocateLicense(request);
    }

    registerPartialRelocation(
        request: DataRequest.RegisterPartialRelocation
    ): Promise<Model.Operation> {
        return this.api.registerPartialRelocation(request);
    }

    public getLastLicenseReallocByUser(
        request: DataRequest.LastLicenseReallocByUser
    ): Promise<DataResponse.Operation> {
        return this.api.getLastLicenseReallocByUser(request);
    }
}
