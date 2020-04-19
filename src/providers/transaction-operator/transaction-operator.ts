import { Injectable } from "@angular/core";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { Model, DataRequest } from "../../models/models";
import { Enums } from "../../enums/enums";
import { ConfigurationProvider } from "../configuration/configuration";
import * as _ from "lodash";
@Injectable()
export class TransactionOperatorProvider {
    maxTransactions: number = 50;
    constructor(
        private settings: UserSettingsProvider,
        private configuration: ConfigurationProvider
    ) {}

    async loadParameter(): Promise<void> {
        let configWhere = DataRequest.Factory.createGetConfigurationRequest(
            this.settings.userCredentials
        );
        configWhere.paramType = Enums.ConfigurationParamType.System;
        configWhere.paramGroup = Enums.ConfigurationParamGroup.General;
        configWhere.paramName = Enums.ConfigurationParamName.MaxTransactions;

        let configs: Array<
            Model.Configuration
        > = await this.configuration.findConfigurations(configWhere);
        if (configs != null && configs.length > 0) {
            this.maxTransactions = configs[0].numericValue;
        }
    }

    public addTransactionByOperator(transaction: Model.TransactionOperator) {
        if (this.settings.logOperator == null) {
            this.settings.logOperator = [];
        }
        this.settings.logOperator = _.orderBy(
            this.settings.logOperator,
            "id",
            "desc"
        );
        this.settings.logOperator = _.slice(
            this.settings.logOperator,
            0,
            this.maxTransactions
        );
        transaction.id = this.settings.logOperator.length + 1;
        this.settings.logOperator.push(transaction);
    }
}
