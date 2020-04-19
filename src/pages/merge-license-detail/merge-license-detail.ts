import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest } from "../../models/models";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { PrinterProvider } from "../../providers/printer/printer";
@IonicPage()
@Component({
    selector: "page-merge-license-detail",
    templateUrl: "merge-license-detail.html"
})
export class MergeLicenseDetailPage {
    locationText: string;
    materialName: string;
    licenses: Array<Model.MergeLicense> = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private printer: PrinterProvider
    ) {}

    ionViewDidEnter(): void {
        let params = this.navParams.data;
        this.licenses = params.newLicenses;
        this.locationText = params.locationText;
        this.materialName = params.materialName;
        this.userInteraction.hideLoading();
    }

    backButtonAction(): void {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }

    async printLicense(licenseId: number): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            this.userInteraction.showLoading();
            let request: DataRequest.GetLicensePrintFormat = DataRequest.Factory.createGetLicensePrintFormatRequest(
                licenseId,
                0,
                this.settings.userCredentials
            );
            let format = await this.printer.getLicensePrintFormat(request);

            await this.printer.printDocument(
                this.settings.printer,
                format.FORMAT
            );

            this.userInteraction.hideLoading();
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    toggleDetails(license: Model.MergeLicense): boolean {
        if (license.showDetails) {
            license.showDetails = false;
            license.icon = "arrow-dropright";
            return false;
        } else {
            license.showDetails = true;
            license.icon = "arrow-dropdown";
            return true;
        }
    }
}
