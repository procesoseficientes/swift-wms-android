import { Injectable } from "@angular/core";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import * as io from "socket.io-client";
import { Enums } from "../../enums/enums";
import { Subscription } from "rxjs/Subscription";
import { Subject } from "rxjs/Subject";
import { DataRequest } from "../../models/models";

@Injectable()
export class SocketProvider {
    public socket: SocketIOClient.Socket;
    public subjects: { [event: string]: Subject<any> };

    constructor(public settings: UserSettingsProvider) {
        const url: string =
            this.settings.userCredentials.communicationAddress || "";
        this.socket = io(url);
        this.configureListeners();
        this.subscribeToConnect();
        this.socket.connect();
    }

    public get socketIsConnected(): boolean {
        return this.socket.connected;
    }

    public configureListeners(): void {
        this.subjects = {};
        this.addListener(Enums.Socket.OwnEvents.Connect);
        this.addListener(Enums.Socket.Response.Handshake);
        this.addListener(Enums.Socket.Response.GetBroadcast);
        this.addListener(Enums.Socket.Response.GetBroadcastLost);
    }

    public addListener(event: string): void {
        let subject = new Subject<any>();

        this.socket.on(event, (data: any) => {
            subject.next(data);
        });

        this.subjects[event] = subject;
    }

    public subscribe<T>(
        event: string,
        handler: (data: T) => void
    ): Subscription {
        return (this.subjects[event] as Subject<T>).subscribe(handler);
    }

    public subscribeToConnect(): Subscription {
        return this.subscribe<any>(Enums.Socket.OwnEvents.Connect, () => {
            this.socket.emit(
                Enums.Socket.Request.GetBroadcastLost,
                DataRequest.Factory.getBroadcastLost(
                    this.settings.userCredentials
                )
            );
        });
    }
}
