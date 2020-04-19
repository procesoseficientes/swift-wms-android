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
const translate_1 = require("../translate/translate");
const http_1 = require("@angular/common/http");
const enums_1 = require("../../enums/enums");
let BaseProvider = class BaseProvider {
    constructor(translate, http) {
        this.translate = translate;
        this.http = http;
    }
    get(userCredentials, requestPath, resource = "") {
        return this.http
            .get(`${userCredentials.communicationAddress}${requestPath}`, {
            headers: {
                Authorization: "Basic ZDRydGgtdjRkM3I6SW50ZWdyYS5zNHA="
            }
        })
            .toPromise()
            .catch((response) => {
            return this.processError(response, resource);
        });
    }
    post(requestPath, requestBody, resource = "") {
        return this.http
            .post(`${requestBody.communicationAddress}${requestPath}`, requestBody, {
            headers: {
                Authorization: "Basic ZDRydGgtdjRkM3I6SW50ZWdyYS5zNHA="
            }
        })
            .toPromise()
            .catch(response => {
            return this.processError(response, resource);
        });
    }
    processError(response, resource) {
        if (response.status && response.status != enums_1.Enums.CustomErrorCodes.Ok)
            return this.translate
                .translateMessageFromErrorCode(response.status, resource)
                .then((message) => {
                return Promise.reject(new Error(message));
            });
        return this.translate
            .translateMessageFromErrorCode(enums_1.Enums.CustomErrorCodes.BadRequest, resource)
            .then((message) => {
            return Promise.reject(new Error(message));
        });
    }
};
BaseProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [translate_1.TranslateProvider,
        http_1.HttpClient])
], BaseProvider);
exports.BaseProvider = BaseProvider;
//# sourceMappingURL=base.js.map