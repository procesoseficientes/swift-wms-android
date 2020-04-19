import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MaterialInfoPage } from "./material-info";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";
@NgModule({
    declarations: [MaterialInfoPage],
    imports: [
        IonicPageModule.forChild(MaterialInfoPage),
        TranslateModule,
        PipesModule
    ]
})
export class MaterialInfoPageModule {}
