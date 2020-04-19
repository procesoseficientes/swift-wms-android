import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModifyMaterialPropertiesPage } from './modify-material-properties';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ModifyMaterialPropertiesPage,
  ],
  imports: [
    IonicPageModule.forChild(ModifyMaterialPropertiesPage),
    TranslateModule,
    ComponentModule
  ],
})
export class ModifyMaterialPropertiesPageModule {}
