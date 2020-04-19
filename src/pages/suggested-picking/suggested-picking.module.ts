import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SuggestedPickingPage } from "./suggested-picking";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
  declarations: [
    SuggestedPickingPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestedPickingPage),
    TranslateModule,
    ComponentModule,
]
})
export class SuggestedPickingPageModule {}
