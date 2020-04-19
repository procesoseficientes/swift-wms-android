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
const enums_1 = require("../../enums/enums");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const translate_1 = require("../../providers/translate/translate");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const printer_1 = require("../../providers/printer/printer");
const _ = require("lodash");
const configuration_1 = require("../../providers/configuration/configuration");
const relocate_1 = require("../../providers/relocate/relocate");
const transaction_operator_1 = require("../../providers/transaction-operator/transaction-operator");
const charge_1 = require("../../providers/charge/charge");
const checkpoint_1 = require("../../providers/checkpoint/checkpoint");
const device_1 = require("../../providers/device/device");
const location_1 = require("../../providers/location/location");
let LocateGeneralTransferPage = class LocateGeneralTransferPage {
    constructor(navCtrl, navParams, navigation, workspace, checkpiont, configuration, translate, settings, relocate, printer, charge, transactionOperator, userInteraction, device, location) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.checkpiont = checkpiont;
        this.configuration = configuration;
        this.translate = translate;
        this.settings = settings;
        this.relocate = relocate;
        this.printer = printer;
        this.charge = charge;
        this.transactionOperator = transactionOperator;
        this.userInteraction = userInteraction;
        this.device = device;
        this.location = location;
        this.currentSegment = "licenseDetail";
        this.statusDisabled = false;
        this.statusList = [];
        this.mt2 = 0;
        this.usedmt2 = 0;
        this.totalPosition = 1;
        this.licenseId = 0;
        this.taskId = 0;
        this.clientOwner = "";
        this.detail = [];
        this.baseLicenseId = 0;
        this.isAndroid = false;
        this.inputTotalPosition = false;
        this.material = models_1.Model.Factory.createMaterial();
        this.locationSpot = models_1.Model.Factory.createShelfSpot();
    }
    validateTotalPositionsOnKeyUp($event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the current values on input
                let values = $event.target.value.split("");
                //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
                let newValues = yield this.device.getIntegerNumbers(values);
                //Updates the value on event
                $event.target.value = newValues.join("");
            }
            catch (error) {
                this.userInteraction.showError(error);
            }
        });
    }
    validateTotalPositionsOnLostFocus($event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Get the current values on input
                let values = $event._native.nativeElement.value.split("");
                //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
                let newValues = yield this.device.getIntegerNumbers(values);
                //Updates the value on event
                $event._native.nativeElement.value = newValues.join("");
                $event._value = $event._native.nativeElement.value;
            }
            catch (error) {
                this.userInteraction.showError(error);
            }
        });
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let params = this.navParams.data;
            this.task = params.task || models_1.Model.Factory.createTask();
            let configWhere = models_1.DataRequest.Factory.createGetConfigurationRequest(this.settings.userCredentials);
            configWhere.paramType = enums_1.Enums.ConfigurationParamType.Status;
            configWhere.paramGroup = enums_1.Enums.ConfigurationParamGroup.Status;
            let configs = yield this.configuration.findConfigurations(configWhere);
            this.statusList = _.orderBy(configs, "numericValue", "desc");
            this.material = models_1.Model.Factory.createMaterial();
        });
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userInteraction.hideLoading();
            this.scanToken = this.device.subscribeToScanner(data => this.validateLocation(data));
            let permissions = yield this.checkpiont.getCheckPointsByUser(this.settings.userCredentials);
            let permission = permissions.find(p => {
                return p.CHECK_ID === "ALLOW_TOTAL_POSITION";
            });
            this.inputTotalPosition = permission !== undefined;
        });
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    validateLocation(locationSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.scanData = locationSpot;
                let validateLocationRequest = models_1.DataRequest.Factory.createValidateLocationForStorageRequest(this.licenseId, locationSpot, null, this.settings.userCredentials);
                validateLocationRequest.taskId = null;
                let validateResult = yield this.location.validateLocationForStorage(validateLocationRequest);
                if (validateResult.Resultado === enums_1.Enums.OperationResult.Success) {
                    return this.getLocation(locationSpot);
                }
                else {
                    this.locationSpot = models_1.Model.Factory.createShelfSpot();
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(validateResult.Codigo && validateResult.Codigo > 0
                        ? validateResult.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve();
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
            finally {
                yield this.userInteraction.hideLoading();
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
    changeUsedMt2() {
        if (isNaN(this.mt2) || this.mt2.toString() === "") {
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, "");
            this.mt2 = 0;
            return;
        }
        this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
            this.locationSpot.maxMt2Occupancy -
                (this.usedmt2 + Number(this.mt2));
        if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume < 0)
            this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume = 0;
        if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume > 0) {
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon = "checkmark";
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                "success";
        }
        else {
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon = "close";
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                "danger";
        }
    }
    showPrintOption() {
        return Promise.all([
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.PrintLicense),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.PrintStatus),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Cancel)
        ]).then(arrResult => {
            let buttons = [
                {
                    text: arrResult[0],
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        try {
                            if (!this.settings.printer) {
                                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                                return;
                            }
                            let request = models_1.DataRequest.Factory.createGetLicensePrintFormatRequest(this.licenseId, 0, this.settings.userCredentials);
                            let format = yield this.printer.getLicensePrintFormat(request);
                            yield this.printer.printDocument(this.settings.printer, format.FORMAT);
                        }
                        catch (e) {
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                        }
                    })
                },
                {
                    text: arrResult[1],
                    handler: () => __awaiter(this, void 0, void 0, function* () {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                        if (!this.settings.printer) {
                            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                            return;
                        }
                        let request = models_1.DataRequest.Factory.createGetStatusPrintFormatRequest(this.materialStatus, this.taskId, this.clientOwner, this.settings.userCredentials);
                        let format = yield this.printer.getStatusPrintFormat(request);
                        yield this.printer.printDocument(this.settings.printer, format.FORMAT);
                    })
                },
                {
                    text: arrResult[2],
                    role: "cancel",
                    handler: () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                    }
                }
            ];
            return this.userInteraction.showOptionAlert(null, buttons);
        });
    }
    generateRegisterPartialRelocation(materials) {
        return materials.map((material) => {
            return this.relocate.registerPartialRelocation(models_1.DataRequest.Factory.createRegisterPartialRelocationRequest(this.baseLicenseId, this.licenseId, material.quantity * material.measurementQty, this.mt2, this.policyCode, this.locationSpot.locationSpot, this.clientOwner, material.barcodeId, material.materialId, this.settings.userCredentials, this.totalPosition));
        });
    }
    locateLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                if (isNaN(this.mt2)) {
                    yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, "");
                    return Promise.resolve(false);
                }
                if (this.totalPosition < 1 || this.totalPosition == null) {
                    throw new Error("Debe ingresar la cantidad de posiciones.");
                }
                else {
                    this.totalPosition = 1;
                    let result = yield Promise.all(this.generateRegisterPartialRelocation(this.detail));
                    let failResult = _.find(result, (response) => {
                        return response.Resultado === enums_1.Enums.OperationResult.Fail;
                    });
                    if (failResult) {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(failResult.Codigo && failResult.Codigo > 0
                            ? failResult.Codigo
                            : enums_1.Enums.CustomErrorCodes.DataBaseError);
                        return Promise.resolve(false);
                    }
                    else {
                        yield this.userInteraction.hideLoading();
                        yield this.saveLog();
                        yield this.getLastLicense();
                        let request = models_1.DataRequest.Factory.createChargeByMobileRequest(this.licenseId, enums_1.Enums.TransType.PartialRelocation, this.settings.userCredentials);
                        let charges = yield this.charge.getCharges(request);
                        let times = 2;
                        switch (this.comesFrom) {
                            case enums_1.Enums.Page.RelocatePartialLicense:
                                times = 3;
                                break;
                            case enums_1.Enums.Page.LocationSuggestionRelocatePartial:
                                times = 3;
                                break;
                            case enums_1.Enums.Page.LicenseClassLocation:
                                times = 4;
                                break;
                        }
                        if (charges.length) {
                            this.navigation.pushPage(enums_1.Enums.Page.LicenseCharges, this.workspace, this.navCtrl, {
                                charges: charges,
                                licenseId: this.licenseId,
                                taskId: null,
                                transType: enums_1.Enums.TransType.GeneralTransfer,
                                times: times
                            });
                            return Promise.resolve(true);
                        }
                        else {
                            this.navigation.popPage(this.workspace, this.navCtrl, { licenseId: this.licenseId }, times);
                            return Promise.resolve(true);
                        }
                    }
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
        });
    }
    saveLog() {
        try {
            this.detail.forEach(element => {
                this.transactionOperator.addTransactionByOperator({
                    dateCreated: new Date(),
                    licenseId: this.licenseId,
                    location: this.locationSpot.locationSpot,
                    materialId: element.materialId,
                    materialName: element.materialName,
                    qty: element.quantity,
                    taskType: enums_1.Enums.TaskTypeLog.PartialRelocation,
                    loginId: this.settings.userCredentials.loginId
                });
            });
        }
        catch (error) {
            this.userInteraction.toast("error at save log transaction:", enums_1.Enums.ToastTime.Short);
        }
        return Promise.resolve();
    }
    getLastLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createLastLicenseReallocByUser(this.licenseId, this.settings.userCredentials);
                let resultGetLastLicense = yield this.relocate.getLastLicenseReallocByUser(request);
                if (resultGetLastLicense.Resultado === enums_1.Enums.OperationResult.Success) {
                    if (Number(resultGetLastLicense.DbData) != this.licenseId) {
                        this.licenseId = Number(resultGetLastLicense.DbData);
                    }
                }
            }
            catch (error) { }
        });
    }
    showScanBarcode() {
        return this.currentSegment === "location";
    }
    scanBarcode() {
        return this.device.scan();
    }
    getLocation(locationSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let locationRequest = models_1.DataRequest.Factory.createGetLocationRequest(locationSpot, this.settings.userCredentials);
                this.locationSpot = yield this.location.getLocation(locationRequest);
                this.locationSpot.ShelfSpotVolumeAndWeight = models_1.Model.Factory.createShelfSpotVolumeAndWeight();
                if (this.locationSpot.spotType === enums_1.Enums.LocationType.Rack) {
                    let maxWeightAndVolumeRequest = models_1.DataRequest.Factory.createValidateLocationMaxWeightAndVolumeRequest(this.locationSpot.locationSpot, this.licenseId, this.settings.userCredentials);
                    this.locationSpot.ShelfSpotVolumeAndWeight = yield this.location.validateLocationMaxWeightAndVolume(maxWeightAndVolumeRequest);
                }
                else if (this.locationSpot.spotType === enums_1.Enums.LocationType.Floor) {
                    let resultGetUsedMt2byLocationSpot = yield this.location.getUsedMt2byLocationSpot(locationRequest);
                    this.usedmt2 = parseInt(resultGetUsedMt2byLocationSpot.DbData);
                    this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
                        this.locationSpot.maxMt2Occupancy -
                            (this.usedmt2 + this.mt2);
                    if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume >
                        0) {
                        this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon =
                            "checkmark";
                        this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                            "success";
                    }
                    else {
                        this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon =
                            "close";
                        this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                            "danger";
                    }
                }
                return Promise.resolve();
            }
            catch (reason) {
                this.locationSpot = models_1.Model.Factory.createShelfSpot();
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve();
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
};
LocateGeneralTransferPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-locate-general-transfer",
        templateUrl: "locate-general-transfer.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        checkpoint_1.CheckpointProvider,
        configuration_1.ConfigurationProvider,
        translate_1.TranslateProvider,
        user_settings_1.UserSettingsProvider,
        relocate_1.RelocateProvider,
        printer_1.PrinterProvider,
        charge_1.ChargeProvider,
        transaction_operator_1.TransactionOperatorProvider,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        location_1.LocationProvider])
], LocateGeneralTransferPage);
exports.LocateGeneralTransferPage = LocateGeneralTransferPage;
//# sourceMappingURL=locate-general-transfer.js.map