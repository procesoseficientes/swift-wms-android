import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateGeneralReceptionLicensePage } from "./locate-general-reception-license";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [LocateGeneralReceptionLicensePage],
    imports: [
        IonicPageModule.forChild(LocateGeneralReceptionLicensePage),
        TranslateModule
    ]
})
export class LocateGeneralReceptionLicensePageModule {}
