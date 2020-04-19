import { Injectable } from "@angular/core";
import { Enums } from "../../enums/enums";
import { Model } from "../../models/models";

@Injectable()
export class RulesProvider {
    getCalculationRule(): any /* Promise<any> */ {}
    processQuantity(
        _quantity: number,
        _quantityType: Enums.QuantityType,
        _rule: Model.CalculationRule,
        _decimals: number
    ): any /* number */ {}
    getEventRule(_type: Enums.EventType): any /* Promise<Docs.RuleDoc> */ {}
}
