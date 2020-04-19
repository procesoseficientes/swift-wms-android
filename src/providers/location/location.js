"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const models_1 = require("../../models/models");
const api_client_v3_1 = require("../api-client/api-client.v3");
const enums_1 = require("../../enums/enums");
let LocationProvider = class LocationProvider {
    constructor(api) {
        this.api = api;
    }
    getLocation(location) {
        return this.api.getLocation(location);
    }
    validateLocationForStorage(location) {
        return this.api.validateLocationForStorage(location);
    }
    validateLocationMaxWeightAndVolume(location) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let maxWeightAndVolume = yield this.api.validateLocationMaxWeightAndVolume(location);
                let shelfSpotVolumeAndWeight = models_1.Model.Factory.createShelfSpotVolumeAndWeight();
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
            }
            catch (error) {
                //FIXME: then the error handling is added
                return Promise.reject(error);
            }
        });
    }
    getUsedMt2byLocationSpot(location) {
        return this.api.getUsedMt2byLocationSpot(location);
    }
    getLocationInfo(locationInfoRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            let locationInfo = yield this.api.getLocationInfo(locationInfoRequest);
            let locationInfoResponse = models_1.Model.Factory.createLocationInfo();
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
        });
    }
    validateIfLocationExists(request) {
        return __awaiter(this, void 0, void 0, function* () {
            let validate = yield this.api.validateIfLocationExists(request);
            if (validate && validate.EXISTS === 1) {
                return Promise.resolve(models_1.Model.Factory.createSuccessOperation());
            }
            else {
                return Promise.resolve(models_1.Model.Factory.createFaultOperation({
                    code: enums_1.Enums.CustomErrorCodes.InvalidLocation,
                    message: "Invalid location"
                }));
            }
        });
    }
};
LocationProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], LocationProvider);
exports.LocationProvider = LocationProvider;
//# sourceMappingURL=location.js.map