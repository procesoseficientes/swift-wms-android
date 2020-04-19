import { AbstractControlDirective } from "./abstract_control_directive";
import { Form } from "./form_interface";

export class ControlContainer {
    name: string;
    formDirective: Form | null;
    path: string[] | null;
}
