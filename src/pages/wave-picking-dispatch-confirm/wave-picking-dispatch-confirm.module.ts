import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WavePickingDispatchConfirmPage } from './wave-picking-dispatch-confirm';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    WavePickingDispatchConfirmPage,
  ],
  imports: [
    IonicPageModule.forChild(WavePickingDispatchConfirmPage),
    TranslateModule
  ],
})
export class WavePickingDispatchConfirmPageModule {}
