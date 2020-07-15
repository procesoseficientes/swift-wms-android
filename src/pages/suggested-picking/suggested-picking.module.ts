import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { SuggestedPickingPage } from "./suggested-picking";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    SuggestedPickingPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestedPickingPage),
    TranslateModule,
]
})
export class SuggestedPickingPageModule {}
