import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Enums } from "../../enums/enums";
import * as _ from "lodash";

@Injectable()
export class LicenseProvider {
    constructor(protected api: ApiClientV3Provider) {}

    createLicense(
        createLicense: DataRequest.CreateLicense
    ): Promise<DataResponse.Operation> {
        return this.api.createLicense(createLicense);
    }

    async getInventoryByLicense(
        request: DataRequest.GetInventoryByLicense,
        userCredentials: Model.UserCredentials
    ): Promise<Array<Model.Inventory>> {
        let inventory = await this.api.getInventoryByLicense(request);
        return this.transformToInventoryObject<
            DataResponse.OP_WMS_SP_GET_INVENTORY_BY_LICENSE
        >(inventory, userCredentials);
    }

    async getInventoryByMaterial(
        request: DataRequest.GetInventoryByMaterial,
        userCredentials: Model.UserCredentials
    ): Promise<Array<Model.Inventory>> {
        let inventory = await this.api.getInventoryByMaterial(request);

        return this.transformToInventoryObject<
            DataResponse.OP_WMS_SP_GET_INVENTORY_BY_MATERIAL
        >(inventory, userCredentials);
    }

    async getInventoryByLocationSpot(
        request: DataRequest.GetInventoryByLocationSpot,
        userCredentials: Model.UserCredentials
    ): Promise<Array<Model.Inventory>> {
        let inventory = await this.api.getInventoryByLocationSpot(request);

        return this.transformToInventoryObject<
            DataResponse.OP_WMS_SP_GET_INVENTORY_BY_LOCATION_SPOT
        >(inventory, userCredentials);
    }

    private async getMaterialBySerialNumber(
        request: DataRequest.GetMaterialBySerialNumber
    ): Promise<Array<Model.MaterialSerialNumber>> {
        let serialNumbers = await this.api.getMaterialBySerialNumber(request);

        return serialNumbers.map(
            (
                currentSerial: DataResponse.OP_WMS_SP_GET_MATERIAL_X_SERIAL_NUMBER
            ) => {
                return <Model.MaterialSerialNumber>{
                    serial: currentSerial.SERIAL
                };
            }
        );
    }

    private transformToInventoryObject<TInput>(
        inventory: Array<TInput>,
        userCredentials: Model.UserCredentials
    ): Promise<Array<Model.Inventory>> {
        let inventoryRequests = inventory.map((currentInventory: any) => {
            return {
                licenseId: currentInventory.LICENSE_ID,
                currentLocation: currentInventory.CURRENT_LOCATION,
                policyCode: currentInventory.CODIGO_POLIZA,
                clientOwner: currentInventory.CLIENT_OWNER,
                regime: currentInventory.REGIMEN,
                materialId: currentInventory.MATERIAL_ID,
                materialName:currentInventory.MATERIAL_NAME,//description
                qty: currentInventory.QTY,
                vin: currentInventory.VIN,
                batch: currentInventory.BATCH,
                dateExpiration: currentInventory.DATE_EXPIRATION,
                tone: currentInventory.TONE,
                caliber: currentInventory.CALIBER,
                pickingDemandHeaderId:
                    currentInventory.PICKING_DEMAND_HEADER_ID,
                docNum: currentInventory.DOC_NUM,
                showDetails: false,
                icon: "arrow-dropright",
                serialNumberRequests: currentInventory.SERIAL_NUMBER_REQUESTS,
                SerialNumbers: [],
                wavePickingId: currentInventory.WAVE_PICKING_ID,
                statusName: currentInventory.STATUS_NAME,
                shortName: currentInventory.SHORT_NAME
            } as Model.Inventory;
        });

        inventoryRequests.forEach(async (inventoryRequest: Model.Inventory) => {
            if (inventoryRequest.serialNumberRequests === Enums.YesNo.Yes) {
                let request = DataRequest.Factory.createGetMaterialBySerialNumberRequest(
                    inventoryRequest.licenseId,
                    inventoryRequest.materialId,
                    null,
                    userCredentials
                );

                inventoryRequest.SerialNumbers = await this.getMaterialBySerialNumber(
                    request
                );
            }
        });

        return Promise.resolve(inventoryRequests);
    }

    public getAvailableLicenseDetail(
        request: DataRequest.GetAvailableLicenseDetail
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_DETAIL>> {
        return this.api.getAvailableLicenseDetail(request);
    }

    public getAvailableLicenseSeries(
        request: DataRequest.GetAvailableLicenseSeries
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES>> {
        return this.api.getAvailableLicenseSeries(request);
    }

    public validateIfStatusOfLicenseAllowsRealloc(
        request: DataRequest.ValidateIfStatusOfLicenseAllowsRelocation
    ): Promise<DataResponse.Operation> {
        return this.api.validateIfStatusOfLicenseAllowsRealloc(request);
    }

    public async getInfoOfLicenseInLocationForMerge(
        request: DataRequest.GetInfoOfLicenseInLocationForMerge
    ): Promise<Array<Model.MergeLicense>> {
        let licenses: Array<
            DataResponse.OP_WMS_SP_GET_INFO_OF_LICENSE_IN_LOCATION_FOR_MERGE
        > = await this.api.getInfoOfLicenseInLocationForMerge(request);

        let groupedLicenses = _.groupBy(licenses, "LICENSE_ID");

        let licenseInfo: Array<Model.MergeLicense> = _.map(
            groupedLicenses,
            lic => {
                let license = _.first(lic);
                let detail: Array<Model.MergeDetail> = [];

                for (let key in lic) {
                    let d: Model.MergeDetail = <Model.MergeDetail>{
                        materialId: lic[key].MATERIAL_ID,
                        quantity: lic[key].QTY,
                        batch: lic[key].BATCH,
                        expirationDate: lic[key].EXPIRATION_DATE,
                        tone: lic[key].TONE,
                        caliber: lic[key].CALIBER,
                        headerId: lic[key].PICKING_DEMAND_HEADER_ID,
                        docNum: lic[key].DOC_NUM
                    };
                    detail.push(d);
                }

                return <Model.MergeLicense>{
                    licenseId: license.LICENSE_ID,
                    licenseDescription: license.LICENSE_DESCRIPTION,
                    detail: detail,
                    icon: "arrow-dropright"
                };
            }
        );

        return Promise.resolve(licenseInfo);
    }

    public mergeLicenseInLocationWithoutDetail(
        request: DataRequest.MergeLicenseInLocationWithoutDetail
    ): Promise<DataResponse.Operation> {
        return this.api.mergeLicenseInLocationWithoutDetail(request);
    }

    public async getInfoLicenseDispatch(
        request: DataRequest.GetInfoLicenseDispatch
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_INFO_LICENSE_DISPATCH>> {
        return this.api.getInfoLicenseDispatch(request);
    }

    public async addSeriesRank(
        request: DataRequest.AddSeriesRank
    ): Promise<Array<DataResponse.SerialNumbers>> {
        return this.api.addSeriesRank(request);
    }
}
