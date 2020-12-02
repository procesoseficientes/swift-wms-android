import { Enums } from "../enums/enums";

export namespace Docs {
    export interface Document {
        _rev?: string;
        _id?: string;
        sequence?: number;
        _index?: number;
        docType: string;
        _deleted?: boolean;
    }

    export interface CurrencyDoc {
        _rev: string;
        _id: string;
        currency: Model.Currency;
        docType: string;
    }

    export interface RuleDoc {
        _rev: string;
        _id: string;
        rule: Model.Rule;
        docType: string;
    }

    export interface ParameterDoc {
        _rev: string;
        _id: string;
        parameter: Model.Parameter;
        docType: string;
    }

    export interface TaskList extends Document, Model.Task {}

    export class Factory {
        public static createCurrency(doc: any): CurrencyDoc {
            return {
                _rev: doc._rev,
                _id: doc._id,
                currency: Model.Factory.createCurrency(doc.currency),
                docType: Enums.Prefixes.Currency
            };
        }
    }
}

export namespace DataRequest {
    export interface GetPrintPassFormatByHH extends Model.UserCredentials {
        passId: number;
        loginId: string;
    }

    export interface Login extends Model.UserCredentials {}
    export interface GetBroadcastLost extends Model.UserCredentials {}
    export interface RemoveBroadcast extends Model.UserCredentials {
        broadcast: Model.Broadcast;
    }

    export interface GetTaskDetailForReceptionConsolidated
        extends Model.UserCredentials {
        serialNumber: number;
    }

