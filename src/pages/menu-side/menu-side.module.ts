import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuSidePage } from './menu-side';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    MenuSidePage,
  ],
  imports: [
    IonicPageModule.forChild(MenuSidePage),
    TranslateModule
  ],
})
export class MenuSidePageModule {}
