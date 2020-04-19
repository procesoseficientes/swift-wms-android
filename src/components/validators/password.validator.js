"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PasswordValidator {
    // Inspired on: http://plnkr.co/edit/Zcbg2T3tOxYmhxs7vaAm?p=preview
    static areEqual(formGroup) {
        let val;
        let valid = true;
        for (let key in formGroup.controls) {
            if (formGroup.controls.hasOwnProperty(key)) {
                let control = formGroup.controls[key];
                if (val === undefined) {
                    val = control.value;
                }
                else {
                    if (val !== control.value) {
                        valid = false;
                        break;
                    }
                }
            }
        }
        if (valid) {
            return null;
        }
        return {
            areEqual: true
        };
    }
}
exports.PasswordValidator = PasswordValidator;
//# sourceMappingURL=password.validator.js.map