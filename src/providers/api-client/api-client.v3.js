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
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const base_1 = require("../base/base");
const translate_1 = require("../translate/translate");
const routes_1 = require("../../resources/routes");
let ApiClientV3Provider = class ApiClientV3Provider extends base_1.BaseProvider {
    constructor(http, translate) {
        super(translate, http);
        this.http = http;
        this.translate = translate;
    }
    validateCredentials(request) {
        request.communicationAddress =
            "http://mobilitywebapi.centralus.cloudapp.azure.com:1025";
        return this.get(request, `/SecurityAPI/odata/ValidateCredentials(loginId='${request.loginId}',password='${request.password}',codeApp='SWIFT3PL',deviceId='${request.deviceId}')`);
    }
    login(request) {
        return this.post(routes_1.Routes.V3.Login.login, request, "user_");
    }
    getTypeChargeByMobile(request) {
        return this.post(routes_1.Routes.V3.Charge.getTypeChargeByMobile, request);
    }
    createTypeChangeXLicenseRequest(request) {
        return this.post(routes_1.Routes.V3.Charge.createTypeChangeXLicense, request);
    }
    createLicense(request) {
        return this.post(routes_1.Routes.V3.License.createLicense, request);
    }
    findConfigurations(request) {
        return this.post(routes_1.Routes.V3.Configuration.findConfigurations, request);
    }
    getParameter(request) {
        return this.post(routes_1.Routes.V3.Configuration.getParameter, request);
    }
    getLocation(request) {
        return this.post(routes_1.Routes.V3.Location.getLocation, request, request.location);
    }
    validateLocationForStorage(request) {
        return this.post(routes_1.Routes.V3.Location.validateLocationForStorage, request);
    }
    validateLocationMaxWeightAndVolume(request) {
        return this.post(routes_1.Routes.V3.Location.validateLocationMaxWeightAndVolume, request);
    }
    getUsedMt2byLocationSpot(request) {
        return this.post(routes_1.Routes.V3.Location.getUsedMt2byLocationSpot, request);
    }
    getTasksByWavePickingId(request) {
        return this.post(routes_1.Routes.V3.Task.getTasksByWavePickingId, request);
    }
    cancelPickingDetailLine(request) {
        return this.post(routes_1.Routes.V3.Picking.cancelPickingDetailLine, request);
    }
    getReceptionTask(request) {
        return this.post(routes_1.Routes.V3.Task.getReceptionTask, request);
    }
    completeTask(request) {
        return this.post(routes_1.Routes.V3.Reception.registerReceptionStatus, request);
    }
    addMaterialToLicense(request) {
        return this.post(routes_1.Routes.V3.Reception.addMaterialToLicense, request);
    }
    validateBarcodeForLicense(request) {
        return this.post(routes_1.Routes.V3.Reception.validateBarcodeForLicense, request);
    }
    rollbackLicense(request) {
        return this.post(routes_1.Routes.V3.Reception.rollBackLicense, request);
    }
    insertMaterialBySerialNumber(request) {
        return this.post(routes_1.Routes.V3.Reception.insertMaterialBySerialNumber, request);
    }
    deleteMaterialBySerialNumber(request) {
        return this.post(routes_1.Routes.V3.Reception.deleteMaterialBySerialNumber, request);
    }
    registerLicenseReception(request) {
        return this.post(routes_1.Routes.V3.Reception.registerLicenseReception, request);
    }
    validateStatusInMaterialsLicense(request) {
        return this.post(routes_1.Routes.V3.Reception.validateStatusInMaterialsLicense, request);
    }
    getScannedMaterialByLicenseInReceptionTask(request) {
        return this.post(routes_1.Routes.V3.Reception.getScannedMaterialByLicenseInReceptionTask, request);
    }
    getRequestedSerialNumbersInDiscretionalPickingByLicense(request) {
        return this.post(routes_1.Routes.V3.Picking
            .getRequestedSerialNumbersInDiscretionalPickingByLicense, request);
    }
    getAssignedTasks(request) {
        return this.post(routes_1.Routes.V3.Task.getTasksByUser, request);
    }
    getMaterial(request) {
        return this.post(routes_1.Routes.V3.Material.getMaterial, request, request.barcodeId);
    }
    getMaterialByBarcode(request) {
        return this.post(routes_1.Routes.V3.Material.getMaterialByBarcode, request, request.barcodeId);
    }
    getMaterialIdByBarcodeOrName(request) {
        return this.post(routes_1.Routes.V3.Material.getMaterialIdByBarcodeOrName, request);
    }
    getInventoryByLicense(request) {
        return this.post(routes_1.Routes.V3.Inventory.getInventoryByLicense, request, request.licenseId.toString());
    }
    getMaterialBySerialNumber(request) {
        return this.post(routes_1.Routes.V3.Reception.getMaterialBySerialNumber, request);
    }
    getInventoryByMaterial(request) {
        return this.post(routes_1.Routes.V3.Inventory.getInventoryByMaterial, request);
    }
    getInventoryByLocationSpot(request) {
        return this.post(routes_1.Routes.V3.Inventory.getInventoryByLocationSpot, request);
    }
    relocateLicense(request) {
        return this.post(routes_1.Routes.V3.Relocation.relocateLicense, request);
    }
    getLocationInfo(request) {
        return this.post(routes_1.Routes.V3.Location.getLocationInfo, request, request.locationSpot);
    }
    getLabelInfo(request) {
        return this.post(routes_1.Routes.V3.Label.getLabel, request, request.labelId.toString());
    }
    updateScannedSerialNumberToProcess(request) {
        return this.post(routes_1.Routes.V3.Picking.updateScannedSerialNumberToProcess, request);
    }
    removeBroadcast(request) {
        return this.post(routes_1.Routes.V3.Broadcast.removeBroadcast, request);
    }
    rollbackSerialNumbersOnProcess(request) {
        return this.post(routes_1.Routes.V3.Picking.rollbackSerialNumbersOnProcess, request);
    }
    updateSetActiveSerialNumber(request) {
        return this.post(routes_1.Routes.V3.Picking.updateSetActiveSerialNumber, request);
    }
    validateIfPickingLicenseIsAvailable(request) {
        return this.post(routes_1.Routes.V3.Picking.validateIfPickingLicenseIsAvailable, request);
    }
    registerGeneralDispatch(request) {
        return this.post(routes_1.Routes.V3.Picking.registerGeneralDispatch, request);
    }
    updateLocationTargetTask(request) {
        return this.post(routes_1.Routes.V3.Picking.updateLocationTargetTask, request);
    }
    getFirstTaskByWavePickingId(request) {
        return this.post(routes_1.Routes.V3.Task.getFirstTaskByWavePickingId, request);
    }
    getLicensePrintFormat(request) {
        return this.post(routes_1.Routes.V3.Printer.getLicensePrintFormat, request);
    }
    getLabelPrintFormat(request) {
        return this.post(routes_1.Routes.V3.Printer.getLabelPrintFormat, request);
    }
    getMaterialPrintFormat(request) {
        return this.post(routes_1.Routes.V3.Printer.getMaterialPrintFormat, request);
    }
    getStatusPrintFormat(request) {
        return this.post(routes_1.Routes.V3.Printer.getStatusPrintFormat, request);
    }
    getInfoOfLicenseInLocationForMerge(request) {
        return this.post(routes_1.Routes.V3.License.getInfoOfLicenseInLocationForMerge, request);
    }
    mergeLicenseInLocationWithoutDetail(request) {
        return this.post(routes_1.Routes.V3.License.mergeLicenseInLocationWithoutDetail, request);
    }
    validateScannedDocumentForReception(request) {
        return this.post(routes_1.Routes.V3.Reception.validateScannedDocumentForReception, request);
    }
    getAvailableLicenseDetail(request) {
        return this.post(routes_1.Routes.V3.Inventory.getAvailableLicenseDetail, request);
    }
    getAvailableLicenseSeries(request) {
        return this.post(routes_1.Routes.V3.Inventory.getAvailableLicenseSeries, request);
    }
    validateIfStatusOfLicenseAllowsRealloc(request) {
        return this.post(routes_1.Routes.V3.License.validateIfStatusOfLicenseAllowsRealloc, request);
    }
    registerPartialRelocation(request) {
        return this.post(routes_1.Routes.V3.Relocation.registerPartialRelocation, request);
    }
    generateReceptionDocumentFromCargoManifest(request) {
        return this.post(routes_1.Routes.V3.Reception.generateReceptionDocumentFromCargoManifest, request);
    }
    getManifestHeaderForCertification(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.ManifestCertification.getManifestHeaderForCertification, request);
        });
    }
    insertPickingLabel(request) {
        return this.post(routes_1.Routes.V3.Label.insertPickingLabel, request);
    }
    getMaterialForManifest(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.ManifestCertification.getMaterialForManifest, request);
        });
    }
    getConsolidatedCertificationDetail(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.ManifestCertification.getConsolidatedCertificationDetail, request);
        });
    }
    getCertificationDetailOfSerialNumber(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.ManifestCertification
                .getCertificationDetailOfSerialNumber, request);
        });
    }
    validateIfCertificationIsComplete(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.validateIfCertificationIsComplete, request);
    }
    deleteCertificationDetail(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.deleteCertificationDetail, request);
    }
    insertCertificationDetail(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.insertCertificationDetail, request);
    }
    markManifestAsCertified(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.markManifestAsCertified, request);
    }
    insertCertificationHeader(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.insertCertificationHeader, request);
    }
    insertCertificationBySerialNumber(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.insertCertificationBySerialNumber, request);
    }
    deleteCertificationBySerialNumber(request) {
        return this.post(routes_1.Routes.V3.ManifestCertification.deleteCertificationBySerialNumber, request);
    }
    updatePickingLabel(request) {
        return this.post(routes_1.Routes.V3.Label.updatePickingLabel, request);
    }
    deletePickingLabel(request) {
        return this.post(routes_1.Routes.V3.Label.deletePickingLabel, request);
    }
    getTestPrintFormat(request) {
        return this.post(routes_1.Routes.V3.Printer.getTestPrintFormat, request);
    }
    getMyCountingTask(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Inventory.getMyCoutingTask, request);
        });
    }
    getLocationsForCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Inventory.getLocationsForCount, request);
        });
    }
    validateScannedLocationForCount(request) {
        return this.post(routes_1.Routes.V3.Inventory.validateScannedLocationForCount, request);
    }
    getNextMaterialForCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Inventory.getNextMaterialForCount, request);
        });
    }
    getValidateLicenseExists(request) {
        return this.post(routes_1.Routes.V3.Inventory.getValidateLicenseExists, request);
    }
    getMaterialByBarcodeForPhysicalCount(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Inventory.getMaterialByBarcode, request);
        });
    }
    validateRecountedMaterialForTask(request) {
        return this.post(routes_1.Routes.V3.Inventory.validateRecountedMaterialForTask, request);
    }
    insertCountExecutionOperation(request) {
        return this.post(routes_1.Routes.V3.Inventory.insertCountExecutionOperation, request);
    }
    finishLocation(request) {
        return this.post(routes_1.Routes.V3.Inventory.finishLocation, request);
    }
    recountLocation(request) {
        return this.post(routes_1.Routes.V3.Inventory.recountLocation, request);
    }
    validateIsMasterPack(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Masterpack.validateIsMasterPack, request);
        });
    }
    getMasterPackDetailByLicence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Masterpack.getMasterPackDetailByLicence, request);
        });
    }
    explodeMasterPack(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Masterpack.explodeMasterPack, request);
        });
    }
    getPickingMaterialsWithMeasurementUnit(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Task.getPickingMaterialsWithMeasurementUnit, request);
        });
    }
    getMasterPackByLicence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Masterpack.getMasterPackByLicense, request);
        });
    }
    recordAndCompleteTheTask(request) {
        return this.post(routes_1.Routes.V3.Reception.registerAndChangeStatusOfTask, request);
    }
    getLastDispatchLicenseGeneratedByWavePicking(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getLastDispatchLicenseGeneratedByWavePicking, request);
        });
    }
    insertLicenseDispatch(request) {
        return this.post(routes_1.Routes.V3.Picking.insertLicenseDispatch, request);
    }
    getLicenseDispatchPrintFormat(request) {
        return this.post(routes_1.Routes.V3.Printer.getLicenseDispatchPrintFormat, request);
    }
    registerGeneralDispatchByRegimeGeneral(request) {
        return this.post(routes_1.Routes.V3.Picking.registerGeneralDispatchByRegimeGeneral, request);
    }
    locateLicenseDispatch(request) {
        return this.post(routes_1.Routes.V3.Picking.locateLicenseDispatch, request);
    }
    registerForReplenishment(request) {
        return this.post(routes_1.Routes.V3.Picking.registerForReplenishment, request);
    }
    registerReplenishment(request) {
        return this.post(routes_1.Routes.V3.Picking.registerReplenishment, request);
    }
    getLicenseDispatchByWavePicking(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getLicenseDispatchByWavePicking, request);
        });
    }
    getTargetLocationByLicenseDispatch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getTargetLocationByLicenseDispatch, request);
        });
    }
    validateIfLocationExists(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Location.validateIfLocationExists, request);
        });
    }
    getInfoLicenseDispatch(request) {
        return this.post(routes_1.Routes.V3.License.getInfoLicenseDispatch, request);
    }
    getWavePickingForLicenseDispatch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getWavePickingForLicenseDispatch, request);
        });
    }
    getLicenseDispatchForPicking(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getLicenseDispatchForPicking, request);
        });
    }
    dispatchLicenseExit(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.dispatchLicenseExit, request);
        });
    }
    validateInventoryForRealloc(request) {
        return this.post(routes_1.Routes.V3.Reception.validateInventoryForRealloc, request);
    }
    getWavePickingPendingToLocate(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getWavePickingPendingToLocate, request);
        });
    }
    getLastLicenseReallocByUser(request) {
        return this.post(routes_1.Routes.V3.Relocation.getLastLicenseReallocByUser, request);
    }
    getSuggestedDispatchLicense(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getSuggestedDispatchLicense, request);
        });
    }
    insertPilotFromDispatchLicense(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.insertPilotFromDispatchLicense, request);
        });
    }
    addSeriesRank(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.License.addSeriesRank, request);
        });
    }
    insertVehicleFromDispatchLicence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.insertVehicleFromDispatchLicence, request);
        });
    }
    insertExitPassFromDispatchLicence(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.insertExitPassFromDispatchLicence, request);
        });
    }
    getWavePickingPendingToDispatch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Picking.getWavePickingPendingToDispatch, request);
        });
    }
    getPrintPassFormatByHH(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.post(routes_1.Routes.V3.Printer.getPrintPassFormatByHH, request);
        });
    }
    validateSuggestedLocation(request) {
        return this.post(routes_1.Routes.V3.LocationSuggestion.validateSuggestedLocation, request);
    }
    getLocationSuggestion(request) {
        return this.post(routes_1.Routes.V3.LocationSuggestion.getLocationSuggestion, request);
    }
    getLocationSuggestionByMaterial(request) {
        return this.post(routes_1.Routes.V3.LocationSuggestion.getLocationSuggestionByMaterial, request);
    }
    getLicenseCompatibleClassForLocation(request) {
        return this.post(routes_1.Routes.V3.LocationSuggestion.getLicenseCompatibleClassForLocation, request);
    }
    getCheckPointsByUser(request) {
        return this.post(routes_1.Routes.V3.CheckPoint.getCheckPointsByUser, request);
    }
    updateMaterialProperties(request) {
        return this.post(routes_1.Routes.V3.Material.updateMaterialProperties, request);
    }
    getInfoBatch(request) {
        return this.post(routes_1.Routes.V3.Inventory.getInfoBatch, request);
    }
    getTaskDetailForReceptionConsolidated(request) {
        return this.post(routes_1.Routes.V3.Reception.getTaskDetailForReceptionConsolidated, request);
    }
    registerGeneralTransferReception(request) {
        return this.post(routes_1.Routes.V3.GeneralTransfer.registerGeneralTransferReception, request);
    }
    registerGeneralTransferPicking(request) {
        return this.post(routes_1.Routes.V3.GeneralTransfer.registerGeneralTransferPicking, request);
    }
};
ApiClientV3Provider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient,
        translate_1.TranslateProvider])
], ApiClientV3Provider);
exports.ApiClientV3Provider = ApiClientV3Provider;
//# sourceMappingURL=api-client.v3.js.map