import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LicenseInfoPage } from "./license-info";
import { ComponentModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [LicenseInfoPage],
    imports: [
        IonicPageModule.forChild(LicenseInfoPage),
        TranslateModule,
        ComponentModule,
        PipesModule
    ]
})
export class LicenseInfoPageModule {}
