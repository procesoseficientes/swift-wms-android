import { Injectable } from "@angular/core";
import { TranslateProvider } from "../translate/translate";
import { HttpClient } from "@angular/common/http";
import { Enums } from "../../enums/enums";
import { Model } from "../../models/models";

@Injectable()
export class BaseProvider {
    constructor(
        protected translate: TranslateProvider,
        protected http: HttpClient
    ) {}

    public get<TResponse>(
        userCredentials: Model.UserCredentials,
        requestPath: string,
        resource: string = ""
    ): Promise<TResponse> {
        return this.http
            .get<TResponse>(
                `${userCredentials.communicationAddress}${requestPath}`,
                {
                    headers: {
                        Authorization: "Basic ZDRydGgtdjRkM3I6SW50ZWdyYS5zNHA="
                    }
                }
            )
            .toPromise()
            .catch((response: any) => {
                return this.processError(response, resource);
            });
    }

    public post<TResponse, TRequest extends Model.UserCredentials>(
        requestPath: string,
        requestBody: TRequest,
        resource: string = ""
    ): Promise<TResponse> {
        return this.http
            .post<TResponse>(
                `${requestBody.communicationAddress}${requestPath}`,
                requestBody,
                {
                    headers: {
                        Authorization: "Basic ZDRydGgtdjRkM3I6SW50ZWdyYS5zNHA="
                    }
                }
            )
            .toPromise()
            .catch(response => {
                return this.processError(response, resource);
            });
    }

    private processError(response: any, resource: string) {
        if (response.status && response.status != Enums.CustomErrorCodes.Ok)
            return this.translate
                .translateMessageFromErrorCode(response.status, resource)
                .then((message: string) => {
                    return Promise.reject(new Error(message));
                });

        return this.translate
            .translateMessageFromErrorCode(
                Enums.CustomErrorCodes.BadRequest,
                resource
            )
            .then((message: string) => {
                return Promise.reject(new Error(message));
            });
    }
}
