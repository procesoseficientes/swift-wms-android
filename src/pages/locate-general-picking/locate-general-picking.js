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
const picking_1 = require("../../providers/picking/picking");
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const device_1 = require("../../providers/device/device");
const enums_1 = require("../../enums/enums");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const location_1 = require("../../providers/location/location");
const translate_1 = require("../../providers/translate/translate");
const task_1 = require("../../providers/task/task");
let LocateGeneralPickingPage = class LocateGeneralPickingPage {
    constructor(navCtrl, navParams, navigation, workspace, picking, locationProvider, translate, userInteraction, device, task, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.picking = picking;
        this.locationProvider = locationProvider;
        this.translate = translate;
        this.userInteraction = userInteraction;
        this.device = device;
        this.task = task;
        this.settings = settings;
        this.location = models_1.Model.Factory.createShelfSpot();
        this.wavePickingId = 0;
        this.locationSpotTarget = "";
        this.scanData = "";
        this.isAndroid = false;
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            let params = this.navParams.data;
            this.wavePickingId = params.wavePickingId;
            let request = models_1.DataRequest.Factory.createGetTaskListRequest(this.wavePickingId, this.settings.userCredentials);
            let task = yield this.task.getFirstPickingTaskByPickingId(request);
            this.locationSpotTarget = task.locationSpotTarget;
            this.scanToken = this.device.subscribeToScanner(data => this.userWantsToProcessScannedData(data));
            this.userInteraction.hideLoading();
            if (!task.locationSpotTarget) {
                this.navigation.setNewRoot(enums_1.Enums.Page.MyTasks, this.workspace, this.navCtrl);
            }
        });
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    locatePicking() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createUpdateLocationTargetTaskRequest(this.wavePickingId, this.location.locationSpot, this.settings.userCredentials);
                let result = yield this.picking.updateLocationTargetTask(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.navigation.setNewRoot(enums_1.Enums.Page.MyTasks, this.workspace, this.navCtrl);
                }
                else {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
                return Promise.resolve(result);
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                let operation = models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: error
                });
                return Promise.resolve(operation);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    scanBarcode() {
        return this.device.scan();
    }
    userWantsToProcessScannedData(data) {
        if (this.locationSpotTarget !== data) {
            return this.showDifferentLocationConfirmPrompt(data);
        }
        else {
            return this.getLocationSpot(data);
        }
    }
    showDifferentLocationConfirmPrompt(locationSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            let alertMessage = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, enums_1.Enums.Translation.Alert.DifferentLocation);
            let result = yield this.userInteraction.showConfirmMessage(alertMessage);
            if (result === enums_1.Enums.YesNo.Yes) {
                yield this.getLocationSpot(locationSpot);
            }
            this.userInteraction.hideLoading();
            return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
        });
    }
    getLocationSpot(locationSpot) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let locationRequest = models_1.DataRequest.Factory.createGetLocationRequest(locationSpot, this.settings.userCredentials);
                this.location = yield this.locationProvider.getLocation(locationRequest);
                if (!this.location) {
                    yield this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, locationSpot);
                    let operation = models_1.Model.Factory.createFaultOperation({
                        code: enums_1.Enums.CustomErrorCodes.UnknownError,
                        message: "Location not found."
                    });
                    return Promise.resolve(operation);
                }
                else {
                    return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
                }
            }
            catch (error) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, locationSpot);
                let operation = models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.UnknownError,
                    message: error
                });
                return Promise.resolve(operation);
            }
            finally {
                this.userInteraction.hideLoading();
            }
        });
    }
    backButtonAction() { }
};
LocateGeneralPickingPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-locate-general-picking",
        templateUrl: "locate-general-picking.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        picking_1.PickingProvider,
        location_1.LocationProvider,
        translate_1.TranslateProvider,
        user_interaction_1.UserInteractionProvider,
        device_1.DeviceProvider,
        task_1.TaskProvider,
        user_settings_1.UserSettingsProvider])
], LocateGeneralPickingPage);
exports.LocateGeneralPickingPage = LocateGeneralPickingPage;
//# sourceMappingURL=locate-general-picking.js.map