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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const device_1 = require("../../providers/device/device");
const enums_1 = require("../../enums/enums");
const models_1 = require("../../models/models");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const manifest_certification_1 = require("../../providers/manifest-certification/manifest-certification");
const translate_1 = require("../../providers/translate/translate");
const configuration_1 = require("../../providers/configuration/configuration");
const _ = require("lodash");
let ManifestCertificationPage = class ManifestCertificationPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, device, settings, manifestCertification, translate, configuration) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.device = device;
        this.settings = settings;
        this.manifestCertification = manifestCertification;
        this.translate = translate;
        this.configuration = configuration;
        this.currentSegment = "scanMaterial";
        this.manifestId = "";
        this.currentScan = enums_1.Enums.CertificationScanner
            .Manifest;
        this.scanType = enums_1.Enums.CertificationScanType.Material;
        this.material = models_1.Model.Factory.createMaterial();
        this.completedPercentage = 0;
        this.certificationId = 0;
        this.allowIncompleteCertification = false;
        this.detail = [];
        this.isAndroid = false;
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.isAndroid = this.device.isAndroid();
                let params = this.navParams.data;
                if (params.fromSeries) {
                    this.manifestId = params.manifestId;
                    this.currentScan = enums_1.Enums.CertificationScanner.Material;
                    this.scanType = enums_1.Enums.CertificationScanType.Material;
                    this.certificationId = params.certificationId;
                    this.validateCompletedCertification();
                }
                this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
                let request = models_1.DataRequest.Factory.createGetParameterRequest(enums_1.Enums.ParameterGroupId.Certification, enums_1.Enums.ParameterId.Partial, this.settings.userCredentials);
                let parameter = yield this.configuration.getParameter(request);
                if (parameter &&
                    parameter.length &&
                    Number(parameter[0].VALUE) === enums_1.Enums.YesNo.Yes) {
                    this.allowIncompleteCertification = true;
                }
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }
    scanBarcode() {
        this.device.scan();
    }
    processBarcodeScan(scanData) {
        this.scanData = scanData;
        switch (this.currentScan) {
            case enums_1.Enums.CertificationScanner.Manifest:
                if (this.checkManifestFormat()) {
                    this.manifestId = this.scanData;
                    this.getManifest(Number(this.scanData.split("-")[1]));
                }
                else {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, this.scanData);
                }
                break;
            case enums_1.Enums.CertificationScanner.Material:
                this.getMaterial(this.scanData);
                break;
            case enums_1.Enums.CertificationScanner.Label:
                this.insertCertificationLabel(Number(this.scanData));
                break;
            case enums_1.Enums.CertificationScanner.Box:
                this.insertCertificationBox(this.scanData);
                break;
        }
        return Promise.resolve();
    }
    getManifest(manifestId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetManifestHeaderForCertificationRequest(manifestId, this.settings.userCredentials);
                let manifest = yield this.manifestCertification.getManifestHeaderForCertification(request);
                if (manifest && manifest.MANIFEST_HEADER_ID) {
                    let certificationId = manifest.CERTIFICATION_HEADER_ID;
                    if (!certificationId) {
                        let request = models_1.DataRequest.Factory.createInsertCertificationHeaderRequest(manifest.MANIFEST_HEADER_ID, this.settings.userCredentials);
                        let certification = yield this.manifestCertification.insertCertificationHeader(request);
                        if (certification.Resultado === enums_1.Enums.OperationResult.Fail) {
                            yield this.userInteraction.hideLoading();
                            this.userInteraction.showCustomError(certification.Codigo && certification.Codigo > 0
                                ? certification.Codigo
                                : enums_1.Enums.CustomErrorCodes.UnknownError);
                            return Promise.resolve(false);
                        }
                        certificationId = Number(certification.DbData);
                    }
                    if (manifest.STATUS_CERTIFICATION ===
                        enums_1.Enums.StatusCertification.Completed) {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.ManifestAlreadyCertified);
                        this.scanData = "";
                        this.manifestId = "";
                        this.certificationId = 0;
                        this.material = models_1.Model.Factory.createMaterial();
                        return Promise.resolve(false);
                    }
                    let request = models_1.DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(certificationId, this.settings.userCredentials);
                    let result = yield this.manifestCertification.validateIfCertificationIsComplete(request);
                    this.completedPercentage = Number(result.DbData);
                    this.certificationId = certificationId;
                    this.currentScan = enums_1.Enums.CertificationScanner.Material;
                    this.scanType = enums_1.Enums.CertificationScanType.Material;
                    this.userInteraction.hideLoading();
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound);
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                this.scanData = "";
                this.manifestId = "";
                this.certificationId = 0;
                this.material = models_1.Model.Factory.createMaterial();
                return Promise.resolve(false);
            }
        });
    }
    getMaterial(materialId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetMaterialForManifestRequest(Number(this.manifestId.split("-")[1]), materialId, this.settings.userCredentials);
                let material = yield this.manifestCertification.getMaterialForManifest(request);
                if (material) {
                    if (material.SERIAL_NUMBER_REQUESTS === enums_1.Enums.YesNo.Yes) {
                        this.navigation.pushPage(enums_1.Enums.Page.ManifiestCertificationSeries, this.workspace, this.navCtrl, {
                            materialId: material.MATERIAL_ID,
                            manifestId: this.manifestId,
                            certificationId: this.certificationId
                        });
                    }
                    this.material.materialId = material.MATERIAL_ID;
                    this.material.materialName = material.MATERIAL_NAME;
                    this.userInteraction.hideLoading();
                    return Promise.resolve(true);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidSku, materialId);
                    return Promise.resolve(false);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, "");
                return Promise.resolve(false);
            }
        });
    }
    changeCurrentScan(newScan) {
        this.currentScan = newScan;
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    showOption(option) {
        return option == this.scanType;
    }
    checkManifestFormat() {
        return this.scanData.split("-").length === 2;
    }
    scanTypeChanged(value) {
        this.scanData = "";
        this.material = models_1.Model.Factory.createMaterial();
        switch (Number(value)) {
            case enums_1.Enums.CertificationScanType.Material:
                this.currentScan = enums_1.Enums.CertificationScanner.Material;
                break;
            case enums_1.Enums.CertificationScanType.Label:
                this.currentScan = enums_1.Enums.CertificationScanner.Label;
                break;
            case enums_1.Enums.CertificationScanType.Box:
                this.currentScan = enums_1.Enums.CertificationScanner.Box;
                break;
        }
    }
    deleteCertificationDetail(detailId, barcode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createDeleteCertificationDetailRequest(detailId, barcode, this.settings.userCredentials);
                let result = yield this.manifestCertification.deleteCertificationDetail(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.scanData = "";
                    this.material = models_1.Model.Factory.createMaterial();
                    let request = models_1.DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(this.certificationId, this.settings.userCredentials);
                    let result = yield this.manifestCertification.validateIfCertificationIsComplete(request);
                    this.userInteraction.hideLoading();
                    this.completedPercentage = Number(result.DbData);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.DeleteDataError);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.scanData = "";
            }
        });
    }
    insertCertificationDetail(request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield this.manifestCertification.insertCertificationDetail(request);
                if (result.Resultado === enums_1.Enums.OperationResult.CustomResult) {
                    yield this.userInteraction.hideLoading();
                    let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.BarcodeAlreadyCertified);
                    let confirmation = yield this.userInteraction.showConfirmMessage(message);
                    if (confirmation == enums_1.Enums.YesNo.Yes &&
                        request.certificationType === enums_1.Enums.CertificationType.Box) {
                        this.deleteCertificationDetail(result.Codigo, result.DbData);
                    }
                    else if (confirmation == enums_1.Enums.YesNo.Yes &&
                        request.certificationType !== enums_1.Enums.CertificationType.Box) {
                        this.deleteCertificationDetail(Number(result.DbData));
                    }
                }
                else if (result.Resultado !== enums_1.Enums.OperationResult.Success) {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.InsertDataBaseError);
                }
                else {
                    this.validateCompletedCertification();
                }
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                this.scanData = "";
            }
        });
    }
    validateCompletedCertification() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.material = models_1.Model.Factory.createMaterial();
                this.scanData = "";
                let request = models_1.DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(this.certificationId, this.settings.userCredentials);
                let result = yield this.manifestCertification.validateIfCertificationIsComplete(request);
                this.completedPercentage = Number(result.DbData);
                if (this.completedPercentage >= 100) {
                    this.markCertificationAsCompleted();
                }
                this.userInteraction.hideLoading();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    insertCertificationLabel(labelId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createInsertCertificationDetailRequest(this.certificationId, labelId, null, enums_1.Enums.CertificationType.Label, this.settings.userCredentials.login, null, null, this.settings.userCredentials);
                return this.insertCertificationDetail(request);
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    insertCertificationBox(boxBarcode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createInsertCertificationDetailRequest(this.certificationId, null, null, enums_1.Enums.CertificationType.Box, this.settings.userCredentials.login, null, boxBarcode, this.settings.userCredentials);
                return this.insertCertificationDetail(request);
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    keyPressQuantity(keyCode) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (keyCode === enums_1.Enums.KeyCode.Enter &&
                    this.material.materialId !== "" &&
                    this.material.quantity > 0) {
                    this.userInteraction.showLoading();
                    let request = models_1.DataRequest.Factory.createInsertCertificationDetailRequest(this.certificationId, null, this.material.quantity, enums_1.Enums.CertificationType.Material, this.settings.login, this.material.materialId, null, this.settings.userCredentials);
                    return this.insertCertificationDetail(request);
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    confirmIncompleteCertification() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DoYouWishToContinue);
                let confirmation = yield this.userInteraction.showConfirmMessage(message);
                if (confirmation == enums_1.Enums.YesNo.Yes) {
                    this.markCertificationAsCompleted();
                }
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
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
                    this.userInteraction.hideLoading();
                    this.currentScan = enums_1.Enums.CertificationScanner.Manifest;
                    this.material = models_1.Model.Factory.createMaterial();
                    this.manifestId = "";
                    this.certificationId = 0;
                    this.detail = [];
                    this.completedPercentage = 0;
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
    toggleDetails(material) {
        if (material.showDetails &&
            material.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
            return false;
        }
        else if (material.serialNumberRequests === enums_1.Enums.YesNo.Yes) {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
            return true;
        }
    }
    changeCurrentSegment() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentSegment == "certificationDetail") {
                if (this.certificationId) {
                    try {
                        let materialsCertifiedRequest = models_1.DataRequest.Factory.createGetConsolidatedCertificationDetail(this.certificationId, this.settings.userCredentials);
                        let serialNumbersCertifiedRequest = models_1.DataRequest.Factory.createGetCertificationDetailOfSerialNumber(this.certificationId, this.settings.userCredentials);
                        let resultMaterials = yield this.manifestCertification.getConsolidatedCertificationDetail(materialsCertifiedRequest);
                        let resultSerialNumbers = yield this.manifestCertification.getCertificationDetailOfSerialNumber(serialNumbersCertifiedRequest);
                        if (resultMaterials) {
                            this.detail = _.map(resultMaterials, (materialCertified) => {
                                materialCertified.showDetails = false;
                                if (resultSerialNumbers) {
                                    let serialNumbersByMaterial = _.filter(resultSerialNumbers, (serialNumber) => {
                                        return (serialNumber.MATERIAL_ID ==
                                            materialCertified.MATERIAL_ID);
                                    });
                                    if (serialNumbersByMaterial) {
                                        materialCertified.SerialNumbers = serialNumbersByMaterial;
                                        materialCertified.serialNumberRequests =
                                            enums_1.Enums.YesNo.Yes;
                                    }
                                    else {
                                        materialCertified.serialNumberRequests =
                                            enums_1.Enums.YesNo.Yes;
                                    }
                                }
                                return materialCertified;
                            });
                        }
                    }
                    catch (error) {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                    }
                }
            }
        });
    }
};
ManifestCertificationPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-manifest-certification",
        templateUrl: "manifest-certification.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        manifest_certification_1.ManifestCertificationProvider,
        translate_1.TranslateProvider,
        configuration_1.ConfigurationProvider])
], ManifestCertificationPage);
exports.ManifestCertificationPage = ManifestCertificationPage;
//# sourceMappingURL=manifest-certification.js.map