"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const socket_1 = require("../socket/socket");
const user_settings_1 = require("../user-settings/user-settings");
const enums_1 = require("../../enums/enums");
let SocketApiProvider = class SocketApiProvider extends socket_1.SocketProvider {
    constructor(userSettings) {
        super(userSettings);
    }
    handshakeWithServer(handler) {
        let subscription = this.subscribe(enums_1.Enums.Socket.Response.Handshake, handler);
        this.socket.emit(enums_1.Enums.Socket.Request.Handshake);
        return subscription;
    }
    listenToBroadcastTasksLost(handler) {
        return this.subscribe(enums_1.Enums.Socket.Response.GetBroadcastLost, (data) => {
            if (data && data.length > 0) {
                handler(data);
            }
        });
    }
    listenToBroadcast(handler) {
        return this.subscribe(enums_1.Enums.Socket.Response.GetBroadcast, (data) => {
            if (this.broadcastIsForMe(data)) {
                handler(data);
            }
        });
    }
    broadcastIsForMe(data) {
        return data.broadcast.loginId.trim() === this.settings.login.trim();
    }
};
SocketApiProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_settings_1.UserSettingsProvider])
], SocketApiProvider);
exports.SocketApiProvider = SocketApiProvider;
//# sourceMappingURL=socket-api.js.map