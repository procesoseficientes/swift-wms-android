import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController, Platform } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { Enums } from "../../enums/enums";
import { PhysicalCountProvider } from "../../providers/physical-count/physical-count";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { TranslateProvider } from "../../providers/translate/translate";

@IonicPage()
@Component({
    selector: "page-locations-physical-count",
    templateUrl: "locations-physical-count.html"
})
export class LocationsPhysicalCountPage {
    scanToken: Subscription;
    taskId: string = "";
    isAndroid: boolean = false;
    locations: Array<DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT> = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private settings: UserSettingsProvider,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private physicalCount: PhysicalCountProvider,
        private translate: TranslateProvider,
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
        this.workspace.enableTabs(false);

    }
    
    async ionViewDidEnter(): Promise<void> {
        try {
            
            let params = this.navParams.data;
            this.taskId = params.taskId;

            this.locations = await this.getLocations();
            //we redirect the user when there are no more locations to scan
            if(this.locations.length === 0){
                this.backButtonAction();
            }

            this.isAndroid = this.device.isAndroid();
            this.scanToken = this.device.subscribeToScanner(data =>
                this.processBarcodeScan(data)
            );

            this.userInteraction.hideLoading();
        } catch (error) { console.log(error)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    processBarcodeScan(scanData: string): Promise<void> {
        this.validateScannedLocation(scanData);
        return Promise.resolve();
    }

    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    getLocations(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>
    > {
        let request = DataRequest.Factory.createGetLocationsForCountRequest(
            Number(this.taskId),
            this.settings.userCredentials
        );
        return this.physicalCount.getLocationsForCount(request);
    }

    async validateScannedLocation(
        locationSpot: string
    ): Promise<DataResponse.Operation> {
        try {
            let request = DataRequest.Factory.createValidateScannedLocationForCountRequest(
                Number(this.taskId),
                locationSpot,
                this.settings.userCredentials
            );

            let result = await this.physicalCount.validateScannedLocationForCount(
                request
            );

            switch (result.Codigo) {
                case Enums.CountStatus.Invalid:
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.InvalidInput,
                        locationSpot
                    );
                    break;
                case Enums.CountStatus.Canceled:
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.TaskIsClosed
                    );
                    break;
                case Enums.CountStatus.Completed:
                    await this.userInteraction.hideLoading();
                    let message = await this.translate.translateGroupValue(
                        Enums.Translation.Groups.Alerts,
                        Enums.Translation.Alert
                            .LocationCompletedDoYouWishToRecount
                    );
                    let result = await this.userInteraction.showConfirmMessage(
                        message
                    );
                    if (result === Enums.YesNo.Yes) {
                        let request = DataRequest.Factory.createRecountLocationRequest(
                            Number(this.taskId),
                            locationSpot,
                            this.settings.userCredentials
                        );
                        let res = await this.physicalCount.recountLocation(
                            request
                        );

                        if (res.RESULT === Enums.OK.OK) {
                            this.navigation.pushPage(
                                Enums.Page.PhysicalCount,
                                this.workspace,
                                this.navCtrl,
                                {
                                    locationSpot: locationSpot,
                                    taskId: this.taskId
                                }
                            );
                        } else {
                            this.userInteraction.showCustomError(
                                Enums.CustomErrorCodes.SomethingWentWrong
                            );
                        }
                    }
                    break;
                case Enums.CountStatus.Available:
                    this.navigation.pushPage(
                        Enums.Page.PhysicalCount,
                        this.workspace,
                        this.navCtrl,
                        {
                            locationSpot: locationSpot,
                            taskId: this.taskId
                        }
                    );
                    break;
            }

            return Promise.resolve(result);
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );

            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: error
                })
            );
        }
    }
}
