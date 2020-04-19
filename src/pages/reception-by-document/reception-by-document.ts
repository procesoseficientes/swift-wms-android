import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { ReceptionProvider } from "../../providers/reception/reception";
import { DataRequest, Model, DataResponse } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
@IonicPage()
@Component({
    selector: "page-reception-by-document",
    templateUrl: "reception-by-document.html"
})
export class ReceptionByDocumentPage {
    scanToken: Subscription;
    documentNumber: string = "";
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private reception: ReceptionProvider,
        private settings: UserSettingsProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter(): void {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );

        this.userInteraction.hideLoading();
    }

    processBarcodeScan(scanData: string): Promise<void> {
        this.validateDocument(scanData);
        return Promise.resolve();
    }

    goToCreateLicensePage(type: string, taskId: number): void {
        if (type === Enums.DocumentType.TransferRequest) {
            let params: Model.CreateLicenseParam = { taskId: taskId };
            this.workspace.changeCurrentTab(
                Enums.Tab.MyTasks,
                Enums.Page.MyTasks
            );

            this.navigation.pushPage(
                Enums.Page.CreateLicense,
                this.workspace,
                this.workspace.myTaskNavCtrl,
                params
            );
        } else {
            this.workspace.changeCurrentTab(
                Enums.Tab.MyTasks,
                Enums.Page.MyTasks
            );
        }
        this.documentNumber = "";
    }

    async validateDocument(
        documentId: string
    ): Promise<DataResponse.Operation> {
        try {
            await this.userInteraction.showLoading();
            let request = DataRequest.Factory.createValidateScannedDocumentForReceptionRequest(
                documentId,
                this.settings.userCredentials
            );

            let result: DataResponse.Operation = await this.reception.validateScannedDocumentForReception(
                request
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                await this.createReceptionFromDocument(result.Codigo);
                return Promise.resolve(result);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );

                return Promise.resolve(result);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: e
                })
            );
        }
    }

    async createReceptionFromDocument(
        documentId: number
    ): Promise<DataResponse.Operation> {
        try {
            let request = DataRequest.Factory.createGenerateReceptionDocumentFromCargoManifestRequest(
                documentId,
                this.settings.userCredentials
            );

            let result: DataResponse.Operation = await this.reception.generateReceptionDocumentFromCargoManifest(
                request
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                let taskId: number = 0;
                let type: string = result.DbData.split("|")[0];
                if (type === Enums.DocumentType.TransferRequest) {
                    taskId = Number(result.DbData.split("|")[3]);
                }
                this.userInteraction.hideLoading();
                this.goToCreateLicensePage(type, taskId);
                return Promise.resolve(result);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );

                return Promise.resolve(result);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: e
                })
            );
        }
    }

    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    keyPressDocument(keyCode: Enums.KeyCode) {
        if (keyCode === Enums.KeyCode.Enter && this.documentNumber !== "") {
            this.validateDocument(this.documentNumber);
        }
    }
}
