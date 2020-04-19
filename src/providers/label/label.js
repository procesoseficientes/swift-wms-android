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
const api_client_v3_1 = require("../api-client/api-client.v3");
let LabelProvider = class LabelProvider {
    constructor(api) {
        this.api = api;
    }
    getLabelInfo(labelInfoRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let labelInfo = yield this.api.getLabelInfo(labelInfoRequest);
            let labelInfoResponse = models_1.Model.Factory.createLabelInfo();
            labelInfoResponse.labelId = labelInfo.LABEL_ID;
            labelInfoResponse.loginId = labelInfo.LOGIN_ID;
            labelInfoResponse.licenseId = labelInfo.LICENSE_ID;
            labelInfoResponse.materialId = labelInfo.MATERIAL_ID;
            labelInfoResponse.materialName = labelInfo.MATERIAL_NAME;
            labelInfoResponse.qty = labelInfo.QTY;
            labelInfoResponse.policyCode = labelInfo.CODIGO_POLIZA;
            labelInfoResponse.sourceLocation = labelInfo.SOURCE_LOCATION;
            labelInfoResponse.targetLocation = labelInfo.TARGET_LOCATION;
            labelInfoResponse.transitLocation = labelInfo.TRANSIT_LOCATION;
            labelInfoResponse.batch = labelInfo.BATCH;
            labelInfoResponse.vin = labelInfo.VIN;
            labelInfoResponse.tone = labelInfo.TONE;
            labelInfoResponse.caliber = labelInfo.CALIBER;
            labelInfoResponse.serialNumber = labelInfo.SERIAL_NUMBER;
            labelInfoResponse.status = labelInfo.STATUS;
            labelInfoResponse.weight = labelInfo.WEIGHT;
            labelInfoResponse.wavePickingId = labelInfo.WAVE_PICKING_ID;
            labelInfoResponse.taskSubType = labelInfo.TASK_SUBT_YPE;
            labelInfoResponse.warehouseTarget = labelInfo.WAREHOUSE_TARGET;
            labelInfoResponse.clientName = labelInfo.CLIENT_NAME;
            labelInfoResponse.clientCode = labelInfo.CLIENT_CODE;
            labelInfoResponse.stateCode = labelInfo.STATE_CODE;
            labelInfoResponse.regime = labelInfo.REGIMEN;
            labelInfoResponse.transferRequestId = labelInfo.TRANSFER_REQUEST_ID;
            labelInfoResponse.dateTime = labelInfo.DATE_TIME;
            labelInfoResponse.loginName = labelInfo.LOGIN_NAME;
            labelInfoResponse.docNum = labelInfo.DOC_NUM;
            labelInfoResponse.docEntry = labelInfo.DOC_ENTRY;
            return Promise.resolve(labelInfoResponse);
        });
    }
    insertPickingLabel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.insertPickingLabel(request);
        });
    }
    updatePickingLabel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.updatePickingLabel(request);
        });
    }
    deletePickingLabel(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.deletePickingLabel(request);
        });
    }
};
LabelProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], LabelProvider);
exports.LabelProvider = LabelProvider;
//# sourceMappingURL=label.js.map