"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let NotificationDatePipe = class NotificationDatePipe {
    constructor() {
        this.millisecondsPerDay = 1000 * 60 * 60 * 24;
    }
    transform(value) {
        let notificationDate = new Date(value);
        let dayDifference = this.dateDiffInDays(notificationDate, new Date());
        switch (dayDifference) {
            case 0:
                return "_notifications.Today-at_";
            case 1:
                return "_notifications.Yesterday-at_";
            default:
                return " ";
        }
    }
    dateDiffInDays(a, b) {
        let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
        return Math.floor((utc2 - utc1) / this.millisecondsPerDay);
    }
};
NotificationDatePipe = __decorate([
    core_1.Pipe({
        name: "notificationDate"
    })
], NotificationDatePipe);
exports.NotificationDatePipe = NotificationDatePipe;
//# sourceMappingURL=notification-date.js.map