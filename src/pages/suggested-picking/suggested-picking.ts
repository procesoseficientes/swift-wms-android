import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Enums } from "../../enums/enums";

@IonicPage()
@Component({
    selector: "page-suggested-picking",
    templateUrl: "suggested-picking.html"
})
export class SuggestedPickingPage {
    wavePickingId: number = 0;
    materialId: string = "";
    materialName: string = "";
    listLicense: Array<DataResponse.OP_WMS_GET_SUGGESTED_DISPATCH_LICENSE> = [];
    task: Model.Task = Model.Factory.createTask();
    taskHeader: Model.PickingTaskHeader;
    materials: Array<
        DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
    > = [];
    labelId: number;
    licenseDispatchId: number = 0;
    projectId: string = ""

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private picking: PickingProvider,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider
    ) {}

    ionViewDidLoad() {
        let params = <Model.SuggestedPickinggParams>this.navParams.data;
        if(params.materialId){
            this.wavePickingId = params.wavePickingId;
            this.materialId = params.materialId;
            this.materialName = params.materialName;
            this.task = params.task;
            this.taskHeader = params.taskHeader;
            this.materials = params.materials;
            this.labelId = params.labelId;
            this.licenseDispatchId = params.labelDispatchId;
            this.projectId = params.projectId;
            this.loadSuggestedLicenses();
        }
        else{
            this.wavePickingId = params.wavePickingId;
            this.backButtonAction();
        }
        
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            {
                wavePickingId: this.wavePickingId
            },
            1
        );        
    }    

    async loadSuggestedLicenses(): Promise<void> {
        let request: DataRequest.GetSuggestedDispatchLicense = DataRequest.Factory.createGetSuggestedDispatchLicense(
            this.materialId,
            this.wavePickingId,
            this.projectId,
            this.settings.userCredentials
        );
        try {
            this.userInteraction.showLoading();
            let result = await this.picking.getSuggestedDispatchLicense(
                request
            );
            if (result != null && result.length > 0) {
                this.listLicense = result;
            } else {
                this.backButtonAction();
            }
        } catch (error) { console.log(error)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InsertDataBaseError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    async userWantsToProcessSku(license: DataResponse.OP_WMS_GET_SUGGESTED_DISPATCH_LICENSE): Promise<void> {
        try {
            this.task.locationSpotSource = license.LOCATION;
            this.task.licenseIdSource = license.LICENCE_ID;
            this.task.quantityPending = (this.taskHeader.qty > license.QTY)?license.QTY : this.taskHeader.qty;            

            let resultActualizaStatus = await this.completeTask(this.task);
            if (
                resultActualizaStatus.Resultado ===
                Enums.OperationResult.Success
            ) {
                this.userInteraction.hideLoading();
                this.navigation.pushPage(
                    Enums.Page.ProcessGeneralPicking,
                    this.workspace,
                    this.navCtrl,
                    <Model.ProcessGeneralPickingParams>{
                        task: this.task,
                        taskHeader: this.taskHeader,
                        labelId: this.labelId,
                        materials: this.materials,
                        processSku: null,
                        labelDispatchId: this.licenseDispatchId
                    }
                );
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    resultActualizaStatus.Codigo &&
                    resultActualizaStatus.Codigo > 0
                        ? resultActualizaStatus.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
            }
        } catch (error) { console.log(error)
            this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async completeTask(task: Model.Task): Promise<DataResponse.Operation> {
        return this.picking.completeTask(task, this.settings.loginId);
    }
}
