import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Enums } from "../../enums/enums";
import { Model, DataRequest } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LocationProvider } from "../../providers/location/location";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { LicenseProvider } from "../../providers/license/license";
import * as _ from "lodash";
import { TranslateProvider } from "../../providers/translate/translate";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-location-info",
    templateUrl: "location-info.html"
})
export class LocationInfoPage {
    currentSegment: Enums.LocationInfoSegments = Enums.LocationInfoSegments
        .LocationDescription;
    locationId: string = "";
    locationInfo: Model.LocationInfo;
    inventory: Array<Model.LocationInventory> = [];
    unit: string = "";
    showRegime: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private location: LocationProvider,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private license: LicenseProvider,
        private translate: TranslateProvider,
        private configuration: ConfigurationProvider
    ) {
        this.locationInfo = Model.Factory.createLocationInfo();
    }

    async ionViewDidEnter(): Promise<void> {
        await this.getParameterFiscal();
        this.loadLocationInfo();
        this.populateInventoryDetail();
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            lastOption: Enums.InfoCenterOption.Location
        });
    }

    async populateInventoryDetail() {
        try {
            let request = DataRequest.Factory.createGetInventoryByLocationSpotRequest(
                this.locationId,
                this.settings.userCredentials
            );

            let response = await this.license.getInventoryByLocationSpot(
                request,
                this.settings.userCredentials
            );

            this.inventory = _(response)
                .groupBy((license: Model.Inventory) => license.licenseId)
                .map((value, key) => ({
                    licenseId: Number(key),
                    policyCode: value[0].policyCode,
                    clientOwner: value[0].clientOwner,
                    statusName: value[0].statusName,
                    regime: value[0].regime,
                    Inventory: value
                }))
                .value();

            this.userInteraction.hideLoading();
            return Promise.resolve();
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(error);
        }
    }

    async loadLocationInfo(): Promise<void> {
        try {
            this.locationId = (this.navParams
                .data as Model.LocationInfoParams).locationId;

            let locationInfoRequest = DataRequest.Factory.createGetLocationInfoRequest(
                this.locationId,
                this.settings.userCredentials
            );

            this.locationInfo = await this.location.getLocationInfo(
                locationInfoRequest
            );
            if (this.locationInfo.spotType === Enums.LocationType.Floor) {
                this.unit = "mt2";
            }

            this.userInteraction.hideLoading();
            return Promise.resolve();
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                this.locationId
            );
            return this.navigation.popPage(this.workspace, this.navCtrl, {
                lastOption: Enums.InfoCenterOption.Location
            });
        }
    }

    toggleDetails(detail: Model.Inventory): boolean {
        if (detail.showDetails) {
            detail.showDetails = false;
            detail.icon = "arrow-dropright";
            return false;
        } else {
            detail.showDetails = true;
            detail.icon = "arrow-dropdown";
            return true;
        }
    }

    goToMaterialInfo(detail: Model.Inventory): Promise<void> {
        return this.navigation.pushPage(
            Enums.Page.MaterialInfo,
            this.workspace,
            this.navCtrl,
            <Model.MaterialInfoParams>{
                materialId: detail.materialId,
                licenseId: detail.licenseId,
                locationSpot: detail.currentLocation,
                isMoreResults: false
            }
        );
    }

    goToLicenseInfo(detail: Model.Inventory): Promise<void> {
        return this.navigation.pushPage(
            Enums.Page.LicenseInfo,
            this.workspace,
            this.navCtrl,
            {
                licenseId: detail.licenseId,
                locationSpot: detail.currentLocation
            }
        );
    }

    async showLabel(label: string) {
        let traduction = await this.translate.translateGroupValue(
            Enums.Translation.Groups.Labels,
            label
        );
        this.userInteraction.toast(traduction, Enums.ToastTime.Short).present();
    }

    async getParameterFiscal(): Promise<void>{
        try {
            let requestParameter = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.ValidationFiscal,
                Enums.ParameterId.HandlesFiscalStorage,
                this.settings.userCredentials
            );
            let parameter = await this.configuration.getParameter(requestParameter);
            if (parameter && parameter.length && Number(parameter[0].VALUE) === Enums.YesNo.Yes) {
                this.showRegime = true;
            }
            return Promise.resolve();
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound
            );
        }
    }
}
