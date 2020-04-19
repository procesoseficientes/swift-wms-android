"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const process_general_picking_1 = require("./process-general-picking");
const core_2 = require("@ngx-translate/core");
const components_module_1 = require("../../components/components.module");
const pipes_module_1 = require("../../pipes/pipes.module");
let ProcessGeneralPickingPagePageModule = class ProcessGeneralPickingPagePageModule {
};
ProcessGeneralPickingPagePageModule = __decorate([
    core_1.NgModule({
        declarations: [process_general_picking_1.ProcessGeneralPickingPage],
        imports: [
            ionic_angular_1.IonicPageModule.forChild(process_general_picking_1.ProcessGeneralPickingPage),
            core_2.TranslateModule,
            components_module_1.ComponentModule,
            pipes_module_1.PipesModule
        ]
    })
], ProcessGeneralPickingPagePageModule);
exports.ProcessGeneralPickingPagePageModule = ProcessGeneralPickingPagePageModule;
//# sourceMappingURL=process-general-picking.module.js.map