import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { PickingProvider } from "../../providers/picking/picking";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { Enums } from "../../enums/enums";
import { Subscription } from "rxjs/Subscription";
import { DeviceProvider } from "../../providers/device/device";
import { LocationProvider } from "../../providers/location/location";
import { ChargeProvider } from "../../providers/charge/charge";
import { LabelProvider } from "../../providers/label/label";
import { PrinterProvider } from "../../providers/printer/printer";
import * as _ from "lodash";
import { TransactionOperatorProvider } from "../../providers/transaction-operator/transaction-operator";
import { MaterialProvider } from "../../providers/material/material";
import { LicenseProvider } from "../../providers/license/license";
import { GeneralTransferProvider } from "../../providers/general-transfer/general-transfer";
@IonicPage()
@Component({
    selector: "page-process-general-picking",
    templateUrl: "process-general-picking.html"
})
export class ProcessGeneralPickingPage {
    task: Model.Task = Model.Factory.createTask();
    processSku: Model.ProcessSku = Model.Factory.createProcessSku();
    taskHeader: Model.PickingTaskHeader;
    currentScan: Enums.PickingScan;
    scanToken: Subscription;
    scanData: string = "";
    labelId: number;
    isAndroid: boolean = false;
    materials: Array<
        DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
    >;
    licenseDispatchId: number = 0;
    shelfSpot: DataResponse.ShelfSpot = Model.Factory.createShelfSpot();
    regimenTask: Enums.Regime = Enums.Regime.General;
    isGeneralTransfer: boolean = false;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private pickingProvider: PickingProvider,
        private location: LocationProvider,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private device: DeviceProvider,
        private chargeProvider: ChargeProvider,
        private label: LabelProvider,
        private printer: PrinterProvider,
        private picking: PickingProvider,
        private transactionOperator: TransactionOperatorProvider,
        private materialProvider: MaterialProvider,
        private license: LicenseProvider,
        private generalTransfer: GeneralTransferProvider
    ) {}

    async backButtonAction(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            if (
                this.taskHeader.Material.serialNumberRequests ===
                Enums.YesNo.Yes
            ) {
                await this.userWantsToRollbackSeries();
            }
            this.userInteraction.activeAlert = null; //FIXME: code should be handled in user interaction provider
            let result = await this.rollbackLabel();
            if (result.Resultado === Enums.OperationResult.Success) {
                this.userInteraction.hideLoading();
                if (this.isGeneralTransfer) {
                    return await this.navigationPopPage({
                        wavePickingId: this.task.wavePickingId,
                        regime: this.regimenTask,
                        task: this.task
                    });
                } else {
                    return await this.navigationPopPage({
                        wavePickingId: this.task.wavePickingId,
                        regime: this.regimenTask,
                        task: this.task
                    });
                }
            } else {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async rollbackLabel(): Promise<DataResponse.Operation> {
        let request: DataRequest.DeletePickingLabel = DataRequest.Factory.createDeletePickingLabelRequest(
            this.labelId,
            this.settings.userCredentials
        );

        return this.label.deletePickingLabel(request);
    }

    userWantsToChangeCurrentScan(newScan: Enums.PickingScan) {
        switch (newScan) {
            case Enums.PickingScan.LicenseId:
                if (this.processSku.sourceLocation.length <= 0) return;
                if (this.shelfSpot.allowFastPicking == 1) return;
                break;
            case Enums.PickingScan.MaterialBarcode:
                if (
                    !this.processSku.licenseId &&
                    this.processSku.licenseId <= 0
                )
                    return;
                if (this.processSku.sourceLocation.length <= 0) return;
                break;
            case Enums.PickingScan.SourceLocation:
                this.currentScan = newScan;
                return;
            default:
                return;
        }
        this.currentScan = newScan;
    }

    showScanIcon(option: Enums.PickingScan): boolean {
        if (
            option === Enums.PickingScan.LicenseId &&
            this.shelfSpot.allowFastPicking == 1
        ) {
            return false;
        } else {
            return option === this.currentScan;
        }
    }

    scanBarcode(): Promise<any> {
        return this.device.scan();
    }

    async ionViewDidEnter() {
        try {            
            this.isAndroid = this.device.isAndroid();
            let params: Model.ProcessGeneralPickingParams = this.navParams.data;
            this.task = null;
            this.task = params.task;
            this.task.quantityPendingWithUnitMsr = this.task.quantityPending;
            this.taskHeader = params.taskHeader;
            this.labelId = params.labelId;
            this.materials = params.materials;
            this.licenseDispatchId = params.labelDispatchId;
            this.regimenTask = params.regime;
            this.isGeneralTransfer = params.isGeneralTransfer || false;

            this.shelfSpot = await this.location.getLocation(
                DataRequest.Factory.createGetLocationRequest(
                    this.task.locationSpotSource,
                    this.settings.userCredentials
                )
            );
            if (this.shelfSpot.allowFastPicking == 1) {
                this.processSku.licenseId = this.task.licenseIdSource;
            }

            this.scanToken = this.device.subscribeToScanner(data =>
                this.userWantToProcessScannedData(data)
            );
            this.userWantsToChangeCurrentScan(Enums.PickingScan.SourceLocation);

            if (this.navParams.data.processSku) {
                this.processSku = this.navParams.data.processSku;
                if (!params.completeScanSeries) {
                    this.processSku.sourceLocation = null;
                    this.processSku.materialBarcode = null;
                    this.currentScan = Enums.PickingScan.SourceLocation;
                } else {
                    this.currentScan = Enums.PickingScan.None;
                }
            } else {
                this.processSku.wavePickingId = this.task.wavePickingId;
                this.processSku.materialId = this.task.materialId;
            }
        } catch (reason) { console.log(reason)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.LoadPage
            );
        }
        this.userInteraction.hideLoading();
    }

    public async userWantToProcessScannedData(
        scanData: string
    ): Promise<Model.Operation> {
        try {
            await this.userInteraction.showLoading();
            this.scanData = scanData;
            switch (this.currentScan) {
                case Enums.PickingScan.SourceLocation:
                    await this.processLocationScan(scanData);
                    await this.userInteraction.hideLoading();
                    break;
                case Enums.PickingScan.MaterialBarcode:
                    await this.processMaterialScan(scanData);
                    break;
                case Enums.PickingScan.LicenseId:
                    await this.processLicenseScan(scanData);
                    await this.userInteraction.hideLoading();
                    break;
                case Enums.PickingScan.None:
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

    private async processLocationScan(scanData: string): Promise<void> {
        if (await this.validateLocation(scanData)) {
            this.processSku.sourceLocation = scanData;
            if (this.shelfSpot.allowFastPicking == 1) {
                this.processSku.licenseId = this.task.licenseIdSource;
                this.userWantsToChangeCurrentScan(
                    Enums.PickingScan.MaterialBarcode
                );
            } else {
                this.userWantsToChangeCurrentScan(Enums.PickingScan.LicenseId);
                this.processSku.licenseId = null;
                this.processSku.materialBarcode = "";
            }

            let shelfSpot = await this.location.getLocation(
                DataRequest.Factory.createGetLocationRequest(
                    scanData,
                    this.settings.userCredentials
                )
            );
            this.processSku.useMt2 =
                shelfSpot.spotType === Enums.LocationType.Floor;
            this.processSku.locationType = shelfSpot.spotType;
            return Promise.resolve();
        } else {
            return Promise.reject("Invalid location");
        }
    }

    private async validateLocation(location: string): Promise<boolean> {
        if (
            location.toUpperCase() ===
            this.task.locationSpotSource.toUpperCase()
        )
            return Promise.resolve(true);

        if (this.taskHeader.Material.batchRequested === Enums.YesNo.Yes) {
            let newTask = this.taskHeader.Tasks.find((task: Model.Task) => {
                return task.locationSpotSource === location;
            });
            if (newTask) {
                this.task = newTask;
            }
            return Promise.resolve(!!newTask);
        } else if (this.taskHeader.Material.batchRequested === Enums.YesNo.No) {
            this.processSku.sourceLocation = location;
            let response: Array<DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE> = await this.pickingProvider.ValidateIfPickingLicenseIsAvailable(
                DataRequest.Factory.createValidateIfPickingLicenseIsAvailableRequest(
                    this.processSku,
                    this.settings.userCredentials
                )
            );
            if (response.length > 0) {
                if (this.shelfSpot.allowFastPicking == 0) {
                    this.task.licenseIdSource = null;
                }
                this.processSku.sourceLocation = location;
                return Promise.resolve(true);
            } else {
                this.processSku.sourceLocation = "";
                return Promise.resolve(false);
            }
        } else {
            return Promise.resolve(false);
        }
    }

    private async processMaterialScan(scanData: string): Promise<void> {
        let material = _.find(this.materials, m => {
            return (
                m.MATERIAL_ID === this.task.materialId &&
                (scanData === m.BARCODE_ID || scanData === m.ALTERNATE_BARCODE)
            );
        });

        if (material) {
            let convertedQty = this.task.quantityPending / material.QTY;
            if (convertedQty <= 0) {
                this.userInteraction.hideLoading();
                return Promise.reject(
                    Enums.CustomErrorCodes.InputExceedsTasksAssignedQuantity
                );
            }

            this.processSku.materialBarcode = scanData;
            this.processSku.quantity = convertedQty;
            this.processSku.unitMsr = `${material.MEASUREMENT_UNIT} 1x${material.QTY}`;
            this.processSku.unitMsrQty = material.QTY;
            this.task.quantityPendingWithUnitMsr = convertedQty;

            let requestGetInfoBatch = DataRequest.Factory.createGetInfoBatch(
                this.processSku.materialId,
                this.processSku.licenseId,
                this.settings.userCredentials
            );
            let result = await this.materialProvider.getInfoBatch(
                requestGetInfoBatch
            );
            this.processSku.batch = result.BATCH;
            this.processSku.dateExpiration = result.DATE_EXPIRATION;

            if (
                this.taskHeader.Material.serialNumberRequests ===
                Enums.YesNo.Yes
            ) {
                this.processSku.requestSerial = true;
                this.navigationPage(Enums.Page.ProcessGeneralPickingSeries, {
                    taskHeader: this.taskHeader,
                    task: this.task,
                    processSku: this.processSku,
                    labelId: this.labelId,
                    materials: this.materials,
                    labelDispatchId: this.licenseDispatchId,
                    regime: this.regimenTask
                });
            } else {
                this.userInteraction.hideLoading();
            }
            return Promise.resolve();
        } else {
            this.userInteraction.hideLoading();
            return Promise.reject(Enums.CustomErrorCodes.InvalidInput);
        }
    }

    private async processLicenseScan(scanData: string): Promise<void> {
        let licenseCode = scanData.split("-");
        let licenseId =
            licenseCode.length > 0 ? Number(licenseCode[0]) : Number(scanData);

        let isValidLicense = await this.validateLicense(licenseId);
        if (isNaN(licenseId) || !isValidLicense) {
            return Promise.reject(Enums.CustomErrorCodes.InvalidInput);
        }
        this.processSku.licenseId = licenseId;
        this.processSku.materialBarcode = "";
        this.task.licenseIdSource = licenseId;
        this.userWantsToChangeCurrentScan(Enums.PickingScan.MaterialBarcode);
        return Promise.resolve();
    }

    private async validateLicense(licenseId: number): Promise<boolean> {
        if (licenseId === this.task.licenseIdSource)
            return Promise.resolve(true);

        if (this.taskHeader.Material.batchRequested === Enums.YesNo.Yes) {
            let newTask = this.taskHeader.Tasks.find((task: Model.Task) => {
                return (
                    task.licenseIdSource === licenseId &&
                    task.locationSpotSource === this.processSku.sourceLocation
                );
            });
            if (newTask) {
                this.task = newTask;
            }
            return Promise.resolve(!!newTask);
        } else if (this.taskHeader.Material.batchRequested === Enums.YesNo.No) {
            this.processSku.licenseId = licenseId;
            let response: Array<DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE> = await this.pickingProvider.ValidateIfPickingLicenseIsAvailable(
                DataRequest.Factory.createValidateIfPickingLicenseIsAvailableRequest(
                    this.processSku,
                    this.settings.userCredentials
                )
            );
            if (response.length > 0) {
                this.processSku.licenseId = licenseId;
                this.processSku.quantity =
                    response[0].QUANTITY_PENDING > response[0].QTY
                        ? response[0].QTY
                        : response[0].QUANTITY_PENDING;
                return Promise.resolve(true);
            } else {
                this.processSku.licenseId = null;
                return Promise.resolve(false);
            }
        } else {
            return Promise.resolve(false);
        }
    }

    public async userWantsToProcessPicking(): Promise<boolean> {
        try {
            await this.userInteraction.showLoading();

            if (
                this.processSku.quantity > this.task.quantityPendingWithUnitMsr
            ) {
                await this.userInteraction.hideLoading();
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.InvalidQuantity
                );
                return Promise.resolve(false);
            }

            if (!this.isGeneralTransfer) {
                let dataRequest: DataRequest.RegisterGeneralDispatchByRegimeGeneral = DataRequest.Factory.createRegisterGeneralDispatchByRegimeGeneral(
                    this.processSku,
                    this.task,
                    this.licenseDispatchId,
                    this.settings.userCredentials
                );
                let operation: DataResponse.Operation = await this.pickingProvider.registerGeneralDispatchByRegimeGeneral(
                    dataRequest
                );

                if (operation.Resultado !== Enums.OperationResult.Success) {
                    await this.userInteraction.hideLoading();
                    await this.userInteraction.showCustomError(
                        operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : Enums.CustomErrorCodes.UnknownError
                    );
                    return Promise.resolve(false);
                }
                await this.saveLog();
            } else {
                let isLicenseQtyLess = await this.isLicenseQtyLess(
                    this.processSku.quantity * this.processSku.unitMsrQty
                );

                if (isLicenseQtyLess) {
                    await this.userInteraction.hideLoading();
                    this.userInteraction.showCustomError(
                        Enums.CustomErrorCodes.InvalidQuantity
                    );
                    return Promise.resolve(false);
                }

                let dataRequest: DataRequest.RegisterGeneralTransferPicking = DataRequest.Factory.createRegisterGeneralTransferPickingRequest(
                    this.processSku,
                    this.task,
                    this.processSku.usedMt2,
                    this.licenseDispatchId,
                    this.settings.userCredentials
                );

                let operation: DataResponse.Operation = await this.generalTransfer.registerGeneralTransferPicking(
                    dataRequest
                );

                if (operation.Resultado !== Enums.OperationResult.Success) {
                    await this.userInteraction.hideLoading();
                    await this.userInteraction.showCustomError(
                        operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : Enums.CustomErrorCodes.UnknownError
                    );
                    return Promise.resolve(false);
                }
                await this.saveLog();
            }

            let requestLabel = DataRequest.Factory.createUpdatePickingLabelRequest(
                this.labelId,
                this.task.clientOwner,
                this.processSku.licenseId,
                this.processSku.materialBarcode,
                this.processSku.quantity * this.processSku.unitMsrQty,
                this.task.targetPolicyCode,
                this.processSku.sourceLocation,
                this.task.locationSpotTarget,
                this.settings.login,
                this.task.id.toString(),
                this.task.wavePickingId,
                this.settings.userCredentials
            );

            await this.label.updatePickingLabel(requestLabel);

            let request = DataRequest.Factory.createChargeByMobileRequest(
                this.task.licenseIdSource,
                Enums.TransType.Picking,
                this.settings.userCredentials
            );
            let charges = await this.chargeProvider.getCharges(request);
            if (charges.length) {
                if (this.isGeneralTransfer) {
                    
                    this.navigationPage(Enums.Page.LicenseCharges, <
                        Model.LicenseChargesParam
                    >{
                        charges: charges,
                        licenseId: this.licenseDispatchId,
                        wavePickingId: this.task.wavePickingId,
                        transType: Enums.TransType.Picking,
                        times: 1,
                        regime: this.regimenTask,
                        task: this.task
                    });
                } else {
                    this.navigationPage(Enums.Page.LicenseCharges, <
                        Model.LicenseChargesParam
                    >{
                        charges: charges,
                        licenseId: this.task.licenseIdSource,
                        wavePickingId: this.task.wavePickingId,
                        transType: Enums.TransType.Picking,
                        times: 1,
                        regime: this.regimenTask,
                        task: this.task
                    });
                }
            } else {
                if (this.isGeneralTransfer) {
                    this.navigationPopPage({
                        wavePickingId: this.task.wavePickingId,
                        regime: this.regimenTask,
                        task: this.task
                    });
                } else {
                    this.navigationPopPage({
                        wavePickingId: this.task.wavePickingId,
                        regime: this.regimenTask,
                        task: this.task
                    });
                }
            }
            return Promise.resolve(true);
        } catch (error) { console.log(error)
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.InternalServerError
            );
            return Promise.resolve(false);
        }
    }

    private saveLog(): Promise<void> {
        try {
            this.transactionOperator.addTransactionByOperator({
                dateCreated: new Date(),
                licenseId: this.task.licenseIdSource,
                location: this.task.locationSpotSource,
                materialId: this.processSku.materialId,
                materialName: this.task.materialName,
                qty: this.processSku.quantity,
                taskType: Enums.TaskTypeLog.Picking,
                taskId: this.task.wavePickingId,
                loginId: this.settings.userCredentials.loginId
            });
        } catch (error) { console.log(error)
            this.userInteraction.toast(
                "Error at save log transaction:",
                Enums.ToastTime.Short
            );
        }
        return Promise.resolve();
    }

    ionViewDidLeave() {
        this.scanToken.unsubscribe();
    }

    public async userWantsToRollbackSeries(): Promise<void> {
        try {
            await this.userInteraction.showLoading();
            let request: DataRequest.RollbackSerialNumbersOnProcess = DataRequest.Factory.createRollbackSerialNumbersOnProcessRequest(
                this.task.licenseIdSource,
                this.task.wavePickingId,
                this.task.materialId,
                Enums.TaskType.GeneralDispatch,
                this.settings.userCredentials
            );
            let response: DataResponse.Operation = await this.pickingProvider.rollbackSerialNumbersOnProcess(
                request
            );
            if (response.Resultado === Enums.OperationResult.Success) {
                return Promise.resolve();
            } else {
                await this.userInteraction.hideLoading();
                await this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.DataBaseError
                );
            }
        } catch (reason) { console.log(reason)
            await this.userInteraction.hideLoading();
            await this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
        return Promise.resolve();
    }

    public async printLabel(): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            let request: DataRequest.GetLabelPrintFormat = DataRequest.Factory.createGetLabelPrintFormatRequest(
                this.labelId,
                this.settings.userCredentials
            );

            let format = await this.printer.getLabelPrintFormat(request);

            await this.printer.printDocument(
                this.settings.printer,
                format.FORMAT
            );
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async insertLicenseDispatch(): Promise<void> {
        let insertLicenseDispatchRequest: DataRequest.InsertLicenseDispatch = DataRequest.Factory.createInsertLicenseDispatch(
            this.task.wavePickingId,
            this.settings.userCredentials
        );
        let result: DataResponse.Operation = await this.picking.insertLicenseDispatch(
            insertLicenseDispatchRequest
        );
        if (result.Resultado === Enums.OperationResult.Success) {
            this.licenseDispatchId = parseInt(result.DbData);
        } else {
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(
                result.Codigo && result.Codigo > 0
                    ? result.Codigo
                    : Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    async printLicenseDispatch(): Promise<void> {
        try {
            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }
            let request: DataRequest.GetLicenseDispatchPrintFormat = DataRequest.Factory.createGetLicenseDispatchPrintFormatRequest(
                this.licenseDispatchId,
                this.settings.userCredentials
            );

            let format = await this.printer.getLicenseDispatchPrintFormat(
                request
            );

            await this.printer.printDocument(
                this.settings.printer,
                format.FORMAT
            );
        } catch (e) { console.log(e)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
        }
    }

    navigationPage(page: Enums.Page, params: any) {
        this.navigation.pushPage(page, this.workspace, this.navCtrl, params);
    }

    navigationPopPage(params: any) {
        this.navigation.popPage(this.workspace, this.navCtrl, params);
    }

    async isLicenseQtyLess(qtyWithMsrUnit: number): Promise<boolean> {
        let requestInvXLicense: DataRequest.GetInventoryByLicense = DataRequest.Factory.createGetInventoryByLicenseRequest(
            this.task.licenseIdSource,
            this.settings.userCredentials
        );
        let inventory = await this.license.getInventoryByLicense(
            requestInvXLicense,
            this.settings.userCredentials
        );
        let licenseInfo: Model.Inventory = _.first(inventory);
        if (qtyWithMsrUnit > licenseInfo.qty) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }
}
