import { Injectable } from "@angular/core";
import * as Models from "../../models/models";
import { Events } from "ionic-angular";
import { TranslateProvider } from "../translate/translate";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { Enums } from "../../enums/enums";
@Injectable()
export class TaskProvider {
    events: Events;
    translate: TranslateProvider;
    api: ApiClientV3Provider;

    getAssignedTasks(): any /* Promise<Array<Models.Model.Task>> */ {}
    getTaskHeaders(
        _tasks: Array<Models.DataResponse.Task>
    ): any /* Array<Models.Model.Task> */ {}
    getFirstPickingTaskByPickingId(
        _request: Models.DataRequest.GetTaskList
    ): Promise<Models.Model.Task> {
        let task: Models.Model.Task = {
            id: 507271,
            wavePickingId: 4845,
            transOwner: 0,
            taskType: Enums.TaskType.Picking,
            taskSubtype: Enums.TaskSubType.GeneralDispatch,
            taskOwner: "ADMIN",
            taskAssignedTo: "ACAMACHO",
            taskComments: "OLA DE PICKING #4845",
            assignedDate: new Date(),
            quantityPending: 0,
            quantityAssigned: 10,
            sourcePolicyCode: "473565",
            targetPolicyCode: "51117SO - SONDASO-2488172",
            licenseIdSource: 398398,
            regime: Enums.Regime.General,
            isCompleted: 1,
            isDiscretional: 1,
            isPaused: 0,
            isCanceled: 0,
            materialId: "arium/100069",
            barcodeId: "arium/100069",
            alternateBarcode: "",
            materialName: "MINI COOKIES  CREAM121004.0g",
            warehouseSource: "BODEGA_01",
            warehouseTarget: null,
            locationSpotSource: "B01-R01-C01-NA",
            locationSpotTarget: "B01-P01",
            clientOwner: "Arium",
            clientName: "Arium",
            acceptedDate: new Date(),
            completedDate: new Date(),
            canceledDatetime: null,
            canceledBy: null,
            materialShortName: "MINI COOKIES  CREAM121004.0g",
            isLocked: "0",
            isDiscretionary: 0,
            typeDiscretionary: null,
            lineNumberSourcePolicy: 0,
            lineNumberTargetPolicy: 0,
            docIdSource: null,
            docIdTarget: 483701,
            isAccepted: 1,
            isFromSonda: 1,
            isFromErp: 0,
            priority: 0,
            replenishMaterialIdTarget: null,
            fromMasterpack: 0,
            masterPackCode: null,
            owner: null,
            sourceType: "SO - SONDA",
            transferRequestId: null,
            tone: null,
            caliber: null,
            licenseIdTarget: null,
            inPickingLine: 0,
            isForDeliveryImmediate: 1,
            Material: Models.Model.Factory.createMaterial()
        };
        return Promise.resolve(task);
    }
}
