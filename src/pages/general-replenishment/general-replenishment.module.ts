import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GeneralReplenishmentPage } from "./general-replenishment";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [GeneralReplenishmentPage],
    imports: [
        IonicPageModule.forChild(GeneralReplenishmentPage),
        TranslateModule,
        ComponentModule
    ]
})
export class GeneralReplenishmentPageModule {}
