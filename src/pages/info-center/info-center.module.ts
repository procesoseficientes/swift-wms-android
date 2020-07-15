import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoCenterPage } from './info-center';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    InfoCenterPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoCenterPage),
    TranslateModule
  ],
})
export class InfoCenterPageModule {}
