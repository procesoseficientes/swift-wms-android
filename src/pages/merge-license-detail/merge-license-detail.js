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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const enums_1 = require("../../enums/enums");
const printer_1 = require("../../providers/printer/printer");
let MergeLicenseDetailPage = class MergeLicenseDetailPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, settings, printer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.printer = printer;
        this.licenses = [];
    }
    ionViewDidEnter() {
        let params = this.navParams.data;
        this.licenses = params.newLicenses;
        this.locationText = params.locationText;
        this.materialName = params.materialName;
        this.userInteraction.hideLoading();
    }
    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }
    printLicense(licenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetLicensePrintFormatRequest(licenseId, 0, this.settings.userCredentials);
                let format = yield this.printer.getLicensePrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
    toggleDetails(license) {
        if (license.showDetails) {
            license.showDetails = false;
            license.icon = "arrow-dropright";
            return false;
        }
        else {
            license.showDetails = true;
            license.icon = "arrow-dropdown";
            return true;
        }
    }
};
MergeLicenseDetailPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-merge-license-detail",
        templateUrl: "merge-license-detail.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        printer_1.PrinterProvider])
], MergeLicenseDetailPage);
exports.MergeLicenseDetailPage = MergeLicenseDetailPage;
//# sourceMappingURL=merge-license-detail.js.map