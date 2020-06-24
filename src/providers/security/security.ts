import { Injectable } from "@angular/core";
import { DataResponse, DataRequest } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";

@Injectable()
export class SecurityProvider {
    constructor(private api: ApiClientV3Provider) {}

    public async validateCredentials(
        userCredentials: DataRequest.Login
    ): Promise<DataResponse.Login> {
        /*
        let userInfo: Model.UserConnectionInfo = await this.api.validateCredentials(
            userCredentials
        );
        userCredentials.communicationAddress = userInfo.CommunicationAddress;
        */ 
        userCredentials.communicationAddress = "http://10.240.29.104:8099"  
        return this.api.login(userCredentials);
    }
}