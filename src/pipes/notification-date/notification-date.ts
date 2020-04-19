import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "notificationDate"
})
export class NotificationDatePipe implements PipeTransform {
    private readonly millisecondsPerDay: number = 1000 * 60 * 60 * 24;

    transform(value: string) {
        let notificationDate: Date = new Date(value);
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

    private dateDiffInDays(a: Date, b: Date) {
        let utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
        let utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

        return Math.floor((utc2 - utc1) / this.millisecondsPerDay);
    }
}
