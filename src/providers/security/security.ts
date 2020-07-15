import { Injectable } from "@angular/core";
import { DataResponse, DataRequest } from "../../models/models";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { File } from '@ionic-native/file';

@Injectable()
export class SecurityProvider {
    constructor(private api: ApiClientV3Provider, private file: File) {}

    public async validateCredentials(
        userCredentials: DataRequest.Login
    ): Promise<DataResponse.Login> {
        /*let userInfo: Model.UserConnectionInfo = await this.api.validateCredentials(
            userCredentials
        );
        userCredentials.communicationAddress = userInfo.CommunicationAddress;
        */
       
        //Local
        userCredentials.communicationAddress = "localhost:6661"  
        //Cealsa
        userCredentials.communicationAddress = "http://192.168.0.5:6161"  
        //Ferco
        // userCredentials.communicationAddress = "http://200.124.156.117:8099"  

        //API LICENE
        //userCredentials.communicationAddress = "http://mobilitywebapi.centralus.cloudapp.azure.com:1025"
        this.file.checkDir(this.file.externalApplicationStorageDirectory, 'mydir').then(_ => console.log('Directory exists')).catch(err => console.log('Directory doesn\'t exist'));
        this.file.writeFile(this.file.externalApplicationStorageDirectory, 'conf.json', '{"test":"test"}', {replace: true})
        console.log(this.file.externalApplicationStorageDirectory)
        return this.api.login(userCredentials);

    }
}