import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest } from "../../models/models";
import { Subscription } from "rxjs/Subscription";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { DeviceProvider } from "../../providers/device/device";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { RelocateProvider } from "../../providers/relocate/relocate";
import { LocationProvider } from "../../providers/location/location";
import { Enums } from "../../enums/enums";
import { TransactionOperatorProvider } from "../../providers/transaction-operator/transaction-operator";
import { CheckpointProvider } from "../../providers/checkpoint/checkpoint";
@IonicPage()
@Component({
    selector: "page-relocate-full-license",
    templateUrl: "relocate-full-license.html"
})
export class RelocateFullLicensePage {
    locationSpot: Model.ShelfSpot = Model.Factory.createShelfSpot();
    licenseId: number = 0;
    taskId: number = 0;
    mt2: number = 0;
    usedMt2: number = 0;
    totalPosition: number = 1;
    scanToken: Subscription;
    scanData: string;
    isAndroid: boolean = false;
    relocationFullParam: Model.RelocationFullParam;
    showSuggestedLocation: Enums.ShowSuggestedLocation;
    comesFrom: Enums.Page;
    inputTotalPosition: boolean;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        public checkpiont: CheckpointProvider,
        private settings: UserSettingsProvider,
        private device: DeviceProvider,
        private location: LocationProvider,
        private userInteraction: UserInteractionProvider,
        private relocation: RelocateProvider,
        private transactionOperator: TransactionOperatorProvider
    ) {}

    public async validateTotalPositionsOnKeyUp($event: any) {
        try {
            //Get the current values on input
            let values = $event.target.value.split("");

            //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
            let newValues: Array<number> = await this.device.getIntegerNumbers(
                values,
            );
            //Updates the value on event
            $event.target.value = newValues.join("");
        } catch (error) {
            this.userInteraction.showError(error);
        }
    }

    public async validateTotalPositionsOnLostFocus($event: any) {
        try {
            //Get the current values on input
            let values = $event._native.nativeElement.value.split("");

            //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
            let newValues: Array<number> = await this.device.getIntegerNumbers(
                values,
            );

            //Updates the value on event
            $event._native.nativeElement.value = newValues.join("");
            $event._value = $event._native.nativeElement.value;
        } catch (error) {
            this.userInteraction.showError(error);
        }
    }

    async ionViewDidEnter() {
        try{
            this.locationSpot = Model.Factory.createShelfSpot();

            let permissions = await this.checkpiont.getCheckPointsByUser(
                <DataRequest.GetCheckPointsByUser>this.settings.userCredentials
            );
    
            let permission = permissions.find(p => {
                return p.CHECK_ID === "ALLOW_TOTAL_POSITION";
            });
    
            this.inputTotalPosition = permission !== undefined;
    
            this.isAndroid = this.device.isAndroid();
            this.relocationFullParam = <Model.RelocationFullParam>(
                this.navParams.data
            );
            this.licenseId = this.relocationFullParam.licenseId;
            this.comesFrom = this.relocationFullParam.comesFrom;
            this.showSuggestedLocation = this.relocationFullParam.showSuggestedLocation;
    
            this.scanToken = this.device.subscribeToScanner(data =>
                this.validateLocation(data)
            );
    
            if (this.relocationFullParam.location) {
                await this.validateLocation(
                    this.relocationFullParam.location
                );
            }
        }catch(error){
            return this.userInteraction.showError(error);
        }
        await this.userInteraction.hideLoading();
    }

    public scanBarcode(): Promise<void> {
        return this.device.scan();
    }

    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }

    async validateLocation(locationSpot: string): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            this.scanData = locationSpot;
            let validateLocationRequest: DataRequest.ValidateLocationForStorage = DataRequest.Factory.createValidateLocationForStorageRequest(
                this.licenseId,
                locationSpot,
                this.taskId,
                this.settings.userCredentials
            );
            let validateResult = await this.location.validateLocationForStorage(
                validateLocationRequest
            );
            if (validateResult.Resultado === Enums.OperationResult.Success) {
                await this.getLocation(locationSpot);
                return Promise.resolve(validateResult);
            } else {
                await this.userInteraction.hideLoading();
                await this.userInteraction.showCustomError(
                    validateResult.Codigo && validateResult.Codigo > 0
                        ? validateResult.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(
                    Model.Factory.createFaultOperation({
                        code: Enums.CustomErrorCodes.DataBaseError,
                        message: validateResult.Mensaje
                    })
                );
            }
        } catch (reason) {
            await this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            await this.userInteraction.hideLoading();
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.DataBaseError,
                    message: reason
                })
            );
        }
    }

    async getLocation(locationSpot: string): Promise<Model.Operation> {
        try {
            let locationRequest: DataRequest.GetLocation = DataRequest.Factory.createGetLocationRequest(
                locationSpot,
                this.settings.userCredentials
            );

            this.locationSpot = await this.location.getLocation(
                locationRequest
            );

            this.locationSpot.ShelfSpotVolumeAndWeight = Model.Factory.createShelfSpotVolumeAndWeight();

            if (this.locationSpot.spotType === Enums.LocationType.Rack) {
                let maxWeightAndVolumeRequest: DataRequest.ValidateLocationMaxWeightAndVolume = DataRequest.Factory.createValidateLocationMaxWeightAndVolumeRequest(
                    this.locationSpot.locationSpot,
                    this.licenseId,
                    this.settings.userCredentials
                );
                this.locationSpot.ShelfSpotVolumeAndWeight = await this.location.validateLocationMaxWeightAndVolume(
                    maxWeightAndVolumeRequest
                );
            } else if (
                this.locationSpot.spotType === Enums.LocationType.Floor
            ) {
                let res = await this.location.getUsedMt2byLocationSpot(
                    locationRequest
                );
                this.usedMt2 = parseInt(res.DbData);
                this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
                    this.locationSpot.maxMt2Occupancy -
                    (this.usedMt2 + this.mt2);
            }
            return Promise.resolve(Model.Factory.createSuccessOperation());
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                locationSpot
            );
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: reason
                })
            );
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    changeUsedMt2(): void {
        this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
            this.locationSpot.maxMt2Occupancy -
            (this.usedMt2 + Number(this.mt2));
        if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume < 0)
            this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume = 0;

        if (this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume > 0) {
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon = "checkmark";
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                "success";
        } else {
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon = "close";
            this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                "danger";
        }
    }

    backButtonAction(): Promise<void> {
        let times: number = 1;
        let params = {
            licenseId: this.licenseId,
            actionBack: true,
            showSuggestedLocation: this.relocationFullParam
                .showSuggestedLocation
        };

        switch (this.comesFrom) {
            case Enums.Page.LicenseInfo:
                times = 1;
                break;
            case Enums.Page.LocationSuggestionFullRelocation:
                times = 1;
                break;
            case Enums.Page.LicenseClassLocation:
                times = 2;
                break;
        }
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            params,
            times
        );
    }

    async relocateLicense(): Promise<Model.Operation> {
        try {
            if (this.totalPosition < 1 || this.totalPosition == null) {
                throw new Error("Debe ingresar la cantidad de posiciones.");
            }else{
                this.totalPosition = 1;
                await this.userInteraction.showLoading();
                let request = DataRequest.Factory.createRelocateLicenseRequest(
                    this.licenseId,
                    this.mt2,
                    null,
                    this.locationSpot.locationSpot,
                    this.settings.userCredentials,
                    this.totalPosition
                );
    
                let result: Model.Operation = await this.relocation.relocateLicense(
                    request
                );
                await this.getLastLicense();
                if (result.Resultado === Enums.OperationResult.Success) {
                    await this.saveLog();
                    let times: number = 1;
    
                    switch (this.comesFrom) {
                        case Enums.Page.LicenseInfo:
                            times = 1;
                            break;
                        case Enums.Page.LocationSuggestionFullRelocation:
                            times = 2;
                            break;
                        case Enums.Page.LicenseClassLocation:
                            times = 3;
                            break;
                    }
                    this.navigation.popPage(
                        this.workspace,
                        this.navCtrl,
                        <Model.LicenseInfoParams>{ licenseId: this.licenseId },
                        times
                    );
                } else {
                    this.userInteraction.showCustomError(
                        result.Codigo && result.Codigo > 0
                            ? result.Codigo
                            : Enums.CustomErrorCodes.UnknownError
                    );
                }
                return Promise.resolve(result);
            }
        } catch (error) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: "Invalid Operation"
                })
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    private saveLog(): Promise<void> {
        try {
            this.transactionOperator.addTransactionByOperator({
                dateCreated: new Date(),
                licenseId: this.licenseId,
                location: this.locationSpot.locationSpot,
                taskType: Enums.TaskTypeLog.CompleteRelocation,
                loginId: this.settings.userCredentials.loginId
            });
        } catch (error) {
            this.userInteraction.toast(
                "error at save log transaction:",
                Enums.ToastTime.Short
            );
        }
        return Promise.resolve();
    }

    async getLastLicense(): Promise<void> {
        try {
            let request: DataRequest.LastLicenseReallocByUser = DataRequest.Factory.createLastLicenseReallocByUser(
                this.licenseId,
                this.settings.userCredentials
            );

            let resultGetLastLicense = await this.relocation.getLastLicenseReallocByUser(
                request
            );
            if (
                resultGetLastLicense.Resultado === Enums.OperationResult.Success
            ) {
                if (Number(resultGetLastLicense.DbData) != this.licenseId) {
                    this.licenseId = Number(resultGetLastLicense.DbData);
                }
            }
        } catch (error) {}
    }
}
