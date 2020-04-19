import { Observable } from "rxjs/Observable";
import { AbstractControl } from "../model";
import { ValidationErrors } from "./validators";

export class AbstractControlDirective {
    control: AbstractControl | null;
    value: any;
    valid: boolean | null;
    invalid: boolean | null;
    pending: boolean | null;
    disabled: boolean | null;
    enabled: boolean | null;
    errors: ValidationErrors | null;
    pristine: boolean | null;
    dirty: boolean | null;
    touched: boolean | null;
    status: string | null;
    untouched: boolean | null;
    statusChanges: Observable<any> | null;
    valueChanges: Observable<any> | null;
    path: string[] | null;

    reset(_value: any): any /* void */
    {}
    hasError(_errorCode: string, _path: string[]): any /* boolean */
    {}
    getError(_errorCode: string, _path: string[]): any /* any */
    {}
}
