"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const Component = require("./components");
const custom_toast_1 = require("./custom-toast/custom-toast");
let ComponentModule = class ComponentModule {
};
ComponentModule = __decorate([
    core_1.NgModule({
        declarations: [
            Component.BackgroundImage,
            Component.ColorRadio,
            Component.CounterInput,
            Component.GoogleMap,
            Component.PreloadImage,
            Component.Rating,
            Component.ShowHideInput,
            Component.ShowHideContainer,
            custom_toast_1.CustomToastComponent
        ],
        imports: [common_1.CommonModule],
        exports: [
            Component.BackgroundImage,
            Component.ColorRadio,
            Component.CounterInput,
            Component.GoogleMap,
            Component.PreloadImage,
            Component.Rating,
            Component.ShowHideInput,
            Component.ShowHideContainer,
            custom_toast_1.CustomToastComponent
        ],
        schemas: [core_1.CUSTOM_ELEMENTS_SCHEMA]
    })
], ComponentModule);
exports.ComponentModule = ComponentModule;
//# sourceMappingURL=components.module.js.map