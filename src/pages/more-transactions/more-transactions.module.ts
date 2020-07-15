import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoreTransactionsPage } from './more-transactions';
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
  declarations: [
    MoreTransactionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MoreTransactionsPage),
    TranslateModule
  ],
})
export class MoreTransactionsPageModule {}
