import { InjectionToken } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
    AsyncValidatorFn,
    ValidationErrors,
    Validator,
    ValidatorFn
} from "./directives/validators";
import { AbstractControl } from "./model";

export class NG_VALIDATORS {}

export class NG_ASYNC_VALIDATORS {}

export class Validators {
    min(_min: number): any /* ValidatorFn */
    {}
    max(_max: number): any /* ValidatorFn */
    {}
    required(_control: AbstractControl): any /* ValidationErrors | null */
    {}
    requiredTrue(_control: AbstractControl): any /* ValidationErrors | null */
    {}
    email(_control: AbstractControl): any /* ValidationErrors | null */
    {}
    minLength(_minLength: number): any /* ValidatorFn */
    {}
    maxLength(_maxLength: number): any /* ValidatorFn */
    {}
    pattern(_pattern: string | RegExp): any /* ValidatorFn */
    {}
    nullValidator(_c: AbstractControl): any /* ValidationErrors | null */
    {}
    compose(_validators: null): any /* null */
    {}
    compose(
        _validators: ValidatorFn | null | undefined[]
    ): any /* ValidatorFn | null */
    {}
    composeAsync(
        _validators: AsyncValidatorFn | null[]
    ): any /* AsyncValidatorFn | null */
    {}
}

export class toObservable {}
