import { OnDestroy, OnInit } from "@angular/core";
import { FormGroup } from "../model";
import { ControlContainer } from "./control_container";
import { Form } from "./form_interface";
import { AsyncValidatorFn, ValidatorFn } from "./validators";

export class AbstractFormGroupDirective {
    control: FormGroup;
    path: string[];
    formDirective: Form | null;
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn | null;

    ngOnInit(): any /* void */
    {}
    ngOnDestroy(): any /* void */
    {}
}
