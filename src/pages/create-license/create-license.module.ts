import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateLicensePage } from './create-license';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    CreateLicensePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateLicensePage),
    TranslateModule
  ],
})
export class CreateLicensePageModule {}
