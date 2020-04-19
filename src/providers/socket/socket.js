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
const user_settings_1 = require("../../providers/user-settings/user-settings");
const io = require("socket.io-client");
const enums_1 = require("../../enums/enums");
const Subject_1 = require("rxjs/Subject");
const models_1 = require("../../models/models");
let SocketProvider = class SocketProvider {
    constructor(settings) {
        this.settings = settings;
        const url = this.settings.userCredentials.communicationAddress || "";
        this.socket = io(url);
        this.configureListeners();
        this.subscribeToConnect();
        this.socket.connect();
    }
    get socketIsConnected() {
        return this.socket.connected;
    }
    configureListeners() {
        this.subjects = {};
        this.addListener(enums_1.Enums.Socket.OwnEvents.Connect);
        this.addListener(enums_1.Enums.Socket.Response.Handshake);
        this.addListener(enums_1.Enums.Socket.Response.GetBroadcast);
        this.addListener(enums_1.Enums.Socket.Response.GetBroadcastLost);
    }
    addListener(event) {
        let subject = new Subject_1.Subject();
        this.socket.on(event, (data) => {
            subject.next(data);
        });
        this.subjects[event] = subject;
    }
    subscribe(event, handler) {
        return this.subjects[event].subscribe(handler);
    }
    subscribeToConnect() {
        return this.subscribe(enums_1.Enums.Socket.OwnEvents.Connect, () => {
            this.socket.emit(enums_1.Enums.Socket.Request.GetBroadcastLost, models_1.DataRequest.Factory.getBroadcastLost(this.settings.userCredentials));
        });
    }
};
SocketProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [user_settings_1.UserSettingsProvider])
], SocketProvider);
exports.SocketProvider = SocketProvider;
//# sourceMappingURL=socket.js.map