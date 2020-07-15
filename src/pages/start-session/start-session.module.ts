import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { StartSessionPage } from "./start-session";
import { TranslateModule } from "@ngx-translate/core";


@NgModule({
    declarations: [StartSessionPage],
    imports: [
        IonicPageModule.forChild(StartSessionPage),
        TranslateModule,
    ]
})
export class StartSessionPageModule {}
