import { Component } from "@angular/core";

@Component({
    selector: "custom-toast",
    templateUrl: "custom-toast.html"
})
export class CustomToastComponent {
    type: string = "error";
    message: string = "This is a test message";
    isToastVisible: boolean = false;
    displayTime: number;

    constructor() {}
}
