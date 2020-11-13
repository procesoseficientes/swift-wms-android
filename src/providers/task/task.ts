import { Injectable } from "@angular/core";
import * as Models from "../../models/models";
import * as _ from "lodash";
import { Events } from "ionic-angular";
import { TranslateProvider } from "../translate/translate";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { DataRequest, DataResponse } from "../../models/models";

@Injectable()
export class TaskProvider {
    constructor(
        protected events: Events,
        protected translate: TranslateProvider,
        protected api: ApiClientV3Provider,
        protected userSetting: UserSettingsProvider
    ) {}

    public async getAssignedTasks(): Promise<Array<Models.Model.Task>> {
        let tasks = await this.api.getAssignedTasks(
            this.userSetting.userCredentials
        );

        let request = Models.DataRequest.Factory.createGetMyCoutingTaskRequest(
            this.userSetting.userCredentials
        );
        let countTasks = await this.api.getMyCountingTask(request);

        countTasks.forEach(
            (countTask: Models.DataResponse.OP_WMS_SP_GET_MY_COUTING_TASK) => {
                let task: Models.DataResponse.Task = <Models.DataResponse.Task>{
                    id: countTask.TASK_ID,
                    regime: countTask.REGIMEN,
                    priority: countTask.PRIORITY,
                    assignedDate: countTask.ASSIGNED_DATE,
                    taskType: countTask.TASK_TYPE
                };
                tasks.push(task);
            }
        );

        let groupedTasks = this.getTaskHeaders(tasks);
        return Promise.resolve(groupedTasks);
    }

    createTask(
        createTask: DataRequest.CreateTask
    ): Promise<DataResponse.Operation> {
        return this.api.createTask(createTask);
    }

    completeRealloc(
        completeRealloc: DataRequest.CompleteRealloc
    ): Promise<DataResponse.Operation> {
        return this.api.completeRealloc(completeRealloc);
    }

    cancelTask(
        cancelTask: DataRequest.Canceltask
    ): Promise<DataResponse.Operation> {
        return this.api.cancelTask(cancelTask);
    }

    private getTaskHeaders(
        tasks: Array<Models.DataResponse.Task>
    ): Array<Models.Model.Task> {
        _.each(tasks, (task: Models.DataResponse.Task) => {
            if (!task.wavePickingId) {
                task.wavePickingId = task.id;
            }
        });

        let taskHeaders: Array<Models.Model.Task> = _.map(
            tasks,
            (task: Models.DataResponse.Task) => {
                let taskCreate: Models.Model.Task = Models.Model.Factory.createTask();
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
            }
        );

        let taskGrouped: Array<Models.Model.Task> = _.map(
            _.groupBy(taskHeaders, "wavePickingId"),
            task => {
                return _.first(task);
            }
        );

        return _.orderBy(
            taskGrouped,
            ["priority", "assignedDate"],
            ["desc", "asc"]
        );
    }

    public getFirstPickingTaskByPickingId(
        request: Models.DataRequest.GetTaskList
    ): Promise<Models.Model.Task> {
        return this.api.getFirstTaskByWavePickingId(request);
    }
}
