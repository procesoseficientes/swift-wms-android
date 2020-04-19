import { E2E } from "./common.e2e";
import { Page } from "./app.po";

describe("General Reception", () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
    });

    describe("Basic Operations", () => {
        beforeEach(() => {
            page.navigateTo("/#/start-session");
        });

        it("User should see the MATERIAL 'BCORADO/VWX1019'", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);
                let materialCode = await E2E.getMaterialIdInGeneralReception(
                    self
                );

                return expect(materialCode).toEqual(
                    "BCORADO/VWX1019",
                    "User must see the material 'BCORADO/VWX1019' on the screen"
                );
            };

            return execute(page);
        });

        it("User should see the list of STATES of materials", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);
                await E2E.clickButton(self, "materialStatus");

                let quantityOfStatesOfMaterial = await E2E.verifyIfExistStatesOfMaterialsInGeneralReception(
                    self
                );

                return expect(quantityOfStatesOfMaterial).toBeGreaterThan(
                    0,
                    "User must must have STATES of materials"
                );
            };

            return execute(page);
        });

        it("User should be able to INSERT quantity of material scanned", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);

                await E2E.addQuantityOfMaterialInGeneralReception(self);

                let materialCode = await E2E.getMaterialIdInGeneralReception(
                    self
                );

                return expect(materialCode).toEqual(
                    "",
                    "User must be able to INSERT quantity of material scanned"
                );
            };

            return execute(page);
        });

        it("User should be able to ADD quantity to material in license detail", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);
                await E2E.addQuantityOfMaterialInGeneralReception(self);
                let materialCode = await E2E.addQuantityToMaterialInLicenseDetailOfGeneralReception(
                    self
                );
                return expect(materialCode).toEqual(
                    "",
                    "User must be able to ADD quantity to material in license detail"
                );
            };

            return execute(page);
        });

        it("User should be able to UPDATE quantity to material in license detail", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);
                await E2E.addQuantityOfMaterialInGeneralReception(self);

                let materialCode = await E2E.updateQuantityToMaterialInLicenseDetailOfGeneralReception(
                    self
                );

                return expect(materialCode).toEqual(
                    "",
                    "User must be able to UPDATE quantity to material in license detail"
                );
            };

            return execute(page);
        });

        it("User should be able to OPEN print options", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);

                let printOptions = await E2E.openPrintOptionsInGeneralReception(
                    self
                );

                return expect(printOptions).toEqual(
                    4,
                    "User must have the options: PRINT LICENSE, PRINT LABEL, PRINT STATE and CANCEL"
                );
            };

            return execute(page);
        });

        it("User should go BACK from GeneralReceptionPage to CreateLicensePage", () => {
            let execute = async self => {
                await E2E.scanBarcodeInGeneralReception(self);

                await E2E.goBackToCreateLicenseFromGeneralReception(self);

                let currenUrl = await self.getCurrentUrl();

                return expect(currenUrl).toEqual(
                    "http://localhost:8100/#/workspace/my-tasks/create-license",
                    "User must go from GeneralReceptionPage to CreateLicensePage successfully"
                );
            };

            return execute(page);
        });
    });

    describe("VIN Operations", () => {
        beforeEach(() => {
            page.navigateTo("/#/start-session");
        });

        it("User should see the MATERIAL 'BCORADO/MTR-CAR'", () => {
            let execute = async self => {
                await E2E.goToGeneralReceptionPageAfterCreatingALicense(self);
                await E2E.scanBarcodeDummyForGeneralReception(
                    self,
                    E2E.Material.Vin
                );
                let materialCode = await E2E.getMaterialIdInGeneralReception(
                    self
                );

                return expect(materialCode).toEqual(
                    "BCORADO/MTR-CAR",
                    "User must see the material 'BCORADO/MTR-CAR' on the screen"
                );
            };

            return execute(page);
        });
    });
});
