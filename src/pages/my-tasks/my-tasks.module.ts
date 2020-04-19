import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { MyTasksPage } from "./my-tasks";
import { TranslateModule } from "@ngx-translate/core";
import { ComponentModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [MyTasksPage],
    imports: [
        IonicPageModule.forChild(MyTasksPage),
        TranslateModule,
        ComponentModule,
        PipesModule
    ]
})
export class MyTasksPageModule {}
