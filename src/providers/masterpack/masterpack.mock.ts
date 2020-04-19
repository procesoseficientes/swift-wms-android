import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Enums } from "../../enums/enums";

export class MasterpackProvider {
    api: ApiClientV3Provider;

    public async validateIsMasterPack(
        request: DataRequest.ValidateIsMasterPack
    ): Promise<DataResponse.Operation> {
        return Promise.resolve(<DataResponse.Operation>{
            Codigo: 0,
            Mensaje: "Proceso Exitoso",
            Resultado: Enums.OperationResult.Success,
            DbData: "viscosa/MS00001"
        });
    }

    public async getMasterPackDetailByLicence(
        request: DataRequest.GetMasterPackDetailByLicence
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_MASTER_PACK_DETAIL_BY_LICENCE>
    > {
        return Promise.resolve([
            {
                MASTER_PACK_DETAIL_ID: 37,
                MASTER_PACK_HEADER_ID: 17,
                MATERIAL_ID: "ferco/nuevosku",
                MATERIAL_NAME: "nuevoskuuuuu",
                CLIENT_CODE: "ferco",
                CLIENT_NAME: "ferco",
                BARCODE_ID: "ferco/nuevosku",
                QTY: 90,
                BATCH: "",
                DATE_EXPIRATION: null
            }
        ]);
    }

    public async explodeMasterPack(
        request: DataRequest.ExplodeMasterPack
    ): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public async getMasterPackByLicence(
        request: DataRequest.GetMasterPackByLicense
    ): Promise<Array<DataResponse.OP_WMS_GET_MASTER_PACK_BY_LICENSE>> {
        return Promise.resolve([
            {
                MASTER_PACK_HEADER_ID: 17,
                LICENSE_ID: 480440,
                MATERIAL_ID: "viscosa/MS00001",
                MATERIAL_NAME: "Radiadores",
                POLICY_HEADER_ID: 242782,
                LAST_UPDATED: new Date(),
                LAST_UPDATE_BY: "ACAMACHO",
                EXPLODED: 0,
                EXPLODED_DATE: null,
                RECEPTION_DATE: new Date(),
                QTY: 1
            }
        ]);
    }
}
