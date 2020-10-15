import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseProvider } from "../base/base";
import { TranslateProvider } from "../translate/translate";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { Routes } from "../../resources/routes";

@Injectable()
export class ApiClientV3Provider extends BaseProvider {
    constructor(
        protected http: HttpClient,
        protected translate: TranslateProvider
    ) {
        super(translate, http);
    }

    public validateCredentials(
        request: Model.UserCredentials
    ): Promise<Model.UserConnectionInfo> {
        request.communicationAddress =
            "http://mobilitywebapi.centralus.cloudapp.azure.com:1025";
        return this.get<Model.UserConnectionInfo>(
            request,
            `/SecurityAPI/odata/ValidateCredentials(loginId='${request.loginId}',password='${request.password}',codeApp='SWIFT3PL',deviceId='${request.deviceId}')`
        );
    }

    public login(request: DataRequest.Login): Promise<DataResponse.Login> {
        return this.post<DataResponse.Login, DataRequest.Login>(
            Routes.V3.Login.login,
            request,
            "user_"
        );
    }

    public getTypeChargeByMobile(
        request: DataRequest.ChargeByMobile
    ): Promise<Array<DataResponse.OP_WMS_GET_TYPE_CHARGE_BY_MOBILE>> {
        return this.post<
            Array<DataResponse.OP_WMS_GET_TYPE_CHARGE_BY_MOBILE>,
            DataRequest.ChargeByMobile
        >(Routes.V3.Charge.getTypeChargeByMobile, request);
    }

    public createTypeChangeXLicenseRequest(
        request: DataRequest.CreateTypeChangeXLicense
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.CreateTypeChangeXLicense
        >(Routes.V3.Charge.createTypeChangeXLicense, request);
    }

    public createLicense(
        request: DataRequest.CreateLicense
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.CreateLicense>(
            Routes.V3.License.createLicense,
            request
        );
    }

    public findConfigurations(
        request: DataRequest.GetConfiguration
    ): Promise<Array<Model.Configuration>> {
        return this.post<
            Array<Model.Configuration>,
            DataRequest.GetConfiguration
        >(Routes.V3.Configuration.findConfigurations, request);
    }

    public getParameter(
        request: DataRequest.GetParameter
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_PARAMETER>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_PARAMETER>,
            DataRequest.GetParameter
        >(Routes.V3.Configuration.getParameter, request);
    }

    public getLocation(
        request: DataRequest.GetLocation
    ): Promise<DataResponse.ShelfSpot> {
        return this.post<DataResponse.ShelfSpot, DataRequest.GetLocation>(
            Routes.V3.Location.getLocation,
            request,
            request.location
        );
    }

    public validateLocationForStorage(
        request: DataRequest.ValidateLocationForStorage
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateLocationForStorage
        >(Routes.V3.Location.validateLocationForStorage, request);
    }

    public validateLocationMaxWeightAndVolume(
        request: DataRequest.ValidateLocationMaxWeightAndVolume
    ): Promise<DataResponse.OP_WMS_VALIDATE_LOCATION_MAX_WEIGHT_AND_VOLUME> {
        return this.post<
            DataResponse.OP_WMS_VALIDATE_LOCATION_MAX_WEIGHT_AND_VOLUME,
            DataRequest.ValidateLocationMaxWeightAndVolume
        >(Routes.V3.Location.validateLocationMaxWeightAndVolume, request);
    }

    public getUsedMt2byLocationSpot(
        request: DataRequest.GetLocation
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.GetLocation>(
            Routes.V3.Location.getUsedMt2byLocationSpot,
            request
        );
    }

    public getTasksByWavePickingId(
        request: DataRequest.GetTaskList
    ): Promise<Array<DataResponse.Task>> {
        return this.post<Array<DataResponse.Task>, DataRequest.GetTaskList>(
            Routes.V3.Task.getTasksByWavePickingId,
            request
        );
    }

    public cancelPickingDetailLine(
        request: DataRequest.CancelPickingDetailLine
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.CancelPickingDetailLine
        >(Routes.V3.Picking.cancelPickingDetailLine, request);
    }

    public getReceptionTask(
        request: DataRequest.Reception
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_RECEPTION_TASK>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_RECEPTION_TASK>,
            DataRequest.Reception
        >(Routes.V3.Task.getReceptionTask, request);
    }

    public completeTask(
        request: DataRequest.Reception
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.Reception>(
            Routes.V3.Reception.registerReceptionStatus,
            request
        );
    }

