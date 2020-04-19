import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest } from "../../models/models";
import { PickingProvider } from "../../providers/picking/picking";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LocationProvider } from "../../providers/location/location";
import { TranslateProvider } from "../../providers/translate/translate";
import { TaskProvider } from "../../providers/task/task";

@IonicPage()
@Component({
    selector: "page-locate-general-picking",
    templateUrl: "locate-general-picking.html"
})
export class LocateGeneralPickingPage {
    location: Model.ShelfSpot = Model.Factory.createShelfSpot();
    wavePickingId: number = 0;
    locationSpotTarget: string = "";
    scanToken: Subscription;
    scanData: string = "";
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private picking: PickingProvider,
        private locationProvider: LocationProvider,
        private translate: TranslateProvider,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private task: TaskProvider,
        private settings: UserSettingsProvider
    ) {}

    async ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        let params = <Model.LocateGeneralPickingParam>this.navParams.data;
        this.wavePickingId = params.wavePickingId;

        let request: DataRequest.GetTaskList = DataRequest.Factory.createGetTaskListRequest(
            this.wavePickingId,
            this.settings.userCredentials
        );
        let task = await this.task.getFirstPickingTaskByPickingId(request);

        this.locationSpotTarget = task.locationSpotTarget;

        this.scanToken = this.device.subscribeToScanner(data =>
            this.userWantsToProcessScannedData(data)
        );
        this.userInteraction.hideLoading();

        if (!task.locationSpotTarget) {
            this.navigation.setNewRoot(
                Enums.Page.MyTasks,
                this.workspace,
                this.navCtrl
            );
        }
    }

    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }

    async locatePicking(): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            let request: DataRequest.UpdateLocationTargetTask = DataRequest.Factory.createUpdateLocationTargetTaskRequest(
                this.wavePickingId,
                this.location.locationSpot,
                this.settings.userCredentials
            );

            let result = await this.picking.updateLocationTargetTask(request);

            if (result.Resultado === Enums.OperationResult.Success) {
                this.navigation.setNewRoot(
                    Enums.Page.MyTasks,
                    this.workspace,
                    this.navCtrl
                );
            } else {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
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

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    userWantsToProcessScannedData(data: string): Promise<Model.Operation> {
        if (this.locationSpotTarget !== data) {
            return this.showDifferentLocationConfirmPrompt(data);
        } else {
            return this.getLocationSpot(data);
        }
    }

    async showDifferentLocationConfirmPrompt(
        locationSpot: string
    ): Promise<Model.Operation> {
        let alertMessage = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Alerts,
            Enums.Translation.Alert.DifferentLocation
        );

        let result = await this.userInteraction.showConfirmMessage(
            alertMessage
        );
        if (result === Enums.YesNo.Yes) {
            await this.getLocationSpot(locationSpot);
        }

        this.userInteraction.hideLoading();
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    async getLocationSpot(locationSpot: string): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            let locationRequest: DataRequest.GetLocation = DataRequest.Factory.createGetLocationRequest(
                locationSpot,
                this.settings.userCredentials
            );
            this.location = await this.locationProvider.getLocation(
                locationRequest
            );

            if (!this.location) {
                await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataNotFound,
                    locationSpot
                );
                let operation = Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: "Location not found."
                });
                return Promise.resolve(operation);
            } else {
                return Promise.resolve(Model.Factory.createSuccessOperation());
            }
        } catch (error) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                locationSpot
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

    backButtonAction() {}
}
