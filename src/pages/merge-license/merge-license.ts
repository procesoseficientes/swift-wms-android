import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Model, DataRequest } from "../../models/models";
import { Enums } from "../../enums/enums";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LocationProvider } from "../../providers/location/location";
import { MaterialProvider } from "../../providers/material/material";
import { LicenseProvider } from "../../providers/license/license";
import { TranslateProvider } from "../../providers/translate/translate";
@IonicPage()
@Component({
    selector: "page-merge-license",
    templateUrl: "merge-license.html"
})
export class MergeLicensePage {
    scanToken: Subscription;
    currentSegment: string = "scanLocation";
    locationText: string;
    materialId: string;
    material: Model.Material = Model.Factory.createMaterial();
    currentScan: Enums.LicenseMergeScanner = Enums.LicenseMergeScanner.Location;
    licenses: Array<Model.MergeLicense> = [];
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private location: LocationProvider,
        private materialProvider: MaterialProvider,
        private licenseProvider: LicenseProvider,
        private translate: TranslateProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter(): void {
        this.isAndroid = this.device.isAndroid();
        this.scanToken = this.device.subscribeToScanner(data =>
            this.processBarcodeScan(data)
        );

        this.userInteraction.hideLoading();
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    async processBarcodeScan(data: string): Promise<void> {
        switch (this.currentScan) {
            case Enums.LicenseMergeScanner.Location:
                if (await this.validateLocation(data)) {
                    this.materialId = null;
                    this.material = Model.Factory.createMaterial();
                    this.currentScan = Enums.LicenseMergeScanner.Material;
                    this.getNewLicensesDetail();
                }
                break;
            case Enums.LicenseMergeScanner.Material:
                if (!this.locationText) return;
                if (await this.validateMaterial(data)) {
                    this.currentScan = Enums.LicenseMergeScanner.None;
                    this.getNewLicensesDetail();
                }
                break;
        }
        return Promise.resolve();
    }

    async getNewLicensesDetail(): Promise<void> {
        try {
            let request: DataRequest.GetInfoOfLicenseInLocationForMerge = DataRequest.Factory.createGetInfoOfLicenseInLocationForMergeRequest(
                this.locationText,
                this.materialId ? this.materialId : null,
                this.settings.userCredentials
            );

            this.licenses = await this.licenseProvider.getInfoOfLicenseInLocationForMerge(
                request
            );
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.GetDataError
            );
        }
    }

    async validateLocation(data: string): Promise<boolean> {
        try {
            await this.userInteraction.showLoading();

            let request: DataRequest.GetLocation = DataRequest.Factory.createGetLocationRequest(
                data,
                this.settings.userCredentials
            );

            let location = await this.location.getLocation(request);

            if (location.locationSpot) {
                this.locationText = location.locationSpot;
                this.userInteraction.hideLoading();
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataNotFound
                );
                return Promise.resolve(false);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showError(e.message);
            return Promise.resolve(false);
        }
    }

    async validateMaterial(data: string): Promise<boolean> {
        try {
            await this.userInteraction.showLoading();
            let request: DataRequest.GetMaterial = DataRequest.Factory.createGetMaterialRequest(
                this.settings.userCredentials
            );
            request.barcodeId = data;

            this.material = await this.materialProvider.getMaterial(request);
            if (this.material) {
                this.materialId = this.material.materialId;
                this.userInteraction.hideLoading();
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataNotFound
                );
                return Promise.resolve(false);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showError(e.message);
            return Promise.resolve(false);
        }
    }

    async mergeLocationLicenses(): Promise<boolean> {
        try {
            if (this.licenses.length === 0) {
                return Promise.resolve(false);
            }

            let confirmMessage = await this.translate.translateGroupValue(
                Enums.Translation.Groups.Alerts,
                Enums.Translation.Alert.DoYouWishToContinue
            );
            let res = await this.userInteraction.showConfirmMessage(
                confirmMessage
            );

            if (res === Enums.YesNo.No) {
                return Promise.resolve(false);
            }

            this.userInteraction.showLoading();

            let request: DataRequest.MergeLicenseInLocationWithoutDetail = DataRequest.Factory.createMergeLicenseInLocationWithoutDetail(
                this.locationText,
                this.materialId ? this.materialId : null,
                this.settings.userCredentials
            );

            let result = await this.licenseProvider.mergeLicenseInLocationWithoutDetail(
                request
            );

            if (
                result.Resultado === Enums.OperationResult.Success &&
                result.DbData
            ) {
                await this.getProcessedLicensesDetail(result.DbData);
                await this.userInteraction.hideLoading();
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(false);
            }
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showError(e.message);
            return Promise.resolve(false);
        }
    }

    getProcessedLicensesDetail(licenses: string): Promise<void> {
        let newLicenses: Array<Model.MergeLicense> = licenses
            .split("|")
            .map((license: string) => {
                return <Model.MergeLicense>{
                    licenseId: Number(license.split("-")[0]),
                    licenseDescription: license,
                    detail: [],
                    icon: "arrow-dropright"
                };
            });

        newLicenses.forEach(async (license: Model.MergeLicense) => {
            let request: DataRequest.GetInventoryByLicense = DataRequest.Factory.createGetInventoryByLicenseRequest(
                license.licenseId,
                this.settings.userCredentials
            );
            let licenseDetail = await this.licenseProvider.getInventoryByLicense(
                request,
                this.settings.userCredentials
            );

            license.detail = licenseDetail.map((material: Model.Inventory) => {
                return <Model.MergeDetail>{
                    materialId: material.materialId,
                    quantity: material.qty,
                    batch: material.batch,
                    expirationDate: material.dateExpiration,
                    tone: material.tone,
                    caliber: material.caliber,
                    headerId: material.pickingDemandHeaderId,
                    docNum: material.docNum
                };
            });
        });

        return this.navigation.pushPage(
            Enums.Page.MergeLicenseDetail,
            this.workspace,
            this.navCtrl,
            {
                newLicenses: newLicenses,
                locationText: this.locationText,
                materialName: this.material.materialName
                    ? this.material.materialName
                    : ""
            }
        );
    }

    backButtonAction(): void {
        this.navigation.popPage(this.workspace, this.navCtrl);
    }

    showScanIcon(option: Enums.LicenseMergeScanner): boolean {
        return option === this.currentScan;
    }

    changeCurrentScan(newScan: Enums.LicenseMergeScanner): void {
        this.currentScan = newScan;
    }

    toggleDetails(license: Model.MergeLicense): boolean {
        if (license.showDetails) {
            license.showDetails = false;
            license.icon = "arrow-dropright";
            return false;
        } else {
            license.showDetails = true;
            license.icon = "arrow-dropdown";
            return true;
        }
    }
}
