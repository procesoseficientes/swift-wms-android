import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { RelocatePartialLicenseSeriesPage } from "./relocate-partial-license-series";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [RelocatePartialLicenseSeriesPage],
    imports: [
        IonicPageModule.forChild(RelocatePartialLicenseSeriesPage),
        TranslateModule,
        ComponentModule
    ]
})
export class RelocatePartialLicenseSeriesPageModule {}
