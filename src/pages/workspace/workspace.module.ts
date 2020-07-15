import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WorkspacePage } from './workspace';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    WorkspacePage,
  ],
  imports: [
    IonicPageModule.forChild(WorkspacePage),
    TranslateModule
  ],
})
export class WorkspacePageModule {}
