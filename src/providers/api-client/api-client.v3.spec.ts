import { async, TestBed } from "@angular/core/testing";
import { ApiClientV3Provider } from "./api-client.v3";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateProvider } from "../translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../translate/translate.mock";
import { DataRequest, Model } from "../../models/models";
import { UnitTesting } from "../../common/common.unit";
import { Enums } from "../../enums/enums";

describe("ApiClientProvider", () => {
    let provider: ApiClientV3Provider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [HttpClientModule],
                providers: [
                    HttpClient,
                    ApiClientV3Provider,
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(ApiClientV3Provider);
    });

    it("Should be created", () => {
        expect(provider instanceof ApiClientV3Provider).toBe(true);
    });

    it("Should validate user in azure", () => {
        let execute = async () => {
            try {
                let request = UnitTesting.getTestCredentials();

                let result = await provider.validateCredentials(request);

                console.log(JSON.stringify(result));

                return expect(result.CommunicationAddress).toBe(
                    Enums.PagePath.ServerPath,
                    "Must return a valid communication address"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should create license successfully", () => {
        let execute = async () => {
            let request: DataRequest.CreateLicense = <DataRequest.CreateLicense>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";
            request.codePolicy = "483707";
            request.clientOwner = "arium";
            request.licenseId = 0;
            request.location = "B01-R01-C01-NA";
            request.login = "RDMOVIL";
            request.regime = Enums.Regime.General;
            request.result = "";
            request.taskId = 476582;

            let result = await provider.createLicense(request);
            expect(result).toBeDefined("Result must be fetched");
            expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "LicenseProvider createLicense must exit successfully"
            );
        };

        return execute();
    });

    it("Should get Header Task Reception", () => {
        let execute = async () => {
            let request: DataRequest.Reception = <DataRequest.Reception>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";
            request.regime = Enums.Regime.General;
            request.taskAssignedTo = "ACAMACHO";
            request.serialNumber = 507295;

            let result = await provider.getReceptionTask(request);
            return expect(result).toBeDefined("Result must return a value");
        };

        return execute();
    });

    it("Should complete task reception", () => {
        let execute = async () => {
            let request: DataRequest.Reception = <DataRequest.Reception>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";

            request.transType = Enums.TransType.GeneralReception;
            request.login = "ACAMACHO";
            request.policyCode = "252780";
            request.taskId = 295037;
            request.status = "ACCEPTED";

            let result = await provider.completeTask(request);
            expect(result).toBeDefined("ReceptionStatus must be fetched");
            return expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "RegisterReception must be success."
            );
        };

        return execute();
    });

    it("Should validate barcode for the reception's license", () => {
        let execute = async () => {
            let request: DataRequest.GetScannedMaterialByLicenseInReceptionTask = <DataRequest.GetScannedMaterialByLicenseInReceptionTask>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";

            request.barcode = "autovanguard/VAA1001";
            request.clientOwner = "autovanguard";
            request.licenseId = 367930;
            request.taskId = 476464;

            let result = await provider.validateBarcodeForLicense(request);
            expect(result).toBeDefined("ReceptionStatus must be fetched");
            return expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "RegisterReception must be success."
            );
        };

        return execute();
    });

    it("Should get the material for the reception task", () => {
        let execute = async () => {
            let request: DataRequest.GetScannedMaterialByLicenseInReceptionTask = <DataRequest.GetScannedMaterialByLicenseInReceptionTask>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";

            request.barcode = "autovanguard/VAA1001";
            request.clientOwner = "autovanguard";
            request.licenseId = 397930;
            request.taskId = 476464;

            let result = await provider.getScannedMaterialByLicenseInReceptionTask(
                request
            );
            expect(result).not.toBe(
                null,
                "Result should not be null or undefined"
            );
            expect(result.length).toBeGreaterThan(
                0,
                "Result's length must be greateer"
            );
            return expect(request.barcode).toBe(
                result[0].BARCODE_ID,
                "Result's barcodeid should be the same as the parameter's"
            );
        };

        return execute();
    });

    it("Should add material to license", () => {
        let execute = async () => {
            let request: DataRequest.AddMaterialToLicense = <DataRequest.AddMaterialToLicense>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";

            request.licenseId = 408468;
            request.barcode = "autovanguard/VAA2002";
            request.qty = 100;
            request.lastLogin = "ACAMACHO";
            request.volumeFactor = 10;
            request.weight = 10;
            request.comments = "";
            request.serial = "";
            request.tradeAgreementId = "";
            request.totalMaterials = 0;
            request.status = "";
            request.result = "";
            request.dateExpiration = new Date();
            request.batch = "";
            request.vin = "";
            request.paramName = "";
            request.action = Enums.ReceptionAction.Add;
            request.tone = "";
            request.caliber = "";

            let result: Model.Operation = await provider.addMaterialToLicense(
                request
            );
            expect(result).toBeDefined("Result must return a value");
            return expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "Result must be successful."
            );
        };

        return execute();
    });

    it("Should validate material in reception license", () => {
        let execute = async () => {
            let request: DataRequest.ValidateStatusInMaterialsLicense = <DataRequest.ValidateStatusInMaterialsLicense>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";

            request.licenseId = 397930;

            let result: Model.Operation = await provider.validateStatusInMaterialsLicense(
                request
            );
            expect(result).toBeDefined("Result must return a value");
            return expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "Result must be successful."
            );
        };

        return execute();
    });

    it("Should RollBack License", () => {
        let execute = async () => {
            let request: DataRequest.RollBackLicense = <DataRequest.RollBackLicense>UnitTesting.getTestCredentials();
            request.communicationAddress = "http://localhost:6661";
            request.dbUser = "alsersa";
            request.dbPassword = "alsersaServer1237710";

            request.licenseId = 397930;

            let result: Model.Operation = await provider.rollbackLicense(
                request
            );
            expect(result).toBeDefined("Result must return a value");
            return expect(result.Resultado).toBe(
                Enums.OperationResult.Success,
                "Result must be successful."
            );
        };

        return execute();
    });
});
