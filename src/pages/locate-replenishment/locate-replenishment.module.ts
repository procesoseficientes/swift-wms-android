import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateReplenishmentPage } from "./locate-replenishment";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocateReplenishmentPage],
    imports: [
        IonicPageModule.forChild(LocateReplenishmentPage),
        TranslateModule
    ]
})
export class LocateReplenishmentPageModule {}
