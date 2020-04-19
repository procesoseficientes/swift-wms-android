import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GeneralPickingPage } from "./general-picking";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [GeneralPickingPage],
    imports: [
        IonicPageModule.forChild(GeneralPickingPage),
        TranslateModule,
        ComponentModule,
    ]
})
export class GeneralPickingPageModule {}
