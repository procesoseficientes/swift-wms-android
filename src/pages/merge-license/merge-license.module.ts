import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MergeLicensePage } from "./merge-license";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [MergeLicensePage],
    imports: [
        IonicPageModule.forChild(MergeLicensePage),
        TranslateModule
    ]
})
export class MergeLicensePageModule {}
