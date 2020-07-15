import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ExplodeMasterPackPage } from "./explode-master-pack";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [ExplodeMasterPackPage],
    imports: [
        IonicPageModule.forChild(ExplodeMasterPackPage),
        TranslateModule
    ]
})
export class ExplodeMasterPackPageModule {}