    public addMaterialToLicense(
        request: DataRequest.AddMaterialToLicense
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.AddMaterialToLicense
        >(Routes.V3.Reception.addMaterialToLicense, request);
    }

    public validateBarcodeForLicense(
        request: DataRequest.GetScannedMaterialByLicenseInReceptionTask
    ): Promise<DataResponse.Operation> {
        console.log(request)
        return this.post<
            DataResponse.Operation,
            DataRequest.GetScannedMaterialByLicenseInReceptionTask
        >(Routes.V3.Reception.validateBarcodeForLicense, request);
    }

    public rollbackLicense(
        request: DataRequest.RollBackLicense
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.RollBackLicense>(
            Routes.V3.Reception.rollBackLicense,
            request
        );
    }

    public insertMaterialBySerialNumber(
        request: DataRequest.InsertMaterialBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertMaterialBySerialNumber
        >(Routes.V3.Reception.insertMaterialBySerialNumber, request);
    }

    public deleteMaterialBySerialNumber(
        request: DataRequest.DeleteMaterialBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.DeleteMaterialBySerialNumber
        >(Routes.V3.Reception.deleteMaterialBySerialNumber, request);
    }

    public registerLicenseReception(
        request: DataRequest.RegisterLicenseReception
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterLicenseReception
        >(Routes.V3.Reception.registerLicenseReception, request);
    }

    public validateStatusInMaterialsLicense(
        request: DataRequest.ValidateStatusInMaterialsLicense
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateStatusInMaterialsLicense
        >(Routes.V3.Reception.validateStatusInMaterialsLicense, request);
    }

