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
const enums_1 = require("../../enums/enums");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const label_1 = require("../../providers/label/label");
const printer_1 = require("../../providers/printer/printer");
let LabelInfoPage = class LabelInfoPage {
    constructor(navCtrl, navParams, workspace, navigation, userInteraction, settings, labelProvider, printer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.workspace = workspace;
        this.navigation = navigation;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.labelProvider = labelProvider;
        this.printer = printer;
        this.labelId = 0;
        this.labelInfo = models_1.Model.Factory.createLabelInfo();
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            this.loadLabelInfo();
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            lastOption: enums_1.Enums.InfoCenterOption.Label
        });
    }
    loadLabelInfo() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.labelId = this.navParams
                    .data.labelId;
                let labelInfoRequest = models_1.DataRequest.Factory.createGetLabelInfoRequest(this.labelId, this.settings.userCredentials);
                this.labelInfo = yield this.labelProvider.getLabelInfo(labelInfoRequest);
                if (!this.labelInfo.targetLocation) {
                    this.labelInfo.targetLocation = this.labelInfo.sourceLocation;
                }
                if (!this.labelInfo.clientName) {
                    this.labelInfo.clientName = this.labelInfo.clientCode;
                }
                return this.userInteraction.hideLoading();
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.DataNotFound, this.labelId.toString());
                return this.navigation.popPage(this.workspace, this.navCtrl, {
                    lastOption: enums_1.Enums.InfoCenterOption.Label
                });
            }
        });
    }
    relocateLabel() {
        return this.navigation.pushPage(enums_1.Enums.Page.RelocateFullLicense, this.workspace, this.navCtrl, {
            labelId: Number(this.labelId)
        });
    }
    printLabel() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.settings.printer) {
                    this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.PrinterNotConfigured);
                    return;
                }
                let request = models_1.DataRequest.Factory.createGetLabelPrintFormatRequest(this.labelId, this.settings.userCredentials);
                let format = yield this.printer.getLabelPrintFormat(request);
                yield this.printer.printDocument(this.settings.printer, format.FORMAT);
            }
            catch (e) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
        });
    }
};
LabelInfoPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-label-info",
        templateUrl: "label-info.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        workspace_1.WorkspacePage,
        navigation_1.NavigationProvider,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        label_1.LabelProvider,
        printer_1.PrinterProvider])
], LabelInfoPage);
exports.LabelInfoPage = LabelInfoPage;
//# sourceMappingURL=label-info.js.map