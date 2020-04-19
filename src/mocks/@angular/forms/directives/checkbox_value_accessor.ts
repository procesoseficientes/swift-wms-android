import { ElementRef, Renderer2 } from "@angular/core";
import { ControlValueAccessor } from "./control_value_accessor";

export class CHECKBOX_VALUE_ACCESSOR {}

export class CheckboxControlValueAccessor {
    _renderer: any;
    _elementRef: any;
    onChange: (_: any) => void;
    onTouched: () => void;

    writeValue(_value: any): any /* void */
    {}
    registerOnChange(_fn: (_: any) => {}): any /* void */
    {}
    registerOnTouched(_fn: () => {}): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
}
