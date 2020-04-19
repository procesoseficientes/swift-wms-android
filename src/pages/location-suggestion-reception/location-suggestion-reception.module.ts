import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationSuggestionReceptionPage } from './location-suggestion-reception'
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
  declarations: [
    LocationSuggestionReceptionPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationSuggestionReceptionPage),
    TranslateModule,
    ComponentModule,
  ],
})
export class LocationSuggestionReceptionPageModule {}
