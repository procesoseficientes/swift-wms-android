import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationSuggestionRelocatePartialPage } from './location-suggestion-relocate-partial';
import { ComponentModule } from '../../components/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationSuggestionRelocatePartialPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationSuggestionRelocatePartialPage),
    TranslateModule,
    ComponentModule
  ],
})
export class LocationSuggestionRelocatePartialPageModule {}
