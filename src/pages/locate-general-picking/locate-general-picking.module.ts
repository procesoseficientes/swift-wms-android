import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateGeneralPickingPage } from "./locate-general-picking";
import { ComponentModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocateGeneralPickingPage],
    imports: [
        IonicPageModule.forChild(LocateGeneralPickingPage),
        TranslateModule,
        ComponentModule
    ]
})
export class LocateGeneralPickingPageModule {}
