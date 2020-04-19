import { async, TestBed } from "@angular/core/testing";
import { ReceptionProvider } from "./reception";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { ApiClientV3Provider as ApiClientV3ProviderMock } from "../api-client/api-client.v3.mock";
import { DataRequest, Model } from "../../models/models";
import { Enums } from "../../enums/enums";
import { UnitTesting } from "../../common/common.unit";

describe("ReceptionProvider", () => {
    let provider: ReceptionProvider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    ReceptionProvider,
                    {
                        provide: ApiClientV3Provider,
                        useClass: ApiClientV3ProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(ReceptionProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof ReceptionProvider).toBe(true);
    });

    it("Should get reception task", () => {
        let execute = async () => {
            try {
                let request: DataRequest.Reception = <DataRequest.Reception>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";
                request.regime = Enums.Regime.General;
                request.taskAssignedTo = "ACAMACHO";
                request.serialNumber = 507295;

                let result: Model.ReceptionTaskHeader = await provider.getReceptionTaskHeader(
                    request
                );
                return expect(result).toBeDefined("Result must return a value");
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should complete task", () => {
        let execute = async () => {
            try {
                let request: DataRequest.Reception = <DataRequest.Reception>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.transType = Enums.TransType.GeneralReception;
                request.login = "ACAMACHO";
                request.policyCode = "252780";
                request.taskId = 295037;
                request.status = "ACCEPTED";

                let result: Model.Operation = await provider.completeTask(
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

    it("Should validate barcode for the reception's license", () => {
        let execute = async () => {
            try {
                let request: DataRequest.GetScannedMaterialByLicenseInReceptionTask = <DataRequest.GetScannedMaterialByLicenseInReceptionTask>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.barcode = "VISCOSA/VCA1030";
                request.clientOwner = "viscosa";
                request.licenseId = 11255;
                request.taskId = 295037;

                let result: Model.Operation = await provider.validateBarcodeForLicense(
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

    it("Should get the material for the reception task", () => {
        let execute = async () => {
            try {
                let request: DataRequest.GetScannedMaterialByLicenseInReceptionTask = <DataRequest.GetScannedMaterialByLicenseInReceptionTask>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.barcode = "autovanguard/VAA1001";
                request.clientOwner = "autovanguard";
                request.licenseId = 397930;
                request.taskId = 476464;

                let result: Model.Material = await provider.getScannedMaterialByLicenseInReceptionTask(
                    request
                );
                expect(result).toBeDefined("Result must return a value");
                return expect(result.barcodeId).toBe(
                    request.barcode,
                    "Result's barcode should be the same as the one sent on the request"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should add material to license", () => {
        let execute = async () => {
            try {
                let request: DataRequest.AddMaterialToLicense = <DataRequest.AddMaterialToLicense>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.licenseId = 12346;
                request.barcode = "viscosa/VCA1030";
                request.qty = 100;
                request.lastLogin = "ACAMACHO";
                request.volumeFactor = 100;
                request.weight = 10;
                request.comments = "";
                request.serial = "485485A5218";
                request.tradeAgreementId = "2020";
                request.totalMaterials = 100;
                request.status = "OK";
                request.result = "OK";
                request.dateExpiration = new Date();
                request.batch = "548921";
                request.vin = "3FA6P0HR8DR221477";
                request.paramName = "DEFAULT";
                request.action = Enums.ReceptionAction.Add;
                request.tone = "";
                request.caliber = "";

                let result: Model.Operation = await provider.addMaterialToLicense(
                    request
                );
                expect(result).toBeDefined("Result must return a value");
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must be successful"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should validate material in reception license", () => {
        let execute = async () => {
            try {
                let request: DataRequest.ValidateStatusInMaterialsLicense = <DataRequest.ValidateStatusInMaterialsLicense>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.licenseId = 12346;

                let result: Model.Operation = await provider.validateStatusInMaterialsLicense(
                    request
                );
                expect(result).toBeDefined("Result must return a value");
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must be successful"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should rollback the license", () => {
        let execute = async () => {
            try {
                let request: DataRequest.RollBackLicense = <DataRequest.RollBackLicense>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.licenseId = 12346;

                let result: Model.Operation = await provider.rollbackLicense(
                    request
                );
                expect(result).toBeDefined("Result must return a value");
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must be successful"
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });

    it("Should insert material by serial number", () => {
        let execute = async () => {
            try {
                let request: DataRequest.InsertMaterialBySerialNumber = <DataRequest.InsertMaterialBySerialNumber>UnitTesting.getTestCredentials();

                request.dbUser = "alsersa";
                request.dbPassword = "alsersaServer1237710";

                request.licenseId = 12346;
                request.materialId = "arium/100003";
                request.serial = "123456";

                let result: Model.Operation = await provider.insertMaterialBySerialNumber(
                    request
                );
                expect(result).toBeDefined("Result must return a value");
                return expect(result.Resultado).toBe(
                    Enums.OperationResult.Success,
                    "Result must be successful."
                );
            } catch (reason) {
                fail(reason);
            }
        };

        return execute();
    });
});
