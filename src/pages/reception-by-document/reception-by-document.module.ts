import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ReceptionByDocumentPage } from "./reception-by-document";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [ReceptionByDocumentPage],
    imports: [
        IonicPageModule.forChild(ReceptionByDocumentPage),
        TranslateModule
    ]
})
export class ReceptionByDocumentPageModule {}
