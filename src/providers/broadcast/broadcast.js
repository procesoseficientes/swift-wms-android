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
const api_client_v3_1 = require("../api-client/api-client.v3");
const models_1 = require("../../models/models");
const user_settings_1 = require("../user-settings/user-settings");
const socket_api_1 = require("../socket-api/socket-api");
const enums_1 = require("../../enums/enums");
let BroadcastProvider = class BroadcastProvider {
    constructor(api, socketApi, settings) {
        this.api = api;
        this.socketApi = socketApi;
        this.settings = settings;
    }
    removeBroadcastTasksLost(broadcastTasks) {
        return Promise.all(this.generateListOfDeleteBroadcastTasksLost(broadcastTasks))
            .then(() => {
            return models_1.Model.Factory.createSuccessOperation();
        })
            .catch(error => {
            return models_1.Model.Factory.createFaultOperation({
                message: error.Mensaje,
                code: error.Codigo
            });
        });
    }
    removeBroadcast(broadcast) {
        return this.api.removeBroadcast(models_1.DataRequest.Factory.removeBroadcast(broadcast, this.settings.userCredentials));
    }
    generateListOfDeleteBroadcastTasksLost(broadcastTasks) {
        return broadcastTasks.map((broadcast) => {
            return this.removeBroadcast(broadcast);
        });
    }
    requestBroadcastTasksLost() {
        this.socketApi.socket.emit(enums_1.Enums.Socket.Request.GetBroadcastLost, models_1.DataRequest.Factory.getBroadcastLost(this.settings.userCredentials));
    }
};
BroadcastProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [api_client_v3_1.ApiClientV3Provider,
        socket_api_1.SocketApiProvider,
        user_settings_1.UserSettingsProvider])
], BroadcastProvider);
exports.BroadcastProvider = BroadcastProvider;
//# sourceMappingURL=broadcast.js.map