import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataRequest, DataResponse, Model } from "../../models/models";

@Injectable()
export class ManifestCertificationProvider {
    api: ApiClientV3Provider;

    public getCertificationDetailOfSerialNumber(
        request: DataRequest.GetCertificationDetailOfSerialNumber
    ): Promise<
        Array<DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>
    > {
        let result = [
            <DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>{
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL_NUMBER: "123"
            },
            <DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>{
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL_NUMBER: "545"
            },
            <DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>{
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL_NUMBER: "456"
            },
            <DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>{
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL_NUMBER: "887"
            }
        ];
        return Promise.resolve(result);
    }

    public insertCertificationBySerialNumber(
        request: DataRequest.InsertCertificationBySerialNumber
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.DbData = request.serialNumber;
        return Promise.resolve(result);
    }

    public insertCertificationDetail(
        request: DataRequest.InsertCertificationDetail
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.DbData = request.materialId;
        return Promise.resolve(result);
    }

    public deleteCertificationBySerialNumber(
        request: DataRequest.DeleteCertificationBySerialNumber
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.DbData = request.serialNumber;
        return Promise.resolve(result);
    }

    public validateIfCertificationIsComplete(
        request: DataRequest.ValidateIfCertificationIsComplete
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.DbData = "15";
        return Promise.resolve(result);
    }

    public markManifestAsCertified(
        request: DataRequest.MarkManifestAsCertified
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.Codigo = request.manifestHeaderId;
        result.DbData = request.certificationHeaderId.toString();
        return Promise.resolve(result);
    }

    public getManifestHeaderForCertification(
        request: DataRequest.GetManifestHeaderForCertification
    ): Promise<DataResponse.OP_WMS_SP_GET_MANIFEST_HEADER_FOR_CERTIFICATION> {
        let result = <DataResponse.OP_WMS_SP_GET_MANIFEST_HEADER_FOR_CERTIFICATION>{
            MANIFEST_HEADER_ID: request.manifestHeaderId,
            CERTIFICATION_HEADER_ID: 1
        };

        return Promise.resolve(result);
    }

    public insertCertificationHeader(
        request: DataRequest.InsertCertificationHeader
    ): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public deleteCertificationDetail(
        request: DataRequest.DeleteCertificationDetail
    ): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public getMaterialForManifest(
        request: DataRequest.GetMaterialForManifest
    ): Promise<DataResponse.OP_WMS_SP_GET_MATERIAL_FOR_MANIFEST> {
        let result = <DataResponse.OP_WMS_SP_GET_MATERIAL_FOR_MANIFEST>{
            MATERIAL_ID: request.barcodeId,
            MATERIAL_NAME: "mock-name"
        };
        return Promise.resolve(result);
    }
}
