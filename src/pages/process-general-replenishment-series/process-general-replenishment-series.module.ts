import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralReplenishmentSeriesPage } from "./process-general-replenishment-series";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [ProcessGeneralReplenishmentSeriesPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralReplenishmentSeriesPage),
        TranslateModule,
        ComponentModule
    ]
})
export class ProcessGeneralReplenishmentSeriesPageModule {}
