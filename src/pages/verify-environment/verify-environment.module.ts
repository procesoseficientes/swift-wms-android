import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { VerifyEnvironmentPage } from "./verify-environment";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [VerifyEnvironmentPage],
    imports: [
        IonicPageModule.forChild(VerifyEnvironmentPage),
        TranslateModule
    ]
})
export class VerifyEnvironmentPageModule {}
