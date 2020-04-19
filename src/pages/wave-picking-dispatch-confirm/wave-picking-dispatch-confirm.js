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
const models_1 = require("../../models/models");
const device_1 = require("../../providers/device/device");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const picking_1 = require("../../providers/picking/picking");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const configuration_1 = require("../../providers/configuration/configuration");
let WavePickingDispatchConfirmPage = class WavePickingDispatchConfirmPage {
    constructor(navCtrl, navParams, device, navigation, workspace, userInteraction, picking, settings, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.picking = picking;
        this.settings = settings;
        this.configuration = configuration;
        this.isAndroid = false;
        this.wavePickingForLicenseDispatch = models_1.Model.Factory.createWavePickingForLicenseDispatch();
        this.licenseDispatch = [];
        this.completedLicenses = 0;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
        let params = this.navParams
            .data;
        if (params.wavePickingForLicenseDispatch) {
            this.wavePickingForLicenseDispatch =
                params.wavePickingForLicenseDispatch;
            this.showPage();
        }
        else {
            this.backButtonAction();
        }
        this.userInteraction.hideLoading();
    }
    processBarcodeScan(scanData) {
        let licenseCode = scanData.split("-");
        let licenseId = licenseCode.length > 0 ? Number(licenseCode[0]) : Number(scanData);
        if (isNaN(licenseId)) {
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, scanData);
            return Promise.resolve(false);
        }
        let licenseTemp = this.licenseDispatch.find(l => {
            return l.licenseId == licenseId && l.showScanIcon;
        });
        if (!licenseTemp) {
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes
                .LicenseScannedDoesNotMatchWithLicenseDispatch);
            return Promise.resolve(false);
        }
        this.scanData = scanData.split("-")[0];
        this.inputSearch = scanData.split("-")[0];
        this.completedLicense();
        return Promise.resolve(true);
    }
    completedLicense() {
        let license = +this.inputSearch;
        let licenseTemp = this.licenseDispatch.find(l => {
            return l.licenseId == license && l.showScanIcon;
        });
        if (licenseTemp) {
            licenseTemp.showScanIcon = false;
            licenseTemp.isComplete = true;
            this.checkLicenses();
        }
        else {
            this.checkLicenses();
        }
    }
    checkLicenses() {
        this.completedLicenses = 0;
        this.licenseDispatch.forEach(licenseOrgin => {
            if (licenseOrgin.isComplete) {
                this.completedLicenses += 1;
            }
        });
        let licenseTemp = this.licenseDispatch.find(l => {
            return !l.isComplete;
        });
        if (licenseTemp) {
            licenseTemp.showScanIcon = true;
        }
    }
    checkCompletedLicenses() {
        let completedScanLicenses = true;
        this.licenseDispatch.forEach(licenseOrgin => {
            if (completedScanLicenses) {
                if (!licenseOrgin.isComplete) {
                    completedScanLicenses = false;
                }
            }
        });
        return completedScanLicenses;
    }
    scanBarcode() {
        return this.device.scan();
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
    showPage() {
        return __awaiter(this, void 0, void 0, function* () {
            let licenseDispatchForPicking = yield this.getWavePickingForLicenseDispatch();
            if (licenseDispatchForPicking.length > 0) {
                let correlative = 1;
                licenseDispatchForPicking.forEach(licenseOrgin => {
                    let licenseTemp = this.licenseDispatch.find(l => {
                        return l.licenseId == licenseOrgin.LICENSE_ID;
                    });
                    if (licenseTemp) {
                        let detail = models_1.Model.Factory.createDetailLicenseDispatch();
                        detail.materialId = licenseOrgin.MATERIAL_ID;
                        detail.materialName = licenseOrgin.MATERIAL_NAME;
                        detail.qty = licenseOrgin.QTY;
                        detail.qtyOrigin = licenseOrgin.QTY_ORIGIN;
                        licenseTemp.detail.push(detail);
                    }
                    else {
                        let license = models_1.Model.Factory.createLicenseDispatch();
                        license.licenseId = licenseOrgin.LICENSE_ID;
                        license.location = licenseOrgin.CURRENT_LOCATION;
                        license.pickedBy = licenseOrgin.LAST_UPDATED_BY;
                        license.correlative = correlative;
                        correlative += 1;
                        let detail = models_1.Model.Factory.createDetailLicenseDispatch();
                        detail.materialId = licenseOrgin.MATERIAL_ID;
                        detail.materialName = licenseOrgin.MATERIAL_NAME;
                        detail.qty = licenseOrgin.QTY;
                        detail.qtyOrigin = licenseOrgin.QTY_ORIGIN;
                        license.detail.push(detail);
                        this.licenseDispatch.push(license);
                    }
                });
                if (this.licenseDispatch.length > 0) {
                    this.licenseDispatch[0].showScanIcon = true;
                    this.userInteraction.hideLoading();
                }
                else {
                    this.userInteraction.hideLoading();
                }
                let request = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.DispatchLicenseExit, enums_1.Enums.ParameterId.ScanAllLicenses, this.settings.userCredentials);
                let parameter = yield this.configuration.getParameter(request);
                if (parameter &&
                    parameter.length &&
                    Number(parameter[0].VALUE) === enums_1.Enums.YesNo.Yes) {
                    this.licenseDispatch.forEach(licenseOrgin => {
                        licenseOrgin.showScanIcon = false;
                        licenseOrgin.isComplete = true;
                    });
                    this.completedLicenses = this.licenseDispatch.length;
                }
            }
            else {
                this.userInteraction.hideLoading();
            }
        });
    }
    getWavePickingForLicenseDispatch() {
        let request = models_1.DataRequest.Factory.createGetLicenseDispatchForPickingRequest(this.wavePickingForLicenseDispatch.WAVE_PICKING_ID, this.settings.userCredentials);
        return this.picking.getLicenseDispatchForPicking(request);
    }
    toggleDetails(license) {
        this.licenseDispatch.forEach(licenseOrgin => {
            if (licenseOrgin.licenseId !== license.licenseId) {
                licenseOrgin.showDetails = false;
                licenseOrgin.icon = "arrow-dropright-circle";
            }
            licenseOrgin.showScanIcon = false;
        });
        if (!license.isComplete) {
            license.showScanIcon = true;
        }
        else {
            this.checkLicenses();
        }
        if (license.showDetails) {
            license.showDetails = false;
            license.icon = "arrow-dropright-circle";
            return false;
        }
        else {
            license.showDetails = true;
            license.icon = "arrow-dropup-circle";
            return true;
        }
    }
    completedProcessLicensesDispatch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            let listLicenseDispatch = [];
            this.licenseDispatch.forEach(licenseOrgin => {
                licenseOrgin.detail.forEach(detail => {
                    let license = models_1.Model.Factory.createLicenseDispatchForPickingRequest();
                    license.LICENSE_ID = licenseOrgin.licenseId;
                    license.CURRENT_LOCATION = licenseOrgin.location;
                    license.LAST_UPDATED_BY = licenseOrgin.pickedBy;
                    license.MATERIAL_ID = detail.materialId;
                    license.MATERIAL_NAME = detail.materialId;
                    license.QTY = detail.qty;
                    license.QTY_ORIGIN = detail.qtyOrigin;
                    listLicenseDispatch.push(license);
                });
            });
            let request = models_1.DataRequest.Factory.createDispatchLicenseExitRequest(listLicenseDispatch, this.wavePickingForLicenseDispatch.WAVE_PICKING_ID, this.settings.userCredentials);
            let operation = yield this.picking.dispatchLicenseExit(request);
            if (operation.Resultado === enums_1.Enums.OperationResult.Success) {
                yield this.userInteraction.hideLoading();
                return this.navigation.pushPage(enums_1.Enums.Page.GenerateExitPassFromDispatch, this.workspace, this.navCtrl, {
                    dispatchNumber: parseInt(operation.DbData)
                });
            }
            else {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                    ? operation.Codigo
                    : enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    validateInputNumber(detail) {
        let qtyInput = detail.qty;
        if (isNaN(qtyInput) ||
            detail.qty.toString() === "" ||
            detail.qty > detail.qtyOrigin ||
            detail.qty < 0) {
            if (isNaN(qtyInput)) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, "");
            }
            else {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, detail.qty.toString());
            }
            detail.qty = detail.qtyOrigin;
            return;
        }
    }
    showDocNum(wavePickingForLicenseDispatch) {
        if (wavePickingForLicenseDispatch.CLIENT_NAME ==
            enums_1.Enums.WaveDispatchConsolidated.Consolidated) {
            return enums_1.Enums.WaveDispatchLabel.Consolidated.toString();
        }
        else {
            return wavePickingForLicenseDispatch.DOC_NUM.toString();
        }
    }
    showClientName(wavePickingForLicenseDispatch) {
        if (wavePickingForLicenseDispatch.CLIENT_NAME ==
            enums_1.Enums.WaveDispatchConsolidated.Consolidated) {
            return enums_1.Enums.WaveDispatchLabel.Consolidated.toString();
        }
        else {
            return wavePickingForLicenseDispatch.CLIENT_NAME;
        }
    }
    validateColor(detail) {
        if (detail.qty < detail.qtyOrigin) {
            return enums_1.Enums.WaveDispatchCssRowName.incompleteRow.toString();
        }
        if (detail.qty == detail.qtyOrigin) {
            return enums_1.Enums.WaveDispatchCssRowName.completeRow.toString();
        }
        else {
            return enums_1.Enums.WaveDispatchCssRowName.notAllowedRow.toString();
        }
    }
};
WavePickingDispatchConfirmPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-wave-picking-dispatch-confirm",
        templateUrl: "wave-picking-dispatch-confirm.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        device_1.DeviceProvider,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        picking_1.PickingProvider,
        user_settings_1.UserSettingsProvider,
        configuration_1.ConfigurationProvider])
], WavePickingDispatchConfirmPage);
exports.WavePickingDispatchConfirmPage = WavePickingDispatchConfirmPage;
//# sourceMappingURL=wave-picking-dispatch-confirm.js.map