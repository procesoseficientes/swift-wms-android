import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralReplenishmentPage } from "./process-general-replenishment";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [ProcessGeneralReplenishmentPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralReplenishmentPage),
        TranslateModule,
        ComponentModule
    ]
})
export class ProcessGeneralReplenishmentPageModule {}
