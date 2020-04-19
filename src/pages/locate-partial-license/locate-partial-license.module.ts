import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocatePartialLicensePage } from "./locate-partial-license";
import { ComponentModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocatePartialLicensePage],
    imports: [
        IonicPageModule.forChild(LocatePartialLicensePage),
        TranslateModule,
        ComponentModule,
    ]
})
export class LocatePartialLicensePageModule {}
