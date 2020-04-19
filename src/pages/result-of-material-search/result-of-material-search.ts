import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Model, DataRequest } from "../../models/models";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { MaterialProvider } from "../../providers/material/material";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";

@IonicPage()
@Component({
    selector: "page-result-of-material-search",
    templateUrl: "result-of-material-search.html"
})
export class ResultOfMaterialSearchPage {
    materials: Array<Model.Material> = [];
    selectedOption: string = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private material: MaterialProvider,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage
    ) {}

    async ionViewDidEnter(): Promise<void> {
        try {
            let params = <Model.MaterialInfoParams>this.navParams.data;
            await this.getMaterials(params.materialId);
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    async getMaterials(materialId: string): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let materialRequest = DataRequest.Factory.createGetMaterialRequest(
                this.settings.userCredentials
            );
            materialRequest.barcodeId = materialId;

            this.materials = await this.material.getMaterialByBarcodeOrName(
                materialRequest
            );
            if (this.materials == null || this.materials.length == 0) {
                await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataNotFound,
                    materialId
                );
                return this.navigation.popPage(
                    this.workspace,
                    this.navCtrl,
                    {}
                );
            } else if (this.materials.length == 1) {
                return this.navigation.pushPage(
                    Enums.Page.MaterialInfo,
                    this.workspace,
                    this.navCtrl,
                    <Model.MaterialInfoParams>{
                        materialId: this.materials[0].materialId,
                        isMoreResults: true
                    }
                );
            }
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                materialId
            );
            return this.navigation.popPage(this.workspace, this.navCtrl, {});
        }
    }

    async gotoLocateMaterialInfo(material: Model.Material): Promise<void> {
        material.showDetails = true;
        await this.userInteraction.showLoading();
        await this.navigation.pushPage(
            Enums.Page.MaterialInfo,
            this.workspace,
            this.navCtrl,
            <Model.MaterialInfoParams>{
                materialId: material.materialId,
                isMoreResults: true
            }
        );
        return Promise.resolve();
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {});
    }
}
