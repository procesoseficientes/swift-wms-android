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
const workspace_1 = require("../workspace/workspace");
const navigation_1 = require("../../providers/navigation/navigation");
const enums_1 = require("../../enums/enums");
const user_interaction_1 = require("../../providers/user-interaction/user-interaction");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const models_1 = require("../../models/models");
const charge_1 = require("../../providers/charge/charge");
let LicenseChargesPage = class LicenseChargesPage {
    constructor(navCtrl, navParams, userInteraction, workspace, navigation, chargeProvider, settings) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.userInteraction = userInteraction;
        this.workspace = workspace;
        this.navigation = navigation;
        this.chargeProvider = chargeProvider;
        this.settings = settings;
        this.charges = [];
        this.licenseId = 0;
        this.isLoaded = true;
        this.taskId = 0;
        this.wavePickingId = 0;
        this.regimeTask = enums_1.Enums.Regime.General;
        this.isGeneralTransfer = false;
    }
    ionViewDidEnter() {
        let params = this.navParams.data;
        this.licenseId = params.licenseId;
        this.taskId = params.taskId;
        this.charges = params.charges;
        this.wavePickingId = params.wavePickingId;
        this.transType = params.transType;
        this.times = params.times;
        this.regimeTask = params.regime;
        this.userInteraction.hideLoading();
        this.task = this.navParams.data.task || null;
        this.reqRegisterGenTransReception =
            params.reqRegisterGenTransReception || null;
        this.isGeneralTransfer =
            this.task.taskSubtype === enums_1.Enums.TaskSubType.GeneralTransfer;
    }
    validateInputNumber(index) {
        if (isNaN(this.charges[index].qty) ||
            this.charges[index].qty.toString() === "") {
            this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.InvalidInput, this.charges[index].qty.toString());
            this.charges[index].qty = 0;
            return;
        }
    }
    saveChargesInLicense() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.userInteraction.showLoading();
                this.charges.forEach((charge) => {
                    charge.licenseId = this.licenseId;
                    charge.transType = this.transType;
                });
                let result = yield this.chargeProvider.updateCharges(this.charges, this.settings.userCredentials);
                if (result.Resultado === enums_1.Enums.OperationResult.Success) {
                    if (this.transType ===
                        (enums_1.Enums.TransType.GeneralReception ||
                            enums_1.Enums.TransType.FiscalReception)) {
                        if (this.isGeneralTransfer) {
                            this.navigation.popPage(this.workspace, this.navCtrl, {
                                wavePickingId: this.wavePickingId,
                                regime: this.regimeTask,
                                task: this.task
                            }, this.times + 1);
                        }
                        else {
                            this.navigation.popPage(this.workspace, this.navCtrl, {
                                taskId: this.taskId,
                                regime: this.regimeTask,
                                wavePickingId: this.wavePickingId,
                                task: this.task
                            }, this.times + 1);
                        }
                    }
                    else if (this.transType === enums_1.Enums.TransType.PartialRelocation) {
                        this.navigation.popPage(this.workspace, this.navCtrl, {
                            licenseId: this.licenseId,
                            regime: this.regimeTask,
                            wavePickingId: this.wavePickingId,
                            task: this.task
                        }, this.times + 1);
                    }
                    else if (this.transType ===
                        (enums_1.Enums.TransType.Picking || enums_1.Enums.TransType.FiscalPicking)) {
                        if (this.task.taskSubtype ===
                            enums_1.Enums.TaskSubType.GeneralTransfer) {
                            this.navigation.popPage(this.workspace, this.navCtrl, {
                                wavePickingId: this.wavePickingId,
                                regime: this.regimeTask,
                                task: this.task
                            }, this.times + 1);
                        }
                        else {
                            this.navigation.popPage(this.workspace, this.navCtrl, {
                                wavePickingId: this.wavePickingId,
                                regime: this.regimeTask,
                                task: this.task
                            }, this.times + 1);
                        }
                    }
                }
                else {
                    let code = result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : enums_1.Enums.CustomErrorCodes.InvalidInput;
                    this.userInteraction.showCustomError(code);
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
    backButtonAction() { }
};
LicenseChargesPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-license-charges",
        templateUrl: "license-charges.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        user_interaction_1.UserInteractionProvider,
        workspace_1.WorkspacePage,
        navigation_1.NavigationProvider,
        charge_1.ChargeProvider,
        user_settings_1.UserSettingsProvider])
], LicenseChargesPage);
exports.LicenseChargesPage = LicenseChargesPage;
//# sourceMappingURL=license-charges.js.map