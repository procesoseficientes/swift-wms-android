import { NgModule } from "@angular/core";
import { IonicPageModule } from "ionic-angular";
import { LocateLicenseDispatch } from "./locate-license-dispatch";
import { ComponentModule } from "../../components/components.module";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    declarations: [LocateLicenseDispatch],
    imports: [
        IonicPageModule.forChild(LocateLicenseDispatch),
        TranslateModule,
        ComponentModule
    ]
})
export class LocateLicenseDispatchPageModule {}
