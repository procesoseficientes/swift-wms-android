import { Page } from "./app.po";
import { ElementArrayFinder } from "protractor";

export namespace E2E {
    export const loginId = "BCORADO@L3W";
    const password = "123";
    const quantityOfMaterialForReception: number = 5;

    export enum Material {
        "Normal" = "BCORADO/VWX1019",
        "Vin" = "BCORADO/MTR-CAR",
        "SerialNumber" = "BCORADO/MTR-SER",
        "ToneCaliberAndBatch" = "BCORADO/MTR-TON-CAL-LOT"
    }

    enum Sleep {
        Short = 4000,
        Normal = 5500,
        Long = 7000
    }

    export const writeLoginId = async (self: Page): Promise<void> => {
        self.wait();

        let loginIdInput = self.getControlByCss(
            "ion-input input[formcontrolname='loginId']"
        );
        await loginIdInput.clear();
        await loginIdInput.sendKeys(loginId);

        return Promise.resolve();
    };

    export const clickLoginButton = async (self: Page): Promise<void> => {
        let passwordButton = self.getControlById("inputPassword");
        await passwordButton.click();
        return self.sleep(Sleep.Short);
    };

    export const clickButton = async (
        self: Page,
        id: string
    ): Promise<void> => {
        let button = self.getControlById(id);
        await button.click();
        await self.sleep(Sleep.Short);
    };

    export const writeLoginPassword = async (self: Page): Promise<void> => {
        let alert = self.getControlById("alert-input-0-0");
        await alert.sendKeys(password);

        let button = self.getControlByCss("button.alert-button-ok");
        await button.click();
        await self.sleep(Sleep.Normal);

        return Promise.resolve();
    };

    export const loginUser = async (self: Page): Promise<void> => {
        await writeLoginId(self);
        await clickLoginButton(self);
        return writeLoginPassword(self);
    };

    export const goToWorkspace = async (self: Page): Promise<void> => {
        let button = self.getControlById("startSession");
        await button.click();
        await self.sleep(Sleep.Short);

        return Promise.resolve();
    };

    export const goToReceptionTask = async (self: Page): Promise<void> => {
        let button = self.getControlById("527412");
        await button.click();
        await self.sleep(Sleep.Short);

        return Promise.resolve();
    };

    export const goToMyTasks = async (self: Page): Promise<void> => {
        let tasks = await self.getControlById("tab-t0-0");
        await tasks.click();
        await verifyCurrentUrl(
            self,
            "/#/workspace/my-tasks/my-tasks",
            "This user must go from Enviroment page to My Tasks tab successfully"
        );
        await self.sleep(Sleep.Short);
        return Promise.resolve();
    };

    export const goToTaskSent = async (self: Page): Promise<void> => {
        let tasksSent = await self.getControlById("tab-t0-1");
        await tasksSent.click();
        await E2E.verifyCurrentUrl(
            self,
            "/#/workspace/task-sent/task-sent",
            "This user must go navigate page to My tasks sent tab successfully"
        );
        return Promise.resolve();
    };

    export const goToInfoCenter = async (self: Page): Promise<void> => {
        let infoCenter = await self.getControlById("tab-t0-2");
        await infoCenter.click();
        await E2E.verifyCurrentUrl(
            self,
            "/#/workspace/info-center/info-center",
            "This user must go navigate page to Info Center tab successfully"
        );
        return Promise.resolve();
    };

    export const goToMoreTransactions = async (self: Page): Promise<void> => {
        let infoCenter = await self.getControlById("tab-t0-3");
        await infoCenter.click();
        await E2E.verifyCurrentUrl(
            self,
            "/#/workspace/more-transactions/more-transactions",
            "This user must go navigate page to More Transactions tab successfully"
        );
        return Promise.resolve();
    };

    export const verifyCurrentUrl = async (
        self: Page,
        currentPage: string,
        specDescription: string
    ): Promise<boolean> => {
        await self.sleep(Sleep.Short);
        let currentView = await self.getCurrentUrl();
        return expect(currentView).toBe(
            `http://localhost:8100${currentPage}`,
            specDescription
        );
    };

    export const goToGeneralReceptionPageAfterCreatingALicense = async (self: Page): Promise<void> => {
        let execute = await goToReceptionTask(self);

        let button = self.getControlById("createLicense");
        await button.click();
        await self.sleep(Sleep.Short);

        return Promise.resolve();
    };

    export const goBackToMyTasksFromCreateLicense = async (
        self: Page
    ): Promise<void> => {
        let execute = await goToReceptionTask(self);

        let button = self.getControlById("backButton");
        await button.click();
        await self.sleep(Sleep.Short);

        return Promise.resolve();
    };

