import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { MaterialProvider } from "../../providers/material/material";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Enums } from "../../enums/enums";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { LicenseProvider } from "../../providers/license/license";
import { PrinterProvider } from "../../providers/printer/printer";
import { CheckpointProvider } from "../../providers/checkpoint/checkpoint";
import { ConfigurationProvider } from "../../providers/configuration/configuration";
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
    selector: "page-material-info",
    templateUrl: "material-info.html"
})
export class MaterialInfoPage {
    materialInfo: Model.Material;
    currentSegment: string = "skuDescription";
    licenseId: number;
    locationSpot: string;
    inventory: Array<Model.Inventory> = [];
    isMoreResults: boolean = false;
    checkpointChangeMaterialProperties: boolean = false;
    showRegime: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private material: MaterialProvider,
        private license: LicenseProvider,
        private printer: PrinterProvider,
        private checkpoint: CheckpointProvider,
        private configuration: ConfigurationProvider,
        private alertCtrl: AlertController
    ) {
        this.materialInfo = Model.Factory.createMaterial();
    }

    async ionViewDidEnter(): Promise<void> {
        await this.getParameterFiscal();
        
        try {
            let params = this.navParams.data;
            this.licenseId = params.licenseId;
            this.locationSpot = params.locationSpot;
            this.isMoreResults = params.isMoreResults;
            await this.getMaterial(params.materialId);

            if (this.materialInfo) {
                this.materialInfo.licenseId = this.licenseId;
                this.materialInfo.locationSpot = this.locationSpot;
                this.materialInfo.isMoreResults = this.isMoreResults;
                await this.getInventoryInfo(this.materialInfo.materialId);
            }
        } catch (reason) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        } finally {
            this.userInteraction.hideLoading();
        }
    }

    async getMaterial(materialId: string): Promise<void> {
        try {
            let materialRequest = DataRequest.Factory.createGetMaterialRequest(
                this.settings.userCredentials
            );
            materialRequest.materialId = materialId;

            this.materialInfo = await this.material.getMaterial(
                materialRequest
            );
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound,
                materialId
            );
            return this.navigation.popPage(
                this.workspace,
                this.navCtrl,
                {
                    licenseId: this.licenseId
                },
                this.isMoreResults ? 2 : 1
            );
        }
    }

    async getInventoryInfo(materialId: string): Promise<void> {
        try {
            let request = DataRequest.Factory.createGetInventoryByMaterialRequest(
                materialId,
                this.settings.userCredentials
            );

            this.inventory = await this.license.getInventoryByMaterial(
                request,
                this.settings.userCredentials
            );
            this.validateCheckPoint();
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async validateCheckPoint(): Promise<void> {
        try {
            let request = DataRequest.Factory.createGetCheckPointsByUserRequest(
                this.settings.userCredentials
            );

            let checkpoints = await this.checkpoint.getCheckPointsByUser(
                request
            );
            if (checkpoints && checkpoints.length > 0) {
                let checkpoint = checkpoints.find(check => {
                    return (
                        check.CHECK_ID ==
                        Enums.CheckPoints.OptionChangeMaterialProperties
                    );
                });
                if (checkpoint) {
                    this.checkpointChangeMaterialProperties = true;
                }
            }
        } catch (reason) {
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    showButtonChangeMaterial(): boolean {
        return this.checkpointChangeMaterialProperties;
    }

    isMasterPack(): boolean {
        return this.materialInfo.isMasterPack === Enums.YesNo.Yes;
    }

    handleSeries(): boolean {
        return this.materialInfo.serialNumberRequests === Enums.YesNo.Yes;
    }

    handleBatch(): boolean {
        return this.materialInfo.batchRequested === Enums.YesNo.Yes;
    }

    handleTone(): boolean {
        return this.materialInfo.handleTone === Enums.YesNo.Yes;
    }

    handleCaliber(): boolean{
        return this.materialInfo.handleCaliber === Enums.YesNo.Yes;
    }

    isVin(): boolean {
        return this.materialInfo.isCar === Enums.YesNo.Yes;
    }

    explodeInReception(): boolean {
        return this.materialInfo.explodeInReception === Enums.YesNo.Yes;
    }

    backButtonAction(): Promise<void> {
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl,
            {
                licenseId: this.licenseId,
                locationId: this.locationSpot
            },
            this.isMoreResults ? 2 : 1
        );
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

    async presentPrompt(): Promise<void>{
        let print_qty = await this.getParameterPrintQuantity();
        let max_qty = '20';
        if ( print_qty[0].VALUE != null || print_qty[0].VALUE != ''){
            max_qty = print_qty[0].VALUE
        }
        let alert = this.alertCtrl.create({
            title: 'Cantidad a Imprimir',
            inputs: [
            {
                name: 'Cantidad',
                placeholder: '',
                type: 'number',
            }
            ],
            buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: data => {
                }
            },
            {
                text: 'Imprimir',
                handler: data => {
                    if (parseInt(data.Cantidad)<= parseInt(max_qty)){
                        this.userWantsPrintMaterial(parseInt(data.Cantidad))
                    } else {
                        this.userInteraction.showError(` No se pueden imprimir mas de  ${max_qty}`);
                    }
                }  
            }
            ]
        });
        alert.present();
    }

    async userWantsPrintMaterial(n=1): Promise<void> {
        try {

            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
            }

            await this.userInteraction.showLoading();
            let request: DataRequest.GetMaterialPrintFormat = DataRequest.Factory.createGetMaterialPrintFormat(
                this.materialInfo.materialId,
                this.settings.userCredentials
            );


            request.barcodeId = null;
            request.login = this.settings.login;
            let result = await this.printer.getMaterialPrintFormat(request);



            await this.printer.printDocument(
                this.settings.printer,
                result.FORMAT,
                n
            );

            
            this.userInteraction.hideLoading();
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }

    async printUnitMeasurement(barcodeId: string): Promise<void> {
        try {


            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
            }

            await this.userInteraction.showLoading();
            let request: DataRequest.GetMaterialPrintFormat = DataRequest.Factory.createGetMaterialPrintFormat(
                this.materialInfo.materialId,
                this.settings.userCredentials
            );
            request.barcodeId = barcodeId;
            request.login = this.settings.login;
            let result = await this.printer.getMaterialPrintFormat(request);

            await this.printer.printDocument(
                this.settings.printer,
                result.FORMAT
            );

            this.userInteraction.hideLoading();
        } catch (e) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }

    modifyMaterial() {
        this.navigation.pushPage(
            Enums.Page.ModifyMaterialProperties,
            this.workspace,
            this.navCtrl,
            this.materialInfo
        );
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



    async getParameterPrintQuantity(): Promise<DataResponse.OP_WMS_SP_GET_PARAMETER[]>{
        try {
            let requestParameter = DataRequest.Factory.createGetParameterRequest(
                Enums.ParameterGroupId.System,
                Enums.ParameterId.MaxPrintingQuantity,
                this.settings.userCredentials
            );
            let parameter = await this.configuration.getParameter(requestParameter);
            return parameter;
        } catch (error) {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.DataNotFound
            );
        }
    }
}
