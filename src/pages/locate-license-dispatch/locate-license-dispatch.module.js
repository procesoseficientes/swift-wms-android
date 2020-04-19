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
const locate_license_dispatch_1 = require("./locate-license-dispatch");
const components_module_1 = require("../../components/components.module");
const core_2 = require("@ngx-translate/core");
let LocateLicenseDispatchPageModule = class LocateLicenseDispatchPageModule {
};
LocateLicenseDispatchPageModule = __decorate([
    core_1.NgModule({
        declarations: [locate_license_dispatch_1.LocateLicenseDispatch],
        imports: [
            ionic_angular_1.IonicPageModule.forChild(locate_license_dispatch_1.LocateLicenseDispatch),
            core_2.TranslateModule,
            components_module_1.ComponentModule
        ]
    })
], LocateLicenseDispatchPageModule);
exports.LocateLicenseDispatchPageModule = LocateLicenseDispatchPageModule;
//# sourceMappingURL=locate-license-dispatch.module.js.map