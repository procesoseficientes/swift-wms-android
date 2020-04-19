import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Enums } from "../../enums/enums";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { LocationProvider } from "../../providers/location/location";
import * as _ from "lodash";
import { PrinterProvider } from "../../providers/printer/printer";
import { TranslateProvider } from "../../providers/translate/translate";
import { LocateDispatchProvider } from "../../providers/locate-dispatch/locate-dispatch";
@IonicPage()
@Component({
    selector: "page-locate-replenishment",
    templateUrl: "locate-replenishment.html"
})
export class LocateReplenishmentPage {
    wavePickingId: number = 0;
    locationSpotTarget: string = "";
    scanToken: Subscription;
    scanData: string = "";
    isAndroid: boolean = false;
    currentLocation: Model.LocationDispatch;
    locations: Array<Model.LocationDispatch> = [];

    currentScan: Enums.LocateLicensePickingScan;
    stopEvent: boolean = false;
    isPickingTaskComplete: boolean = false;

    constructor(
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private locationProvider: LocationProvider,
        private picking: PickingProvider,
        private printer: PrinterProvider,
        private translate: TranslateProvider,
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private locateDispatch: LocateDispatchProvider
    ) {}

    async ionViewDidLoad() {
        let params = <Model.LocateGeneralReplenishmentParams>this.navParams
            .data;
        this.isPickingTaskComplete = params.isPickingTaskComplete;
        this.wavePickingId = params.wavePickingId;
        this.currentLocation = params.currentLocation;
        this.locations = params.locations;
        this.currentScan = params.currentScan;
        if (this.locations.length == 0) {
            this.loadAndGroupLicensesDispatch();
        }
    }

    private findLocation(
        currentLicense: DataResponse.OP_WMS_SP_GET_TARGET_LOCATION_BY_LICENSE_DISPATCH
    ): Model.LocationDispatch {
        let findLocation = _.find(
            this.locations,
            (currentLocation: Model.LocationDispatch) => {
                return (
                    currentLocation.targetLocation ==
                    currentLicense.LOCATION_SPOT_TARGET
                );
            }
        );
        return findLocation;
    }

