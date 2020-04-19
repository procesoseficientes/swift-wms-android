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
const user_settings_1 = require("../user-settings/user-settings");
const models_1 = require("../../models/models");
const enums_1 = require("../../enums/enums");
const configuration_1 = require("../configuration/configuration");
const _ = require("lodash");
let TransactionOperatorProvider = class TransactionOperatorProvider {
    constructor(settings, configuration) {
        this.settings = settings;
        this.configuration = configuration;
        this.maxTransactions = 50;
    }
    loadParameter() {
        return __awaiter(this, void 0, void 0, function* () {
            let configWhere = models_1.DataRequest.Factory.createGetConfigurationRequest(this.settings.userCredentials);
            configWhere.paramType = enums_1.Enums.ConfigurationParamType.System;
            configWhere.paramGroup = enums_1.Enums.ConfigurationParamGroup.General;
            configWhere.paramName = enums_1.Enums.ConfigurationParamName.MaxTransactions;
            let configs = yield this.configuration.findConfigurations(configWhere);
            if (configs != null && configs.length > 0) {
                this.maxTransactions = configs[0].numericValue;
            }
        });
    }
    addTransactionByOperator(transaction) {
        if (this.settings.logOperator == null) {
            this.settings.logOperator = [];
        }
        this.settings.logOperator = _.orderBy(this.settings.logOperator, "id", "desc");
        this.settings.logOperator = _.slice(this.settings.logOperator, 0, this.maxTransactions);
        transaction.id = this.settings.logOperator.length + 1;
        this.settings.logOperator.push(transaction);
    }
};
TransactionOperatorProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_settings_1.UserSettingsProvider,
        configuration_1.ConfigurationProvider])
], TransactionOperatorProvider);
exports.TransactionOperatorProvider = TransactionOperatorProvider;
//# sourceMappingURL=transaction-operator.js.map