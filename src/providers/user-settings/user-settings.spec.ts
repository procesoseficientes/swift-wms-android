import { async, TestBed } from "@angular/core/testing";
import { UserSettingsProvider } from "./user-settings";

describe("UserSettingsProvider", () => {
    let provider: UserSettingsProvider;

    beforeEach(
        async(() => {
            let settings: UserSettingsProvider = UserSettingsProvider.getInstance();

            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    {
                        provide: UserSettingsProvider,
                        useValue: settings
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(UserSettingsProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof UserSettingsProvider).toBe(true);
    });
});
