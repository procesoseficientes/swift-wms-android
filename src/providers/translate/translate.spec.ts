import { async, TestBed } from "@angular/core/testing";
import { TranslateProvider } from "./translate";
import { TranslateService } from "@ngx-translate/core";
import { TranslateService as TranslateServiceMock } from "../../mocks/ngx-translate-service/translate.service";

describe("TranslateProvider", () => {
    let provider: TranslateProvider;

    beforeEach(
        async(() => {
            /*! TODO: Add ionic-mocks if necessary */

            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    TranslateProvider,
                    {
                        provide: TranslateService,
                        useClass: TranslateServiceMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(TranslateProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof TranslateProvider).toBe(true);
    });
});
