import { async, TestBed } from "@angular/core/testing";
import { PrinterProvider } from "./printer";

describe("PrinterProvider", () => {
    let provider: PrinterProvider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    PrinterProvider
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(PrinterProvider);
    });
});
