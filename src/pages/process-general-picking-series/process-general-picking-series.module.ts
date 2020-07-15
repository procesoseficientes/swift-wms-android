import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralPickingSeriesPage } from "./process-general-picking-series";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [ProcessGeneralPickingSeriesPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralPickingSeriesPage),
        TranslateModule
    ]
})
export class ProcessGeneralPickingSeriesPageModule {}
