import { ElementRef, InjectionToken, Renderer2 } from "@angular/core";
import { ControlValueAccessor } from "./control_value_accessor";

export class DEFAULT_VALUE_ACCESSOR {}

export class COMPOSITION_BUFFER_MODE {}

export class DefaultValueAccessor {
    _renderer: any;
    _elementRef: any;
    _compositionMode: any;
    onChange: (_: any) => void;
    onTouched: () => void;
    _composing: any;

    writeValue(_value: any): any /* void */
    {}
    registerOnChange(_fn: (_: any) => void): any /* void */
    {}
    registerOnTouched(_fn: () => void): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
}
