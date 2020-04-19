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
const api_client_v3_1 = require("../api-client/api-client.v3");
const enums_1 = require("../../enums/enums");
let MaterialProvider = class MaterialProvider {
    constructor(api) {
        this.api = api;
    }
    getMaterial(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.getMaterial(request);
        });
    }
    getMaterialByBarcodeOrName(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.getMaterialIdByBarcodeOrName(request);
        });
    }
    getMaterialByBarcode(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let material = yield this.api.getMaterialByBarcode(request);
            if (material.UnitMeasurements.length === 0) {
                let baseUnit = {
                    id: 1,
                    clientId: material.clientOwner,
                    materialId: material.materialId,
                    measurementUnit: enums_1.Enums.BaseUnit.BaseUnit,
                    qty: 1,
                    barcode: material.barcodeId,
                    alternativeBarcode: material.alternateBarcode
                };
                material.UnitMeasurements.push(baseUnit);
            }
            material.measurementUnit = `${material.UnitMeasurements[0].measurementUnit} 1x${material.UnitMeasurements[0].qty}`;
            material.measurementQty = material.UnitMeasurements[0].qty;
            return Promise.resolve(material);
        });
    }
    updateMaterialProperties(request) {
        return this.api.updateMaterialProperties(request);
    }
    getInfoBatch(request) {
        return this.api.getInfoBatch(request);
    }
};
MaterialProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], MaterialProvider);
exports.MaterialProvider = MaterialProvider;
//# sourceMappingURL=material.js.map