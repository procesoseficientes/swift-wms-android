import { Injectable } from "@angular/core";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class ReceptionProvider {
    constructor(private api: ApiClientV3Provider) {}

    public async getReceptionTaskHeader(
        receptionTask: DataRequest.Reception
    ): Promise<Model.ReceptionTaskHeader> {
        let tasks: Array<
            DataResponse.OP_WMS_SP_GET_RECEPTION_TASK
        > = await this.api.getReceptionTask(receptionTask);

        let receptionHeader: Model.ReceptionTaskHeader = Model.Factory.createReceptionTaskHeader();
        let currentTask = tasks[0];
        receptionHeader.taskId = currentTask.TAREA;
        receptionHeader.clientCode = currentTask.CLIENT_CODE;
        receptionHeader.clientName = currentTask.CLIENTE;
        receptionHeader.policyCode = currentTask.POLIZA;
        receptionHeader.order = currentTask.ORDEN;
        receptionHeader.receptionType = currentTask.TIPO;
        receptionHeader.locationSpotTarget = currentTask.LOCATION_SPOT_TARGET;
        receptionHeader.receptionSubType = currentTask.SUBTIPO;
        receptionHeader.regime = currentTask.REGIMEN;
        receptionHeader.document = currentTask.DOCUMENTO_ERP;
        receptionHeader.isInvoice = currentTask.ES_FACTURA;
        receptionHeader.supplierCode = currentTask.CODE_SUPPLIER;
        receptionHeader.supplierName = currentTask.NAME_SUPPLIER;
        return Promise.resolve(receptionHeader);
    }

    public completeTask(
        receptionTask: DataRequest.Reception
    ): Promise<DataResponse.Operation> {
        return this.api.completeTask(receptionTask);
    }

    public async getScannedMaterialByLicenseInReceptionTask(
        material: DataRequest.GetScannedMaterialByLicenseInReceptionTask
    ): Promise<Model.Operation> {
        try {
            let materials: Array<
                DataResponse.OP_WMS_GET_SCANNED_MATERIAL_BY_LICENSE_IN_RECEPTION_TASK
            > = await this.api.getScannedMaterialByLicenseInReceptionTask(
                material
            );
            if (
                materials.length > 0 &&
                materials[0].MATERIAL_ID !=
                    Enums.MaterialDoesNotBelong.DoesNotBelongToDocument.toString()
            ) {
                let outputMaterial: Model.Material = Model.Factory.createMaterial();
                let currentMaterial = materials[0];
                outputMaterial.clientOwner = currentMaterial.CLIENT_OWNER;
                outputMaterial.materialId = currentMaterial.MATERIAL_ID;
                outputMaterial.barcodeId = currentMaterial.BARCODE_ID;
                outputMaterial.expirationTolerance = currentMaterial.EXPIRATION_TOLERANCE;
                outputMaterial.alternateBarcode =
                    currentMaterial.ALTERNATE_BARCODE;
                outputMaterial.materialName = currentMaterial.MATERIAL_NAME;
                outputMaterial.volumeFactor = currentMaterial.VOLUME_FACTOR;
                outputMaterial.weight = currentMaterial.WEIGTH;
                outputMaterial.isCar = currentMaterial.IS_CAR;
                outputMaterial.batchRequested = currentMaterial.BATCH_REQUESTED;
                outputMaterial.serialNumberRequests =
                    currentMaterial.SERIAL_NUMBER_REQUESTS;
                outputMaterial.handleTone = currentMaterial.HANDLE_TONE;
                outputMaterial.handleCaliber = currentMaterial.HANDLE_CALIBER;
                outputMaterial.qualityControl = currentMaterial.QUALITY_CONTROL;
                outputMaterial.measurementUnit =
                    currentMaterial.MEASUREMENT_UNIT;
                outputMaterial.measurementQty = currentMaterial.MEASUREMENT_QTY;
                outputMaterial.icon =
                    currentMaterial.SERIAL_NUMBER_REQUESTS === Enums.YesNo.Yes
                        ? "arrow-dropright"
                        : "";
                let operation = Model.Factory.createSuccessOperation();
                operation.ObjectData = outputMaterial;
                return Promise.resolve(operation);
            } else if (materials.length == 0) {
                let operation = Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.MaterialInfoWasNotFound,
                    message: ""
                });
                return Promise.resolve(operation);
            } else {
                let operation = Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.MaterialDoesntBelongToDocument,
                    message: ""
                });
                return Promise.resolve(operation);
            }
        } catch (error) { console.log(error)
            return Promise.reject(error); // FIXME: better error handling
        }
    }

    public addMaterialToLicense(
        material: DataRequest.AddMaterialToLicense
    ): Promise<DataResponse.Operation> {
        return this.api.addMaterialToLicense(material);
    }

    public validateBarcodeForLicense(
        material: DataRequest.GetScannedMaterialByLicenseInReceptionTask
    ): Promise<DataResponse.Operation> {
        return this.api.validateBarcodeForLicense(material);
    }

    public rollbackLicense(
        license: DataRequest.RollBackLicense
    ): Promise<DataResponse.Operation> {
        return this.api.rollbackLicense(license);
    }

    public insertMaterialBySerialNumber(
        serie: DataRequest.InsertMaterialBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.api.insertMaterialBySerialNumber(serie);
    }

    public deleteMaterialBySerialNumber(
        serie: DataRequest.DeleteMaterialBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.api.deleteMaterialBySerialNumber(serie);
    }

    public registerLicenseReception(
        transaction: DataRequest.RegisterLicenseReception
    ): Promise<DataResponse.Operation> {
        return this.api.registerLicenseReception(transaction);
    }

    public validateStatusInMaterialsLicense(
        license: DataRequest.ValidateStatusInMaterialsLicense
    ): Promise<DataResponse.Operation> {
        return this.api.validateStatusInMaterialsLicense(license);
    }

    public validateScannedDocumentForReception(
        request: DataRequest.ValidateScannedDocumentForReception
    ): Promise<DataResponse.Operation> {
        return this.api.validateScannedDocumentForReception(request);
    }

    public generateReceptionDocumentFromCargoManifest(
        request: DataRequest.GenerateReceptionDocumentFromCargoManifest
    ): Promise<DataResponse.Operation> {
        return this.api.generateReceptionDocumentFromCargoManifest(request);
    }

    public recordAndCompleteTheTask(
        receptionTask: DataRequest.Reception
    ): Promise<DataResponse.Operation> {
        return this.api.recordAndCompleteTheTask(receptionTask);
    }

    public validateInventoryForRealloc(
        request: DataRequest.ValidateInventoryForRealloc
    ): Promise<DataResponse.Operation> {
        return this.api.validateInventoryForRealloc(request);
    }

    public getTaskDetailForReceptionConsolidated(
        request: DataRequest.GetTaskDetailForReceptionConsolidated
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_TASK_DETAIL_FOR_RECEPTION_CONSOLIDATED>
    > {
        return this.api.getTaskDetailForReceptionConsolidated(request);
    }
}
