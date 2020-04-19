import { DataRequest, Model } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Enums } from "../../enums/enums";

export class RelocateProvider {
    api: ApiClientV3Provider;

    relocateLicense(
        _request: DataRequest.RelocateLicense
    ): Promise<Model.Operation> {
        if (_request.licenseId === -1) {
            return Promise.reject("Invalid Operation");
        } else if (_request.licenseId === 0) {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    message: "Forbiden operation",
                    code: Enums.CustomErrorCodes.Forbidden
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    registerPartialRelocation(
        request: DataRequest.RegisterPartialRelocation
    ): Promise<Model.Operation> {
        if (request.licenseId == 102030) {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    message: "Forbiden operation",
                    code: Enums.CustomErrorCodes.Forbidden
                })
            );
        }
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }
}
