import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataRequest, DataResponse } from "../../models/models";

@Injectable()
export class LocationSuggestionProvider {
    constructor(protected api: ApiClientV3Provider){}

    public validateSuggestedLocation(
        request: DataRequest.SuggestedLocation
    ): Promise<DataResponse.Operation> {
        return this.api.validateSuggestedLocation(request);
    }

    public getLocationSuggestion(
        request: DataRequest.SuggestedLocation
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LOCATION_OF_SLOTTING_ZONE_BY_LICENSE>> {
        return this.api.getLocationSuggestion(request);
    }

    public getLocationSuggestionByMaterial(
        request: DataRequest.SuggestedLocation
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_SUGGESTED_LOCATIONS_OF_MATERIAL_BY_LICENSE>> {
        return this.api.getLocationSuggestionByMaterial(request);
    }

    public getLicenseCompatibleClassForLocation(
        request: DataRequest.SuggestedLocation
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_LICENSE_COMPATIBLE_CLASS_FOR_LOCATION>>{
        return this.api.getLicenseCompatibleClassForLocation(request);
    }
}