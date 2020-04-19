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
const user_settings_1 = require("../../providers/user-settings/user-settings");
const picking_1 = require("../../providers/picking/picking");
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
let PendingLocatePickingDispatchPage = class PendingLocatePickingDispatchPage {
    constructor(navCtrl, navParams, navigation, workspace, userInteraction, settings, picking) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.navigation = navigation;
        this.workspace = workspace;
        this.userInteraction = userInteraction;
        this.settings = settings;
        this.picking = picking;
        this.wavePickingPendingToLocate = [];
    }
    ionViewDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let request = models_1.DataRequest.Factory.createGetWavePickingPendingToLocate(this.settings.userCredentials);
                this.wavePickingPendingToLocate = yield this.picking.getWavePickingPendingToLocate(request);
            }
            catch (error) {
                yield this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(enums_1.Enums.CustomErrorCodes.UnknownError);
            }
            finally {
                yield this.userInteraction.hideLoading();
            }
            return Promise.resolve();
        });
    }
    gotoLocateWavePicking(pending) {
        if (pending.TASK_TYPE === enums_1.Enums.TaskType.Picking) {
            this.navigation.pushPage(enums_1.Enums.Page.LocateLicenseDispatch, this.workspace, this.navCtrl, {
                wavePickingId: pending.WAVE_PICKING_ID,
                locations: [],
                isPickingTaskComplete: false
            });
        }
        else if (pending.TASK_TYPE === enums_1.Enums.TaskType.Relocation) {
            this.navigation.pushPage(enums_1.Enums.Page.LocateReplenishment, this.workspace, this.navCtrl, {
                wavePickingId: pending.WAVE_PICKING_ID,
                locations: [],
                isPickingTaskComplete: false
            });
        }
    }
    backButtonAction() {
        return this.navigation.popPage(this.workspace, this.navCtrl, {}, 1);
    }
    showDocNum(wavePickingForLicenseDispatch) {
        if (wavePickingForLicenseDispatch.DOC_NUM ==
            enums_1.Enums.WaveDispatchConsolidated.Consolidated) {
            return enums_1.Enums.WaveDispatchLabel.Consolidated.toString();
        }
        else if (wavePickingForLicenseDispatch.DOC_NUM == "-1") {
            return enums_1.Enums.WaveDispatchLabel.NoPickingDocument.toString();
        }
        else {
            return wavePickingForLicenseDispatch.DOC_NUM;
        }
    }
};
PendingLocatePickingDispatchPage = __decorate([
    ionic_angular_1.IonicPage(),
    core_1.Component({
        selector: "page-pending-locate-picking-dispatch",
        templateUrl: "pending-locate-picking-dispatch.html"
    }),
    __metadata("design:paramtypes", [ionic_angular_1.NavController,
        ionic_angular_1.NavParams,
        navigation_1.NavigationProvider,
        workspace_1.WorkspacePage,
        user_interaction_1.UserInteractionProvider,
        user_settings_1.UserSettingsProvider,
        picking_1.PickingProvider])
], PendingLocatePickingDispatchPage);
exports.PendingLocatePickingDispatchPage = PendingLocatePickingDispatchPage;
//# sourceMappingURL=pending-locate-picking-dispatch.js.map