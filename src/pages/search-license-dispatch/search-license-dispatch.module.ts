import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLicenseDispatchPage } from './search-license-dispatch';
import { TranslateModule } from "@ngx-translate/core";

import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchLicenseDispatchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLicenseDispatchPage),
    TranslateModule,
    PipesModule
  ],
})
export class SearchLicenseDispatchPageModule {}
