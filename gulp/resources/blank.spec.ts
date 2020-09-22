import { async, TestBed } from "@angular/core/testing";
//--import { /*! ProviderName */ } from "/*! ProviderModule */";

describe("/*! ProviderName */", () => {
    //--let provider: /*! ProviderName */;

    beforeEach(
        async(() => {
            /*! TODO: Add ionic-mocks if necessary */

            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    /*! ProviderName */,
                    /*! TODO: Configure your mocks*/
                ]
            });
        })
    );

    beforeEach(() => {
        //--provider = TestBed.get(/*! ProviderName */);
    });

    it("Should be created", () => {
        //--expect(provider instanceof /*! ProviderName */).toBe(true);
    });

    it("Empty test", () => {
        /*! TODO: Writer your tests */
        let execute = async () => {
            try {
                return expect(true).toBe(true, "Write your custom test");
            } catch (reason) { console.log(reason)
                fail(reason);
            }
        };

        return execute();
    });
});
