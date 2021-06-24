import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavParams, NavController, Platform} from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import * as _ from "lodash";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../../providers/translate/translate";
import { LabelProvider } from "../../providers/label/label";
import { PrinterProvider } from "../../providers/printer/printer";
import { ReceptionProvider } from "../../providers/reception/reception";

@IonicPage()
@Component({
    selector: "page-general-picking",
    templateUrl: "general-picking.html"
})
export class GeneralPickingPage {
    @ViewChild("itemGroup") item: any;
    currentSegment: string = "pendingToWork";

   
    wavePickingId: number = 0;
    licenseDispatchId: number = 0;
    projectId: string = "";
    projectCode: string = "";
    projectName: string = "";
    projectShortName: string = "";

    materials: Array<
        DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
    > = [];
    headers: Array<Model.PickingTaskHeader> = [];
    taskGroupedByMaterial: Array<Model.PickingTaskHeader> = [];
    locationTarget: string = "";
    regimenTask: Enums.Regime = Enums.Regime.General;
    finishPicking: Boolean = false;
    task: Model.Task;
    isGeneralTransfer: Boolean = false;
    reqRegisterGenTransReception: DataRequest.RegisterGeneralTransferReception;
    backbutton: any;
    showBackButton: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private picking: PickingProvider,
        private reception: ReceptionProvider,
        private userInteraction: UserInteractionProvider,
        private translate: TranslateProvider,
        private settings: UserSettingsProvider,
        private label: LabelProvider,
        private printer: PrinterProvider, // private generalTransfer: GeneralTransferProvider
        private platform: Platform
    ) {
        if(!this.workspace.tabsEnabled){
            this.platform.registerBackButtonAction( async () =>{
                let message = await this.translate.translateGroupValue(
                    Enums.Translation.Groups.Messages,
                    Enums.Translation.Message.CompleteTask
                );
                this.userInteraction.showMessage(message);
            })
        }
        if(localStorage.getItem("userRole") != '1'){
            this.showBackButton = false;
        }
    }

    ionViewWillLeave() {
        if (this.showBackButton = false){
            this.platform.backButton.observers.push(this.backbutton);
        }
      }

    async ionViewDidEnter(): Promise<void> {
        if (localStorage.getItem("userRole") != '1'){
            this.backbutton = this.platform.backButton.observers.pop();
            this.workspace.enableTabs(false);
        }
        try {
            this.wavePickingId = this.navParams.data.wavePickingId;
            this.regimenTask = this.navParams.data.regime;
            this.headers = await this.getWavePickingHeaders();
            //this.task = null;
            this.task = this.navParams.data.task || null;

            this.isGeneralTransfer = !!this.task;
            this.reqRegisterGenTransReception =
                this.navParams.data.reqRegisterGenTransReception || null;

            for (let header of this.headers) {
                var completeTask = 0;
                for (let complete of header.Tasks) {
                    if (complete.isCompleted == 1) {
                        completeTask += 1;
                    }
                }

                if (header.Tasks.length == completeTask) {
                    header.isComplete = true;
                }
            }
            if (
                this.headers &&
                this.headers.length > 0 &&
                this.headers[0].Tasks &&
                this.headers[0].Tasks.length > 0
            ) {
                let task: Model.Task = this.headers[0].Tasks[0];
                this.projectId = task.projectId;
                this.projectCode = task.projectCode;
                this.projectName = task.projectName;
                this.projectShortName = task.projectShortName;
                this.task = task;
                this.isGeneralTransfer =
                    this.task.taskSubtype === Enums.TaskSubType.GeneralTransfer;
            }
            var countTaskComplete = 0;
            for (let task of this.headers) {
                if (task.isComplete == true) {
                    countTaskComplete += 1;
                }
            }
            if (this.headers.length === countTaskComplete) {
                return this.verifyLicensesDispatchPendingToLocate();
            }

            this.materials = await this.getPickingMaterials();
            let licensesDispatch = await this.getLicenseDispatch();
            if (licensesDispatch.length !== 0) {
                this.licenseDispatchId = licensesDispatch[0].LICENSE_ID;
            }
            if (
                this.headers &&
                !this.headers.find(header => {
                    return header.qtyPending > 0;
                })
            ) {
                return this.verifyLicensesDispatchPendingToLocate();
            }
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteraction.hideLoading();
        }

        this.openAllSlides();
    }

    async verifyLicensesDispatchPendingToLocate(): Promise<void> {
        let result = await this.allLicensesDispatchHasAlocated();
        if (result) {
            if (
                this.task.taskSubtype !== Enums.TaskSubType.GeneralTransfer ||
                (!this.taskGroupedByMaterial.find(
                    detail => detail.Tasks.length > 0
                ) &&
                    this.task.taskSubtype === Enums.TaskSubType.GeneralTransfer)
            ) {
                this.completeTask(this.task, Enums.YesNo.Yes);
                return this.backButtonAction();
            }
        } else {
            return this.locateLicenseDispatch(true);
        }
    }

    async allLicensesDispatchHasAlocated(): Promise<boolean> {
        let request: DataRequest.GetLicenseDispatchByWavePicking = DataRequest.Factory.createGetLicenseDispatchByWavePicking(
            this.wavePickingId,
            this.settings.userCredentials
        );
        let result = await this.picking.getLicenseDispatchByWavePicking(
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
    openAllSlides(){
      let a = Array.prototype.slice.call(this.item.nativeElement.children)
      a.map(val => {
        val.classList.add("active-sliding");
        val.classList.add("active-slide");
        val.classList.add("active-options-right");
        val.children[0].style.transform = `translate3d(-${2*55}px, 0px, 0px)`
      });
  }

  openSlide(itemSlide: any, item: any) {
        itemSlide.classList.add("active-sliding");
        itemSlide.classList.add("active-slide");
        itemSlide.classList.add("active-options-right");
        item.style.transform = `translate3d(-${2*55}px, 0px, 0px)`
      }

    showDetail(materialId?: string): void {
        if (materialId) {
            this.taskGroupedByMaterial = [];
            let materialHeader = _.find(
                this.headers,
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
            this.taskGroupedByMaterial.push(materialHeader);
            this.currentSegment = "pickingDetail";
        } else {
            this.taskGroupedByMaterial = this.headers;
        }
        this.taskGroupedByMaterial.map((task: Model.PickingTaskHeader) => {
            let qty: number = 0;
            task.Tasks.map((taskTemp: Model.Task) => {
                if (taskTemp.materialId === taskTemp.Material.materialId) {
                    qty = qty + taskTemp.quantityPending;
                }
            });
            task.qty = qty;
        });

        try {
            this.locationTarget = this.taskGroupedByMaterial[0].Tasks[0].locationSpotTarget;       
        } catch (error) { console.log(error)
            this.locationTarget = ''
            this.userInteraction.showError(error)
        }
    }

    async printMaterial(materialId: string): Promise<void> {
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

    async confirmFinishWithDifferences(materialId: string): Promise<void> {
        let confirmMessage = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Alerts,
            Enums.Translation.Alert.FinishWithDifferences
        );
        let result = await this.userInteraction.showConfirmMessage(
            confirmMessage
        );

        console.log(result)
        if (result === Enums.YesNo.Yes) {
            this.finishWithDifferences(materialId);
        }
    }

    private async finishWithDifferences(materialId: string): Promise<void> {
        try {
            let material = _.find(
                this.headers,
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

            console.log(result)
            if (result.Resultado === Enums.OperationResult.Success) {
                this.headers = await this.getWavePickingHeaders();
                console.log(this.headers)
                if (
                    this.headers &&
                    !this.headers.find(header => {
                        return header.qtyPending > 0;
                    })
                ) {
                    console.log(2)
                    return this.verifyLicensesDispatchPendingToLocate();
                }
                for (let header of this.headers) {
                    var completeTask = 0;
                    for (let complete of header.Tasks) {
                        if (complete.isCompleted == 1) {
                            completeTask += 1;
                        }
                    }

                    if (header.Tasks.length == completeTask) {
                        header.isComplete = true;
                    }
                }

                var countTaskComplete = 0;
                for (let task of this.headers) {
                    if (task.isComplete == true) {
                        countTaskComplete += 1;
                    }
                }
                if (this.headers.length === countTaskComplete) {
                    return this.verifyLicensesDispatchPendingToLocate();
                }
            } else {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (reason) {
            alert('AQUI')
            console.log(reason)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    private getWavePickingHeaders(): Promise<Array<Model.PickingTaskHeader>> {
        let tasks: DataRequest.GetTaskList = DataRequest.Factory.createGetTaskListRequest(
            this.wavePickingId,
            this.settings.userCredentials
        );
        return this.picking.getPickingHeaders(tasks);
    }

    private getPickingMaterials(): Promise<
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

    toggleDetails(material: Model.PickingTaskHeader): void {
        if (material.showDetails) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
        } else {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
        }
    }

    async userWantsToProcessSku(
        task: Model.Task,
        header: Model.PickingTaskHeader
    ): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let request: DataRequest.InsertPickingLabels = DataRequest.Factory.createInsertPickingLabelsRequest(
                task.wavePickingId,
                task.clientOwner,
                this.settings.userCredentials
            );

            let result = await this.label.insertPickingLabel(request);
            if (result.Resultado === Enums.OperationResult.Success) {
                let resultActualizaStatus = await this.completeTask(task);
                if (
                    resultActualizaStatus.Resultado ===
                    Enums.OperationResult.Success
                ) {
                    this.licenseDispatchId = parseInt(
                        resultActualizaStatus.DbData
                    );
                    this.userInteraction.hideLoading();
                    this.navigation.pushPage(
                        Enums.Page.ProcessGeneralPicking,
                        this.workspace,
                        this.navCtrl,
                        <Model.ProcessGeneralPickingParams>{
                            task: task,
                            taskHeader: header,
                            labelId: Number(result.DbData),
                            materials: this.materials,
                            processSku: null,
                            labelDispatchId: this.licenseDispatchId,
                            regime: this.regimenTask,
                            isGeneralTransfer: this.isGeneralTransfer,
                            wavePickingId: this.wavePickingId
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

    async completeTask(
        task: Model.Task,
        closeTask?: Enums.YesNo
    ): Promise<DataResponse.Operation> {
        return this.picking.completeTask(
            task,
            this.settings.loginId,
            closeTask
        );
    }

    private getLicenseDispatch(): Promise<
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

    async insertLicenseDispatch(): Promise<void> {
        let insertLicenseDispatchRequest: DataRequest.InsertLicenseDispatch = DataRequest.Factory.createInsertLicenseDispatch(
            this.wavePickingId,
            this.settings.userCredentials
        );
        let result: DataResponse.Operation = await this.picking.insertLicenseDispatch(
            insertLicenseDispatchRequest
        );
        if (result.Resultado === Enums.OperationResult.Success) {
            this.licenseDispatchId = parseInt(result.DbData);
        } else {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                result.Codigo && result.Codigo > 0
                    ? result.Codigo
                    : Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async printLicenseDispatch(): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            let request: DataRequest.GetLicenseDispatchPrintFormat = DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(
                this.licenseDispatchId,
                this.settings.userCredentials
            );

            let format = await this.printer.getLicenseDispatchPrintFormat(
                request
            );

            await this.printer.printDocument(
                this.settings.printer,
                format.FORMAT
            );
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async locateLicenseDispatch(isPickingComplete: boolean): Promise<void> {
        try {
            this.reqRegisterGenTransReception = DataRequest.Factory.createRegisterGeneralTransferReceptionRequest(
                this.task,
                0,
                this.settings.userCredentials,
                this.licenseDispatchId,
                this.headers[0].Material.materialId,
                ""
            );
            this.userInteraction.hideLoading();
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            console.error(e)
        }
        this.navigation.pushPage(
            Enums.Page.LocateLicenseDispatch,
            this.workspace,
            this.navCtrl,
            <Model.LocateGeneralPickingParams>{
                wavePickingId: this.wavePickingId,
                locations: [],
                isPickingTaskComplete: isPickingComplete,
                regime: this.regimenTask,
                isGeneralTransfer: this.isGeneralTransfer,
                task: this.task,
                reqRegisterGenTransReception: this
                    .reqRegisterGenTransReception
            }
        );
    }

    async suggestedPicking(
        task: Model.Task,
        header: Model.PickingTaskHeader
    ): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let request: DataRequest.InsertPickingLabels = DataRequest.Factory.createInsertPickingLabelsRequest(
                task.wavePickingId,
                task.clientOwner,
                this.settings.userCredentials
            );

            let result = await this.label.insertPickingLabel(request);
            if (result.Resultado === Enums.OperationResult.Success) {
                let resultActualizaStatus = await this.completeTask(task);
                if (
                    resultActualizaStatus.Resultado ===
                    Enums.OperationResult.Success
                ) {
                    this.licenseDispatchId = parseInt(
                        resultActualizaStatus.DbData
                    );

                    this.navigation.pushPage(
                        Enums.Page.SuggestedPickingPage,
                        this.workspace,
                        this.navCtrl,
                        <Model.SuggestedPickinggParams>{
                            wavePickingId: this.wavePickingId,
                            task: task,
                            taskHeader: header,
                            materialId: header.Material.materialId,
                            materialName: header.Material.materialName,
                            materials: this.materials,
                            labelDispatchId: this.licenseDispatchId,
                            labelId: Number(result.DbData),
                            projectId: this.projectId,
                            regime: this.regimenTask
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
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
            }
            this.userInteraction.hideLoading();
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    public async userWantsToCompleteTask(): Promise<DataResponse.Operation> {
        this.userInteraction.showLoading();
        try {
            if (this.licenseDispatchId) {
                let resultRollBackLicense: DataResponse.Operation = null;
                resultRollBackLicense = await this.rollbackLicense();
                if (
                    resultRollBackLicense.Resultado !==
                    Enums.OperationResult.Success
                ) {
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.DataBaseError
                    );
                    return Promise.resolve(resultRollBackLicense);
                }
            }
            let result: DataResponse.Operation = await this.completeTask(
                this.task,
                Enums.YesNo.Yes
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                this.navigation.popPage(this.workspace, this.navCtrl);
            } else {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
            this.userInteraction.hideLoading();
            return Promise.resolve(result);
        } catch (reason) { console.log(reason)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            this.userInteraction.hideLoading();
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        reason,
                        Enums.CustomErrorCodes.DataBaseError
                    )
                )
            );
        }
    }

    rollbackLicense(): Promise<DataResponse.Operation> {
        let license: DataRequest.RollBackLicense = DataRequest.Factory.createRollBackLicenseRequest(
            this.licenseDispatchId,
            this.settings.userCredentials
        );
        return this.reception.rollbackLicense(license);
    }
}
