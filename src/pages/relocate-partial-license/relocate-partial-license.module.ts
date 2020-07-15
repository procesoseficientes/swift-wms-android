import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RelocatePartialLicensePage } from "./relocate-partial-license";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [RelocatePartialLicensePage],
    imports: [
        IonicPageModule.forChild(RelocatePartialLicensePage),
        TranslateModule
    ]
})
export class RelocatePartialLicensePageModule {}
