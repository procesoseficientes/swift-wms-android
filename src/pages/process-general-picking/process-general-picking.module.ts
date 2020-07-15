import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralPickingPage } from "./process-general-picking";
import { TranslateModule } from "@ngx-translate/core";

import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [ProcessGeneralPickingPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralPickingPage),
        TranslateModule,
        PipesModule
    ]
})
export class ProcessGeneralPickingPagePageModule {}
