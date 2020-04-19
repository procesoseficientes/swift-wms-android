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
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const api_client_v3_1 = require("../api-client/api-client.v3");
let PhysicalCountProvider = class PhysicalCountProvider {
    constructor(api) {
        this.api = api;
    }
    getLocationsForCount(request) {
        return this.api.getLocationsForCount(request);
    }
    validateScannedLocationForCount(request) {
        return this.api.validateScannedLocationForCount(request);
    }
    getNextMaterialForCount(request) {
        return this.api.getNextMaterialForCount(request);
    }
    getValidateLicenseExists(request) {
        return this.api.getValidateLicenseExists(request);
    }
    getMaterialByBarcodeForPhysicalCount(request) {
        return this.api.getMaterialByBarcodeForPhysicalCount(request);
    }
    validateRecountedMaterialForTask(request) {
        return this.api.validateRecountedMaterialForTask(request);
    }
    insertCountExecutionOperation(request) {
        return this.api.insertCountExecutionOperation(request);
    }
    finishLocation(request) {
        return this.api.finishLocation(request);
    }
    recountLocation(request) {
        return this.api.recountLocation(request);
    }
};
PhysicalCountProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], PhysicalCountProvider);
exports.PhysicalCountProvider = PhysicalCountProvider;
//# sourceMappingURL=physical-count.js.map