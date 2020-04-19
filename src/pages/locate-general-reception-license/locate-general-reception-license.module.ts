import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateGeneralReceptionLicensePage } from "./locate-general-reception-license";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [LocateGeneralReceptionLicensePage],
    imports: [
        IonicPageModule.forChild(LocateGeneralReceptionLicensePage),
        TranslateModule,
        ComponentModule
    ]
})
export class LocateGeneralReceptionLicensePageModule {}
