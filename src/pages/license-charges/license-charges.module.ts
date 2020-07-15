import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LicenseChargesPage } from "./license-charges";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LicenseChargesPage],
    imports: [
        IonicPageModule.forChild(LicenseChargesPage),
        TranslateModule
    ]
})
export class LicenseChargesPageModule {}
