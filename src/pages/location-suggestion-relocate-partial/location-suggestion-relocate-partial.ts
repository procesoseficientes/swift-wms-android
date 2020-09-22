import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LocationSuggestionProvider } from "../../providers/location-suggestion/location-suggestion";
import { Enums } from "../../enums/enums";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { TranslateProvider } from "../../providers/translate/translate";
import { LocationProvider } from "../../providers/location/location";
import { ConfigurationProvider } from "../../providers/configuration/configuration";

@IonicPage()
@Component({
    selector: "page-location-suggestion-relocate-partial",
    templateUrl: "location-suggestion-relocate-partial.html"
})
export class LocationSuggestionRelocatePartialPage {
    properties: any;
    listSuggestionZone: Array<Model.SuggestionZone> = [];
    listSuggestionMaterial: Array<Model.SuggestionMaterial> = [];
    clientOwner: string;
    receptionSubtype: Enums.TaskSubType;
    countClassInLicense: number = 0;
    licenseId: number = 0;

    taskId: number = 0;
    isAndroid: boolean = false;
    detail: Array<Model.Material> = [];
    scanToken: Subscription;
    relocatePartialParams: Model.LocatePartialLicenseParams;
    showLocationByZona: boolean = false;
    showLocationByMaterial: boolean = false;
    parameterSuggestionMaterial: number = 0;
    currentScan: Enums.SuggestedLocationScan = Enums.SuggestedLocationScan
        .LocationByZone;
    suggestion: string = "zone";

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private locationSuggestion: LocationSuggestionProvider,
        private device: DeviceProvider,
        private translate: TranslateProvider,
        private location: LocationProvider,
        private configuration: ConfigurationProvider
    ) {}

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
    }

    async ionViewDidLoad() {
        try {
            await this.userInteraction.showLoading();

            this.showLocationByZona = false;
            this.showLocationByMaterial = false;
            this.relocatePartialParams = <Model.LocatePartialLicenseParams>this
                .navParams.data;
            switch (this.relocatePartialParams.showSuggestedLocation) {
                case Enums.ShowSuggestedLocation.All:
                    this.showLocationByZona = true;
                    this.showLocationByMaterial = true;
                    break;
                case Enums.ShowSuggestedLocation.SlottingByZona:
                    this.showLocationByZona = true;
                    break;
                case Enums.ShowSuggestedLocation.Material:
                    this.showLocationByMaterial = true;
                    break;
            }
            this.licenseId = this.relocatePartialParams.licenseId;
            if (this.showLocationByZona) {
                this.listSuggestionZone = await this.getLocationSuggestion();
            }
            if (this.showLocationByMaterial) {
                this.listSuggestionMaterial = await this.getLocationSuggestionByMaterialList();
                if (this.listSuggestionMaterial.length <= 0) {
                    this.showLocationByMaterial = false;
                }
            }

            let parameter = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.SuggestionToLocate,
                Enums.ParameterId.DisplaySuggestionMaterial,
                this.settings.userCredentials
            );

            let configShowMaterial = await this.configuration.getParameter(
                parameter
            );
            this.parameterSuggestionMaterial = Number(
                configShowMaterial[0].VALUE
            );

            this.relocatePartialParams.comesFrom =
                Enums.Page.LocationSuggestionRelocatePartial;
            if (
                this.showLocationByZona == false &&
                this.showLocationByMaterial == false
            ) {
                this.navigationPage(
                    Enums.Page.LocatePartialLicense,
                    this.relocatePartialParams
                );
            }
            if (
                this.showLocationByZona == false &&
                this.parameterSuggestionMaterial == 0
            ) {
                this.navigationPage(
                    Enums.Page.LocatePartialLicense,
                    this.relocatePartialParams
                );
            }

            this.scanToken = this.device.subscribeToScanner(data =>
                this.userWantToProcessScannedData(data)
            );
            await this.userInteraction.hideLoading();
        } catch (exception) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(exception);
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    async getLocationSuggestion(): Promise<Array<Model.SuggestionZone>> {
        let listLocation: Array<
            DataResponse.OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE
        > = await this.getLocationSuggestionToServer();
        let listSuggestionZone: Array<Model.SuggestionZone> = [];

        if (listLocation.length > 0) {
            this.countClassInLicense = listLocation[0].COUNT_CLASS_IN_LICENSE;
        }

        await listLocation.forEach(ll => {
            let zone = listSuggestionZone.find(lsZ => {
                return (
                    ll.ZONE == lsZ.ZONE &&
                    ll.WAREHOUSE_CODE == lsZ.WAREHOUSE_CODE
                );
            });

            let newLocation: Model.SuggestionLocation = {
                LOCATION: ll.LOCATION,
                SPOT_TYPE: ll.SPOT_TYPE,
                MAX_WEIGHT: ll.MAX_WEIGHT,
                LOCATION_WEIGHT: ll.LOCATION_WEIGHT,
                LOCATION_VOLUME: ll.LOCATION_VOLUME,
                VOLUME: ll.VOLUME,
                AVAILABLE: 0,
                AVAIBLE_ICON: "checkmark",
                AVAILABLE_WEIGHT: ll.AVAILABLE_WEIGHT,
                WEIGHT_ICON: ll.WEIGHT_ICON,
                WEIGHT_ICON_COLOR: ll.WEIGHT_ICON_COLOR,
                AVAILABLE_VOLUME: ll.AVAILABLE_VOLUME,
                VOLUME_ICON: ll.VOLUME_ICON,
                VOLUME_ICON_COLOR: ll.VOLUME_ICON_COLOR
            };

            switch (newLocation.SPOT_TYPE) {
                case Enums.TypeLocation.Rack.toString():
                    newLocation.AVAILABLE = newLocation.LOCATION_WEIGHT;
                    break;
                case Enums.TypeLocation.Floor.toString():
                    newLocation.AVAILABLE = newLocation.VOLUME;
                    break;
            }

            if (!zone) {
                let newZone: Model.SuggestionZone = {
                    SLOTTING_ZONE_ID: ll.SLOTTING_ZONE_ID,
                    WAREHOUSE_CODE: ll.WAREHOUSE_CODE,
                    ZONE_ID: ll.ZONE_ID,
                    ZONE: ll.ZONE,
                    MANDATORY: ll.MANDATORY,
                    COUNT_CLASS: ll.COUNT_CLASS,
                    COUNT_CLASS_IN_LICENSE: ll.COUNT_CLASS_IN_LICENSE,
                    DIFFERENCE_OF_CLASSES: ll.DIFFERENCE_OF_CLASSES,
                    LOCATIONS: [],
                    ICON: "arrow-dropdown",
                    SHOW_DETAIL: true
                };
                newZone.LOCATIONS.push(newLocation);
                listSuggestionZone.push(newZone);
            } else {
                let locations = zone.LOCATIONS;
                locations.push(newLocation);
                zone.LOCATIONS = locations;
            }
        });

        return Promise.resolve(listSuggestionZone);
    }

    async getLocationSuggestionToServer(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE>
    > {
        let suggestedLocation: DataRequest.SuggestedLocation = DataRequest.Factory.createSuggestedLocation(
            this.relocatePartialParams.licenseId,
            this.settings.userCredentials
        );
        return this.locationSuggestion.getLocationSuggestion(suggestedLocation);
    }

    async getLocationSuggestionByMaterialList(): Promise<
        Array<Model.SuggestionMaterial>
    > {
        let listLocationMaterial: Array<
            DataResponse.OP_WMS_SP_GET_SUGGESTED_LOCATIONS_OF_MATERIAL_BY_LICENSE
        > = await this.getLocationSuggestionByMaterial();
        let listSuggestionMaterial: Array<Model.SuggestionMaterial> = [];

        await listLocationMaterial.forEach(LLM => {
            let material = listSuggestionMaterial.find(LSM => {
                return (
                    LLM.MATERIAL_ID == LSM.MATERIAL_ID &&
                    LLM.LOCATION_SPOT == LSM.LOCATION_SPOT
                );
            });

            if (material !== null) {
                let newMaterial: Model.SuggestionMaterial = {
                    BATCH: LLM.BATCH,
                    CALIBER: LLM.CALIBER,
                    DATE_EXPIRATION: LLM.DATE_EXPIRATION,
                    LOCATION_SPOT: LLM.LOCATION_SPOT,
                    MATERIAL_ID: LLM.MATERIAL_ID,
                    QTY: LLM.QTY,
                    TONE: LLM.TONE,
                    TONE_AND_CALIBER_ID: LLM.TONE_AND_CALIBER_ID,
                    ICON: "arrow-dropdown",
                    SHOW_DETAIL: true
                };
                listSuggestionMaterial.push(newMaterial);
            }
        });

        return Promise.resolve(listSuggestionMaterial);
    }

    async getLocationSuggestionByMaterial(): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_SUGGESTED_LOCATIONS_OF_MATERIAL_BY_LICENSE
        >
    > {
        let suggestedLocation: DataRequest.SuggestedLocation = DataRequest.Factory.createSuggestedLocation(
            this.relocatePartialParams.licenseId,
            this.settings.userCredentials
        );
        return this.locationSuggestion.getLocationSuggestionByMaterial(
            suggestedLocation
        );
    }

    showScanIcon(option: Enums.SuggestedLocationScan): boolean {
        this.currentScan = option;
        return option === this.currentScan;
    }

    userWantsToChangeCurrentScan(newScan: Enums.SuggestedLocationScan) {
        this.currentScan = newScan;
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    navigationPage(page: Enums.Page, param: any) {
        this.navigation.pushPage(page, this.workspace, this.navCtrl, param);
    }

    public async userWantToProcessScannedData(scanData: string): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            await this.processLocationByZone(scanData);
            await this.userInteraction.hideLoading();
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                !isNaN(error) ? error : Enums.CustomErrorCodes.InvalidInput,
                scanData
            );
        }
    }

    public async processLocationByZone(
        location: string
    ): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            this.relocatePartialParams.location = location;
            // Verifica en que opcion escaneo la ubicacion
            if (
                this.currentScan === Enums.SuggestedLocationScan.LocationByZone
            ) {
                let page: Enums.Page = null;
                if (
                    this.listSuggestionZone &&
                    this.listSuggestionZone.length > 0
                ) {
                    await this.listSuggestionZone.forEach(
                        async (zone: Model.SuggestionZone) => {
                            let result = zone.LOCATIONS.find(locationZone => {
                                return location == locationZone.LOCATION;
                            });

                            if (result) {
                                // Verifica que no exista diferencia de clases
                                if (
                                    zone.DIFFERENCE_OF_CLASSES > 0 &&
                                    zone.MANDATORY == Enums.YesNo.Yes
                                ) {
                                    let alertMessage = await this.translate.translateGroupValue(
                                        Enums.Translation.Groups.Alerts,
                                        Enums.Translation.Alert
                                            .CreateANewLicenseWithIncompatibleClasses
                                    );

                                    let userConfirm: Enums.YesNo = await this.userInteraction.showConfirmMessage(
                                        alertMessage
                                    );

                                    if (userConfirm == Enums.YesNo.Yes) {
                                        page = Enums.Page.LicenseClassLocation;
                                    } else {
                                        return Promise.resolve(
                                            Model.Factory.createSuccessOperation()
                                        );
                                    }
                                } else {
                                    page = await this.validateLocation(
                                        location
                                    );
                                    if (!page) {
                                        return Promise.resolve();
                                    }
                                }
                            } else {
                                page = await this.validateLocation(location);
                                if (!page) {
                                    return Promise.resolve();
                                }
                            }
                            if (!page) {
                                await this.userInteraction.showCustomError(
                                    Enums.CustomErrorCodes.LocationDoesntExist,
                                    location
                                );
                                return Promise.resolve(
                                    Model.Factory.createFaultOperation(
                                        Model.Factory.createCustomError(
                                            location,
                                            Enums.CustomErrorCodes
                                                .LocationDoesntExist
                                        )
                                    )
                                );
                            }
                            this.relocatePartialParams.location = location;
                            this.relocatePartialParams.comesFrom =
                                Enums.Page.LocationSuggestionRelocatePartial;
                            switch (page) {
                                case Enums.Page.LocatePartialLicense:
                                    this.navigationPage(
                                        page,
                                        this.relocatePartialParams
                                    );
                                    break;
                            }
                        }
                    );
                } else {
                    page = await this.validateLocation(location);
                    if (!page) {
                        return Promise.resolve(
                            Model.Factory.createSuccessOperation()
                        );
                    }
                    this.relocatePartialParams.location = location;
                    this.relocatePartialParams.comesFrom =
                        Enums.Page.LocationSuggestionRelocatePartial;
                    this.navigation.pushPage(
                        page,
                        this.workspace,
                        this.navCtrl,
                        this.relocatePartialParams
                    );
                }
            } else if (
                this.currentScan === Enums.SuggestedLocationScan.Material
            ) {
                // Escaneado en MATERIAL
                this.listSuggestionMaterial.find(
                    listMaterial => {
                        return location == listMaterial.LOCATION_SPOT;
                    }
                );

                let page = await this.validateLocation(location);
                if (!page) {
                    return;
                }

                this.relocatePartialParams.location = location;
                this.relocatePartialParams.comesFrom =
                    Enums.Page.LocationSuggestionRelocatePartial;
                this.navigationPage(
                    Enums.Page.LocatePartialLicense,
                    this.relocatePartialParams
                );
            }
            await this.userInteraction.hideLoading();
            return Promise.resolve(Model.Factory.createSuccessOperation());
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        error.message,
                        Enums.CustomErrorCodes.InvalidInput
                    )
                )
            );
        } finally {
            await this.userInteraction.hideLoading();
        }
    }

    async validateLocation(location: string): Promise<Enums.Page> {
        let validateLocationRequest: DataRequest.ValidateLocationForStorage = DataRequest.Factory.createValidateLocationForStorageRequest(
            this.licenseId,
            location,
            this.taskId,
            this.settings.userCredentials
        );
        let validateResult = await this.location.validateLocationForStorage(
            validateLocationRequest
        );

        if (validateResult.Resultado === Enums.OperationResult.Success) {
            return Promise.resolve(Enums.Page.LocatePartialLicense);
        } else {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                validateResult.Codigo && validateResult.Codigo > 0
                    ? validateResult.Codigo
                    : Enums.CustomErrorCodes.UnknownError,
                validateResult.DbData
            );
            return Promise.resolve(null);
        }
    }

    toggleDetails(suggestion: any): void {
        if (suggestion.SHOW_DETAIL) {
            suggestion.SHOW_DETAIL = false;
            suggestion.ICON = "arrow-dropright";
        } else {
            suggestion.SHOW_DETAIL = true;
            suggestion.ICON = "arrow-dropdown";
        }
    }

    backButtonAction() {
        this.relocatePartialParams.actionBack = true;
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            <Model.LocatePartialLicenseParams>this.relocatePartialParams
        );
    }
}
