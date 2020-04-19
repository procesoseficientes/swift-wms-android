import {
    ElementRef,
    AfterViewChecked,
    OnDestroy,
    ChangeDetectorRef
} from "@angular/core";
import { Subscription } from "rxjs/Subscription";
import { TranslateService } from "./translate.service";

export class TranslateDirective {
    translateService: any;
    element: any;
    _ref: any;
    key: string;
    lastParams: any;
    currentParams: any;
    onLangChangeSub: Subscription;
    onDefaultLangChangeSub: Subscription;
    onTranslationChangeSub: Subscription;
    translate: string;
    translateParams: any;
    constructor(
        _translateService: TranslateService,
        _element: ElementRef,
        __ref: ChangeDetectorRef
    ) {}
    ngAfterViewChecked(): any /* void */
    {}
    checkNodes(_forceUpdate: boolean, _translations: any): any /* void */
    {}
    updateValue(_key: string, _node: any, _translations: any): any /* void */
    {}
    getContent(_node: any): any /* string */
    {}
    setContent(_node: any, _content: string): any /* void */
    {}
    ngOnDestroy(): any /* void */
    {}
}
