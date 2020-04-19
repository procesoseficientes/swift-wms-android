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
const http_1 = require("@angular/common/http");
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const translate_1 = require("../translate/translate");
const models_1 = require("../../models/models");
const api_client_v3_1 = require("../api-client/api-client.v3");
let ChargeProvider = class ChargeProvider {
    constructor(events, translate, http, api) {
        this.events = events;
        this.translate = translate;
        this.http = http;
        this.api = api;
    }
    getCharges(requestCharge) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let chargesResponse = yield this.api.getTypeChargeByMobile(requestCharge);
                let charges = chargesResponse.map((charge) => {
                    let outputCharge = models_1.Model.Factory.createCharge();
                    outputCharge.typeChargeId = charge.TYPE_CHARGE_ID;
                    outputCharge.charge = charge.CHARGE;
                    outputCharge.description = charge.DESCRIPTION;
                    outputCharge.warehouseWeather = charge.WAREHOUSE_WEATHER;
                    outputCharge.regime = charge.REGIMEN;
                    outputCharge.comment = charge.COMMENT;
                    outputCharge.dayTrip = charge.DAY_TRIP;
                    outputCharge.serviceCode = charge.SERVICE_CODE;
                    outputCharge.toMovil = charge.TO_MOVIL;
                    outputCharge.qty = charge.QTY;
                    return outputCharge;
                });
                return Promise.resolve(charges);
            }
            catch (error) {
                //FIXME: then the error handling is added
                return Promise.reject(error);
            }
        });
    }
    updateCharges(charges, userCredentials) {
        return Promise.all(this.generateListOfUpdateCharge(charges, userCredentials))
            .then(() => {
            return models_1.Model.Factory.createSuccessOperation();
        })
            .catch(error => {
            return models_1.Model.Factory.createFaultOperation({
                message: error.Mensaje,
                code: error.Codigo
            });
        });
    }
    generateListOfUpdateCharge(charges, userCredentials) {
        return charges.map((charge) => {
            return this.api.createTypeChangeXLicenseRequest(models_1.DataRequest.Factory.createTypeChangeXLicenseRequest(charge, userCredentials));
        });
    }
};
ChargeProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        translate_1.TranslateProvider,
        http_1.HttpClient,
        api_client_v3_1.ApiClientV3Provider])
], ChargeProvider);
exports.ChargeProvider = ChargeProvider;
//# sourceMappingURL=charge.js.map