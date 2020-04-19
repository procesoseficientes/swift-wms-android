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
let GoogleMap = class GoogleMap {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
        this._mapOptions = {
            zoom: 15
        };
        this.$mapReady = new core_1.EventEmitter();
        this._mapIdledOnce = false;
    }
    set options(val) {
        if (util_1.isPresent(val)) {
            this._mapOptions = val;
        }
    }
    ngOnInit() {
        this.initMap();
    }
    initMap() {
        this._el = this._elementRef.nativeElement;
        this._map = new google.maps.Map(this._el, this._mapOptions);
        // Workarround for init method: try to catch the first idel event after the map cretion (this._mapIdledOnce). The following idle events don't matter.
        let _ready_listener = this._map.addListener("idle", () => {
            if (!this._mapIdledOnce) {
                this.$mapReady.emit(this._map);
                this._mapIdledOnce = true;
                // Stop listening to event, the map is ready
                google.maps.event.removeListener(_ready_listener);
            }
        });
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], GoogleMap.prototype, "options", null);
GoogleMap = __decorate([
    core_1.Component({
        selector: "google-map",
        template: ""
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], GoogleMap);
exports.GoogleMap = GoogleMap;
//# sourceMappingURL=google-map.js.map