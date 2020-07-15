import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralReplenishmentPage } from "./process-general-replenishment";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [ProcessGeneralReplenishmentPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralReplenishmentPage),
        TranslateModule
    ]
})
export class ProcessGeneralReplenishmentPageModule {}
