import { Model, Docs } from "../../models/models";
import { Events } from "ionic-angular";
import { Enums } from "../../enums/enums";

export class UserSettingsProvider {
    private static instance: UserSettingsProvider = new UserSettingsProvider();
    private _e: Events;

    private _domain: string;
    public get domain(): string {
        return this._domain;
    }
    public set domain(v: string) {
        this._domain = v;
    }

    private _login: string;
    public get login(): string {
        return this._login;
    }
    public set login(v: string) {
        this._login = v;
    }

    constructor() {
        if (UserSettingsProvider.instance) {
            throw new Error(
                "Error: Instantiation failed: Please use UserSettings.getInstance() instead of new"
            );
        }
        this.loadCalculatedValues();
        UserSettingsProvider.instance = this;
    }

    public clearSettings(): void {
        this._rule = null;
        this.currencyDocument = null;
        this.decodedToken = "";
        this.idToken = "";
    }

    private _currencyDocument: Docs.CurrencyDoc;
    public get currencyDocument(): Docs.CurrencyDoc {
        return this._currencyDocument;
    }
    public set currencyDocument(v: Docs.CurrencyDoc) {
        this._currencyDocument = v;
    }
    public loadStaticFields(
        rules: any,
        financial: any,
        events: Events
    ): Promise<any> {
        if (
            this._rule != undefined &&
            this._currencyDocument != undefined &&
            this._e != null
        )
            return new Promise<any>(resolve => resolve("OK"));
        else {
            this._e = events;
            return Promise.all([
                rules.getCalculationRule().then((x: any) => {
                    this._rule = x;
                }),
                financial.getDefaultCurrency().then((x: any) => {
                    this._currencyDocument = x;
                })
            ]);
        }
    }

    public set printer(value: Model.Printer) {
        localStorage.setItem("PRINTER_OBJECT", JSON.stringify(value));
    }

    public get printer(): Model.Printer {
        let printerObj = localStorage.getItem("PRINTER_OBJECT");

        return printerObj ? JSON.parse(printerObj) : null;
    }

    private _rule: Model.CalculationRule;
    public get rule(): Model.CalculationRule {
        return this._rule;
    }
    public set rule(v: Model.CalculationRule) {
        this._rule = v;
    }

    public get loginId(): string {
        return localStorage.getItem("loginId") || "";
    }

    public set loginId(value: string) {
        localStorage.setItem("loginId", value);
    }

    public set updateChannel(value: string) {
        localStorage.setItem("updateChannel", value);
    }

    public get updateChannel(): string {
        return localStorage.getItem("updateChannel");
    }

    public static getInstance(): UserSettingsProvider {
        return UserSettingsProvider.instance;
    }

    public set decodedToken(value: string) {
        localStorage.setItem("decodedToken", value);
    }

    public get decodedToken(): string {
        return localStorage.getItem("decodedToken");
    }

    public set idToken(value: string) {
        localStorage.setItem("id_token", value);
    }

    public get idToken(): string {
        return localStorage.getItem("id_token");
    }

    private loadCalculatedValues(): void {
        if (this.calculatedUserValues) return;
        let calValues = this.storage.getItem("calculatedValues");
        if (calValues && calValues != null && calValues != "null") {
            this.calculatedUserValues = JSON.parse(calValues);
        } else {
            this.calculatedUserValues = {};
        }
    }

    protected get storage(): Storage {
        return localStorage;
    }

    private _logOperator: Array<Model.TransactionOperator>;
    public get logOperator(): Array<Model.TransactionOperator> {
        return this._logOperator;
    }

    public set logOperator(value: Array<Model.TransactionOperator>) {
        this._logOperator = value;
    }

    private _userCredentials: Model.UserCredentials;
    public get userCredentials(): Model.UserCredentials {
        this._userCredentials = this.deleteProperty(
            "materialId",
            this._userCredentials
        );
        return this._userCredentials;
    }

    public deleteProperty<T extends any>(
        propertyToDelete: any,
        defaultEntity: T
    ): T {
        if (defaultEntity && defaultEntity.hasOwnProperty(propertyToDelete)) {
            defaultEntity[propertyToDelete] = null;
        }
        return defaultEntity;
    }
    public set userCredentials(value: Model.UserCredentials) {
        this._userCredentials = value;
        this._userCredentials.login = value.loginId.split("@")[0];
        this.login = this._userCredentials.login;
        this.domain = value.loginId.split("@")[1];
    }

    private calculatedUserValues: any;
    public get calculatedValues(): any {
        return this.calculatedUserValues;
    }

    public set calculatedValues(value: any) {
        this.calculatedUserValues = value;
        this.storage.setItem(
            "calculatedValues",
            JSON.stringify(this.calculatedUserValues)
        );
    }

    public updateCalculatedValue(
        optionType: Enums.CalculatedOptions,
        newValue: any,
        displayValue: any = newValue,
        title: string = null
    ): void {
        this.calculatedUserValues[optionType] = {
            value: newValue,
            display: displayValue,
            title: title,
            type: optionType
        };
        this.storage.setItem(
            "calculatedValues",
            JSON.stringify(this.calculatedUserValues)
        );
    }

    public getCalculatedValue(
        optionType: Enums.CalculatedOptions,
        defaultValue: any,
        displayValue: any = defaultValue,
        title: string = null
    ): Model.CalculatedValue {
        return this.calculatedUserValues[optionType] == null
            ? { value: defaultValue, display: displayValue, title: title }
            : this.calculatedUserValues[optionType];
    }
}
