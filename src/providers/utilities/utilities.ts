import { Injectable } from "@angular/core";
import * as _ from "lodash";

/*
  Generated class for the UtilitiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilitiesProvider {
    constructor() {}

    public subtract(minuend: number, subtrahend: number): number {
        return _.round(minuend - subtrahend, 2);
    }

    public addition(addend1: number, addend2: number): number {
        return _.round(addend1 + addend2, 2);
    }

    public multiply(facto1: number, facto2: number): number {
        return _.round(facto1 * facto2, 2);
    }

    public division(dividend: number, quotient: number): number {
        return _.round(dividend / quotient, 2);
    }

    public static getToken(): string {
        return Math.random()
            .toString(36)
            .substring(7);
    }
}
