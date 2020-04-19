import { E2E } from "./common.e2e";
import { Page } from "./app.po";
import { Enums } from "../src/enums/enums";

describe("Reception", () => {
    let page: Page;

    beforeEach(() => {
        page = new Page();
    });

    describe("My Tasks", () => {
        beforeEach(() => {
            page.navigateTo("/#/start-session");
        });

        it("User should open a Reception Task", () => {
            let execute = async self => {

                let nextView = await self.getCurrentUrl();

                return expect(nextView).toBe(
                    Enums.PagePath.CreateLicense,
                    "This user must go from My Tasks tab page to Create License page successfully"
                );
            };

            return execute(page);
        });
    });

    describe("Create License", () => {
        beforeEach(() => {
            page.navigateTo("/#/start-session");
        });

        it("User should create a license and land in General Reception Page", () => {
            let execute = async self => {
                await E2E.goToGeneralReceptionPageAfterCreatingALicense(self);

                let nextView = await self.getCurrentUrl();

                return expect(nextView).toBe(
                    "http://localhost:8100/#/workspace/my-tasks/general-reception",
                    "The user must go from CreateLicense page to GeneralReception page successfully"
                );
            };

            return execute(page);
        });

        it("User should go back to My Task Page", () => {
            let execute = async self => {
                await E2E.goBackToMyTasksFromCreateLicense(self);

                let nextView = await self.getCurrentUrl();

                return expect(nextView).toBe(
                    "http://localhost:8100/#/workspace/my-tasks/my-tasks",
                    "The user must go back from CreateLicense page to MyTasks page successfully"
                );
            };

            return execute(page);
        });
    });
});
