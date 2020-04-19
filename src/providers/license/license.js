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
const enums_1 = require("../../enums/enums");
const _ = require("lodash");
let LicenseProvider = class LicenseProvider {
    constructor(api) {
        this.api = api;
    }
    createLicense(createLicense) {
        return this.api.createLicense(createLicense);
    }
    getInventoryByLicense(request, userCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let inventory = yield this.api.getInventoryByLicense(request);
            return this.transformToInventoryObject(inventory, userCredentials);
        });
    }
    getInventoryByMaterial(request, userCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let inventory = yield this.api.getInventoryByMaterial(request);
            return this.transformToInventoryObject(inventory, userCredentials);
        });
    }
    getInventoryByLocationSpot(request, userCredentials) {
        return __awaiter(this, void 0, void 0, function* () {
            let inventory = yield this.api.getInventoryByLocationSpot(request);
            return this.transformToInventoryObject(inventory, userCredentials);
        });
    }
    getMaterialBySerialNumber(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let serialNumbers = yield this.api.getMaterialBySerialNumber(request);
            return serialNumbers.map((currentSerial) => {
                return {
                    serial: currentSerial.SERIAL
                };
            });
        });
    }
    transformToInventoryObject(inventory, userCredentials) {
        let inventoryRequests = inventory.map((currentInventory) => {
            return {
                licenseId: currentInventory.LICENSE_ID,
                currentLocation: currentInventory.CURRENT_LOCATION,
                policyCode: currentInventory.CODIGO_POLIZA,
                clientOwner: currentInventory.CLIENT_OWNER,
                regime: currentInventory.REGIMEN,
                materialId: currentInventory.MATERIAL_ID,
                materialName: currentInventory.MATERIAL_NAME,
                qty: currentInventory.QTY,
                vin: currentInventory.VIN,
                batch: currentInventory.BATCH,
                dateExpiration: currentInventory.DATE_EXPIRATION,
                tone: currentInventory.TONE,
                caliber: currentInventory.CALIBER,
                pickingDemandHeaderId: currentInventory.PICKING_DEMAND_HEADER_ID,
                docNum: currentInventory.DOC_NUM,
                showDetails: false,
                icon: "arrow-dropright",
                serialNumberRequests: currentInventory.SERIAL_NUMBER_REQUESTS,
                SerialNumbers: [],
                wavePickingId: currentInventory.WAVE_PICKING_ID,
                statusName: currentInventory.STATUS_NAME,
                shortName: currentInventory.SHORT_NAME
            };
        });
        inventoryRequests.forEach((inventoryRequest) => __awaiter(this, void 0, void 0, function* () {
            if (inventoryRequest.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
                let request = models_1.DataRequest.Factory.createGetMaterialBySerialNumberRequest(inventoryRequest.licenseId, inventoryRequest.materialId, null, userCredentials);
                inventoryRequest.SerialNumbers = yield this.getMaterialBySerialNumber(request);
            }
        }));
        return Promise.resolve(inventoryRequests);
    }
    getAvailableLicenseDetail(request) {
        return this.api.getAvailableLicenseDetail(request);
    }
    getAvailableLicenseSeries(request) {
        return this.api.getAvailableLicenseSeries(request);
    }
    validateIfStatusOfLicenseAllowsRealloc(request) {
        return this.api.validateIfStatusOfLicenseAllowsRealloc(request);
    }
    getInfoOfLicenseInLocationForMerge(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let licenses = yield this.api.getInfoOfLicenseInLocationForMerge(request);
            let groupedLicenses = _.groupBy(licenses, "LICENSE_ID");
            let licenseInfo = _.map(groupedLicenses, lic => {
                let license = _.first(lic);
                let detail = [];
                for (let key in lic) {
                    let d = {
                        materialId: lic[key].MATERIAL_ID,
                        quantity: lic[key].QTY,
                        batch: lic[key].BATCH,
                        expirationDate: lic[key].EXPIRATION_DATE,
                        tone: lic[key].TONE,
                        caliber: lic[key].CALIBER,
                        headerId: lic[key].PICKING_DEMAND_HEADER_ID,
                        docNum: lic[key].DOC_NUM
                    };
                    detail.push(d);
                }
                return {
                    licenseId: license.LICENSE_ID,
                    licenseDescription: license.LICENSE_DESCRIPTION,
                    detail: detail,
                    icon: "arrow-dropright"
                };
            });
            return Promise.resolve(licenseInfo);
        });
    }
    mergeLicenseInLocationWithoutDetail(request) {
        return this.api.mergeLicenseInLocationWithoutDetail(request);
    }
    getInfoLicenseDispatch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.getInfoLicenseDispatch(request);
        });
    }
    addSeriesRank(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.addSeriesRank(request);
        });
    }
};
LicenseProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], LicenseProvider);
exports.LicenseProvider = LicenseProvider;
//# sourceMappingURL=license.js.map