    export const scanBarcodeInGeneralReception = async (
        self: Page
    ): Promise<void> => {
        let execute = await goToGeneralReceptionPageAfterCreatingALicense(self);

        let button = self.getControlById("scanBarcode");
        await button.click();
        await self.sleep(Sleep.Short);

        return Promise.resolve();
    };

    export const getMaterialIdInGeneralReception = async (
        self: Page
    ): Promise<string> => {
        let control = self.getControlById("materialCode");
        let materialCode = await control.getText();
        await self.sleep(Sleep.Short);

        return Promise.resolve(materialCode);
    };

    export const verifyIfExistStatesOfMaterialsInGeneralReception = async (
        self: Page
    ): Promise<number> => {
        self.wait();

        let containerOfStatesOfMaterial = self.getControlsByParentClassAndChildType(
            "alert-radio-group",
            "button"
        );

        let quantityOfStatesOfMaterial = await containerOfStatesOfMaterial.count();

        await self.sleep(Sleep.Short);

        return Promise.resolve(quantityOfStatesOfMaterial);
    };

    export const addQuantityOfMaterialInGeneralReception = async (
        self: Page
    ): Promise<void> => {
        self.wait();

        let qtyMaterial = self.getControlByCss(
            "ion-input input[class='text-input text-input-md']"
        );
        await qtyMaterial.clear();
        await qtyMaterial.sendKeys(`${quantityOfMaterialForReception}\n`);
        await self.sleep(Sleep.Short);
        return Promise.resolve();
    };

    export const addQuantityToMaterialInLicenseDetailOfGeneralReception = async (
        self: Page
    ): Promise<string> => {
        await E2E.clickButton(self, "licenseDetail");
        await E2E.clickButton(self, "scanMaterial");
        await E2E.clickButton(self, "scanBarcode");
        await E2E.addQuantityOfMaterialInGeneralReception(self);
        await self.sleep(Sleep.Short);
        let userOptions = self.getControlsByParentClassAndChildType(
            "alert-button-group",
            "button"
        );
        await userOptions
            .filter((userOption, idx) => {
                return userOption.getText().then(text => {
                    return text === "ADD";
                });
            })
            .first()
            .click();
        await self.sleep(Sleep.Short);
        await E2E.clickButton(self, "licenseDetail");
        await E2E.clickButton(self, "scanMaterial");
        let materialCode = await E2E.getMaterialIdInGeneralReception(self);
        return Promise.resolve(materialCode);
    };

    export const updateQuantityToMaterialInLicenseDetailOfGeneralReception = async (
        self: Page
    ): Promise<string> => {
        await E2E.clickButton(self, "licenseDetail");
        await E2E.clickButton(self, "scanMaterial");
        await E2E.clickButton(self, "scanBarcode");
        await E2E.addQuantityOfMaterialInGeneralReception(self);
        await self.sleep(Sleep.Short);
        let userOptions = self.getControlsByParentClassAndChildType(
            "alert-button-group",
            "button"
        );
        await userOptions
            .filter((userOption, idx) => {
                return userOption.getText().then(text => {
                    return text === "UPDATE";
                });
            })
            .first()
            .click();

        await self.sleep(Sleep.Short);
        await E2E.clickButton(self, "licenseDetail");
        await E2E.clickButton(self, "scanMaterial");
        let materialCode = await E2E.getMaterialIdInGeneralReception(self);
        return Promise.resolve(materialCode);
    };

    export const openPrintOptionsInGeneralReception = async (
        self: Page
    ): Promise<Number> => {
        self.wait();
        await E2E.clickButton(self, "showPrint");
        await self.sleep(Sleep.Long);
        let qtyMaterial = self.getControlsByParentClassAndChildType(
            "alert-button-group.alert-button-group-vertical",
            "button"
        );
        let quantityOfPrintOptions = await qtyMaterial.count();
        return Promise.resolve(quantityOfPrintOptions);
    };

    export const goBackToCreateLicenseFromGeneralReception = async (
        self: Page
    ): Promise<void> => {
        self.wait();
        await E2E.clickButton(self, "backAction");
        await self.sleep(Sleep.Long);
        let rollbackOptions = self.getControlsByParentClassAndChildType(
            "alert-button-group",
            "button"
        );
        await rollbackOptions
            .filter((userOption, idx) => {
                return userOption.getText().then(text => {
                    return text == "YES" || text == "SÍ";
                });
            })
            .first()
            .click();
        await self.sleep(Sleep.Short);
        return Promise.resolve();
    };

    //FIXME: please remove this functionality when found a solution for change value of properties in E2E tests
    export const scanBarcodeDummyForGeneralReception = async (
        self: Page,
        materialType: string
    ) => {
        self.wait();
        await self.saveValueInLocalStorage("materialId", materialType);

        let control = self.getControlById("scanBarcode");
        await E2E.clickButton(self, "scanBarcode");

        await self.sleep(Sleep.Short);
        return Promise.resolve();
    };
}
