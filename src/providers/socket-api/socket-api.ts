import { Injectable } from "@angular/core";
import { SocketProvider } from "../socket/socket";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { Subscription } from "rxjs/Subscription";
import { Enums } from "../../enums/enums";
import { Model } from "../../models/models";

@Injectable()
export class SocketApiProvider extends SocketProvider {
    constructor(userSettings: UserSettingsProvider) {
        super(userSettings);
    }

    handshakeWithServer(
        handler: (data: Model.Broadcast) => void
    ): Subscription {
        let subscription = this.subscribe<Model.Broadcast>(
            Enums.Socket.Response.Handshake,
            handler
        );
        this.socket.emit(Enums.Socket.Request.Handshake);
        return subscription;
    }

    listenToBroadcastTasksLost(
        handler: (data: Array<Model.Broadcast>) => void
    ): Subscription {
        return this.subscribe<Array<Model.Broadcast>>(
            Enums.Socket.Response.GetBroadcastLost,
            (data: Array<Model.Broadcast>) => {
                if (data && data.length > 0) {
                    handler(data);
                }
            }
        );
    }

    listenToBroadcast(
        handler: (data: Model.BroadcastFromServer) => void
    ): Subscription {
        return this.subscribe<Model.BroadcastFromServer>(
            Enums.Socket.Response.GetBroadcast,
            (data: Model.BroadcastFromServer) => {
                if (this.broadcastIsForMe(data)) {
                    handler(data);
                }
            }
        );
    }

    public broadcastIsForMe(data: Model.BroadcastFromServer): boolean {
        return data.broadcast.loginId.trim() === this.settings.login.trim();
    }
}
