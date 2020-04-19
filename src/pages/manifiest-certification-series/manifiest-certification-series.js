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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const device_1 = require("../../providers/device/device");
const manifest_certification_1 = require("../../providers/manifest-certification/manifest-certification");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const translate_1 = require("../../providers/translate/translate");
const models_1 = require("../../models/models");
const _ = require("lodash");
let ManifiestCertificationSeriesPage = class ManifiestCertificationSeriesPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, device, manifestCertification, settings, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.device = device;
        this.manifestCertification = manifestCertification;
        this.settings = settings;
        this.translate = translate;
        this.certificationId = 0;
        this.manifestId = "";
        this.materialId = "";
        this.completedPercentage = 0;
        this.scannedSeries = [];
        this.isAndroid = false;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        try {
            this.isAndroid = this.device.isAndroid();
            let params = this.navParams.data;
            this.certificationId = params.certificationId;
            this.manifestId = params.manifestId;
            this.materialId = params.materialId;
            this.getProcessedSeries();
            this.validateCompletedCertification();
            this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
            this.userInteraction.hideLoading();
        }
        catch (e) {
            this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.BadRequest);
        }
    }
    scanBarcode() {
        return this.device.scan();
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            certificationId: this.certificationId,
            manifestId: this.manifestId,
            fromSeries: true
        });
    }
    processBarcodeScan(scanData) {
        return this.insertSerie(scanData);
    }
    userWantsToFinishProcesingSeries() {
        return this.backButtonAction();
    }
    getProcessedSeries() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGetCertificationDetailOfSerialNumberRequest(this.certificationId, this.settings.userCredentials);
                let result = yield this.manifestCertification.getCertificationDetailOfSerialNumber(request);
                this.scannedSeries = result.map((serial) => {
                    if (serial.MATERIAL_ID === this.materialId) {
                        let newSerie = models_1.Model.Factory.createSerialNumber();
                        newSerie.materialId = serial.MATERIAL_ID;
                        newSerie.serial = serial.SERIAL_NUMBER;
                        return newSerie;
                    }
                });
                return Promise.resolve(this.scannedSeries);
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(null);
            }
        });
    }
    showDeleteSerieConfirmation(s) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.hideLoading();
            let confirmation = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DeleteSerie);
            let result = yield this.userInteraction.showConfirmMessage(confirmation);
            if (result === enums_1.Enums.YesNo.Yes) {
                yield this.userInteraction.showLoading();
                return this.deleteSerie(s);
            }
            else {
                return Promise.resolve();
            }
        });
    }
    keyPressSerie(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (key === enums_1.Enums.KeyCode.Enter) {
                if (!this.scanData)
                    return;
                return this.insertSerie(this.scanData);
            }
        });
    }
    insertSerie(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createInsertCertificationBySerialNumberRequest(this.certificationId, Number(this.manifestId.split("-")[1]), this.materialId, serie, this.settings.userCredentials);
                let result = yield this.manifestCertification.insertCertificationBySerialNumber(request);
                if (result.Resultado === enums_1.Enums.OperationResult.CustomResult) {
                    yield this.userInteraction.hideLoading();
                    return this.showDeleteSerieConfirmation(serie);
                }
                else if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    let requestInsertDetail = models_1.DataRequest.Factory.createInsertCertificationDetailRequest(this.certificationId, null, 1, enums_1.Enums.CertificationType.Material, this.settings.login, this.materialId, null, this.settings.userCredentials);
                    let resultInsertDetail = yield this.manifestCertification.insertCertificationDetail(requestInsertDetail);
                    if (resultInsertDetail.Resultado !==
                        enums_1.Enums.OperationResult.Success) {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(resultInsertDetail.Codigo &&
                            resultInsertDetail.Codigo > 0
                            ? resultInsertDetail.Codigo
                            : enums_1.Enums.CustomErrorCodes.InsertDataBaseError);
                        return Promise.resolve(resultInsertDetail);
                    }
                    else {
                        let newSerie = models_1.Model.Factory.createSerialNumber();
                        newSerie.materialId = this.materialId;
                        newSerie.serial = serie;
                        this.scannedSeries.push(newSerie);
                        return this.validateCompletedCertification();
                    }
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.InsertDataBaseError);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: e
                }));
            }
        });
    }
    deleteSerie(serie) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createDeleteCertificationBySerialNumberRequest(this.certificationId, this.materialId, serie, this.settings.userCredentials);
                let result = yield this.manifestCertification.deleteCertificationBySerialNumber(request);
                if (result.Resultado !== enums_1.Enums.OperationResult.Success) {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.DeleteDataError);
                }
                else {
                    let deletedSerie = _.find(this.scannedSeries, serial => {
                        return serial.serial === serie;
                    });
                    _.pull(this.scannedSeries, deletedSerie);
                    this.validateCompletedCertification();
                }
                return Promise.resolve(result);
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: error
                }));
            }
        });
    }
    validateCompletedCertification() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.scanData = "";
                let request = models_1.DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(this.certificationId, this.settings.userCredentials);
                let result = yield this.manifestCertification.validateIfCertificationIsComplete(request);
                this.completedPercentage = Number(result.DbData);
                if (this.completedPercentage >= 100) {
                    return this.markCertificationAsCompleted();
                }
                this.userInteraction.hideLoading();
                return Promise.resolve(result);
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: error
                }));
            }
        });
    }
    markCertificationAsCompleted() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createMarkManifestAsCertifiedRequest(Number(this.manifestId.split("-")[1]), this.certificationId, this.settings.userCredentials.login, this.settings.userCredentials);
                let result = yield this.manifestCertification.markManifestAsCertified(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.navigation.popPage(this.workspace, this.navCtrl);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
                return Promise.resolve(result);
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: error
                }));
            }
        });
    }
};
ManifiestCertificationSeriesPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-manifiest-certification-series",
        templateUrl: "manifiest-certification-series.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        manifest_certification_1.ManifestCertificationProvider,
        user_settings_1.UserSettingsProvider,
        translate_1.TranslateProvider])
], ManifiestCertificationSeriesPage);
exports.ManifiestCertificationSeriesPage = ManifiestCertificationSeriesPage;
//# sourceMappingURL=manifiest-certification-series.js.map