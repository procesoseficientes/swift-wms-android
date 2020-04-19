import {
    ElementRef,
    Injector,
    OnDestroy,
    OnInit,
    Renderer2
} from "@angular/core";
import { ControlValueAccessor } from "./control_value_accessor";
import { NgControl } from "./ng_control";

export class RADIO_VALUE_ACCESSOR {}

export class RadioControlRegistry {
    _accessors: any;

    add(
        _control: NgControl,
        _accessor: RadioControlValueAccessor
    ): any /* void */
    {}
    remove(_accessor: RadioControlValueAccessor): any /* void */
    {}
    select(_accessor: RadioControlValueAccessor): any /* void */
    {}
    _isSameGroup(_controlPair: any, _accessor: any): any /*  */
    {}
}

export class RadioControlValueAccessor {
    _renderer: any;
    _elementRef: any;
    _registry: any;
    _injector: any;
    onChange: () => void;
    onTouched: () => void;
    name: string;
    formControlName: string;
    value: any;

    ngOnInit(): any /* void */
    {}
    ngOnDestroy(): any /* void */
    {}
    writeValue(_value: any): any /* void */
    {}
    registerOnChange(_fn: (_: any) => {}): any /* void */
    {}
    fireUncheck(_value: any): any /* void */
    {}
    registerOnTouched(_fn: () => {}): any /* void */
    {}
    setDisabledState(_isDisabled: boolean): any /* void */
    {}
    _checkName(): any /*  */
    {}
    _throwNameError(): any /*  */
    {}
}
