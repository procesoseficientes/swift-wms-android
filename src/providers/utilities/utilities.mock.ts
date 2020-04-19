import { Injectable } from "@angular/core";

@Injectable()
export class UtilitiesProvider {
    subtract(_minuend: number, _subtrahend: number): any /* number */ {}
    addition(_addend1: number, _addend2: number): any /* number */ {}
    multiply(_facto1: number, _facto2: number): any /* number */ {}
    division(_dividend: number, _quotient: number): any /* number */ {}
    getToken(): any /* string */ {}
}
