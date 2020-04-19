import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { LicenseProvider } from "../../providers/license/license";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import * as _ from "lodash";
import { TranslateProvider } from "../../providers/translate/translate";
import { PrinterProvider } from "../../providers/printer/printer";
import { LocationSuggestionProvider } from "../../providers/location-suggestion/location-suggestion";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-license-info",
    templateUrl: "license-info.html"
})
export class LicenseInfoPage {
    licenseId: number = 0;
    currentLocation: string = "";
    policyCode: string = "";
    clientOwner: string = "";
    inventory: Array<Model.Inventory> = [];
    regime: Enums.Regime = Enums.Regime.General;
    statusCode: string;
    statusName: string;
    wavePickingId: number = 0;
    currentSegment: Enums.LicenseInfoSegments = Enums.LicenseInfoSegments
        .LicenseDetail;
    showRegime: boolean = false;

    documentDetail: DataResponse.OP_WMS_SP_GET_INFO_LICENSE_DISPATCH = {
        CUSTOMER_NAME: "",
        WAVE_PICKING_ID: 0,
        DOC_NUM: "0",
        DUE_DATE: new Date(),
        PREPARED_BY: "",
        TOTAL_LICENSES: 0,
        CORRELATIVE: 0
    };
    showDocument: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public workspace: WorkspacePage,
        public navigation: NavigationProvider,
        private userInteraction: UserInteractionProvider,
        private license: LicenseProvider,
        private settings: UserSettingsProvider,
        private translate: TranslateProvider,
        private printer: PrinterProvider,
        private locationSuggestion: LocationSuggestionProvider,
        private configuration: ConfigurationProvider
    ) {}

    async ionViewDidEnter(): Promise<void> {
        await this.getParameterFiscal();
        
        try {
            let params = <Model.LicenseInfoParams>this.navParams.data;
            this.licenseId = params.licenseId;
            this.wavePickingId = params.wavePickingId;
            await this.getLicenseInventory();
        } catch (error) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    async getLicenseInventory() {
        let request: DataRequest.GetInventoryByLicense = DataRequest.Factory.createGetInventoryByLicenseRequest(
            this.licenseId,
            this.settings.userCredentials
        );
        this.inventory = await this.license.getInventoryByLicense(
            request,
            this.settings.userCredentials
        );

        if (this.inventory.length === 0) {
            this.navigation.popPage(this.workspace, this.navCtrl, {
                lastOption: Enums.InfoCenterOption.License,
                wavePickingId: this.wavePickingId
            });
            return this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                this.licenseId.toString()
            );
        }

        let licenseInfo: Model.Inventory = _.first(this.inventory);
        this.wavePickingId = licenseInfo.wavePickingId;
        this.licenseId = licenseInfo.licenseId;
        this.currentLocation = licenseInfo.currentLocation;
        this.policyCode = licenseInfo.policyCode;
        this.clientOwner = licenseInfo.clientOwner;
        this.regime = licenseInfo.regime;
        await this.loadLicenseDocumentDetail();
    }

    async loadLicenseDocumentDetail() {
        let request: DataRequest.GetInfoLicenseDispatch = DataRequest.Factory.createGetInfoLicenseDispatch(
            this.licenseId,
            this.settings.userCredentials
        );
        try {
            this.showDocument = false;
            this.userInteraction.showLoading();
            let result = await this.license.getInfoLicenseDispatch(request);
            if (result != null && result.length > 0) {
                this.documentDetail = result[0];
                if (this.wavePickingId > 0) {
                    this.showDocument = true;
                    this.currentSegment =
                        Enums.LicenseInfoSegments.DocumentDetail;
                }
            }
        } catch (ex) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {
            lastOption: Enums.InfoCenterOption.License,
            locationId: this.currentLocation
        });
    }

    toggleDetails(detail: Model.Inventory): boolean {
        if (
            detail.showDetails &&
            detail.serialNumberRequests === Enums.YesNo.Yes
        ) {
            detail.showDetails = false;
            detail.icon = "arrow-dropright";
            return false;
        } else if (detail.serialNumberRequests === Enums.YesNo.Yes) {
            detail.showDetails = true;
            detail.icon = "arrow-dropdown";
            return true;
        }
    }

    async goToMaterialInfo(detail: Model.Inventory): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.MaterialInfo,
            this.workspace,
            this.navCtrl,
            <Model.MaterialInfoParams>{
                materialId: detail.materialId,
                licenseId: this.licenseId,
                isMoreResults: false
            }
        );
    }

    showRelocationOptions(): Promise<any> {
        return Promise.all([
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.PartialRelocation
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.CompleteRelocation
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.Cancel
            )
        ]).then(arrResult => {
            let buttons = [
                {
                    text: arrResult[0],
                    handler: () => {
                        this.userInteraction.activeAlert = null; //FIXME: handle the active alert in userinteraction provider
                        this.userWantsRelocatePartialLicense();
                    }
                },
                {
                    text: arrResult[1],
                    handler: () => {
                        this.userInteraction.activeAlert = null;
                        return this.validateSuggestedLocation();
                    }
                },
                {
                    text: arrResult[3],
                    role: "cancel",
                    handler: () => {
                        this.userInteraction.activeAlert = null;
                    }
                }
            ];
            return this.userInteraction.showOptionAlert(null, buttons);
        });
    }

    async relocateFullLicense():Promise<void>{

        return this.navigation.pushPage(
            Enums.Page.RelocateFullLicense,
            this.workspace,
            this.navCtrl,
            <Model.RelocationFullParam>{
                licenseId: this.licenseId,
                comesFrom: Enums.Page.LicenseInfo
            }
        );
    }

    async validateSuggestedLocation(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let validateSuggestedLocation: DataRequest.SuggestedLocation = DataRequest.Factory.createSuggestedLocation(
                this.licenseId,
                this.settings.userCredentials
            );

            let result: DataResponse.Operation = await this.locationSuggestion.validateSuggestedLocation(
                validateSuggestedLocation
            );

            if (result.Resultado === Enums.OperationResult.Success) {
                switch (Number(result.DbData)) {
                    case Enums.ShowSuggestedLocation.No:
                        return this.relocateFullLicense();
                    case Enums.ShowSuggestedLocation.SlottingByZona:
                        return this.suggestedLocation(
                            Enums.ShowSuggestedLocation.SlottingByZona
                        );
                    case Enums.ShowSuggestedLocation.Material:
                        return this.suggestedLocation(
                            Enums.ShowSuggestedLocation.Material
                        );
                    case Enums.ShowSuggestedLocation.All:
                        return this.suggestedLocation(
                            Enums.ShowSuggestedLocation.All
                        );
                }
            } else {
                await this.userInteraction.hideLoading();
                let code: Enums.CustomErrorCodes =
                    result.Codigo && result.Codigo > 0
                        ? result.Codigo
                        : Enums.CustomErrorCodes.UnknownError;
                this.userInteraction.showCustomError(code);
                return Promise.resolve();
            }
            await this.userInteraction.hideLoading();
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }
    }

    async suggestedLocation(
        showSuggestedLocation: Enums.ShowSuggestedLocation
    ): Promise<void> {
        try {
            let params = {
                licenseId: this.licenseId,
                showSuggestedLocation: showSuggestedLocation,
                location: ""
            };
            this.navigation.pushPage(
                Enums.Page.LocationSuggestionFullRelocation,
                this.workspace,
                this.navCtrl,
                params
            );
            return Promise.resolve();
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve();
        }
    }

    async userWantsRelocatePartialLicense() {
        let createLicense: DataRequest.CreateLicense = DataRequest.Factory.createCreateLicenseRequest(
            this.policyCode,
            this.settings.login,
            this.clientOwner,
            this.regime,
            null,
            this.settings.userCredentials
        );

        try {
            await this.userInteraction.showLoading();
            let result: DataResponse.Operation = await this.license.createLicense(
                createLicense
            );
            if (result.Resultado === Enums.OperationResult.Success) {
                await this.userInteraction.hideLoading();
                this.navigation.pushPage(
                    Enums.Page.RelocatePartialLicense,
                    this.workspace,
                    this.navCtrl,
                    <Model.RelocatePartialLicenseParams>{
                        sourceLicenseId: this.licenseId,
                        targetLicenseId: Number(result.DbData),
                        clientOwner: this.clientOwner,
                        policyCode: this.policyCode,
                        actionBack: false
                    }
                );
            }
            this.userInteraction.hideLoading();
        } catch (e) {
            this.userInteraction.hideLoading();
        }
    }

    async printLicense() {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            if (this.documentDetail.WAVE_PICKING_ID == 0) {
                let request: DataRequest.GetLicensePrintFormat = DataRequest.Factory.createGetLicensePrintFormatRequest(
                    this.licenseId,
                    0,
                    this.settings.userCredentials
                );
                let format = await this.printer.getLicensePrintFormat(request);

                await this.printer.printDocument(
                    this.settings.printer,
                    format.FORMAT
                );
            } else {
                this.printLicenseDispatch(this.licenseId);
            }
        } catch (e) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async printLicenseDispatch(licenseId: number): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            let request: DataRequest.GetLicenseDispatchPrintFormat = DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(
                licenseId,
                this.settings.userCredentials
            );

            let format = await this.printer.getLicenseDispatchPrintFormat(
                request
            );

            await this.printer.printDocument(
                this.settings.printer,
                format.FORMAT
            );
        } catch (e) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
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
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound
            );
        }
    }
}
