import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { Enums } from "../../enums/enums";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { ManifestCertificationProvider } from "../../providers/manifest-certification/manifest-certification";
import { TranslateProvider } from "../../providers/translate/translate";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import * as _ from "lodash";

@IonicPage()
@Component({
    selector: "page-manifest-certification",
    templateUrl: "manifest-certification.html"
})
export class ManifestCertificationPage {
    scanData: string;
    scanToken: Subscription;
    currentSegment: string = "scanMaterial";
    manifestId: string = "";
    currentScan: Enums.CertificationScanner = Enums.CertificationScanner
        .Manifest;
    scanType: number = Enums.CertificationScanType.Material;
    material: Model.Material = Model.Factory.createMaterial();
    completedPercentage: number = 0;
    certificationId: number = 0;
    allowIncompleteCertification: boolean = false;
    detail: Array<
        DataResponse.OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED
    > = [];
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private manifestCertification: ManifestCertificationProvider,
        private translate: TranslateProvider,
        private configuration: ConfigurationProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    async ionViewDidEnter() {
        try {
            this.isAndroid = this.device.isAndroid();
            let params = this.navParams.data;
            if (params.fromSeries) {
                this.manifestId = params.manifestId;
                this.currentScan = Enums.CertificationScanner.Material;
                this.scanType = Enums.CertificationScanType.Material;
                this.certificationId = params.certificationId;

                this.validateCompletedCertification();
            }
            this.scanToken = this.device.subscribeToScanner(data =>
                this.processBarcodeScan(data)
            );

            let request = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.Certification,
                Enums.ParameterId.Partial,
                this.settings.userCredentials
            );

            let parameter = await this.configuration.getParameter(request);

            if (
                parameter &&
                parameter.length &&
                Number(parameter[0].VALUE) === Enums.YesNo.Yes
            ) {
                this.allowIncompleteCertification = true;
            }

            this.userInteraction.hideLoading();
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }

    scanBarcode() {
        this.device.scan();
    }

