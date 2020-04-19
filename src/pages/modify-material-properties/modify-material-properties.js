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
const models_1 = require("../../models/models");
const device_1 = require("../../providers/device/device");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const enums_1 = require("../../enums/enums");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const material_1 = require("../../providers/material/material");
const translate_1 = require("../../providers/translate/translate");
let ModifyMaterialPropertiesPage = class ModifyMaterialPropertiesPage {
    constructor(navCtrl, navParams, navigation, workspace, device, userInteraction, translateProvider, settings, material) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.device = device;
        this.userInteraction = userInteraction;
        this.translateProvider = translateProvider;
        this.settings = settings;
        this.material = material;
        this.scanData = "";
        this.isAndroid = false;
        this.materialInfo = models_1.Model.Factory.createMaterial();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = this.device.isAndroid();
        });
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.isAndroid = this.device.isAndroid();
                this.materialInfo = this.navParams.data;
                this.scanToken = this.device.subscribeToScanner(data => this.userWantToProcessScannedData(data));
                this.userWantsToChangeCurrentScan(enums_1.Enums.ModifyMaterialScan.Barcode);
                yield this.userInteraction.hideLoading();
            }
            catch (exception) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(exception);
            }
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, this.materialInfo);
    }
    userWantsToChangeCurrentScan(newScan) {
        this.currentScan = newScan;
    }
    showScanIcon(option) {
        return option === this.currentScan;
    }
    scanBarcode() {
        return this.device.scan();
    }
    userWantToProcessScannedData(scanData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.scanData = scanData;
                switch (this.currentScan) {
                    case enums_1.Enums.ModifyMaterialScan.Barcode:
                        this.materialInfo.newBarcode = scanData;
                        this.userWantsToChangeCurrentScan(enums_1.Enums.ModifyMaterialScan.AlternateBarcode);
                        yield this.userInteraction.hideLoading();
                        break;
                    case enums_1.Enums.ModifyMaterialScan.AlternateBarcode:
                        this.materialInfo.newAlternateBarcode = scanData;
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
        });
    }
    modifyMaterial() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createUpdateMaterialPropertiesRequest(this.materialInfo, this.settings.userCredentials);
                let result = yield this.material.updateMaterialProperties(request);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    yield this.userInteraction.hideLoading();
                    yield this.userInteraction.showMessage(yield this.translateProvider.translateGroupValue(enums_1.Enums.Translation.Groups.Messages, "Successful_process_"));
                    yield this.navigation.popPage(this.workspace, this.navCtrl, this.materialInfo);
                    this.userInteraction.hideLoading();
                }
                else {
                    yield this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataBaseError);
                }
            }
            catch (reason) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    keyPressScan(key) {
        if (key === enums_1.Enums.KeyCode.Enter) {
            switch (this.currentScan) {
                case enums_1.Enums.ModifyMaterialScan.Barcode:
                    this.userWantsToChangeCurrentScan(enums_1.Enums.ModifyMaterialScan.AlternateBarcode);
                    this.alternateBarcodeInput.setFocus();
                    break;
            }
        }
    }
};
__decorate([
    core_1.ViewChild("alternateBarcode"),
    __metadata("design:type", Object)
], ModifyMaterialPropertiesPage.prototype, "alternateBarcodeInput", void 0);
ModifyMaterialPropertiesPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-modify-material-properties",
        templateUrl: "modify-material-properties.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        device_1.DeviceProvider,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider,
        user_settings_1.UserSettingsProvider,
        material_1.MaterialProvider])
], ModifyMaterialPropertiesPage);
exports.ModifyMaterialPropertiesPage = ModifyMaterialPropertiesPage;
//# sourceMappingURL=modify-material-properties.js.map