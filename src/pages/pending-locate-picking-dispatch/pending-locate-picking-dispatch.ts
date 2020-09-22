import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { PickingProvider } from "../../providers/picking/picking";
import { DataResponse, DataRequest } from "../../models/models";
import { Enums } from "../../enums/enums";

@IonicPage()
@Component({
    selector: "page-pending-locate-picking-dispatch",
    templateUrl: "pending-locate-picking-dispatch.html"
})
export class PendingLocatePickingDispatchPage {
    wavePickingPendingToLocate: Array<
        DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE
    > = [];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private picking: PickingProvider
    ) {}

    async ionViewDidLoad(): Promise<void> {
        try {
            let request: DataRequest.GetWavePickingPendingToLocate = DataRequest.Factory.createGetWavePickingPendingToLocate(
                this.settings.userCredentials
            );
            this.wavePickingPendingToLocate = await this.picking.getWavePickingPendingToLocate(
                request
            );
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            await this.userInteraction.hideLoading();
        }
        return Promise.resolve();
    }

    gotoLocateWavePicking(
        pending: DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE
    ) {
        if (pending.TASK_TYPE === Enums.TaskType.Picking) {
            this.navigation.pushPage(
                Enums.Page.LocateLicenseDispatch,
                this.workspace,
                this.navCtrl,
                {
                    wavePickingId: pending.WAVE_PICKING_ID,
                    locations: [],
                    isPickingTaskComplete: false
                }
            );
        } else if (pending.TASK_TYPE === Enums.TaskType.Relocation) {
            this.navigation.pushPage(
                Enums.Page.LocateReplenishment,
                this.workspace,
                this.navCtrl,
                {
                    wavePickingId: pending.WAVE_PICKING_ID,
                    locations: [],
                    isPickingTaskComplete: false
                }
            );
        }
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {}, 1);
    }

    showDocNum(
        wavePickingForLicenseDispatch: DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE
    ): string {
        if (
            wavePickingForLicenseDispatch.DOC_NUM ==
            Enums.WaveDispatchConsolidated.Consolidated
        ) {
            return Enums.WaveDispatchLabel.Consolidated.toString();
        } else if (wavePickingForLicenseDispatch.DOC_NUM == "-1") {
            return Enums.WaveDispatchLabel.NoPickingDocument.toString();
        } else {
            return wavePickingForLicenseDispatch.DOC_NUM;
        }
    }
}
