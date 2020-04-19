"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
let ColorRadio = class ColorRadio {
    constructor(el, renderer) {
        this.el = el;
        this.renderer = renderer;
    }
    setColor(color) {
        this.renderer.setElementStyle(this.el.nativeElement, "backgroundColor", color);
        this.renderer.setElementStyle(this.el.nativeElement, "borderColor", color);
    }
    ngOnInit() {
        this.setColor(this.color);
    }
};
__decorate([
    core_1.Input("color-radio"),
    __metadata("design:type", String)
], ColorRadio.prototype, "color", void 0);
ColorRadio = __decorate([
    core_1.Directive({
        selector: "[color-radio]"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], ColorRadio);
exports.ColorRadio = ColorRadio;
//# sourceMappingURL=color-radio.js.map