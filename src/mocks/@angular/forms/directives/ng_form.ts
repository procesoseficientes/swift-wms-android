import { AfterViewInit, EventEmitter } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, FormHooks } from "../model";
import { ControlContainer } from "./control_container";
import { Form } from "./form_interface";
import { NgControl } from "./ng_control";
import { NgModel } from "./ng_model";
import { NgModelGroup } from "./ng_model_group";

export class formDirectiveProvider {}

export class NgForm {
    submitted: boolean;
    _directives: any;
    form: FormGroup;
    ngSubmit: EventEmitter<{}>;
    options: { updateOn?: FormHooks };
    formDirective: Form;
    control: FormGroup;
    path: string[];
    controls: { [key: string]: AbstractControl };

    ngAfterViewInit(): any /* void */
    {}
    addControl(_dir: NgModel): any /* void */
    {}
    getControl(_dir: NgModel): any /* FormControl */
    {}
    removeControl(_dir: NgModel): any /* void */
    {}
    addFormGroup(_dir: NgModelGroup): any /* void */
    {}
    removeFormGroup(_dir: NgModelGroup): any /* void */
    {}
    getFormGroup(_dir: NgModelGroup): any /* FormGroup */
    {}
    updateModel(_dir: NgControl, _value: any): any /* void */
    {}
    setValue(_value: { [key: string]: any }): any /* void */
    {}
    onSubmit(_$event: Event): any /* boolean */
    {}
    onReset(): any /* void */
    {}
    resetForm(_value: any): any /* void */
    {}
    _setUpdateStrategy(): any /*  */
    {}
}
