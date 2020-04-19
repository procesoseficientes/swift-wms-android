import { async, TestBed } from "@angular/core/testing";
import { RulesProvider } from "./rules";

describe("RulesProvider", () => {
    let provider: RulesProvider;

    beforeEach(
        async(() => {

            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    RulesProvider
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(RulesProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof RulesProvider).toBe(true);
    });
});
