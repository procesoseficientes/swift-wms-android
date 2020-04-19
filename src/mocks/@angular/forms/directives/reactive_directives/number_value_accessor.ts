import { ElementRef, Renderer2 } from "@angular/core";
import { ControlValueAccessor } from "./control_value_accessor";

export class NUMBER_VALUE_ACCESSOR {}

export class NumberValueAccessor {
    _renderer: any;
    _elementRef: any;
    onChange: (_: any) => void;
    onTouched: () => void;

    writeValue(_value: number): any /* void */
    {}
    registerOnChange(_fn: (_: number | null) => void): any /* void */
    {}
    registerOnTouched(_fn: () => void): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
}
