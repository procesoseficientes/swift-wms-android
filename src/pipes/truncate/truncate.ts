import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "truncate"
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, length: number, padding: string): string {
        let limit = length > 0 ? length : 10;
        let trail = padding ? padding : "...";

        return value.length > limit ? value.substring(0, limit) + trail : value;
    }
}
