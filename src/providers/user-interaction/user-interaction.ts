import { Injectable } from "@angular/core";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../translate/translate";
import {
    Loading,
    LoadingController,
    AlertController,
    Alert,
    ToastController
} from "ionic-angular";

@Injectable()
export class UserInteractionProvider {
    private loading: Loading;
    public activeAlert: Alert;
    public version: string = "2";

    constructor(
        private translate: TranslateProvider,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private toastCtrl: ToastController
    ) {}

    public toast(value: string, time: Enums.ToastTime) {
        return this.toastCtrl.create({
            message: value,
            duration: time,
            position: "bottom"
        });
    }

    public promptForValue<TResult>(
        title: Enums.Translation.Title = Enums.Translation.Title.Swift3PL,
        message: Enums.Translation.Message,
        placeholder: Enums.Translation.PlaceHolder,
        type: Enums.PromptType,
        successButtonText: Enums.Translation.Button = Enums.Translation.Button
            .Ok,
        cancelButtonText: Enums.Translation.Button = Enums.Translation.Button
            .Cancel
    ): Promise<TResult> {
        let resultSet: {
            successButtonText: number;
            cancelButtonText: number;
            title: number;
            placeholder: number;
            message: number;
        } = {
            successButtonText: 0,
            cancelButtonText: 1,
            title: 2,
            placeholder: 3,
            message: 4
        };

        return Promise.all([
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                successButtonText.toString()
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                cancelButtonText.toString()
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Title,
                title.toString()
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.PlaceHolders,
                placeholder.toString()
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Messages,
                message.toString()
            )
        ]).then(arrResult => {
            return new Promise(resolve => {
                this.alertCtrl
                    .create({
                        title: this.version + arrResult[resultSet.title],
                        message: arrResult[resultSet.message],
                        inputs: [
                            {
                                name: "value",
                                type: type,
                                placeholder: arrResult[resultSet.placeholder]
                            }
                        ],
                        buttons: [
                            {
                                text: arrResult[resultSet.cancelButtonText],
                                cssClass: "alert-button-cancel",
                                handler: () => {}
                            },
                            {
                                text: arrResult[resultSet.successButtonText],
                                cssClass: "alert-button-ok",
                                handler: (data: any) => {
                                    resolve(<TResult>data.value);
                                }
                            }
                        ],
                        enableBackdropDismiss: false
                    })
                    .present();
            }).then((value: TResult) => {
                return Promise.resolve(value);
            });
        });
    }

    public showConfirmMessage(message: string): Promise<any> {
        return Promise.all([
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.Yes.toString()
            ),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.No.toString()
            )
        ]).then(arrResult => {
            return new Promise(resolve => {
                if (this.activeAlert) return;
                this.activeAlert = this.alertCtrl.create({
                    title: `${this.version}Swift 3PL`,
                    message: message,
                    buttons: [
                        {
                            text: arrResult[1],
                            role: "cancel",
                            handler: () => {
                                this.activeAlert = null;
                                resolve(Enums.YesNo.No);
                            }
                        },
                        {
                            text: arrResult[0],
                            role: null,
                            handler: () => {
                                this.activeAlert = null;
                                resolve(Enums.YesNo.Yes);
                            }
                        }
                    ]
                });
                this.activeAlert.present();
            });
        });
    }

    public showMessage(message: string): Promise<any> {
        return this.translate
            .translateGroupValue(
                Enums.Translation.Groups.Buttons,
                Enums.Translation.Button.Ok.toString()
            )
            .then(value => {
                return this.alertCtrl
                    .create({
                        title: `${this.version}Swift 3PL`,
                        message: message,
                        buttons: [value]
                    })
                    .present();
            });
    }

    public showError(message: string): Promise<any> {
        return this.showMessage(message);
    }

    public showCustomError(
        error: Enums.CustomErrorCodes,
        resource?: string,
        _message?: string, // TODO: msg y source must be used to make an internal log for other purposes.
        _source?: string // TODO: msg y source must be used to make an internal log for other purposes.
    ): Promise<any> {
        // HACK: this type is any because upsource configuration.

        return Promise.all([
            this.translate.translateMessageFromErrorCode(error, resource),
            this.translate.translateGroupValue(
                Enums.Translation.Groups.Buttons,
                "OK_"
            )
        ]).then(arrayResult => {
            if (this.activeAlert) return Promise.resolve();
            this.activeAlert = this.alertCtrl.create({
                title: `${this.version}Swift 3PL`,
                message: arrayResult[0],
                buttons: [
                    {
                        text: arrayResult[1],
                        role: "cancel",
                        handler: () => {
                            this.activeAlert = null;
                        }
                    }
                ]
            });
            return this.activeAlert.present();
        });
    }

    public showLoading(
        message: string = null,
        spinnerType: Enums.SpinnerType = Enums.SpinnerType.None
    ): Promise<any> {
        if (this.loading) return Promise.resolve();
        return (message == null
            ? this.translate.translateGroupValue(
                  Enums.Translation.Groups.WaitingMessage,
                  "Loading-information-please-wait_"
              )
            : Promise.resolve(message)
        ).then(message => {
            this.loading = this.loadingCtrl.create({
                spinner: <any>spinnerType,
                content: message
            });
            return this.loading.present();
        });
    }

    public hideLoading(): Promise<any> {
        if (this.loading != null) {
            this.loading.dismiss().then(() => {
                //this.loading = null;
                return Promise.resolve();
            });
        } else {
            return Promise.resolve();
        }
    }

    public showOptionAlert(
        inputs: Array<any>,
        buttons: Array<any>,
        titleMessage: string = "Select-an-item_"
    ): Promise<Alert> {
        return this.translate
            .translateGroupValue(Enums.Translation.Groups.Alerts, titleMessage)
            .then(titleTranslated => {
                if (this.activeAlert) return;
                this.activeAlert = this.alertCtrl.create({
                    title: this.version + titleTranslated,
                    inputs: inputs,
                    buttons: buttons
                });

                return this.activeAlert.present().then(() => {
                    return Promise.resolve(this.activeAlert);
                });
            });
    }

    public convertToControls(
        type: Enums.InputType,
        items: Array<any>,
        funId: (item: any) => string,
        funPlaceHolder: (item: any) => string,
        funLabel: (item: any) => string,
        funValue: (item: any) => any
    ): Promise<Array<any>> {
        return this.convertToControlsPromise(
            type,
            items,
            funId,
            funPlaceHolder,
            funLabel,
            funValue
        );
    }

    private convertToControlsPromise(
        type: Enums.InputType,
        items: Array<any>,
        funId: (item: any) => string,
        funPlaceHolder: (item: any) => string,
        funLabel: (item: any) => string,
        funValue: (item: any) => any
    ): Promise<Array<any>> {
        return Promise.all(
            items.map(element => {
                let id = funId(element);
                let placeholder = funPlaceHolder(element);
                let label = funLabel(element);
                let value = funValue(element);

                return {
                    type: type,
                    id: id,
                    placeholder: placeholder,
                    label: label,
                    value: value
                };
            })
        );
    }

    public convertToButtons(
        handler: (value: any, index: number, data: any) => any,
        rawButtonLabels: Array<string> = ["CANCEL_", "OK_"],
        buttonValues: Array<any> = [Enums.YesNo.No, Enums.YesNo.Yes]
    ): Promise<Array<any>> {
        return this.convertToButtonsPromise(
            rawButtonLabels,
            buttonValues,
            handler
        );
    }

    private convertToButtonsPromise(
        rawButtonLabels: Array<string>,
        buttonValues: Array<any>,
        handler: (value: any, index: number, data: any) => any
    ): Promise<Array<any>> {
        return Promise.all(
            rawButtonLabels.map((buttonLabel, index) => {
                return this.translate
                    .translateGroupValue(
                        Enums.Translation.Groups.Buttons,
                        buttonLabel
                    )
                    .then(label => {
                        let button: any = {
                            text: label,
                            handler: (data: any) => {
                                handler(buttonValues[index], index, data);
                            }
                        };

                        if (index == 0) button.role = "cancel";

                        return button;
                    });
            })
        );
    }
}
