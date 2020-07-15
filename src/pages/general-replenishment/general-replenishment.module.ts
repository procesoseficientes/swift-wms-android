import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GeneralReplenishmentPage } from "./general-replenishment";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [GeneralReplenishmentPage],
    imports: [
        IonicPageModule.forChild(GeneralReplenishmentPage),
        TranslateModule
    ]
})
export class GeneralReplenishmentPageModule {}
