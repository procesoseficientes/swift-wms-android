import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PhysicalCountPage } from "./physical-count";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [PhysicalCountPage],
    imports: [
        IonicPageModule.forChild(PhysicalCountPage),
        TranslateModule,
        PipesModule
    ]
})
export class PhysicalCountPageModule {}
