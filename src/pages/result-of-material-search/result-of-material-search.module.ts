import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ResultOfMaterialSearchPage } from "./result-of-material-search";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [ResultOfMaterialSearchPage],
    imports: [
        IonicPageModule.forChild(ResultOfMaterialSearchPage),
        TranslateModule,
        PipesModule,
        ComponentModule
    ]
})
export class ResultOfMaterialSearchPageModule {}
