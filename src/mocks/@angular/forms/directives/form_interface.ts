import { FormControl, FormGroup } from "../model";
import { AbstractFormGroupDirective } from "./abstract_form_group_directive";
import { NgControl } from "./ng_control";

export class Form {
    addControl(_dir: NgControl): any /* void */
    {}
    removeControl(_dir: NgControl): any /* void */
    {}
    getControl(_dir: NgControl): any /* FormControl */
    {}
    addFormGroup(_dir: AbstractFormGroupDirective): any /* void */
    {}
    removeFormGroup(_dir: AbstractFormGroupDirective): any /* void */
    {}
    getFormGroup(_dir: AbstractFormGroupDirective): any /* FormGroup */
    {}
    updateModel(_dir: NgControl, _value: any): any /* void */
    {}
}
