import { E2E } from "./common.e2e";
import { Page } from "./app.po";
import { Enums } from "../src/enums/enums";

describe("Workspace", () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
    });

    describe("Workspace", () => {
        beforeEach(() => {
            page.navigateTo("/#/start-session");
        });

        it("User should show status icon wireless", () => {
            let execute = async (self: Page) => {
                self.wait();
                await E2E.loginUser(self);

                let currentUrl = await self.getCurrentUrl();
                expect(currentUrl).toBe(
                    Enums.PagePath.VerifyEnviroment,
                    "The wireless button should be in this page"
                );

                await E2E.clickButton(self, "checkWireless");
                let statusWireless = self.getControlById("statusWireless");
                let text = await statusWireless.getAttribute(
                    "ng-reflect-color"
                );
                expect(text).toBe(
                    "danger",
                    "The wireless button status should be disconnected in this page"
                );

                text = await statusWireless.getAttribute("ng-reflect-name");
                return expect(text).toBe(
                    "close-circle",
                    "The wireless button status should be disconnected in this page"
                );
            };

            return execute(page);
        });

        it("User should show status icon bluetooth", () => {
            let execute = async (self: Page) => {
                self.wait();
                await E2E.loginUser(self);

                let currentUrl = await self.getCurrentUrl();
                expect(currentUrl).toBe(
                    Enums.PagePath.VerifyEnviroment,
                    "The wireless button should be in this page"
                );

                await E2E.clickButton(self, "checkBluetooth");
                let statusBluetooth = self.getControlById("statusBluetooth");
                let text = await statusBluetooth.getAttribute("ng-reflect-color");
                expect(text).toBe(
                    "danger",
                    "The bluetooth button status should be disconnected in this page"
                );

                text = await statusBluetooth.getAttribute("ng-reflect-name");
                return expect(text).toBe(
                    "close-circle",
                    "The bluetooth button status should be disconnected in this page"
                );
            };

            return execute(page);
        });

        it("User should show status icon battery", () => {
            let execute = async (self: Page) => {
                self.wait();
                await E2E.loginUser(self);

                let currentUrl = await self.getCurrentUrl();
                expect(currentUrl).toBe(
                    Enums.PagePath.VerifyEnviroment,
                    "The battery button should be in this page"
                );

                await E2E.clickButton(self, "checkBattery");
                let statusBattery = self.getControlById("statusBattery");
                let text = await statusBattery.getText();
                return expect(text).toBe(
                    "66",
                    "The battery button status should be disconnected in this page"
                );
            };

            return execute(page);
        });

        it("User should show last logged user", () => {
            let execute = async (self: Page) => {
                self.wait();
                await E2E.loginUser(self);

                let currentUrl = await self.getCurrentUrl();
                expect(currentUrl).toBe(
                    Enums.PagePath.VerifyEnviroment,
                    "The last logged must show in this page"
                );

                await E2E.clickButton(self, "lastLogged");
                let lastLogged = self.getControlById("lastUserLogged");
                let text: string = await lastLogged.getText();
                expect(text).toBe(E2E.loginId, "The last logged must show");
            };

            return execute(page);
        });

        it("User should open MyTasks tab", () => {
            let execute = async self => {
                self.wait();
                await E2E.goToWorkspace(self);

                let nextView = await self.getCurrentUrl();

                return expect(nextView).toBe(
                    Enums.PagePath.MyTasks,
                    "This user must go from Workspace page to MyTasks tab successfully"
                );
            };

            return execute(page);
        });

        it("User should navigate Workspace", () => {
            let execute = async self => {
                self.wait();
                await E2E.goToWorkspace(self);
                await E2E.goToMyTasks(self);
                await E2E.goToTaskSent(self);
                await E2E.goToInfoCenter(self);
                await E2E.goToMoreTransactions(self);
                return E2E.goToMyTasks(self);
            };

            return execute(page);
        });
    });
});
