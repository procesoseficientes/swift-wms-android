import { Injectable } from "@angular/core";
import { Enums } from "../../enums/enums";

@Injectable()
export class TranslateProvider {
    translateGroup(_group: Enums.Translation.Groups): any /* Promise<any> */ {}
    translateGroupValue(
        _group: Enums.Translation.Groups,
        _groupValue: string
    ): any /* Promise<string> */ {
        return Promise.resolve(`${_group}.${_groupValue}`);
    }
    translateEntityMessageFromServerErrorCode(
        _code: Enums.CustomErrorCodes,
        _resource: string,
        _plural: boolean
    ): any /* Promise<string> */ {
        return Promise.resolve(
            `API error (${_code}): ${_resource}(resource) ${_plural}(plural)`
        );
    }
    translateMessageFromErrorCode(
        _code: Enums.CustomErrorCodes,
        _resource: string
    ): any /* Promise<any> */ {
        return Promise.resolve(`API error (${_code}): ${_resource}(resource)`);
    }
}
