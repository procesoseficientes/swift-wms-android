import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { ReceptionProvider } from "../../providers/reception/reception";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { LicenseProvider } from "../../providers/license/license";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { PrinterProvider } from "../../providers/printer/printer";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-create-license",
    templateUrl: "create-license.html"
})
export class CreateLicensePage {
    receptionHeader: Model.ReceptionTaskHeader;
    createLicense: DataRequest.CreateLicense;
    receptionRequest: DataRequest.Reception;
    currentSegment: string = "createLicense";
    materials: Array<
        DataResponse.OP_WMS_SP_GET_TASK_DETAIL_FOR_RECEPTION_CONSOLIDATED
    > = [];
    regimenTask: Enums.Regime = Enums.Regime.General;
    showPolicyAndRegime: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private reception: ReceptionProvider,
        private license: LicenseProvider,
        private userInteraction: UserInteractionProvider,
        public settings: UserSettingsProvider,
        public printer: PrinterProvider,
        private configuration: ConfigurationProvider
    ) {
        this.loadReceptionObjects();
    }

    public loadReceptionObjects(): void {
        this.receptionHeader = Model.Factory.createReceptionTaskHeader();
        this.receptionRequest = DataRequest.Factory.createReceptionRequest(
            this.settings.userCredentials
        );
    }

    public async loadReceptionHeader(): Promise<DataResponse.Operation> {
        try {
            let licenseParam: Model.CreateLicenseParam = <Model.CreateLicenseParam>this
                .navParams.data;
            this.receptionRequest.serialNumber = licenseParam.taskId;
            this.receptionRequest.taskAssignedTo = this.settings.login;
            this.receptionRequest.regime = licenseParam.regime == undefined ? Enums.Regime.General : licenseParam.regime;

            this.receptionHeader = await this.reception.getReceptionTaskHeader(
                this.receptionRequest
            );
            this.createLicense = DataRequest.Factory.createCreateLicenseRequest(
                this.receptionHeader.policyCode,
                this.settings.login,
                this.receptionHeader.clientCode,
                this.receptionHeader.regime,
                this.receptionHeader.taskId,
                this.settings.userCredentials
            );
            this.createLicense.regime = this.receptionRequest.regime,
            this.regimenTask = this.receptionRequest.regime;
            return Promise.resolve(Model.Factory.createSuccessOperation());
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
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

    async ionViewDidEnter(): Promise<void> {
        await this.loadReceptionHeader();
        await this.getParameterFiscal();
        this.userInteraction.hideLoading();
    }

    async getParameterFiscal(): Promise<void>{
        try {
            let requestParameter = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.ValidationFiscal,
                Enums.ParameterId.HandlesFiscalStorage,
                this.settings.userCredentials
            );
            let parameter = await this.configuration.getParameter(requestParameter);
            if (parameter && parameter.length && Number(parameter[0].VALUE) === Enums.YesNo.Yes) {
                this.showPolicyAndRegime = true;
            }
            return Promise.resolve();
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound
            );
        }
    }

    public async userWantsToCreateLicense(): Promise<DataResponse.Operation> {
        this.userInteraction.showLoading();
        try {
            let result: DataResponse.Operation = await this.license.createLicense(
                this.createLicense
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                this.navigation.pushPage(
                    Enums.Page.GeneralReception,
                    this.workspace,
                    this.navCtrl,
                    <Model.GeneralReceptionParam>{
                        licenseId: parseInt(result.DbData),
                        taskId: this.receptionHeader.taskId,
                        clientOwner: this.receptionHeader.clientCode,
                        taskSubtype: this.receptionHeader.receptionSubType,
                        actionBack: false,
                        regime: this.regimenTask
                    }
                );
            } else {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
            return Promise.resolve(result);
        } catch (reason) {
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

    public async userWantsToCompleteTask(): Promise<DataResponse.Operation> {
        this.userInteraction.showLoading();
        try {
            this.receptionRequest.transType = Enums.TransType.GeneralReception;
            this.receptionRequest.loginId = this.settings.loginId;
            this.receptionRequest.login = this.settings.login;
            this.receptionRequest.policyCode = this.receptionHeader.policyCode;
            this.receptionRequest.taskId = this.receptionHeader.taskId;
            this.receptionRequest.status = Enums.ReceptionStatus.Completed;
            let result: DataResponse.Operation = await this.reception.completeTask(
                this.receptionRequest
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
        } catch (reason) {
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

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }

    async showDetail(): Promise<void> {
        try {
            await this.userInteraction.showLoading();

            let request = DataRequest.Factory.createGetTaskDetailForReceptionConsolidatedRequest(
                this.receptionHeader.taskId,
                this.settings.userCredentials
            );
            this.materials = await this.reception.getTaskDetailForReceptionConsolidated(
                request
            );
            this.userInteraction.hideLoading();
            return Promise.resolve();
        } catch (ex) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            this.userInteraction.hideLoading();
        }
    }

    async userWantsPrintMaterial(
        material: DataResponse.OP_WMS_SP_GET_TASK_DETAIL_FOR_RECEPTION_CONSOLIDATED
    ): Promise<void> {
        try {
            if (this.settings.printer.address === "") {
                this.userInteraction.hideLoading();
                return;
            }

            await this.userInteraction.showLoading();
            let request: DataRequest.GetMaterialPrintFormat = DataRequest.Factory.createGetMaterialPrintFormat(
                material.MATERIAL_ID,
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
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }
}
