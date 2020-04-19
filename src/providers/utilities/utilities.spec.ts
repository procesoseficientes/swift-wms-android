import { async, TestBed } from "@angular/core/testing";
import { UtilitiesProvider } from "./utilities";

describe("UtilitiesProvider", () => {
    let provider: UtilitiesProvider;

    beforeEach(
        async(() => {

            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    UtilitiesProvider
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(UtilitiesProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof UtilitiesProvider).toBe(true);
    });
});
