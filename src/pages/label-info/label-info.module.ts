import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LabelInfoPage } from "./label-info";

import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [LabelInfoPage],
    imports: [
        IonicPageModule.forChild(LabelInfoPage),
        TranslateModule,
        PipesModule
    ]
})
export class LabelInfoPageModule {}
