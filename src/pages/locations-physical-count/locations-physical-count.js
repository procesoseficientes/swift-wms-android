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
const enums_1 = require("../../enums/enums");
const physical_count_1 = require("../../providers/physical-count/physical-count");
const models_1 = require("../../models/models");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const translate_1 = require("../../providers/translate/translate");
let LocationsPhysicalCountPage = class LocationsPhysicalCountPage {
    constructor(navCtrl, navParams, navigation, workspace, settings, userInteraction, device, physicalCount, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.settings = settings;
        this.userInteraction = userInteraction;
        this.device = device;
        this.physicalCount = physicalCount;
        this.translate = translate;
        this.taskId = "";
        this.isAndroid = false;
        this.locations = [];
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let params = this.navParams.data;
                this.taskId = params.taskId;
                this.locations = yield this.getLocations();
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
        this.validateScannedLocation(scanData);
        return Promise.resolve();
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }
    scanBarcode() {
        return this.device.scan();
    }
    getLocations() {
        let request = models_1.DataRequest.Factory.createGetLocationsForCountRequest(Number(this.taskId), this.settings.userCredentials);
        return this.physicalCount.getLocationsForCount(request);
    }
    validateScannedLocation(locationSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createValidateScannedLocationForCountRequest(Number(this.taskId), locationSpot, this.settings.userCredentials);
                let result = yield this.physicalCount.validateScannedLocationForCount(request);
                switch (result.Codigo) {
                    case enums_1.Enums.CountStatus.Invalid:
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, locationSpot);
                        break;
                    case enums_1.Enums.CountStatus.Canceled:
                        yield this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.TaskIsClosed);
                        break;
                    case enums_1.Enums.CountStatus.Completed:
                        yield this.userInteraction.hideLoading();
                        let message = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert
                            .LocationCompletedDoYouWishToRecount);
                        let result = yield this.userInteraction.showConfirmMessage(message);
                        if (result === enums_1.Enums.YesNo.Yes) {
                            let request = models_1.DataRequest.Factory.createRecountLocationRequest(Number(this.taskId), locationSpot, this.settings.userCredentials);
                            let res = yield this.physicalCount.recountLocation(request);
                            if (res.RESULT === enums_1.Enums.OK.OK) {
                                this.navigation.pushPage(enums_1.Enums.Page.PhysicalCount, this.workspace, this.navCtrl, {
                                    locationSpot: locationSpot,
                                    taskId: this.taskId
                                });
                            }
                            else {
                                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.SomethingWentWrong);
                            }
                        }
                        break;
                    case enums_1.Enums.CountStatus.Available:
                        this.navigation.pushPage(enums_1.Enums.Page.PhysicalCount, this.workspace, this.navCtrl, {
                            locationSpot: locationSpot,
                            taskId: this.taskId
                        });
                        break;
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
LocationsPhysicalCountPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-locations-physical-count",
        templateUrl: "locations-physical-count.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_settings_1.UserSettingsProvider,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        physical_count_1.PhysicalCountProvider,
        translate_1.TranslateProvider])
], LocationsPhysicalCountPage);
exports.LocationsPhysicalCountPage = LocationsPhysicalCountPage;
//# sourceMappingURL=locations-physical-count.js.map