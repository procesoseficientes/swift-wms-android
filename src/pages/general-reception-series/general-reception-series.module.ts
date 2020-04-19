import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralReceptionSeriesPage } from './general-reception-series';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    GeneralReceptionSeriesPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralReceptionSeriesPage),
    TranslateModule,
    ComponentModule
  ],
})
export class GeneralReceptionSeriesPageModule {}
