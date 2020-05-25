import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import * as Component from "./components";
import { CustomToastComponent } from "./custom-toast/custom-toast";

@NgModule({
    declarations: [
        Component.BackgroundImage,
        Component.ColorRadio,
        Component.CounterInput,
        Component.PreloadImage,
        Component.Rating,
        Component.ShowHideInput,
        Component.ShowHideContainer,
        CustomToastComponent
    ],
    imports: [CommonModule],
    exports: [
        Component.BackgroundImage,
        Component.ColorRadio,
        Component.CounterInput,
        Component.PreloadImage,
        Component.Rating,
        Component.ShowHideInput,
        Component.ShowHideContainer,
        CustomToastComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentModule {}
