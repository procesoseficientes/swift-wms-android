import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MergeLicenseDetailPage } from "./merge-license-detail";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [MergeLicenseDetailPage],
    imports: [
        IonicPageModule.forChild(MergeLicenseDetailPage),
        TranslateModule
    ]
})
export class MergeLicenseDetailPageModule {}
