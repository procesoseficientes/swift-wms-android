export class devModeEqual {}

export class WrappedValue {
    wrapped: any;

    wrap(_value: any): any /* WrappedValue */
    {}
}

export class ValueUnwrapper {
    hasWrappedValue: boolean;

    unwrap(_value: any): any /* any */
    {}
    reset(): any /* void */
    {}
}

export class SimpleChange {
    previousValue: any;
    currentValue: any;
    firstChange: boolean;

    isFirstChange(): any /* boolean */
    {}
}

export class isListLikeIterable {}

export class areIterablesEqual {}

export class iterateListLike {}

export class isJsObject {}
