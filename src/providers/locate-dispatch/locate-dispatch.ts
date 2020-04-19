import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Enums } from "../../enums/enums";
import { Model } from "../../models/models";
import * as _ from "lodash";

@Injectable()
export class LocateDispatchProvider {
    constructor(public http: HttpClient) {}

    showScanIcon(
        option: Enums.LocateLicensePickingScan,
        license: Model.LicenseDispatch,
        location: Model.LocationDispatch,
        currentScan: Enums.LocateLicensePickingScan
    ): boolean {
        if (license) {
            return option === currentScan && license.showScanIcon;
        } else if (location) {
            return option === currentScan && location.showScanIcon;
        } else {
            return false;
        }
    }

    isAllLocationsAllComplete(
        locations: Array<Model.LocationDispatch>
    ): boolean {
        let locationsComplete = _.filter(
            locations,
            (currentLocation: Model.LocationDispatch) => {
                return currentLocation.isComplete;
            }
        );
        return locationsComplete == null
            ? false
            : locationsComplete.length == locations.length;
    }

    isAllLicensesAllComplete(location: Model.LocationDispatch): boolean {
        let licensesComplete = _.filter(
            location.licenses,
            (currentLicense: Model.LicenseDispatch) => {
                return currentLicense.isComplete;
            }
        );
        return licensesComplete == null
            ? false
            : licensesComplete.length == location.licenses.length;
    }

}
