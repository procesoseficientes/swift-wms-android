import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocationInfoPage } from "./location-info";
import { ComponentModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [LocationInfoPage],
    imports: [
        IonicPageModule.forChild(LocationInfoPage),
        TranslateModule,
        ComponentModule,
        PipesModule
    ]
})
export class LocationInfoPageModule {}
