import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TaskSentPage } from "./task-sent";
import { TranslateModule } from "@ngx-translate/core";

import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [TaskSentPage],
    imports: [
        IonicPageModule.forChild(TaskSentPage),
        TranslateModule,
        PipesModule
    ]
})
export class TaskSentPageModule {}
