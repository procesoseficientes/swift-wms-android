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
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const license_1 = require("../../providers/license/license");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const _ = require("lodash");
const device_1 = require("../../providers/device/device");
let AddSeriesRankPage = class AddSeriesRankPage {
    constructor(navCtrl, navParams, navigation, workspace, settings, license, userInteraction, device) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.settings = settings;
        this.license = license;
        this.userInteraction = userInteraction;
        this.device = device;
        this.prefix = "";
        this.sufix = "";
        this.startValue = "";
        this.endValue = "";
        this.isAndroid = false;
        this.scanData = "";
        this.scannedSeries = [];
    }
    ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data => this.userWantToProcessScannedData(data));
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    processStartValueScan(scanData) {
        let numStart = scanData.replace(/\D/g, "");
        var parsedStart = parseInt(numStart);
        if (isNaN(parsedStart)) {
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.ValueIsNotANumber, this.startValue);
            return;
        }
        let strStart = scanData.replace(numStart, "");
        this.prefix = strStart;
        this.startValue = numStart;
        this.userWantsToChangeCurrentScan(enums_1.Enums.AddSeriesRankScan.EndValue);
        return Promise.resolve();
    }
    processEndValueScan(scanData) {
        let numEnd = scanData.replace(/\D/g, "");
        var parsedEnd = parseInt(numEnd);
        if (isNaN(parsedEnd)) {
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.ValueIsNotANumber, this.endValue);
            return;
        }
        this.endValue = numEnd;
        return Promise.resolve();
    }
    userWantToProcessScannedData(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.scanData = scanData;
                switch (this.currentScan) {
                    case enums_1.Enums.AddSeriesRankScan.StartValue:
                        yield this.processStartValueScan(scanData);
                        yield this.userInteraction.hideLoading();
                        break;
                    case enums_1.Enums.AddSeriesRankScan.EndValue:
                        yield this.processEndValueScan(scanData);
                        yield this.userInteraction.hideLoading();
                        break;
                    case enums_1.Enums.AddSeriesRankScan.None:
                        yield this.userInteraction.hideLoading();
                        break;
                    default:
                        throw new Error(enums_1.Enums.CustomErrorCodes.InvalidInput.toString());
                }
                return Promise.resolve();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(!isNaN(error) ? error : enums_1.Enums.CustomErrorCodes.InvalidInput, scanData);
                return Promise.resolve();
            }
        });
    }
    userWantsToChangeCurrentScan(newScan) {
        switch (newScan) {
            case enums_1.Enums.AddSeriesRankScan.StartValue:
                break;
            case enums_1.Enums.AddSeriesRankScan.EndValue:
                if (this.startValue == null || this.startValue == "")
                    return;
                break;
            default:
                return;
        }
        this.currentScan = newScan;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidLoad() {
        this.params = this.navParams.data;
        this.userWantsToChangeCurrentScan(enums_1.Enums.AddSeriesRankScan.StartValue);
    }
    userWantsAddSeriesRank() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                if (this.startValue == null || this.startValue.trim() == "") {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput);
                    return;
                }
                if (this.endValue == null || this.endValue.trim() == "") {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput);
                    return;
                }
                if (this.startValue.length != this.endValue.length) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.StartValueMustBeSameLenghtEndValue);
                    return;
                }
                if (isNaN(Number(this.startValue))) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.ValueIsNotANumber, this.startValue);
                    return;
                }
                if (isNaN(Number(this.endValue))) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.ValueIsNotANumber, this.endValue);
                    return;
                }
                this.params.licenseId =
                    this.params.operationType === enums_1.Enums.TaskType.GeneralDispatch
                        ? this.params.processSku.licenseId
                        : this.params.licenseId;
                let request = models_1.DataRequest.Factory.createAddSeriesRankRequest(this.params.operationType === enums_1.Enums.TaskType.PartialRelocation
                    ? this.params.baseLicenseId
                    : this.params.licenseId, this.params.operationType === enums_1.Enums.TaskType.GeneralDispatch
                    ? this.params.processSku.materialId
                    : this.params.material.materialId, null, null, this.prefix, this.startValue, this.endValue, this.sufix, null, this.params.operationType === enums_1.Enums.TaskType.GeneralDispatch
                    ? this.params.task.wavePickingId
                    : null, this.params.operationType, this.settings.userCredentials);
                let result = yield this.license.addSeriesRank(request);
                if (result[0].Resultado == enums_1.Enums.OperationResult.Success) {
                    result.forEach(serial => {
                        if (serial.SERIAL != null) {
                            if (this.params.operationType ==
                                enums_1.Enums.TaskType.Reception ||
                                this.navParams.data.operationType ==
                                    enums_1.Enums.TaskType.PartialRelocation) {
                                if (this.params.material.SerialNumbers == null) {
                                    this.params.material.SerialNumbers = [];
                                }
                                this.params.material.SerialNumbers.push({
                                    id: Number(serial.DbData),
                                    serial: serial.SERIAL,
                                    licenseId: this.params.operationType ===
                                        enums_1.Enums.TaskType.PartialRelocation
                                        ? this.params.baseLicenseId
                                        : this.params.licenseId
                                });
                            }
                            else if (this.navParams.data.operationType ==
                                enums_1.Enums.TaskType.GeneralDispatch) {
                                if (this.params.taskHeader.ScannedSeries == null) {
                                    this.params.taskHeader.ScannedSeries = [];
                                }
                                let serialFind = _.find(this.params.taskHeader.ScannedSeries, (serialNumber) => {
                                    return (serialNumber.serial === serial.SERIAL);
                                });
                                if (!serialFind) {
                                    --this.navParams.data.quantity;
                                    this.params.taskHeader.ScannedSeries.push({
                                        serial: serial.SERIAL,
                                        licenseId: this.params.licenseId,
                                        assignedTo: this.settings.userCredentials.loginId.split("@")[0],
                                        wavePickingId: this.params.task
                                            .wavePickingId,
                                        materialId: this.params.processSku
                                            .materialId
                                    });
                                }
                            }
                        }
                    });
                    return this.navigation.popPage(this.workspace, this.navCtrl, this.navParams.data);
                }
                else {
                    this.userInteraction.showCustomError(result[0].Codigo && result[0].Codigo > 0
                        ? result[0].Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, this.navParams.data);
    }
    scanBarcode() {
        return this.device.scan();
    }
};
AddSeriesRankPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-add-series-rank",
        templateUrl: "add-series-rank.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_settings_1.UserSettingsProvider,
        license_1.LicenseProvider,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider])
], AddSeriesRankPage);
exports.AddSeriesRankPage = AddSeriesRankPage;
//# sourceMappingURL=add-series-rank.js.map