import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import * as _ from "lodash";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../../providers/translate/translate";
import { PrinterProvider } from "../../providers/printer/printer";

@IonicPage()
@Component({
    selector: "page-general-replenishment",
    templateUrl: "general-replenishment.html"
})
export class GeneralReplenishmentPage {
    currentSegmentReplenishment: string = "pendingToWork";

    wavePickingId: number = 0;
    licenseDispatchId: number = 0;

    materialsToReplenish: Array<
        DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
    > = [];
    headersToReplenish: Array<Model.PickingTaskHeader> = [];
    taskGroupedByMaterialToReplenish: Array<Model.PickingTaskHeader> = [];
    locationTargetToReplenish: string = "";

    constructor(
        public workspace: WorkspacePage,
        private picking: PickingProvider,
        private userInteraction: UserInteractionProvider,
        private translate: TranslateProvider,
        private settings: UserSettingsProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        private printer: PrinterProvider
    ) {}

    async ionViewDidEnter(): Promise<void> {
        try {
            this.wavePickingId = this.navParams.data.wavePickingId;
            this.headersToReplenish = await this.getWavePickingHeadersReplenish();
            this.materialsToReplenish = await this.getPickingMaterialsReplenish();
            let licensesDispatch = await this.getLicenseDispatchReplenish();
            if (licensesDispatch.length !== 0) {
                this.licenseDispatchId = licensesDispatch[0].LICENSE_ID;
            }
            if (this.headersToReplenish.length === 0) {
                return this.verifyLicensesDispatchPendingToLocateReplenish();
            }
            this.userInteraction.hideLoading();
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    async verifyLicensesDispatchPendingToLocateReplenish(): Promise<void> {
        let result = await this.allLicensesDispatchHasAlocated();
        if (result) {
            return this.backButtonAction();
        } else {
            return this.locateLicenseDispatchReplenish(true);
        }
    }

    async allLicensesDispatchHasAlocated(): Promise<boolean> {
        let request: DataRequest.GetTargetLocationByLicenseDispatch = DataRequest.Factory.createGetTargetLocationByLicenseDispatch(
            this.wavePickingId,
            this.settings.userCredentials
        );
        let result = await this.picking.getTargetLocationByLicenseDispatch(
            request
        );
        if (result != null && result.length == 0) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }

    showDetailReplenish(materialId?: string): void {
        if (materialId) {
            this.taskGroupedByMaterialToReplenish = [];
            let materialHeader = _.find(
                this.headersToReplenish,
                (header: Model.PickingTaskHeader) => {
                    return header.Material.materialId === materialId;
                }
            );
            materialHeader.showDetails = true;
            materialHeader.Tasks = _.orderBy(
                materialHeader.Tasks,
                "locationSpotSource",
                "asc"
            );
            this.taskGroupedByMaterialToReplenish.push(materialHeader);
            this.currentSegmentReplenishment = "pickingDetail";
        } else {
            this.taskGroupedByMaterialToReplenish = this.headersToReplenish;
        }
        this.locationTargetToReplenish = this.taskGroupedByMaterialToReplenish[0].Tasks[0].locationSpotTarget;
    }

    async printMaterialReplenish(materialId: string): Promise<void> {
        this.userInteraction.toast(materialId, Enums.ToastTime.Short);
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
            }

            await this.userInteraction.showLoading();
            let request: DataRequest.GetMaterialPrintFormat = DataRequest.Factory.createGetMaterialPrintFormat(
                materialId,
                this.settings.userCredentials
            );

            request.barcodeId = null;
            request.login = this.settings.login;
            let result = await this.printer.getMaterialPrintFormat(request);

            await this.printer.printDocument(
                this.settings.printer,
                result.FORMAT
            );

            this.userInteraction.hideLoading();
        } catch (e) { console.log(e)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }

    async confirmFinishWithDifferencesReplenish(materialId: string): Promise<void> {
        let confirmMessage = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Alerts,
            Enums.Translation.Alert.FinishWithDifferences
        );
        let result = await this.userInteraction.showConfirmMessage(
            confirmMessage
        );
        if (result === Enums.YesNo.Yes) {
            return this.finishReplenishWithDifferences(materialId);
        }
    }

