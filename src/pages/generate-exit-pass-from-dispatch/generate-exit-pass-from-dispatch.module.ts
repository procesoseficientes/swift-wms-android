import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GenerateExitPassFromDispatchPage } from "./generate-exit-pass-from-dispatch";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [GenerateExitPassFromDispatchPage],
    imports: [
        IonicPageModule.forChild(GenerateExitPassFromDispatchPage),
        TranslateModule,
        ComponentModule,
    ]
})
export class GenerateExitPassFromDispatchPageModule {}