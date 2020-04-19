import { NgModule } from "@angular/core";
import { NotificationDatePipe } from "./notification-date/notification-date";
import { FormatDatePipe } from "./format-date/format-date";
import { FormatDateNoTimePipe } from "./format-date/format-date-no-time";
import { TruncatePipe } from "./truncate/truncate";
@NgModule({
    declarations: [
        NotificationDatePipe,
        TruncatePipe,
        FormatDatePipe,
        FormatDateNoTimePipe
    ],
    imports: [],
    exports: [
        NotificationDatePipe,
        TruncatePipe,
        FormatDatePipe,
        FormatDateNoTimePipe
    ]
})
export class PipesModule {}
