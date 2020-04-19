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
const _ = require("lodash");
/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let UtilitiesProvider = class UtilitiesProvider {
    constructor() { }
    subtract(minuend, subtrahend) {
        return _.round(minuend - subtrahend, 2);
    }
    addition(addend1, addend2) {
        return _.round(addend1 + addend2, 2);
    }
    multiply(facto1, facto2) {
        return _.round(facto1 * facto2, 2);
    }
    division(dividend, quotient) {
        return _.round(dividend / quotient, 2);
    }
    static getToken() {
        return Math.random()
            .toString(36)
            .substring(7);
    }
};
UtilitiesProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], UtilitiesProvider);
exports.UtilitiesProvider = UtilitiesProvider;
//# sourceMappingURL=utilities.js.map