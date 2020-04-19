import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatDateNoTime"
})
export class FormatDateNoTimePipe implements PipeTransform {
    transform(value: string) {
        let notificationDate: Date = new Date(value);
        let options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };

        let dateText = notificationDate.toLocaleDateString([], options);
        return dateText;
    }
}
