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
const location_1 = require("../../providers/location/location");
const enums_1 = require("../../enums/enums");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const relocate_1 = require("../../providers/relocate/relocate");
const _ = require("lodash");
const charge_1 = require("../../providers/charge/charge");
const transaction_operator_1 = require("../../providers/transaction-operator/transaction-operator");
const checkpoint_1 = require("../../providers/checkpoint/checkpoint");
let LocatePartialLicensePage = class LocatePartialLicensePage {
    constructor(navCtrl, navParams, navigation, workspace, checkpiont, device, location, settings, relocate, userInteraction, charge, transactionOperator) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.checkpiont = checkpiont;
        this.device = device;
        this.location = location;
        this.settings = settings;
        this.relocate = relocate;
        this.userInteraction = userInteraction;
        this.charge = charge;
        this.transactionOperator = transactionOperator;
        this.baseLicenseId = 0;
        this.licenseId = 0;
        this.mt2 = 0;
        this.usedmt2 = 0;
        this.totalPosition = 1;
        this.detail = [];
        this.isAndroid = false;
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
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.locationSpot = models_1.Model.Factory.createShelfSpot();
            let permissions = yield this.checkpiont.getCheckPointsByUser(this.settings.userCredentials);
            let permission = permissions.find(p => {
                return p.CHECK_ID === "ALLOW_TOTAL_POSITION";
            });
            this.inputTotalPosition = permission !== undefined;
            this.relocatePartialParams = this
                .navParams.data;
            this.isAndroid = this.device.isAndroid();
            this.baseLicenseId = this.relocatePartialParams.baseLicenseId;
            this.licenseId = this.relocatePartialParams.licenseId;
            this.detail = this.relocatePartialParams.detail;
            this.clientOwner = this.relocatePartialParams.clientOwner;
            this.policyCode = this.relocatePartialParams.policyCode;
            this.comesFrom = this.relocatePartialParams.comesFrom;
            this.scanToken = this.device.subscribeToScanner(data => this.validateLocation(data));
            if (this.relocatePartialParams.location) {
                this.validateLocation(this.relocatePartialParams.location);
            }
        });
    }
    scanBarcode() {
        return this.device.scan();
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
            sourceLicenseId: this.baseLicenseId,
            clientOwner: this.clientOwner,
            policyCode: this.policyCode,
            detail: this.detail,
            actionBack: true,
            showSuggestedLocation: this.relocatePartialParams
                .showSuggestedLocation
        };
        let times = 1;
        switch (this.comesFrom) {
            case enums_1.Enums.Page.LocatePartialLicense:
                times = 1;
                break;
            case enums_1.Enums.Page.LocationSuggestionRelocatePartial:
                times = 1;
                break;
            case enums_1.Enums.Page.LicenseClassLocation:
                times = 2;
                break;
        }
        return this.navigation.popPage(this.workspace, this.navCtrl, params, times);
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
                                transType: enums_1.Enums.TransType.PartialRelocation,
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
};
LocatePartialLicensePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-locate-partial-license",
        templateUrl: "locate-partial-license.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        checkpoint_1.CheckpointProvider,
        device_1.DeviceProvider,
        location_1.LocationProvider,
        user_settings_1.UserSettingsProvider,
        relocate_1.RelocateProvider,
        user_interaction_1.UserInteractionProvider,
        charge_1.ChargeProvider,
        transaction_operator_1.TransactionOperatorProvider])
], LocatePartialLicensePage);
exports.LocatePartialLicensePage = LocatePartialLicensePage;
//# sourceMappingURL=locate-partial-license.js.map