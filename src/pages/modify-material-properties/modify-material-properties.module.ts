import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyMaterialPropertiesPage } from './modify-material-properties';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    ModifyMaterialPropertiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyMaterialPropertiesPage),
    TranslateModule
  ],
})
export class ModifyMaterialPropertiesPageModule {}
