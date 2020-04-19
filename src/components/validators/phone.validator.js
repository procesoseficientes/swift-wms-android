"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("google-libphonenumber");
class PhoneValidator {
}
// Inspired on: https://github.com/yuyang041060120/ng2-validation/blob/master/src/equal-to/validator.ts
PhoneValidator.validCountryPhone = (countryControl) => {
    let subscribe = false;
    return (phoneControl) => {
        if (!subscribe) {
            subscribe = true;
            countryControl.valueChanges.subscribe(() => {
                phoneControl.updateValueAndValidity();
            });
        }
        if (phoneControl.value !== "") {
            try {
                const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
                let phoneNumber = `${phoneControl.value}`, region = countryControl.value.iso, number = phoneUtil.parse(phoneNumber, region), isValidNumber = phoneUtil.isValidNumber(number);
                if (isValidNumber) {
                    return null;
                }
            }
            catch (e) {
                return {
                    validCountryPhone: true
                };
            }
            return {
                validCountryPhone: true
            };
        }
        else {
            return null;
        }
    };
};
exports.PhoneValidator = PhoneValidator;
//# sourceMappingURL=phone.validator.js.map