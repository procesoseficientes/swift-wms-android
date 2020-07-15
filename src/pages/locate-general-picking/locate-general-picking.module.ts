import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateGeneralPickingPage } from "./locate-general-picking";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocateGeneralPickingPage],
    imports: [
        IonicPageModule.forChild(LocateGeneralPickingPage),
        TranslateModule
    ]
})
export class LocateGeneralPickingPageModule {}
