import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { ReceptionProvider } from "../../providers/reception/reception";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { CheckpointProvider } from "../../providers/checkpoint/checkpoint";
import { WorkspacePage } from "../workspace/workspace";
import { LocationProvider } from "../../providers/location/location";
import { Enums } from "../../enums/enums";
import { ChargeProvider } from "../../providers/charge/charge";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { TransactionOperatorProvider } from "../../providers/transaction-operator/transaction-operator";
import { GeneralTransferProvider } from "../../providers/general-transfer/general-transfer";
@IonicPage()
@Component({
    selector: "page-locate-general-reception-license",
    templateUrl: "locate-general-reception-license.html"
})
export class LocateGeneralReceptionLicensePage {
    clientOwner: string;
    receptionSubtype: Enums.TaskSubType;
    locationSpot: Model.ShelfSpot;
    licenseId: number = 0;
    taskId: number = 0;
    mt2: number = 0;
    usedmt2: number = 0;
    totalPosition: number = 1;
    scanToken: Subscription;
    scanData: string;
    isAndroid: boolean = true;
    detail: Array<Model.Material> = [];
    generalReceptionParam: Model.GeneralReceptionParam;
    showSuggestedLocation: Enums.ShowSuggestedLocation;
    comesFrom: Enums.Page;
    regimeTask: Enums.Regime = Enums.Regime.General;
    inputTotalPosition: boolean;
    isGeneralTransfer: boolean = false;
    reqRegisterGenTransReception: DataRequest.RegisterGeneralTransferReception;
    wavePickingId: number = 0;
    task: Model.Task;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        public checkpiont: CheckpointProvider,
        private reception: ReceptionProvider,
        private location: LocationProvider,
        private userInteraction: UserInteractionProvider,
        private charge: ChargeProvider,
        private settings: UserSettingsProvider,
        private device: DeviceProvider,
        private transactionOperator: TransactionOperatorProvider,
        private generalTransfer: GeneralTransferProvider
    ) {
        this.locationSpot = Model.Factory.createShelfSpot();
    }

    public async validateTotalPositionsOnKeyUp($event: any) {
        try {
            //Get the current values on input
            let values = $event.target.value.split("");

            //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
            let newValues: Array<number> = await this.device.getIntegerNumbers(
                values
            );

            //Updates the value on event
            $event.target.value = newValues.join("");
        } catch (error) { console.log(error)
            this.userInteraction.showError(error);
        }
    }

    public async validateTotalPositionsOnLostFocus($event: any) {
        try {
            //Get the current values on input
            let values = $event._native.nativeElement.value.split("");

            //Array wich contains only integer numbers of supplied values, this will have a minim value of '1' because the requirement needs that
            let newValues: Array<number> = await this.device.getIntegerNumbers(
                values
            );

            //Updates the value on event
            $event._native.nativeElement.value = newValues.join("");
            $event._value = $event._native.nativeElement.value;
        } catch (error) { console.log(error)
            this.userInteraction.showError(error);
        }
    }

    async ionViewDidEnter() {
        try {
            this.locationSpot = Model.Factory.createShelfSpot();

            let permissions = await this.checkpiont.getCheckPointsByUser(
                <DataRequest.GetCheckPointsByUser>this.settings.userCredentials
            );

            let permission = permissions.find(p => {
                return p.CHECK_ID === "ALLOW_TOTAL_POSITION";
            });

            this.inputTotalPosition = permission !== undefined;

            this.generalReceptionParam = <Model.GeneralReceptionParam>(
                this.navParams.data
            );

            this.isAndroid = this.device.isAndroid();
            this.licenseId = this.generalReceptionParam.licenseId;
            this.taskId = this.generalReceptionParam.taskId;
            this.detail = this.generalReceptionParam.detail;
            this.clientOwner = this.generalReceptionParam.clientOwner;
            this.receptionSubtype = this.generalReceptionParam.taskSubtype;
            this.showSuggestedLocation = this.generalReceptionParam.showSuggestedLocation;
            this.comesFrom = this.generalReceptionParam.comesFrom;
            this.regimeTask = this.generalReceptionParam.regime;
            this.reqRegisterGenTransReception =
                this.generalReceptionParam.reqRegisterGenTransReception || null;
            this.wavePickingId = this.generalReceptionParam.wavePickingId;
            this.task = this.generalReceptionParam.task || null;

            this.scanToken = this.device.subscribeToScanner(data =>
                this.validateLocation(data)
            );

            if (this.generalReceptionParam.location) {
                await this.validateLocation(
                    this.generalReceptionParam.location
                );
            }
        } catch (error) { console.log(error)
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

    private async validateLocation(locationSpot: string): Promise<void> {
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
        } else {
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                validateResult.Codigo && validateResult.Codigo > 0
                    ? validateResult.Codigo
                    : Enums.CustomErrorCodes.UnknownError,
                validateResult.DbData
            );
        }

        return Promise.resolve();
    }

    private async getLocation(locationSpot: string): Promise<void> {
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

                this.usedmt2 = parseInt(res.DbData);

                this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
                    this.locationSpot.maxMt2Occupancy -
                    (this.usedmt2 + this.mt2);

                if (
                    this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume >
                    0
                ) {
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon =
                        "checkmark";
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                        "success";
                } else {
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIcon =
                        "close";
                    this.locationSpot.ShelfSpotVolumeAndWeight.volumeIconColor =
                        "danger";
                }
            }

            await this.userInteraction.hideLoading();
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }

        return Promise.resolve();
    }

    public async locateLicense(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            if (isNaN(this.mt2)) {
                return await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput,
                    ""
                );
            }

            if (this.totalPosition < 1 || this.totalPosition == null) {
                throw new Error("Debe ingresar la cantidad de posiciones.");
            } else {
                this.totalPosition = 1;
                let receptionRequest: DataRequest.RegisterLicenseReception = DataRequest.Factory.createRegisterLicenseReceptionRequest(
                    this.licenseId,
                    this.locationSpot.locationSpot,
                    this.mt2,
                    this.taskId,
                    this.settings.userCredentials,
                    this.totalPosition
                );

                receptionRequest.transType =
                    this.regimeTask == Enums.Regime.Fiscal
                        ? Enums.TransType.FiscalReception
                        : Enums.TransType.GeneralReception;

                let result = await this.reception.registerLicenseReception(
                    receptionRequest
                );
                if (result.Resultado === Enums.OperationResult.Success) {
                    this.userInteraction.hideLoading();
                    await this.saveLog();
                    let request = DataRequest.Factory.createChargeByMobileRequest(
                        this.licenseId,
                        this.regimeTask == Enums.Regime.General
                            ? Enums.TransType.GeneralReception
                            : Enums.TransType.FiscalReception,
                        this.settings.userCredentials
                    );
                    let times: number = 2;

                    switch (this.comesFrom) {
                        case Enums.Page.GeneralReception:
                            times = 2;
                            break;
                        case Enums.Page.LocationSuggestion:
                            times = 3;
                            break;
                        case Enums.Page.LicenseClassLocation:
                            times = 4;
                            break;
                    }
                    let charges = await this.charge.getCharges(request);
                    if (charges.length) {
                        return this.navigation.pushPage(
                            Enums.Page.LicenseCharges,
                            this.workspace,
                            this.navCtrl,
                            <Model.LicenseChargesParam>{
                                charges: charges,
                                licenseId: this.licenseId,
                                taskId: this.taskId,
                                transType: Enums.TransType.GeneralReception,
                                times: times,
                                regime: this.regimeTask,
                                wavePickingId: this.wavePickingId,
                                task: this.task
                            }
                        );
                    } else {
                        return this.navigation.popPage(
                            this.workspace,
                            this.navCtrl,
                            {
                                taskId: this.taskId,
                                regime: this.regimeTask,
                                wavePickingId: this.wavePickingId,
                                task: this.task
                            },
                            times
                        );
                    }
                } else {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.DataBaseError
                    );
                    return Promise.resolve();
                }
            }
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    private saveLog(): Promise<void> {
        try {
            this.detail.forEach(element => {
                this.transactionOperator.addTransactionByOperator({
                    dateCreated: new Date(),
                    licenseId: this.licenseId,
                    location: this.locationSpot.locationSpot,
                    materialId: element.materialId,
                    materialName: element.materialName,
                    qty: element.quantity,
                    taskType: Enums.TaskTypeLog.Reception,
                    taskId: this.taskId,
                    loginId: this.settings.userCredentials.loginId
                });
            });
        } catch (error) { console.log(error)
            this.userInteraction.toast(
                "error at save log transaction:",
                Enums.ToastTime.Short
            );
        }
        return Promise.resolve();
    }

    changeUsedMt2(): void {
        if (isNaN(this.mt2) || this.mt2.toString() === "") {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InvalidInput,
                ""
            );
            this.mt2 = 0;
            return;
        }

        this.locationSpot.ShelfSpotVolumeAndWeight.availableVolume =
            this.locationSpot.maxMt2Occupancy -
            (this.usedmt2 + Number(this.mt2));
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

    backButtonAction(): Promise<any> {
        let params = {
            licenseId: this.licenseId,
            taskId: this.taskId,
            clientOwner: this.clientOwner,
            detail: this.detail,
            taskSubtype: this.receptionSubtype,
            actionBack: true,
            showSuggestedLocation: this.generalReceptionParam
                .showSuggestedLocation,
            wavePickingId: this.wavePickingId
        };

        let times: number = 1;

        switch (this.comesFrom) {
            case Enums.Page.GeneralReception:
                times = 1;
                break;
            case Enums.Page.LocationSuggestion:
                times = 1;
                break;
            case Enums.Page.LicenseClassLocation:
                times = 3;
                break;
        }

        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            params,
            times
        );
    }

    validateCeroInputTotalPosition(event: any) {
        let text = event.target.value;
        if (text === "0") {
            this.totalPosition = 1;
        }
    }

    validateInputTotalPosition(event: any) {
        let e = event || window.event;
        let key = e.keyCode || e.which;

        if (
            key === 110 ||
            key === 190 ||
            key === 188 ||
            key === 187 ||
            key === 189 ||
            key === 107 ||
            key === 109
        ) {
            e.preventDefault();
        }
    }

    async registerGeneralTransferRecepction(): Promise<boolean> {
        this.reqRegisterGenTransReception.transMt2 = this.mt2;
        let response: DataResponse.Operation = await this.generalTransfer.registerGeneralTransferReception(
            this.reqRegisterGenTransReception
        );

        if (response.Resultado !== Enums.OperationResult.Success) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                response.Codigo && response.Codigo > 0
                    ? response.Codigo
                    : Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        }
        return Promise.resolve(true);
    }
}
