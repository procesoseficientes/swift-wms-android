import { async, TestBed } from "@angular/core/testing";
import { UserInteractionProvider } from "./user-interaction";
import { TranslateService } from "@ngx-translate/core";
import { TranslateService as TranslateServiceMock } from "../../mocks/ngx-translate-service/translate.service";
import {
    LoadingControllerMock,
    AlertControllerMock,
    ToastControllerMock
} from "ionic-mocks";
import {
    LoadingController,
    AlertController,
    ToastController
} from "ionic-angular";
import { TranslateProvider } from "../translate/translate";
import { TranslateProvider as TranslateProviderMock } from "../translate/translate.mock";

describe("UserInteractionProvider", () => {
    let provider: UserInteractionProvider;

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    {
                        provide: TranslateProvider,
                        useClass: TranslateProviderMock
                    },
                    {
                        provide: TranslateService,
                        useClass: TranslateServiceMock
                    },
                    {
                        provide: LoadingController,
                        useClass: LoadingControllerMock
                    },
                    { provide: ToastController, useClass: ToastControllerMock },
                    { provide: AlertController, useClass: AlertControllerMock },
                    UserInteractionProvider
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(UserInteractionProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof UserInteractionProvider).toBe(true);
    });
});
