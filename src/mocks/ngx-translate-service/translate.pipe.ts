import { EventEmitter, Pipe } from "@angular/core";
import {
    LangChangeEvent,
    TranslationChangeEvent,
    DefaultLangChangeEvent
} from "./translate.service";

@Pipe({
    name: "translate"
})
export class TranslatePipe {
    translate: any;
    _ref: any;
    value: string;
    lastKey: string;
    lastParams: any[];
    onTranslationChange: EventEmitter<TranslationChangeEvent>;
    onLangChange: EventEmitter<LangChangeEvent>;
    onDefaultLangChange: EventEmitter<DefaultLangChangeEvent>;
    updateValue(
        _key: string,
        _interpolateParams: Object,
        _translations: any
    ): any /* void */ {}
    transform(_query: string, _args: any[]): any /* any */ {}
    _dispose(): any /* void */ {}
    ngOnDestroy(): any /* void */ {}
}
