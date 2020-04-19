import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { ReceptionByDocumentPage } from "./reception-by-document";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [ReceptionByDocumentPage],
    imports: [
        IonicPageModule.forChild(ReceptionByDocumentPage),
        TranslateModule,
        ComponentModule
    ]
})
export class ReceptionByDocumentPageModule {}
