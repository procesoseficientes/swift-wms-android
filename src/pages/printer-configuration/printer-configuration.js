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
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const navigation_1 = require("../../providers/navigation/navigation");
const workspace_1 = require("../workspace/workspace");
const printer_1 = require("../../providers/printer/printer");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const _ = require("lodash");
let PrinterConfigurationPage = class PrinterConfigurationPage {
    constructor(navCtrl, navParams, userInteraction, navigation, workspace, printer, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userInteraction = userInteraction;
        this.navigation = navigation;
        this.workspace = workspace;
        this.printer = printer;
        this.settings = settings;
        this.selectedOption = "";
        this.printers = [];
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.currentPrinter =
                    this.settings.printer || { address: "" };
                this.selectedOption = this.currentPrinter.address;
                this.printers = yield this.printer.discoverPrinters();
                if (this.printers)
                    this.setPrinterSelection();
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(e);
            }
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
    linkPrinter() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.printers.length <= 0) {
                    this.userInteraction.hideLoading();
                    return;
                }
                yield this.userInteraction.showLoading();
                this.currentPrinter =
                    _.find(this.printers, (printer) => {
                        return printer.address === this.selectedOption;
                    }) || this.printers[0];
                yield this.printer.savePrinter(this.currentPrinter);
                this.setPrinterSelection();
                this.userInteraction.hideLoading();
                return this.currentPrinter;
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(e);
            }
        });
    }
    printTest() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.currentPrinter.address === "") {
                    this.userInteraction.hideLoading();
                    return Promise.resolve(false);
                }
                yield this.userInteraction.showLoading();
                let result = yield this.printer.printTest(this.currentPrinter);
                this.userInteraction.hideLoading();
                return Promise.resolve(result);
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(e);
                return Promise.resolve(false);
            }
        });
    }
    refreshPrinters(refresher) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                this.printers = yield this.printer.discoverPrinters();
                if (refresher)
                    refresher.complete();
                if (this.printers)
                    this.setPrinterSelection();
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                if (refresher)
                    refresher.complete();
                this.userInteraction.showCustomError(e);
            }
        });
    }
    setPrinterSelection() {
        this.printers.forEach((printer) => {
            printer.selected = printer.address === this.currentPrinter.address;
        });
    }
};
PrinterConfigurationPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-printer-configuration",
        templateUrl: "printer-configuration.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        user_interaction_1.UserInteractionProvider,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        printer_1.PrinterProvider,
        user_settings_1.UserSettingsProvider])
], PrinterConfigurationPage);
exports.PrinterConfigurationPage = PrinterConfigurationPage;
//# sourceMappingURL=printer-configuration.js.map