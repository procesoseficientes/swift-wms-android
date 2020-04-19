import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateGeneralTransferPage } from "./locate-general-transfer";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [LocateGeneralTransferPage],
    imports: [
        IonicPageModule.forChild(LocateGeneralTransferPage),
        TranslateModule,
        ComponentModule
    ]
})
export class LocateGeneralTransferPageModule {}
