import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataResponse, DataRequest } from "../../models/models";

@Injectable()
export class MasterpackProvider {
    constructor(private api: ApiClientV3Provider) {}

    public async validateIsMasterPack(
        request: DataRequest.ValidateIsMasterPack
    ): Promise<DataResponse.Operation> {
        return this.api.validateIsMasterPack(request);
    }

    public async getMasterPackDetailByLicence(
        request: DataRequest.GetMasterPackDetailByLicence
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_MASTER_PACK_DETAIL_BY_LICENCE>> {
        return this.api.getMasterPackDetailByLicence(request);
    }

    public async explodeMasterPack(request: DataRequest.ExplodeMasterPack): Promise<DataResponse.Operation> {
        return this.api.explodeMasterPack(request);
    }

    public async getMasterPackByLicence(
        request: DataRequest.GetMasterPackByLicense
    ): Promise<Array<DataResponse.OP_WMS_GET_MASTER_PACK_BY_LICENSE>> {
        return this.api.getMasterPackByLicence(request);
    }
}
