import { Injectable } from "@angular/core";
import { DataRequest, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class ManifestCertificationProvider {
    constructor(private api: ApiClientV3Provider) {}

    public getManifestHeaderForCertification(
        request: DataRequest.GetManifestHeaderForCertification
    ): Promise<DataResponse.OP_WMS_SP_GET_MANIFEST_HEADER_FOR_CERTIFICATION> {
        return this.api.getManifestHeaderForCertification(request);
    }

    public getMaterialForManifest(
        request: DataRequest.GetMaterialForManifest
    ): Promise<DataResponse.OP_WMS_SP_GET_MATERIAL_FOR_MANIFEST> {
        return this.api.getMaterialForManifest(request);
    }

    public getConsolidatedCertificationDetail(
        request: DataRequest.GetConsolidatedCertificationDetail
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED>> {
        return this.api.getConsolidatedCertificationDetail(request);
    }

    public getCertificationDetailOfSerialNumber(
        request: DataRequest.GetCertificationDetailOfSerialNumber
    ): Promise<Array<DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>> {
        return this.api.getCertificationDetailOfSerialNumber(request);
    }

    public validateIfCertificationIsComplete(
        request: DataRequest.ValidateIfCertificationIsComplete
    ): Promise<DataResponse.Operation> {
        return this.api.validateIfCertificationIsComplete(request);
    }

    public deleteCertificationDetail(
        request: DataRequest.DeleteCertificationDetail
    ): Promise<DataResponse.Operation> {
        return this.api.deleteCertificationDetail(request);
    }

    public insertCertificationDetail(
        request: DataRequest.InsertCertificationDetail
    ): Promise<DataResponse.Operation> {
        return this.api.insertCertificationDetail(request);
    }

    public markManifestAsCertified(
        request: DataRequest.MarkManifestAsCertified
    ): Promise<DataResponse.Operation> {
        return this.api.markManifestAsCertified(request);
    }

    public insertCertificationHeader(
        request: DataRequest.InsertCertificationHeader
    ): Promise<DataResponse.Operation> {
        return this.api.insertCertificationHeader(request);
    }

    public insertCertificationBySerialNumber(
        request: DataRequest.InsertCertificationBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.api.insertCertificationBySerialNumber(request);
    }

    public deleteCertificationBySerialNumber(
        request: DataRequest.DeleteCertificationBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.api.deleteCertificationBySerialNumber(request);
    }
}
