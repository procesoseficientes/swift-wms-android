import { Page } from "./app.po";
import { ElementFinder } from "protractor";
import { E2E } from "./common.e2e";
import { Enums } from "../src/enums/enums";

describe("Start Session", () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
    });

    describe("Home page", () => {
        beforeEach(() => {
            page.navigateTo("/#/start-session");
        });

        it("App should have a title saying Swift 3PL", () => {
            page.getTitle().then(title => {
                expect(title).toEqual("Swift 3PL");
            });
        });

        it("LoginId must be capitalized automatically", () => {
            let execute = async (self: Page) => {
                await E2E.writeLoginId(self);

                let loginFormInput = self.getControlById("loginId");
                let text = await loginFormInput.getAttribute("ng-reflect-model");
                return expect(text).toEqual(
                    E2E.loginId.toUpperCase(),
                    "Events must trigger an event to convert loginId to uppercase"
                );
            };

            return execute(page);
        });

        it("User should login successful", () => {
            let execute = async (self: Page) => {
                await E2E.loginUser(self);

                let nextView = await self.getCurrentUrl();

                //Assert successful login
                return expect(nextView).toBe(
                    Enums.PagePath.VerifyEnviroment,
                    "This user must login without problems and go to Workspace page"
                );
            };

            return execute(page);
        });

        it("User should store the last logged user", () => {
            let execute = async self => {
                self.navigateTo("/#/start-session");
                await self.sleep();

                //Assert username must be saved...
                let loginFormInput = self.getControlById("loginId");
                let text = await loginFormInput.getAttribute(
                    "ng-reflect-model"
                );
                return expect(text).toEqual(
                    E2E.loginId.toUpperCase(),
                    "Username must be saved in local storage"
                );
            };

            return execute(page);
        });
    });
});
