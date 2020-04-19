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
const navigation_1 = require("../../providers/navigation/navigation");
const reception_1 = require("../../providers/reception/reception");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const checkpoint_1 = require("../../providers/checkpoint/checkpoint");
const workspace_1 = require("../workspace/workspace");
const location_1 = require("../../providers/location/location");
const enums_1 = require("../../enums/enums");
const charge_1 = require("../../providers/charge/charge");
const device_1 = require("../../providers/device/device");
const transaction_operator_1 = require("../../providers/transaction-operator/transaction-operator");
const general_transfer_1 = require("../../providers/general-transfer/general-transfer");
let LocateGeneralReceptionLicensePage = class LocateGeneralReceptionLicensePage {
    constructor(navCtrl, navParams, navigation, workspace, checkpiont, reception, location, userInteraction, charge, settings, device, transactionOperator, generalTransfer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.checkpiont = checkpiont;
        this.reception = reception;
        this.location = location;
        this.userInteraction = userInteraction;
        this.charge = charge;
        this.settings = settings;
        this.device = device;
        this.transactionOperator = transactionOperator;
        this.generalTransfer = generalTransfer;
        this.licenseId = 0;
        this.taskId = 0;
        this.mt2 = 0;
        this.usedmt2 = 0;
        this.totalPosition = 1;
        this.isAndroid = true;
        this.detail = [];
        this.regimeTask = enums_1.Enums.Regime.General;
        this.isGeneralTransfer = false;
        this.wavePickingId = 0;
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
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.locationSpot = models_1.Model.Factory.createShelfSpot();
                let permissions = yield this.checkpiont.getCheckPointsByUser(this.settings.userCredentials);
                let permission = permissions.find(p => {
                    return p.CHECK_ID === "ALLOW_TOTAL_POSITION";
                });
                this.inputTotalPosition = permission !== undefined;
                this.generalReceptionParam = (this.navParams.data);
                this.isAndroid = this.device.isAndroid();
                this.licenseId = this.generalReceptionParam.licenseId;
                this.taskId = this.generalReceptionParam.taskId;
                this.detail = this.generalReceptionParam.detail;
                this.clientOwner = this.generalReceptionParam.clientOwner;
                this.receptionSubtype = this.generalReceptionParam.taskSubtype;
                this.showSuggestedLocation = this.generalReceptionParam.showSuggestedLocation;
                this.comesFrom = this.generalReceptionParam.comesFrom;
                this.regimeTask = this.generalReceptionParam.regime;
                this.reqRegisterGenTransReception =
                    this.generalReceptionParam.reqRegisterGenTransReception || null;
                this.wavePickingId = this.generalReceptionParam.wavePickingId;
                this.task = this.generalReceptionParam.task || null;
                this.scanToken = this.device.subscribeToScanner(data => this.validateLocation(data));
                if (this.generalReceptionParam.location) {
                    yield this.validateLocation(this.generalReceptionParam.location);
                }
            }
            catch (error) {
                return this.userInteraction.showError(error);
            }
            yield this.userInteraction.hideLoading();
        });
    }
    scanBarcode() {
        return this.device.scan();
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    validateLocation(locationSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.scanData = locationSpot;
                let validateLocationRequest = models_1.DataRequest.Factory.createValidateLocationForStorageRequest(this.licenseId, locationSpot, this.taskId, this.settings.userCredentials);
                let validateResult = yield this.location.validateLocationForStorage(validateLocationRequest);
                if (validateResult.Resultado === enums_1.Enums.OperationResult.Success) {
                    yield this.getLocation(locationSpot);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    yield this.userInteraction.showCustomError(validateResult.Codigo && validateResult.Codigo > 0
                        ? validateResult.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError, validateResult.DbData);
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            return Promise.resolve();
        });
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
                    let res = yield this.location.getUsedMt2byLocationSpot(locationRequest);
                    this.usedmt2 = parseInt(res.DbData);
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
                yield this.userInteraction.hideLoading();
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            return Promise.resolve();
        });
    }
    locateLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                if (isNaN(this.mt2)) {
                    return yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, "");
                }
                if (this.totalPosition < 1 || this.totalPosition == null) {
                    throw new Error("Debe ingresar la cantidad de posiciones.");
                }
                else {
                    this.totalPosition = 1;
                    let receptionRequest = models_1.DataRequest.Factory.createRegisterLicenseReceptionRequest(this.licenseId, this.locationSpot.locationSpot, this.mt2, this.taskId, this.settings.userCredentials, this.totalPosition);
                    receptionRequest.transType =
                        this.regimeTask == enums_1.Enums.Regime.Fiscal
                            ? enums_1.Enums.TransType.FiscalReception
                            : enums_1.Enums.TransType.GeneralReception;
                    let result = yield this.reception.registerLicenseReception(receptionRequest);
                    if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                        this.userInteraction.hideLoading();
                        yield this.saveLog();
                        let request = models_1.DataRequest.Factory.createChargeByMobileRequest(this.licenseId, this.regimeTask == enums_1.Enums.Regime.General
                            ? enums_1.Enums.TransType.GeneralReception
                            : enums_1.Enums.TransType.FiscalReception, this.settings.userCredentials);
                        let times = 2;
                        switch (this.comesFrom) {
                            case enums_1.Enums.Page.GeneralReception:
                                times = 2;
                                break;
                            case enums_1.Enums.Page.LocationSuggestion:
                                times = 3;
                                break;
                            case enums_1.Enums.Page.LicenseClassLocation:
                                times = 4;
                                break;
                        }
                        let charges = yield this.charge.getCharges(request);
                        if (charges.length) {
                            return this.navigation.pushPage(enums_1.Enums.Page.LicenseCharges, this.workspace, this.navCtrl, {
                                charges: charges,
                                licenseId: this.licenseId,
                                taskId: this.taskId,
                                transType: enums_1.Enums.TransType.GeneralReception,
                                times: times,
                                regime: this.regimeTask,
                                wavePickingId: this.wavePickingId,
                                task: this.task
                            });
                        }
                        else {
                            return this.navigation.popPage(this.workspace, this.navCtrl, {
                                taskId: this.taskId,
                                regime: this.regimeTask,
                                wavePickingId: this.wavePickingId,
                                task: this.task
                            }, times);
                        }
                    }
                    else {
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                        return Promise.resolve();
                    }
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
                    taskType: enums_1.Enums.TaskTypeLog.Reception,
                    taskId: this.taskId,
                    loginId: this.settings.userCredentials.loginId
                });
            });
        }
        catch (error) {
            this.userInteraction.toast("error at save log transaction:", enums_1.Enums.ToastTime.Short);
        }
        return Promise.resolve();
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
    backButtonAction() {
        let params = {
            licenseId: this.licenseId,
            taskId: this.taskId,
            clientOwner: this.clientOwner,
            detail: this.detail,
            taskSubtype: this.receptionSubtype,
            actionBack: true,
            showSuggestedLocation: this.generalReceptionParam
                .showSuggestedLocation,
            wavePickingId: this.wavePickingId
        };
        let times = 1;
        switch (this.comesFrom) {
            case enums_1.Enums.Page.GeneralReception:
                times = 1;
                break;
            case enums_1.Enums.Page.LocationSuggestion:
                times = 1;
                break;
            case enums_1.Enums.Page.LicenseClassLocation:
                times = 3;
                break;
        }
        return this.navigation.popPage(this.workspace, this.navCtrl, params, times);
    }
    validateCeroInputTotalPosition(event) {
        let text = event.target.value;
        if (text === "0") {
            this.totalPosition = 1;
        }
    }
    validateInputTotalPosition(event) {
        let e = event || window.event;
        let key = e.keyCode || e.which;
        if (key === 110 ||
            key === 190 ||
            key === 188 ||
            key === 187 ||
            key === 189 ||
            key === 107 ||
            key === 109) {
            e.preventDefault();
        }
    }
    registerGeneralTransferRecepction() {
        return __awaiter(this, void 0, void 0, function* () {
            this.reqRegisterGenTransReception.transMt2 = this.mt2;
            let response = yield this.generalTransfer.registerGeneralTransferReception(this.reqRegisterGenTransReception);
            if (response.Resultado !== enums_1.Enums.OperationResult.Success) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(response.Codigo && response.Codigo > 0
                    ? response.Codigo
                    : enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(false);
            }
            return Promise.resolve(true);
        });
    }
};
LocateGeneralReceptionLicensePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-locate-general-reception-license",
        templateUrl: "locate-general-reception-license.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        checkpoint_1.CheckpointProvider,
        reception_1.ReceptionProvider,
        location_1.LocationProvider,
        user_interaction_1.UserInteractionProvider,
        charge_1.ChargeProvider,
        user_settings_1.UserSettingsProvider,
        device_1.DeviceProvider,
        transaction_operator_1.TransactionOperatorProvider,
        general_transfer_1.GeneralTransferProvider])
], LocateGeneralReceptionLicensePage);
exports.LocateGeneralReceptionLicensePage = LocateGeneralReceptionLicensePage;
//# sourceMappingURL=locate-general-reception-license.js.map