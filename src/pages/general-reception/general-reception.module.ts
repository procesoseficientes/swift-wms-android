import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralReceptionPage } from './general-reception';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GeneralReceptionPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralReceptionPage),
    TranslateModule,
    ComponentModule
  ],
})
export class GeneralReceptionPageModule {}
