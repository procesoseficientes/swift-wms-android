import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BlankPage } from './blank';

@NgModule({
  declarations: [
    BlankPage,
  ],
  imports: [
    IonicPageModule.forChild(BlankPage),
  ],
})
export class BlankPageModule {}
