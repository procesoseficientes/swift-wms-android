import { InjectionToken } from "@angular/core";

export class ControlValueAccessor {
    writeValue(_obj: any): any /* void */
    {}
    registerOnChange(_fn: any): any /* void */
    {}
    registerOnTouched(_fn: any): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
}

export class NG_VALUE_ACCESSOR {}
