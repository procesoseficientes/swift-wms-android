"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const enums_1 = require("../../enums/enums");
const translate_1 = require("../translate/translate");
const ionic_angular_1 = require("ionic-angular");
let UserInteractionProvider = class UserInteractionProvider {
    constructor(translate, loadingCtrl, alertCtrl, toastCtrl) {
        this.translate = translate;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.version = "2";
    }
    toast(value, time) {
        return this.toastCtrl.create({
            message: value,
            duration: time,
            position: "bottom"
        });
    }
    promptForValue(title = enums_1.Enums.Translation.Title.Swift3PL, message, placeholder, type, successButtonText = enums_1.Enums.Translation.Button
        .Ok, cancelButtonText = enums_1.Enums.Translation.Button
        .Cancel) {
        let resultSet = {
            successButtonText: 0,
            cancelButtonText: 1,
            title: 2,
            placeholder: 3,
            message: 4
        };
        return Promise.all([
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, successButtonText.toString()),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, cancelButtonText.toString()),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Title, title.toString()),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.PlaceHolders, placeholder.toString()),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Messages, message.toString())
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
                            handler: () => { }
                        },
                        {
                            text: arrResult[resultSet.successButtonText],
                            cssClass: "alert-button-ok",
                            handler: (data) => {
                                resolve(data.value);
                            }
                        }
                    ],
                    enableBackdropDismiss: false
                })
                    .present();
            }).then((value) => {
                return Promise.resolve(value);
            });
        });
    }
    showConfirmMessage(message) {
        return Promise.all([
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Yes.toString()),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.No.toString())
        ]).then(arrResult => {
            return new Promise(resolve => {
                if (this.activeAlert)
                    return;
                this.activeAlert = this.alertCtrl.create({
                    title: `${this.version}Swift 3PL`,
                    message: message,
                    buttons: [
                        {
                            text: arrResult[1],
                            role: "cancel",
                            handler: () => {
                                this.activeAlert = null;
                                resolve(enums_1.Enums.YesNo.No);
                            }
                        },
                        {
                            text: arrResult[0],
                            role: null,
                            handler: () => {
                                this.activeAlert = null;
                                resolve(enums_1.Enums.YesNo.Yes);
                            }
                        }
                    ]
                });
                this.activeAlert.present();
            });
        });
    }
    showMessage(message) {
        return this.translate
            .translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, enums_1.Enums.Translation.Button.Ok.toString())
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
    showError(message) {
        return this.showMessage(message);
    }
    showCustomError(error, resource, _message, // TODO: msg y source must be used to make an internal log for other purposes.
    _source // TODO: msg y source must be used to make an internal log for other purposes.
    ) {
        // HACK: this type is any because upsource configuration.
        return Promise.all([
            this.translate.translateMessageFromErrorCode(error, resource),
            this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, "OK_")
        ]).then(arrayResult => {
            if (this.activeAlert)
                return Promise.resolve();
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
    showLoading(message = null, spinnerType = enums_1.Enums.SpinnerType.None) {
        if (this.loading)
            return Promise.resolve();
        return (message == null
            ? this.translate.translateGroupValue(enums_1.Enums.Translation.Groups.WaitingMessage, "Loading-information-please-wait_")
            : Promise.resolve(message)).then(message => {
            this.loading = this.loadingCtrl.create({
                spinner: spinnerType,
                content: message
            });
            return this.loading.present();
        });
    }
    hideLoading() {
        if (this.loading != null) {
            this.loading.dismiss().then(() => {
                //this.loading = null;
                return Promise.resolve();
            });
        }
        else {
            return Promise.resolve();
        }
    }
    showOptionAlert(inputs, buttons, titleMessage = "Select-an-item_") {
        return this.translate
            .translateGroupValue(enums_1.Enums.Translation.Groups.Alerts, titleMessage)
            .then(titleTranslated => {
            if (this.activeAlert)
                return;
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
    convertToControls(type, items, funId, funPlaceHolder, funLabel, funValue) {
        return this.convertToControlsPromise(type, items, funId, funPlaceHolder, funLabel, funValue);
    }
    convertToControlsPromise(type, items, funId, funPlaceHolder, funLabel, funValue) {
        return Promise.all(items.map(element => {
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
        }));
    }
    convertToButtons(handler, rawButtonLabels = ["CANCEL_", "OK_"], buttonValues = [enums_1.Enums.YesNo.No, enums_1.Enums.YesNo.Yes]) {
        return this.convertToButtonsPromise(rawButtonLabels, buttonValues, handler);
    }
    convertToButtonsPromise(rawButtonLabels, buttonValues, handler) {
        return Promise.all(rawButtonLabels.map((buttonLabel, index) => {
            return this.translate
                .translateGroupValue(enums_1.Enums.Translation.Groups.Buttons, buttonLabel)
                .then(label => {
                let button = {
                    text: label,
                    handler: (data) => {
                        handler(buttonValues[index], index, data);
                    }
                };
                if (index == 0)
                    button.role = "cancel";
                return button;
            });
        }));
    }
};
UserInteractionProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [translate_1.TranslateProvider,
        ionic_angular_1.LoadingController,
        ionic_angular_1.AlertController,
        ionic_angular_1.ToastController])
], UserInteractionProvider);
exports.UserInteractionProvider = UserInteractionProvider;
//# sourceMappingURL=user-interaction.js.map