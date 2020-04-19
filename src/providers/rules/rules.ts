import { Injectable } from "@angular/core";
import { Enums } from "../../enums/enums";
import { Model } from "../../models/models";
import * as _ from "lodash";

@Injectable()
export class RulesProvider {
    public processQuantity(
        quantity: number,
        quantityType: Enums.QuantityType,
        rule: Model.CalculationRule,
        decimals: number = 0
    ): number {
        if (decimals == 0) decimals = rule.defaultCalculationsDecimals;

        if (
            rule.displayDecimalsRoundConfiguration == quantityType ||
            rule.displayDecimalsRoundConfiguration == Enums.QuantityType.Both
        ) {
            switch (rule.displayDecimalsRoundType) {
                case Enums.RoundType.Floor:
                    return _.floor(quantity, decimals);
                case Enums.RoundType.Round:
                    return _.round(quantity, decimals);
                case Enums.RoundType.Trunc:
                    return quantity < 0
                        ? _.ceil(quantity, decimals)
                        : _.floor(quantity, decimals); //Math.trunc(quantity);
                case Enums.RoundType.Ceiling:
                    return _.ceil(quantity, decimals);
            }
        }

        return quantity;
    }
}
