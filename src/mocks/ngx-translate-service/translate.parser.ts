export class TranslateParser {
    interpolate(_expr: string | Function, _params: any): any /* string */
    {}
    getValue(_target: any, _key: string): any /* any */
    {}
}

export class TranslateDefaultParser {
    templateMatcher: RegExp;

    interpolate(_expr: string | Function, _params: any): any /* string */
    {}
    getValue(_target: any, _key: string): any /* any */
    {}
    interpolateFunction(_fn: any, _params: any): any /*  */
    {}
    interpolateString(_expr: any, _params: any): any /*  */
    {}
}
