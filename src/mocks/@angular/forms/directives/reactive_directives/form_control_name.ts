import {
    EventEmitter,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from "@angular/core";
import { FormControl } from "../../model";
import { ControlContainer } from "../control_container";
import { ControlValueAccessor } from "../control_value_accessor";
import { NgControl } from "../ng_control";
import {
    AsyncValidator,
    AsyncValidatorFn,
    Validator,
    ValidatorFn
} from "../validators";

export class controlNameBinding {}

export class FormControlName {
    _added: any;
    control: FormControl;
    name: string;
    model: any;
    update: EventEmitter<{}>;
    isDisabled: boolean;
    path: string[];
    formDirective: any;
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn;

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    ngOnDestroy(): any /* void */
    {}
    viewToModelUpdate(_newValue: any): any /* void */
    {}
    _checkParentType(): any /*  */
    {}
    _setUpControl(): any /*  */
    {}
}
