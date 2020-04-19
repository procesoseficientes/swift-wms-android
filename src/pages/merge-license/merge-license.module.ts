import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MergeLicensePage } from "./merge-license";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [MergeLicensePage],
    imports: [
        IonicPageModule.forChild(MergeLicensePage),
        TranslateModule,
        ComponentModule
    ]
})
export class MergeLicensePageModule {}
