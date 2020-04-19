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
const enums_1 = require("../../enums/enums");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const device_1 = require("../../providers/device/device");
const models_1 = require("../../models/models");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const translate_1 = require("../../providers/translate/translate");
const physical_count_1 = require("../../providers/physical-count/physical-count");
const _ = require("lodash");
let PhysicalCountPage = class PhysicalCountPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, device, settings, translate, physicalCount) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.device = device;
        this.settings = settings;
        this.translate = translate;
        this.physicalCount = physicalCount;
        this.isAndroid = false;
        this.licenseId = 0;
        this.material = {};
        this.currentScan = enums_1.Enums.PhysicalCountScan.LicenseId;
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let params = this.navParams.data;
                this.locationSpot = params.locationSpot;
                this.taskId = params.taskId;
                this.isAndroid = this.device.isAndroid();
                this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
                this.userInteraction.hideLoading();
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    processBarcodeScan(scanData) {
        this.processScan(scanData);
        return Promise.resolve();
    }
    scanBarcode() {
        return this.device.scan();
    }
    changeCurrentScan(newScan) {
        this.currentScan = newScan;
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    showContextualMenu() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let messages = yield Promise.all([
                    this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.ShowCountMaterials),
                    this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Cancel)
                ]);
                let buttons = [
                    {
                        text: messages[0],
                        handler: () => __awaiter(this, void 0, void 0, function* () {
                            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                            this.checkForCountMaterials();
                        })
                    },
                    {
                        text: messages[1],
                        role: "cancel",
                        handler: () => {
                            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        }
                    }
                ];
                return this.userInteraction.showOptionAlert(null, buttons);
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    checkForCountMaterials() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetNextMaterialForCountRequest(Number(this.taskId), this.locationSpot, this.settings.userCredentials);
                let materials = yield this.physicalCount.getNextMaterialForCount(request);
                if (materials) {
                    this.navigation.pushPage(enums_1.Enums.Page.PhysicalCountMaterials, this.workspace, this.navCtrl, {
                        taskId: this.taskId,
                        locationSpot: this.locationSpot,
                        materials: materials
                    });
                    return Promise.resolve(true);
                }
                else {
                    this.userInteraction.hideLoading();
                    return Promise.resolve(false);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    finishLocation() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DoYouWishToContinue);
                let confirmation = yield this.userInteraction.showConfirmMessage(message);
                if (confirmation === enums_1.Enums.YesNo.No)
                    return;
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createFinishLocationRequest(Number(this.taskId), this.locationSpot, this.settings.userCredentials);
                let result = yield this.physicalCount.finishLocation(request);
                if (result.RESULT === enums_1.Enums.OK.OK ||
                    result.RESULT === enums_1.Enums.OK.Completed) {
                    this.navigation.popPage(this.workspace, this.navCtrl, {
                        taskId: this.taskId
                    });
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.BadRequest);
                    return Promise.resolve(false);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    processScan(scanData) {
        switch (this.currentScan) {
            case enums_1.Enums.PhysicalCountScan.LicenseId:
                this.licenseId = Number(scanData.split("-")[0]);
                if (Number(this.licenseId) > 0) {
                    this.changeCurrentScan(enums_1.Enums.PhysicalCountScan.MaterialBarcode);
                    this.material = {
                        MATERIAL_ID: "",
                        MATERIAL_NAME: "",
                        SHORT_NAME: "",
                        SERIAL_NUMBER_REQUESTS: 0,
                        BATCH_REQUESTED: 0,
                        LICENSE_ID: 0,
                        BATCH: "",
                        UNIT: "Unidad Base 1x1",
                        UNIT_QTY: 1,
                        EXPIRATION_DATE: new Date(),
                        QTY: 0
                    };
                    this.serialNumber = "";
                }
                else {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, scanData);
                }
                break;
            case enums_1.Enums.PhysicalCountScan.MaterialBarcode:
                this.processMaterialScan(scanData);
                this.serialNumber = "";
                break;
            case enums_1.Enums.PhysicalCountScan.SerialNumber:
                this.processMaterial(scanData, 1);
                this.serialNumber = "";
                break;
            default:
                this.processMaterial(scanData, 1);
                break;
        }
    }
    processMaterialScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialByBarcodeRequest(scanData, this.licenseId, this.settings.userCredentials);
                let result = yield this.physicalCount.getMaterialByBarcodeForPhysicalCount(request);
                if (result.length > 0) {
                    this.material = _.first(result);
                    this.userInteraction.hideLoading();
                    this.changeCurrentScan(enums_1.Enums.PhysicalCountScan.SerialNumber);
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, scanData);
                    return Promise.resolve(false);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    processMaterial(serial, qty) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createValidateRecountedMaterialForTaskRequest(Number(this.taskId), this.locationSpot, this.licenseId, this.material.MATERIAL_ID, this.material.BATCH ? this.material.BATCH : null, serial, this.settings.userCredentials);
                let result = yield this.physicalCount.validateRecountedMaterialForTask(request);
                if (result.Mensaje !== enums_1.Enums.OK.OK) {
                    let buttonText = yield Promise.all([
                        this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Add),
                        this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Replace)
                    ]);
                    let buttons = [
                        {
                            text: buttonText[0],
                            handler: () => {
                                this.insertCount(qty, serial, enums_1.Enums.ReceptionAction.Add);
                                this.userInteraction.activeAlert = null;
                            }
                        },
                        {
                            text: buttonText[1],
                            handler: () => {
                                this.insertCount(qty, serial, enums_1.Enums.ReceptionAction.Update);
                                this.userInteraction.activeAlert = null;
                            }
                        }
                    ];
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showOptionAlert(null, buttons, enums_1.Enums.Translation.Alert.MaterialAlreadyInLicense);
                }
                else {
                    return this.insertCount(qty, serial, enums_1.Enums.ReceptionAction.Insert);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.serialNumber = "";
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    insertCount(qty, serial, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let insertReq = models_1.DataRequest.Factory.createInsertCountExecutionOperationRequest(Number(this.taskId), this.locationSpot, this.licenseId, this.material.MATERIAL_ID, qty * this.material.UNIT_QTY, this.material.BATCH ? this.material.EXPIRATION_DATE : null, this.material.BATCH ? this.material.BATCH : null, serial, type, this.settings.userCredentials);
                let insertResult = yield this.physicalCount.insertCountExecutionOperation(insertReq);
                if (insertResult.Resultado === enums_1.Enums.OperationResult.Success) {
                    if (this.material.SERIAL_NUMBER_REQUESTS === enums_1.Enums.YesNo.No) {
                        this.material = {
                            MATERIAL_ID: "",
                            MATERIAL_NAME: "",
                            SHORT_NAME: "",
                            SERIAL_NUMBER_REQUESTS: 0,
                            BATCH_REQUESTED: 0,
                            LICENSE_ID: 0,
                            UNIT: "Unidad Base 1x1",
                            UNIT_QTY: 1,
                            BATCH: "",
                            EXPIRATION_DATE: new Date(),
                            QTY: 0
                        };
                        this.currentScan = enums_1.Enums.PhysicalCountScan.MaterialBarcode;
                    }
                    this.serialNumber = "";
                    this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(insertResult.Codigo);
                    this.serialNumber = "";
                    return Promise.resolve(false);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.serialNumber = "";
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
        });
    }
    keyPressSerial(keyCode) {
        if (keyCode === enums_1.Enums.KeyCode.Enter &&
            this.material.MATERIAL_ID &&
            this.serialNumber) {
            this.processMaterial(this.serialNumber, 1);
        }
    }
    keyPressQuantity(keyCode) {
        if (keyCode === enums_1.Enums.KeyCode.Enter &&
            this.material.MATERIAL_ID &&
            this.material.QTY > 0) {
            this.processMaterial(null, this.material.QTY);
        }
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl, {
            taskId: this.taskId
        });
    }
};
PhysicalCountPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-physical-count",
        templateUrl: "physical-count.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        translate_1.TranslateProvider,
        physical_count_1.PhysicalCountProvider])
], PhysicalCountPage);
exports.PhysicalCountPage = PhysicalCountPage;
//# sourceMappingURL=physical-count.js.map