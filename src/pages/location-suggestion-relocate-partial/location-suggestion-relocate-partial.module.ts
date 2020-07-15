import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationSuggestionRelocatePartialPage } from './location-suggestion-relocate-partial';

import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    LocationSuggestionRelocatePartialPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationSuggestionRelocatePartialPage),
    TranslateModule
  ],
})
export class LocationSuggestionRelocatePartialPageModule {}
