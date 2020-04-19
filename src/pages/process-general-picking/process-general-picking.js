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
const ionic_angular_1 = require("ionic-angular");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const picking_1 = require("../../providers/picking/picking");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
const device_1 = require("../../providers/device/device");
const location_1 = require("../../providers/location/location");
const charge_1 = require("../../providers/charge/charge");
const label_1 = require("../../providers/label/label");
const printer_1 = require("../../providers/printer/printer");
const _ = require("lodash");
const transaction_operator_1 = require("../../providers/transaction-operator/transaction-operator");
const material_1 = require("../../providers/material/material");
const license_1 = require("../../providers/license/license");
const general_transfer_1 = require("../../providers/general-transfer/general-transfer");
let ProcessGeneralPickingPage = class ProcessGeneralPickingPage {
    constructor(navCtrl, navParams, navigation, workspace, pickingProvider, location, userInteraction, settings, device, chargeProvider, label, printer, picking, transactionOperator, materialProvider, license, generalTransfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.pickingProvider = pickingProvider;
        this.location = location;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.device = device;
        this.chargeProvider = chargeProvider;
        this.label = label;
        this.printer = printer;
        this.picking = picking;
        this.transactionOperator = transactionOperator;
        this.materialProvider = materialProvider;
        this.license = license;
        this.generalTransfer = generalTransfer;
        this.task = models_1.Model.Factory.createTask();
        this.processSku = models_1.Model.Factory.createProcessSku();
        this.scanData = "";
        this.isAndroid = false;
        this.licenseDispatchId = 0;
        this.shelfSpot = models_1.Model.Factory.createShelfSpot();
        this.regimenTask = enums_1.Enums.Regime.General;
        this.isGeneralTransfer = false;
    }
    backButtonAction() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                if (this.taskHeader.Material.serialNumberRequests ===
                    enums_1.Enums.YesNo.Yes) {
                    yield this.userWantsToRollbackSeries();
                }
                this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                let result = yield this.rollbackLabel();
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.userInteraction.hideLoading();
                    if (this.isGeneralTransfer) {
                        return yield this.navigationPopPage({
                            wavePickingId: this.task.wavePickingId,
                            regime: this.regimenTask,
                            task: this.task
                        });
                    }
                    else {
                        return yield this.navigationPopPage({
                            wavePickingId: this.task.wavePickingId,
                            regime: this.regimenTask,
                            task: this.task
                        });
                    }
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    rollbackLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createDeletePickingLabelRequest(this.labelId, this.settings.userCredentials);
            return this.label.deletePickingLabel(request);
        });
    }
    userWantsToChangeCurrentScan(newScan) {
        switch (newScan) {
            case enums_1.Enums.PickingScan.LicenseId:
                if (this.processSku.sourceLocation.length <= 0)
                    return;
                if (this.shelfSpot.allowFastPicking == 1)
                    return;
                break;
            case enums_1.Enums.PickingScan.MaterialBarcode:
                if (!this.processSku.licenseId &&
                    this.processSku.licenseId <= 0)
                    return;
                if (this.processSku.sourceLocation.length <= 0)
                    return;
                break;
            case enums_1.Enums.PickingScan.SourceLocation:
                this.currentScan = newScan;
                return;
            default:
                return;
        }
        this.currentScan = newScan;
    }
    showScanIcon(option) {
        if (option === enums_1.Enums.PickingScan.LicenseId &&
            this.shelfSpot.allowFastPicking == 1) {
            return false;
        }
        else {
            return option === this.currentScan;
        }
    }
    scanBarcode() {
        return this.device.scan();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isAndroid = this.device.isAndroid();
                let params = this.navParams.data;
                this.task = null;
                this.task = params.task;
                this.task.quantityPendingWithUnitMsr = this.task.quantityPending;
                this.taskHeader = params.taskHeader;
                this.labelId = params.labelId;
                this.materials = params.materials;
                this.licenseDispatchId = params.labelDispatchId;
                this.regimenTask = params.regime;
                this.isGeneralTransfer = params.isGeneralTransfer || false;
                this.shelfSpot = yield this.location.getLocation(models_1.DataRequest.Factory.createGetLocationRequest(this.task.locationSpotSource, this.settings.userCredentials));
                if (this.shelfSpot.allowFastPicking == 1) {
                    this.processSku.licenseId = this.task.licenseIdSource;
                }
                this.scanToken = this.device.subscribeToScanner(data => this.userWantToProcessScannedData(data));
                this.userWantsToChangeCurrentScan(enums_1.Enums.PickingScan.SourceLocation);
                if (this.navParams.data.processSku) {
                    this.processSku = this.navParams.data.processSku;
                    if (!params.completeScanSeries) {
                        this.processSku.sourceLocation = null;
                        this.processSku.materialBarcode = null;
                        this.currentScan = enums_1.Enums.PickingScan.SourceLocation;
                    }
                    else {
                        this.currentScan = enums_1.Enums.PickingScan.None;
                    }
                }
                else {
                    this.processSku.wavePickingId = this.task.wavePickingId;
                    this.processSku.materialId = this.task.materialId;
                }
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.LoadPage);
            }
            this.userInteraction.hideLoading();
        });
    }
    userWantToProcessScannedData(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.scanData = scanData;
                switch (this.currentScan) {
                    case enums_1.Enums.PickingScan.SourceLocation:
                        yield this.processLocationScan(scanData);
                        yield this.userInteraction.hideLoading();
                        break;
                    case enums_1.Enums.PickingScan.MaterialBarcode:
                        yield this.processMaterialScan(scanData);
                        break;
                    case enums_1.Enums.PickingScan.LicenseId:
                        yield this.processLicenseScan(scanData);
                        yield this.userInteraction.hideLoading();
                        break;
                    case enums_1.Enums.PickingScan.None:
                        yield this.userInteraction.hideLoading();
                        break;
                    default:
                        throw new Error(enums_1.Enums.CustomErrorCodes.InvalidInput.toString());
                }
                return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(!isNaN(error) ? error : enums_1.Enums.CustomErrorCodes.InvalidInput, scanData);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(error.message, enums_1.Enums.CustomErrorCodes.InvalidInput)));
            }
        });
    }
    processLocationScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.validateLocation(scanData)) {
                this.processSku.sourceLocation = scanData;
                if (this.shelfSpot.allowFastPicking == 1) {
                    this.processSku.licenseId = this.task.licenseIdSource;
                    this.userWantsToChangeCurrentScan(enums_1.Enums.PickingScan.MaterialBarcode);
                }
                else {
                    this.userWantsToChangeCurrentScan(enums_1.Enums.PickingScan.LicenseId);
                    this.processSku.licenseId = null;
                    this.processSku.materialBarcode = "";
                }
                let shelfSpot = yield this.location.getLocation(models_1.DataRequest.Factory.createGetLocationRequest(scanData, this.settings.userCredentials));
                this.processSku.useMt2 =
                    shelfSpot.spotType === enums_1.Enums.LocationType.Floor;
                this.processSku.locationType = shelfSpot.spotType;
                return Promise.resolve();
            }
            else {
                return Promise.reject("Invalid location");
            }
        });
    }
    validateLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            if (location.toUpperCase() ===
                this.task.locationSpotSource.toUpperCase())
                return Promise.resolve(true);
            if (this.taskHeader.Material.batchRequested === enums_1.Enums.YesNo.Yes) {
                let newTask = this.taskHeader.Tasks.find((task) => {
                    return task.locationSpotSource === location;
                });
                if (newTask) {
                    this.task = newTask;
                }
                return Promise.resolve(!!newTask);
            }
            else if (this.taskHeader.Material.batchRequested === enums_1.Enums.YesNo.No) {
                this.processSku.sourceLocation = location;
                let response = yield this.pickingProvider.ValidateIfPickingLicenseIsAvailable(models_1.DataRequest.Factory.createValidateIfPickingLicenseIsAvailableRequest(this.processSku, this.settings.userCredentials));
                if (response.length > 0) {
                    if (this.shelfSpot.allowFastPicking == 0) {
                        this.task.licenseIdSource = null;
                    }
                    this.processSku.sourceLocation = location;
                    return Promise.resolve(true);
                }
                else {
                    this.processSku.sourceLocation = "";
                    return Promise.resolve(false);
                }
            }
            else {
                return Promise.resolve(false);
            }
        });
    }
    processMaterialScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            let material = _.find(this.materials, m => {
                return (m.MATERIAL_ID === this.task.materialId &&
                    (scanData === m.BARCODE_ID || scanData === m.ALTERNATE_BARCODE));
            });
            if (material) {
                let convertedQty = this.task.quantityPending / material.QTY;
                if (convertedQty <= 0) {
                    this.userInteraction.hideLoading();
                    return Promise.reject(enums_1.Enums.CustomErrorCodes.InputExceedsTasksAssignedQuantity);
                }
                this.processSku.materialBarcode = scanData;
                this.processSku.quantity = convertedQty;
                this.processSku.unitMsr = `${material.MEASUREMENT_UNIT} 1x${material.QTY}`;
                this.processSku.unitMsrQty = material.QTY;
                this.task.quantityPendingWithUnitMsr = convertedQty;
                let requestGetInfoBatch = models_1.DataRequest.Factory.createGetInfoBatch(this.processSku.materialId, this.processSku.licenseId, this.settings.userCredentials);
                let result = yield this.materialProvider.getInfoBatch(requestGetInfoBatch);
                this.processSku.batch = result.BATCH;
                this.processSku.dateExpiration = result.DATE_EXPIRATION;
                if (this.taskHeader.Material.serialNumberRequests ===
                    enums_1.Enums.YesNo.Yes) {
                    this.processSku.requestSerial = true;
                    this.navigationPage(enums_1.Enums.Page.ProcessGeneralPickingSeries, {
                        taskHeader: this.taskHeader,
                        task: this.task,
                        processSku: this.processSku,
                        labelId: this.labelId,
                        materials: this.materials,
                        labelDispatchId: this.licenseDispatchId,
                        regime: this.regimenTask
                    });
                }
                else {
                    this.userInteraction.hideLoading();
                }
                return Promise.resolve();
            }
            else {
                this.userInteraction.hideLoading();
                return Promise.reject(enums_1.Enums.CustomErrorCodes.InvalidInput);
            }
        });
    }
    processLicenseScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            let licenseCode = scanData.split("-");
            let licenseId = licenseCode.length > 0 ? Number(licenseCode[0]) : Number(scanData);
            let isValidLicense = yield this.validateLicense(licenseId);
            if (isNaN(licenseId) || !isValidLicense) {
                return Promise.reject(enums_1.Enums.CustomErrorCodes.InvalidInput);
            }
            this.processSku.licenseId = licenseId;
            this.processSku.materialBarcode = "";
            this.task.licenseIdSource = licenseId;
            this.userWantsToChangeCurrentScan(enums_1.Enums.PickingScan.MaterialBarcode);
            return Promise.resolve();
        });
    }
    validateLicense(licenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (licenseId === this.task.licenseIdSource)
                return Promise.resolve(true);
            if (this.taskHeader.Material.batchRequested === enums_1.Enums.YesNo.Yes) {
                let newTask = this.taskHeader.Tasks.find((task) => {
                    return (task.licenseIdSource === licenseId &&
                        task.locationSpotSource === this.processSku.sourceLocation);
                });
                if (newTask) {
                    this.task = newTask;
                }
                return Promise.resolve(!!newTask);
            }
            else if (this.taskHeader.Material.batchRequested === enums_1.Enums.YesNo.No) {
                this.processSku.licenseId = licenseId;
                let response = yield this.pickingProvider.ValidateIfPickingLicenseIsAvailable(models_1.DataRequest.Factory.createValidateIfPickingLicenseIsAvailableRequest(this.processSku, this.settings.userCredentials));
                if (response.length > 0) {
                    this.processSku.licenseId = licenseId;
                    this.processSku.quantity =
                        response[0].QUANTITY_PENDING > response[0].QTY
                            ? response[0].QTY
                            : response[0].QUANTITY_PENDING;
                    return Promise.resolve(true);
                }
                else {
                    this.processSku.licenseId = null;
                    return Promise.resolve(false);
                }
            }
            else {
                return Promise.resolve(false);
            }
        });
    }
    userWantsToProcessPicking() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                if (this.processSku.quantity > this.task.quantityPendingWithUnitMsr) {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidQuantity);
                    return Promise.resolve(false);
                }
                if (!this.isGeneralTransfer) {
                    let dataRequest = models_1.DataRequest.Factory.createRegisterGeneralDispatchByRegimeGeneral(this.processSku, this.task, this.licenseDispatchId, this.settings.userCredentials);
                    let operation = yield this.pickingProvider.registerGeneralDispatchByRegimeGeneral(dataRequest);
                    if (operation.Resultado !== enums_1.Enums.OperationResult.Success) {
                        yield this.userInteraction.hideLoading();
                        yield this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                        return Promise.resolve(false);
                    }
                    yield this.saveLog();
                }
                else {
                    let isLicenseQtyLess = yield this.isLicenseQtyLess(this.processSku.quantity * this.processSku.unitMsrQty);
                    if (isLicenseQtyLess) {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidQuantity);
                        return Promise.resolve(false);
                    }
                    let dataRequest = models_1.DataRequest.Factory.createRegisterGeneralTransferPickingRequest(this.processSku, this.task, this.processSku.usedMt2, this.licenseDispatchId, this.settings.userCredentials);
                    let operation = yield this.generalTransfer.registerGeneralTransferPicking(dataRequest);
                    if (operation.Resultado !== enums_1.Enums.OperationResult.Success) {
                        yield this.userInteraction.hideLoading();
                        yield this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                        return Promise.resolve(false);
                    }
                    yield this.saveLog();
                }
                let requestLabel = models_1.DataRequest.Factory.createUpdatePickingLabelRequest(this.labelId, this.task.clientOwner, this.processSku.licenseId, this.processSku.materialBarcode, this.processSku.quantity * this.processSku.unitMsrQty, this.task.targetPolicyCode, this.processSku.sourceLocation, this.task.locationSpotTarget, this.settings.login, this.task.id.toString(), this.task.wavePickingId, this.settings.userCredentials);
                yield this.label.updatePickingLabel(requestLabel);
                let request = models_1.DataRequest.Factory.createChargeByMobileRequest(this.task.licenseIdSource, enums_1.Enums.TransType.Picking, this.settings.userCredentials);
                let charges = yield this.chargeProvider.getCharges(request);
                if (charges.length) {
                    if (this.isGeneralTransfer) {
                        this.navigationPage(enums_1.Enums.Page.LicenseCharges, {
                            charges: charges,
                            licenseId: this.licenseDispatchId,
                            wavePickingId: this.task.wavePickingId,
                            transType: enums_1.Enums.TransType.Picking,
                            times: 1,
                            regime: this.regimenTask,
                            task: this.task
                        });
                    }
                    else {
                        this.navigationPage(enums_1.Enums.Page.LicenseCharges, {
                            charges: charges,
                            licenseId: this.task.licenseIdSource,
                            wavePickingId: this.task.wavePickingId,
                            transType: enums_1.Enums.TransType.Picking,
                            times: 1,
                            regime: this.regimenTask,
                            task: this.task
                        });
                    }
                }
                else {
                    if (this.isGeneralTransfer) {
                        this.navigationPopPage({
                            wavePickingId: this.task.wavePickingId,
                            regime: this.regimenTask,
                            task: this.task
                        });
                    }
                    else {
                        this.navigationPopPage({
                            wavePickingId: this.task.wavePickingId,
                            regime: this.regimenTask,
                            task: this.task
                        });
                    }
                }
                return Promise.resolve(true);
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InternalServerError);
                return Promise.resolve(false);
            }
        });
    }
    saveLog() {
        try {
            this.transactionOperator.addTransactionByOperator({
                dateCreated: new Date(),
                licenseId: this.task.licenseIdSource,
                location: this.task.locationSpotSource,
                materialId: this.processSku.materialId,
                materialName: this.task.materialName,
                qty: this.processSku.quantity,
                taskType: enums_1.Enums.TaskTypeLog.Picking,
                taskId: this.task.wavePickingId,
                loginId: this.settings.userCredentials.loginId
            });
        }
        catch (error) {
            this.userInteraction.toast("Error at save log transaction:", enums_1.Enums.ToastTime.Short);
        }
        return Promise.resolve();
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    userWantsToRollbackSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(this.task.licenseIdSource, this.task.wavePickingId, this.task.materialId, enums_1.Enums.TaskType.GeneralDispatch, this.settings.userCredentials);
                let response = yield this.pickingProvider.rollbackSerialNumbersOnProcess(request);
                if (response.Resultado === enums_1.Enums.OperationResult.Success) {
                    return Promise.resolve();
                }
                else {
                    yield this.userInteraction.hideLoading();
                    yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            return Promise.resolve();
        });
    }
    printLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                let request = models_1.DataRequest.Factory.createGetLabelPrintFormatRequest(this.labelId, this.settings.userCredentials);
                let format = yield this.printer.getLabelPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    insertLicenseDispatch() {
        return __awaiter(this, void 0, void 0, function* () {
            let insertLicenseDispatchRequest = models_1.DataRequest.Factory.createInsertLicenseDispatch(this.task.wavePickingId, this.settings.userCredentials);
            let result = yield this.picking.insertLicenseDispatch(insertLicenseDispatchRequest);
            if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                this.licenseDispatchId = parseInt(result.DbData);
            }
            else {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                    ? result.Codigo
                    : enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    printLicenseDispatch() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                let request = models_1.DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(this.licenseDispatchId, this.settings.userCredentials);
                let format = yield this.printer.getLicenseDispatchPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    navigationPage(page, params) {
        this.navigation.pushPage(page, this.workspace, this.navCtrl, params);
    }
    navigationPopPage(params) {
        this.navigation.popPage(this.workspace, this.navCtrl, params);
    }
    isLicenseQtyLess(qtyWithMsrUnit) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestInvXLicense = models_1.DataRequest.Factory.createGetInventoryByLicenseRequest(this.task.licenseIdSource, this.settings.userCredentials);
            let inventory = yield this.license.getInventoryByLicense(requestInvXLicense, this.settings.userCredentials);
            let licenseInfo = _.first(inventory);
            if (qtyWithMsrUnit > licenseInfo.qty) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
        });
    }
};
ProcessGeneralPickingPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-process-general-picking",
        templateUrl: "process-general-picking.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        picking_1.PickingProvider,
        location_1.LocationProvider,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        device_1.DeviceProvider,
        charge_1.ChargeProvider,
        label_1.LabelProvider,
        printer_1.PrinterProvider,
        picking_1.PickingProvider,
        transaction_operator_1.TransactionOperatorProvider,
        material_1.MaterialProvider,
        license_1.LicenseProvider,
        general_transfer_1.GeneralTransferProvider])
], ProcessGeneralPickingPage);
exports.ProcessGeneralPickingPage = ProcessGeneralPickingPage;
//# sourceMappingURL=process-general-picking.js.map