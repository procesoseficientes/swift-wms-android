import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AddSeriesRankPage } from "./add-series-rank";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [AddSeriesRankPage],
    imports: [
        IonicPageModule.forChild(AddSeriesRankPage),
        TranslateModule,
        ComponentModule
    ]
})
export class AddSeriesRankPageModule {}
