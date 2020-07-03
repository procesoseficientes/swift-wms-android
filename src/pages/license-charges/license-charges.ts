import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { Enums } from "../../enums/enums";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Model, DataRequest } from "../../models/models";
import { ChargeProvider } from "../../providers/charge/charge";
@IonicPage()
@Component({
    selector: "page-license-charges",
    templateUrl: "license-charges.html"
})
export class LicenseChargesPage {
    charges: Array<Model.Charge> = [];
    licenseId: number = 0;
    isLoaded: boolean = true;
    taskId: number = 0;
    wavePickingId: number = 0;
    transType: Enums.TransType;
    times: number;
    regimeTask: Enums.Regime = Enums.Regime.General;
    task: Model.Task;
    isGeneralTransfer: boolean = false;
    reqRegisterGenTransReception: DataRequest.RegisterGeneralTransferReception;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userInteraction: UserInteractionProvider,
        public workspace: WorkspacePage,
        public navigation: NavigationProvider,
        private chargeProvider: ChargeProvider,
        private settings: UserSettingsProvider
    ) {}

    ionViewDidEnter() {
        let params = <Model.LicenseChargesParam>this.navParams.data;
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
        this.isGeneralTransfer = this.task ? this.task.taskSubtype === Enums.TaskSubType.GeneralTransfer : false;
    }

    validateInputNumber(index: number) {
        if (
            isNaN(this.charges[index].qty) ||
            this.charges[index].qty.toString() === ""
        ) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InvalidInput,
                this.charges[index].qty.toString()
            );
            this.charges[index].qty = 0;
            return;
        }
    }

    public async saveChargesInLicense(): Promise<Model.Operation> {
        try {
            this.userInteraction.showLoading();

            this.charges.forEach((charge: Model.Charge) => {
                charge.licenseId = this.licenseId;
                charge.transType = this.transType;
            });

            let result = await this.chargeProvider.updateCharges(
                this.charges,
                this.settings.userCredentials
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                if (
                    this.transType ===
                    (Enums.TransType.GeneralReception ||
                        Enums.TransType.FiscalReception)
                ) {
                    if (this.isGeneralTransfer) {
                        this.navigation.popPage(
                            this.workspace,
                            this.navCtrl,
                            <Model.GeneralPickingParam>{
                                wavePickingId: this.wavePickingId,
                                regime: this.regimeTask,
                                task: this.task
                            },
                            this.times + 1
                        );
                    } else {
                        this.navigation.popPage(
                            this.workspace,
                            this.navCtrl,
                            <Model.CreateLicenseParam>{
                                taskId: this.taskId,
                                regime: this.regimeTask,
                                wavePickingId: this.wavePickingId,
                                task: this.task
                            },
                            this.times + 1
                        );
                    }
                } else if (
                    this.transType === Enums.TransType.PartialRelocation
                ) {
                    this.navigation.popPage(
                        this.workspace,
                        this.navCtrl,
                        <Model.LicenseInfoParams>{
                            licenseId: this.licenseId,
                            regime: this.regimeTask,
                            wavePickingId: this.wavePickingId,
                            task: this.task
                        },
                        this.times + 1
                    );
                } else if (
                    this.transType ===
                    (Enums.TransType.Picking || Enums.TransType.FiscalPicking)
                ) {
                    if (
                        this.task.taskSubtype ===
                        Enums.TaskSubType.GeneralTransfer
                    ) {
                        this.navigation.popPage(
                            this.workspace,
                            this.navCtrl,
                            <Model.GeneralPickingParam>{
                                wavePickingId: this.wavePickingId,
                                regime: this.regimeTask,
                                task: this.task
                            },
                            this.times + 1
                        );
                    } else {
                        this.navigation.popPage(
                            this.workspace,
                            this.navCtrl,
                            <Model.GeneralPickingParam>{
                                wavePickingId: this.wavePickingId,
                                regime: this.regimeTask,
                                task: this.task
                            },
                            this.times + 1
                        );
                    }
                }
            } else {
                let code: Enums.CustomErrorCodes =
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.InvalidInput;
                this.userInteraction.showCustomError(code);
            }
            return Promise.resolve(result);
        } catch (error) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            let operation = Model.Factory.createFaultOperation({
                code: Enums.CustomErrorCodes.UnknownError,
                message: error
            });
            return Promise.resolve(operation);
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    backButtonAction(): void {}
}
