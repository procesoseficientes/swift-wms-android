import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MergeLicenseDetailPage } from "./merge-license-detail";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [MergeLicenseDetailPage],
    imports: [
        IonicPageModule.forChild(MergeLicenseDetailPage),
        TranslateModule,
        ComponentModule
    ]
})
export class MergeLicenseDetailPageModule {}
