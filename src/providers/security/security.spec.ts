import { async, TestBed } from "@angular/core/testing";
import { SecurityProvider } from "./security";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { ApiClientV3Provider as ApiClientV3ProviderMock } from "../api-client/api-client.v3.mock";
import { DataRequest } from "../../models/models";
import { UnitTesting } from "../../common/common.unit";
import { Enums } from "../../enums/enums";

describe("SecurityProvider", () => {
    let provider: SecurityProvider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    SecurityProvider,
                    {
                        provide: ApiClientV3Provider,
                        useClass: ApiClientV3ProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(SecurityProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof SecurityProvider).toBe(true);
    });

    it("Should execute full login process", () => {
        let execute = async () => {
            try {
                let request: DataRequest.Login = UnitTesting.getTestCredentials();

                let result = await provider.validateCredentials(request);

                console.log(JSON.stringify(result));

                return expect(request.communicationAddress).toBe(
                    Enums.PagePath.ServerPath,
                    "Must set a valid communication address"
                );
            } catch (reason) {}
        };

        return execute();
    });
});
