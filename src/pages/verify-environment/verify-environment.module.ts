import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { VerifyEnvironmentPage } from "./verify-environment";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [VerifyEnvironmentPage],
    imports: [
        IonicPageModule.forChild(VerifyEnvironmentPage),
        TranslateModule,
        ComponentModule
    ]
})
export class VerifyEnvironmentPageModule {}
