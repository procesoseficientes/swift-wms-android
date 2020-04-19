import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { DataResponse } from "../../models/models";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
@IonicPage()
@Component({
    selector: "page-physical-count-materials",
    templateUrl: "physical-count-materials.html"
})
export class PhysicalCountMaterialsPage {
    locationSpot: string = "";
    taskId: string = "";
    materials: Array<DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT> = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider
    ) {}

    ionViewDidEnter() {
        let params = this.navParams.data;
        this.locationSpot = params.locationSpot;
        this.taskId = params.taskId;
        this.materials = params.materials;
        this.userInteraction.hideLoading();
    }

    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl, {
            taskId: this.taskId,
            locationSpot: this.locationSpot
        });
    }
}
