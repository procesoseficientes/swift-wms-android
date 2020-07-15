import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationSuggestionReceptionPage } from './location-suggestion-reception'
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    LocationSuggestionReceptionPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationSuggestionReceptionPage),
    TranslateModule,
  ],
})
export class LocationSuggestionReceptionPageModule {}
