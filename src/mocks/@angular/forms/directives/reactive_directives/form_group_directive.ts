import { EventEmitter, OnChanges, SimpleChanges } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "../../model";
import { ControlContainer } from "../control_container";
import { Form } from "../form_interface";
import { FormControlName } from "./form_control_name";
import { FormArrayName, FormGroupName } from "./form_group_name";

export class formDirectiveProvider {}

export class FormGroupDirective {
    _validators: any;
    _asyncValidators: any;
    submitted: boolean;
    _oldForm: any;
    directives: FormControlName[];
    form: FormGroup;
    ngSubmit: EventEmitter<{}>;
    formDirective: Form;
    control: FormGroup;
    path: string[];

    ngOnChanges(_changes: SimpleChanges): any /* void */
    {}
    addControl(_dir: FormControlName): any /* FormControl */
    {}
    getControl(_dir: FormControlName): any /* FormControl */
    {}
    removeControl(_dir: FormControlName): any /* void */
    {}
    addFormGroup(_dir: FormGroupName): any /* void */
    {}
    removeFormGroup(_dir: FormGroupName): any /* void */
    {}
    getFormGroup(_dir: FormGroupName): any /* FormGroup */
    {}
    addFormArray(_dir: FormArrayName): any /* void */
    {}
    removeFormArray(_dir: FormArrayName): any /* void */
    {}
    getFormArray(_dir: FormArrayName): any /* FormArray */
    {}
    updateModel(_dir: FormControlName, _value: any): any /* void */
    {}
    onSubmit(_$event: Event): any /* boolean */
    {}
    onReset(): any /* void */
    {}
    resetForm(_value: any): any /* void */
    {}
    _updateRegistrations(): any /*  */
    {}
    _updateValidators(): any /*  */
    {}
    _checkFormPresent(): any /*  */
    {}
}
