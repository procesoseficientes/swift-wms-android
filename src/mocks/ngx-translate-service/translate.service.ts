import { EventEmitter } from "@angular/core";
import { MissingTranslationHandler } from "./missing-translation-handler";
import { TranslateCompiler } from "./translate.compiler";
import { TranslateLoader } from "./translate.loader";
import { TranslateParser } from "./translate.parser";
import { TranslateStore } from "./translate.store";
import { Injectable } from "@angular/core";
export class USE_STORE {}

export class USE_DEFAULT_LANG {}

export class TranslationChangeEvent {
    translations: any;
    lang: string;
}

export class LangChangeEvent {
    lang: string;
    translations: any;
}

export class DefaultLangChangeEvent {
    lang: string;
    translations: any;
}
@Injectable()
export class TranslateService {
    store: TranslateStore;
    currentLoader: TranslateLoader;
    compiler: TranslateCompiler;
    parser: TranslateParser;
    missingTranslationHandler: MissingTranslationHandler;
    useDefaultLang: any;
    isolate: any;
    loadingTranslations: any;
    pending: any;
    _onTranslationChange: any;
    _onLangChange: any;
    _onDefaultLangChange: any;
    _defaultLang: any;
    _currentLang: any;
    _langs: any;
    _translations: any;
    _translationRequests: any;
    onTranslationChange: EventEmitter<TranslationChangeEvent>;
    onLangChange: EventEmitter<LangChangeEvent>;
    onDefaultLangChange: EventEmitter<DefaultLangChangeEvent>;
    defaultLang: string;
    currentLang: string;
    langs: string[];
    translations: any;

    setDefaultLang(_lang: string): any /* void */ {}
    getDefaultLang(): any /* string */ {}
    use(_lang: string): any /* Observable<any> */ {}
    retrieveTranslations(_lang: any): any /*  */ {}
    getTranslation(_lang: string): any /* Observable<any> */ {}
    setTranslation(
        _lang: string,
        _translations: Object,
        _shouldMerge: boolean
    ): any /* void */ {}
    getLangs(): any /* Array<string> */ {}
    addLangs(_langs: Array<string>): any /* void */ {}
    updateLangs(): any /*  */ {}
    getParsedResult(
        _translations: any,
        _key: any,
        _interpolateParams: Object
    ): any /* any */ {}
    get(
        _key: string | Array<string>,
        _interpolateParams: Object
    ): any /* Observable<string | any> */ {}
    stream(
        _key: string | Array<string>,
        _interpolateParams: Object
    ): any /* Observable<string | any> */ {}
    instant(
        _key: string | Array<string>,
        _interpolateParams: Object
    ): any /* string | any */ {}
    set(_key: string, _value: string, _lang: string): any /* void */ {}
    changeLang(_lang: any): any /*  */ {}
    changeDefaultLang(_lang: any): any /*  */ {}
    reloadLang(_lang: string): any /* Observable<any> */ {}
    resetLang(_lang: string): any /* void */ {}
    getBrowserLang(): any /* string */ {}
    getBrowserCultureLang(): any /* string */ {}
}