    processBarcodeScan(scanData: string): Promise<void> {
        this.scanData = scanData;
        switch (this.currentScan) {
            case Enums.CertificationScanner.Manifest:
                if (this.checkManifestFormat()) {
                    this.manifestId = this.scanData;
                    this.getManifest(Number(this.scanData.split("-")[1]));
                } else {
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.InvalidInput,
                        this.scanData
                    );
                }
                break;
            case Enums.CertificationScanner.Material:
                this.getMaterial(this.scanData);
                break;
            case Enums.CertificationScanner.Label:
                this.insertCertificationLabel(Number(this.scanData));
                break;
            case Enums.CertificationScanner.Box:
                this.insertCertificationBox(this.scanData);
                break;
        }
        return Promise.resolve();
    }

    async getManifest(manifestId: number): Promise<boolean> {
        try {
            this.userInteraction.showLoading();

            let request: DataRequest.GetManifestHeaderForCertification = DataRequest.Factory.createGetManifestHeaderForCertificationRequest(
                manifestId,
                this.settings.userCredentials
            );

            let manifest = await this.manifestCertification.getManifestHeaderForCertification(
                request
            );

            if (manifest && manifest.MANIFEST_HEADER_ID) {
                let certificationId = manifest.CERTIFICATION_HEADER_ID;
                if (!certificationId) {
                    let request = DataRequest.Factory.createInsertCertificationHeaderRequest(
                        manifest.MANIFEST_HEADER_ID,
                        this.settings.userCredentials
                    );

                    let certification = await this.manifestCertification.insertCertificationHeader(
                        request
                    );

                    if (
                        certification.Resultado === Enums.OperationResult.Fail
                    ) {
                        await this.userInteraction.hideLoading();
                        this.userInteraction.showCustomError(
                            certification.Codigo && certification.Codigo > 0
                                ? certification.Codigo
                                : Enums.CustomErrorCodes.UnknownError
                        );
                        return Promise.resolve(false);
                    }

                    certificationId = Number(certification.DbData);
                }

                if (
                    manifest.STATUS_CERTIFICATION ===
                    Enums.StatusCertification.Completed
                ) {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.ManifestAlreadyCertified
                    );
                    this.scanData = "";
                    this.manifestId = "";
                    this.certificationId = 0;
                    this.material = Model.Factory.createMaterial();
                    return Promise.resolve(false);
                }

                let request = DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(
                    certificationId,
                    this.settings.userCredentials
                );

                let result = await this.manifestCertification.validateIfCertificationIsComplete(
                    request
                );

                this.completedPercentage = Number(result.DbData);

                this.certificationId = certificationId;
                this.currentScan = Enums.CertificationScanner.Material;
                this.scanType = Enums.CertificationScanType.Material;

                this.userInteraction.hideLoading();
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataNotFound
                );
            }
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            this.scanData = "";
            this.manifestId = "";
            this.certificationId = 0;
            this.material = Model.Factory.createMaterial();
            return Promise.resolve(false);
        }
    }

    async getMaterial(materialId: string): Promise<boolean> {
        try {
            this.userInteraction.showLoading();
            let request = DataRequest.Factory.createGetMaterialForManifestRequest(
                Number(this.manifestId.split("-")[1]),
                materialId,
                this.settings.userCredentials
            );

            let material = await this.manifestCertification.getMaterialForManifest(
                request
            );

            if (material) {
                if (material.SERIAL_NUMBER_REQUESTS === Enums.YesNo.Yes) {
                    this.navigation.pushPage(
                        Enums.Page.ManifiestCertificationSeries,
                        this.workspace,
                        this.navCtrl,
                        {
                            materialId: material.MATERIAL_ID,
                            manifestId: this.manifestId,
                            certificationId: this.certificationId
                        }
                    );
                }

                this.material.materialId = material.MATERIAL_ID;
                this.material.materialName = material.MATERIAL_NAME;

                this.userInteraction.hideLoading();
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidSku,
                    materialId
                );
                return Promise.resolve(false);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InvalidInput,
                ""
            );
            return Promise.resolve(false);
        }
    }

    changeCurrentScan(newScan: Enums.CertificationScanner): void {
        this.currentScan = newScan;
    }

    showScanIcon(option: Enums.CertificationScanner): boolean {
        return option === this.currentScan;
    }

    showOption(option: Enums.CertificationScanType): boolean {
        return option == this.scanType;
    }

    checkManifestFormat() {
        return this.scanData.split("-").length === 2;
    }

    scanTypeChanged(value: any) {
        this.scanData = "";
        this.material = Model.Factory.createMaterial();
        switch (Number(value)) {
            case Enums.CertificationScanType.Material:
                this.currentScan = Enums.CertificationScanner.Material;
                break;
            case Enums.CertificationScanType.Label:
                this.currentScan = Enums.CertificationScanner.Label;
                break;
            case Enums.CertificationScanType.Box:
                this.currentScan = Enums.CertificationScanner.Box;
                break;
        }
    }

    async deleteCertificationDetail(
        detailId: number,
        barcode?: string
    ): Promise<void> {
        try {
            this.userInteraction.showLoading();

            let request = DataRequest.Factory.createDeleteCertificationDetailRequest(
                detailId,
                barcode,
                this.settings.userCredentials
            );

            let result = await this.manifestCertification.deleteCertificationDetail(
                request
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                this.scanData = "";
                this.material = Model.Factory.createMaterial();

                let request = DataRequest.Factory.createValidateIfCertificationIsCompleteRequest(
                    this.certificationId,
                    this.settings.userCredentials
                );

                let result = await this.manifestCertification.validateIfCertificationIsComplete(
                    request
                );

                this.userInteraction.hideLoading();
                this.completedPercentage = Number(result.DbData);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.DeleteDataError
                );
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.scanData = "";
        }
    }

    async insertCertificationDetail(
        request: DataRequest.InsertCertificationDetail
    ): Promise<void> {
        try {
            let result = await this.manifestCertification.insertCertificationDetail(
                request
            );

            if (result.Resultado === Enums.OperationResult.CustomResult) {
                await this.userInteraction.hideLoading();
                let message: string = await this.translate.translateGroupValue(
                    Enums.Translation.Groups.Alerts,
                    Enums.Translation.Alert.BarcodeAlreadyCertified
                );
                let confirmation = await this.userInteraction.showConfirmMessage(
                    message
                );

                if (
                    confirmation == Enums.YesNo.Yes &&
                    request.certificationType === Enums.CertificationType.Box
                ) {
                    this.deleteCertificationDetail(
                        result.Codigo,
                        result.DbData
                    );
                } else if (
                    confirmation == Enums.YesNo.Yes &&
                    request.certificationType !== Enums.CertificationType.Box
                ) {
                    this.deleteCertificationDetail(Number(result.DbData));
                }
            } else if (result.Resultado !== Enums.OperationResult.Success) {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.InsertDataBaseError
                );
            } else {
                this.validateCompletedCertification();
            }
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.scanData = "";
        }
    }

    async validateCompletedCertification(): Promise<void> {
        try {
            this.material = Model.Factory.createMaterial();
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
                this.markCertificationAsCompleted();
            }

            this.userInteraction.hideLoading();
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async insertCertificationLabel(labelId: number): Promise<void> {
        try {
            this.userInteraction.showLoading();
            let request = DataRequest.Factory.createInsertCertificationDetailRequest(
                this.certificationId,
                labelId,
                null,
                Enums.CertificationType.Label,
                this.settings.userCredentials.login,
                null,
                null,
                this.settings.userCredentials
            );

            return this.insertCertificationDetail(request);
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async insertCertificationBox(boxBarcode: string): Promise<void> {
        try {
            this.userInteraction.showLoading();
            let request = DataRequest.Factory.createInsertCertificationDetailRequest(
                this.certificationId,
                null,
                null,
                Enums.CertificationType.Box,
                this.settings.userCredentials.login,
                null,
                boxBarcode,
                this.settings.userCredentials
            );

            return this.insertCertificationDetail(request);
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async keyPressQuantity(keyCode: Enums.KeyCode): Promise<void> {
        try {
            if (
                keyCode === Enums.KeyCode.Enter &&
                this.material.materialId !== "" &&
                this.material.quantity > 0
            ) {
                this.userInteraction.showLoading();
                let request = DataRequest.Factory.createInsertCertificationDetailRequest(
                    this.certificationId,
                    null,
                    this.material.quantity,
                    Enums.CertificationType.Material,
                    this.settings.login,
                    this.material.materialId,
                    null,
                    this.settings.userCredentials
                );

                return this.insertCertificationDetail(request);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async confirmIncompleteCertification(): Promise<void> {
        try {
            let message: string = await this.translate.translateGroupValue(
                Enums.Translation.Groups.Alerts,
                Enums.Translation.Alert.DoYouWishToContinue
            );
            let confirmation = await this.userInteraction.showConfirmMessage(
                message
            );

            if (confirmation == Enums.YesNo.Yes) {
                this.markCertificationAsCompleted();
            }
        } catch (e) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async markCertificationAsCompleted(): Promise<void> {
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
                this.userInteraction.hideLoading();
                this.currentScan = Enums.CertificationScanner.Manifest;
                this.material = Model.Factory.createMaterial();
                this.manifestId = "";
                this.certificationId = 0;
                this.detail = [];
                this.completedPercentage = 0;
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    toggleDetails(
        material: DataResponse.OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED
    ): boolean {
        if (
            material.showDetails &&
            material.serialNumberRequests === Enums.YesNo.Yes
        ) {
            material.showDetails = false;
            material.icon = "arrow-dropright";
            return false;
        } else if (material.serialNumberRequests === Enums.YesNo.Yes) {
            material.showDetails = true;
            material.icon = "arrow-dropdown";
            return true;
        }
    }

    async changeCurrentSegment(): Promise<void> {
        if (this.currentSegment == "certificationDetail") {
            if (this.certificationId) {
                try {
                    let materialsCertifiedRequest = DataRequest.Factory.createGetConsolidatedCertificationDetail(
                        this.certificationId,
                        this.settings.userCredentials
                    );

                    let serialNumbersCertifiedRequest = DataRequest.Factory.createGetCertificationDetailOfSerialNumber(
                        this.certificationId,
                        this.settings.userCredentials
                    );

                    let resultMaterials = await this.manifestCertification.getConsolidatedCertificationDetail(
                        materialsCertifiedRequest
                    );
                    let resultSerialNumbers = await this.manifestCertification.getCertificationDetailOfSerialNumber(
                        serialNumbersCertifiedRequest
                    );
                    if (resultMaterials) {
                        this.detail = _.map(
                            resultMaterials,
                            (
                                materialCertified: DataResponse.OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED
                            ) => {
                                materialCertified.showDetails = false;
                                if (resultSerialNumbers) {
                                    let serialNumbersByMaterial = _.filter(
                                        resultSerialNumbers,
                                        (
                                            serialNumber: DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER
                                        ) => {
                                            return (
                                                serialNumber.MATERIAL_ID ==
                                                materialCertified.MATERIAL_ID
                                            );
                                        }
                                    );
                                    if (serialNumbersByMaterial) {
                                        materialCertified.SerialNumbers = serialNumbersByMaterial;
                                        materialCertified.serialNumberRequests =
                                            Enums.YesNo.Yes;
                                    } else {
                                        materialCertified.serialNumberRequests =
                                            Enums.YesNo.Yes;
                                    }
                                }
                                return materialCertified;
                            }
                        );
                    }
                } catch (error) {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.DataBaseError
                    );
                }
            }
        }
    }
}
