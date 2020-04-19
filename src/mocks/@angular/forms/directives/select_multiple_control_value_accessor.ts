import {
    ElementRef,
    OnDestroy,
    Renderer2,
    StaticProvider
} from "@angular/core";
import { ControlValueAccessor } from "./control_value_accessor";

export class SELECT_MULTIPLE_VALUE_ACCESSOR {}

export class SelectMultipleControlValueAccessor {
    _renderer: any;
    _elementRef: any;
    value: any;
    onChange: (_: any) => void;
    onTouched: () => void;
    compareWith: (o1: any, o2: any) => boolean;
    _compareWith: any;

    writeValue(_value: any): any /* void */
    {}
    registerOnChange(_fn: (value: any) => any): any /* void */
    {}
    registerOnTouched(_fn: () => any): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
}

export class NgSelectMultipleOption {
    _element: any;
    _renderer: any;
    _select: any;
    id: string;
    ngValue: any;
    value: any;

    ngOnDestroy(): any /* void */
    {}
}
