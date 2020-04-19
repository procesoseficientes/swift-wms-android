import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreTransactionsPage } from './more-transactions';
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from '../../components/components.module';

@NgModule({
  declarations: [
    MoreTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreTransactionsPage),
    TranslateModule,
    ComponentModule
  ],
})
export class MoreTransactionsPageModule {}
