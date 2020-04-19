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
let ManifestCertificationProvider = class ManifestCertificationProvider {
    constructor(api) {
        this.api = api;
    }
    getManifestHeaderForCertification(request) {
        return this.api.getManifestHeaderForCertification(request);
    }
    getMaterialForManifest(request) {
        return this.api.getMaterialForManifest(request);
    }
    getConsolidatedCertificationDetail(request) {
        return this.api.getConsolidatedCertificationDetail(request);
    }
    getCertificationDetailOfSerialNumber(request) {
        return this.api.getCertificationDetailOfSerialNumber(request);
    }
    validateIfCertificationIsComplete(request) {
        return this.api.validateIfCertificationIsComplete(request);
    }
    deleteCertificationDetail(request) {
        return this.api.deleteCertificationDetail(request);
    }
    insertCertificationDetail(request) {
        return this.api.insertCertificationDetail(request);
    }
    markManifestAsCertified(request) {
        return this.api.markManifestAsCertified(request);
    }
    insertCertificationHeader(request) {
        return this.api.insertCertificationHeader(request);
    }
    insertCertificationBySerialNumber(request) {
        return this.api.insertCertificationBySerialNumber(request);
    }
    deleteCertificationBySerialNumber(request) {
        return this.api.deleteCertificationBySerialNumber(request);
    }
};
ManifestCertificationProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], ManifestCertificationProvider);
exports.ManifestCertificationProvider = ManifestCertificationProvider;
//# sourceMappingURL=manifest-certification.js.map