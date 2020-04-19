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
const workspace_1 = require("../workspace/workspace");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const device_1 = require("../../providers/device/device");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const relocate_1 = require("../../providers/relocate/relocate");
const location_1 = require("../../providers/location/location");
const enums_1 = require("../../enums/enums");
const transaction_operator_1 = require("../../providers/transaction-operator/transaction-operator");
const checkpoint_1 = require("../../providers/checkpoint/checkpoint");
let RelocateFullLicensePage = class RelocateFullLicensePage {
    constructor(navCtrl, navParams, navigation, workspace, checkpiont, settings, device, location, userInteraction, relocation, transactionOperator) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.checkpiont = checkpiont;
        this.settings = settings;
        this.device = device;
        this.location = location;
        this.userInteraction = userInteraction;
        this.relocation = relocation;
        this.transactionOperator = transactionOperator;
        this.locationSpot = models_1.Model.Factory.createShelfSpot();
        this.licenseId = 0;
        this.taskId = 0;
        this.mt2 = 0;
        this.usedMt2 = 0;
        this.totalPosition = 1;
        this.isAndroid = false;
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
                this.isAndroid = this.device.isAndroid();
                this.relocationFullParam = (this.navParams.data);
                this.licenseId = this.relocationFullParam.licenseId;
                this.comesFrom = this.relocationFullParam.comesFrom;
                this.showSuggestedLocation = this.relocationFullParam.showSuggestedLocation;
                this.scanToken = this.device.subscribeToScanner(data => this.validateLocation(data));
                if (this.relocationFullParam.location) {
                    yield this.validateLocation(this.relocationFullParam.location);
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
                    return Promise.resolve(validateResult);
                }
                else {
                    yield this.userInteraction.hideLoading();
                    yield this.userInteraction.showCustomError(validateResult.Codigo && validateResult.Codigo > 0
                        ? validateResult.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                    return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                        code: enums_1.Enums.CustomErrorCodes.DataBaseError,
                        message: validateResult.Mensaje
                    }));
                }
            }
            catch (reason) {
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                yield this.userInteraction.hideLoading();
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.DataBaseError,
                    message: reason
                }));
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
                    let res = yield this.location.getUsedMt2byLocationSpot(locationRequest);
                    this.usedMt2 = parseInt(res.DbData);
                    this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
                        this.locationSpot.maxMt2Occupancy -
                            (this.usedMt2 + this.mt2);
                }
                return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, locationSpot);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: reason
                }));
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
        });
    }
    changeUsedMt2() {
        this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
            this.locationSpot.maxMt2Occupancy -
                (this.usedMt2 + Number(this.mt2));
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
        let times = 1;
        let params = {
            licenseId: this.licenseId,
            actionBack: true,
            showSuggestedLocation: this.relocationFullParam
                .showSuggestedLocation
        };
        switch (this.comesFrom) {
            case enums_1.Enums.Page.LicenseInfo:
                times = 1;
                break;
            case enums_1.Enums.Page.LocationSuggestionFullRelocation:
                times = 1;
                break;
            case enums_1.Enums.Page.LicenseClassLocation:
                times = 2;
                break;
        }
        return this.navigation.popPage(this.workspace, this.navCtrl, params, times);
    }
    relocateLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.totalPosition < 1 || this.totalPosition == null) {
                    throw new Error("Debe ingresar la cantidad de posiciones.");
                }
                else {
                    this.totalPosition = 1;
                    yield this.userInteraction.showLoading();
                    let request = models_1.DataRequest.Factory.createRelocateLicenseRequest(this.licenseId, this.mt2, null, this.locationSpot.locationSpot, this.settings.userCredentials, this.totalPosition);
                    let result = yield this.relocation.relocateLicense(request);
                    yield this.getLastLicense();
                    if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                        yield this.saveLog();
                        let times = 1;
                        switch (this.comesFrom) {
                            case enums_1.Enums.Page.LicenseInfo:
                                times = 1;
                                break;
                            case enums_1.Enums.Page.LocationSuggestionFullRelocation:
                                times = 2;
                                break;
                            case enums_1.Enums.Page.LicenseClassLocation:
                                times = 3;
                                break;
                        }
                        this.navigation.popPage(this.workspace, this.navCtrl, { licenseId: this.licenseId }, times);
                    }
                    else {
                        this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                            ? result.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                    }
                    return Promise.resolve(result);
                }
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: "Invalid Operation"
                }));
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    saveLog() {
        try {
            this.transactionOperator.addTransactionByOperator({
                dateCreated: new Date(),
                licenseId: this.licenseId,
                location: this.locationSpot.locationSpot,
                taskType: enums_1.Enums.TaskTypeLog.CompleteRelocation,
                loginId: this.settings.userCredentials.loginId
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
                let resultGetLastLicense = yield this.relocation.getLastLicenseReallocByUser(request);
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
RelocateFullLicensePage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-relocate-full-license",
        templateUrl: "relocate-full-license.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        checkpoint_1.CheckpointProvider,
        user_settings_1.UserSettingsProvider,
        device_1.DeviceProvider,
        location_1.LocationProvider,
        user_interaction_1.UserInteractionProvider,
        relocate_1.RelocateProvider,
        transaction_operator_1.TransactionOperatorProvider])
], RelocateFullLicensePage);
exports.RelocateFullLicensePage = RelocateFullLicensePage;
//# sourceMappingURL=relocate-full-license.js.map