"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserSettingsProvider {
    constructor() {
        if (UserSettingsProvider.instance) {
            throw new Error("Error: Instantiation failed: Please use UserSettings.getInstance() instead of new");
        }
        this.loadCalculatedValues();
        UserSettingsProvider.instance = this;
    }
    get domain() {
        return this._domain;
    }
    set domain(v) {
        this._domain = v;
    }
    get login() {
        return this._login;
    }
    set login(v) {
        this._login = v;
    }
    clearSettings() {
        this._rule = null;
        this.currencyDocument = null;
        this.decodedToken = "";
        this.idToken = "";
    }
    get currencyDocument() {
        return this._currencyDocument;
    }
    set currencyDocument(v) {
        this._currencyDocument = v;
    }
    loadStaticFields(rules, financial, events) {
        if (this._rule != undefined &&
            this._currencyDocument != undefined &&
            this._e != null)
            return new Promise(resolve => resolve("OK"));
        else {
            this._e = events;
            return Promise.all([
                rules.getCalculationRule().then((x) => {
                    this._rule = x;
                }),
                financial.getDefaultCurrency().then((x) => {
                    this._currencyDocument = x;
                })
            ]);
        }
    }
    set printer(value) {
        localStorage.setItem("PRINTER_OBJECT", JSON.stringify(value));
    }
    get printer() {
        let printerObj = localStorage.getItem("PRINTER_OBJECT");
        return printerObj ? JSON.parse(printerObj) : null;
    }
    get rule() {
        return this._rule;
    }
    set rule(v) {
        this._rule = v;
    }
    get loginId() {
        return localStorage.getItem("loginId") || "";
    }
    set loginId(value) {
        localStorage.setItem("loginId", value);
    }
    set updateChannel(value) {
        localStorage.setItem("updateChannel", value);
    }
    get updateChannel() {
        return localStorage.getItem("updateChannel");
    }
    static getInstance() {
        return UserSettingsProvider.instance;
    }
    set decodedToken(value) {
        localStorage.setItem("decodedToken", value);
    }
    get decodedToken() {
        return localStorage.getItem("decodedToken");
    }
    set idToken(value) {
        localStorage.setItem("id_token", value);
    }
    get idToken() {
        return localStorage.getItem("id_token");
    }
    loadCalculatedValues() {
        if (this.calculatedUserValues)
            return;
        let calValues = this.storage.getItem("calculatedValues");
        if (calValues && calValues != null && calValues != "null") {
            this.calculatedUserValues = JSON.parse(calValues);
        }
        else {
            this.calculatedUserValues = {};
        }
    }
    get storage() {
        return localStorage;
    }
    get logOperator() {
        return this._logOperator;
    }
    set logOperator(value) {
        this._logOperator = value;
    }
    get userCredentials() {
        this._userCredentials = this.deleteProperty("materialId", this._userCredentials);
        return this._userCredentials;
    }
    deleteProperty(propertyToDelete, defaultEntity) {
        if (defaultEntity && defaultEntity.hasOwnProperty(propertyToDelete)) {
            defaultEntity[propertyToDelete] = null;
        }
        return defaultEntity;
    }
    set userCredentials(value) {
        this._userCredentials = value;
        this._userCredentials.login = value.loginId.split("@")[0];
        this.login = this._userCredentials.login;
        this.domain = value.loginId.split("@")[1];
    }
    get calculatedValues() {
        return this.calculatedUserValues;
    }
    set calculatedValues(value) {
        this.calculatedUserValues = value;
        this.storage.setItem("calculatedValues", JSON.stringify(this.calculatedUserValues));
    }
    updateCalculatedValue(optionType, newValue, displayValue = newValue, title = null) {
        this.calculatedUserValues[optionType] = {
            value: newValue,
            display: displayValue,
            title: title,
            type: optionType
        };
        this.storage.setItem("calculatedValues", JSON.stringify(this.calculatedUserValues));
    }
    getCalculatedValue(optionType, defaultValue, displayValue = defaultValue, title = null) {
        return this.calculatedUserValues[optionType] == null
            ? { value: defaultValue, display: displayValue, title: title }
            : this.calculatedUserValues[optionType];
    }
}
UserSettingsProvider.instance = new UserSettingsProvider();
exports.UserSettingsProvider = UserSettingsProvider;
//# sourceMappingURL=user-settings.js.map