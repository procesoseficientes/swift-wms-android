"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
// Video stuff
const core_2 = require("videogular2/core");
const controls_1 = require("videogular2/controls");
const overlay_play_1 = require("videogular2/overlay-play");
const buffering_1 = require("videogular2/buffering");
let VideoPlayerModule = class VideoPlayerModule {
};
VideoPlayerModule = __decorate([
    core_1.NgModule({
        exports: [
            core_2.VgCoreModule,
            controls_1.VgControlsModule,
            overlay_play_1.VgOverlayPlayModule,
            buffering_1.VgBufferingModule
        ]
    })
], VideoPlayerModule);
exports.VideoPlayerModule = VideoPlayerModule;
//# sourceMappingURL=video-player.module.js.map