import { Injectable } from "@angular/core";

@Injectable()
export class BaseProvider {
    get(
        _requestPath: string,
        _resource: string
    ): any /* Promise<TResponse> */ {}
    post<TRequest>(
        _requestPath: string,
        _body: TRequest,
        _resource: string
    ): any /* Promise<TResponse> */ {}
}
