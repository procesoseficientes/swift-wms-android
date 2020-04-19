import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StartSessionPage } from "./start-session";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";

@NgModule({
    declarations: [StartSessionPage],
    imports: [
        IonicPageModule.forChild(StartSessionPage),
        TranslateModule,
        ComponentModule,
    ]
})
export class StartSessionPageModule {}
