import { Injectable } from "@angular/core";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Enums } from "../../enums/enums";
@Injectable()
export class LocationProvider {
    api: ApiClientV3Provider;

    getLocation(
        _location: DataRequest.GetLocation
    ): Promise<DataResponse.ShelfSpot> {
        let shelfSpot: DataResponse.ShelfSpot;
        if (_location.location === Enums.LocationType.Rack) {
            shelfSpot = <DataResponse.ShelfSpot>{
                locationSpot: _location.location,
                spotType: Enums.LocationType.Rack,
                spotLabel: "prueba",
                warehouseParent: "",
                zone: "",
                spotOrderby: 0,
                spotAisle: 0,
                spotColumn: "",
                spotLevel: "",
                spotPartition: 0,
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
                volume: 0
            };
            return Promise.resolve(shelfSpot);
        } else if (_location.location === Enums.LocationType.Floor) {
            shelfSpot = <DataResponse.ShelfSpot>{
                locationSpot: _location.location,
                spotType: Enums.LocationType.Floor,
                spotLabel: "prueba",
                warehouseParent: "",
                zone: "",
                spotOrderby: 0,
                spotAisle: 0,
                spotColumn: "",
                spotLevel: "",
                spotPartition: 0,
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
                volume: 0
            };
            return Promise.resolve(shelfSpot);
        } else if(_location.location === "B01-P01" || _location.location === "B01-P02-F01-NU"){
            shelfSpot = <DataResponse.ShelfSpot>{
                locationSpot: _location.location
            };
            return Promise.resolve(shelfSpot);
        } else {
            return Promise.reject("Invalid Operation");
        }
    }

    validateLocationForStorage(
        _location: DataRequest.ValidateLocationForStorage
    ): Promise<DataResponse.Operation> {
        if (_location.locationSpot === "ERROR") {
            return Promise.reject("Invalid Operation");
        } else if (_location.locationSpot === "UNKNOWN") {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.BadRequest,
                    message: "NotFound"
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }
    validateLocationMaxWeightAndVolume(
        _location: DataRequest.ValidateLocationMaxWeightAndVolume
    ): any /* Promise<Model.ShelfSpotVolumeAndWeight> */ {}
    getUsedMt2byLocationSpot(
        _location: DataRequest.GetLocation
    ): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }
    getLocationInfo(
        _locationInfoRequest: DataRequest.GetLocationInfo
    ): Promise<Model.LocationInfo> {
        if (!_locationInfoRequest.locationSpot) {
            return Promise.reject("Invalid location");
        } else {
            return Promise.resolve(Model.Factory.createLocationInfo());
        }
    }
}
