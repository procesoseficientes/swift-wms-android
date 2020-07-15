import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { GeneralPickingPage } from "./general-picking";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [GeneralPickingPage],
    imports: [
        IonicPageModule.forChild(GeneralPickingPage),
        TranslateModule,
    ]
})
export class GeneralPickingPageModule {}
