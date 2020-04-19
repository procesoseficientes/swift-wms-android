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
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const _ = require("lodash");
let LocateDispatchProvider = class LocateDispatchProvider {
    constructor(http) {
        this.http = http;
    }
    showScanIcon(option, license, location, currentScan) {
        if (license) {
            return option === currentScan && license.showScanIcon;
        }
        else if (location) {
            return option === currentScan && location.showScanIcon;
        }
        else {
            return false;
        }
    }
    isAllLocationsAllComplete(locations) {
        let locationsComplete = _.filter(locations, (currentLocation) => {
            return currentLocation.isComplete;
        });
        return locationsComplete == null
            ? false
            : locationsComplete.length == locations.length;
    }
    isAllLicensesAllComplete(location) {
        let licensesComplete = _.filter(location.licenses, (currentLicense) => {
            return currentLicense.isComplete;
        });
        return licensesComplete == null
            ? false
            : licensesComplete.length == location.licenses.length;
    }
};
LocateDispatchProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.HttpClient])
], LocateDispatchProvider);
exports.LocateDispatchProvider = LocateDispatchProvider;
//# sourceMappingURL=locate-dispatch.js.map