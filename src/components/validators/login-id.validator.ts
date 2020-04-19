import { FormControl, Validators } from "@angular/forms";

export class LoginIdValidator {
    private static validLoginId(fc: FormControl): { [s: string]: boolean } {
        if (
            !fc.value.match(
                "^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z])$"
            )
        ) {
            return { validLoginId: false };
        }
        return null;
    }

    static createLoginIdFormControl(): FormControl {
        return new FormControl("", [
            Validators.required,
            LoginIdValidator.validLoginId
        ]);
    }
}
