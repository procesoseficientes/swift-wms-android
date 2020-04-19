import { AsyncValidatorFn, ValidatorFn } from "./directives/validators";
import { FormArray, FormControl, FormGroup } from "./model";

export class FormBuilder {
    group(
        _controlsConfig: { [key: string]: any },
        _extra: { [key: string]: any } | null
    ): any /* FormGroup */ {}
    control(
        _formState: Object,
        _validator: ValidatorFn | ValidatorFn[] | null,
        _asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null
    ): any /* FormControl */ {}
    array(
        _controlsConfig: any[],
        _validator: ValidatorFn | null,
        _asyncValidator: AsyncValidatorFn | null
    ): any /* FormArray */ {}
}