    public getScannedMaterialByLicenseInReceptionTask(
        request: DataRequest.GetScannedMaterialByLicenseInReceptionTask
    ): Promise<
        Array<
            DataResponse.OP_WMS_GET_SCANNED_MATERIAL_BY_LICENSE_IN_RECEPTION_TASK
        >
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_GET_SCANNED_MATERIAL_BY_LICENSE_IN_RECEPTION_TASK
            >,
            DataRequest.GetScannedMaterialByLicenseInReceptionTask
        >(
            Routes.V3.Reception.getScannedMaterialByLicenseInReceptionTask,
            request
        );
    }

    public getRequestedSerialNumbersInDiscretionalPickingByLicense(
        request: DataRequest.GetRequestedSerialNumbersInDiscretionalPickingByLicense
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_REQUESTED_SERIAL_NUMBERS_DISCRETIONAL_PICKING_BY_LICENSE
        >
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_REQUESTED_SERIAL_NUMBERS_DISCRETIONAL_PICKING_BY_LICENSE
            >,
            DataRequest.GetRequestedSerialNumbersInDiscretionalPickingByLicense
        >(
            Routes.V3.Picking
                .getRequestedSerialNumbersInDiscretionalPickingByLicense,
            request
        );
    }

    getAssignedTasks(
        request: Model.UserCredentials
    ): Promise<Array<DataResponse.Task>> {
        return this.post<Array<DataResponse.Task>, DataRequest.Login>(
            Routes.V3.Task.getTasksByUser,
            request
        );
    }

    getMaterial(request: DataRequest.GetMaterial): Promise<Model.Material> {
        return this.post<Model.Material, DataRequest.GetMaterial>(
            Routes.V3.Material.getMaterial,
            request,
            request.barcodeId
        );
    }

    getMaterialByBarcode(
        request: DataRequest.GetMaterial
    ): Promise<Model.Material> {
        return this.post<Model.Material, DataRequest.GetMaterial>(
            Routes.V3.Material.getMaterialByBarcode,
            request,
            request.barcodeId
        );
    }

    getMaterialIdByBarcodeOrName(
        request: DataRequest.GetMaterial
    ): Promise<Array<Model.Material>> {
        return this.post<Array<Model.Material>, DataRequest.GetMaterial>(
            Routes.V3.Material.getMaterialIdByBarcodeOrName,
            request
        );
    }

    getInventoryByLicense(
        request: DataRequest.GetInventoryByLicense
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_INVENTORY_BY_LICENSE>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_INVENTORY_BY_LICENSE>,
            DataRequest.GetInventoryByLicense
        >(
            Routes.V3.Inventory.getInventoryByLicense,
            request,
            request.licenseId.toString()
        );
    }

    getMaterialBySerialNumber(
        request: DataRequest.GetMaterialBySerialNumber
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_MATERIAL_X_SERIAL_NUMBER>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_MATERIAL_X_SERIAL_NUMBER>,
            DataRequest.GetMaterialBySerialNumber
        >(Routes.V3.Reception.getMaterialBySerialNumber, request);
    }

    getInventoryByMaterial(
        request: DataRequest.GetInventoryByMaterial
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_INVENTORY_BY_MATERIAL>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_INVENTORY_BY_MATERIAL>,
            DataRequest.GetInventoryByMaterial
        >(Routes.V3.Inventory.getInventoryByMaterial, request);
    }

    getInventoryByLocationSpot(
        request: DataRequest.GetInventoryByLocationSpot
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_INVENTORY_BY_LOCATION_SPOT>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_INVENTORY_BY_LOCATION_SPOT>,
            DataRequest.GetInventoryByLocationSpot
        >(Routes.V3.Inventory.getInventoryByLocationSpot, request);
    }

    relocateLicense(
        request: DataRequest.RelocateLicense
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.RelocateLicense>(
            Routes.V3.Relocation.relocateLicense,
            request
        );
    }

    getLocationInfo(
        request: DataRequest.GetLocationInfo
    ): Promise<DataResponse.OP_WMS_SP_GET_LOCATION_INFO> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_LOCATION_INFO,
            DataRequest.GetLocationInfo
        >(Routes.V3.Location.getLocationInfo, request, request.locationSpot);
    }

    getLabelInfo(
        request: DataRequest.GetLabelInfo
    ): Promise<DataResponse.OP_WMS_SP_GET_LABEL> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_LABEL,
            DataRequest.GetLabelInfo
        >(Routes.V3.Label.getLabel, request, request.labelId.toString());
    }

    public updateScannedSerialNumberToProcess(
        request: DataRequest.UpdateScannedSerialNumberToProcess
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.UpdateScannedSerialNumberToProcess
        >(Routes.V3.Picking.updateScannedSerialNumberToProcess, request);
    }

    public removeBroadcast(
        request: DataRequest.RemoveBroadcast
    ): Promise<Model.Operation> {
        return this.post<Model.Operation, DataRequest.RemoveBroadcast>(
            Routes.V3.Broadcast.removeBroadcast,
            request
        );
    }

    public rollbackSerialNumbersOnProcess(
        request: DataRequest.RollbackSerialNumbersOnProcess
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RollbackSerialNumbersOnProcess
        >(Routes.V3.Picking.rollbackSerialNumbersOnProcess, request);
    }

    public updateSetActiveSerialNumber(
        request: DataRequest.UpdateSetActiveSerialNumber
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.UpdateSetActiveSerialNumber
        >(Routes.V3.Picking.updateSetActiveSerialNumber, request);
    }

    public validateIfPickingLicenseIsAvailable(
        request: DataRequest.ValidateIfPickingLicenseIsAvailable
    ): Promise<
        Array<DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_VALIDATE_IF_PICKING_LICENSE_IS_AVAILABLE
            >,
            DataRequest.ValidateIfPickingLicenseIsAvailable
        >(Routes.V3.Picking.validateIfPickingLicenseIsAvailable, request);
    }

    public registerGeneralDispatch(
        request: DataRequest.RegisterGeneralDispatch
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterGeneralDispatch
        >(Routes.V3.Picking.registerGeneralDispatch, request);
    }

    public updateLocationTargetTask(
        request: DataRequest.UpdateLocationTargetTask
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.UpdateLocationTargetTask
        >(Routes.V3.Picking.updateLocationTargetTask, request);
    }

    public getFirstTaskByWavePickingId(
        request: DataRequest.GetTaskList
    ): Promise<Model.Task> {
        return this.post<Model.Task, DataRequest.GetTaskList>(
            Routes.V3.Task.getFirstTaskByWavePickingId,
            request
        );
    }

    public getLicensePrintFormat(
        request: DataRequest.GetLicensePrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_LICENSE_PRINT_FORMAT> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_LICENSE_PRINT_FORMAT,
            DataRequest.GetLicensePrintFormat
        >(Routes.V3.Printer.getLicensePrintFormat, request);
    }

    public getLabelPrintFormat(
        request: DataRequest.GetLabelPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_LABEL_PRINT_FORMAT> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_LABEL_PRINT_FORMAT,
            DataRequest.GetLabelPrintFormat
        >(Routes.V3.Printer.getLabelPrintFormat, request);
    }

    public getMaterialPrintFormat(
        request: DataRequest.GetMaterialPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_MATERIAL_PRINT_FORMAT> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_MATERIAL_PRINT_FORMAT,
            DataRequest.GetMaterialPrintFormat
        >(Routes.V3.Printer.getMaterialPrintFormat, request);
    }

    public getStatusPrintFormat(
        request: DataRequest.GetStatusPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_STATUS_PRINT_FORMAT> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_STATUS_PRINT_FORMAT,
            DataRequest.GetStatusPrintFormat
        >(Routes.V3.Printer.getStatusPrintFormat, request);
    }
    public getInfoOfLicenseInLocationForMerge(
        request: DataRequest.GetInfoOfLicenseInLocationForMerge
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_INFO_OF_LICENSE_IN_LOCATION_FOR_MERGE>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_INFO_OF_LICENSE_IN_LOCATION_FOR_MERGE
            >,
            DataRequest.GetInfoOfLicenseInLocationForMerge
        >(Routes.V3.License.getInfoOfLicenseInLocationForMerge, request);
    }

    public mergeLicenseInLocationWithoutDetail(
        request: DataRequest.MergeLicenseInLocationWithoutDetail
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.MergeLicenseInLocationWithoutDetail
        >(Routes.V3.License.mergeLicenseInLocationWithoutDetail, request);
    }

    public validateScannedDocumentForReception(
        request: DataRequest.ValidateScannedDocumentForReception
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateScannedDocumentForReception
        >(Routes.V3.Reception.validateScannedDocumentForReception, request);
    }

    public getAvailableLicenseDetail(
        request: DataRequest.GetAvailableLicenseDetail
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_DETAIL>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_DETAIL>,
            DataRequest.GetAvailableLicenseDetail
        >(Routes.V3.Inventory.getAvailableLicenseDetail, request);
    }

    public getAvailableLicenseSeries(
        request: DataRequest.GetAvailableLicenseSeries
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES>,
            DataRequest.GetAvailableLicenseSeries
        >(Routes.V3.Inventory.getAvailableLicenseSeries, request);
    }

    public validateIfStatusOfLicenseAllowsRealloc(
        request: DataRequest.ValidateIfStatusOfLicenseAllowsRelocation
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateIfStatusOfLicenseAllowsRelocation
        >(Routes.V3.License.validateIfStatusOfLicenseAllowsRealloc, request);
    }

    public registerPartialRelocation(
        request: DataRequest.RegisterPartialRelocation
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterPartialRelocation
        >(Routes.V3.Relocation.registerPartialRelocation, request);
    }

    public generateReceptionDocumentFromCargoManifest(
        request: DataRequest.GenerateReceptionDocumentFromCargoManifest
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.GenerateReceptionDocumentFromCargoManifest
        >(
            Routes.V3.Reception.generateReceptionDocumentFromCargoManifest,
            request
        );
    }

    public async getManifestHeaderForCertification(
        request: DataRequest.GetManifestHeaderForCertification
    ): Promise<DataResponse.OP_WMS_SP_GET_MANIFEST_HEADER_FOR_CERTIFICATION> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_MANIFEST_HEADER_FOR_CERTIFICATION,
            DataRequest.GetManifestHeaderForCertification
        >(
            Routes.V3.ManifestCertification.getManifestHeaderForCertification,
            request
        );
    }

    public insertPickingLabel(
        request: DataRequest.InsertPickingLabels
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertPickingLabels
        >(Routes.V3.Label.insertPickingLabel, request);
    }

    public async getMaterialForManifest(
        request: DataRequest.GetMaterialForManifest
    ): Promise<DataResponse.OP_WMS_SP_GET_MATERIAL_FOR_MANIFEST> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_MATERIAL_FOR_MANIFEST,
            DataRequest.GetMaterialForManifest
        >(Routes.V3.ManifestCertification.getMaterialForManifest, request);
    }

    public async getConsolidatedCertificationDetail(
        request: DataRequest.GetConsolidatedCertificationDetail
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED>
    > {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_CERTIFICATION_DETAIL_CONSOLIDATED>,
            DataRequest.GetConsolidatedCertificationDetail
        >(
            Routes.V3.ManifestCertification.getConsolidatedCertificationDetail,
            request
        );
    }

    public async getCertificationDetailOfSerialNumber(
        request: DataRequest.GetCertificationDetailOfSerialNumber
    ): Promise<
        Array<DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_GET_CERTIFICATION_DETAIL_OF_SERIAL_NUMBER
            >,
            DataRequest.GetCertificationDetailOfSerialNumber
        >(
            Routes.V3.ManifestCertification
                .getCertificationDetailOfSerialNumber,
            request
        );
    }

    public validateIfCertificationIsComplete(
        request: DataRequest.ValidateIfCertificationIsComplete
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateIfCertificationIsComplete
        >(
            Routes.V3.ManifestCertification.validateIfCertificationIsComplete,
            request
        );
    }

    public deleteCertificationDetail(
        request: DataRequest.DeleteCertificationDetail
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.DeleteCertificationDetail
        >(Routes.V3.ManifestCertification.deleteCertificationDetail, request);
    }

    public insertCertificationDetail(
        request: DataRequest.InsertCertificationDetail
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertCertificationDetail
        >(Routes.V3.ManifestCertification.insertCertificationDetail, request);
    }

    public markManifestAsCertified(
        request: DataRequest.MarkManifestAsCertified
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.MarkManifestAsCertified
        >(Routes.V3.ManifestCertification.markManifestAsCertified, request);
    }

    public insertCertificationHeader(
        request: DataRequest.InsertCertificationHeader
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertCertificationHeader
        >(Routes.V3.ManifestCertification.insertCertificationHeader, request);
    }

    public insertCertificationBySerialNumber(
        request: DataRequest.InsertCertificationBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertCertificationBySerialNumber
        >(
            Routes.V3.ManifestCertification.insertCertificationBySerialNumber,
            request
        );
    }

    public deleteCertificationBySerialNumber(
        request: DataRequest.DeleteCertificationBySerialNumber
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.DeleteCertificationBySerialNumber
        >(
            Routes.V3.ManifestCertification.deleteCertificationBySerialNumber,
            request
        );
    }

    public updatePickingLabel(
        request: DataRequest.UpdatePickingLabel
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.UpdatePickingLabel
        >(Routes.V3.Label.updatePickingLabel, request);
    }

    public deletePickingLabel(
        request: DataRequest.DeletePickingLabel
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.DeletePickingLabel
        >(Routes.V3.Label.deletePickingLabel, request);
    }

    public getTestPrintFormat(
        request: DataRequest.GetTestPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_TEST_PRINT_FORMAT> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_TEST_PRINT_FORMAT,
            DataRequest.GetTestPrintFormat
        >(Routes.V3.Printer.getTestPrintFormat, request);
    }

    public async getMyCountingTask(
        request: DataRequest.GetMyCoutingTask
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_MY_COUTING_TASK>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_MY_COUTING_TASK>,
            DataRequest.GetMyCoutingTask
        >(Routes.V3.Inventory.getMyCoutingTask, request);
    }

    public async getLocationsForCount(
        request: DataRequest.GetLocationsForCount
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_LOCATIONS_FOR_COUNT>,
            DataRequest.GetLocationsForCount
        >(Routes.V3.Inventory.getLocationsForCount, request);
    }

    public validateScannedLocationForCount(
        request: DataRequest.ValidateScannedLocationForCount
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateScannedLocationForCount
        >(Routes.V3.Inventory.validateScannedLocationForCount, request);
    }

    public async getNextMaterialForCount(
        request: DataRequest.GetNextMaterialForCount
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_NEXT_MATERIAL_FOR_COUNT>,
            DataRequest.GetNextMaterialForCount
        >(Routes.V3.Inventory.getNextMaterialForCount, request);
    }

    public getValidateLicenseExists(
        request: DataRequest.GetValidateLicenseExists
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.GetValidateLicenseExists
        >(Routes.V3.Inventory.getValidateLicenseExists, request);
    }

    public async getMaterialByBarcodeForPhysicalCount(
        request: DataRequest.GetMaterialByBarcode
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_MATERIAL_BY_BARCODE>,
            DataRequest.GetMaterialByBarcode
        >(Routes.V3.Inventory.getMaterialByBarcode, request);
    }

    public validateRecountedMaterialForTask(
        request: DataRequest.ValidateRecountedMaterialForTask
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateRecountedMaterialForTask
        >(Routes.V3.Inventory.validateRecountedMaterialForTask, request);
    }

    public insertCountExecutionOperation(
        request: DataRequest.InsertCountExecutionOperation
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertCountExecutionOperation
        >(Routes.V3.Inventory.insertCountExecutionOperation, request);
    }

    public finishLocation(
        request: DataRequest.FinishLocation
    ): Promise<DataResponse.OP_WMS_SP_FINISH_LOCATION> {
        return this.post<
            DataResponse.OP_WMS_SP_FINISH_LOCATION,
            DataRequest.FinishLocation
        >(Routes.V3.Inventory.finishLocation, request);
    }

    public recountLocation(
        request: DataRequest.RecountLocation
    ): Promise<DataResponse.OP_WMS_SP_RECOUNT_LOCATION> {
        return this.post<
            DataResponse.OP_WMS_SP_RECOUNT_LOCATION,
            DataRequest.RecountLocation
        >(Routes.V3.Inventory.recountLocation, request);
    }

    public async validateIsMasterPack(
        request: DataRequest.ValidateIsMasterPack
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateIsMasterPack
        >(Routes.V3.Masterpack.validateIsMasterPack, request);
    }

    public async getMasterPackDetailByLicence(
        request: DataRequest.GetMasterPackDetailByLicence
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_MASTER_PACK_DETAIL_BY_LICENCE>
    > {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_MASTER_PACK_DETAIL_BY_LICENCE>,
            DataRequest.GetMasterPackDetailByLicence
        >(Routes.V3.Masterpack.getMasterPackDetailByLicence, request);
    }

    public async explodeMasterPack(
        request: DataRequest.ExplodeMasterPack
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.ExplodeMasterPack>(
            Routes.V3.Masterpack.explodeMasterPack,
            request
        );
    }

    public async getPickingMaterialsWithMeasurementUnit(
        request: DataRequest.GetPickingMaterialsWithMeasurementUnit
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
        >
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_PICKING_MATERIALS_WITH_MEASUREMENT_UNIT
            >,
            DataRequest.GetPickingMaterialsWithMeasurementUnit
        >(Routes.V3.Task.getPickingMaterialsWithMeasurementUnit, request);
    }

    public async getMasterPackByLicence(
        request: DataRequest.GetMasterPackByLicense
    ): Promise<Array<DataResponse.OP_WMS_GET_MASTER_PACK_BY_LICENSE>> {
        return this.post<
            Array<DataResponse.OP_WMS_GET_MASTER_PACK_BY_LICENSE>,
            DataRequest.GetMasterPackByLicense
        >(Routes.V3.Masterpack.getMasterPackByLicense, request);
    }

    public recordAndCompleteTheTask(
        request: DataRequest.Reception
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.Reception>(
            Routes.V3.Reception.registerAndChangeStatusOfTask,
            request
        );
    }

    public async getLastDispatchLicenseGeneratedByWavePicking(
        request: DataRequest.GetLastDispatchLicenseGeneratedByWavePicking
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_LAST_DISPATCH_LICENSE_GENERATED_BY_WAVE_PICKING
        >
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_LAST_DISPATCH_LICENSE_GENERATED_BY_WAVE_PICKING
            >,
            DataRequest.GetLastDispatchLicenseGeneratedByWavePicking
        >(
            Routes.V3.Picking.getLastDispatchLicenseGeneratedByWavePicking,
            request
        );
    }

    public insertLicenseDispatch(
        request: DataRequest.InsertLicenseDispatch
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertLicenseDispatch
        >(Routes.V3.Picking.insertLicenseDispatch, request);
    }

    public getLicenseDispatchPrintFormat(
        request: DataRequest.GetLicenseDispatchPrintFormat
    ): Promise<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_PRINT_FORMAT> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_TEST_PRINT_FORMAT,
            DataRequest.GetLicenseDispatchPrintFormat
        >(Routes.V3.Printer.getLicenseDispatchPrintFormat, request);
    }

    public registerGeneralDispatchByRegimeGeneral(
        request: DataRequest.RegisterGeneralDispatchByRegimeGeneral
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterGeneralDispatchByRegimeGeneral
        >(Routes.V3.Picking.registerGeneralDispatchByRegimeGeneral, request);
    }

    public locateLicenseDispatch(
        request: DataRequest.LocateLicenseDispatch
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.LocateLicenseDispatch
        >(Routes.V3.Picking.locateLicenseDispatch, request);
    }

    public registerForReplenishment(
        request: DataRequest.RegisterForReplenishment
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterForReplenishment
        >(Routes.V3.Picking.registerForReplenishment, request);
    }

    public registerReplenishment(
        request: DataRequest.RegisterReplenishment
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterReplenishment
        >(Routes.V3.Picking.registerReplenishment, request);
    }

    public async getLicenseDispatchByWavePicking(
        request: DataRequest.GetLicenseDispatchByWavePicking
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_BY_WAVE_PICKING>
    > {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_BY_WAVE_PICKING>,
            DataRequest.GetLicenseDispatchByWavePicking
        >(Routes.V3.Picking.getLicenseDispatchByWavePicking, request);
    }

    public async getTargetLocationByLicenseDispatch(
        request: DataRequest.GetTargetLocationByLicenseDispatch
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_TARGET_LOCATION_BY_LICENSE_DISPATCH>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_TARGET_LOCATION_BY_LICENSE_DISPATCH
            >,
            DataRequest.GetTargetLocationByLicenseDispatch
        >(Routes.V3.Picking.getTargetLocationByLicenseDispatch, request);
    }

    public async validateIfLocationExists(
        request: DataRequest.ValidatedIfJoinSpotExists
    ): Promise<DataResponse.OP_WMS_SP_VALIDATED_IF_JOIN_SPOT_EXISTS> {
        return this.post<
            DataResponse.OP_WMS_SP_VALIDATED_IF_JOIN_SPOT_EXISTS,
            DataRequest.ValidatedIfJoinSpotExists
        >(Routes.V3.Location.validateIfLocationExists, request);
    }

    public getInfoLicenseDispatch(
        request: DataRequest.GetInfoLicenseDispatch
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_INFO_LICENSE_DISPATCH>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_INFO_LICENSE_DISPATCH>,
            DataRequest.GetInfoLicenseDispatch
        >(Routes.V3.License.getInfoLicenseDispatch, request);
    }

    public async getWavePickingForLicenseDispatch(
        request: DataRequest.GetWavePickingForLicenseDispatch
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH>
    > {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_FOR_LICENSE_DISPATCH>,
            DataRequest.GetWavePickingForLicenseDispatch
        >(Routes.V3.Picking.getWavePickingForLicenseDispatch, request);
    }

    public async getLicenseDispatchForPicking(
        request: DataRequest.GetLicenseDispatchForPicking
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_LICENSE_DISPATCH_FOR_PICKING>,
            DataRequest.GetLicenseDispatchForPicking
        >(Routes.V3.Picking.getLicenseDispatchForPicking, request);
    }

    public async dispatchLicenseExit(
        request: DataRequest.DispatchLicenseExit
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.DispatchLicenseExit
        >(Routes.V3.Picking.dispatchLicenseExit, request);
    }

    public validateInventoryForRealloc(
        request: DataRequest.ValidateInventoryForRealloc
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.ValidateInventoryForRealloc
        >(Routes.V3.Reception.validateInventoryForRealloc, request);
    }

    public async getWavePickingPendingToLocate(
        request: DataRequest.GetWavePickingPendingToLocate
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE>
    > {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_LOCATE>,
            DataRequest.GetWavePickingPendingToLocate
        >(Routes.V3.Picking.getWavePickingPendingToLocate, request);
    }

    public getLastLicenseReallocByUser(
        request: DataRequest.LastLicenseReallocByUser
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.LastLicenseReallocByUser
        >(Routes.V3.Relocation.getLastLicenseReallocByUser, request);
    }

    public async getSuggestedDispatchLicense(
        request: DataRequest.GetSuggestedDispatchLicense
    ): Promise<Array<DataResponse.OP_WMS_GET_SUGGESTED_DISPATCH_LICENSE>> {
        return this.post<
            Array<DataResponse.OP_WMS_GET_SUGGESTED_DISPATCH_LICENSE>,
            DataRequest.GetSuggestedDispatchLicense
        >(Routes.V3.Picking.getSuggestedDispatchLicense, request);
    }

    public async insertPilotFromDispatchLicense(
        request: DataRequest.InsertPilotFromDispatchLicense
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertPilotFromDispatchLicense
        >(Routes.V3.Picking.insertPilotFromDispatchLicense, request);
    }

    public async addSeriesRank(
        request: DataRequest.AddSeriesRank
    ): Promise<Array<DataResponse.SerialNumbers>> {
        return this.post<
            Array<DataResponse.SerialNumbers>,
            DataRequest.AddSeriesRank
        >(Routes.V3.License.addSeriesRank, request);
    }

    public async insertVehicleFromDispatchLicence(
        request: DataRequest.InsertVehicleFromDispatchLicence
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertVehicleFromDispatchLicence
        >(Routes.V3.Picking.insertVehicleFromDispatchLicence, request);
    }

    public async insertExitPassFromDispatchLicence(
        request: DataRequest.InsertExitPassFromDispatchLicence
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.InsertExitPassFromDispatchLicence
        >(Routes.V3.Picking.insertExitPassFromDispatchLicence, request);
    }

    public async getWavePickingPendingToDispatch(
        request: DataRequest.GetWavePickingPendingToDispatch
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_DISPATCH>
    > {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_WAVE_PICKING_PENDING_TO_DISPATCH>,
            DataRequest.GetWavePickingPendingToDispatch
        >(Routes.V3.Picking.getWavePickingPendingToDispatch, request);
    }

    public async getPrintPassFormatByHH(
        request: DataRequest.GetPrintPassFormatByHH
    ): Promise<DataResponse.OP_WMS_SP_GET_PRINT_PASS_FORMAT_BY_HH> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_PRINT_PASS_FORMAT_BY_HH,
            DataRequest.GetPrintPassFormatByHH
        >(Routes.V3.Printer.getPrintPassFormatByHH, request);
    }

    public validateSuggestedLocation(
        request: DataRequest.SuggestedLocation
    ): Promise<DataResponse.Operation> {
        return this.post<DataResponse.Operation, DataRequest.SuggestedLocation>(
            Routes.V3.LocationSuggestion.validateSuggestedLocation,
            request
        );
    }

    public getLocationSuggestion(
        request: DataRequest.SuggestedLocation
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE
            >,
            DataRequest.SuggestedLocation
        >(Routes.V3.LocationSuggestion.getLocationSuggestion, request);
    }

    public getLocationSuggestionByMaterial(
        request: DataRequest.SuggestedLocation
    ): Promise<
        Array<
            DataResponse.OP_WMS_SP_GET_SUGGESTED_LOCATIONS_OF_MATERIAL_BY_LICENSE
        >
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_SUGGESTED_LOCATIONS_OF_MATERIAL_BY_LICENSE
            >,
            DataRequest.SuggestedLocation
        >(
            Routes.V3.LocationSuggestion.getLocationSuggestionByMaterial,
            request
        );
    }

    public getLicenseCompatibleClassForLocation(
        request: DataRequest.SuggestedLocation
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_LICENSE_COMPATIBLE_CLASS_FOR_LOCATION>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_LICENSE_COMPATIBLE_CLASS_FOR_LOCATION
            >,
            DataRequest.SuggestedLocation
        >(
            Routes.V3.LocationSuggestion.getLicenseCompatibleClassForLocation,
            request
        );
    }

    getCheckPointsByUser(
        request: DataRequest.GetCheckPointsByUser
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_CHECKPOINTS_BY_USER>> {
        return this.post<
            Array<DataResponse.OP_WMS_SP_GET_CHECKPOINTS_BY_USER>,
            DataRequest.GetCheckPointsByUser
        >(Routes.V3.CheckPoint.getCheckPointsByUser, request);
    }

    updateMaterialProperties(
        request: DataRequest.UpdateMaterialProperties
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.UpdateMaterialProperties
        >(Routes.V3.Material.updateMaterialProperties, request);
    }

    getInfoBatch(
        request: DataRequest.GetInfoBatch
    ): Promise<DataResponse.OP_WMS_SP_GET_INFO_BATCH> {
        return this.post<
            DataResponse.OP_WMS_SP_GET_INFO_BATCH,
            DataRequest.GetInfoBatch
        >(Routes.V3.Inventory.getInfoBatch, request);
    }

    getTaskDetailForReceptionConsolidated(
        request: DataRequest.GetTaskDetailForReceptionConsolidated
    ): Promise<
        Array<DataResponse.OP_WMS_SP_GET_TASK_DETAIL_FOR_RECEPTION_CONSOLIDATED>
    > {
        return this.post<
            Array<
                DataResponse.OP_WMS_SP_GET_TASK_DETAIL_FOR_RECEPTION_CONSOLIDATED
            >,
            DataRequest.GetTaskDetailForReceptionConsolidated
        >(Routes.V3.Reception.getTaskDetailForReceptionConsolidated, request);
    }

    public registerGeneralTransferReception(
        request: DataRequest.RegisterGeneralTransferReception
    ): Promise<DataResponse.Operation> {
        return this.post<
            DataResponse.Operation,
            DataRequest.RegisterGeneralTransferReception
        >(Routes.V3.GeneralTransfer.registerGeneralTransferReception, request);
    }

    public registerGeneralTransferPicking(
        request: DataRequest.RegisterGeneralTransferPicking
    ): Promise<DataResponse.Operation>{
        return this.post<
        DataResponse.Operation,
            DataRequest.RegisterGeneralTransferPicking
        >(Routes.V3.GeneralTransfer.registerGeneralTransferPicking, request);
    }
}