    backButtonAction(): Promise<void> {
        if (this.isPickingTaskComplete) {
            return;
        }
        this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            {
                wavePickingId: this.wavePickingId
            },
            1
        );
    }

    backToGeneralPicking() {
        if (this.locateDispatch.isAllLocationsAllComplete(this.locations)) {
            this.navigation.popPage(
                this.workspace,
                this.navCtrl,
                {
                    wavePickingId: this.wavePickingId
                },
                1
            );
        }
    }

    async loadAndGroupLicensesDispatch(): Promise<void> {
        let request: DataRequest.GetTargetLocationByLicenseDispatch = DataRequest.Factory.createGetTargetLocationByLicenseDispatch(
            this.wavePickingId,
            this.settings.userCredentials
        );
        try {
            this.userInteraction.showLoading();
            let result = await this.picking.getTargetLocationByLicenseDispatch(
                request
            );
            if (result != null && result.length > 0) {
                let counter = 0;
                result.forEach(currentLicense => {
                    let findLocation = this.findLocation(currentLicense);
                    if (findLocation == null) {
                        this.locations.push({
                            id: counter,
                            icon: "arrow-dropright",
                            color: "light",
                            isComplete: false,
                            licenses: [],
                            showDetails: false,
                            targetLocation: currentLicense.LOCATION_SPOT_TARGET,
                            showScanIcon: false
                        });
                        counter++;
                    }
                });
                //recorremos nuevamente el array para agregar las licencias
                result.forEach(currentLicense => {
                    //busco la ubicacion donde debo asignar la licencia
                    //recorro el array de locations y verifico donde puedo ingresar el objeto license
                    let findLocation = this.findLocation(currentLicense);

                    if (findLocation != null) {
                        let isComplete =
                            currentLicense.CURRENT_LOCATION &&
                            currentLicense.CURRENT_LOCATION.split("@")[0] !=
                                this.settings.userCredentials.login;

                        let counterLicenses = findLocation.licenses.length;
                        findLocation.licenses.push({
                            id: counterLicenses + 1,
                            currentLocation: currentLicense.CURRENT_LOCATION,
                            isComplete: isComplete,
                            licenseId: currentLicense.LICENSE_ID,
                            showScanIcon: false
                        });
                    }
                });
                if (this.locations.length > 0) {
                    this.locations[0].showScanIcon = true;
                    this.currentScan =
                        Enums.LocateLicensePickingScan.TargetLocation;
                    this.currentLocation = this.locations[0];
                    this.currentLocation.showDetails = false;
                    this.toggleDetails(this.currentLocation);
                }
            } else {
                this.backToGeneralPicking();
            }
        } catch (error) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InsertDataBaseError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    async ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();

        this.scanToken = this.device.subscribeToScanner(data =>
            this.userWantsToProcessScannedData(data)
        );
        this.userInteraction.hideLoading();
    }

    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }

    toggleDetails(
        location: Model.LocationDispatch
    ): boolean {
        this.currentLocation = location;
        this.userWantsToChangeCurrentScan(
            Enums.LocateLicensePickingScan.TargetLocation,
            null,
            this.currentLocation
        );
        return this.toggleLocation(location);
    }

    toggleLocation(location: Model.LocationDispatch): boolean {
        if (location.showDetails) {
            location.showDetails = false;
            location.icon = "arrow-dropright";
            return false;
        } else {
            location.showDetails = true;
            location.icon = "arrow-dropdown";
            return true;
        }
    }

    userWantsToChangeCurrentScan(
        newScan: Enums.LocateLicensePickingScan,
        license: Model.LicenseDispatch = null,
        location: Model.LocationDispatch = null
    ) {
        if (this.stopEvent) {
            this.stopEvent = false;
            return;
        }
        switch (newScan) {
            case Enums.LocateLicensePickingScan.TargetLocation:
                if (location) {
                    location.showScanIcon = true;
                    this.locations.forEach(currentLocation => {
                        if (currentLocation.id != location.id) {
                            currentLocation.showScanIcon = false;
                        }
                    });
                }
                break;
            case Enums.LocateLicensePickingScan.LicenseId:
                if (license && location) {
                    license.showScanIcon = true;
                    this.locations.forEach(current => {
                        current.licenses.forEach(currentLicense => {
                            if (license.licenseId != currentLicense.licenseId) {
                                currentLicense.showScanIcon = false;
                            }
                        });
                    });
                    this.currentLocation = location;
                } else {
                    this.currentLocation.licenses.forEach(currentLicense => {
                        currentLicense.showScanIcon = false;
                    });
                    if (this.currentLocation.licenses.length > 0) {
                        this.currentLocation.licenses[0].showScanIcon = true;
                    }
                }
                break;
            default:
                return;
        }
        this.currentScan = newScan;
    }

    public async userWantsToProcessScannedData(
        scanData: string
    ): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            this.scanData = scanData;
            switch (this.currentScan) {
                case Enums.LocateLicensePickingScan.TargetLocation:
                    await this.processLocationScan(scanData);
                    await this.userInteraction.hideLoading();
                    break;
                case Enums.LocateLicensePickingScan.LicenseId:
                    await this.processLicenseScan(scanData);
                    break;
                case Enums.LocateLicensePickingScan.None:
                    await this.userInteraction.hideLoading();
                    break;
                default:
                    throw new Error(
                        Enums.CustomErrorCodes.InvalidInput.toString()
                    );
            }

            return Promise.resolve(Model.Factory.createSuccessOperation());
        } catch (error) {
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                !isNaN(error) ? error : Enums.CustomErrorCodes.InvalidInput,
                scanData
            );
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        error.message,
                        Enums.CustomErrorCodes.InvalidInput
                    )
                )
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    private async processLicenseScan(scanData: string): Promise<void> {
        if (this.currentLocation.targetLocation == null) {
            await this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.LocationDoesNotScanned,
                scanData
            );
            return Promise.resolve();
        }
        let license = _.find(
            this.currentLocation.licenses,
            (currentLicense: Model.LicenseDispatch) => {
                return currentLicense.showScanIcon;
            }
        );
        if (!(license && license.licenseId == Number(scanData.split("-")[0]))) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes
                    .LicenseScannedDoesNotMatchWithLicenseDispatch
            );
            return Promise.resolve();
        }

        let request = DataRequest.Factory.createRegisterForReplenishment(
            this.currentLocation.targetLocation,
            Number(scanData.split("-")[0]),
            this.settings.userCredentials.loginId.split("@")[0],
            this.settings.userCredentials
        );
        let result: DataResponse.Operation = await this.picking.registerForRePlenishment(
            request
        );
        if (result.Resultado === Enums.OperationResult.Success) {
            let license = _.find(
                this.currentLocation.licenses,
                (currentLicense: Model.LicenseDispatch) => {
                    return (
                        currentLicense.licenseId ==
                        Number(scanData.split("-")[0])
                    );
                }
            );
            license.currentLocation = this.currentLocation.targetLocation;
            license.isComplete = true;
            license.showScanIcon = false;

            let currentIndex = _.findIndex(
                this.currentLocation.licenses,
                currentLicense => {
                    return currentLicense.licenseId == license.licenseId;
                }
            );

            if (currentIndex != this.currentLocation.licenses.length - 1) {
                this.currentLocation.licenses[
                    currentIndex + 1
                ].showScanIcon = true;
            }

            this.markLocationAsComplete(this.currentLocation);
            this.backToGeneralPicking();
        } else {
            this.userInteraction.showCustomError(
                result.Codigo && result.Codigo > 0
                    ? result.Codigo
                    : Enums.CustomErrorCodes.UnknownError
            );
        }
        return Promise.resolve();
    }

    markLocationAsComplete(location: Model.LocationDispatch) {
        if (this.locateDispatch.isAllLicensesAllComplete(location)) {
            location.isComplete = true;
            location.showDetails = false;
            location.showScanIcon = false;
            location.icon = "arrow-dropright";
            this.markNextLocation(location);
        }
    }

    markNextLocation(location: Model.LocationDispatch) {
        let currentIndex = _.findIndex(this.locations, currentLocation => {
            return currentLocation.targetLocation == location.targetLocation;
        });

        if (currentIndex != this.locations.length - 1) {
            this.locations[currentIndex + 1].showScanIcon = true;
            this.currentLocation = this.locations[currentIndex + 1];
            this.currentScan = Enums.LocateLicensePickingScan.TargetLocation;
            this.currentLocation.showDetails = false;
            this.toggleDetails(this.currentLocation);
        }
    }



    private async processLocationScan(scanData: string): Promise<void> {
        if (await this.validateLocation(scanData)) {
            if (this.currentLocation.targetLocation != scanData) {
                await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes
                        .LocationScannedDoesNotMatchWithTargetLocationDispatch,
                    scanData
                );
                return Promise.resolve();
            }
            this.currentLocation.color = "favorite";
            let id: number = this.currentLocation.id;
            this.markLocationAsComplete(this.currentLocation);
            if (!this.locations[id].isComplete) {
                this.locations[id].showScanIcon = false;
                //si esta oculto lo muestro y si esta abierto no hago nada
                if (!this.locations[id].showDetails) {
                    this.locations[id].showDetails = true;
                    this.locations[id].icon = "arrow-dropdown";
                }
                this.userWantsToChangeCurrentScan(
                    Enums.LocateLicensePickingScan.LicenseId,
                    this.locations[id].licenses[0],
                    this.locations[id]
                );
            }
            this.backToGeneralPicking();
            return Promise.resolve();
        } else {
            return Promise.reject("Invalid location");
        }
    }

    private async validateLocation(location: string): Promise<boolean> {
        let request: DataRequest.ValidatedIfJoinSpotExists = DataRequest.Factory.createValidatedIfJoinSpotExists(
            location,
            this.settings.userCredentials
        );

        let result: DataResponse.Operation = await this.locationProvider.validateIfLocationExists(
            request
        );
        if (result.Resultado === Enums.OperationResult.Success) {
            return Promise.resolve(true);
        } else {
            return Promise.resolve(false);
        }
    }

    printLicenseDispatch(license: Model.LicenseDispatch) {
        this.stopEvent = true;
        if (license) {
            this.printLicense(license);
        }
    }

    async printLicense(license: Model.LicenseDispatch): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            let request: DataRequest.GetLicenseDispatchPrintFormat = DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(
                license.licenseId,
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

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    async goToLicenseInfo(license: Model.LicenseDispatch) {
        this.stopEvent = true;
        if (license) {
            let params: Model.LicenseInfoParams = {
                licenseId: license.licenseId
            };
            let alertMessage = await this.translate.translateGroupValue(
                Enums.Translation.Groups.Alerts,
                Enums.Translation.Alert.DoYouWantToProceedNewQuery
            );

            let navigationStack = this.navigation.tabs[2].navigationStack;

            if (navigationStack.length > 0) {
                let userConfirm: Enums.YesNo = await this.userInteraction.showConfirmMessage(
                    alertMessage
                );
                if (userConfirm === Enums.YesNo.Yes) {
                    this.navigation.currentTab.navigationStack.length = 0;
                } else {
                    return;
                }
            }
            await this.workspace.changeCurrentTab(
                Enums.Tab.InfoCenter,
                Enums.Page.InfoCenter
            );

            await this.navigation.pushPage(
                Enums.Page.LicenseInfo,
                this.workspace,
                this.workspace.infoCenterNavCtrl,
                params
            );
        }
    }
}
