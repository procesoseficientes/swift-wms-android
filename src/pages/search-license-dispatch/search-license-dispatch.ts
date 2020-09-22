import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { Enums } from "../../enums/enums";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { DataResponse, DataRequest, Model } from "../../models/models";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";

@IonicPage()
@Component({
    selector: "page-search-license-dispatch",
    templateUrl: "search-license-dispatch.html"
})
export class SearchLicenseDispatchPage {
    scanToken: Subscription;
    inputSearch: string;
    scanData: string;
    isAndroid: boolean = false;
    selectedOption: Enums.TypeFilterLicenseDispatch = Enums
        .TypeFilterLicenseDispatch.DispatchLicense;
    listWavePickingPending: Array<
        DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_DISPATCH
    > = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private device: DeviceProvider,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private picking: PickingProvider,
        private settings: UserSettingsProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    async ionViewDidEnter(): Promise<void> {
        this.isAndroid = this.device.isAndroid();

        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );
        this.selectedOption = Enums.TypeFilterLicenseDispatch.DispatchLicense;
        this.userInteraction.hideLoading();
        this.listWavePickingPending = await this.getWavePickingPending();
    }

    public keyPressSerie(key: number): void {
        if (key === Enums.KeyCode.Enter) {
            if (!this.inputSearch && this.inputSearch == "") return;
            this.showPage();
        }
    }

    private async showPage(): Promise<void> {
        await this.userInteraction.showLoading();
        let licenses = await this.getWavePickingForLicenseDispatch();
        if (licenses.length > 0) {
            this.navigation.pushPage(
                Enums.Page.WavePickingDispatchConfirm,
                this.workspace,
                this.navCtrl,
                <Model.WavePickingLicenseDispatchParams>{
                    wavePickingForLicenseDispatch: licenses[0],
                    backPage: false
                }
            );
            await this.userInteraction.hideLoading();
        } else {
            await this.userInteraction.hideLoading();
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

    backButtonAction(): Promise<any> {
        return this.navigation.popPage(this.workspace, this.navCtrl);
    }

    private getWavePickingForLicenseDispatch(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH>
    > {
        let licenseCode = this.inputSearch.split("-");
        let numberCode =
            licenseCode.length > 0
                ? Number(licenseCode[0])
                : Number(this.inputSearch);
        let request: DataRequest.GetWavePickingForLicenseDispatch = DataRequest.Factory.createGetWavePickingForLicenseDispatchRequest(
            numberCode,
            this.selectedOption,
            this.settings.userCredentials
        );
        return this.picking.getWavePickingForLicenseDispatch(request);
    }

    private async getWavePickingPending(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_DISPATCH>
    > {
        await this.userInteraction.showLoading();
        try {
            let request: DataRequest.GetWavePickingPendingToDispatch = DataRequest.Factory.createGetWavePickingPendingToDispatchRequest(
                0,
                this.settings.userCredentials
            );

            return this.picking.getWavePickingPendingToDispatch(request);
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            await this.userInteraction.hideLoading();
        }
        await this.userInteraction.hideLoading();
    }

    getColorOfPriority(priority: number): Enums.PriorityCircles {
        switch (priority) {
            case Enums.TaskPriority.Low:
                return Enums.PriorityCircles.Low;
            case Enums.TaskPriority.Medium:
                return Enums.PriorityCircles.Medium;
            case Enums.TaskPriority.High:
                return Enums.PriorityCircles.High;
            default:
                return Enums.PriorityCircles.Low;
        }
    }

    async doRefresh(refresher: any): Promise<void> {
        this.listWavePickingPending = await this.getWavePickingPending();
        if (refresher) refresher.complete();
    }

    async showDispatchLicense(wavePicking: number) {
        try {  
            await this.userInteraction.showLoading();          
            let request: DataRequest.GetWavePickingForLicenseDispatch = DataRequest.Factory.createGetWavePickingForLicenseDispatchRequest(
                wavePicking,
                Enums.TypeFilterLicenseDispatch.WavePickingId,
                this.settings.userCredentials
            );
            let licenses = await this.picking.getWavePickingForLicenseDispatch(request);
            
            if (licenses.length > 0) {
                this.navigation.pushPage(
                    Enums.Page.WavePickingDispatchConfirm,
                    this.workspace,
                    this.navCtrl,
                    <Model.WavePickingLicenseDispatchParams>{
                        wavePickingForLicenseDispatch: licenses[0],
                        backPage: false
                    }
                );
                await this.userInteraction.hideLoading();
            } else {
                await this.userInteraction.hideLoading();
            }

        } catch (e) { console.log(e)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }
}
