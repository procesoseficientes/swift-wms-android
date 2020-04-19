import { OnDestroy, OnInit } from "@angular/core";
import { FormArray } from "../../model";
import { AbstractFormGroupDirective } from "../abstract_form_group_directive";
import { ControlContainer } from "../control_container";
import { AsyncValidatorFn, ValidatorFn } from "../validators";
import { FormGroupDirective } from "./form_group_directive";

export class formGroupNameProvider {}

export class FormGroupName {
    name: string;
}

export class formArrayNameProvider {}

export class FormArrayName {
    name: string;
    control: FormArray;
    formDirective: FormGroupDirective | null;
    path: string[];
    validator: ValidatorFn | null;
    asyncValidator: AsyncValidatorFn | null;

    ngOnInit(): any /* void */
    {}
    ngOnDestroy(): any /* void */
    {}
    _checkParentType(): any /*  */
    {}
}
