import { Injectable } from "@angular/core";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Enums } from "../../enums/enums";

@Injectable()
export class LocationProvider {
    constructor(private api: ApiClientV3Provider) {}

    public getLocation(
        location: DataRequest.GetLocation
    ): Promise<DataResponse.ShelfSpot> {
        return this.api.getLocation(location);
    }

    public validateLocationForStorage(
        location: DataRequest.ValidateLocationForStorage
    ): Promise<DataResponse.Operation> {
        return this.api.validateLocationForStorage(location);
    }

    public async validateLocationMaxWeightAndVolume(
        location: DataRequest.ValidateLocationMaxWeightAndVolume
    ): Promise<Model.ShelfSpotVolumeAndWeight> {
        try {
            let maxWeightAndVolume: DataResponse.OP_WMS_VALIDATE_LOCATION_MAX_WEIGHT_AND_VOLUME = await this.api.validateLocationMaxWeightAndVolume(
                location
            );

            let shelfSpotVolumeAndWeight: Model.ShelfSpotVolumeAndWeight = Model.Factory.createShelfSpotVolumeAndWeight();
            shelfSpotVolumeAndWeight.availableVolume =
                maxWeightAndVolume.AVAILABLE_VOLUME;
            shelfSpotVolumeAndWeight.availableWeight =
                maxWeightAndVolume.AVAILABLE_WEIGHT;
            shelfSpotVolumeAndWeight.volumeIcon =
                maxWeightAndVolume.VOLUME_ICON;
            shelfSpotVolumeAndWeight.volumeIconColor =
                maxWeightAndVolume.VOLUME_ICON_COLOR;
            shelfSpotVolumeAndWeight.weightIcon =
                maxWeightAndVolume.WEIGHT_ICON;
            shelfSpotVolumeAndWeight.weightIconColor =
                maxWeightAndVolume.WEIGHT_ICON_COLOR;
            return Promise.resolve(shelfSpotVolumeAndWeight);
        } catch (error) {
            //FIXME: then the error handling is added
            return Promise.reject(error);
        }
    }

    public getUsedMt2byLocationSpot(
        location: DataRequest.GetLocation
    ): Promise<DataResponse.Operation> {
        return this.api.getUsedMt2byLocationSpot(location);
    }

    public async getLocationInfo(
        locationInfoRequest: DataRequest.GetLocationInfo
    ): Promise<Model.LocationInfo> {
        let locationInfo = await this.api.getLocationInfo(locationInfoRequest);
        let locationInfoResponse = Model.Factory.createLocationInfo();

        locationInfoResponse.locationSpot = locationInfo.LOCATION_SPOT;
        locationInfoResponse.warehouseParent = locationInfo.WAREHOUSE_PARENT;
        locationInfoResponse.spotType = locationInfo.SPOT_TYPE;
        locationInfoResponse.zone = locationInfo.ZONE;
        locationInfoResponse.allowPicking = locationInfo.ALLOW_PICKING;
        locationInfoResponse.allowStorage = locationInfo.ALLOW_STORAGE;
        locationInfoResponse.allowRealloc = locationInfo.ALLOW_REALLOC;
        locationInfoResponse.availableWeight = locationInfo.AVAILABLE_WEIGHT;
        locationInfoResponse.availableVolume = locationInfo.AVAILABLE_VOLUME;

        return Promise.resolve(locationInfoResponse);
    }

    public async validateIfLocationExists(
        request: DataRequest.ValidatedIfJoinSpotExists
    ): Promise<DataResponse.Operation> {
        let validate = await this.api.validateIfLocationExists(request);
        if (validate  && validate.EXISTS === 1) {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        } else {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.InvalidLocation,
                    message: "Invalid location"
                })
            );
        }
    }
}
