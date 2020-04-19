import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuSidePage } from './menu-side';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MenuSidePage,
  ],
  imports: [
    IonicPageModule.forChild(MenuSidePage),
    TranslateModule,
    ComponentModule
  ],
})
export class MenuSidePageModule {}
