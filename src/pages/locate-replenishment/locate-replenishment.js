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
const device_1 = require("../../providers/device/device");
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const models_1 = require("../../models/models");
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const enums_1 = require("../../enums/enums");
const picking_1 = require("../../providers/picking/picking");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const location_1 = require("../../providers/location/location");
const _ = require("lodash");
const printer_1 = require("../../providers/printer/printer");
const translate_1 = require("../../providers/translate/translate");
const locate_dispatch_1 = require("../../providers/locate-dispatch/locate-dispatch");
let LocateReplenishmentPage = class LocateReplenishmentPage {
    constructor(userInteraction, device, settings, locationProvider, picking, printer, translate, navCtrl, navParams, navigation, workspace, locateDispatch) {
        this.userInteraction = userInteraction;
        this.device = device;
        this.settings = settings;
        this.locationProvider = locationProvider;
        this.picking = picking;
        this.printer = printer;
        this.translate = translate;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.locateDispatch = locateDispatch;
        this.wavePickingId = 0;
        this.locationSpotTarget = "";
        this.scanData = "";
        this.isAndroid = false;
        this.locations = [];
        this.stopEvent = false;
        this.isPickingTaskComplete = false;
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let params = this.navParams
                .data;
            this.isPickingTaskComplete = params.isPickingTaskComplete;
            this.wavePickingId = params.wavePickingId;
            this.currentLocation = params.currentLocation;
            this.locations = params.locations;
            this.currentScan = params.currentScan;
            if (this.locations.length == 0) {
                this.loadAndGroupLicensesDispatch();
            }
        });
    }
    findLocation(currentLicense) {
        let findLocation = _.find(this.locations, (currentLocation) => {
            return (currentLocation.targetLocation ==
                currentLicense.LOCATION_SPOT_TARGET);
        });
        return findLocation;
    }
    backButtonAction() {
        if (this.isPickingTaskComplete) {
            return;
        }
        this.navigation.popPage(this.workspace, this.navCtrl, {
            wavePickingId: this.wavePickingId
        }, 1);
    }
    backToGeneralPicking() {
        if (this.locateDispatch.isAllLocationsAllComplete(this.locations)) {
            this.navigation.popPage(this.workspace, this.navCtrl, {
                wavePickingId: this.wavePickingId
            }, 1);
        }
    }
    loadAndGroupLicensesDispatch() {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createGetTargetLocationByLicenseDispatch(this.wavePickingId, this.settings.userCredentials);
            try {
                this.userInteraction.showLoading();
                let result = yield this.picking.getTargetLocationByLicenseDispatch(request);
                if (result != null && result.length > 0) {
                    let counter = 0;
                    result.forEach(currentLicense => {
                        let findLocation = this.findLocation(currentLicense);
                        if (findLocation == null) {
                            this.locations.push({
                                id: counter,
                                icon: "arrow-dropright",
                                color: "light",
                                isComplete: false,
                                licenses: [],
                                showDetails: false,
                                targetLocation: currentLicense.LOCATION_SPOT_TARGET,
                                showScanIcon: false
                            });
                            counter++;
                        }
                    });
                    //recorremos nuevamente el array para agregar las licencias
                    result.forEach(currentLicense => {
                        //busco la ubicacion donde debo asignar la licencia
                        //recorro el array de locations y verifico donde puedo ingresar el objeto license
                        let findLocation = this.findLocation(currentLicense);
                        if (findLocation != null) {
                            let isComplete = currentLicense.CURRENT_LOCATION &&
                                currentLicense.CURRENT_LOCATION.split("@")[0] !=
                                    this.settings.userCredentials.login;
                            let counterLicenses = findLocation.licenses.length;
                            findLocation.licenses.push({
                                id: counterLicenses + 1,
                                currentLocation: currentLicense.CURRENT_LOCATION,
                                isComplete: isComplete,
                                licenseId: currentLicense.LICENSE_ID,
                                showScanIcon: false
                            });
                        }
                    });
                    if (this.locations.length > 0) {
                        this.locations[0].showScanIcon = true;
                        this.currentScan =
                            enums_1.Enums.LocateLicensePickingScan.TargetLocation;
                        this.currentLocation = this.locations[0];
                        this.currentLocation.showDetails = false;
                        this.toggleDetails(this.currentLocation);
                    }
                }
                else {
                    this.backToGeneralPicking();
                }
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InsertDataBaseError);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            this.scanToken = this.device.subscribeToScanner(data => this.userWantsToProcessScannedData(data));
            this.userInteraction.hideLoading();
        });
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    toggleDetails(location) {
        this.currentLocation = location;
        this.userWantsToChangeCurrentScan(enums_1.Enums.LocateLicensePickingScan.TargetLocation, null, this.currentLocation);
        return this.toggleLocation(location);
    }
    toggleLocation(location) {
        if (location.showDetails) {
            location.showDetails = false;
            location.icon = "arrow-dropright";
            return false;
        }
        else {
            location.showDetails = true;
            location.icon = "arrow-dropdown";
            return true;
        }
    }
    userWantsToChangeCurrentScan(newScan, license = null, location = null) {
        if (this.stopEvent) {
            this.stopEvent = false;
            return;
        }
        switch (newScan) {
            case enums_1.Enums.LocateLicensePickingScan.TargetLocation:
                if (location) {
                    location.showScanIcon = true;
                    this.locations.forEach(currentLocation => {
                        if (currentLocation.id != location.id) {
                            currentLocation.showScanIcon = false;
                        }
                    });
                }
                break;
            case enums_1.Enums.LocateLicensePickingScan.LicenseId:
                if (license && location) {
                    license.showScanIcon = true;
                    this.locations.forEach(current => {
                        current.licenses.forEach(currentLicense => {
                            if (license.licenseId != currentLicense.licenseId) {
                                currentLicense.showScanIcon = false;
                            }
                        });
                    });
                    this.currentLocation = location;
                }
                else {
                    this.currentLocation.licenses.forEach(currentLicense => {
                        currentLicense.showScanIcon = false;
                    });
                    if (this.currentLocation.licenses.length > 0) {
                        this.currentLocation.licenses[0].showScanIcon = true;
                    }
                }
                break;
            default:
                return;
        }
        this.currentScan = newScan;
    }
    userWantsToProcessScannedData(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.scanData = scanData;
                switch (this.currentScan) {
                    case enums_1.Enums.LocateLicensePickingScan.TargetLocation:
                        yield this.processLocationScan(scanData);
                        yield this.userInteraction.hideLoading();
                        break;
                    case enums_1.Enums.LocateLicensePickingScan.LicenseId:
                        yield this.processLicenseScan(scanData);
                        break;
                    case enums_1.Enums.LocateLicensePickingScan.None:
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
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    processLicenseScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentLocation.targetLocation == null) {
                yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.LocationDoesNotScanned, scanData);
                return Promise.resolve();
            }
            let license = _.find(this.currentLocation.licenses, (currentLicense) => {
                return currentLicense.showScanIcon;
            });
            if (!(license && license.licenseId == Number(scanData.split("-")[0]))) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes
                    .LicenseScannedDoesNotMatchWithLicenseDispatch);
                return Promise.resolve();
            }
            let request = models_1.DataRequest.Factory.createRegisterForReplenishment(this.currentLocation.targetLocation, Number(scanData.split("-")[0]), this.settings.userCredentials.loginId.split("@")[0], this.settings.userCredentials);
            let result = yield this.picking.registerForRePlenishment(request);
            if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                let license = _.find(this.currentLocation.licenses, (currentLicense) => {
                    return (currentLicense.licenseId ==
                        Number(scanData.split("-")[0]));
                });
                license.currentLocation = this.currentLocation.targetLocation;
                license.isComplete = true;
                license.showScanIcon = false;
                let currentIndex = _.findIndex(this.currentLocation.licenses, currentLicense => {
                    return currentLicense.licenseId == license.licenseId;
                });
                if (currentIndex != this.currentLocation.licenses.length - 1) {
                    this.currentLocation.licenses[currentIndex + 1].showScanIcon = true;
                }
                this.markLocationAsComplete(this.currentLocation);
                this.backToGeneralPicking();
            }
            else {
                this.userInteraction.showCustomError(result.Codigo && result.Codigo > 0
                    ? result.Codigo
                    : enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            return Promise.resolve();
        });
    }
    markLocationAsComplete(location) {
        if (this.locateDispatch.isAllLicensesAllComplete(location)) {
            location.isComplete = true;
            location.showDetails = false;
            location.showScanIcon = false;
            location.icon = "arrow-dropright";
            this.markNextLocation(location);
        }
    }
    markNextLocation(location) {
        let currentIndex = _.findIndex(this.locations, currentLocation => {
            return currentLocation.targetLocation == location.targetLocation;
        });
        if (currentIndex != this.locations.length - 1) {
            this.locations[currentIndex + 1].showScanIcon = true;
            this.currentLocation = this.locations[currentIndex + 1];
            this.currentScan = enums_1.Enums.LocateLicensePickingScan.TargetLocation;
            this.currentLocation.showDetails = false;
            this.toggleDetails(this.currentLocation);
        }
    }
    processLocationScan(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.validateLocation(scanData)) {
                if (this.currentLocation.targetLocation != scanData) {
                    yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes
                        .LocationScannedDoesNotMatchWithTargetLocationDispatch, scanData);
                    return Promise.resolve();
                }
                this.currentLocation.color = "favorite";
                let id = this.currentLocation.id;
                this.markLocationAsComplete(this.currentLocation);
                if (!this.locations[id].isComplete) {
                    this.locations[id].showScanIcon = false;
                    //si esta oculto lo muestro y si esta abierto no hago nada
                    if (!this.locations[id].showDetails) {
                        this.locations[id].showDetails = true;
                        this.locations[id].icon = "arrow-dropdown";
                    }
                    this.userWantsToChangeCurrentScan(enums_1.Enums.LocateLicensePickingScan.LicenseId, this.locations[id].licenses[0], this.locations[id]);
                }
                this.backToGeneralPicking();
                return Promise.resolve();
            }
            else {
                return Promise.reject("Invalid location");
            }
        });
    }
    validateLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            let request = models_1.DataRequest.Factory.createValidatedIfJoinSpotExists(location, this.settings.userCredentials);
            let result = yield this.locationProvider.validateIfLocationExists(request);
            if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                return Promise.resolve(true);
            }
            else {
                return Promise.resolve(false);
            }
        });
    }
    printLicenseDispatch(license) {
        this.stopEvent = true;
        if (license) {
            this.printLicense(license);
        }
    }
    printLicense(license) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                let request = models_1.DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(license.licenseId, this.settings.userCredentials);
                let format = yield this.printer.getLicenseDispatchPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    scanBarcode() {
        return this.device.scan();
    }
    goToLicenseInfo(license) {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopEvent = true;
            if (license) {
                let params = {
                    licenseId: license.licenseId
                };
                let alertMessage = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DoYouWantToProceedNewQuery);
                let navigationStack = this.navigation.tabs[2].navigationStack;
                if (navigationStack.length > 0) {
                    let userConfirm = yield this.userInteraction.showConfirmMessage(alertMessage);
                    if (userConfirm === enums_1.Enums.YesNo.Yes) {
                        this.navigation.currentTab.navigationStack.length = 0;
                    }
                    else {
                        return;
                    }
                }
                yield this.workspace.changeCurrentTab(enums_1.Enums.Tab.InfoCenter, enums_1.Enums.Page.InfoCenter);
                yield this.navigation.pushPage(enums_1.Enums.Page.LicenseInfo, this.workspace, this.workspace.infoCenterNavCtrl, params);
            }
        });
    }
};
LocateReplenishmentPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-locate-replenishment",
        templateUrl: "locate-replenishment.html"
    }),
    __metadata("design:paramtypes", [user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        user_settings_1.UserSettingsProvider,
        location_1.LocationProvider,
        picking_1.PickingProvider,
        printer_1.PrinterProvider,
        translate_1.TranslateProvider,
        ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        locate_dispatch_1.LocateDispatchProvider])
], LocateReplenishmentPage);
exports.LocateReplenishmentPage = LocateReplenishmentPage;
//# sourceMappingURL=locate-replenishment.js.map