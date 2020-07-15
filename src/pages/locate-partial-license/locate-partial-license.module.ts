import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocatePartialLicensePage } from "./locate-partial-license";

import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocatePartialLicensePage],
    imports: [
        IonicPageModule.forChild(LocatePartialLicensePage),
        TranslateModule,
    ]
})
export class LocatePartialLicensePageModule {}
