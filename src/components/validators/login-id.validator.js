"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forms_1 = require("@angular/forms");
class LoginIdValidator {
    static validLoginId(fc) {
        if (!fc.value.match("^[_a-zA-Z0-9-]+(.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(.[a-zA-Z0-9-]+)*(.[a-zA-Z])$")) {
            return { validLoginId: false };
        }
        return null;
    }
    static createLoginIdFormControl() {
        return new forms_1.FormControl("", [
            forms_1.Validators.required,
            LoginIdValidator.validLoginId
        ]);
    }
}
exports.LoginIdValidator = LoginIdValidator;
//# sourceMappingURL=login-id.validator.js.map