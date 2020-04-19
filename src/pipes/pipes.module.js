"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const notification_date_1 = require("./notification-date/notification-date");
const format_date_1 = require("./format-date/format-date");
const format_date_no_time_1 = require("./format-date/format-date-no-time");
const truncate_1 = require("./truncate/truncate");
let PipesModule = class PipesModule {
};
PipesModule = __decorate([
    core_1.NgModule({
        declarations: [
            notification_date_1.NotificationDatePipe,
            truncate_1.TruncatePipe,
            format_date_1.FormatDatePipe,
            format_date_no_time_1.FormatDateNoTimePipe
        ],
        imports: [],
        exports: [
            notification_date_1.NotificationDatePipe,
            truncate_1.TruncatePipe,
            format_date_1.FormatDatePipe,
            format_date_no_time_1.FormatDateNoTimePipe
        ]
    })
], PipesModule);
exports.PipesModule = PipesModule;
//# sourceMappingURL=pipes.module.js.map