import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralReceptionSeriesPage } from './general-reception-series';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    GeneralReceptionSeriesPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralReceptionSeriesPage),
    TranslateModule
  ],
})
export class GeneralReceptionSeriesPageModule {}
