import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { DeviceProvider } from "../../providers/device/device";
import { ManifestCertificationProvider } from "../../providers/manifest-certification/manifest-certification";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Subscription } from "rxjs/Subscription";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../../providers/translate/translate";
import { DataRequest, Model, DataResponse } from "../../models/models";
import * as _ from "lodash";

@IonicPage()
@Component({
    selector: "page-manifiest-certification-series",
    templateUrl: "manifiest-certification-series.html"
})
export class ManifiestCertificationSeriesPage {
    scanData: string;
    scanToken: Subscription;

    certificationId: number = 0;
    manifestId: string = "";
    materialId: string = "";

    completedPercentage: number = 0;
    scannedSeries: Array<Model.MaterialSerialNumber> = [];
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private manifestCertification: ManifestCertificationProvider,
        private settings: UserSettingsProvider,
        private translate: TranslateProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter(): void {
        try {
            this.isAndroid = this.device.isAndroid();
            let params = this.navParams.data;
            this.certificationId = params.certificationId;
            this.manifestId = params.manifestId;
            this.materialId = params.materialId;

            this.getProcessedSeries();
            this.validateCompletedCertification();
            this.scanToken = this.device.subscribeToScanner(data =>
                this.processBarcodeScan(data)
            );
            this.userInteraction.hideLoading();
        } catch (e) {
            this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.BadRequest
            );
        }
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            certificationId: this.certificationId,
            manifestId: this.manifestId,
            fromSeries: true
        });
    }

    processBarcodeScan(scanData: string): Promise<any> {
        return this.insertSerie(scanData);
    }

    userWantsToFinishProcesingSeries(): Promise<void> {
        return this.backButtonAction();
    }

    public async getProcessedSeries() {
        try {
            let request = DataRequest.Factory.createGetCertificationDetailOfSerialNumberRequest(
                this.certificationId,
                this.settings.userCredentials
            );
            let result = await this.manifestCertification.getCertificationDetailOfSerialNumber(
                request
            );

            this.scannedSeries = result.map(
                (
                    serial: DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER
                ) => {
                    if (serial.MATERIAL_ID === this.materialId) {
                        let newSerie = Model.Factory.createSerialNumber();
                        newSerie.materialId = serial.MATERIAL_ID;
                        newSerie.serial = serial.SERIAL_NUMBER;
                        return newSerie;
                    }
                }
            );

            return Promise.resolve(this.scannedSeries);
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );

            return Promise.resolve(null);
        }
    }

    public async showDeleteSerieConfirmation(s: string): Promise<any> {
        await this.userInteraction.hideLoading();

        let confirmation = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Alerts,
            Enums.Translation.Alert.DeleteSerie
        );
        let result = await this.userInteraction.showConfirmMessage(
            confirmation
        );
        if (result === Enums.YesNo.Yes) {
            await this.userInteraction.showLoading();
            return this.deleteSerie(s);
        } else {
            return Promise.resolve();
        }
    }

    public async keyPressSerie(key: number): Promise<any> {
        if (key === Enums.KeyCode.Enter) {
            if (!this.scanData) return;
            return this.insertSerie(this.scanData);
        }
    }

    public async insertSerie(serie: string): Promise<Model.Operation> {
        try {
            this.userInteraction.showLoading();
            let request = DataRequest.Factory.createInsertCertificationBySerialNumberRequest(
                this.certificationId,
                Number(this.manifestId.split("-")[1]),
                this.materialId,
                serie,
                this.settings.userCredentials
            );

            let result = await this.manifestCertification.insertCertificationBySerialNumber(
                request
            );

            if (result.Resultado === Enums.OperationResult.CustomResult) {
                await this.userInteraction.hideLoading();
                return this.showDeleteSerieConfirmation(serie);
            } else if (result.Resultado === Enums.OperationResult.Success) {
                let requestInsertDetail = DataRequest.Factory.createInsertCertificationDetailRequest(
                    this.certificationId,
                    null,
                    1,
                    Enums.CertificationType.Material,
                    this.settings.login,
                    this.materialId,
                    null,
                    this.settings.userCredentials
                );

                let resultInsertDetail = await this.manifestCertification.insertCertificationDetail(
                    requestInsertDetail
                );

                if (
                    resultInsertDetail.Resultado !==
                    Enums.OperationResult.Success
                ) {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        resultInsertDetail.Codigo &&
                        resultInsertDetail.Codigo > 0
                            ? resultInsertDetail.Codigo
                            : Enums.CustomErrorCodes.InsertDataBaseError
                    );

                    return Promise.resolve(resultInsertDetail);
                } else {
                    let newSerie = Model.Factory.createSerialNumber();
                    newSerie.materialId = this.materialId;
                    newSerie.serial = serie;
                    this.scannedSeries.push(newSerie);
                    return this.validateCompletedCertification();
                }
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.InsertDataBaseError
                );
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );

            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: e
                })
            );
        }
    }

    public async deleteSerie(serie: string): Promise<Model.Operation> {
        try {
            this.userInteraction.showLoading();
            let request = DataRequest.Factory.createDeleteCertificationBySerialNumberRequest(
                this.certificationId,
                this.materialId,
                serie,
                this.settings.userCredentials
            );

            let result = await this.manifestCertification.deleteCertificationBySerialNumber(
                request
            );

            if (result.Resultado !== Enums.OperationResult.Success) {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.DeleteDataError
                );
            } else {
                let deletedSerie = _.find(this.scannedSeries, serial => {
                    return serial.serial === serie;
                });
                _.pull(this.scannedSeries, deletedSerie);
                this.validateCompletedCertification();
            }
            return Promise.resolve(result);
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataBaseError
            );

            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.UnknownError,
                    message: error
                })
            );
        }
    }

    public async validateCompletedCertification(): Promise<Model.Operation> {
        try {
            this.scanData = "";

            let request = DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(
                this.certificationId,
                this.settings.userCredentials
            );

            let result = await this.manifestCertification.validateIfCertificationIsComplete(
                request
            );

            this.completedPercentage = Number(result.DbData);
            if (this.completedPercentage >= 100) {
                return this.markCertificationAsCompleted();
            }

            this.userInteraction.hideLoading();
            return Promise.resolve(result);
        } catch (error) {
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

    public async markCertificationAsCompleted(): Promise<Model.Operation> {
        try {
            this.userInteraction.showLoading();

            let request = DataRequest.Factory.createMarkManifestAsCertifiedRequest(
                Number(this.manifestId.split("-")[1]),
                this.certificationId,
                this.settings.userCredentials.login,
                this.settings.userCredentials
            );

            let result = await this.manifestCertification.markManifestAsCertified(
                request
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                this.navigation.popPage(this.workspace, this.navCtrl);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }

            return Promise.resolve(result);
        } catch (error) {
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
