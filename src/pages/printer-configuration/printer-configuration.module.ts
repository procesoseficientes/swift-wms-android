import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { PrinterConfigurationPage } from "./printer-configuration";
import { TranslateModule } from "@ngx-translate/core";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
    declarations: [PrinterConfigurationPage],
    imports: [
        IonicPageModule.forChild(PrinterConfigurationPage),
        TranslateModule,
        PipesModule
    ]
})
export class PrinterConfigurationPageModule {}
