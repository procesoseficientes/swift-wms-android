import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ManifiestCertificationSeriesPage } from "./manifiest-certification-series";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [ManifiestCertificationSeriesPage],
    imports: [
        IonicPageModule.forChild(ManifiestCertificationSeriesPage),
        TranslateModule,
        PipesModule
    ]
})
export class ManifiestCertificationSeriesPageModule {}
