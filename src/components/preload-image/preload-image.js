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
const util_1 = require("ionic-angular/util/util");
let PreloadImage = class PreloadImage {
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = "";
        this._img = new Image();
    }
    set src(val) {
        this._src = util_1.isPresent(val) ? val : "";
    }
    set ratio(ratio) {
        this._ratio = ratio || null;
    }
    ngOnChanges(_changes) {
        let ratio_height = `${this._ratio.h / this._ratio.w * 100}%`;
        // Conserve aspect ratio (see: http://stackoverflow.com/a/10441480/1116959)
        this._renderer.setElementStyle(this._elementRef.nativeElement, "padding-bottom", ratio_height);
        this._update();
    }
    _update() {
        if (util_1.isPresent(this.alt)) {
            this._img.alt = this.alt;
        }
        if (util_1.isPresent(this.title)) {
            this._img.title = this.title;
        }
        this._img.addEventListener("load", () => {
            this._elementRef.nativeElement.appendChild(this._img);
            this._loaded(true);
        });
        this._img.src = this._src;
        this._loaded(false);
    }
    _loaded(isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? "add" : "remove"]("img-loaded");
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PreloadImage.prototype, "alt", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PreloadImage.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PreloadImage.prototype, "src", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], PreloadImage.prototype, "ratio", null);
PreloadImage = __decorate([
    core_1.Component({
        selector: "preload-image",
        templateUrl: "preload-image.html"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], PreloadImage);
exports.PreloadImage = PreloadImage;
//# sourceMappingURL=preload-image.js.map