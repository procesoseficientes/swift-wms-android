"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const enums_1 = require("../../enums/enums");
const _ = require("lodash");
let RulesProvider = class RulesProvider {
    processQuantity(quantity, quantityType, rule, decimals = 0) {
        if (decimals == 0)
            decimals = rule.defaultCalculationsDecimals;
        if (rule.displayDecimalsRoundConfiguration == quantityType ||
            rule.displayDecimalsRoundConfiguration == enums_1.Enums.QuantityType.Both) {
            switch (rule.displayDecimalsRoundType) {
                case enums_1.Enums.RoundType.Floor:
                    return _.floor(quantity, decimals);
                case enums_1.Enums.RoundType.Round:
                    return _.round(quantity, decimals);
                case enums_1.Enums.RoundType.Trunc:
                    return quantity < 0
                        ? _.ceil(quantity, decimals)
                        : _.floor(quantity, decimals); //Math.trunc(quantity);
                case enums_1.Enums.RoundType.Ceiling:
                    return _.ceil(quantity, decimals);
            }
        }
        return quantity;
    }
};
RulesProvider = __decorate([
    core_1.Injectable()
], RulesProvider);
exports.RulesProvider = RulesProvider;
//# sourceMappingURL=rules.js.map