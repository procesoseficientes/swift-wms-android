import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { AddSeriesRankPage } from "./add-series-rank";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [AddSeriesRankPage],
    imports: [
        IonicPageModule.forChild(AddSeriesRankPage),
        TranslateModule
    ]
})
export class AddSeriesRankPageModule {}
