import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLicenseDispatchPage } from './search-license-dispatch';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchLicenseDispatchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLicenseDispatchPage),
    TranslateModule,
    ComponentModule,
    PipesModule
  ],
})
export class SearchLicenseDispatchPageModule {}
