import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RelocatePartialLicenseSeriesPage } from "./relocate-partial-license-series";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [RelocatePartialLicenseSeriesPage],
    imports: [
        IonicPageModule.forChild(RelocatePartialLicenseSeriesPage),
        TranslateModule
    ]
})
export class RelocatePartialLicenseSeriesPageModule {}
