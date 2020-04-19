import { async, TestBed } from "@angular/core/testing";
import { BaseProvider } from "./base";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateProvider } from "../translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../translate/translate.mock";
import { DataResponse, DataRequest, Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UnitTesting } from "../../common/common.unit";

describe("BaseProvider", () => {
    let provider: BaseProvider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [HttpClientModule],
                providers: [
                    HttpClient,
                    BaseProvider,
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(BaseProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof BaseProvider).toBe(true);
    });

    it("Should get a test request", () => {
        let execute = async () => {
            try {
                let request: Model.UserCredentials = UnitTesting.getTestCredentials();
                request.communicationAddress = Enums.PagePath.ServerPath;

                let result = await provider.get<DataResponse.BasicResponse>(
                    request,
                    "/v3/json_test"
                );

                return expect(result.code).toBe(
                    Enums.CustomErrorCodes.Ok,
                    "Must return a successful response"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should post a test request", () => {
        let execute = async () => {
            try {
                let request: DataRequest.Login = UnitTesting.getTestCredentials();
                request.userRole = "Operator";
                request.communicationAddress = Enums.PagePath.ServerPath;

                let result = await provider.post<
                    DataResponse.BasicResponse,
                    Model.UserCredentials
                >("/v3/json_test", request, "test");

                return expect(result.code).toBe(
                    Enums.CustomErrorCodes.Ok,
                    "Must return a successful response"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Get should fail because url is wrong", () => {
        let execute = async () => {
            try {
                let request: Model.UserCredentials = Model.Factory.createUserCredentials();
                request.communicationAddress = Enums.PagePath.ServerPath;

                await provider.get<DataResponse.BasicResponse>(
                    request,
                    "v3/json_test"
                );
                return fail("This test should fail");
            } catch (reason) {
                return expect(reason.message).toMatch(
                    new RegExp(
                        `API error \\(${Enums.CustomErrorCodes.BadRequest}\\).+`
                    )
                );
            }
        };

        return execute();
    });

    it("Post should fail because url is wrong", () => {
        let execute = async () => {
            try {
                let request: DataRequest.Login = UnitTesting.getTestCredentials();
                request.userRole = "Operator";
                request.communicationAddress = Enums.PagePath.ServerPath;

                await provider.post<
                    DataResponse.BasicResponse,
                    Model.UserCredentials
                >("v3/json_test", request, "test");
                return fail("This test should fail");
            } catch (reason) {
                return expect(reason.message).toMatch(
                    new RegExp(
                        `API error \\(${Enums.CustomErrorCodes.BadRequest}\\).+`
                    )
                );
            }
        };

        return execute();
    });

    it("Post should fail because body must contain at least loginId", () => {
        let execute = async () => {
            try {
                let request: Model.UserCredentials = Model.Factory.createUserCredentials();
                request.loginId = null;
                request.communicationAddress = Enums.PagePath.ServerPath;

                await provider.post<
                    DataResponse.BasicResponse,
                    Model.UserCredentials
                >("/v3/json_test", request, "test");
                return fail("This test should fail");
            } catch (reason) {
                return expect(reason.message).toMatch(
                    new RegExp(
                        `API error \\(${
                            Enums.CustomErrorCodes.InternalServerError
                        }\\).+`
                    )
                );
            }
        };

        return execute();
    });
});
