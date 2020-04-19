import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ManifestCertificationPage } from "./manifest-certification";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [ManifestCertificationPage],
    imports: [
        IonicPageModule.forChild(ManifestCertificationPage),
        TranslateModule,
        PipesModule
    ]
})
export class ManifestCertificationPageModule {}
