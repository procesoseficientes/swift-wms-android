import { Injectable } from "@angular/core";
import { Model, DataRequest } from "../../models/models";
import * as _ from "lodash";
import { Enums } from "../../enums/enums";

export class ChargeProvider {
    getCharges(
        _requestCharge: DataRequest.ChargeByMobile
    ): Promise<Array<Model.Charge>> {
        return Promise.resolve([
            {
                typeChargeId: 1029,
                charge: "AREA SECA",
                description: "Fleje",
                warehouseWeather: "SECO",
                regime: Enums.Regime.General,
                comment: "test",
                dayTrip: "N/A",
                serviceCode: "1",
                toMovil: 1,
                qty: 0
            }
        ]);
    }
    updateCharges(
        _charges: Array<Model.Charge>,
        _userCredentials: Model.UserCredentials
    ): Promise<Model.Operation> {
        let charge = _.first(_charges);
        if (charge.typeChargeId === 0) {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: Enums.CustomErrorCodes.InternalServerError,
                    message: "Internal Server Error"
                })
            );
        } else if (charge.typeChargeId === -1) {
            return Promise.reject("Invalid Operation");
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }
    generateListOfUpdateCharge(
        _charges: Array<Model.Charge>,
        _userCredentials: Model.UserCredentials
    ): any /* Array<Promise<DataResponse.Operation>> */ {}
}
