import {
    EventEmitter,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from "@angular/core";
import { FormControl, FormHooks } from "../model";
import { ControlContainer } from "./control_container";
import { ControlValueAccessor } from "./control_value_accessor";
import { NgControl } from "./ng_control";
import {
    AsyncValidator,
    AsyncValidatorFn,
    Validator,
    ValidatorFn
} from "./validators";

export class formControlBinding {}

export class NgModel {
    control: FormControl;
    viewModel: any;
    name: string;
    isDisabled: boolean;
    model: any;
    options: { name?: string, standalone?: boolean, updateOn?: FormHooks };
    update: EventEmitter<{}>;
    path: string[];
    formDirective: any;
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn | null;

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    ngOnDestroy(): any /* void */
    {}
    viewToModelUpdate(_newValue: any): any /* void */
    {}
    _setUpControl(): any /*  */
    {}
    _setUpdateStrategy(): any /*  */
    {}
    _isStandalone(): any /*  */
    {}
    _setUpStandalone(): any /*  */
    {}
    _checkForErrors(): any /*  */
    {}
    _checkParentType(): any /*  */
    {}
    _checkName(): any /*  */
    {}
    _updateValue(_value: any): any /*  */
    {}
    _updateDisabled(_changes: any): any /*  */
    {}
}
