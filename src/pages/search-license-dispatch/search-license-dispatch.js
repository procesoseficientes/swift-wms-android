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
const device_1 = require("../../providers/device/device");
const enums_1 = require("../../enums/enums");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const models_1 = require("../../models/models");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const picking_1 = require("../../providers/picking/picking");
const user_settings_1 = require("../../providers/user-settings/user-settings");
let SearchLicenseDispatchPage = class SearchLicenseDispatchPage {
    constructor(navCtrl, navParams, device, navigation, workspace, userInteraction, picking, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.picking = picking;
        this.settings = settings;
        this.isAndroid = false;
        this.selectedOption = enums_1.Enums
            .TypeFilterLicenseDispatch.DispatchLicense;
        this.listWavePickingPending = [];
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
            this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
            this.selectedOption = enums_1.Enums.TypeFilterLicenseDispatch.DispatchLicense;
            this.userInteraction.hideLoading();
            this.listWavePickingPending = yield this.getWavePickingPending();
        });
    }
    keyPressSerie(key) {
        if (key === enums_1.Enums.KeyCode.Enter) {
            if (!this.inputSearch && this.inputSearch == "")
                return;
            this.showPage();
        }
    }
    showPage() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            let licenses = yield this.getWavePickingForLicenseDispatch();
            if (licenses.length > 0) {
                this.navigation.pushPage(enums_1.Enums.Page.WavePickingDispatchConfirm, this.workspace, this.navCtrl, {
                    wavePickingForLicenseDispatch: licenses[0],
                    backPage: false
                });
                yield this.userInteraction.hideLoading();
            }
            else {
                yield this.userInteraction.hideLoading();
            }
        });
    }
    processBarcodeScan(scanData) {
        this.scanData = scanData;
        this.inputSearch = scanData;
        this.showPage();
        return Promise.resolve(true);
    }
    scanBarcode() {
        return this.device.scan();
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
    getWavePickingForLicenseDispatch() {
        let licenseCode = this.inputSearch.split("-");
        let numberCode = licenseCode.length > 0
            ? Number(licenseCode[0])
            : Number(this.inputSearch);
        let request = models_1.DataRequest.Factory.createGetWavePickingForLicenseDispatchRequest(numberCode, this.selectedOption, this.settings.userCredentials);
        return this.picking.getWavePickingForLicenseDispatch(request);
    }
    getWavePickingPending() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.showLoading();
            try {
                let request = models_1.DataRequest.Factory.createGetWavePickingPendingToDispatchRequest(0, this.settings.userCredentials);
                return this.picking.getWavePickingPendingToDispatch(request);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
            yield this.userInteraction.hideLoading();
        });
    }
    getColorOfPriority(priority) {
        switch (priority) {
            case enums_1.Enums.TaskPriority.Low:
                return enums_1.Enums.PriorityCircles.Low;
            case enums_1.Enums.TaskPriority.Medium:
                return enums_1.Enums.PriorityCircles.Medium;
            case enums_1.Enums.TaskPriority.High:
                return enums_1.Enums.PriorityCircles.High;
            default:
                return enums_1.Enums.PriorityCircles.Low;
        }
    }
    doRefresh(refresher) {
        return __awaiter(this, void 0, void 0, function* () {
            this.listWavePickingPending = yield this.getWavePickingPending();
            if (refresher)
                refresher.complete();
        });
    }
    showDispatchLicense(wavePicking) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetWavePickingForLicenseDispatchRequest(wavePicking, enums_1.Enums.TypeFilterLicenseDispatch.WavePickingId, this.settings.userCredentials);
                let licenses = yield this.picking.getWavePickingForLicenseDispatch(request);
                if (licenses.length > 0) {
                    this.navigation.pushPage(enums_1.Enums.Page.WavePickingDispatchConfirm, this.workspace, this.navCtrl, {
                        wavePickingForLicenseDispatch: licenses[0],
                        backPage: false
                    });
                    yield this.userInteraction.hideLoading();
                }
                else {
                    yield this.userInteraction.hideLoading();
                }
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
};
SearchLicenseDispatchPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-search-license-dispatch",
        templateUrl: "search-license-dispatch.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        device_1.DeviceProvider,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        picking_1.PickingProvider,
        user_settings_1.UserSettingsProvider])
], SearchLicenseDispatchPage);
exports.SearchLicenseDispatchPage = SearchLicenseDispatchPage;
//# sourceMappingURL=search-license-dispatch.js.map