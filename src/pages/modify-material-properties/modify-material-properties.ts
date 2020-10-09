import { Component, ViewChild } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest } from "../../models/models";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Enums } from "../../enums/enums";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { MaterialProvider } from "../../providers/material/material";
import { TranslateProvider } from "../../providers/translate/translate";

@IonicPage()
@Component({
    selector: "page-modify-material-properties",
    templateUrl: "modify-material-properties.html"
})
export class ModifyMaterialPropertiesPage {
    @ViewChild("alternateBarcode") alternateBarcodeInput: any;

    materialInfo: Model.Material;
    currentScan: Enums.ModifyMaterialScan;
    scanToken: Subscription;
    scanData: string = "";
    isAndroid: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private device: DeviceProvider,
        private userInteraction: UserInteractionProvider,
        private translateProvider: TranslateProvider,
        private settings: UserSettingsProvider,
        private material: MaterialProvider
    ) {
        this.materialInfo = Model.Factory.createMaterial();
    }

    async ionViewDidEnter() {
        this.isAndroid = this.device.isAndroid();
    }

    async ionViewDidLoad() {
        try {
            await this.userInteraction.showLoading();
            this.isAndroid = this.device.isAndroid();
            this.materialInfo = <Model.Material>this.navParams.data;

            this.scanToken = this.device.subscribeToScanner(data =>
                this.userWantToProcessScannedData(data)
            );
            this.userWantsToChangeCurrentScan(Enums.ModifyMaterialScan.Barcode);

            await this.userInteraction.hideLoading();
        } catch (exception) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(exception);
        }
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            this.materialInfo
        );
    }

    userWantsToChangeCurrentScan(newScan: Enums.ModifyMaterialScan) {
        this.currentScan = newScan;
    }

    showScanIcon(option: Enums.ModifyMaterialScan): boolean {
        return option === this.currentScan;
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    public async userWantToProcessScannedData(
        scanData: string
    ): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            this.scanData = scanData;
            switch (this.currentScan) {
                case Enums.ModifyMaterialScan.Barcode:
                    this.materialInfo.newBarcode = scanData;
                    this.userWantsToChangeCurrentScan(
                        Enums.ModifyMaterialScan.AlternateBarcode
                    );
                    await this.userInteraction.hideLoading();
                    break;
                case Enums.ModifyMaterialScan.AlternateBarcode:
                    this.materialInfo.newAlternateBarcode = scanData;
                    await this.userInteraction.hideLoading();
                    break;
                default:
                    throw new Error(
                        Enums.CustomErrorCodes.InvalidInput.toString()
                    );
            }
            return Promise.resolve(Model.Factory.createSuccessOperation());
        } catch (error) { console.log(error)
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
        }
    }

    async modifyMaterial(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let request = DataRequest.Factory.createUpdateMaterialPropertiesRequest(
                this.materialInfo,
                this.settings.userCredentials
            );

            let result = await this.material.updateMaterialProperties(request);
            if (result.Resultado === Enums.OperationResult.Success) {
                await this.userInteraction.hideLoading();
                await this.userInteraction.showMessage(
                    await this.translateProvider.translateGroupValue(
                        Enums.Translation.Groups.Messages,
                        "Successful_process_"
                    )
                );
                await this.navigation.popPage(
                    this.workspace,
                    this.navCtrl,
                    this.materialInfo
                );
                this.userInteraction.hideLoading();
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    public keyPressScan(key: number): void {
        if (key === Enums.KeyCode.Enter) {
            switch (this.currentScan) {
                case Enums.ModifyMaterialScan.Barcode:
                    this.userWantsToChangeCurrentScan(
                        Enums.ModifyMaterialScan.AlternateBarcode
                    );
                    this.alternateBarcodeInput.setFocus();
                    break;
            }
        }
    }
}
