import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Enums } from "../../enums/enums";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { DeviceProvider } from "../../providers/device/device";
import { Subscription } from "rxjs/Subscription";
import { DataRequest, DataResponse } from "../../models/models";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { TranslateProvider } from "../../providers/translate/translate";
import { PhysicalCountProvider } from "../../providers/physical-count/physical-count";
import * as _ from "lodash";

@IonicPage()
@Component({
    selector: "page-physical-count",
    templateUrl: "physical-count.html"
})
export class PhysicalCountPage {
    completedForm: boolean = false;
    scanToken: Subscription;
    isAndroid: boolean = false;
    locationSpot: string;
    taskId: string;
    licenseId: number = 0;
    material: DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE = <DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>{};
    currentScan: Enums.PhysicalCountScan = Enums.PhysicalCountScan.LicenseId;
    serialNumber: string;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider,
        private device: DeviceProvider,
        private settings: UserSettingsProvider,
        private translate: TranslateProvider,
        private physicalCount: PhysicalCountProvider
    ) {}

    validateFields(){

    }

    async ionViewDidEnter(): Promise<void> {
        try {
            let params = this.navParams.data;
            this.locationSpot = params.locationSpot;
            this.taskId = params.taskId;

            this.isAndroid = this.device.isAndroid();
            this.scanToken = this.device.subscribeToScanner(data =>
                this.processBarcodeScan(data)
            );

            this.userInteraction.hideLoading();
        } catch (error) { console.log(error)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    ionViewDidLeave(): void {
        this.scanToken.unsubscribe();
    }

    processBarcodeScan(scanData: string): Promise<void> {
        this.processScan(scanData);
        return Promise.resolve();
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    changeCurrentScan(newScan: Enums.PhysicalCountScan): void {
        this.currentScan = newScan;
    }

    showScanIcon(option: Enums.PhysicalCountScan): boolean {
        return option === this.currentScan;
    }

    async showContextualMenu() {
        try {
            let messages = await Promise.all([
                this.translate.translateGroupValue(
                    Enums.Translation.Groups.Buttons,
                    Enums.Translation.Button.ShowCountMaterials
                ),
                this.translate.translateGroupValue(
                    Enums.Translation.Groups.Buttons,
                    Enums.Translation.Button.Cancel
                )
            ]);

            let buttons = [
                {
                    text: messages[0],
                    handler: async () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider

                        this.checkForCountMaterials();
                    }
                },
                {
                    text: messages[1],
                    role: "cancel",
                    handler: () => {
                        this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
                    }
                }
            ];

            return this.userInteraction.showOptionAlert(null, buttons);
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async checkForCountMaterials(): Promise<boolean> {
        try {
            this.userInteraction.showLoading();
            let request = DataRequest.Factory.createGetNextMaterialForCountRequest(
                Number(this.taskId),
                this.locationSpot,
                this.settings.userCredentials
            );

            let materials = await this.physicalCount.getNextMaterialForCount(
                request
            );

            if (materials) {
                this.navigation.pushPage(
                    Enums.Page.PhysicalCountMaterials,
                    this.workspace,
                    this.navCtrl,
                    {
                        taskId: this.taskId,
                        locationSpot: this.locationSpot,
                        materials: materials
                    }
                );
                return Promise.resolve(true);
            } else {
                this.userInteraction.hideLoading();
                return Promise.resolve(false);
            }
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        }
    }

    async finishLocation(): Promise<boolean> {
        console.log(this.material.MATERIAL_ID, this.material.QTY, this.material.MATERIAL_ID == null, this.material.MATERIAL_ID.replace(/\s/g, '').length < 1, this.material.QTY > 0)
        if (
            (this.material.MATERIAL_ID == null || this.material.MATERIAL_ID.replace(/\s/g, '').length < 1) &&
            !(this.material.QTY > 0)
        ) {
            //let x = await this.processMaterial(null, this.material.QTY);
            //console.log("Proces material", x);
            try {
                let message = await this.translate.translateGroupValue(
                    Enums.Translation.Groups.Alerts,
                    Enums.Translation.Alert.DoYouWishToContinue
                );
                //console.log("Message", message);
                //let confirmation = await this.userInteraction.showConfirmMessage(
                  //  message
                //);
                //console.log("Confirmacion", confirmation);
                //if (confirmation === Enums.YesNo.No) return;
        
                this.userInteraction.showLoading();
                let request = DataRequest.Factory.createFinishLocationRequest(
                    Number(this.taskId),
                    this.locationSpot,
                    this.settings.userCredentials
                );

                let result = await this.physicalCount.finishLocation(request);
                console.log("Physical Count", result);
                if (
                    result.RESULT === Enums.OK.OK ||
                    result.RESULT === Enums.OK.Completed
                ) {
                    this.navigation.popPage(this.workspace, this.navCtrl, {
                        taskId: this.taskId
                    });
                    return Promise.resolve(true);
                } else {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.BadRequest
                    );
                    return Promise.resolve(false);
                }
            } catch (error) { console.log(error)
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.UnknownError
                );
                return Promise.resolve(false);
            }
        }else{
            this.userInteraction.showMessage("Formulario incompleto")
        }
        
    }

    processScan(scanData: string): void {
        switch (this.currentScan) {
            case Enums.PhysicalCountScan.LicenseId:
                this.licenseId = Number(scanData.split("-")[0]);
                if (Number(this.licenseId) > 0) {
                    this.changeCurrentScan(
                        Enums.PhysicalCountScan.MaterialBarcode
                    );
                    this.material = <DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>{
                        MATERIAL_ID: "",
                        MATERIAL_NAME: "",
                        SHORT_NAME: "",
                        SERIAL_NUMBER_REQUESTS: 0,
                        BATCH_REQUESTED: 0,
                        LICENSE_ID: 0,
                        BATCH: "",
                        UNIT: "Unidad Base 1x1",
                        UNIT_QTY: 1,
                        EXPIRATION_DATE: new Date(),
                        QTY: 0
                    };
                    this.serialNumber = "";
                } else {
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.InvalidInput,
                        scanData
                    );
                }
                break;
            case Enums.PhysicalCountScan.MaterialBarcode:
                this.processMaterialScan(scanData);
                this.serialNumber = "";
                break;
            case Enums.PhysicalCountScan.SerialNumber:
                this.processMaterial(scanData, 1);
                this.serialNumber = "";
                break;
            default:
                this.processMaterial(scanData, 1);
                break;
        }
    }

    async processMaterialScan(scanData: string): Promise<boolean> {
        try {
            this.userInteraction.showLoading();

            let request = DataRequest.Factory.createGetMaterialByBarcodeRequest(
                scanData,
                this.licenseId,
                this.settings.userCredentials
            );
            let result = await this.physicalCount.getMaterialByBarcodeForPhysicalCount(
                request
            );

            if (result.length > 0) {
                this.material = _.first(result);
                this.userInteraction.hideLoading();
                this.changeCurrentScan(Enums.PhysicalCountScan.SerialNumber);
                this.completedForm = false;
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidInput,
                    scanData
                );
                return Promise.resolve(false);
            }
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        }
    }

    async processMaterial(serial: string, qty: number): Promise<boolean> {
        try {
            this.userInteraction.showLoading();

            let request = DataRequest.Factory.createValidateRecountedMaterialForTaskRequest(
                Number(this.taskId),
                this.locationSpot,
                this.licenseId,
                this.material.MATERIAL_ID,
                this.material.BATCH ? this.material.BATCH : null,
                serial,
                this.settings.userCredentials
            );

            let result = await this.physicalCount.validateRecountedMaterialForTask(
                request
            );

            if (result.Mensaje !== Enums.OK.OK) {
                let buttonText = await Promise.all([
                    this.translate.translateGroupValue(
                        Enums.Translation.Groups.Buttons,
                        Enums.Translation.Button.Add
                    ),
                    this.translate.translateGroupValue(
                        Enums.Translation.Groups.Buttons,
                        Enums.Translation.Button.Replace
                    )
                ]);

                let buttons = [
                    {
                        text: buttonText[0],
                        handler: () => {
                            this.insertCount(
                                qty,
                                serial,
                                Enums.ReceptionAction.Add
                            );
                            this.userInteraction.activeAlert = null;
                        }
                    },
                    {
                        text: buttonText[1],
                        handler: () => {
                            this.insertCount(
                                qty,
                                serial,
                                Enums.ReceptionAction.Update
                            );
                            this.userInteraction.activeAlert = null;
                        }
                    }
                ];

                await this.userInteraction.hideLoading();
                this.userInteraction.showOptionAlert(
                    null,
                    buttons,
                    Enums.Translation.Alert.MaterialAlreadyInLicense
                );
            } else {
                return this.insertCount(
                    qty,
                    serial,
                    Enums.ReceptionAction.Insert
                );
            }
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.serialNumber = "";
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        }
    }

    async insertCount(
        qty: number,
        serial: string,
        type: Enums.ReceptionAction
    ): Promise<boolean> {
        try {
            let insertReq = DataRequest.Factory.createInsertCountExecutionOperationRequest(
                Number(this.taskId),
                this.locationSpot,
                this.licenseId,
                this.material.MATERIAL_ID,
                qty * this.material.UNIT_QTY,
                this.material.BATCH ? this.material.EXPIRATION_DATE : null,
                this.material.BATCH ? this.material.BATCH : null,
                serial,
                type,
                this.settings.userCredentials
            );

            let insertResult = await this.physicalCount.insertCountExecutionOperation(
                insertReq
            );

            if (insertResult.Resultado === Enums.OperationResult.Success) {
                if (this.material.SERIAL_NUMBER_REQUESTS === Enums.YesNo.No) {
                    this.material = <DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>{
                        MATERIAL_ID: "",
                        MATERIAL_NAME: "",
                        SHORT_NAME: "",
                        SERIAL_NUMBER_REQUESTS: 0,
                        BATCH_REQUESTED: 0,
                        LICENSE_ID: 0,
                        UNIT: "Unidad Base 1x1",
                        UNIT_QTY: 1,
                        BATCH: "",
                        EXPIRATION_DATE: new Date(),
                        QTY: 0
                    };
                    this.currentScan = Enums.PhysicalCountScan.MaterialBarcode;
                    this.completedForm = true;
                }
                this.serialNumber = "";
                this.userInteraction.hideLoading();
                return Promise.resolve(true);
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(insertResult.Codigo);
                this.serialNumber = "";
                return Promise.resolve(false);
            }
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.serialNumber = "";
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            return Promise.resolve(false);
        }
    }

    keyPressSerial(keyCode: Enums.KeyCode): void {
        if (
            keyCode === Enums.KeyCode.Enter &&
            this.material.MATERIAL_ID &&
            this.serialNumber
        ) {
            this.processMaterial(this.serialNumber, 1);
        }
    }

    keyPressQuantity(keyCode: Enums.KeyCode): void {
        if (
            keyCode === Enums.KeyCode.Enter &&
            this.material.MATERIAL_ID &&
            this.material.QTY > 0
        ) {
            this.completedForm = true;
            this.processMaterial(null, this.material.QTY);
        }
    }

    backButtonAction() {
        this.navigation.popPage(this.workspace, this.navCtrl, {
            taskId: this.taskId
        });
    }
}
