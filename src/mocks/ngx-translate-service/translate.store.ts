import { EventEmitter } from "@angular/core";
import {
    DefaultLangChangeEvent,
    LangChangeEvent,
    TranslationChangeEvent
} from "./translate.service";

export class TranslateStore {
    defaultLang: string;
    currentLang: string;
    translations: any;
    langs: Array<string>;
    onTranslationChange: EventEmitter<TranslationChangeEvent>;
    onLangChange: EventEmitter<LangChangeEvent>;
    onDefaultLangChange: EventEmitter<DefaultLangChangeEvent>;
}
