import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RelocateFullLicensePage } from "./relocate-full-license";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [RelocateFullLicensePage],
    imports: [
        IonicPageModule.forChild(RelocateFullLicensePage),
        TranslateModule
    ]
})
export class RelocateFullLicensePageModule {}
