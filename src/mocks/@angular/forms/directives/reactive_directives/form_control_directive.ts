import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { FormControl } from "../../model";
import { ControlValueAccessor } from "../control_value_accessor";
import { NgControl } from "../ng_control";
import {
    AsyncValidator,
    AsyncValidatorFn,
    Validator,
    ValidatorFn
} from "../validators";

export class formControlBinding {}

export class FormControlDirective {
    viewModel: any;
    form: FormControl;
    model: any;
    update: EventEmitter<{}>;
    isDisabled: boolean;
    path: string[];
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn | null;
    control: FormControl;

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    viewToModelUpdate(_newValue: any): any /* void */
    {}
    _isControlChanged(_changes: any): any /*  */
    {}
}
