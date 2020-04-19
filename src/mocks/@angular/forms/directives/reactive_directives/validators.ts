import { OnChanges, SimpleChanges, StaticProvider } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { AbstractControl } from "../model";

export class ValidationErrors {}

export class Validator {
    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    registerOnValidatorChange(_fn: () => void): any /* void */
    {}
}

export class AsyncValidator {
    validate(
        _c: AbstractControl
    ): any /* Promise<ValidationErrors | null> | Observable<ValidationErrors | null> */
    {}
}

export class REQUIRED_VALIDATOR {}

export class CHECKBOX_REQUIRED_VALIDATOR {}

export class RequiredValidator {
    _required: any;
    _onChange: any;
    required: boolean | string;

    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    registerOnValidatorChange(_fn: () => void): any /* void */
    {}
}

export class CheckboxRequiredValidator {
    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
}

export class EMAIL_VALIDATOR {}

export class EmailValidator {
    _enabled: any;
    _onChange: any;
    email: boolean | string;

    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    registerOnValidatorChange(_fn: () => void): any /* void */
    {}
}

export class ValidatorFn {}

export class AsyncValidatorFn {}

export class MIN_LENGTH_VALIDATOR {}

export class MinLengthValidator {
    _validator: any;
    _onChange: any;
    minlength: string;

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    registerOnValidatorChange(_fn: () => void): any /* void */
    {}
    _createValidator(): any /*  */
    {}
}

export class MAX_LENGTH_VALIDATOR {}

export class MaxLengthValidator {
    _validator: any;
    _onChange: any;
    maxlength: string;

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    registerOnValidatorChange(_fn: () => void): any /* void */
    {}
    _createValidator(): any /*  */
    {}
}

export class PATTERN_VALIDATOR {}

export class PatternValidator {
    _validator: any;
    _onChange: any;
    pattern: string | RegExp;

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    validate(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    registerOnValidatorChange(_fn: () => void): any /* void */
    {}
    _createValidator(): any /*  */
    {}
}
