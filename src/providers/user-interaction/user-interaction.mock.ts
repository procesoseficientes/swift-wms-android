import { Injectable } from "@angular/core";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../translate/translate";
import {
    Loading,
    LoadingController,
    AlertController,
    Alert,
    Platform
} from "ionic-angular";
import { CustomToastComponent } from "../../components/components";
import { Device } from "@ionic-native/device";
@Injectable()
export class UserInteractionProvider {
    private loading: Loading;
    activeAlert: Alert;
    translate: TranslateProvider;
    loadingCtrl: LoadingController;
    alertCtrl: AlertController;
    platform: Platform;
    device: Device;
    constructor(private promptValue: any) {}

    public static instance(promptValue: any): UserInteractionProvider {
        return new UserInteractionProvider(promptValue);
    }
    toast(
        _value: string,
        _time: Enums.ToastTime
    ): any /* void */ {}
    exitApp(): any /* void */ {}
    promptForValue(
        _title: Enums.Translation.Title,
        _msg: Enums.Translation.Message,
        _placeholder: Enums.Translation.PlaceHolder,
        _type: Enums.PromptType,
        _successButtonText: Enums.Translation.Button,
        _cancelButtonText: Enums.Translation.Button
    ): any /* Promise<TResult> */ {
        return Promise.resolve(_msg);
    }
    showConfirmMessage(_msg: string): Promise<any> {
        return Promise.resolve(_msg);
    }
    showMessage(_msg: string): any /* Promise<any> */ {}
    showError(_msg: string): any /* Promise<any> */ {}
    showCustomError(
        _error: Enums.CustomErrorCodes,
        _resource: string,
        _message: string,
        _source: string
    ): any /* Promise<any> */ {}
    showLoading(
        _message: string,
        _spinnerType: Enums.SpinnerType
    ): Promise<any> {
        return Promise.resolve();
    }
    hideLoading(): Promise<any> {
        return Promise.resolve();
    }
    toastThis(
        _toast: CustomToastComponent,
        _message: string,
        _type: string,
        _displayTime: number
    ): any /* Promise<any> */ {}
    showOptionAlert(
        _inputs: Array<any>,
        _buttons: Array<any>,
        _titleMessage: string
    ): any /* Promise<Alert> */ {}
    convertToControls(
        _type: Enums.InputType,
        _items: Array<any>,
        _funId: (item: any) => string,
        _funPlaceHolder: (item: any) => string,
        _funLabel: (item: any) => string,
        _funValue: (item: any) => any
    ): any /* Promise<Array<any>> */ {}
    convertToControlsPromise(
        _type: Enums.InputType,
        _items: Array<any>,
        _funId: (item: any) => string,
        _funPlaceHolder: (item: any) => string,
        _funLabel: (item: any) => string,
        _funValue: (item: any) => any
    ): any /* Promise<Array<any>> */ {}
    convertToButtons(
        _handler: (value: any, index: number, data: any) => any,
        _rawButtonLabels: Array<string>,
        _buttonValues: Array<any>
    ): any /* Promise<Array<any>> */ {}
    convertToButtonsPromise(
        _rawButtonLabels: Array<string>,
        _buttonValues: Array<any>,
        _handler: (value: any, index: number, data: any) => any
    ): any /* Promise<Array<any>> */ {}
}
