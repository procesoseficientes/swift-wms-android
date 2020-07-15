import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PendingLocatePickingDispatchPage } from "./pending-locate-picking-dispatch";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
    declarations: [PendingLocatePickingDispatchPage],
    imports: [
        IonicPageModule.forChild(PendingLocatePickingDispatchPage),
        TranslateModule,
        PipesModule
    ]
})
export class PendingLocatePickingDispatchPageModule {}
