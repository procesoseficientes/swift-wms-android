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
let BackgroundImage = class BackgroundImage {
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._src = "";
    }
    set src(val) {
        this._src = util_1.isPresent(val) ? val : "";
    }
    ngOnChanges(_changes) {
        this._update();
    }
    _update() {
        let img = new Image();
        img.addEventListener("load", () => {
            this._elementRef.nativeElement.style.backgroundImage = `url(${this.src})`;
            this._loaded(true);
        });
        img.src = this._src;
        this._loaded(false);
    }
    _loaded(isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? "add" : "remove"]("img-loaded");
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], BackgroundImage.prototype, "class", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], BackgroundImage.prototype, "src", null);
BackgroundImage = __decorate([
    core_1.Component({
        selector: "background-image",
        templateUrl: "background-image.html"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.Renderer])
], BackgroundImage);
exports.BackgroundImage = BackgroundImage;
//# sourceMappingURL=background-image.js.map