import { Observable } from "rxjs/Observable";
import {
    AsyncValidatorFn,
    ValidationErrors,
    ValidatorFn
} from "./directives/validators";

export class VALID {}

export class INVALID {}

export class PENDING {}

export class DISABLED {}

export class FormHooks {}

export class AbstractControlOptions {
    validators: ValidatorFn | ValidatorFn[] | null;
    asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null;
    updateOn: FormHooks;
}

export class AbstractControl {
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn | null;
    _parent: any;
    _asyncValidationSubscription: any;
    value: any;
    parent: FormGroup | FormArray;
    status: string;
    valid: boolean;
    invalid: boolean;
    pending: boolean;
    disabled: boolean;
    enabled: boolean;
    errors: ValidationErrors | null;
    pristine: boolean;
    dirty: boolean;
    touched: boolean;
    untouched: boolean;
    valueChanges: Observable<any>;
    statusChanges: Observable<any>;
    updateOn: FormHooks;
    root: AbstractControl;

    setValidators(
        _newValidator: ValidatorFn | ValidatorFn[] | null
    ): any /* void */
    {}
    setAsyncValidators(
        _newValidator: AsyncValidatorFn | AsyncValidatorFn[]
    ): any /* void */
    {}
    clearValidators(): any /* void */
    {}
    clearAsyncValidators(): any /* void */
    {}
    markAsTouched(_opts: { onlySelf?: boolean }): any /* void */
    {}
    markAsUntouched(_opts: { onlySelf?: boolean }): any /* void */
    {}
    markAsDirty(_opts: { onlySelf?: boolean }): any /* void */
    {}
    markAsPristine(_opts: { onlySelf?: boolean }): any /* void */
    {}
    markAsPending(_opts: { onlySelf?: boolean }): any /* void */
    {}
    disable(_opts: { onlySelf?: boolean, emitEvent?: boolean }): any /* void */
    {}
    enable(_opts: { onlySelf?: boolean, emitEvent?: boolean }): any /* void */
    {}
    _updateAncestors(_onlySelf: any): any /*  */
    {}
    setParent(_parent: FormGroup | FormArray): any /* void */
    {}
    setValue(_value: any, _options: Object): any /* void */
    {}
    patchValue(_value: any, _options: Object): any /* void */
    {}
    reset(_value: any, _options: Object): any /* void */
    {}
    updateValueAndValidity(
        _opts: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    _setInitialStatus(): any /*  */
    {}
    _runValidator(): any /*  */
    {}
    _runAsyncValidator(_emitEvent: any): any /*  */
    {}
    _cancelExistingSubscription(): any /*  */
    {}
    setErrors(
        _errors: ValidationErrors | null,
        _opts: { emitEvent?: boolean }
    ): any /* void */
    {}
    get(
        _path: Array<string | number> | string
    ): any /* AbstractControl | null */
    {}
    getError(_errorCode: string, _path: string[]): any /* any */
    {}
    hasError(_errorCode: string, _path: string[]): any /* boolean */
    {}
    _calculateStatus(): any /*  */
    {}
}

export class FormControl {
    setValue(
        _value: any,
        _options: {
            onlySelf?: boolean,
            emitEvent?: boolean,
            emitModelToViewChange?: boolean,
            emitViewToModelChange?: boolean
        }
    ): any /* void */
    {}
    patchValue(
        _value: any,
        _options: {
            onlySelf?: boolean,
            emitEvent?: boolean,
            emitModelToViewChange?: boolean,
            emitViewToModelChange?: boolean
        }
    ): any /* void */
    {}
    reset(
        _formState: any,
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    registerOnChange(_fn: Function): any /* void */
    {}
    registerOnDisabledChange(_fn: (isDisabled: boolean) => void): any /* void */
    {}
    _applyFormState(_formState: any): any /*  */
    {}
}

export class FormGroup {
    controls: { [key: string]: AbstractControl };

    registerControl(
        _name: string,
        _control: AbstractControl
    ): any /* AbstractControl */
    {}
    addControl(_name: string, _control: AbstractControl): any /* void */
    {}
    removeControl(_name: string): any /* void */
    {}
    setControl(_name: string, _control: AbstractControl): any /* void */
    {}
    contains(_controlName: string): any /* boolean */
    {}
    setValue(
        _value: { [key: string]: any },
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    patchValue(
        _value: { [key: string]: any },
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    reset(
        _value: any,
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    getRawValue(): any /* any */
    {}
}

export class FormArray {
    controls: AbstractControl[];
    length: number;

    at(_index: number): any /* AbstractControl */
    {}
    push(_control: AbstractControl): any /* void */
    {}
    insert(_index: number, _control: AbstractControl): any /* void */
    {}
    removeAt(_index: number): any /* void */
    {}
    setControl(_index: number, _control: AbstractControl): any /* void */
    {}
    setValue(
        _value: any[],
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    patchValue(
        _value: any[],
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    reset(
        _value: any,
        _options: { onlySelf?: boolean, emitEvent?: boolean }
    ): any /* void */
    {}
    getRawValue(): any /* any[] */
    {}
    _registerControl(_control: any): any /*  */
    {}
}
