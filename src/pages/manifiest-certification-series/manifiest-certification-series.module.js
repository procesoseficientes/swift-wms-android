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
const manifiest_certification_series_1 = require("./manifiest-certification-series");
const core_2 = require("@ngx-translate/core");
const pipes_module_1 = require("../../pipes/pipes.module");
let ManifiestCertificationSeriesPageModule = class ManifiestCertificationSeriesPageModule {
};
ManifiestCertificationSeriesPageModule = __decorate([
    core_1.NgModule({
        declarations: [manifiest_certification_series_1.ManifiestCertificationSeriesPage],
        imports: [
            ionic_angular_1.IonicPageModule.forChild(manifiest_certification_series_1.ManifiestCertificationSeriesPage),
            core_2.TranslateModule,
            pipes_module_1.PipesModule
        ]
    })
], ManifiestCertificationSeriesPageModule);
exports.ManifiestCertificationSeriesPageModule = ManifiestCertificationSeriesPageModule;
//# sourceMappingURL=manifiest-certification-series.module.js.map