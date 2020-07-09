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

        //Local
        //userCredentials.communicationAddress = "localhost:6661"  
        //Cealsa
        //userCredentials.communicationAddress = "http://192.168.0.5:6161"  
        //Ferco
        userCredentials.communicationAddress = "http://10.240.29.104:8099"  

        return this.api.login(userCredentials);

    }
}