import { AbstractControlDirective } from "./abstract_control_directive";
import { ControlContainer } from "./control_container";
import { NgControl } from "./ng_control";

export class AbstractControlStatus {
    _cd: any;
    ngClassUntouched: boolean;
    ngClassTouched: boolean;
    ngClassPristine: boolean;
    ngClassDirty: boolean;
    ngClassValid: boolean;
    ngClassInvalid: boolean;
    ngClassPending: boolean;
}

export class ngControlStatusHost {}

export class NgControlStatus {}

export class NgControlStatusGroup {}
