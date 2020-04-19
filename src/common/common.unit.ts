import { Model } from "../models/models";
import { Enums } from "../enums/enums";

export namespace UnitTesting {
    export const getTestCredentials = (): Model.UserCredentials => {
        let credentials = Model.Factory.createUserCredentials();
        credentials.loginId = "BCORADO@L3W";
        credentials.password = "123";
        credentials.communicationAddress = "http://localhost:6661";
        return credentials;
    };

    export const generalPickingSeriesTask = (): Model.Task => {
        return {
            id: 527480,
            wavePickingId: 4892,
            transOwner: 0,
            taskType: Enums.TaskType.Picking,
            taskSubtype: Enums.TaskSubType.GeneralDispatch,
            taskOwner: "ADMIN",
            taskAssignedTo: "AREYES",
            taskComments: "OLA DE PICKING #4892",
            assignedDate: new Date(),
            quantityPending: 3,
            quantityAssigned: 3,
            sourcePolicyCode: "503759",
            targetPolicyCode: "503834",
            licenseIdSource: 428766,
            regime: Enums.Regime.General,
            isCompleted: 0,
            isDiscretional: 1,
            isPaused: 0,
            isCanceled: 0,
            materialId: "motorganica/VBW1132",
            barcodeId: "motorganica/VBW1132",
            alternateBarcode: "",
            materialName: "BALDWIN FILTRO PA3610",
            warehouseSource: "BODEGA_01_ANEXO",
            warehouseTarget: null,
            locationSpotSource: "B01-R01",
            locationSpotTarget: null,
            clientOwner: "motorganica",
            clientName: "motorganica",
            acceptedDate: null,
            completedDate: null,
            canceledDatetime: null,
            canceledBy: null,
            materialShortName: "BALDWIN FILTRO PA3610",
            isLocked: "0",
            isDiscretionary: 1,
            typeDiscretionary: "PICKING_EXPORTACION",
            lineNumberSourcePolicy: 0,
            lineNumberTargetPolicy: 0,
            docIdSource: null,
            docIdTarget: null,
            isAccepted: 0,
            isFromSonda: 0,
            isFromErp: 0,
            priority: 1,
            replenishMaterialIdTarget: null,
            fromMasterpack: 0,
            masterPackCode: null,
            owner: null,
            sourceType: null,
            transferRequestId: null,
            tone: null,
            caliber: null,
            licenseIdTarget: null,
            inPickingLine: 0,
            isForDeliveryImmediate: 1,
            projectId: "",
            projectCode: "",
            projectName: "",
            projectShortName: "",
            reference: "",
            statusCode: "",
            Material: {
                materialId: "motorganica/VBW1132",
                clientOwner: "motorganica",
                barcodeId: "motorganica/VBW1132",
                alternateBarcode: "",
                materialName: "BALDWIN FILTRO PA3610",
                shortName: "",
                volumeFactor: 0,
                materialClass: "54",
                high: 0,
                length: 0,
                width: 0,
                maxXBin: null,
                scanByOne: null,
                requiresLogisticsInfo: null,
                weight: 2,
                image1: null,
                image2: null,
                image3: null,
                lastUpdated: new Date(),
                lastUpdatedBy: "ADMIN",
                isCar: 0,
                mt3: null,
                batchRequested: 0,
                serialNumberRequests: 1,
                isMasterPack: 0,
                erpAveragePrice: 0,
                weightMeasurement: "LIBRA",
                explodeInReception: 0,
                handleTone: 0,
                handleCaliber: 0,
                measurementQty: 1,
                measurementUnit: "Unidad",
                usePickingLine: 0,
                qualityControl: 0,
                SerialNumbers: [
                    {
                        id: 0,
                        licenseId: 0,
                        materialId: "",
                        serial: "88484888",
                        batch: "",
                        dateExpiration: new Date(),
                        status: 0,
                        assignedTo: "",
                        wavePickingId: 0
                    },
                    {
                        id: 0,
                        licenseId: 0,
                        materialId: "",
                        serial: "FAILED",
                        batch: "",
                        dateExpiration: new Date(),
                        status: 0,
                        assignedTo: "",
                        wavePickingId: 0
                    },
                    {
                        id: 0,
                        licenseId: 0,
                        materialId: "",
                        serial: "ERROR",
                        batch: "",
                        dateExpiration: new Date(),
                        status: 0,
                        assignedTo: "",
                        wavePickingId: 0
                    }
                ]
            }
        };
    };

    export const getDefaultTypeCharges = (): Array<Model.Charge> => {
        return [
            {
                typeChargeId: 1029,
                charge: "AREA SECA",
                description: "Fleje",
                warehouseWeather: "SECO",
                regime: Enums.Regime.General,
                comment: "test",
                dayTrip: "N/A",
                serviceCode: "1",
                toMovil: 1,
                qty: 0
            }
        ];
    };
}
