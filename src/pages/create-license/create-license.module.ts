import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateLicensePage } from './create-license';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    CreateLicensePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateLicensePage),
    TranslateModule,
    ComponentModule
  ],
})
export class CreateLicensePageModule {}
