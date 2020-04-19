import { ElementRef, Renderer2, StaticProvider } from "@angular/core";
import { ControlValueAccessor } from "./control_value_accessor";

export class RANGE_VALUE_ACCESSOR {}

export class RangeValueAccessor {
    _renderer: any;
    _elementRef: any;
    onChange: (_: any) => void;
    onTouched: () => void;

    writeValue(_value: any): any /* void */
    {}
    registerOnChange(_fn: (_: number | null) => void): any /* void */
    {}
    registerOnTouched(_fn: () => void): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
}
