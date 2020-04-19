import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "formatDate"
})
export class FormatDatePipe implements PipeTransform {
    transform(value: string) {
        let notificationDate: Date = new Date(value);
        let options = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
        };

        let dateText = notificationDate.toLocaleDateString([], options);
        return dateText;
    }
}
