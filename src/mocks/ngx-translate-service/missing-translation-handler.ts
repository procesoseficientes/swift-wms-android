import { TranslateService } from "./translate.service";

export class MissingTranslationHandlerParams {
    key: string;
    translateService: TranslateService;
    interpolateParams: Object;
}

export class MissingTranslationHandler {
    handle(_params: MissingTranslationHandlerParams): any /* any */
    {}
}

export class FakeMissingTranslationHandler {
    handle(_params: MissingTranslationHandlerParams): any /* string */
    {}
}
