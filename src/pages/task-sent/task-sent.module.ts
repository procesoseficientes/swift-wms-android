import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { TaskSentPage } from "./task-sent";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [TaskSentPage],
    imports: [
        IonicPageModule.forChild(TaskSentPage),
        TranslateModule,
        ComponentModule,
        PipesModule
    ]
})
export class TaskSentPageModule {}
