import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationSuggestionFullRelocationPage } from './location-suggestion-full-relocation'
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
  declarations: [
    LocationSuggestionFullRelocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationSuggestionFullRelocationPage),
    TranslateModule,
    ComponentModule,
  ],
})
export class LocationSuggestionFullRelocationPageModule {}
