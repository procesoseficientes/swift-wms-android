import { async, TestBed } from "@angular/core/testing";
import { FinancialProvider } from "./financial";

describe("FinancialProvider", () => {
    let provider: FinancialProvider;

    beforeEach(
        async(() => {
            /*! TODO: Add ionic-mocks if necessary */

            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    FinancialProvider
                    /*! TODO: Configure your mocks*/
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(FinancialProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof FinancialProvider).toBe(true);
    });
});
