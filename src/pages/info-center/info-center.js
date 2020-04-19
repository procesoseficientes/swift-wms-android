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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const translate_1 = require("../../providers/translate/translate");
let InfoCenterPage = class InfoCenterPage {
    constructor(navCtrl, navParams, device, navigation, workspace, userInteraction, translate) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.device = device;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.translate = translate;
        this.selectedOption = enums_1.Enums.InfoCenterOption.Sku;
        this.isAndroid = true;
        this.placeholder = "";
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.isAndroid = true; // this.device.isAndroid();
            let traduction = yield this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Labels, "Enter-Value_");
            this.placeholder = traduction;
        });
    }
    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }
    ionViewDidEnter() {
        this.workspace.infoCenterNavCtrl = this.navCtrl;
        this.scanToken = this.device.subscribeToScanner(data => this.processBarcodeScan(data));
        let params = this.navParams.data;
        this.selectedOption = params.lastOption
            ? params.lastOption
            : enums_1.Enums.InfoCenterOption.Sku;
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
            try {
                switch (this.selectedOption) {
                    case enums_1.Enums.InfoCenterOption.Sku:
                        return this.navigation.pushPage(enums_1.Enums.Page.ResultOfMaterialSearch, this.workspace, this.navCtrl, {
                            materialId: this.inputSearch,
                            isMoreResults: false
                        });
                    case enums_1.Enums.InfoCenterOption.License:
                        return this.navigation.pushPage(enums_1.Enums.Page.LicenseInfo, this.workspace, this.navCtrl, {
                            licenseId: Number(this.inputSearch.split("-")[0])
                        });
                    case enums_1.Enums.InfoCenterOption.Location:
                        return this.navigation.pushPage(enums_1.Enums.Page.LocationInfo, this.workspace, this.navCtrl, {
                            locationId: this.inputSearch
                        });
                    case enums_1.Enums.InfoCenterOption.Label:
                        return this.navigation.pushPage(enums_1.Enums.Page.LabelInfo, this.workspace, this.navCtrl, {
                            labelId: Number(this.inputSearch)
                        });
                    default:
                        this.userInteraction.hideLoading();
                        break;
                }
            }
            catch (error) {
                this.userInteraction.hideLoading();
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
};
InfoCenterPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-info-center",
        templateUrl: "info-center.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        device_1.DeviceProvider,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        translate_1.TranslateProvider])
], InfoCenterPage);
exports.InfoCenterPage = InfoCenterPage;
//# sourceMappingURL=info-center.js.map