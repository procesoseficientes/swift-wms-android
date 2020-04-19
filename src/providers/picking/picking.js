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
const user_settings_1 = require("../user-settings/user-settings");
const api_client_v3_1 = require("../api-client/api-client.v3");
const reception_1 = require("../reception/reception");
let PickingProvider = class PickingProvider {
    constructor(api, settings, reception) {
        this.api = api;
        this.settings = settings;
        this.reception = reception;
    }
    getPickingHeaders(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tasks = yield this.api.getTasksByWavePickingId(task);
                tasks.forEach(t => {
                    t.locationSpotSource = t.License.currentLocation;
                });
                let objectPickingHeader = yield this.getHeaders(tasks);
                return yield this.addSerialNumbersToTasks(objectPickingHeader.pickingTasks);
            }
            catch (error) {
                return Promise.reject(error); // FIXME: send a proper error message
            }
        });
    }
    getHeaders(tasks) {
        let pickingTasks = [];
        let result = tasks.reduce((groupedTasks, currentTask) => {
            let task = groupedTasks[currentTask.materialId];
            if (!task) {
                if (!currentTask.Material.image1)
                    currentTask.Material.image1 =
                        "data:image/png;base64,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";
                task = {
                    qtyPending: 0,
                    qtyAssigned: 0,
                    wavePickingId: currentTask.wavePickingId,
                    Material: currentTask.Material,
                    Tasks: [],
                    icon: "arrow-dropright",
                    showDetails: false,
                    SerialNumbers: [],
                    qty: 0
                };
                groupedTasks[currentTask.materialId] = task;
                pickingTasks.push(task);
            }
            task.qtyPending += currentTask.quantityPending;
            task.qtyAssigned += currentTask.quantityAssigned;
            task.Tasks.push(currentTask);
            return groupedTasks;
        }, {});
        let objectPickingHeader = {
            pickingTasks: pickingTasks,
            objectReduce: result
        };
        return Promise.resolve(objectPickingHeader);
    }
    addSerialNumbersToTasks(pickingTasks) {
        return __awaiter(this, void 0, void 0, function* () {
            return pickingTasks.map((header) => {
                header.Tasks.forEach((task) => __awaiter(this, void 0, void 0, function* () {
                    if (task.isDiscretionary === enums_1.Enums.YesNo.Yes &&
                        header.Material.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
                        let request = models_1.DataRequest.Factory.createGetRequestedSerialNumbersInDiscretionalPickingByLicenseRequest(task.licenseIdSource, task.wavePickingId, task.materialId, this.settings.userCredentials);
                        task.Material.SerialNumbers = yield this.getSerialNumbersForPicking(request);
                    }
                    else {
                        task.Material.SerialNumbers = [];
                    }
                    return task;
                }));
                return header;
            });
        });
    }
    cancelPickingDetailLine(task) {
        return this.api.cancelPickingDetailLine(task);
    }
    getSerialNumbersForPicking(task) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let serials = yield this.api.getRequestedSerialNumbersInDiscretionalPickingByLicense(task);
                let serialNumbers = serials.map((serial) => {
                    let serialNumber = models_1.Model.Factory.createSerialNumber();
                    serialNumber.serial = serial.SERIAL;
                    return serialNumber;
                });
                return Promise.resolve(serialNumbers);
            }
            catch (error) {
                return Promise.reject(error); // FIXME: send a proper error message
            }
        });
    }
    updateScannedSerialNumberToProcess(request) {
        return this.api.updateScannedSerialNumberToProcess(request);
    }
    rollbackSerialNumbersOnProcess(request) {
        return this.api.rollbackSerialNumbersOnProcess(request);
    }
    updateSetActiveSerialNumber(request) {
        return this.api.updateSetActiveSerialNumber(request);
    }
    ValidateIfPickingLicenseIsAvailable(request) {
        return this.api.validateIfPickingLicenseIsAvailable(request);
    }
    registerGeneralDispatch(request) {
        return this.api.registerGeneralDispatch(request);
    }
    updateLocationTargetTask(request) {
        return this.api.updateLocationTargetTask(request);
    }
    getPickingMaterialsWithMeasurementUnit(request) {
        return this.api.getPickingMaterialsWithMeasurementUnit(request);
    }
    getLastDispatchLicenseGeneratedByWavePicking(request) {
        return this.api.getLastDispatchLicenseGeneratedByWavePicking(request);
    }
    insertLicenseDispatch(request) {
        return this.api.insertLicenseDispatch(request);
    }
    registerGeneralDispatchByRegimeGeneral(request) {
        return this.api.registerGeneralDispatchByRegimeGeneral(request);
    }
    getLicenseDispatchByWavePicking(request) {
        return this.api.getLicenseDispatchByWavePicking(request);
    }
    getTargetLocationByLicenseDispatch(request) {
        return this.api.getTargetLocationByLicenseDispatch(request);
    }
    locateLicenseDispatch(request) {
        return this.api.locateLicenseDispatch(request);
    }
    registerForRePlenishment(request) {
        return this.api.registerForReplenishment(request);
    }
    registerRePlenishment(request) {
        return this.api.registerReplenishment(request);
    }
    getWavePickingForLicenseDispatch(request) {
        return this.api.getWavePickingForLicenseDispatch(request);
    }
    getLicenseDispatchForPicking(request) {
        return this.api.getLicenseDispatchForPicking(request);
    }
    dispatchLicenseExit(request) {
        return this.api.dispatchLicenseExit(request);
    }
    getWavePickingPendingToLocate(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.getWavePickingPendingToLocate(request);
        });
    }
    completeTask(task, loginId, closeTask) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let receptionRequest = models_1.DataRequest.Factory.createReceptionRequest(this.settings.userCredentials);
                receptionRequest.transType = enums_1.Enums.TransType.GeneralReception;
                receptionRequest.loginId = loginId;
                receptionRequest.login = loginId.split("@")[0];
                receptionRequest.policyCode = task.sourcePolicyCode;
                receptionRequest.taskId = task.id;
                receptionRequest.status = enums_1.Enums.ReceptionStatus.Accepted;
                receptionRequest.completeTask = closeTask || enums_1.Enums.YesNo.No;
                let result = yield this.reception.recordAndCompleteTheTask(receptionRequest);
                return Promise.resolve(result);
            }
            catch (reason) {
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(reason, enums_1.Enums.CustomErrorCodes.DataBaseError)));
            }
        });
    }
    getSuggestedDispatchLicense(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.getSuggestedDispatchLicense(request);
        });
    }
    insertPilotFromDispatchLicense(request) {
        return this.api.insertPilotFromDispatchLicense(request);
    }
    insertVehicleFromDispatchLicence(request) {
        return this.api.insertVehicleFromDispatchLicence(request);
    }
    insertExitPassFromDispatchLicence(request) {
        return this.api.insertExitPassFromDispatchLicence(request);
    }
    getWavePickingPendingToDispatch(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.api.getWavePickingPendingToDispatch(request);
        });
    }
};
PickingProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider,
        user_settings_1.UserSettingsProvider,
        reception_1.ReceptionProvider])
], PickingProvider);
exports.PickingProvider = PickingProvider;
//# sourceMappingURL=picking.js.map