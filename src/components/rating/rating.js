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
const forms_1 = require("@angular/forms");
const noop = () => { };
exports.RATING_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => Rating),
    multi: true
};
let Rating = class Rating {
    constructor() {
        this.max = 5;
        this.readOnly = false;
        this.propagateChange = noop;
    }
    ngOnInit() {
        let states = [];
        for (let i = 0; i < this.max; i++) {
            if (this.innerValue > i && this.innerValue < i + 1) {
                states[i] = 2;
            }
            else if (this.innerValue > i) {
                states[i] = 1;
            }
            else {
                states[i] = 0;
            }
        }
        this.range = states;
    }
    get value() {
        return this.innerValue;
    }
    set value(val) {
        if (val !== this.innerValue) {
            this.innerValue = val;
            this.propagateChange(val);
        }
    }
    writeValue(value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    rate(amount) {
        if (!this.readOnly && amount >= 0 && amount <= this.range.length) {
            this.value = amount;
        }
    }
};
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], Rating.prototype, "max", void 0);
__decorate([
    core_1.Input("read-only"),
    __metadata("design:type", Object)
], Rating.prototype, "readOnly", void 0);
Rating = __decorate([
    core_1.Component({
        selector: "rating",
        templateUrl: "rating.html",
        providers: [exports.RATING_CONTROL_VALUE_ACCESSOR]
    })
], Rating);
exports.Rating = Rating;
//# sourceMappingURL=rating.js.map