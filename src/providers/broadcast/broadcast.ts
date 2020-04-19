import { Injectable } from "@angular/core";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataRequest, Model } from "../../models/models";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { SocketApiProvider } from "../socket-api/socket-api";
import { Enums } from "../../enums/enums";

@Injectable()
export class BroadcastProvider {
    constructor(
        protected api: ApiClientV3Provider,
        private socketApi: SocketApiProvider,
        private settings: UserSettingsProvider
    ) {}

    public removeBroadcastTasksLost(
        broadcastTasks: Array<Model.Broadcast>
    ): Promise<Model.Operation> {
        return Promise.all(
            this.generateListOfDeleteBroadcastTasksLost(broadcastTasks)
        )
            .then(() => {
                return Model.Factory.createSuccessOperation();
            })
            .catch(error => {
                return Model.Factory.createFaultOperation({
                    message: error.Mensaje,
                    code: error.Codigo
                });
            });
    }

    public removeBroadcast(
        broadcast: Model.Broadcast
    ): Promise<Model.Operation> {
        return this.api.removeBroadcast(
            DataRequest.Factory.removeBroadcast(
                broadcast,
                this.settings.userCredentials
            )
        );
    }

    public generateListOfDeleteBroadcastTasksLost(
        broadcastTasks: Array<Model.Broadcast>
    ): Array<Promise<Model.Operation>> {
        return broadcastTasks.map((broadcast: Model.Broadcast) => {
            return this.removeBroadcast(broadcast);
        });
    }

    public requestBroadcastTasksLost(): void {
        this.socketApi.socket.emit(
            Enums.Socket.Request.GetBroadcastLost,
            DataRequest.Factory.getBroadcastLost(this.settings.userCredentials)
        );
    }
}
