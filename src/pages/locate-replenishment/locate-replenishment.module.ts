import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateReplenishmentPage } from "./locate-replenishment";
import { ComponentModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocateReplenishmentPage],
    imports: [
        IonicPageModule.forChild(LocateReplenishmentPage),
        TranslateModule,
        ComponentModule
    ]
})
export class LocateReplenishmentPageModule {}
