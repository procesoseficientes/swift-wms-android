import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ProcessGeneralPickingPage } from "./process-general-picking";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [ProcessGeneralPickingPage],
    imports: [
        IonicPageModule.forChild(ProcessGeneralPickingPage),
        TranslateModule,
        ComponentModule,
        PipesModule
    ]
})
export class ProcessGeneralPickingPagePageModule {}
