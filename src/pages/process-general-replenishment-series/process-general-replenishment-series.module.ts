import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralReplenishmentSeriesPage } from "./process-general-replenishment-series";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [ProcessGeneralReplenishmentSeriesPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralReplenishmentSeriesPage),
        TranslateModule
    ]
})
export class ProcessGeneralReplenishmentSeriesPageModule {}
