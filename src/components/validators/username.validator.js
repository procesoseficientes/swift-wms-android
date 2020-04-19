"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsernameValidator {
    static validUsername(fc) {
        if (fc.value.toLowerCase() === "abc123" ||
            fc.value.toLowerCase() === "123abc") {
            return {
                validUsername: true
            };
        }
        else {
            return null;
        }
    }
}
exports.UsernameValidator = UsernameValidator;
//# sourceMappingURL=username.validator.js.map