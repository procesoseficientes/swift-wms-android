import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Events } from "ionic-angular";
import { TranslateProvider } from "../translate/translate";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class ChargeProvider {
    constructor(
        protected events: Events,
        protected translate: TranslateProvider,
        public http: HttpClient,
        public api: ApiClientV3Provider
    ) {}

    public async getCharges(
        requestCharge: DataRequest.ChargeByMobile
    ): Promise<Array<Model.Charge>> {
        try {
            let chargesResponse: Array<
                DataResponse.OP_WMS_GET_TYPE_CHARGE_BY_MOBILE
            > = await this.api.getTypeChargeByMobile(requestCharge);
            let charges: Array<Model.Charge> = chargesResponse.map(
                (charge: DataResponse.OP_WMS_GET_TYPE_CHARGE_BY_MOBILE) => {
                    let outputCharge = Model.Factory.createCharge();
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
                }
            );

            return Promise.resolve(charges);
        } catch (error) { console.log(error)
            //FIXME: then the error handling is added
            return Promise.reject(error);
        }
    }

    public updateCharges(
        charges: Array<Model.Charge>,
        userCredentials: Model.UserCredentials
    ): Promise<Model.Operation> {
        return Promise.all(
            this.generateListOfUpdateCharge(charges, userCredentials)
        )
            .then(() => {
                return Model.Factory.createSuccessOperation();
            })
            .catch(error => {
                return Model.Factory.createFaultOperation({
                    message: error.Mensaje,
                    code: error.Codigo
                });
            });
    }

    private generateListOfUpdateCharge(
        charges: Array<Model.Charge>,
        userCredentials: Model.UserCredentials
    ): Array<Promise<DataResponse.Operation>> {
        return charges.map((charge: Model.Charge) => {
            return this.api.createTypeChangeXLicenseRequest(
                DataRequest.Factory.createTypeChangeXLicenseRequest(
                    charge,
                    userCredentials
                )
            );
        });
    }
}
