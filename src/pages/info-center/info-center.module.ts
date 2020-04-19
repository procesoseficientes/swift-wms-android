import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoCenterPage } from './info-center';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    InfoCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoCenterPage),
    TranslateModule,
    ComponentModule
  ],
})
export class InfoCenterPageModule {}
