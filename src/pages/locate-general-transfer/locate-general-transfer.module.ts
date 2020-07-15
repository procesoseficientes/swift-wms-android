import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateGeneralTransferPage } from "./locate-general-transfer";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [LocateGeneralTransferPage],
    imports: [
        IonicPageModule.forChild(LocateGeneralTransferPage),
        TranslateModule
    ]
})
export class LocateGeneralTransferPageModule {}
