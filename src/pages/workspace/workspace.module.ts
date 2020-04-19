import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkspacePage } from './workspace';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    WorkspacePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkspacePage),
    TranslateModule,
    ComponentModule
  ],
})
export class WorkspacePageModule {}
