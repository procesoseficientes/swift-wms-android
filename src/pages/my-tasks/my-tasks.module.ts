import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MyTasksPage } from "./my-tasks";
import { TranslateModule } from "@ngx-translate/core";

import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [MyTasksPage],
    imports: [
        IonicPageModule.forChild(MyTasksPage),
        TranslateModule,
        PipesModule
    ]
})
export class MyTasksPageModule {}
