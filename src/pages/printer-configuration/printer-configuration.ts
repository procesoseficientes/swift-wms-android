import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model } from "../../models/models";
import { PrinterProvider } from "../../providers/printer/printer";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import * as _ from "lodash";

@IonicPage()
@Component({
    selector: "page-printer-configuration",
    templateUrl: "printer-configuration.html"
})
export class PrinterConfigurationPage {
    selectedOption: string = "";
    printers: Array<Model.Printer> = [];
    currentPrinter: Model.Printer;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userInteraction: UserInteractionProvider,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private printer: PrinterProvider,
        private settings: UserSettingsProvider
    ) {}

    async ionViewDidEnter(): Promise<void> {
        try {
            this.currentPrinter =
                this.settings.printer || <Model.Printer>{ address: "" };
            this.selectedOption = this.currentPrinter.address;
            this.printers = await this.printer.discoverPrinters();
            if (this.printers) this.setPrinterSelection();

            this.userInteraction.hideLoading();
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }

    async linkPrinter(): Promise<Model.Printer> {
        try {
            if (this.printers.length <= 0) {
                this.userInteraction.hideLoading();
                return;
            }

            await this.userInteraction.showLoading();
            this.currentPrinter =
                _.find(this.printers, (printer: Model.Printer) => {
                    return printer.address === this.selectedOption;
                }) || this.printers[0];

            await this.printer.savePrinter(this.currentPrinter);
            this.setPrinterSelection();

            this.userInteraction.hideLoading();

            return this.currentPrinter;
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }

    async printTest(): Promise<boolean> {
        try {
            if (this.currentPrinter.address === "") {
                this.userInteraction.hideLoading();
                return Promise.resolve(false);
            }

            await this.userInteraction.showLoading();
            let result = await this.printer.printTest(this.currentPrinter);

            this.userInteraction.hideLoading();

            return Promise.resolve(result);
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
            return Promise.resolve(false);
        }
    }

    async refreshPrinters(refresher: any): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            this.printers = await this.printer.discoverPrinters();
            if (refresher) refresher.complete();
            if (this.printers) this.setPrinterSelection();
            this.userInteraction.hideLoading();
        } catch (e) {
            await this.userInteraction.hideLoading();
            if (refresher) refresher.complete();
            this.userInteraction.showCustomError(e);
        }
    }

    private setPrinterSelection(): void {
        this.printers.forEach((printer: Model.Printer) => {
            printer.selected = printer.address === this.currentPrinter.address;
        });
    }
}
