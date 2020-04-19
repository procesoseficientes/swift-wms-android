"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
const api_client_v3_1 = require("../api-client/api-client.v3");
let ReceptionProvider = class ReceptionProvider {
    constructor(api) {
        this.api = api;
    }
    getReceptionTaskHeader(receptionTask) {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = yield this.api.getReceptionTask(receptionTask);
            let receptionHeader = models_1.Model.Factory.createReceptionTaskHeader();
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
        });
    }
    completeTask(receptionTask) {
        return this.api.completeTask(receptionTask);
    }
    getScannedMaterialByLicenseInReceptionTask(material) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let materials = yield this.api.getScannedMaterialByLicenseInReceptionTask(material);
                if (materials.length > 0 &&
                    materials[0].MATERIAL_ID !=
                        enums_1.Enums.MaterialDoesNotBelong.DoesNotBelongToDocument.toString()) {
                    let outputMaterial = models_1.Model.Factory.createMaterial();
                    let currentMaterial = materials[0];
                    outputMaterial.clientOwner = currentMaterial.CLIENT_OWNER;
                    outputMaterial.materialId = currentMaterial.MATERIAL_ID;
                    outputMaterial.barcodeId = currentMaterial.BARCODE_ID;
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
                        currentMaterial.SERIAL_NUMBER_REQUESTS === enums_1.Enums.YesNo.Yes
                            ? "arrow-dropright"
                            : "";
                    let operation = models_1.Model.Factory.createSuccessOperation();
                    operation.ObjectData = outputMaterial;
                    return Promise.resolve(operation);
                }
                else if (materials.length == 0) {
                    let operation = models_1.Model.Factory.createFaultOperation({
                        code: enums_1.Enums.CustomErrorCodes.MaterialInfoWasNotFound,
                        message: ""
                    });
                    return Promise.resolve(operation);
                }
                else {
                    let operation = models_1.Model.Factory.createFaultOperation({
                        code: enums_1.Enums.CustomErrorCodes.MaterialDoesntBelongToDocument,
                        message: ""
                    });
                    return Promise.resolve(operation);
                }
            }
            catch (error) {
                return Promise.reject(error); // FIXME: better error handling
            }
        });
    }
    addMaterialToLicense(material) {
        return this.api.addMaterialToLicense(material);
    }
    validateBarcodeForLicense(material) {
        return this.api.validateBarcodeForLicense(material);
    }
    rollbackLicense(license) {
        return this.api.rollbackLicense(license);
    }
    insertMaterialBySerialNumber(serie) {
        return this.api.insertMaterialBySerialNumber(serie);
    }
    deleteMaterialBySerialNumber(serie) {
        return this.api.deleteMaterialBySerialNumber(serie);
    }
    registerLicenseReception(transaction) {
        return this.api.registerLicenseReception(transaction);
    }
    validateStatusInMaterialsLicense(license) {
        return this.api.validateStatusInMaterialsLicense(license);
    }
    validateScannedDocumentForReception(request) {
        return this.api.validateScannedDocumentForReception(request);
    }
    generateReceptionDocumentFromCargoManifest(request) {
        return this.api.generateReceptionDocumentFromCargoManifest(request);
    }
    recordAndCompleteTheTask(receptionTask) {
        return this.api.recordAndCompleteTheTask(receptionTask);
    }
    validateInventoryForRealloc(request) {
        return this.api.validateInventoryForRealloc(request);
    }
    getTaskDetailForReceptionConsolidated(request) {
        return this.api.getTaskDetailForReceptionConsolidated(request);
    }
};
ReceptionProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], ReceptionProvider);
exports.ReceptionProvider = ReceptionProvider;
//# sourceMappingURL=reception.js.map