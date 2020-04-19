import { AbstractControlDirective } from "./abstract_control_directive";
import { ControlValueAccessor } from "./control_value_accessor";
import { AsyncValidatorFn, ValidatorFn } from "./validators";

export class NgControl {
    name: string | null;
    valueAccessor: ControlValueAccessor | null;
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn | null;

    viewToModelUpdate(_newValue: any): any /* void */
    {}
}
