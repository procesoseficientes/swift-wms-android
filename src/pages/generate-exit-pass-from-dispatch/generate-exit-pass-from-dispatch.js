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
const picking_1 = require("../../providers/picking/picking");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const enums_1 = require("../../enums/enums");
const translate_1 = require("../../providers/translate/translate");
const printer_1 = require("../../providers/printer/printer");
let GenerateExitPassFromDispatchPage = class GenerateExitPassFromDispatchPage {
    constructor(navCtrl, navParams, navigation, workspace, picking, userInteraction, settings, translateProvider, printer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.picking = picking;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.translateProvider = translateProvider;
        this.printer = printer;
        this.exitPassId = 0;
        this.dispatchNumber = 0;
        this.inputName = "";
        this.inputLastName = "";
        this.inputplateNumber = "";
        this.pilotId = 0;
        this.vehicleId = 0;
    }
    ionViewDidEnter() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userInteraction.hideLoading();
            let params = this.navParams
                .data;
            this.dispatchNumber = params.dispatchNumber;
        });
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }
    checkCompletedData() {
        let validated = true;
        if (this.inputName === "") {
            validated = false;
        }
        else if (this.inputLastName === "") {
            validated = false;
        }
        else if (this.inputplateNumber === "") {
            validated = false;
        }
        else if (this.exitPassId > 0) {
            validated = false;
        }
        return validated;
    }
    checkCompletedExitPass() {
        let validated = false;
        if (this.exitPassId > 0) {
            validated = true;
        }
        return validated;
    }
    printExitPass() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.settings.printer.address === "") {
                    this.userInteraction.hideLoading();
                    return;
                }
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createGetPrintPassFormatByHH(this.exitPassId, this.settings.userCredentials);
                let result = yield this.printer.getPrintPassFormatByHH(request);
                yield this.printer.printDocument(this.settings.printer, result.FORMAT);
                this.userInteraction.hideLoading();
            }
            catch (e) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(e);
            }
        });
    }
    completedProcessExitPass() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.userInteraction.showLoading();
                let request = models_1.DataRequest.Factory.createInsertPilotFromDispatchLicenseRequest(this.inputName, this.inputLastName, this.settings.userCredentials);
                let operation = yield this.picking.insertPilotFromDispatchLicense(request);
                if (operation.Resultado === enums_1.Enums.OperationResult.Success) {
                    this.pilotId = parseInt(operation.DbData);
                    let requestVehicle = models_1.DataRequest.Factory.createInsertVehicleFromDispatchLicenceRequest(this.inputplateNumber, this.settings.userCredentials);
                    operation = yield this.picking.insertVehicleFromDispatchLicence(requestVehicle);
                    if (operation.Resultado === enums_1.Enums.OperationResult.Success) {
                        this.vehicleId = parseInt(operation.DbData);
                        let requestExitPass = models_1.DataRequest.Factory.createInsertExitPassFromDispatchLicenceRequest(this.dispatchNumber, this.vehicleId, this.pilotId, this.settings.userCredentials);
                        operation = yield this.picking.insertExitPassFromDispatchLicence(requestExitPass);
                        if (operation.Resultado === enums_1.Enums.OperationResult.Success) {
                            this.exitPassId = parseInt(operation.DbData);
                            yield this.userInteraction.hideLoading();
                            yield this.userInteraction.showMessage(yield this.translateProvider.translateGroupValue(enums_1.Enums.Translation.Groups.Messages, "Successful_process_"));
                        }
                        else {
                            yield this.userInteraction.hideLoading();
                            yield this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                                ? operation.Codigo
                                : enums_1.Enums.CustomErrorCodes.UnknownError);
                        }
                    }
                    else {
                        yield this.userInteraction.hideLoading();
                        yield this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : enums_1.Enums.CustomErrorCodes.UnknownError);
                    }
                }
                else {
                    yield this.userInteraction.hideLoading();
                    yield this.userInteraction.showCustomError(operation.Codigo && operation.Codigo > 0
                        ? operation.Codigo
                        : enums_1.Enums.CustomErrorCodes.UnknownError);
                }
            }
            catch (reason) {
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
                yield this.userInteraction.hideLoading();
                return Promise.resolve(models_1.Model.Factory.createFaultOperation(models_1.Model.Factory.createCustomError(reason, enums_1.Enums.CustomErrorCodes.DataBaseError)));
            }
        });
    }
};
GenerateExitPassFromDispatchPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "generate-exit-pass-from-dispatch",
        templateUrl: "generate-exit-pass-from-dispatch.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        picking_1.PickingProvider,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        translate_1.TranslateProvider,
        printer_1.PrinterProvider])
], GenerateExitPassFromDispatchPage);
exports.GenerateExitPassFromDispatchPage = GenerateExitPassFromDispatchPage;
//# sourceMappingURL=generate-exit-pass-from-dispatch.js.map