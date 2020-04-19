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
const core_1 = require("@angular/core");
const api_client_v3_1 = require("../api-client/api-client.v3");
let LocationSuggestionProvider = class LocationSuggestionProvider {
    constructor(api) {
        this.api = api;
    }
    validateSuggestedLocation(request) {
        return this.api.validateSuggestedLocation(request);
    }
    getLocationSuggestion(request) {
        return this.api.getLocationSuggestion(request);
    }
    getLocationSuggestionByMaterial(request) {
        return this.api.getLocationSuggestionByMaterial(request);
    }
    getLicenseCompatibleClassForLocation(request) {
        return this.api.getLicenseCompatibleClassForLocation(request);
    }
};
LocationSuggestionProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider])
], LocationSuggestionProvider);
exports.LocationSuggestionProvider = LocationSuggestionProvider;
//# sourceMappingURL=location-suggestion.js.map