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
<<<<<<< HEAD
        // userCredentials.communicationAddress = "localhost:6661"  
=======
        userCredentials.communicationAddress = "http://localhost:6661"  
>>>>>>> 6ecb0392da6b1e97504bc8d6d1968faa1535e975
        //Cealsa
        //userCredentials.communicationAddress = "http://192.168.0.5:6161"  
        //Ferco
        userCredentials.communicationAddress = "http://200.124.156.117:8099"
        //Arium
        // userCredentials.communicationAddress = "http://200.124.156.117:8099"



        //API LICENE
        //userCredentials.communicationAddress = "http://mobilitywebapi.centralus.cloudapp.azure.com:1025"
        this.file.checkFile(this.file.externalApplicationStorageDirectory, 'conf.json').then(
            _ => {
                console.log('conf exists')
                this.file.readAsText(this.file.externalApplicationStorageDirectory, 'conf.json').then(val => {
                    console.log(val)
                    const conf = JSON.parse(val)
                    userCredentials.communicationAddress = conf.url                                        
                }).catch(err => {
                    console.error(err)
                    throw err
                })
            }).catch(err => {
                console.error('conf doesn\'t exist', err)
                throw "No hay archivo de configuración en el telefono"
            }
        );
        //this.file.writeFile(this.file.externalApplicationStorageDirectory, 'conf.json', '{"url":"http://192.168.0.5:6161"}', {replace: true})
        //console.log(this.file.externalApplicationStorageDirectory)
        return this.api.login(userCredentials);

    }
}