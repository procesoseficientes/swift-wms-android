import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralReceptionPage } from './general-reception';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    GeneralReceptionPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralReceptionPage),
    TranslateModule
  ],
})
export class GeneralReceptionPageModule {}
