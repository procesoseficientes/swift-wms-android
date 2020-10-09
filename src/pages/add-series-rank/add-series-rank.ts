import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LicenseProvider } from "../../providers/license/license";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import * as _ from "lodash";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";

@IonicPage()
@Component({
    selector: "page-add-series-rank",
    templateUrl: "add-series-rank.html"
})
export class AddSeriesRankPage {
    prefix: string = "";
    sufix: string = "";
    startValue: string = "";
    endValue: string = "";
    params: any;
    isAndroid: boolean = false;
    scanToken: Subscription;
    scanData: string = "";
    currentScan: Enums.AddSeriesRankScan;
    scannedSeries: Array<
        DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES
    > = [];

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private settings: UserSettingsProvider,
        private license: LicenseProvider,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider
    ) {}

    ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data =>
            this.userWantToProcessScannedData(data)
        );
    }

    showScanIcon(option: Enums.AddSeriesRankScan): boolean {
        return option === this.currentScan;
    }

    processStartValueScan(scanData: string): Promise<void> {
        let numStart = scanData.replace(/\D/g, "");
        var parsedStart = parseInt(numStart);
        if (isNaN(parsedStart)) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.ValueIsNotANumber,
                this.startValue
            );
            return;
        }
        let strStart = scanData.replace(numStart,"");
        this.prefix = strStart;
        this.startValue = numStart;
        this.userWantsToChangeCurrentScan(Enums.AddSeriesRankScan.EndValue);
        return Promise.resolve();
    }

    processEndValueScan(scanData: string): Promise<void> {
        let numEnd = scanData.replace(/\D/g, "");
            var parsedEnd = parseInt(numEnd);
            if (isNaN(parsedEnd)) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.ValueIsNotANumber,
                    this.endValue
                );
                return;
            }
        this.endValue = numEnd;
        return Promise.resolve();
    }

    public async userWantToProcessScannedData(scanData: string): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            this.scanData = scanData;
            switch (this.currentScan) {
                case Enums.AddSeriesRankScan.StartValue:
                    await this.processStartValueScan(scanData);
                    await this.userInteraction.hideLoading();
                    break;
                case Enums.AddSeriesRankScan.EndValue:
                    await this.processEndValueScan(scanData);
                    await this.userInteraction.hideLoading();
                    break;
                case Enums.AddSeriesRankScan.None:
                    await this.userInteraction.hideLoading();
                    break;
                default:
                    throw new Error(
                        Enums.CustomErrorCodes.InvalidInput.toString()
                    );
            }

            return Promise.resolve();
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                !isNaN(error) ? error : Enums.CustomErrorCodes.InvalidInput,
                scanData
            );
            return Promise.resolve();
        }
    }

    userWantsToChangeCurrentScan(newScan: Enums.AddSeriesRankScan) {
        switch (newScan) {
            case Enums.AddSeriesRankScan.StartValue:
                break;
            case Enums.AddSeriesRankScan.EndValue:
                if (this.startValue == null || this.startValue == "") return;
                break;
            default:
                return;
        }
        this.currentScan = newScan;
    }

    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }

    ionViewDidLoad() {
        this.params = this.navParams.data;
        this.userWantsToChangeCurrentScan(Enums.AddSeriesRankScan.StartValue);
    }

    async userWantsAddSeriesRank(): Promise<void> {
        try {
            await this.userInteraction.showLoading();

            if (this.startValue == null || this.startValue.trim() == "") {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput
                );
                return;
            }
            if (this.endValue == null || this.endValue.trim() == "") {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput
                );
                return;
            }
            if (this.startValue.length != this.endValue.length) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.StartValueMustBeSameLenghtEndValue
                );
                return;
            }

            if (isNaN(Number(this.startValue))) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.ValueIsNotANumber,
                    this.startValue
                );
                return;
            }

            if (isNaN(Number(this.endValue))) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.ValueIsNotANumber,
                    this.endValue
                );
                return;
            }
            this.params.licenseId =
                this.params.operationType === Enums.TaskType.GeneralDispatch
                    ? this.params.processSku.licenseId
                    : this.params.licenseId;
            let request: DataRequest.AddSeriesRank = DataRequest.Factory.createAddSeriesRankRequest(
                this.params.operationType === Enums.TaskType.PartialRelocation
                    ? this.params.baseLicenseId
                    : this.params.licenseId,
                this.params.operationType === Enums.TaskType.GeneralDispatch
                    ? this.params.processSku.materialId
                    : this.params.material.materialId,
                null,
                null,
                this.prefix,
                this.startValue,
                this.endValue,
                this.sufix,
                null,
                this.params.operationType === Enums.TaskType.GeneralDispatch
                    ? this.params.task.wavePickingId
                    : null,
                this.params.operationType,
                this.settings.userCredentials
            );

            let result: Array<
                DataResponse.SerialNumbers
            > = await this.license.addSeriesRank(request);

            if (result[0].Resultado == Enums.OperationResult.Success) {
                result.forEach(serial => {
                    if (serial.SERIAL != null) {
                        if (
                            this.params.operationType ==
                                Enums.TaskType.Reception ||
                            this.navParams.data.operationType ==
                                Enums.TaskType.PartialRelocation
                        ) {
                            if (this.params.material.SerialNumbers == null) {
                                this.params.material.SerialNumbers = [];
                            }
                            this.params.material.SerialNumbers.push(
                                <Model.MaterialSerialNumber>{
                                    id: Number(serial.DbData),
                                    serial: serial.SERIAL,
                                    licenseId:
                                        this.params.operationType ===
                                        Enums.TaskType.PartialRelocation
                                            ? this.params.baseLicenseId
                                            : this.params.licenseId
                                }
                            );
                        } else if (
                            this.navParams.data.operationType ==
                            Enums.TaskType.GeneralDispatch
                        ) {
                            if (this.params.taskHeader.ScannedSeries == null) {
                                this.params.taskHeader.ScannedSeries = [];
                            }
                            let serialFind = _.find(
                                this.params.taskHeader.ScannedSeries,
                                (serialNumber: Model.MaterialSerialNumber) => {
                                    return (
                                        serialNumber.serial === serial.SERIAL
                                    );
                                }
                            );
                            if (!serialFind) {
                                --this.navParams.data.quantity;
                                this.params.taskHeader.ScannedSeries.push(
                                    <Model.MaterialSerialNumber>{
                                        serial: serial.SERIAL,
                                        licenseId: this.params.licenseId,
                                        assignedTo: this.settings.userCredentials.loginId.split(
                                            "@"
                                        )[0],
                                        wavePickingId: this.params.task
                                            .wavePickingId,
                                        materialId: this.params.processSku
                                            .materialId
                                    }
                                );
                            }
                        }
                    }
                });
                return this.navigation.popPage(
                    this.workspace,
                    this.navCtrl,
                    <Model.GeneralReceptionSeriesParam>this.navParams.data
                );
            } else {
                this.userInteraction.showCustomError(
                    result[0].Codigo && result[0].Codigo > 0
                        ? result[0].Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
            }
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            console.log(e);
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    backButtonAction() {
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            <Model.GeneralReceptionSeriesParam>this.navParams.data
        );
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }
}
