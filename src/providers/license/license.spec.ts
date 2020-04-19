import { async, TestBed } from "@angular/core/testing";
import { LicenseProvider } from "./license";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { ApiClientV3Provider as ApiClientV3ProviderMock } from "../api-client/api-client.v3.mock";
import { DataResponse, DataRequest, Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UnitTesting } from "../../common/common.unit";

describe("LicenseProvider", () => {
    let provider: LicenseProvider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    LicenseProvider,
                    {
                        provide: ApiClientV3Provider,
                        useClass: ApiClientV3ProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(LicenseProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof LicenseProvider).toBe(true);
    });

    it("Should create license", () => {
        let execute = async () => {
            try {
                let credentials: Model.UserCredentials = UnitTesting.getTestCredentials();
                let request: DataRequest.CreateLicense = DataRequest.Factory.createCreateLicenseRequest(
                    "503776",
                    "BCORADO",
                    "BCORADO",
                    Enums.Regime.General,
                    527412,
                    credentials
                );

                let result: DataResponse.Operation = await provider.createLicense(
                    request
                );
                expect(result).toBeDefined("Result must return a value");
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must return be successful"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });
});
