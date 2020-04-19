import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";

@IonicPage()
@Component({
    selector: "page-blank",
    templateUrl: "blank.html"
})
export class BlankPage {
    isLoaded: boolean = true;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage
    ) {}

    ionViewDidEnter() {}

    async backButtonAction(): Promise<void> {
        return this.navigation.popPage(this.workspace, this.navCtrl, {});
    }
}
