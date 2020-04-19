import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { Enums } from "../../enums/enums";
import { WorkspacePage } from "../workspace/workspace";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
@IonicPage()
@Component({
    selector: "page-more-transactions",
    templateUrl: "more-transactions.html"
})
export class MoreTransactionsPage {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private navigation: NavigationProvider,
        private workspace: WorkspacePage,
        private userInteraction: UserInteractionProvider
    ) {}

    ionViewDidLoad(){
        this.navigation.moreTransNavCtrl = this.navCtrl;
    }

    ionViewDidEnter() {
        this.navigation.moreTransNavCtrl = this.navCtrl;
    }

    async goToManifestCertification(): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.ManifestCertification,
            this.workspace,
            this.navCtrl
        );
    }

    async goToReceptionByDocument(): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.ReceptionByDocument,
            this.workspace,
            this.navCtrl
        );
    }

    async goToMergeLicenses(): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.MergeLicense,
            this.workspace,
            this.navCtrl
        );
    }

    async goToExplodeMasterPack(): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.ExplodeMasterPack,
            this.workspace,
            this.navCtrl
        );
    }

    async goToDispatchOfLicense(): Promise<void> {
        await this.userInteraction.showLoading();
        return this.navigation.pushPage(
            Enums.Page.DispatchOfLicense,
            this.workspace,
            this.navCtrl
        );
    }

}
