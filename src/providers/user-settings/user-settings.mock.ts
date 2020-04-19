import { Model, Docs } from "../../models/models";
import { Events } from "ionic-angular";
import { Enums } from "../../enums/enums";
import { UnitTesting } from "../../common/common.unit";

export class UserSettingsProvider {
    currencyDocument: any;
    printer: any;
    rule: any;
    pouchDbUrl: any;
    updateChannel: any;
    decodedToken: any;
    idToken: any;

    calculatedValues: any;
    instance: UserSettingsProvider;
    _e: Events;
    _currencyDocument: Docs.CurrencyDoc;
    _rule: Model.CalculationRule;
    _userCredentials: Model.UserCredentials;
    _login: string;
    _domain: string;

    calculatedUserValues: any;
    loginId: string = this.userCredentials.loginId;

    constructor(
        private communicationAddress: string = "http://localhost:6661"
    ) {}

    public get userCredentials() {
        let credentials = UnitTesting.getTestCredentials();
        credentials.communicationAddress = this.communicationAddress;
        this.login = credentials.loginId.split("@")[0];
        this.domain = credentials.loginId.split("@")[1];
        return credentials;
    }

    public set userCredentials(value: Model.UserCredentials) {
        this._userCredentials = value;
        this.login = value.loginId.split("@")[0];
        this.domain = value.loginId.split("@")[1];
    }

    public get domain() {
        return this._domain;
    }

    public set domain(value: string) {
        this._domain = value;
    }

    public get login() {
        return this._login;
    }

    public set login(value: string) {
        this._login = value;
    }

    clearSettings(): any /*  */ {}
    loadStaticFields(
        _rules: any,
        _financial: any,
        _events: Events
    ): any /* Promise<any> */ {}

    public static instance(): UserSettingsProvider {
        return new UserSettingsProvider();
    }

    loadCalculatedValues(): any /*  */ {}
    updateCalculatedValue(
        _optionType: Enums.CalculatedOptions,
        _newValue: any,
        _displayValue: any,
        _title: string
    ): any /*  */ {}
    getCalculatedValue(
        _optionType: Enums.CalculatedOptions,
        _defaultValue: any,
        _displayValue: any,
        _title: string
    ): any /* Model.CalculatedValue */ {}
}