    export interface AddSeriesRank extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
        batch: string;
        dateExpiration: Date;
        prefix: string;
        startValue: string;
        endValue: string;
        sufix: string;
        status: number;
        operationType: Enums.TaskType;
        wavePickingId: number;
    }

    export interface GetSuggestedDispatchLicense extends Model.UserCredentials {
        materialId: string;
        wavePickingId: number;
        projectId?: string;
    }

    export interface GetWavePickingPendingToDispatch
        extends Model.UserCredentials {
        wavePickingId: number;
    }

    export interface GetWavePickingPendingToLocate
        extends Model.UserCredentials {
        loginUser: string;
    }

    export interface Reception extends Model.UserCredentials {
        regime: Enums.Regime;
        serialNumber: number;
        taskAssignedTo: string;
        transType: Enums.TransType;
        login: string;
        policyCode: string;
        taskId: number;
        status: string;
        completeTask: Enums.YesNo;
    }

    export interface ValidateInventoryForRealloc extends Model.UserCredentials {
        materialId: string;
        sourceLicense: number;
        quantityUnits: number;
    }

    export interface LastLicenseReallocByUser extends Model.UserCredentials {
        licenseId: number;
        login: string;
    }

    export interface GetMaterial extends Model.UserCredentials {
        materialId: string;
        clientOwner: string;
        barcodeId: string;
        alternateBarcode: string;
    }

    export interface CreateLicense extends Model.UserCredentials {
        codePolicy: string;
        login: string;
        licenseId: number;
        clientOwner: string;
        regime: Enums.Regime;
        result: string;
        taskId: number;
        location: string;
    }

    // -----------------------------------------------------------------------------
    export interface CreateTask extends Model.UserCredentials {
        createBy: String;
        taskType: String;
        taskAssignedTo: String;
        isAccepted: number;
        isComplete: number;
        isPaused: number;
        isCanceled: number;
        regimen: Enums.Regime;
        assignedDate: Date;
        acceptedDate: Date;
        completedDate: Date;
        canceledDate: Date;
        canceledBy: String;
        lastUpdate: Date;
        lastUdateBy: String;
        priority: Number;
        comments: String
    }

    export interface CompleteRealloc extends Model.UserCredentials {
        taskId: number;
    }

    export interface CancelTask extends Model.UserCredentials {
        taskId: number;
    }

    export interface CompleteCount extends Model.UserCredentials {
        taskId: number;
    }

    export interface GetScannedMaterialByLicenseInReceptionTask
        extends Model.UserCredentials {
        barcode: string;
        clientOwner: string;
        licenseId: number;
        taskId: number;
    }

    export interface AddMaterialToLicense extends Model.UserCredentials {
        licenseId: number;
        barcode: string;
        qty: number;
        lastLogin: string;
        volumeFactor: number;
        weight: number;
        comments: string;
        serial: string;
        tradeAgreementId: string;
        totalMaterials: number;
        status: string;
        result: string;
        dateExpiration: Date;
        vin: string;
        batch: string;
        paramName: string;
        action: Enums.ReceptionAction;
        tone: string;
        caliber: string;
        enteredMeasurementUnit: string;
        enteredMeasurementUnitQty: number;
        enteredMeasurementUnitConversionFactor: number;
        sourceLicenseId?: number;
    }
    export interface SuggestedLocation extends Model.UserCredentials {
        licenseId: number;
        zone: string;
        warehouse: string;
        location: string;
    }

    export interface RegisterGeneralDispatch extends Model.UserCredentials {
        loginId: string;
        clientOwner: string;
        materialId: string;
        materialBarcode: string;
        sourceLicense: number;
        sourceLocation: string;
        quantityUnits: number;
        codePolicy: string;
        wavePickingId: number;
        serialNumber: number;
        locationType: Enums.LocationType;
        mt2: number;
        result: string;
        taskId: number;
    }

    export interface GetConfiguration extends Model.UserCredentials {
        paramType: string;
        paramGroup: string;
        paramName: string;
    }

    export interface GetParameter extends Model.UserCredentials {
        groupId: string;
        parameterId: string;
    }

    export interface RollBackLicense extends Model.UserCredentials {
        licenseId: number;
    }

    export interface InsertMaterialBySerialNumber
        extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
        serial: string;
        batch: string;
        dateExpiration: Date;
    }

    export interface DeleteMaterialBySerialNumber
        extends Model.UserCredentials {
        correlative: number;
    }

    export interface RegisterLicenseReception extends Model.UserCredentials {
        loginId: string;
        transType: Enums.TransType;
        licenseId: number;
        locationId: string;
        mt2: number;
        taskId: number;
        totalPosition: number;
    }

    export interface ValidateStatusInMaterialsLicense
        extends Model.UserCredentials {
        licenseId: number;
    }

    export interface GetLocation extends Model.UserCredentials {
        location: string;
    }

    export interface ValidateLocationForStorage extends Model.UserCredentials {
        login: string;
        locationSpot: string;
        taskId: number;
        licenseId: number;
    }

    export interface ValidateLocationMaxWeightAndVolume
        extends Model.UserCredentials {
        locationSpot: string;
        licenseId: number;
    }

    export interface GetTaskList extends Model.UserCredentials {
        wavePickingId?: number;
    }

    export interface CancelPickingDetailLine extends Model.UserCredentials {
        loginId: string;
        wavePickingId: number;
        materialId: string;
    }

    export interface GetRequestedSerialNumbersInDiscretionalPickingByLicense
        extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
        wavePickingId: number;
    }

    export interface ChargeByMobile extends Model.UserCredentials {
        licenseId: number;
        transType: Enums.TransType;
    }

    export interface CreateTypeChangeXLicense extends Model.UserCredentials {
        licenseId: number;
        typeChargeId: number;
        qty: number;
        lastUpdatedBy: string;
        transType: Enums.TransType;
        result: string;
    }

    export interface GetInventoryByLicense extends Model.UserCredentials {
        licenseId: number;
    }

    export interface GetMaterialBySerialNumber extends Model.UserCredentials {
        materialId: string;
        serial: string;
        licenseId: number;
    }

    export interface GetCheckPointsByUser extends Model.UserCredentials {}

    export interface GetInfoBatch extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
    }

    export interface UpdateMaterialProperties extends Model.UserCredentials {
        owner: string;
        materialId: string;
        barcodeId: string;
        alternateBarcode: string;
        batchRequested: number;
        serialNumberRequests: number;
        handleTone: number;
        handleCaliber: number;
    }

    export interface GetInventoryByMaterial extends Model.UserCredentials {
        materialId: string;
    }

    export interface GetInventoryByLocationSpot extends Model.UserCredentials {
        locationSpot: string;
    }

    export interface RelocateLicense extends Model.UserCredentials {
        licenseId: number;
        mt2: number;
        result: string;
        paramName: string;
        newLocationSpot: string;
        totalPosition: number;
    }

    export interface GetLocationInfo extends Model.UserCredentials {
        locationSpot: string;
    }

    export interface GetLabelInfo extends Model.UserCredentials {
        labelId: number;
    }

    export interface InsertPickingLabels extends Model.UserCredentials {
        loginId: string;
        wavePickingId: number;
        clientCode: string;
    }

    export interface UpdatePickingLabel extends Model.UserCredentials {
        labelId: number;
        clientCode: string;
        licenseId: number;
        barcode: string;
        qty: number;
        codePolicy: string;
        sourceLocation: string;
        targetLocation: string;
        transitLocation: string;
        serialNumber: string;
        wavePickingId: number;
    }

    export interface DeletePickingLabel extends Model.UserCredentials {
        labelId: number;
    }

    export interface UpdateScannedSerialNumberToProcess
        extends Model.UserCredentials {
        serialNumber: string;
        licenseId: number;
        status: number;
        wavePickingId: number;
        materialId: string;
        login: string;
        taskType: Enums.TaskType;
    }

    export interface RollbackSerialNumbersOnProcess
        extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
        login: string;
        wavePickingId: number;
        taskType: Enums.TaskType;
    }

    export interface UpdateSetActiveSerialNumber extends Model.UserCredentials {
        serialNumber: string;
        materialId: string;
        licenseId: number;
        wavePickingId: number;
        taskType: Enums.TaskType;
    }

    export interface ValidateIfPickingLicenseIsAvailable
        extends Model.UserCredentials {
        wavePickingId: number;
        currentLocation: string;
        materialId: string;
        licenseId: number;
        login: string;
    }

    export interface UpdateLocationTargetTask extends Model.UserCredentials {
        login: string;
        wavePickingId: number;
        locationSpotTarget: string;
    }

    export interface GetLicensePrintFormat extends Model.UserCredentials {
        licenseId: number;
        login: string;
        reprint: number;
    }

    export interface GetLabelPrintFormat extends Model.UserCredentials {
        labelId: number;
        login: string;
    }

    export interface GetMaterialPrintFormat extends Model.UserCredentials {
        materialId: string;
        login: string;
        barcodeId?: string;
    }

    export interface GetStatusPrintFormat extends Model.UserCredentials {
        taskId: number;
        codeStatus: string;
        login: string;
        clientOwner: string;
    }

    export interface GetTestPrintFormat extends Model.UserCredentials {
        login: string;
    }

    export interface GetAvailableLicenseDetail extends Model.UserCredentials {
        licenseId: number;
    }

    export interface GetAvailableLicenseSeries extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
    }

    export interface ValidateIfStatusOfLicenseAllowsRelocation
        extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
        result: string;
    }

    export interface RegisterPartialRelocation extends Model.UserCredentials {
        sourceLicense: number;
        targetLicense: number;
        quantityUnits: number;
        licenseId: number;
        wavePickingId: number;
        transMt2: number;
        taskId: number;
        result: string;
        status: Enums.TransStatus;
        sourceWarehouse: string;
        targetWarehouse: string;
        transSubtype: Enums.TransSubType;
        codePolicy: string;
        sourceLocation: string;
        targetLocation: string;
        clientOwner: string;
        tradeAgreement: string;
        loginId: string;
        transType: Enums.TransType;
        transExtraComments: string;
        materialBarcode: string;
        materialCode: string;
        totalPosition: number;
    }

    export interface GetInfoOfLicenseInLocationForMerge
        extends Model.UserCredentials {
        location: string;
        materialId: string;
    }

    export interface MergeLicenseInLocationWithoutDetail
        extends Model.UserCredentials {
        location: string;
        materialId: string;
        login: string;
    }

    export interface ValidateScannedDocumentForReception
        extends Model.UserCredentials {
        document: string;
        login: string;
    }

    export interface GenerateReceptionDocumentFromCargoManifest
        extends Model.UserCredentials {
        manifestId: number;
        login: string;
    }

    export interface GetManifestHeaderForCertification
        extends Model.UserCredentials {
        manifestHeaderId: number;
    }

    export interface ValidateIfCertificationIsComplete
        extends Model.UserCredentials {
        certificationHeaderId: number;
    }

    export interface GetMaterialForManifest extends Model.UserCredentials {
        manifestHeaderId: number;
        barcodeId: string;
    }

    export interface InsertCertificationDetail extends Model.UserCredentials {
        certificationHeaderId: number;
        labelId: number;
        qty: number;
        certificationType: Enums.CertificationType;
        lastUpdate: string;
        materialId: string;
        boxBarcode: string;
    }

    export interface GetConsolidatedCertificationDetail
        extends Model.UserCredentials {
        certificationHeaderId: number;
    }

    export interface GetCertificationDetailOfSerialNumber
        extends Model.UserCredentials {
        certificationHeaderId: number;
    }

    export interface DeleteCertificationDetail extends Model.UserCredentials {
        certificationDetailId: number;
        boxBarcode: string;
    }

    export interface MarkManifestAsCertified extends Model.UserCredentials {
        manifestHeaderId: number;
        certificationHeaderId: number;
        lastUpdateBy: string;
    }

    export interface InsertCertificationHeader extends Model.UserCredentials {
        manifestHeaderId: number;
        createBy: string;
    }

    export interface InsertCertificationBySerialNumber
        extends Model.UserCredentials {
        certificationHeaderId: number;
        manifestHedaerId: number;
        materialId: string;
        serialNumber: string;
    }

    export interface DeleteCertificationBySerialNumber
        extends Model.UserCredentials {
        certificationHeaderId: number;
        materialId: string;
        serialNumber: string;
    }

    export interface GetMyCoutingTask extends Model.UserCredentials {
        login: string;
    }

    export interface GetLocationsForCount extends Model.UserCredentials {
        login: string;
        taskId: number;
    }

    export interface ValidateScannedLocationForCount
        extends Model.UserCredentials {
        login: string;
        taskId: number;
        location: string;
    }

    export interface GetNextMaterialForCount extends Model.UserCredentials {
        login: string;
        taskId: number;
        location: string;
    }

    export interface GetValidateLicenseExists extends Model.UserCredentials {
        licenceId: number;
    }

    export interface GetMaterialByBarcode extends Model.UserCredentials {
        licenceId: number;
        barcodeId: string;
    }

    export interface ValidateRecountedMaterialForTask
        extends Model.UserCredentials {
        login: string;
        taskId: number;
        location: string;
        licenceId: number;
        materialId: string;
        batch: string;
        serial: string;
    }

    export interface InsertCountExecutionOperation
        extends Model.UserCredentials {
        login: string;
        taskId: number;
        location: string;
        licenseId: number;
        materialId: string;
        qtyScanned: number;
        expirationDate: Date;
        batch: string;
        serial: string;
        type: Enums.ReceptionAction;
    }

    export interface FinishLocation extends Model.UserCredentials {
        login: string;
        taskId: number;
        location: string;
    }

    export interface RecountLocation extends Model.UserCredentials {
        login: string;
        taskId: number;
        location: string;
    }

    export interface ValidateIsMasterPack extends Model.UserCredentials {
        material: string;
    }

    export interface GetMasterPackByLicense extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
    }

    export interface ExplodeMasterPack extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
        lastUpdateBy: string;
        manualExplosion: number;
    }

    export interface GetMasterPackDetailByLicence
        extends Model.UserCredentials {
        licenseId: number;
        materialId: string;
    }

    export interface GetPickingMaterialsWithMeasurementUnit
        extends Model.UserCredentials {
        wavePickingId: number;
    }

    export interface GetLastDispatchLicenseGeneratedByWavePicking
        extends Model.UserCredentials {
        wavePickingId: number;
    }

    export interface InsertLicenseDispatch extends Model.UserCredentials {
        wavePickingId: number;
        preparedBy: string;
    }

    export interface GetLicenseDispatchPrintFormat
        extends Model.UserCredentials {
        licenseId: number;
    }

    export interface RegisterGeneralDispatchByRegimeGeneral
        extends Model.UserCredentials {
        loginId: string;
        clientOwner: string;
        materialId: string;
        materialBarcode: string;
        sourceLicense: number;
        sourceLocation: string;
        quantityUnits: number;
        codePolicy: string;
        wavePickingId: number;
        serialNumber: number;
        locationType: Enums.LocationType;
        mt2: number;
        result: string;
        taskId: number;
        licenseDispatchId: number;
    }

    export interface RegisterReplenishment extends Model.UserCredentials {
        loginId: string;
        clientOwner: string;
        materialId: string;
        materialBarcode: string;
        sourceLicense: number;
        sourceLocation: string;
        quantityUnits: number;
        codePolicy: string;
        wavePickingId: number;
        serialNumber: number;
        locationType: Enums.LocationType;
        mt2: number;
        result: string;
        taskId: number;
        licenseDispatchId: number;
    }

    export interface LocateLicenseDispatch extends Model.UserCredentials {
        location: string;
        licenseId: number;
    }

    export interface RegisterForReplenishment extends Model.UserCredentials {
        location: string;
        licenseId: number;
        loginUser: string;
    }

    export interface GetLicenseDispatchByWavePicking
        extends Model.UserCredentials {
        wavePickingId: number;
        preparedBy: string;
    }

    export interface GetTargetLocationByLicenseDispatch
        extends Model.UserCredentials {
        wavePickingId: number;
        preparedBy: string;
    }

    export interface ValidatedIfJoinSpotExists extends Model.UserCredentials {
        warehouseParent: string;
        locationSpot: string;
    }

    export interface GetInfoLicenseDispatch extends Model.UserCredentials {
        licenseId: number;
    }

    export interface GetLocationOfSlottingZoneByLicense
        extends Model.UserCredentials {
        loginId: string;
        licenseId: number;
    }

    export interface GetPickingMaterialsWithMeasurementUnit
        extends Model.UserCredentials {
        wavePickingId: number;
    }

    export interface GetWavePickingForLicenseDispatch
        extends Model.UserCredentials {
        number: number;
        type: Enums.TypeFilterLicenseDispatch;
    }

    export interface GetLicenseDispatchForPicking
        extends Model.UserCredentials {
        wavePickingId: number;
    }

    export interface DispatchLicenseExit extends Model.UserCredentials {
        //xml: string;
        listLicenseDispatch: Array<
            DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING
        >;
        wavePickingId: number;
    }

    export interface InsertPilotFromDispatchLicense
        extends Model.UserCredentials {
        namePilot: string;
        lastName: string;
    }

    export interface InsertVehicleFromDispatchLicence
        extends Model.UserCredentials {
        plateNumber: string;
    }

    export interface InsertExitPassFromDispatchLicence
        extends Model.UserCredentials {
        dispatchLicenseExitHeader: number;
        vehicleCode: number;
        pilotCode: number;
    }
    export interface RegisterGeneralTransferPicking
        extends Model.UserCredentials {
        loginId: string;
        materialId: string;
        materialBarcode: string;
        sourceLicense: number;
        targetLicense: number;
        sourceLocation: string;
        quantityUnits: number;
        policyCode: string;
        wavePickingId: number;
        serialNumber: number;
        transMt2: number;
        locationType: string;
        result: string;
        taskId: number;
    }
    export interface RegisterGeneralTransferReception
        extends Model.UserCredentials {
        loginId: string;
        materialId: string;
        sourceLicense: number;
        targetLicense: number;
        targetLocation: string;
        policyCode: string;
        wavePickingId: number;
        serialNumber: number;
        transMt2: number;
        result: string;
        taskId: number;
    }

    export class Factory {
        public static createGetInfoLicenseDispatch(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetInfoLicenseDispatch {
            let entity: GetInfoLicenseDispatch = {
                licenseId: licenseId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRecountLocationRequest(
            taskId: number,
            location: string,
            userCredentials: Model.UserCredentials
        ): RecountLocation {
            let entity: RecountLocation = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLicenseDispatchByWavePicking(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetLicenseDispatchByWavePicking {
            let entity: GetLicenseDispatchByWavePicking = {
                wavePickingId: wavePickingId,
                preparedBy: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetTargetLocationByLicenseDispatch(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetTargetLocationByLicenseDispatch {
            let entity: GetTargetLocationByLicenseDispatch = {
                wavePickingId: wavePickingId,
                preparedBy: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createFinishLocationRequest(
            taskId: number,
            location: string,
            userCredentials: Model.UserCredentials
        ): FinishLocation {
            let entity: FinishLocation = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertCountExecutionOperationRequest(
            taskId: number,
            location: string,
            licenseId: number,
            materialId: string,
            qtyScanned: number,
            expirationDate: Date,
            batch: string,
            serial: string,
            type: Enums.ReceptionAction,
            userCredentials: Model.UserCredentials
        ): InsertCountExecutionOperation {
            let entity: InsertCountExecutionOperation = {
                taskId: taskId,
                location: location,
                licenseId: licenseId,
                materialId: materialId,
                qtyScanned: qtyScanned,
                expirationDate: expirationDate,
                batch: batch,
                serial: serial,
                type: type,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateRecountedMaterialForTaskRequest(
            taskId: number,
            location: string,
            licenceId: number,
            materialId: string,
            batch: string,
            serial: string,
            userCredentials: Model.UserCredentials
        ): ValidateRecountedMaterialForTask {
            let entity: ValidateRecountedMaterialForTask = {
                taskId: taskId,
                location: location,
                licenceId: licenceId,
                materialId: materialId,
                batch: batch,
                serial: serial,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMaterialByBarcodeRequest(
            barcodeId: string,
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetMaterialByBarcode {
            let entity: GetMaterialByBarcode = {
                barcodeId: barcodeId,
                licenceId: licenseId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetValidateLicenseExistsRequest(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetValidateLicenseExists {
            let entity: GetValidateLicenseExists = {
                licenceId: licenseId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetNextMaterialForCountRequest(
            taskId: number,
            location: string,
            userCredentials: Model.UserCredentials
        ): GetNextMaterialForCount {
            let entity: GetNextMaterialForCount = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateScannedLocationForCountRequest(
            taskId: number,
            location: string,
            userCredentials: Model.UserCredentials
        ): ValidateScannedLocationForCount {
            let entity: ValidateScannedLocationForCount = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLocationsForCountRequest(
            taskId: number,
            userCredentials: Model.UserCredentials
        ): GetLocationsForCount {
            let entity: GetLocationsForCount = {
                taskId: taskId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMyCoutingTaskRequest(
            userCredentials: Model.UserCredentials
        ): GetMyCoutingTask {
            let entity: GetMyCoutingTask = {
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetPickingMaterialsWithMeasurementUnitRequest(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetPickingMaterialsWithMeasurementUnit {
            let entity: GetPickingMaterialsWithMeasurementUnit = {
                wavePickingId: wavePickingId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createDeleteCertificationBySerialNumberRequest(
            certificationHeaderId: number,
            materialId: string,
            serialNumber: string,
            userCredentials: Model.UserCredentials
        ): DeleteCertificationBySerialNumber {
            let entity: DeleteCertificationBySerialNumber = {
                certificationHeaderId: certificationHeaderId,
                materialId: materialId,
                serialNumber: serialNumber,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertCertificationBySerialNumberRequest(
            certificationHeaderId: number,
            manifestHedaerId: number,
            materialId: string,
            serialNumber: string,
            userCredentials: Model.UserCredentials
        ): InsertCertificationBySerialNumber {
            let entity: InsertCertificationBySerialNumber = {
                certificationHeaderId: certificationHeaderId,
                manifestHedaerId: manifestHedaerId,
                materialId: materialId,
                serialNumber: serialNumber,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetParameterRequest(
            groupId: string,
            parameterId: string,
            userCredentials: Model.UserCredentials
        ): GetParameter {
            let entity: GetParameter = {
                groupId: groupId,
                parameterId: parameterId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertCertificationHeaderRequest(
            manifestId: number,
            userCredentials: Model.UserCredentials
        ): InsertCertificationHeader {
            let entity: InsertCertificationHeader = {
                manifestHeaderId: manifestId,
                createBy: userCredentials.login,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createDeleteCertificationDetailRequest(
            certificationId: number,
            boxBarcode: string,
            userCredentials: Model.UserCredentials
        ): DeleteCertificationDetail {
            let entity: DeleteCertificationDetail = <DeleteCertificationDetail>{
                certificationDetailId: certificationId,
                boxBarcode: boxBarcode ? boxBarcode : null,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createMarkManifestAsCertifiedRequest(
            manifestHeaderId: number,
            certificationHeaderId: number,
            lastUpdateBy: string,
            userCredentials: Model.UserCredentials
        ): MarkManifestAsCertified {
            let entity: MarkManifestAsCertified = {
                manifestHeaderId: manifestHeaderId,
                certificationHeaderId: certificationHeaderId,
                lastUpdateBy: lastUpdateBy,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetConsolidatedCertificationDetailRequest(
            certificationId: number,
            userCredentials: Model.UserCredentials
        ): GetConsolidatedCertificationDetail {
            let entity: GetConsolidatedCertificationDetail = {
                certificationHeaderId: certificationId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetCertificationDetailOfSerialNumberRequest(
            certificationId: number,
            userCredentials: Model.UserCredentials
        ): GetCertificationDetailOfSerialNumber {
            let entity: GetCertificationDetailOfSerialNumber = {
                certificationHeaderId: certificationId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMaterialForManifestRequest(
            manifestId: number,
            barcodeId: string,
            userCredentials: Model.UserCredentials
        ): GetMaterialForManifest {
            let entity: GetMaterialForManifest = {
                manifestHeaderId: manifestId,
                barcodeId: barcodeId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertCertificationDetailRequest(
            certificationHeaderId: number,
            labelId: number,
            qty: number,
            certificationType: Enums.CertificationType,
            lastUpdate: string,
            materialId: string,
            boxBarcode: string,
            userCredentials: Model.UserCredentials
        ): InsertCertificationDetail {
            let entity: InsertCertificationDetail = {
                certificationHeaderId: certificationHeaderId,
                labelId: labelId,
                qty: qty,
                certificationType: certificationType,
                lastUpdate: lastUpdate,
                materialId: materialId,
                boxBarcode: boxBarcode,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetManifestHeaderForCertificationRequest(
            manifestId: number,
            userCredentials: Model.UserCredentials
        ): GetManifestHeaderForCertification {
            let entity: GetManifestHeaderForCertification = {
                manifestHeaderId: manifestId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateIfCertificationIsCompleteRequest(
            certificationId: number,
            userCredentials: Model.UserCredentials
        ): ValidateIfCertificationIsComplete {
            let entity: ValidateIfCertificationIsComplete = {
                certificationHeaderId: certificationId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createMergeLicenseInLocationWithoutDetail(
            location: string,
            materialId: string,
            userCredentials: Model.UserCredentials
        ): MergeLicenseInLocationWithoutDetail {
            let entity: MergeLicenseInLocationWithoutDetail = {
                location: location,
                materialId: materialId,
                password: "",
                login: userCredentials.login,
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetInfoOfLicenseInLocationForMergeRequest(
            location: string,
            materialId: string,
            userCredentials: Model.UserCredentials
        ): GetInfoOfLicenseInLocationForMerge {
            let entity: GetInfoOfLicenseInLocationForMerge = {
                location: location,
                materialId: materialId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGenerateReceptionDocumentFromCargoManifestRequest(
            manifestId: number,
            userCredentials: Model.UserCredentials
        ): GenerateReceptionDocumentFromCargoManifest {
            let entity: GenerateReceptionDocumentFromCargoManifest = {
                manifestId: manifestId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateScannedDocumentForReceptionRequest(
            document: string,
            userCredentials: Model.UserCredentials
        ): ValidateScannedDocumentForReception {
            let entity: ValidateScannedDocumentForReception = {
                document: document,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLabelInfoRequest(
            labelId: number,
            userCredentials: Model.UserCredentials
        ): GetLabelInfo {
            let entity: GetLabelInfo = {
                labelId: labelId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRelocateLicenseRequest(
            licenseId: number,
            mt2: number,
            paramName: string,
            newLocationSpot: string,
            userCredentials: Model.UserCredentials,
            totalPosition: number
        ): RelocateLicense {
            let entity: RelocateLicense = {
                licenseId: licenseId,
                mt2: mt2,
                paramName: paramName,
                newLocationSpot: newLocationSpot,
                result: "",
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                totalPosition: totalPosition
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetInventoryByLocationSpotRequest(
            locationSpot: string,
            userCredentials: Model.UserCredentials
        ) {
            let entity: GetInventoryByLocationSpot = {
                locationSpot: locationSpot,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetInventoryByMaterialRequest(
            materialId: string,
            userCredentials: Model.UserCredentials
        ) {
            let entity: GetInventoryByMaterial = {
                materialId: materialId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createUpdateMaterialPropertiesRequest(
            materialInfo: Model.Material,
            userCredentials: Model.UserCredentials
        ) {
            let entity: UpdateMaterialProperties = {
                alternateBarcode:
                    materialInfo.newAlternateBarcode ||
                    materialInfo.alternateBarcode,
                barcodeId: materialInfo.newBarcode || materialInfo.barcodeId,
                batchRequested: materialInfo.batchRequested,
                materialId: materialInfo.materialId,
                owner: materialInfo.clientOwner,
                handleTone: materialInfo.handleTone,
                handleCaliber: materialInfo.handleCaliber,
                serialNumberRequests: materialInfo.serialNumberRequests,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetCheckPointsByUserRequest(
            userCredentials: Model.UserCredentials
        ) {
            let entity: GetCheckPointsByUser = {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static getLocationSugestionRequest(
            userCredentials: Model.UserCredentials,
            licenceId: number
        ) {
            let entity: GetLocationOfSlottingZoneByLicense = {
                licenseId: licenceId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static getBroadcastLost(
            userCredentials: Model.UserCredentials
        ): DataRequest.GetBroadcastLost {
            return {
                password: userCredentials.password,
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                domain: userCredentials.domain,
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
        }

        public static removeBroadcast(
            broadcast: Model.Broadcast,
            userCredentials: Model.UserCredentials
        ): DataRequest.RemoveBroadcast {
            let entity: RemoveBroadcast = {
                broadcast: broadcast,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRegisterGeneralDispatch(
            processSku: Model.ProcessSku,
            task: Model.Task,
            userCredentials: Model.UserCredentials
        ): RegisterGeneralDispatch {
            let entity: RegisterGeneralDispatch = {
                loginId: userCredentials.loginId,
                clientOwner: task.clientOwner,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                codePolicy: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                locationType: processSku.locationType,
                mt2: processSku.usedMt2,
                taskId: task.wavePickingId,
                serialNumber: task.id,
                result: "",
                password: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetInfoBatch(
            materialId: string,
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetInfoBatch {
            let entity: GetInfoBatch = {
                materialId: materialId,
                licenseId: licenseId,
                login: userCredentials.loginId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateIfPickingLicenseIsAvailableRequest(
            processSku: Model.ProcessSku,
            userCredentials: Model.UserCredentials
        ): ValidateIfPickingLicenseIsAvailable {
            let entity: ValidateIfPickingLicenseIsAvailable = {
                wavePickingId: processSku.wavePickingId,
                currentLocation: processSku.sourceLocation,
                materialId: processSku.materialId,
                licenseId: processSku.licenseId,
                login: userCredentials.loginId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        public static createCreateLicenseRequest(
            codePolicy: string,
            login: string,
            clientOwner: string,
            regime: Enums.Regime,
            taskId: number,
            userCredentials: Model.UserCredentials
        ): CreateLicense {
            let entity: CreateLicense = {
                codePolicy: codePolicy,
                login: login,
                licenseId: 0,
                clientOwner: clientOwner,
                regime: regime,
                result: "",
                taskId: taskId,
                location: null,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }


        public static createTaskRequest(
            createBy: String,
            taskType: String,
            taskAssignedTo: String,
            isAccepted: number,
            isComplete: number,
            isPaused: number,
            isCanceled: number,
            regimen: Enums.Regime,
            assignedDate: Date,
            acceptedDate: Date,
            completedDate: Date,
            canceledDate: Date,
            canceledBy: String,
            lastUpdate: Date,
            lastUdateBy: String,
            priority: Number,
            comments: String,
            userCredentials: Model.UserCredentials
        ): CreateTask {
            let entity: CreateTask = {
                createBy: createBy,
                taskType: taskType,
                taskAssignedTo: taskAssignedTo,
                isAccepted: isAccepted,
                isComplete: isComplete,
                isPaused: isPaused,
                isCanceled: isCanceled,
                regimen: regimen,
                assignedDate: assignedDate,
                acceptedDate: acceptedDate,
                completedDate: completedDate,
                canceledDate: canceledDate,
                canceledBy: canceledBy,
                lastUpdate: lastUpdate,
                lastUdateBy: lastUdateBy,
                priority: priority,
                comments: comments,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }


        public static completeReallocRequest(
            taskId: number,
            userCredentials: Model.UserCredentials
        ): CompleteRealloc {
            let entity: CompleteRealloc = {
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static cancelTaskRequest(
            taskId: number,
            userCredentials: Model.UserCredentials
        ): CancelTask {
            let entity: CancelTask = {
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static completeCountRequest(
            taskId: number,
            userCredentials: Model.UserCredentials
        ): CancelTask {
            let entity: CancelTask = {
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createReceptionRequest(
            userCredentials: Model.UserCredentials
        ): Reception {
            let entity: Reception = {
                regime: Enums.Regime.General,
                serialNumber: 0,
                taskAssignedTo: "",
                transType: Enums.TransType.GeneralReception,
                login: "",
                policyCode: "",
                taskId: 0,
                status: "",
                completeTask: Enums.YesNo.No,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetScannedMaterialByLicenseInReceptionTaskRequest(
            barcode: string,
            clientOwner: string,
            licenseId: number,
            taskId: number,
            userCredentials: Model.UserCredentials
        ): GetScannedMaterialByLicenseInReceptionTask {
            let entity: GetScannedMaterialByLicenseInReceptionTask = {
                barcode: barcode,
                clientOwner: clientOwner,
                licenseId: licenseId,
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateIfStatusOfLicenseAllowsRelocationRequest(
            userCredentials: Model.UserCredentials
        ): ValidateIfStatusOfLicenseAllowsRelocation {
            let entity: ValidateIfStatusOfLicenseAllowsRelocation = {
                licenseId: 0,
                materialId: "",
                result: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateInventoryForRealloc(
            userCredentials: Model.UserCredentials
        ): ValidateInventoryForRealloc {
            let entity: ValidateInventoryForRealloc = {
                materialId: "",
                quantityUnits: 0,
                sourceLicense: 0,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createAddMaterialToLicenseRequest(
            userCredentials: Model.UserCredentials
        ): AddMaterialToLicense {
            let entity: AddMaterialToLicense = {
                licenseId: 0,
                barcode: "",
                qty: 0,
                lastLogin: "",
                volumeFactor: 0,
                weight: 0,
                comments: "N/A",
                serial: "",
                tradeAgreementId: "2020",
                totalMaterials: 0,
                status: "",
                result: "",
                dateExpiration: new Date(),
                batch: "",
                vin: "",
                paramName: "",
                action: Enums.ReceptionAction.Insert,
                tone: "",
                caliber: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                enteredMeasurementUnit: "",
                enteredMeasurementUnitQty: 0,
                enteredMeasurementUnitConversionFactor: 0
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createSuggestedLocation(
            licenceId: number,
            userCredentials: Model.UserCredentials
        ): SuggestedLocation {
            let entity: SuggestedLocation = {
                licenseId: licenceId,
                zone: "",
                warehouse: "",
                location: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                loginId: userCredentials.loginId,
                login: userCredentials.login,
                domain: userCredentials.domain,
                userName: userCredentials.userName,
                password: userCredentials.password,
                userRole: userCredentials.userRole
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRollBackLicenseRequest(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): RollBackLicense {
            let entity: RollBackLicense = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createAddSeriesRankRequest(
            licenseId: number,
            materialId: string,
            batch: string,
            dateExpiration: Date,
            prefix: string,
            startValue: string,
            endValue: string,
            sufix: string,
            status: number,
            wavePickingId: number,
            operationType: Enums.TaskType,
            userCredentials: Model.UserCredentials
        ): AddSeriesRank {
            let entity: AddSeriesRank = {
                licenseId: licenseId,
                materialId: materialId,
                batch: batch,
                dateExpiration: dateExpiration,
                prefix: prefix,
                startValue: startValue,
                endValue: endValue,
                sufix: sufix,
                status: status,
                wavePickingId: wavePickingId,
                operationType: operationType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createAvailableLicenseDetailRequest(
            userCredentials: Model.UserCredentials,
            licensenId: number
        ): GetAvailableLicenseDetail {
            let entity: GetAvailableLicenseDetail = {
                licenseId: licensenId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetConfigurationRequest(
            userCredentials: Model.UserCredentials
        ): GetConfiguration {
            let entity: GetConfiguration = {
                paramType: "",
                paramGroup: "",
                paramName: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMaterialRequest(
            userCredentials: Model.UserCredentials
        ): DataRequest.GetMaterial {
            let entity: DataRequest.GetMaterial = {
                materialId: "",
                clientOwner: "",
                barcodeId: "",
                alternateBarcode: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertMaterialBySerialNumberRequest(
            licenseId: number,
            materialId: string,
            serial: string,
            userCredentials: Model.UserCredentials
        ): InsertMaterialBySerialNumber {
            let entity: InsertMaterialBySerialNumber = {
                licenseId: licenseId,
                materialId: materialId,
                serial: serial,
                batch: null,
                dateExpiration: null,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createDeleteMaterialBySerialNumberRequest(
            correlative: number,
            userCredentials: Model.UserCredentials
        ): DeleteMaterialBySerialNumber {
            let entity: DeleteMaterialBySerialNumber = {
                correlative: correlative,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRegisterLicenseReceptionRequest(
            licenseId: number,
            locationId: string,
            mt2: number,
            taskId: number,
            userCredentials: Model.UserCredentials,
            totalPosition: number
        ): RegisterLicenseReception {
            let entity: RegisterLicenseReception = {
                transType: Enums.TransType.GeneralReception,
                licenseId: licenseId,
                locationId: locationId,
                mt2: mt2,
                taskId: taskId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                totalPosition: totalPosition
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateStatusInMaterialsLicenseRequest(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): ValidateStatusInMaterialsLicense {
            let entity: ValidateStatusInMaterialsLicense = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLocationRequest(
            location: string,
            userCredentials: Model.UserCredentials
        ): GetLocation {
            let entity: GetLocation = {
                location: location,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLocationInfoRequest(
            location: string,
            userCredentials: Model.UserCredentials
        ): GetLocationInfo {
            let entity: GetLocationInfo = {
                locationSpot: location,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateLocationForStorageRequest(
            licenseId: number,
            location: string,
            taskId: number,
            userCredentials: Model.UserCredentials
        ): ValidateLocationForStorage {
            let entity: ValidateLocationForStorage = {
                licenseId: licenseId,
                login: userCredentials.login,
                locationSpot: location,
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateLocationMaxWeightAndVolumeRequest(
            location: string,
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): ValidateLocationMaxWeightAndVolume {
            let entity: ValidateLocationMaxWeightAndVolume = {
                licenseId: licenseId,
                locationSpot: location,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetTaskListRequest(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetTaskList {
            let entity: GetTaskList = {
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        public static createTypeChangeXLicenseRequest(
            charge: Model.Charge,
            userCredentials: Model.UserCredentials
        ): CreateTypeChangeXLicense {
            let entity: CreateTypeChangeXLicense = {
                licenseId: charge.licenseId,
                typeChargeId: charge.typeChargeId,
                qty: charge.qty,
                lastUpdatedBy: userCredentials.login,
                transType: charge.transType,
                result: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createCancelPickingDetailLineRequest(
            wavePickingId: number,
            materialId: string,
            userCredentials: Model.UserCredentials
        ): CancelPickingDetailLine {
            let entity: CancelPickingDetailLine = {
                wavePickingId: wavePickingId,
                materialId: materialId,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetRequestedSerialNumbersInDiscretionalPickingByLicenseRequest(
            licenseId: number,
            wavePickingId: number,
            materialId: string,
            userCredentials: Model.UserCredentials
        ): GetRequestedSerialNumbersInDiscretionalPickingByLicense {
            let entity: GetRequestedSerialNumbersInDiscretionalPickingByLicense = {
                licenseId: licenseId,
                wavePickingId: wavePickingId,
                materialId: materialId,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createChargeByMobileRequest(
            licenseId: number,
            transType: Enums.TransType,
            userCredentials: Model.UserCredentials
        ): ChargeByMobile {
            let entity: ChargeByMobile = {
                licenseId: licenseId,
                transType: transType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createLastLicenseReallocByUser(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): LastLicenseReallocByUser {
            let entity: LastLicenseReallocByUser = {
                licenseId: licenseId,
                login: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMaterialPrintFormat(
            materialId: string,
            userCredentials: Model.UserCredentials
        ): GetMaterialPrintFormat {
            let entity: GetMaterialPrintFormat = {
                materialId: materialId,
                login: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetPrintPassFormatByHH(
            passId: number,
            userCredentials: Model.UserCredentials
        ): GetPrintPassFormatByHH {
            let entity: GetPrintPassFormatByHH = {
                passId: passId,
                login: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetInventoryByLicenseRequest(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetInventoryByLicense {
            let entity: GetInventoryByLicense = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMaterialBySerialNumberRequest(
            licenseId: number,
            materialId: string,
            serial: string,
            userCredentials: Model.UserCredentials
        ): GetMaterialBySerialNumber {
            let entity: GetMaterialBySerialNumber = {
                licenseId: licenseId,
                materialId: materialId,
                serial: serial,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createUpdateScannedSerialNumberToProcessRequest(
            serialNumber: string,
            licenseId: number,
            status: number,
            wavePickingId: number,
            materialId: string,
            taskType: Enums.TaskType,
            userCredentials: Model.UserCredentials
        ): UpdateScannedSerialNumberToProcess {
            let entity: UpdateScannedSerialNumberToProcess = {
                serialNumber: serialNumber,
                licenseId: licenseId,
                status: status,
                wavePickingId: wavePickingId,
                materialId: materialId,
                login: userCredentials.login,
                taskType: taskType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRollbackSerialNumbersOnProcessRequest(
            licenseId: number,
            wavePickingId: number,
            materialId: string,
            taskType: Enums.TaskType,
            userCredentials: Model.UserCredentials
        ): RollbackSerialNumbersOnProcess {
            let entity: RollbackSerialNumbersOnProcess = {
                licenseId: licenseId,
                materialId: materialId,
                login: userCredentials.login,
                wavePickingId: wavePickingId,
                taskType: taskType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createUpdateSetActiveSerialNumberRequest(
            licenseId: number,
            wavePickingId: number,
            materialId: string,
            serialNumber: string,
            taskType: Enums.TaskType,
            userCredentials: Model.UserCredentials
        ): UpdateSetActiveSerialNumber {
            let entity: UpdateSetActiveSerialNumber = {
                licenseId: licenseId,
                materialId: materialId,
                serialNumber: serialNumber,
                wavePickingId: wavePickingId,
                taskType: taskType,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createUpdateLocationTargetTaskRequest(
            wavePickingId: number,
            locationSpotTarget: string,
            userCredentials: Model.UserCredentials
        ): UpdateLocationTargetTask {
            let entity: UpdateLocationTargetTask = {
                login: userCredentials.login,
                wavePickingId: wavePickingId,
                locationSpotTarget: locationSpotTarget,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLicensePrintFormatRequest(
            licenseId: number,
            reprint: number,
            userCredentials: Model.UserCredentials
        ): GetLicensePrintFormat {
            let entity: GetLicensePrintFormat = {
                login: userCredentials.login,
                licenseId: licenseId,
                reprint: reprint,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetStatusPrintFormatRequest(
            codeStatus: string,
            taskId: number,
            clientOwner: string,
            userCredentials: Model.UserCredentials
        ): GetStatusPrintFormat {
            let entity: GetStatusPrintFormat = {
                taskId: taskId,
                login: userCredentials.login,
                codeStatus: codeStatus,
                clientOwner: clientOwner,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLicenseDispatchPrintFormatRequest(
            licenceId: number,
            userCredentials: Model.UserCredentials
        ): GetLicenseDispatchPrintFormat {
            let entity: GetLicenseDispatchPrintFormat = {
                licenseId: licenceId,
                login: userCredentials.login,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLabelPrintFormatRequest(
            labelId: number,
            userCredentials: Model.UserCredentials
        ): GetLabelPrintFormat {
            let entity: GetLabelPrintFormat = {
                login: userCredentials.login,
                labelId: labelId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetConsolidatedCertificationDetail(
            certificationHeaderId: number,
            userCredentials: Model.UserCredentials
        ): GetConsolidatedCertificationDetail {
            let entity: GetConsolidatedCertificationDetail = {
                login: userCredentials.login,
                certificationHeaderId: certificationHeaderId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertPickingLabelsRequest(
            wavePickingId: number,
            clientCode: string,
            userCredentials: Model.UserCredentials
        ): InsertPickingLabels {
            let entity: InsertPickingLabels = {
                wavePickingId: wavePickingId,
                clientCode: clientCode,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetCertificationDetailOfSerialNumber(
            certificationHeaderId: number,
            userCredentials: Model.UserCredentials
        ): GetCertificationDetailOfSerialNumber {
            let entity: GetCertificationDetailOfSerialNumber = {
                login: userCredentials.login,
                certificationHeaderId: certificationHeaderId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetAvailableLicenseDetailRequest(
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetAvailableLicenseDetail {
            let entity: GetAvailableLicenseDetail = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createDeletePickingLabelRequest(
            labelId: number,
            userCredentials: Model.UserCredentials
        ): DeletePickingLabel {
            let entity: DeletePickingLabel = {
                labelId: labelId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetAvailableLicenseSeriesRequest(
            licenseId: number,
            materialId: string,
            userCredentials: Model.UserCredentials
        ): GetAvailableLicenseSeries {
            let entity: GetAvailableLicenseSeries = {
                licenseId: licenseId,
                materialId: materialId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetWavePickingPendingToLocate(
            userCredentials: Model.UserCredentials
        ): GetWavePickingPendingToLocate {
            let entity: GetWavePickingPendingToLocate = {
                loginUser: userCredentials.loginId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetSuggestedDispatchLicense(
            materialId: string,
            wavePickingId: number,
            projectId: string,
            userCredentials: Model.UserCredentials
        ): GetSuggestedDispatchLicense {
            let entity: GetSuggestedDispatchLicense = {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                materialId: materialId,
                wavePickingId: wavePickingId,
                projectId: projectId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetWavePickingPendingToDispatchRequest(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetWavePickingPendingToDispatch {
            let entity: GetWavePickingPendingToDispatch = {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                wavePickingId: wavePickingId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createUpdatePickingLabelRequest(
            labelId: number,
            clientCode: string,
            licenseId: number,
            barcode: string,
            qty: number,
            codePolicy: string,
            sourceLocation: string,
            targetLocation: string,
            transitLocation: string,
            serialNumber: string,
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): UpdatePickingLabel {
            let entity: UpdatePickingLabel = {
                labelId: labelId,
                clientCode: clientCode,
                licenseId: licenseId,
                barcode: barcode,
                qty: qty,
                codePolicy: codePolicy,
                sourceLocation: sourceLocation,
                targetLocation: targetLocation,
                transitLocation: transitLocation,
                serialNumber: serialNumber,
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRegisterPartialRelocationRequest(
            sourceLicense: number,
            targetLicense: number,
            quantityUnits: number,
            transMt2: number,
            codePolicy: string,
            targetLocation: string,
            clientOwner: string,
            materialBarcode: string,
            materialCode: string,
            userCredentials: Model.UserCredentials,
            totalPosition: number
        ): RegisterPartialRelocation {
            let entity: RegisterPartialRelocation = {
                sourceLicense: sourceLicense,
                targetLicense: targetLicense,
                quantityUnits: quantityUnits,
                licenseId: targetLicense,
                wavePickingId: 0,
                transMt2: transMt2,
                taskId: null,
                result: "",
                status: Enums.TransStatus.Processed,
                sourceWarehouse: "",
                targetWarehouse: "",
                transSubtype: Enums.TransSubType.None,
                codePolicy: codePolicy,
                sourceLocation: "",
                targetLocation: targetLocation,
                clientOwner: clientOwner,
                tradeAgreement: null,
                transType: Enums.TransType.PartialRelocation,
                transExtraComments: "N/A",
                materialBarcode: materialBarcode,
                materialCode: materialCode,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                totalPosition: totalPosition
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidateIsMasterPackRequest(
            material: string,
            userCredentials: Model.UserCredentials
        ): ValidateIsMasterPack {
            let entity: ValidateIsMasterPack = {
                material: material,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMasterPackDetailByLicenceRequest(
            licenseId: number,
            materialId: string,
            userCredentials: Model.UserCredentials
        ): GetMasterPackDetailByLicence {
            let entity: GetMasterPackDetailByLicence = {
                licenseId: licenseId,
                materialId: materialId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createExplodeMasterPackRequest(
            licenseId: number,
            materialId: string,
            lastUpdateBy: string,
            manualExplosion: number,
            userCredentials: Model.UserCredentials
        ): ExplodeMasterPack {
            let entity: ExplodeMasterPack = {
                licenseId: licenseId,
                materialId: materialId,
                lastUpdateBy: lastUpdateBy,
                manualExplosion: manualExplosion,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetMasterPackByLicenseRequest(
            materialId: string,
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): GetMasterPackByLicense {
            let entity: GetMasterPackByLicense = {
                materialId: materialId,
                licenseId: licenseId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLastDispatchLicenseGeneratedByWavePicking(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetLastDispatchLicenseGeneratedByWavePicking {
            let entity: GetLastDispatchLicenseGeneratedByWavePicking = {
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertLicenseDispatch(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): InsertLicenseDispatch {
            let entity: InsertLicenseDispatch = {
                wavePickingId: wavePickingId,
                password: "",
                preparedBy: userCredentials.loginId.split("@")[0],
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRegisterGeneralDispatchByRegimeGeneral(
            processSku: Model.ProcessSku,
            task: Model.Task,
            licenseDispatchId: number,
            userCredentials: Model.UserCredentials
        ): RegisterGeneralDispatchByRegimeGeneral {
            let entity: RegisterGeneralDispatchByRegimeGeneral = {
                loginId: userCredentials.loginId,
                clientOwner: task.clientOwner,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                codePolicy: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                locationType: processSku.locationType,
                mt2: processSku.usedMt2,
                taskId: task.wavePickingId,
                serialNumber: task.id,
                result: "",
                password: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                licenseDispatchId: licenseDispatchId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRegisterReplenishment(
            processSku: Model.ProcessSku,
            task: Model.Task,
            licenseDispatchId: number,
            userCredentials: Model.UserCredentials
        ): RegisterReplenishment {
            let entity: RegisterReplenishment = {
                loginId: userCredentials.loginId,
                clientOwner: task.clientOwner,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                codePolicy: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                locationType: processSku.locationType,
                mt2: processSku.usedMt2,
                taskId: task.wavePickingId,
                serialNumber: task.id,
                result: "",
                password: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                licenseDispatchId: licenseDispatchId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createLocateLicenseDispatch(
            location: string,
            licenseId: number,
            userCredentials: Model.UserCredentials
        ): LocateLicenseDispatch {
            let entity: LocateLicenseDispatch = {
                location: location,
                licenseId: licenseId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createRegisterForReplenishment(
            location: string,
            licenseId: number,
            loginUser: string,
            userCredentials: Model.UserCredentials
        ): RegisterForReplenishment {
            let entity: RegisterForReplenishment = {
                location: location,
                licenseId: licenseId,
                loginUser: loginUser,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createValidatedIfJoinSpotExists(
            location: string,
            userCredentials: Model.UserCredentials
        ): ValidatedIfJoinSpotExists {
            let entity: ValidatedIfJoinSpotExists = {
                locationSpot: location,
                warehouseParent: null,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetWavePickingForLicenseDispatchRequest(
            number: number,
            type: Enums.TypeFilterLicenseDispatch,
            userCredentials: Model.UserCredentials
        ): GetWavePickingForLicenseDispatch {
            let entity: GetWavePickingForLicenseDispatch = {
                number: number,
                type: type,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetLicenseDispatchForPickingRequest(
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): GetLicenseDispatchForPicking {
            let entity: GetLicenseDispatchForPicking = {
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createDispatchLicenseExitRequest(
            listLicenseDispatch: Array<
                DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING
            >,
            wavePickingId: number,
            userCredentials: Model.UserCredentials
        ): DispatchLicenseExit {
            let entity: DispatchLicenseExit = {
                listLicenseDispatch: listLicenseDispatch,
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertPilotFromDispatchLicenseRequest(
            namePilot: string,
            lastName: string,
            userCredentials: Model.UserCredentials
        ): InsertPilotFromDispatchLicense {
            let entity: InsertPilotFromDispatchLicense = {
                namePilot: namePilot,
                lastName: lastName,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertVehicleFromDispatchLicenceRequest(
            plateNumber: string,
            userCredentials: Model.UserCredentials
        ): InsertVehicleFromDispatchLicence {
            let entity: InsertVehicleFromDispatchLicence = {
                plateNumber: plateNumber,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createInsertExitPassFromDispatchLicenceRequest(
            dispatchLicenseExitHeader: number,
            vehicleCode: number,
            pilotCode: number,
            userCredentials: Model.UserCredentials
        ): InsertExitPassFromDispatchLicence {
            let entity: InsertExitPassFromDispatchLicence = {
                dispatchLicenseExitHeader: dispatchLicenseExitHeader,
                vehicleCode: vehicleCode,
                pilotCode: pilotCode,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }

        public static createGetTaskDetailForReceptionConsolidatedRequest(
            serialNumber: number,
            userCredentials: Model.UserCredentials
        ): GetTaskDetailForReceptionConsolidated {
            let entity: GetTaskDetailForReceptionConsolidated = {
                serialNumber: serialNumber,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        public static createRegisterGeneralTransferReceptionRequest(
            task: Model.Task,
            transMt2: number,
            userCredentials: Model.UserCredentials,
            targetLicenseId: number,
            materialId: string,
            targetLocation: string
        ): RegisterGeneralTransferReception {
            let entity: RegisterGeneralTransferReception = {
                loginId: userCredentials.loginId,
                materialId: materialId,
                sourceLicense: task ? task.licenseIdSource : undefined,
                targetLicense: targetLicenseId,
                targetLocation: targetLocation,
                policyCode: task ? task.targetPolicyCode : undefined,
                wavePickingId: task ? task.wavePickingId : undefined,
                serialNumber: task ? task.id : undefined,
                transMt2: transMt2,
                result: "",
                taskId: task ? task.id : undefined,
                password: userCredentials.password,
                userRole: "Host",
                userName: userCredentials.userName,
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        public static createRegisterGeneralTransferPickingRequest(
            processSku: Model.ProcessSku,
            task: Model.Task,
            transMt2: number,
            dispatchLicenseId: number,
            userCredentials: Model.UserCredentials
        ): RegisterGeneralTransferPicking {
            let entity: RegisterGeneralTransferPicking = {
                loginId: userCredentials.loginId,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                targetLicense: dispatchLicenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                policyCode: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                serialNumber: task.id,
                transMt2: transMt2,
                locationType: processSku.locationType,
                result: "",
                taskId: task.id,
                password: userCredentials.password,
                userRole: "Host",
                userName: userCredentials.userName,
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
    }
}

export namespace DataResponse {
    export interface BasicResponse {
        code: number;
        message: string;
    }

    export interface OP_WMS_SP_GET_TASK_DETAIL_FOR_RECEPTION_CONSOLIDATED {
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        QTY: number;
        QTY_DOC: number;
        QTY_DIFFERENCE: number;
        TASK_COMMENTS: string;
        BARCODE_ID: string;
        SERIAL_NUMBER: number;
        CODIGO_POLIZA_TARGET: string;
        CODIGO_POLIZA_SOURCE: string;
    }

    export interface SerialNumbers {
        SERIAL: string;
        Resultado: number;
        Mensaje: string;
        Codigo: number;
        DbData: string;
    }

    export interface OP_WMS_SP_GET_PRINT_PASS_FORMAT_BY_HH {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_INFO_BATCH {
        BATCH: string;
        DATE_EXPIRATION: Date;
    }

    export interface OP_WMS_GET_SUGGESTED_DISPATCH_LICENSE {
        LICENCE_ID: number;
        LOCATION: string;
        MATERIAL_ID: string;
        QTY: number;
        TONE: string;
        CALIBER: string;
        STATUS_CODE: string;
        STATUS_NAME: string;
    }

    export interface OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_DISPATCH {
        WAVE_PICKING_ID: number;
        PRIORITY: number;
        COMPLETED_DATE: Date;
        CLIENT_NAME: string;
        DOC_NUM: number;
    }

    export interface OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE {
        WAVE_PICKING_ID: number;
        TASK_TYPE: Enums.TaskType;
        TASK_SUBTYPE: Enums.TaskSubType;
        DOC_NUM: string;
    }

    export interface OP_WMS_SP_VALIDATED_IF_JOIN_SPOT_EXISTS {
        EXISTS: number;
    }

    export interface SetupEnvironment {
        platform: string;
        environmentName: string;
        wsHost: string;
        sqlConnection: string;
        status: string;
    }

    export interface Domain {
        id?: number;
        domain: string;
        user: string;
        password: string;
        server: string;
        port: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface Login {
        loginId: string;
        roleId: string;
        loginName: string;
        loginType: string;
        loginStatus: string;
        loginPwd: string;
        loginPwdAlternate: string;
        licenseSerial: string;
        environment: string;
        guiLayout: string;
        isLogged: number;
        lastLogged: Date;
        defaultWarehouseId: string;
        consolidationTerminal: number;
        generateTasks: string;
        loadingGate: string;
        lineId: string;
        swift3PlWarehouse: string;
        email: string;
        authorizer: number;
        isExternal: number;
        relatedClient: string;
        notifyLetterQuota: number;
        distributionCenterId: string;
        canRelocate: number;
        linePosition: string;
        spotColumn: string;
        terminalIp: string;
        externalUserLogin: string;
        externalNameUser: string;
        SetupEnvironment: SetupEnvironment;
        Domain: Domain;
    }

    export interface Task {
        groupId?: number;
        id: number;
        wavePickingId: number;
        transOwner: number;
        taskType: Enums.TaskType;
        taskSubtype: Enums.TaskSubType;
        taskOwner: string;
        taskAssignedTo: string;
        taskComments: string;
        assignedDate: Date;
        quantityPending: number;
        quantityAssigned: number;
        sourcePolicyCode: string;
        targetPolicyCode: string;
        licenseIdSource: number;
        regime: Enums.Regime;
        isCompleted: Enums.YesNo;
        isDiscretional: Enums.YesNo;
        isPaused: number;
        isCanceled: Enums.YesNo;
        materialId: string;
        barcodeId: string;
        alternateBarcode: string;
        materialName: string;
        warehouseSource: string;
        warehouseTarget: string;
        locationSpotSource: string;
        locationSpotTarget: string;
        clientOwner: string;
        clientName: string;
        acceptedDate: Date;
        completedDate: Date;
        canceledDatetime: Date;
        canceledBy: string;
        materialShortName: string;
        isLocked: string;
        isDiscretionary: number;
        typeDiscretionary: string;
        lineNumberSourcePolicy: number;
        lineNumberTargetPolicy: number;
        docIdSource: number;
        docIdTarget: number;
        isAccepted: Enums.YesNo;
        isFromSonda: Enums.YesNo;
        isFromErp: Enums.YesNo;
        priority: number;
        replenishMaterialIdTarget: string;
        fromMasterpack: Enums.YesNo;
        masterPackCode: string;
        owner: string;
        sourceType: string;
        transferRequestId: number;
        tone: string;
        caliber: string;
        licenseIdTarget: number;
        inPickingLine: Enums.YesNo;
        isForDeliveryImmediate: Enums.YesNo;
        Material: any;
        Configuration: any;
        icon?: string;
        showDetails?: boolean;
        License?: License;
        projectId: string;
        projectCode: string;
        projectName: string;
        projectShortName: string;
        reference: string;
        statusCode: string;
    }

    export interface License {
        licenseId: number;
        clientOwner: string;
        policyCode: string;
        currentWarehouse: string;
        currentLocation: string;
        lastLocation: string;
        lastUpdated: Date;
        lastUpdatedBy: string;
        status: string;
        regime: string;
        createdDate: Date;
        usedMt2: number;
        policyCodeRectification: string;
        pickingDemandHeaderId: number;
        wavePickingId: string;
    }

    export interface OP_WMS_SP_GET_LOCATIONS_FOR_COUNT {
        WAREHOUSE_ID: string;
        ZONE: string;
        LOCATION: string;
        ZONE_DESCRIPTION: string;
    }

    export interface OP_WMS_SP_GET_MY_COUTING_TASK {
        TASK_ID: number;
        REGIMEN: Enums.Regime;
        DISTRIBUTION_CENTER: string;
        PRIORITY: number;
        LOCATIONS: number;
        ASSIGNED_DATE: Date;
        TASK_TYPE: Enums.TaskType;
    }

    export interface OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT {
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        BARCODE_ID: string;
        BATCH_REQUESTED: number;
        SERIAL_NUMBER_REQUESTS: number;
        IS_CAR: number;
    }

    export interface OP_WMS_SP_GET_MATERIAL_BY_BARCODE {
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        SHORT_NAME: string;
        SERIAL_NUMBER_REQUESTS: number;
        BATCH_REQUESTED: number;
        LICENSE_ID: number;
        UNIT: string;
        UNIT_QTY: number;
        BATCH?: string;
        EXPIRATION_DATE?: Date;
        QTY?: number;
    }

    export interface OP_WMS_SP_FINISH_LOCATION {
        RESULT: string;
    }

    export interface OP_WMS_SP_RECOUNT_LOCATION {
        RESULT: string;
    }

    export interface OP_WMS_SP_GET_MANIFEST_HEADER_FOR_CERTIFICATION {
        MANIFEST_HEADER_ID: number;
        DRIVER: number;
        VEHICLE: number;
        DISTRIBUTION_CENTER: string;
        CREATED_DATE: Date;
        STATUS: string;
        LAST_UPDATE: Date;
        LAST_UPDATE_BY: string;
        MANIFEST_TYPE: Enums.ManifestType;
        TRANSFER_REQUEST_ID: number;
        CERTIFICATION_HEADER_ID: number;
        STATUS_CERTIFICATION: string;
    }

    export interface OP_WMS_SP_GET_MATERIAL_FOR_MANIFEST {
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        SERIAL_NUMBER_REQUESTS: number;
    }

    export interface OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT {
        MATERIAL_ID: string;
        MEASUREMENT_UNIT: string;
        QTY: number;
        BARCODE_ID: string;
        ALTERNATE_BARCODE: string;
    }

    export interface OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED {
        MATERIAL_ID: string;
        QTY: number;
        CERTIFICATION_TYPE: Enums.CertificationType;
        showDetails?: boolean;
        serialNumberRequests: Enums.YesNo;
        icon?: string;
        SerialNumbers?: Array<OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>;
    }

    export interface OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER {
        LABEL_ID: number;
        CERTIFICATION_TYPE: Enums.CertificationType;
        MATERIAL_ID: string;
        SERIAL_NUMBER: string;
    }

    export interface OP_WMS_SP_GET_RECEPTION_TASK {
        TAREA: number;
        CLIENT_CODE: string;
        CLIENTE: string;
        POLIZA: string;
        ORDEN: string;
        TIPO: Enums.TaskType;
        LOCATION_SPOT_TARGET: string;
        SUBTIPO: Enums.TaskSubType;
        REGIMEN: Enums.Regime;
        PRIORITY: string;
        DOCUMENTO_ERP: string;
        ES_FACTURA: Enums.YesNo;
        CODE_SUPPLIER: string;
        NAME_SUPPLIER: string;
    }
    export interface OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE {
        LICENSE_ID: number;
        MATERIAL_ID: string;
        QTY: number;
        TONE: string;
        CALIBER: string;
        SPOT_TYPE: Enums.LocationType;
        USED_MT2: number;
        TASK_SUBTYPE: string;
        IS_DISCRETIONARY: number;
        QUANTITY_PENDING: number;
        SERIAL_NUMBER_REQUESTS: number;
    }
    export interface OP_WMS_GET_SCANNED_MATERIAL_BY_LICENSE_IN_RECEPTION_TASK {
        CLIENT_OWNER: string;
        MATERIAL_ID: string;
        BARCODE_ID: string;
        ALTERNATE_BARCODE: string;
        MATERIAL_NAME: string;
        SHORT_NAME: string;
        VOLUME_FACTOR: number;
        MATERIAL_CLASS: string;
        HIGH: number;
        LENGTH: number;
        WIDTH: number;
        MAX_X_BIN: number;
        SCAN_BY_ONE: number;
        REQUIRES_LOGISTICS_INFO: number;
        WEIGTH: number;
        IMAGE_1: string;
        IMAGE_2: string;
        IMAGE_3: string;
        LAST_UPDATED: Date;
        LAST_UPDATED_BY: string;
        IS_CAR: number;
        MT3: number;
        BATCH_REQUESTED: number;
        SERIAL_NUMBER_REQUESTS: number;
        IS_MASTER_PACK: number;
        ERP_AVERAGE_PRICE: number;
        WEIGHT_MEASUREMENT: string;
        EXPLODE_IN_RECEPTION: number;
        HANDLE_TONE: number;
        HANDLE_CALIBER: number;
        QUALITY_CONTROL: number;
        MEASUREMENT_UNIT: string;
        MEASUREMENT_QTY: number;
        EXPIRATION_TOLERANCE: number;
    }

    export interface OP_WMS_VALIDATE_LOCATION_MAX_WEIGHT_AND_VOLUME {
        AVAILABLE_WEIGHT: number;
        WEIGHT_ICON: string;
        WEIGHT_ICON_COLOR: string;
        AVAILABLE_VOLUME: number;
        VOLUME_ICON: string;
        VOLUME_ICON_COLOR: string;
    }

    export interface OP_WMS_SP_GET_REQUESTED_SERIAL_NUMBERS_DISCRETIONAL_PICKING_BY_LICENSE {
        SERIAL: string;
    }

    export interface OP_WMS_GET_TYPE_CHARGE_BY_MOBILE {
        TYPE_CHARGE_ID: number;
        CHARGE: string;
        DESCRIPTION: string;
        WAREHOUSE_WEATHER: string;
        REGIMEN: Enums.Regime;
        COMMENT: string;
        DAY_TRIP: string;
        SERVICE_CODE: string;
        TO_MOVIL: number;
        QTY: number;
    }

    export interface OP_WMS_SP_GET_PARAMETER {
        IDENTITY: number;
        GROUP_ID: string;
        PARAMETER_ID: string;
        VALUE: string;
        LABEL: string;
    }

    export interface OP_WMS_SP_GET_LAST_DISPATCH_LICENSE_GENERATED_BY_WAVE_PICKING {
        LICENSE_ID: number;
    }

    export interface OP_WMS_SP_GET_LICENSE_DISPATCH_BY_WAVE_PICKING {
        LOCATION_SPOT_TARGET: string;
        LICENSE_ID: number;
        CURRENT_LOCATION: string;
    }

    export interface OP_WMS_SP_GET_TARGET_LOCATION_BY_LICENSE_DISPATCH {
        LOCATION_SPOT_TARGET: string;
        LICENSE_ID: number;
        CURRENT_LOCATION: string;
    }

    export interface OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH {
        WAVE_PICKING_ID: number;
        CLIENT_NAME: string;
        DOC_NUM: number;
        DELIVERY_DATE: Date;
    }

    export interface OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING {
        LICENSE_ID: number;
        CURRENT_LOCATION: string;
        LAST_UPDATED_BY: string;
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        QTY: number;
        QTY_ORIGIN: number;
    }

    export interface Operation {
        Resultado: Enums.OperationResult;
        Mensaje: string;
        Codigo: number;
        DbData: string;
    }

    export interface ShelfSpot {
        warehouseParent?: string;
        zone?: string;
        locationSpot?: string;
        spotType?: Enums.LocationType;
        spotOrderby?: number;
        spotAisle?: number;
        spotColumn?: string;
        spotLevel?: string;
        spotPartition?: number;
        spotLabel: string;
        allowPicking: Enums.YesNo;
        allowStorage?: Enums.YesNo;
        allowRealloc: Enums.YesNo;
        available: Enums.YesNo;
        lineId: string;
        spotLine: string;
        locationOverloaded: number;
        maxMt2Occupancy: number;
        maxWeight: number;
        section: string;
        volume: number;
        isWaste: number;
        allowFastPicking: number;
    }

    export interface Charge {
        typeChargeId: number;
        charge: string;
        description: string;
        warehouseWeather: string;
        regime: Enums.Regime;
        comment: string;
        dayTrip: string;
        serviceCode: string;
        toMovil: number;
        qty: number;
    }

    export interface OP_WMS_SP_GET_INVENTORY_BY_LICENSE {
        LICENSE_ID: number;
        CURRENT_LOCATION: string;
        CODIGO_POLIZA: string;
        CLIENT_OWNER: string;
        MATERIAL_ID: string;
        QTY: number;
        VIN: string;
        BATCH: string;
        DATE_EXPIRATION: Date;
        TONE: string;
        CALIBER: string;
        SERIAL_NUMBER_REQUESTS: number;
        PICKING_DEMAND_HEADER_ID: number;
        DOC_NUM: number;
        WAVE_PICKING_ID: number;
        STATUS_NAME: string;
        SHORT_NAME: string;
    }

    export interface OP_WMS_SP_GET_MATERIAL_X_SERIAL_NUMBER {
        CORRELATIVE: number;
        LICENSE_ID: number;
        MATERIAL_ID: string;
        SERIAL: string;
        BATCH: string;
        DATE_EXPIRATION: Date;
    }

    export interface OP_WMS_SP_GET_CHECKPOINTS_BY_USER {
        ROLE_ID: string;
        CHECK_ID: string;
    }

    export interface OP_WMS_SP_GET_INVENTORY_BY_MATERIAL {
        LICENSE_ID: number;
        CURRENT_LOCATION: string;
        CODIGO_POLIZA: string;
        CLIENT_OWNER: string;
        REGIMEN: Enums.Regime;
        MATERIAL_ID: string;
        QTY: number;
        VIN: string;
        BATCH: string;
        DATE_EXPIRATION: Date;
        TONE: string;
        CALIBER: string;
        SERIAL_NUMBER_REQUESTS: number;
        PICKING_DEMAND_HEADER_ID: number;
        DOC_NUM: number;
        STATUS_NAME: string;
        SHORT_NAME: string;
    }

    export interface OP_WMS_SP_GET_INVENTORY_BY_LOCATION_SPOT {
        LICENSE_ID: number;
        CURRENT_LOCATION: string;
        CODIGO_POLIZA: string;
        CLIENT_OWNER: string;
        REGIMEN: Enums.Regime;
        MATERIAL_ID: string;
        QTY: number;
        VIN: string;
        BATCH: string;
        DATE_EXPIRATION: Date;
        TONE: string;
        CALIBER: string;
        SERIAL_NUMBER_REQUESTS: number;
        PICKING_DEMAND_HEADER_ID: number;
        DOC_NUM: number;
        STATUS_NAME: string;
        SHORT_NAME: string;
    }

    export interface OP_WMS_SP_GET_LOCATION_INFO {
        LOCATION_SPOT: string;
        WAREHOUSE_PARENT: string;
        SPOT_TYPE: Enums.LocationType;
        ZONE: string;
        ALLOW_PICKING: number;
        ALLOW_STORAGE: number;
        ALLOW_REALLOC: number;
        AVAILABLE_VOLUME: number;
        AVAILABLE_WEIGHT: number;
    }

    export interface OP_WMS_SP_GET_LABEL {
        LABEL_ID: number;
        LOGIN_ID: string;
        LICENSE_ID: number;
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        QTY: number;
        CODIGO_POLIZA: string;
        SOURCE_LOCATION: string;
        TARGET_LOCATION: string;
        TRANSIT_LOCATION: string;
        BATCH: string;
        VIN: string;
        TONE: string;
        CALIBER: string;
        SERIAL_NUMBER: string;
        STATUS: string;
        WEIGHT: number;
        WAVE_PICKING_ID: number;
        TASK_SUBT_YPE: string;
        WAREHOUSE_TARGET: string;
        CLIENT_NAME: string;
        CLIENT_CODE: string;
        STATE_CODE: number;
        REGIMEN: string;
        TRANSFER_REQUEST_ID: number;
        DATE_TIME: Date;
        LOGIN_NAME: string;
        DOC_NUM: number;
        DOC_ENTRY: number;
    }

    export interface OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE {
        SLOTTING_ZONE_ID: string;
        WAREHOUSE_CODE: string;
        ZONE_ID: number;
        ZONE: string;
        MANDATORY: number;
        COUNT_CLASS: number;
        COUNT_CLASS_IN_LICENSE: number;
        DIFFERENCE_OF_CLASSES: number;
        LOCATION: string;
        SPOT_TYPE: string;
        MAX_WEIGHT: number;
        LOCATION_WEIGHT: number;
        LOCATION_VOLUME: number;
        VOLUME: number;
        AVAILABLE_WEIGHT: number;
        WEIGHT_ICON: string;
        WEIGHT_ICON_COLOR: string;
        AVAILABLE_VOLUME: number;
        VOLUME_ICON: string;
        VOLUME_ICON_COLOR: string;
    }

    export interface OP_WMS_SP_GET_SUGGESTED_LOCATIONS_OF_MATERIAL_BY_LICENSE {
        LOCATION_SPOT: string;
        MATERIAL_ID: string;
        QTY: number;
        TONE_AND_CALIBER_ID: number;
        TONE: string;
        CALIBER: string;
        BATCH: string;
        DATE_EXPIRATION: Date;
    }

    export interface OP_WMS_SP_GET_LICENSE_COMPATIBLE_CLASS_FOR_LOCATION {
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        CLASS_ID: number;
        CLASS_NAME: string;
        CLASS_DESCRIPTION: string;
        COMPATIBLE: number;
    }

    export interface OP_WMS_SP_GET_LICENSE_PRINT_FORMAT {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_LABEL_PRINT_FORMAT {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_MATERIAL_PRINT_FORMAT {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_STATUS_PRINT_FORMAT {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_TEST_PRINT_FORMAT {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_LICENSE_DISPATCH_PRINT_FORMAT {
        FORMAT: string;
    }

    export interface OP_WMS_SP_GET_AVAILABLE_LICENSE_DETAIL {
        LICENSE_ID: number;
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        QTY: number;
        COMMITED_QTY: number;
        AVAILABLE_QTY: number;
        SERIAL_NUMBER_REQUESTS: number;
        IS_CAR: number;
        VIN: string;
        BATCH_REQUESTED: number;
        BATCH: string;
        DATE_EXPIRATION: Date;
        STATUS_ID: number;
        HANDLE_TONE: number;
        TONE: string;
        HANDLE_CALIBER: number;
        CALIBER: string;
        STATUS_CODE: string;
        STATUS_NAME: string;
    }

    export interface OP_WMS_SP_GET_INFO_OF_LICENSE_IN_LOCATION_FOR_MERGE {
        LICENSE_ID: number;
        LICENSE_DESCRIPTION: string;
        MATERIAL_ID: string;
        QTY: number;
        BATCH: string;
        EXPIRATION_DATE: Date;
        TONE: string;
        CALIBER: string;
        TONE_AND_CALIBER_ID: number;
        PICKING_DEMAND_HEADER_ID: number;
        DOC_NUM: number;
    }

    export interface OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES {
        LICENSE_ID: number;
        MATERIAL_ID: string;
        SERIAL: string;
    }

    export interface OP_WMS_GET_MASTER_PACK_BY_LICENSE {
        MASTER_PACK_HEADER_ID: number;
        LICENSE_ID: number;
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        POLICY_HEADER_ID: number;
        LAST_UPDATED: Date;
        LAST_UPDATE_BY: string;
        EXPLODED: Enums.YesNo;
        EXPLODED_DATE: Date;
        RECEPTION_DATE: Date;
        QTY: number;
        BATCH: string;
        DATE_EXPIRATION: Date;
    }

    export interface OP_WMS_SP_GET_MASTER_PACK_DETAIL_BY_LICENCE {
        MASTER_PACK_DETAIL_ID: number;
        MASTER_PACK_HEADER_ID: number;
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        CLIENT_CODE: string;
        CLIENT_NAME: string;
        BARCODE_ID: string;
        QTY: number;
        BATCH: string;
        DATE_EXPIRATION: Date;
    }

    export interface OP_WMS_SP_GET_INFO_LICENSE_DISPATCH {
        WAVE_PICKING_ID: number;
        DOC_NUM: string;
        CUSTOMER_NAME: string;
        DUE_DATE: Date;
        PREPARED_BY: string;
        CORRELATIVE: number;
        TOTAL_LICENSES: number;
    }

    export interface OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE {
        SLOTTING_ZONE_ID: string;
        WAREHOUSE_CODE: string;
        ZONE_ID: number;
        ZONE: string;
        MANDATORY: number;
        COUNT_CLASS: number;
        COUNT_CLASS_IN_LICENSE: number;
        DIFFERENCE_OF_CLASSES: number;
        LOCATION: string;
        SPOT_TYPE: string;
        MAX_WEIGHT: number;
        LOCATION_WEIGHT: number;
        LOCATION_VOLUME: number;
        VOLUME: number;
    }
}
export namespace Model {
    export interface MergeLicense {
        licenseId: number;
        licenseDescription: string;
        icon: string;
        showDetails: boolean;
        detail: Array<MergeDetail>;
    }

    export interface TransactionOperator {
        id?: number;
        licenseId: number;
        materialId?: string;
        materialName?: string;
        qty?: number;
        dateCreated: Date;
        taskId?: number;
        taskType: Enums.TaskTypeLog;
        location?: string;
        loginId: string;
        sourceLocation?: string;
    }

    export interface MergeDetail {
        materialId: string;
        quantity: number;
        batch: string;
        expirationDate: Date;
        tone: string;
        caliber: string;
        headerId: number;
        docNum: number;
    }

    export interface Printer {
        address: string;
        friendlyName: string;
        isPrinterZebra: boolean;
        selected?: boolean;
        color?: string;
    }

    export interface LabelInfo {
        labelId: number;
        loginId: string;
        licenseId: number;
        materialId: string;
        materialName: string;
        qty: number;
        policyCode: string;
        sourceLocation: string;
        targetLocation: string;
        transitLocation: string;
        batch: string;
        vin: string;
        tone: string;
        caliber: string;
        serialNumber: string;
        status: string;
        weight: number;
        wavePickingId: number;
        taskSubType: string;
        warehouseTarget: string;
        clientName: string;
        clientCode: string;
        stateCode: number;
        regime: string;
        transferRequestId: number;
        dateTime: Date;
        loginName: string;
        docNum: number;
        docEntry: number;
    }

    export interface RelocateFullLicenseParams {
        licenseId: number;
        labelId: number;
    }

    export interface LocatePartialLicenseParams {
        baseLicenseId: number;
        licenseId: number;
        detail: Array<Model.Material>;
        clientOwner: string;
        policyCode: string;
        location: string;
        comesFrom: Enums.Page;
        showSuggestedLocation: Enums.ShowSuggestedLocation;
        taskId: number;
        actionBack: boolean;
    }

    export interface RelocatePartialLicenseSeriesParams {
        baseLicenseId: number;
        licenseId: number;
        material: Model.Material;
        clientOwner: string;
        detail: Array<Model.Material>;
        policyCode: string;
        materialStatus: string;
    }

    export interface BroadcastTasksLost {
        broadcasts: Array<Broadcast>;
    }
    export interface BroadcastTasks {
        broadcast: Broadcast;
    }
    export interface BroadcastFromServer {
        broadcast: Broadcast;
    }
    export interface Broadcast {
        id?: number;
        status: string;
        loginId: string;
        operationType: string;
        lastUpdateBy?: string;
        createdBy?: string;
    }
    export interface WirelessInfo {
        status: boolean;
        icon: string;
        iconColor: string;
        ip: string;
        name: string;
    }

    export interface BluetoothInfo {
        status: boolean;
        icon: string;
        iconColor: string;
    }

    export interface UserConnectionInfo {
        CommunicationAddress: string;
        ValidationType: Enums.ValidationTypes;
        Channel?: string;
        DeviceId?: string;
    }

    export interface ReceptionTaskHeader {
        taskId: number;
        clientCode: string;
        clientName: string;
        policyCode: string;
        order: string;
        receptionType: Enums.TaskType;
        locationSpotTarget: string;
        receptionSubType: Enums.TaskSubType;
        regime: Enums.Regime;
        document: string;
        isInvoice: Enums.YesNo;
        supplierCode: string;
        supplierName: string;
    }
    export interface ObjectPickingHeader {
        pickingTasks: Array<Model.PickingTaskHeader>;
        objectReduce?: any;
    }

    export interface PickingTaskHeader {
        wavePickingId: number;
        qtyPending: number;
        qtyAssigned: number;
        Material: Material;
        Tasks: Array<Task>;
        icon: string;
        showDetails: boolean;
        SerialNumbers: Array<MaterialSerialNumber>;
        qty: number;
        ScannedSeries?: Array<MaterialSerialNumber>;
        isComplete?: boolean;
    }

    export interface Charge {
        typeChargeId: number;
        charge: string;
        description: string;
        warehouseWeather: string;
        regime: Enums.Regime;
        comment: string;
        dayTrip: string;
        serviceCode: string;
        toMovil: number;
        qty: number;
        licenseId?: number;
        transType?: Enums.TransType;
    }

    export interface CreateLicenseParam {
        taskId: number;
        regime?: Enums.Regime;
        wavePickingId?: number;
        task?: Model.Task;
    }

    export interface GeneralReceptionParam {
        licenseId: number;
        taskId: number;
        clientOwner: string;
        detail?: Array<Model.Material>;
        material?: Model.Material;
        action?: Enums.ReceptionAction;
        taskSubtype: Enums.TaskSubType;
        actionBack: boolean;
        showSuggestedLocation: Enums.ShowSuggestedLocation;
        locationScan?: string;
        location: string;
        comesFrom: Enums.Page;
        regime?: Enums.Regime;
        reqRegisterGenTransReception?: DataRequest.RegisterGeneralTransferReception;
        wavePickingId?: number;
        task?: Model.Task;
    }

    export interface RelocationFullParam {
        licenseId: number;
        locationScan?: string;
        location: string;
        comesFrom: Enums.Page;
        actionBack: boolean;
        showSuggestedLocation: Enums.ShowSuggestedLocation;
    }

    export interface CompatibleClassSuggestion {
        MATERIAL_ID: string;
        MATERIAL_NAME: string;
        CLASS_ID: number;
        CLASS_NAME: string;
        CLASS_DESCRIPTION: string;
        COMPATIBLE: number;
    }

    export interface MaterialInfoParams {
        materialId: string;
        licenseId?: number;
        locationSpot?: string;
        isMoreResults: boolean;
    }

    export interface LicenseInfoParams {
        licenseId: number;
        wavePickingId?: number;
        regime?: Enums.Regime;
        task?: Model.Task;
    }

    export interface RelocatePartialLicenseParams {
        sourceLicenseId: number;
        targetLicenseId: number;
        policyCode: string;
        clientOwner: string;
        actionBack: boolean;
    }

    export interface LocationInfoParams {
        locationId: string;
    }

    export interface LabelInfoParams {
        labelId: number;
    }

    export interface RelocateFullLicenseParams {
        licenseId: number;
    }

    export interface GeneralReceptionSeriesParam {
        licenseId: number;
        taskId: number;
        clientOwner: string;
        detail: Array<Model.Material>;
        material: Model.Material;
        action: Enums.ReceptionAction;
        materialStatus: string;
        taskSubtype: Enums.TaskSubType;
        isReceptionByPurchaseDocument: boolean;
        regime?: Enums.Regime;
    }

    export interface LicenseChargesParam {
        licenseId: number;
        taskId?: number;
        wavePickingId?: number;
        charges: Array<Model.Charge>;
        transType?: Enums.TransType;
        times: number;
        regime?: Enums.Regime;
        task?: Model.Task;
        reqRegisterGenTransReception?: DataRequest.RegisterGeneralTransferReception;
    }

    export interface LocateGeneralPickingParam {
        wavePickingId: number;
        locationSpotTarget: string;
    }

    export interface GeneralPickingParam {
        wavePickingId: number;
        regime?: Enums.Regime;
    }

    export interface ProcessGeneralPickingParams {
        task: Model.Task;
        taskHeader: Model.PickingTaskHeader;
        labelId: number;
        processSku: Model.ProcessSku;
        materials: Array<
            DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
        >;
        labelDispatchId: number;
        completeScanSeries?: boolean;
        regime?: Enums.Regime;
        isGeneralTransfer?: boolean;
        wavePickingId?: number;
    }

    export interface ProcessGeneralReplenishmentParams {
        task: Model.Task;
        taskHeader: Model.PickingTaskHeader;
        processSku: Model.ProcessSku;
        materials: Array<
            DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
        >;
        labelDispatchId: number;
    }

    export interface LocateGeneralPickingParams {
        wavePickingId: number;
        isPickingTaskComplete: boolean;
        currentLocation?: Model.LocationDispatch;
        locations?: Array<Model.LocationDispatch>;
        currentScan?: Enums.LocateLicensePickingScan;
        regime?: Enums.Regime;
        isGeneralTransfer?: boolean;
        task?: Model.Task;
        reqRegisterGenTransReception?: DataRequest.RegisterGeneralTransferReception;
    }

    export interface SuggestedPickinggParams {
        wavePickingId: number;
        materialId: string;
        materialName: string;
        task: Model.Task;
        taskHeader: Model.PickingTaskHeader;
        materials: Array<
            DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
        >;
        labelId: number;
        labelDispatchId: number;
        projectId: string;
        regime?: Enums.Regime;
    }

    export interface LocateGeneralReplenishmentParams {
        wavePickingId: number;
        isPickingTaskComplete: boolean;
        currentLocation?: Model.LocationDispatch;
        locations?: Array<Model.LocationDispatch>;
        currentScan?: Enums.LocateLicensePickingScan;
    }

    export interface LocationDispatch {
        id: number;
        targetLocation: string;
        showDetails: boolean;
        showScanIcon: boolean;
        isComplete: boolean;
        icon: string;
        color: string;
        targetLocationScanned?: string;
        licenses: Array<LicenseDispatch>;
    }

    export interface LicenseDispatch {
        id: number;
        licenseId: number;
        currentLocation?: string;
        isComplete: boolean;
        showScanIcon: boolean;
    }

    export interface WavePickingLicenseDispatchParams {
        wavePickingForLicenseDispatch: DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH;
        backPage: boolean;
    }

    export interface GenerateExitPassFromDispatchnParam {
        dispatchNumber: number;
    }

    export interface LicenseDispatchExit {
        licenseId: number;
        location: string;
        pickedBy: string;
        detail: Array<DetailLicenseDispatch>;
        showDetails: boolean;
        icon: string;
        isComplete: boolean;
        showScanIcon: boolean;
        correlative: number;
    }

    export interface DetailLicenseDispatch {
        materialId: string;
        materialName: string;
        qty: number;
        qtyOrigin: number;
    }

    export class DocumentMessage<TDocument, TPrimaryKey> {
        public static createDocumentMessage<TDocument, TPrimaryKey>(
            primaryKey: TPrimaryKey,
            messageType: Enums.DocumentMessageType,
            Document: TDocument
        ): DocumentMessage<TDocument, TPrimaryKey> {
            let message = new DocumentMessage<TDocument, TPrimaryKey>();
            message.primaryKey = primaryKey;
            message.messageType = messageType;
            message.Document = Document;
            return message;
        }

        private _messageType: Enums.DocumentMessageType;
        public get messageType(): Enums.DocumentMessageType {
            return this._messageType;
        }

        public set messageType(v: Enums.DocumentMessageType) {
            this._messageType = v;
        }

        private _Document: TDocument;
        public get Document(): TDocument {
            return this._Document;
        }

        public set Document(v: TDocument) {
            this._Document = v;
        }

        private _primaryKey: TPrimaryKey;
        public get primaryKey(): TPrimaryKey {
            return this._primaryKey;
        }

        public set primaryKey(v: TPrimaryKey) {
            this._primaryKey = v;
        }
    }

    export interface DocumentViewModelFilter<TEntity> {
        filter: (element: TEntity) => boolean;
        selector: any;
    }

    export interface Package {
        name: Enums.PackageNames;
        remoteUrl?: string;
        db: any;
        status?: Enums.PackageStatus;
        filter: string;
        query_params: any;
    }

    export interface Rule {
        EVENT_ID: number;
        NAME_EVENT: string;
        TYPE: string;
        FILTERS: string;
        ACTION: string;
        NAME_ACTION: string;
        TYPE_ACTION: string;
        ENABLED: Enums.YesNo;
        CODE: string;
        EVENT_ORDER: number;
    }

    export interface Parameter {
        ID: number;
        PARAMETER_GROUP: string;
        NAME: string;
        VALUE: any;
    }

    export interface User {
        id?: number;
        firstName: string;
        lastName: string;
        loginId: string;
        password: string;
        branchId: number;
        userRole: string;
    }

    export interface UserCredentials {
        password: string;
        login?: string;
        loginId: string;
        userRole: string;
        communicationAddress?: string;
        userName?: string;
        loginImage?: string;
        validationType?: Enums.ValidationTypes;
        domain?: string;
        dbUser?: string;
        dbPassword?: string;
        deviceId: string;
        serverIp?: string;
    }

    export interface CalculationRule {
        displayDecimalsRoundType: Enums.RoundType;
        displayDecimalsRoundConfiguration: Enums.QuantityType;
        defaultDisplayDecimals: number;
        defaultCalculationsDecimals: number;
    }

    export interface Printer {
        address: string;
        friendlyName: string;
        isPrinterZebra: boolean;
        selected?: boolean;
        color?: string;
    }

    export interface PrinterFont {
        font: Enums.ZebraFonts;
        size: number;
    }

    export interface PrinterHorizontalTextAlignment {
        alignment: Enums.ZebraHorizontalAlignment;
        offset: number;
    }

    export interface PrinterDocument {
        lines: Array<string>;
        verticalOffset: number;
        createdDate: Date;
        createdBy: string;
    }

    export class CalculatedValue {
        value: any;
        display: any;
        title: string;
        type: Enums.CalculatedOptions;
    }

    export interface NavigationTab {
        tabName: Enums.Page;
        isActive: boolean;
        currentRoot: Enums.Page;
        navigationStack: Array<Enums.Page>;
    }

    export interface Notification<TData> extends Docs.Document {
        to: string;
        title: string;
        description: string;
        timestamp: Date;
        isRead: boolean;
        level: Enums.NotificationLevel;
        type: Enums.NotificationType;
        data: TData;
        triggerAction: boolean;
        titleParameters: Array<any>;
        descriptionParameters: Array<any>;
    }

    export interface Currency extends Docs.Document {
        CURRENCY_ID: number;
        CODE_CURRENCY: string;
        NAME_CURRENCY: string;
        SYMBOL_CURRENCY: string;
        IS_DEFAULT: number;
    }

    export interface Task {
        groupId?: number;
        id: number;
        wavePickingId: number;
        transOwner: number;
        taskType: Enums.TaskType;
        taskSubtype: Enums.TaskSubType;
        taskOwner: string;
        taskAssignedTo: string;
        taskComments: string;
        assignedDate: Date;
        quantityPending: number;
        quantityPendingWithUnitMsr?: number;
        quantityAssigned: number;
        sourcePolicyCode: string;
        targetPolicyCode: string;
        licenseIdSource: number;
        regime: Enums.Regime;
        isCompleted: Enums.YesNo;
        isDiscretional: Enums.YesNo;
        isPaused: number;
        isCanceled: Enums.YesNo;
        materialId: string;
        barcodeId: string;
        alternateBarcode: string;
        materialName: string;
        warehouseSource: string;
        warehouseTarget: string;
        locationSpotSource: string;
        locationSpotTarget: string;
        clientOwner: string;
        clientName: string;
        acceptedDate: Date;
        completedDate: Date;
        canceledDatetime: Date;
        canceledBy: string;
        materialShortName: string;
        isLocked: string;
        isDiscretionary: number;
        typeDiscretionary: string;
        lineNumberSourcePolicy: number;
        lineNumberTargetPolicy: number;
        docIdSource: number;
        docIdTarget: number;
        isAccepted: Enums.YesNo;
        isFromSonda: Enums.YesNo;
        isFromErp: Enums.YesNo;
        priority: number;
        replenishMaterialIdTarget: string;
        fromMasterpack: Enums.YesNo;
        masterPackCode: string;
        owner: string;
        sourceType: string;
        transferRequestId: number;
        tone: string;
        caliber: string;
        licenseIdTarget: number;
        inPickingLine: Enums.YesNo;
        isForDeliveryImmediate: Enums.YesNo;
        Material: Material;
        Configuration?: Configuration;
        icon?: string;
        showDetails?: boolean;
        License?: License;
        projectId: string;
        projectCode: string;
        projectName: string;
        projectShortName: string;
        reference: string;
        statusCode: string;
    }

    export interface License {
        licenseId: number;
        clientOwner: string;
        policyCode: string;
        currentWarehouse: string;
        currentLocation: string;
        lastLocation: string;
        lastUpdated: Date;
        lastUpdatedBy: string;
        status: string;
        regime: string;
        createdDate: Date;
        usedMt2: number;
        policyCodeRectification: string;
        pickingDemandHeaderId: number;
        wavePickingId: string;
    }

    export interface Material {
        materialId: string;
        clientOwner: string;
        barcodeId: string;
        alternateBarcode: string;
        materialName: string;
        shortName: string;
        volumeFactor: number;
        materialClass: string;
        high: number;
        length: number;
        width: number;
        maxXBin: number;
        scanByOne: Enums.YesNo;
        requiresLogisticsInfo: number;
        weight: number;
        image1: string;
        image2: string;
        image3: string;
        lastUpdated: Date;
        lastUpdatedBy: string;
        isCar: Enums.YesNo;
        mt3: number;
        batchRequested: Enums.YesNo;
        serialNumberRequests: Enums.YesNo;
        isMasterPack: Enums.YesNo;
        erpAveragePrice: number;
        weightMeasurement: string;
        explodeInReception: Enums.YesNo;
        handleTone: Enums.YesNo;
        handleCaliber: Enums.YesNo;
        usePickingLine: Enums.YesNo;
        qualityControl: Enums.YesNo;
        measurementUnit: string;
        measurementQty: number;
        quantity?: number;
        batch?: string;
        expirationDate?: Date;
        tone?: string;
        caliber?: string;
        vin?: string;
        showDetails?: boolean;
        icon?: string;
        SerialNumbers: Array<MaterialSerialNumber>;
        Class?: Class;
        UnitMeasurements?: Array<UnitMeasurement>;
        Company?: Company;
        materialStatus?: string;
        newBarcode?: string;
        newAlternateBarcode?: string;

        licenseId?: number;
        locationSpot?: string;
        isMoreResults?: boolean;
        expirationTolerance:number;
    }

    export interface Company {
        companyId: number;
        companyName: string;
        masterIdClientCod: string;
        masterIdSupplier: string;
        codePriceList: string;
        taxId: string;
        taxName: string;
        externalSourceId: number;
        erpDatabase: string;
        factSerie: string;
        defaultWarehouse: string;
    }

    export interface UnitMeasurement {
        id: number;
        clientId: string;
        materialId: string;
        measurementUnit: string;
        qty: number;
        barcode: string;
        alternativeBarcode: string;
    }

    export interface Class {
        classId: string;
        className: string;
        classDescription: string;
        classType: string;
        createdBy: string;
        createdDateTime: string;
        lastUpdatedBy: string;
        lasUpdated: string;
        priority: string;
    }

    export interface MaterialSerialNumber {
        id: number;
        licenseId: number;
        materialId: string;
        serial: string;
        batch: string;
        dateExpiration: Date;
        status: number;
        assignedTo: string;
        wavePickingId: number;
    }

    export interface Configuration {
        paramType: string;
        paramGroup: string;
        paramGroupCaption: string;
        paramName: string;
        paramCaption: string;
        numericValue: number;
        moneyValue: number;
        textValue: string;
        dateValue: Date;
        rangeNumStart: number;
        rangeNumEnd: number;
        rangeDateStart: Date;
        rangeDateEnd: Date;
        spare1: string;
        spare2: string;
        decimalValue: number;
        spare3: string;
        spare4: string;
        spare5: string;
        color: string;
    }

    export interface ShelfSpot {
        warehouseParent?: string;
        zone?: string;
        locationSpot?: string;
        spotType?: Enums.LocationType;
        spotOrderby?: number;
        spotAisle?: number;
        spotColumn?: string;
        spotLevel?: string;
        spotPartition?: number;
        spotLabel: string;
        allowPicking: Enums.YesNo;
        allowStorage?: Enums.YesNo;
        allowRealloc: Enums.YesNo;
        available: Enums.YesNo;
        lineId: string;
        spotLine: string;
        locationOverloaded: number;
        maxMt2Occupancy: number;
        maxWeight: number;
        section: string;
        volume: number;
        ShelfSpotVolumeAndWeight?: ShelfSpotVolumeAndWeight;
        isWaste: number;
        allowFastPicking: number;
    }

    export interface ShelfSpotVolumeAndWeight {
        availableWeight: number;
        weightIcon: string;
        weightIconColor: string;
        availableVolume: number;
        volumeIcon: string;
        volumeIconColor: string;
    }

    export interface LocationInfo {
        locationSpot: string;
        warehouseParent: string;
        spotType: Enums.LocationType;
        zone: string;
        allowPicking?: number;
        allowStorage: number;
        allowRealloc?: number;
        availableVolume: number;
        availableWeight: number;
        ShelfSpotVolumeAndWeight?: ShelfSpotVolumeAndWeight;
    }

    export interface Operation {
        Resultado: number;
        Mensaje: string;
        Codigo: number;
        DbData: string;
        ObjectData?: any;
    }

    export interface CustomError {
        code: Enums.CustomErrorCodes;
        message: string;
    }

    export interface LocationInventory {
        licenseId: number;
        policyCode: string;
        clientOwner: string;
        statusName: string;
        regime: Enums.Regime;
        Inventory: Array<Inventory>;
    }

    export interface Inventory {
        licenseId: number;
        currentLocation: string;
        policyCode: string;
        clientOwner: string;
        regime: Enums.Regime;
        materialId: string;
        materialName: string; //description
        qty: number;
        vin: string;
        batch: string;
        dateExpiration: Date;
        tone: string;
        caliber: string;
        pickingDemandHeaderId?: number;
        docNum?: number;
        showDetails?: boolean;
        icon?: string;
        serialNumberRequests?: Enums.YesNo;
        SerialNumbers?: Array<MaterialSerialNumber>;
        wavePickingId?: number;
        statusName: string;
        shortName: string;
    }

    export interface SuggestionZone {
        SLOTTING_ZONE_ID: string;
        WAREHOUSE_CODE: string;
        ZONE_ID: number;
        ZONE: string;
        MANDATORY: number;
        COUNT_CLASS: number;
        COUNT_CLASS_IN_LICENSE: number;
        DIFFERENCE_OF_CLASSES: number;
        LOCATIONS: Array<SuggestionLocation>;
        ICON?: String;
        SHOW_DETAIL?: Boolean;
    }

    export interface SuggestionMaterial {
        LOCATION_SPOT: string;
        MATERIAL_ID: string;
        QTY: number;
        TONE_AND_CALIBER_ID: number;
        TONE: string;
        CALIBER: string;
        BATCH: string;
        DATE_EXPIRATION: Date;
        ICON?: String;
        SHOW_DETAIL?: Boolean;
    }

    export interface SuggestionLocation {
        LOCATION: string;
        SPOT_TYPE: string;
        MAX_WEIGHT: number;
        LOCATION_WEIGHT: number;
        LOCATION_VOLUME: number;
        VOLUME: number;
        AVAILABLE: number;
        AVAIBLE_ICON?: String;
        AVAILABLE_WEIGHT: number;
        WEIGHT_ICON: string;
        WEIGHT_ICON_COLOR: string;
        AVAILABLE_VOLUME: number;
        VOLUME_ICON: string;
        VOLUME_ICON_COLOR: string;
    }

    export class ProcessSku {
        licenseId?: number;
        sourceLocation: string;
        materialBarcode: string;
        materialId?: string;
        quantity?: number;
        wavePickingId?: number;
        unitMsr?: string;
        unitMsrQty?: number;
        useMt2: boolean;
        usedMt2: number;
        locationType: Enums.LocationType;
        requestSerial: boolean;
        batch?: string;
        dateExpiration?: Date;
    }

    export class Factory {
        public static createLabelInfo(): LabelInfo {
            return {
                labelId: 0,
                loginId: "",
                licenseId: 0,
                materialId: "...",
                materialName: "...",
                qty: 0,
                policyCode: "",
                sourceLocation: "",
                targetLocation: "...",
                transitLocation: "",
                batch: "",
                vin: "",
                tone: "",
                caliber: "",
                serialNumber: "",
                status: "...",
                weight: 0,
                wavePickingId: 0,
                taskSubType: "",
                warehouseTarget: "",
                clientName: "...",
                clientCode: "...",
                stateCode: 0,
                regime: "",
                transferRequestId: 0,
                dateTime: new Date(),
                loginName: "",
                docNum: 0,
                docEntry: 0
            } as LabelInfo;
        }

        public static createLocationInfo(): LocationInfo {
            return {
                locationSpot: "",
                warehouseParent: "",
                spotType: Enums.LocationType.StandBy,
                zone: "",
                allowPicking: 0,
                allowStorage: 0,
                allowRealloc: 0,
                availableVolume: 0,
                availableWeight: 0
            } as LocationInfo;
        }
        public static mergeEntities<T extends any>(
            newEntity: any,
            defaultEntity: T
        ): T {
            if (newEntity == undefined) return defaultEntity;
            for (var key in newEntity) {
                if (newEntity.hasOwnProperty(key)) {
                    defaultEntity[key] = newEntity[key];
                }
            }

            return defaultEntity;
        }

        public static createSuccessOperation(): Operation {
            return {
                Codigo: 0,
                Mensaje: "",
                DbData: "0",
                Resultado: Enums.OperationResult.Success
            };
        }

        public static createProcessSku(): ProcessSku {
            return {
                licenseId: null,
                sourceLocation: "",
                materialBarcode: "",
                quantity: null,
                requestSerial: false,
                usedMt2: 0,
                useMt2: false,
                locationType: Enums.LocationType.Rack
            };
        }

        public static createFaultOperation(
            reason: Model.CustomError
        ): Operation {
            return {
                Codigo: reason.code || Enums.CustomErrorCodes.BadRequest,
                Mensaje: reason.message,
                DbData: null,
                Resultado: Enums.OperationResult.Fail
            };
        }

        public static createCustomError(
            reason: string,
            code: Enums.CustomErrorCodes
        ): Model.CustomError {
            return { code: code, message: reason };
        }

        public static createUserCredentials(): UserCredentials {
            return {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                communicationAddress: "",
                deviceId: "1a6acc5f-18a3-4686-b6fe-7c4c14e37c23"
            };
        }

        public static createCalculationRule(): CalculationRule {
            return {
                displayDecimalsRoundType: Enums.RoundType.Round,
                displayDecimalsRoundConfiguration: Enums.QuantityType.Total,
                defaultDisplayDecimals: 4,
                defaultCalculationsDecimals: 3
            };
        }

        public static createCurrency(doc: any): Currency {
            return {
                docType: Enums.Prefixes.Currency,
                CURRENCY_ID: doc.CURRENCY_ID,
                CODE_CURRENCY: doc.CODE_CURRENCY,
                NAME_CURRENCY: doc.NAME_CURRENCY,
                SYMBOL_CURRENCY: doc.SYMBOL_CURRENCY,
                IS_DEFAULT: doc.IS_DEFAULT
            };
        }

        public static createEmptyDocumentViewModelFilter<
            T
        >(): DocumentViewModelFilter<T> {
            return {
                selector: null,
                filter: () => true
            };
        }

        public static createWirelessInfo(): WirelessInfo {
            return {
                icon: "close-circle",
                iconColor: "danger",
                ip: "0.0.0.0",
                name: "",
                status: false
            };
        }

        public static createBluetoothInfo(): BluetoothInfo {
            return { icon: "close-circle", iconColor: "danger", status: false };
        }

        public static createNavigationTabs(): Array<NavigationTab> {
            return [
                {
                    isActive: true,
                    navigationStack: new Array<Enums.Page>(),
                    tabName: Enums.Page.MyTasks,
                    currentRoot: Enums.Page.MyTasks
                },
                {
                    isActive: false,
                    navigationStack: new Array<Enums.Page>(),
                    tabName: Enums.Page.TaskSent,
                    currentRoot: Enums.Page.TaskSent
                },
                {
                    isActive: false,
                    navigationStack: new Array<Enums.Page>(),
                    tabName: Enums.Page.InfoCenter,
                    currentRoot: Enums.Page.InfoCenter
                },
                {
                    isActive: false,
                    navigationStack: new Array<Enums.Page>(),
                    tabName: Enums.Page.MoreTransactions,
                    currentRoot: Enums.Page.MoreTransactions
                }
            ];
        }

        public static createConfiguration(): Configuration {
            return {
                paramType: "",
                paramGroup: "",
                paramGroupCaption: "",
                paramName: "",
                paramCaption: "",
                numericValue: 0,
                moneyValue: 0,
                textValue: "",
                dateValue: new Date(),
                rangeNumStart: 0,
                rangeNumEnd: 0,
                rangeDateStart: new Date(),
                rangeDateEnd: new Date(),
                spare1: "",
                spare2: "",
                decimalValue: 0,
                spare3: "",
                spare4: "",
                spare5: "",
                color: ""
            };
        }

        public static createTask(): Task {
            return {
                id: 0,
                wavePickingId: 0,
                transOwner: 0,
                taskType: Enums.TaskType.Picking,
                taskSubtype: Enums.TaskSubType.General,
                taskOwner: "",
                taskAssignedTo: "",
                taskComments: "",
                assignedDate: new Date(),
                quantityPending: 0,
                quantityAssigned: 0,
                sourcePolicyCode: "",
                targetPolicyCode: "",
                licenseIdSource: 0,
                regime: Enums.Regime.General,
                isCompleted: Enums.YesNo.No,
                isDiscretional: Enums.YesNo.No,
                isPaused: 0,
                isCanceled: Enums.YesNo.No,
                materialId: "",
                barcodeId: "",
                alternateBarcode: "",
                materialName: "",
                warehouseSource: "",
                warehouseTarget: "",
                locationSpotSource: "",
                locationSpotTarget: "",
                clientOwner: "",
                clientName: "",
                acceptedDate: new Date(),
                completedDate: new Date(),
                canceledDatetime: new Date(),
                canceledBy: "",
                materialShortName: "",
                isLocked: "",
                isDiscretionary: 0,
                typeDiscretionary: "",
                lineNumberSourcePolicy: 0,
                lineNumberTargetPolicy: 0,
                docIdSource: 0,
                docIdTarget: 0,
                isAccepted: Enums.YesNo.No,
                isFromSonda: Enums.YesNo.No,
                isFromErp: Enums.YesNo.No,
                priority: 0,
                replenishMaterialIdTarget: "",
                fromMasterpack: Enums.YesNo.No,
                masterPackCode: "",
                owner: "",
                sourceType: "",
                transferRequestId: 0,
                tone: "",
                caliber: "",
                licenseIdTarget: 0,
                inPickingLine: Enums.YesNo.No,
                isForDeliveryImmediate: Enums.YesNo.No,
                Material: this.createMaterial(),
                Configuration: this.createConfiguration(),
                icon: "arrow-dropdown",
                showDetails: false,
                projectId: "",
                projectCode: "",
                projectName: "",
                projectShortName: "",
                reference: "",
                statusCode: ""
            };
        }

        public static createReceptionTaskHeader(): ReceptionTaskHeader {
            return {
                taskId: 0,
                clientCode: "",
                clientName: "",
                policyCode: "",
                order: "",
                receptionType: Enums.TaskType.Reception,
                locationSpotTarget: "",
                receptionSubType: Enums.TaskSubType.GeneralReception,
                regime: Enums.Regime.General,
                document: "",
                isInvoice: 0,
                supplierCode: "",
                supplierName: ""
            };
        }

        public static createMaterial(): Material {

            return {
                materialId: "",
                clientOwner: "",
                barcodeId: "",
                alternateBarcode: "",
                materialName: "",
                shortName: "",
                volumeFactor: 0,
                materialClass: "",
                expirationTolerance:0,
                high: 0,
                length: 0,
                width: 0,
                maxXBin: 0,
                scanByOne: Enums.YesNo.No,
                requiresLogisticsInfo: 0,
                weight: 0,
                image1:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMp0lEQVR4XtWaCXQUVbrH/9+tqu7qdCcBzAoGwhK2J8gimxl98JxFUBw2GcVBWVQQNDCOwOiA4IGBOaIwHnB9AqM8VJ6CgDx4Z1QUBQFNRGQLSyCBSGjMoiSd7uquuvfdbpIm6aZDx+eMx985/9Od6tT3ff/vLpXTNySEwM8Zhp87P8IIdJW6AT+c/lILpG6RavmvHIFeDjs2Ajgq9YVNxe5mGHFI3Zpgp08B7HM5aC4R3lcVuO1aKGb/f6aBbJkwmGR/Wgt2x8o8HW/OdSA7g/Unwh4A90kpuDKdpfIcNhQB2N49mw16fY4Dxetcyv6XXLRooq61voYND5qS5oKx7pZyoQlCi5iIEAfJjLCACNOdOinPPayzEbkadBtCVHsF8lb48NZHAcjPCz0+MR5APi4xOdFBE+Xv5EJy1xANU27TMLDbJZ/h7AIImNJZvomn1/t5/gmLSbMVXj/mAnjphxpgUnfLQH/zBZCSN9KGR0bY0CaFhZMCAvXsK7QwZbnPPP4NrxYiZCBRamDvjgp/YJjGbu6hoFNmjIEXaMReGev59/x4+1MTckQO1RpiPoCN8RpQpMbIG5fIG9uPuFHFkkl2tM9gMZMeKuZYtyOAl7cFLJlMYYwEgYTFOcv7rQ1PT7aHvUYhYl/76GsLi9YbfPcRiwFYLBU0YjZlYIh0vFw6vv72ASoeHWXDjd2VmMnf2hmQhZvi/f0mOR0qvzY9nTl0G74qPI1B13fFiTPnzPKqi2pOayZWTNVpcA8lRvGiSUMvbQ9g5qsGNAU7A1ZofZSpaEzrZCct/d4jxrXPIL7gHh3DpYFQMAtRbNpjYtm7fuvz45aS0sKBnp2z0DYjhamqglJ3BYKkt2qBtJYtVHdFFYrPldKtT3owS07DWaM0JDnoikYoxsg89GsN7VMZ7l7mvYkx5BsBjI4cgS1Sw1fP0DHmFxps6pW6IbDtCxPz1vn54TOcZVzjQse2WUhtmQyqS+01/Dh0sgTfVdfgVwN7N3rmnDxbhiNFJUhNJr7k93Y27iYVofQi/ilVViXwi3m1VmmFOBs5AnuCBjQFsJFo1HWScssbp71sYGu+icyURHZTn7ZIaZGESPwBE7U+A0nOBDSEiJDTtjVap7ZC4aliNmllFZ7dzMTDQzUa2V9BSyfFKjxMwALWyHV2rlIwADsYGrNE1/DK+GU+FJzgII6wtu4z0W9WLd9xUIgBPbpgYM/rwsXHhhBGXJZT19G3e1fk9uoOr5VMD71ioMejXv7MpgAuVAmA47Ksy+9ragVGLfWJp97xgzE8BmDylRaxYtdwKD2ZcnYvSgi+xxNvGHj1w2DXk0SPnI7kdOhoApnIhwPHT8OyLNzc5zpcje9qPCg6W4oz5yvRIoH4Y7dpbOot6uU1IoAiN8e4FwzzwBkuuMBvAWxvahdqr2vY1TaFpYOAM+Vg3Tu2p3aZaWgSgRAW5zh6+qws6FsMy70B8VLj9YWMFJ/7FokO4vcMUtj8kRp2HOaYvMqwuMB5XwC3A/gqnufAcKktRMAvB/SCK8ERo+BouBAoLA4W4o7DQHRMuX6kiXOorqniGgVESQVXFIZNFsdoADyev4UmqQrW1s/iwyeO8VPfnIfH62s4l2MiuADnHHESFTNBt6NLdju4nC1ZsHhcIqWuqdSUgaQEGzYAWDWmn5q8eaYdHz+hI7ejnx2Uc/r9vfvF5wcPibLySjSF1zDkFupBYoIjnqKjKCm7gA/25fMLFW7xwj0aZsj10DGVBgDYJOs7COBm1KHiMlm6hu0WR7c3p9ox+gYF9Qx8wI5nxgp8dNSi53d4xN6Dx3BNki66dehAwf0/koBlwTQtOHR7w4KvirvyOxwvPo3yiz6MH6iwRSPsaJ1MCPL0aE3LL+aYsT7QNb+E79Q1vOYLYEb9GsiVF/7baaeMrTPsrG87hoZQRPJPjnHM3uAXBSWcenTKRqeszKgOHjhxGp2z2qBr9rW4GqJuzRSWlKJXFhN/HanRLV0YQFc2/vpeC/f/lx9CYEv9CMyWblofekpHu1YAuGhyl7k5h7Bnjp0WvBfA4u3FKK8qt67r1ElxORzhgoKyaWpcW+iRoiLurvKwRXdomP1rlYga5xNCCgAjhMjtyGBTYBkmXGp9U6XumPuuH8+M0ZCeRFcddpJ6ariGwTkKpr3loZ0FB0SHa9tQu4w0iLrEftNEU5xxfyufF0WiSzrR+on2UGFXghqMxNEygSHLDc4IhwH8ruE2OtquYk2CjZxLR2lsXH8FmoK4qDGAP28O4LW9FvcYgl2b1goghuzMNKS2iF4jlhV8ThTjRKkb4wcoWHGXDU4brsruIo7bVhochJMeI7SQ3Q0tbzBMdAtYYkdwfvX+i89auM1EPLjswHNjNZxeZGdzh6mo9VRZpe5ynHO7UVVdg4ZU13qx9+DBUPFPj9Kw+t74in/7Swv/sdxAgKNAFj8AgLupB9ntKsOzJkfncf0UzBumoVMaIV4u+oB1+0w8+4HJSyoFS2/pFBkpaeQ1/HKBl1k92wArf6cpfdoyxMPsjQEs/9CEwvCOxTEBgCeeJ/FAqT02FeAc4pfdFMobospdgpDqis+MLwB8ctLCkv81+a6TPFzt9MEqlo3RwOII8/zHJma+HYBkrdS9cX8rodsAImD9/AQsfUinwxc4H7bSQNvHfWLcKj9OlwtcDV0DBmQz2FWESHKS2a2DYgWLyl1qiOKK2DG8AWDyWn+oeCIYAP7crK9VTAskRDCptP0bDfmvuNhHf3Ni2ggb7SzivPtTvmBnUemJbeTLMxx9FhvWZ6c4VxVYc+7X1YK3E5V//KcLxd8LkfOkL1TkB4UcDTnmFhi8zODv7Of8wTvtUJVwrfEbIEBAEjARJBSkZweG+RPs2POik00facOCrQFcv8jga/dZEBE+Xtxp4salBrIyGS3Pc6gAWG5vBUTATX1V7N+QxBY+ouPTEsGHrjDwgNw4FsuGTH0jGNMnqgWwa52LTRlrg8WhxjKgIgbJLkos/15AtxEiaeEiPCmN3DdUw4LVBk163S9Hg/i0f1fZ4M4Mf9luine+tOiR0TrmTXKwzbsC4ALUNpOhnpRWhMcmOfCHCQ724psGlq3xWdVfmRAC9KcHHWzGeJ0SXQx75TUJNduAqmCiLs23y6BLbav3QRR+bddawZq5Ntp7xMTC1V42a2NAmBaIEejlOUm48xY7AMJ3HhN2jYQzUSUoDCCgPqCiAA/fp2H6eJfiNQS4ICQ6CUBdTkWETAHQmmXAplHntJZErkQVIAoXTmEDl5MM6qlh23MJKCvntGWXgX7dbejTzRY2ylQ/BCRMA6mNDYTjguC0ow4Km0zPYPUGBkkVxj8CKiUlOogUVQsnkor9XiozE5g6Vo/67KKXgg0RqsNO0ELG60JRlJloAxocOllen+gDYE3cBnyGSOvQRiUEDRCkLgelcPfD1yJMscv3gEJfg2RnaXAl6wBiFB7DgFMFFIUEIGzNmkIg4mAE0hpOoYjORxgJG4s0SAw2GxOk2oHozjc5Chu3VKHGw1UAxc0yIAAmATRbg2LC3Y/ofOS1xl1VVAUWp2Cs+usRxdabb2zq8wIP7p1WzBWFNliWeLY5BpIqv+cJ7bN0UEMDkuiRiH6liI5eqLQgNwMiVYvseOTPYU4W+XDrqKNcCBTI4icA8DfLQMAU1uoNVYrfIjZ7SgYy01QAUTtR9FQgghAA1X3mMzg+3nORjx2dyqAoiIcvCmow4q4jprz3G9MUwwHUQtIcA2WcozcjjFy3ufLxN7ZUuhb+MYsmjE2F3cYAitjuIqCIa91zEujYcS+/2omQ7DReXnUeM+eckl7pc1n8GADu/+8JTTpjeJxzzMjOsvP5f8hio4a2QnN4YukZ7M6vtr74pJeCGGzaWoHFS0ut/QdqlLrTmJlSxo9xRubmPBSst/vbwLaJj57EgNsP8ne3VyJeAgEBxghX4j0Zp9eg/dadvy9E4bHaAwBypR6SMn7sQ76vvD4+HMDwklLjwARpZNIfi3D2nIEfQkWliSl5JzHq7qM4UeT9GsBvZPx+AD77Zx+zbvUavA+Aif/zYVVFn1u/Fs+/5sbFagvRxJ4uXXrlW6+tu2AAuN/vF8F4/5Di/8pz4r/7DN5ZCKx44q8l6PmrA1bevNPYU1B95UR1mV79+3kEp4unlr9nWeLfAKzCJegnOKkP01e3s5dUhWoAiP69XNbDEzLE2uc6icpD/cTMBzNF394uvnBeOwFAMIYX0Bj6iQ2ESZK6TZr5TFPJDUC0ybD5c9rrfqJQ4VzX2dyf/n8l4p+ePaVWS1VLCamhkPwMDEQxRGq6lIYfmf8DzLdVIkz/+Z4AAAAASUVORK5CYII=",
                image2: "",
                image3: "",
                lastUpdated: new Date(),
                lastUpdatedBy: "",
                isCar: Enums.YesNo.No,
                mt3: 0,
                batchRequested: Enums.YesNo.No,
                serialNumberRequests: Enums.YesNo.No,
                isMasterPack: Enums.YesNo.No,
                erpAveragePrice: 0,
                weightMeasurement: "",
                explodeInReception: Enums.YesNo.No,
                handleTone: Enums.YesNo.No,
                handleCaliber: Enums.YesNo.No,
                usePickingLine: Enums.YesNo.No,
                qualityControl: Enums.YesNo.No,
                measurementUnit: "Unidad",
                measurementQty: 1,
                quantity: 1,
                batch: "",
                expirationDate: new Date(),
                tone: "",
                caliber: "",
                vin: "",
                showDetails: false,
                icon: "",
                SerialNumbers: []
            };
        }

        public static createMaterialMasterPack(): DataResponse.OP_WMS_GET_MASTER_PACK_BY_LICENSE {
            return {
                MASTER_PACK_HEADER_ID: 0,
                LICENSE_ID: 0,
                MATERIAL_ID: "",
                MATERIAL_NAME: "",
                POLICY_HEADER_ID: 0,
                LAST_UPDATED: new Date(),
                LAST_UPDATE_BY: "",
                EXPLODED: Enums.YesNo.No,
                EXPLODED_DATE: new Date(),
                RECEPTION_DATE: new Date(),
                QTY: 0,
                BATCH: "",
                DATE_EXPIRATION: new Date()
            };
        }

        public static createSerialNumber(): MaterialSerialNumber {
            return {
                id: 0,
                licenseId: 0,
                materialId: "",
                serial: "",
                batch: "",
                dateExpiration: new Date(),
                status: 0,
                assignedTo: "",
                wavePickingId: 0
            };
        }

        public static createCharge(): Charge {
            return {
                typeChargeId: 0,
                charge: "",
                description: "",
                warehouseWeather: "",
                regime: Enums.Regime.General,
                comment: "",
                dayTrip: "",
                serviceCode: "",
                toMovil: 1,
                qty: 0
            } as Charge;
        }

        public static createShelfSpot(): ShelfSpot {
            return {
                warehouseParent: "",
                zone: "",
                locationSpot: "",
                spotType: Enums.LocationType.Hall,
                spotOrderby: 0,
                spotAisle: 0,
                spotColumn: "",
                spotLevel: "",
                spotPartition: 0,
                spotLabel: "",
                allowPicking: Enums.YesNo.No,
                allowStorage: Enums.YesNo.No,
                allowRealloc: Enums.YesNo.No,
                available: Enums.YesNo.No,
                lineId: "",
                spotLine: "",
                locationOverloaded: 0,
                maxMt2Occupancy: 0,
                maxWeight: 0,
                section: "",
                volume: 0,
                ShelfSpotVolumeAndWeight: this.createShelfSpotVolumeAndWeight(),
                isWaste: 0,
                allowFastPicking: 0
            };
        }

        public static createShelfSpotVolumeAndWeight(): ShelfSpotVolumeAndWeight {
            return {
                availableWeight: 0,
                weightIcon: "close",
                weightIconColor: "danger",
                availableVolume: 0,
                volumeIcon: "close",
                volumeIconColor: "danger"
            };
        }

        public static createPickingTaskHeader(): PickingTaskHeader {
            return {
                wavePickingId: 0,
                qtyPending: 0,
                qtyAssigned: 0,
                Material: this.createMaterial(),
                Tasks: [this.createTask()],
                icon: "arrow-dropdown",
                showDetails: false,
                SerialNumbers: [],
                qty: 0
            };
        }

        public static createWavePickingForLicenseDispatch(): DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH {
            return {
                WAVE_PICKING_ID: 0,
                DOC_NUM: 0,
                CLIENT_NAME: "",
                DELIVERY_DATE: new Date()
            };
        }

        public static createLicenseDispatch(): LicenseDispatchExit {
            return {
                licenseId: 0,
                location: "",
                pickedBy: "",
                detail: [],
                showDetails: false,
                icon: "arrow-dropright-circle",
                isComplete: false,
                showScanIcon: false,
                correlative: 0
            };
        }

        public static createDetailLicenseDispatch(): DetailLicenseDispatch {
            return {
                materialId: "",
                materialName: "",
                qty: 0,
                qtyOrigin: 0
            };
        }

        public static createLicenseDispatchForPickingRequest(): DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING {
            return {
                CURRENT_LOCATION: "",
                LAST_UPDATED_BY: "",
                LICENSE_ID: 0,
                MATERIAL_ID: "",
                MATERIAL_NAME: "",
                QTY: 0,
                QTY_ORIGIN: 0
            };
        }
    }
}
