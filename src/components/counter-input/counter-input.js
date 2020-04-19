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
var CounterInput_1;
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const noop = () => { };
exports.counterRangeValidator = (maxValue, minValue) => {
    return (c) => {
        let err = {
            rangeError: {
                given: c.value,
                max: maxValue || 10,
                min: minValue || 0
            }
        };
        return c.value > +maxValue || c.value < +minValue ? err : null;
    };
};
let CounterInput = CounterInput_1 = class CounterInput {
    constructor() {
        this.propagateChange = noop;
        this.validateFn = noop;
        this._counterValue = 0;
    }
    get counterValue() {
        return this._counterValue;
    }
    set counterValue(val) {
        this._counterValue = val;
        this.propagateChange(val);
    }
    ngOnChanges(inputs) {
        if (inputs.counterRangeMax || inputs.counterRangeMin) {
            this.validateFn = exports.counterRangeValidator(this.counterRangeMax, this.counterRangeMin);
        }
    }
    writeValue(value) {
        if (value) {
            this.counterValue = value;
        }
    }
    registerOnChange(fn) {
        this.propagateChange = fn;
    }
    registerOnTouched() { }
    increase() {
        this.counterValue++;
    }
    decrease() {
        this.counterValue--;
    }
    validate(c) {
        return this.validateFn(c);
    }
};
__decorate([
    core_1.Input("counterValue"),
    __metadata("design:type", Object)
], CounterInput.prototype, "_counterValue", void 0);
__decorate([
    core_1.Input("max"),
    __metadata("design:type", Object)
], CounterInput.prototype, "counterRangeMax", void 0);
__decorate([
    core_1.Input("min"),
    __metadata("design:type", Object)
], CounterInput.prototype, "counterRangeMin", void 0);
CounterInput = CounterInput_1 = __decorate([
    core_1.Component({
        selector: "counter-input",
        templateUrl: "counter-input.html",
        host: {
            class: "counter-input"
        },
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(() => CounterInput_1),
                multi: true
            },
            {
                provide: forms_1.NG_VALIDATORS,
                useExisting: core_1.forwardRef(() => CounterInput_1),
                multi: true
            }
        ]
    })
], CounterInput);
exports.CounterInput = CounterInput;
//# sourceMappingURL=counter-input.js.map