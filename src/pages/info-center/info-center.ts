import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { Enums } from "../../enums/enums";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model } from "../../models/models";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { TranslateProvider } from "../../providers/translate/translate";

@IonicPage()
@Component({
    selector: "page-info-center",
    templateUrl: "info-center.html"
})
export class InfoCenterPage {
    scanToken: Subscription;
    inputSearch: string;
    scanData: string;
    selectedOption: Enums.InfoCenterOption = Enums.InfoCenterOption.Sku;
    isAndroid: boolean = true;
    placeholder: string = "";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private device: DeviceProvider,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private translate: TranslateProvider
    ) {}

    async ionViewDidLoad() {
        this.isAndroid = true;// this.device.isAndroid();
        let traduction = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Labels,
            "Enter-Value_"
        );
        this.placeholder = traduction;
    }

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter(): void {
        this.workspace.infoCenterNavCtrl = this.navCtrl;

        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );

        let params = this.navParams.data;
        this.selectedOption = params.lastOption
            ? params.lastOption
            : Enums.InfoCenterOption.Sku;
    }

    public keyPressSerie(key: number): void {
        if (key === Enums.KeyCode.Enter) {
            if (!this.inputSearch && this.inputSearch == "") return;
            this.showPage();
        }
    }

    private async showPage(): Promise<void> {
        await this.userInteraction.showLoading();
        try {
            switch (this.selectedOption) {
                case Enums.InfoCenterOption.Sku:
                    return this.navigation.pushPage(
                        Enums.Page.ResultOfMaterialSearch,
                        this.workspace,
                        this.navCtrl,
                        <Model.MaterialInfoParams>{
                            materialId: this.inputSearch,
                            isMoreResults: false
                        }
                    );
                case Enums.InfoCenterOption.License:
                    return this.navigation.pushPage(
                        Enums.Page.LicenseInfo,
                        this.workspace,
                        this.navCtrl,
                        <Model.LicenseInfoParams>{
                            licenseId: Number(this.inputSearch.split("-")[0])
                        }
                    );
                case Enums.InfoCenterOption.Location:
                    return this.navigation.pushPage(
                        Enums.Page.LocationInfo,
                        this.workspace,
                        this.navCtrl,
                        <Model.LocationInfoParams>{
                            locationId: this.inputSearch
                        }
                    );
                case Enums.InfoCenterOption.Label:
                    return this.navigation.pushPage(
                        Enums.Page.LabelInfo,
                        this.workspace,
                        this.navCtrl,
                        <Model.LabelInfoParams>{
                            labelId: Number(this.inputSearch)
                        }
                    );
                default:
                    this.userInteraction.hideLoading();
                    break;
            }
        } catch (error) {
            this.userInteraction.hideLoading();
        }
    }

    processBarcodeScan(scanData: string): Promise<boolean> {
        this.scanData = scanData;
        this.inputSearch = scanData;
        this.showPage();
        return Promise.resolve(true);
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }
}