    private async finishReplenishWithDifferences(materialId: string): Promise<void> {
        try {
            let material = _.find(
                this.headersToReplenish,
                (pickingHeader: Model.PickingTaskHeader) => {
                    return pickingHeader.Material.materialId === materialId;
                }
            );
            let request: DataRequest.CancelPickingDetailLine = DataRequest.Factory.createCancelPickingDetailLineRequest(
                this.wavePickingId,
                material.Material.materialId,
                this.settings.userCredentials
            );

            let result = await this.picking.cancelPickingDetailLine(request);
            if (result.Resultado === Enums.OperationResult.Success) {
                this.headersToReplenish = await this.getWavePickingHeadersReplenish();
                if (this.headersToReplenish.length === 0) {
                    return this.verifyLicensesDispatchPendingToLocateReplenish();
                }
            } else {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (reason) { console.log(reason)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    private getWavePickingHeadersReplenish(): Promise<Array<Model.PickingTaskHeader>> {
        let tasks: DataRequest.GetTaskList = DataRequest.Factory.createGetTaskListRequest(
            this.wavePickingId,
            this.settings.userCredentials
        );
        return this.picking.getPickingHeaders(tasks);
    }

    private getPickingMaterialsReplenish(): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
        >
    > {
        let request: DataRequest.GetPickingMaterialsWithMeasurementUnit = DataRequest.Factory.createGetPickingMaterialsWithMeasurementUnitRequest(
            this.wavePickingId,
            this.settings.userCredentials
        );
        return this.picking.getPickingMaterialsWithMeasurementUnit(request);
    }

    toggleDetailsReplenish(material: Model.PickingTaskHeader): void {
        if (material.showDetails) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
        } else {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
        }
    }

    async userWantsToProcessSkuReplenish(
        task: Model.Task,
        header: Model.PickingTaskHeader
    ): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let result = await this.completeTaskReplehish(task);
            if (result.Resultado === Enums.OperationResult.Success) {
                this.licenseDispatchId = parseInt(result.DbData);
                this.userInteraction.hideLoading();
                this.navigation.pushPage(
                    Enums.Page.ProcessGeneralReplenishment,
                    this.workspace,
                    this.navCtrl,
                    <Model.ProcessGeneralReplenishmentParams>{
                        task: task,
                        taskHeader: header,
                        labelId: Number(result.DbData),
                        materials: this.materialsToReplenish,
                        processSku: null,
                        labelDispatchId: this.licenseDispatchId
                    }
                );
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
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

    async completeTaskReplehish(
        task: Model.Task
    ): Promise<DataResponse.Operation> {
        return this.picking.completeTask(task, this.settings.loginId);
    }

    private getLicenseDispatchReplenish(): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_LAST_DISPATCH_LICENSE_GENERATED_BY_WAVE_PICKING
        >
    > {
        let pickingDispatch: DataRequest.GetLastDispatchLicenseGeneratedByWavePicking = DataRequest.Factory.createGetLastDispatchLicenseGeneratedByWavePicking(
            this.wavePickingId,
            this.settings.userCredentials
        );

        return this.picking.getLastDispatchLicenseGeneratedByWavePicking(
            pickingDispatch
        );
    }

    async locateLicenseDispatchReplenish(isPickingComplete: boolean): Promise<void> {
        try {
            this.userInteraction.hideLoading();
            this.navigation.pushPage(
                Enums.Page.LocateReplenishment,
                this.workspace,
                this.navCtrl,
                <Model.LocateGeneralReplenishmentParams>{
                    wavePickingId: this.wavePickingId,
                    locations: [],
                    isPickingTaskComplete: isPickingComplete
                }
            );
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }
}
