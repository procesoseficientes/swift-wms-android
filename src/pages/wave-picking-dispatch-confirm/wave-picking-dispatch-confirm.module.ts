import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WavePickingDispatchConfirmPage } from './wave-picking-dispatch-confirm';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WavePickingDispatchConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(WavePickingDispatchConfirmPage),
    TranslateModule,
    ComponentModule
  ],
})
export class WavePickingDispatchConfirmPageModule {}
