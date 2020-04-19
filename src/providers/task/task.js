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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const Models = require("../../models/models");
const _ = require("lodash");
const ionic_angular_1 = require("ionic-angular");
const translate_1 = require("../translate/translate");
const user_settings_1 = require("../../providers/user-settings/user-settings");
const api_client_v3_1 = require("../api-client/api-client.v3");
let TaskProvider = class TaskProvider {
    constructor(events, translate, api, userSetting) {
        this.events = events;
        this.translate = translate;
        this.api = api;
        this.userSetting = userSetting;
    }
    getAssignedTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            let tasks = yield this.api.getAssignedTasks(this.userSetting.userCredentials);
            let request = Models.DataRequest.Factory.createGetMyCoutingTaskRequest(this.userSetting.userCredentials);
            let countTasks = yield this.api.getMyCountingTask(request);
            countTasks.forEach((countTask) => {
                let task = {
                    id: countTask.TASK_ID,
                    regime: countTask.REGIMEN,
                    priority: countTask.PRIORITY,
                    assignedDate: countTask.ASSIGNED_DATE,
                    taskType: countTask.TASK_TYPE
                };
                tasks.push(task);
            });
            let groupedTasks = this.getTaskHeaders(tasks);
            return Promise.resolve(groupedTasks);
        });
    }
    getTaskHeaders(tasks) {
        _.each(tasks, (task) => {
            if (!task.wavePickingId) {
                task.wavePickingId = task.id;
            }
        });
        let taskHeaders = _.map(tasks, (task) => {
            let taskCreate = Models.Model.Factory.createTask();
            taskCreate.wavePickingId = task.wavePickingId;
            taskCreate.clientOwner = task.clientOwner;
            taskCreate.clientName = task.clientName;
            taskCreate.priority = task.priority;
            taskCreate.taskType = task.taskType;
            taskCreate.taskSubtype = task.taskSubtype;
            taskCreate.sourcePolicyCode = task.sourcePolicyCode;
            taskCreate.targetPolicyCode = task.targetPolicyCode;
            taskCreate.regime = task.regime;
            taskCreate.assignedDate = task.assignedDate;
            taskCreate.projectId = task.projectId;
            taskCreate.projectCode = task.projectCode;
            taskCreate.projectName = task.projectName;
            taskCreate.projectShortName = task.projectShortName;
            taskCreate.reference = task.reference;
            return taskCreate;
        });
        let taskGrouped = _.map(_.groupBy(taskHeaders, "wavePickingId"), task => {
            return _.first(task);
        });
        return _.orderBy(taskGrouped, ["priority", "assignedDate"], ["desc", "asc"]);
    }
    getFirstPickingTaskByPickingId(request) {
        return this.api.getFirstTaskByWavePickingId(request);
    }
};
TaskProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [ionic_angular_1.Events,
        translate_1.TranslateProvider,
        api_client_v3_1.ApiClientV3Provider,
        user_settings_1.UserSettingsProvider])
], TaskProvider);
exports.TaskProvider = TaskProvider;
//# sourceMappingURL=task.js.map