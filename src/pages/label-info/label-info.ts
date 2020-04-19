import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest } from "../../models/models";
import { Enums } from "../../enums/enums";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LabelProvider } from "../../providers/label/label";
import { PrinterProvider } from "../../providers/printer/printer";

@IonicPage()
@Component({
    selector: "page-label-info",
    templateUrl: "label-info.html"
})
export class LabelInfoPage {
    labelId: number = 0;
    labelInfo: Model.LabelInfo;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public workspace: WorkspacePage,
        public navigation: NavigationProvider,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private labelProvider: LabelProvider,
        private printer: PrinterProvider
    ) {
        this.labelInfo = Model.Factory.createLabelInfo();
    }

    async ionViewDidEnter(): Promise<void> {
        this.loadLabelInfo();
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            lastOption: Enums.InfoCenterOption.Label
        });
    }

    async loadLabelInfo(): Promise<void> {
        try {
            this.labelId = (this.navParams
                .data as Model.LabelInfoParams).labelId;

            let labelInfoRequest = DataRequest.Factory.createGetLabelInfoRequest(
                this.labelId,
                this.settings.userCredentials
            );

            this.labelInfo = await this.labelProvider.getLabelInfo(
                labelInfoRequest
            );

            if (!this.labelInfo.targetLocation) {
                this.labelInfo.targetLocation = this.labelInfo.sourceLocation;
            }

            if (!this.labelInfo.clientName) {
                this.labelInfo.clientName = this.labelInfo.clientCode;
            }

            return this.userInteraction.hideLoading();
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                this.labelId.toString()
            );
            return this.navigation.popPage(this.workspace, this.navCtrl, {
                lastOption: Enums.InfoCenterOption.Label
            });
        }
    }

    public relocateLabel(): Promise<void> {
        return this.navigation.pushPage(
            Enums.Page.RelocateFullLicense,
            this.workspace,
            this.navCtrl,
            <Model.RelocateFullLicenseParams>{
                labelId: Number(this.labelId)
            }
        );
    }

    public async printLabel(): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            let request: DataRequest.GetLabelPrintFormat = DataRequest.Factory.createGetLabelPrintFormatRequest(
                this.labelId,
                this.settings.userCredentials
            );

            let format = await this.printer.getLabelPrintFormat(request);

            await this.printer.printDocument(
                this.settings.printer,
                format.FORMAT
            );
        } catch (e) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }
}
