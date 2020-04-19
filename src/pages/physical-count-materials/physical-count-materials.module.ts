import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PhysicalCountMaterialsPage } from "./physical-count-materials";
import { PipesModule } from "../../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [PhysicalCountMaterialsPage],
    imports: [
        IonicPageModule.forChild(PhysicalCountMaterialsPage),
        TranslateModule,
        PipesModule
    ]
})
export class PhysicalCountMaterialsPageModule {}
