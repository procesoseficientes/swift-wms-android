export class Routes {
    public static V3 = {
        Zone: {
            getLocationByZoneOrWarehouse:
                "/v3/zone/getLocationByZoneOrWarehouse"
        },
        Location: {
            getLocation: "/v3/location/getLocation",
            validateLocationMaxWeigth: "/v3/location/validateLocationMaxWeigth",
            validateLocationForStorage:
                "/v3/location/validateLocationForStorage",
            validateIfLocationExists: "/v3/location/validateIfLocationExists",
            validateLocationMaxWeightAndVolume:
                "/v3/location/validateLocationMaxWeightAndVolume",
            getUsedMt2byLocationSpot: "/v3/location/getUsedMt2byLocationSpot",
            getLocationInfo: "/v3/location/getLocationInfo"
        },
        Configuration: {
            findConfigurations: "/v3/configuration/findConfiguration",
            getParameter: "/v3/configuration/getParameter"
        },
        Reception: {
            getScannedMaterialByLicenseInReceptionTask:
                "/v3/reception/getScannedMaterialByLicenseInReceptionTask",
            validateStatusInMaterialsLicense:
                "/v3/reception/validateStatusInMaterialsLicense",
            getMaterialBySerialNumber:
                "/v3/reception/getMaterialBySerialNumber",
            addMaterialToLicense: "/v3/reception/addMaterialToLicense",
            registerInventoryTransaction:
                "/v3/reception/registerInventoryTransaction",
            registerReceptionStatus: "/v3/reception/registerReceptionStatus",
            rollBackLicense: "/v3/reception/rollBackLicense",
            insertMaterialBySerialNumber:
                "/v3/reception/insertMaterialBySerialNumber",
            generateReceptionDocumentFromCargoManifest:
                "/v3/reception/generateReceptionDocumentFromCargoManifest",
            validateScannedDocumentForReception:
                "/v3/reception/validateScannedDocumentForReception",
            validateBarcodeForLicense:
                "/v3/reception/validateBarcodeForLicense",
            deleteMaterialBySerialNumber:
                "/v3/reception/deleteMaterialBySerialNumber",
            registerLicenseReception: "/v3/reception/registerLicenseReception",
            registerAndChangeStatusOfTask:
                "/v3/reception/registerAndChangeStatusOfTask",
            validateInventoryForRealloc:
                "/v3/reception/validateInventoryForRealloc",
            getTaskDetailForReceptionConsolidated:
                "/v3/reception/getTaskDetailForReceptionConsolidated"
        },
        Task: {
            getReceptionTask: "/v3/task/getReceptionTask",
            validateTaskStatus: "/v3/task/validateTaskStatus",
            getMyFirstTask: "/v3/task/getMyFirstTask",
            getMyFirstGeneralPickingTask:
                "/v3/task/getMyFirstGeneralPickingTask",
            getTasksByUser: "/v3/task/getTasksByUser",
            getTasksByWavePickingId: "/v3/task/getTasksByWavePickingId",
            getFirstTaskByWavePickingId:
                "/v3/picking/getFirstTaskByWavePickingId",
            getPickingMaterialsWithMeasurementUnit:
                "/v3/task/getPickingMaterialsWithMeasurementUnit"
        },
        License: {
            getLicenseDetail: "/v3/license/getLicenseDetail",
            validateLicenseHasInventory:
                "/v3/license/validateLicenseHasInventory",
            createLicense: "/v3/license/createLicense",
            validateIfStatusOfLicenseAllowsRealloc:
                "/v3/license/validateIfStatusOfLicenseAllowsRealloc",
            validateLicenseForReallocPartial:
                "/v3/license/validateLicenseForReallocPartial",
            getInfoOfLicenseInLocationForMerge:
                "/v3/license/getInfoOfLicenseInLocationForMerge",
            mergeLicenseInLocationWithoutDetail:
                "/v3/license/mergeLicenseInLocationWithoutDetail",
            getInfoLicenseDispatch: "/v3/license/getInfoLicenseDispatch",
            addSeriesRank: "/v3/license/addSeriesRank"
        },
        Label: {
            insertPickingLabel: "/v3/label/insertPickingLabel",
            updatePickingLabel: "/v3/label/updatePickingLabel",
            deletePickingLabel: "/v3/label/deletePickingLabel",
            getLabel: "/v3/label/getLabel"
        },
        Charge: {
            getTypeChargeByMobile: "/v3/charge/getTypeChargeByMobile",
            createTypeChangeXLicense: "/v3/charge/createTypeChangeXLicense"
        },
        Material: {
            getMaterial: "/v3/material/getMaterial",

            getMaterialByBarcode: "/v3/material/getMaterialByBarcode",
            getMaterialIdByBarcodeOrName:
                "/v3/material/getMaterialIdByBarcodeOrName",
            updateMaterialProperties: "/v3/material/updateMaterialProperties"
        },
        Relocation: {
            relocatePickingLabel: "/v3/relocation/relocatePickingLabel",
            relocateLicense: "/v3/relocation/relocateLicense",
            validateLicenseForPartialRelocation:
                "/v3/relocation/validateLicenseForPartialRelocation",
            registerPartialRelocation:
                "/v3/relocation/registerPartialRelocation",
            getMyReplenishmentTaskHeader:
                "/v3/relocation/getMyReplenishmentTaskHeader",
            getMyReplenishmentTaskDetail:
                "/v3/relocation/getMyReplenishmentTaskDetail",
            registerRelocationForReplenishment:
                "/v3/relocation/registerRelocationForReplenishment",
            getLastLicenseReallocByUser:
                "/v3/relocation/getLastLicenseReallocByUser"
        },
        Route: {
            getReceptionTask: "/v3/route/getReceptionTask",
            validateTaskStatus: "/v3/route/validateTaskStatus",
            getMyFirstTask: "/v3/route/getMyFirstTask"
        },
        Root: {
            JsonTest: "/v3/json_test",
            HtmlTest: "/v3/html_test",
            login: "/v3/login"
        },
        Picking: {
            validateIfPickingLicenseIsAvailable:
                "/v3/picking/validateIfPickingLicenseIsAvailable",
            registerGeneralDispatch: "/v3/picking/registerGeneralDispatch",
            cancelPickingDetailLine: "/v3/picking/cancelPickingDetailLine",
            getRequestedSerialNumbersInDiscretionalPickingByLicense:
                "/v3/picking/getRequestedSerialNumbersInDiscretionalPickingByLicense",
            updateScannedSerialNumberToProcess:
                "/v3/picking/updateScannedSerialNumberToProcess",
            rollbackSerialNumbersOnProcess:
                "/v3/picking/rollbackSerialNumbersOnProcess",
            getMyPickingDetail: "/v3/picking/getMyPickingDetail",
            getMyPickingDetailByLicense:
                "/v3/picking/getMyPickingDetailByLicense",
            updateSetActiveSerialNumber:
                "/v3/picking/UpdateSetActiveSerialNumber",
            updateLocationTargetTask: "/v3/picking/updateLocationTargetTask",
            getLastDispatchLicenseGeneratedByWavePicking:
                "/v3/picking/getLastDispatchLicenseGeneratedByWavePicking",
            insertLicenseDispatch: "/v3/picking/insertLicenseDispatch",
            registerGeneralDispatchByRegimeGeneral:
                "/v3/picking/registerGeneralDispatchByRegimeGeneral",
            locateLicenseDispatch: "/v3/picking/locateLicenseDispatch",
            getLicenseDispatchByWavePicking:
                "/v3/picking/getLicenseDispatchByWavePicking",

            getWavePickingForLicenseDispatch:
                "/v3/picking/getWavePickingForLicenseDispatch",
            getLicenseDispatchForPicking:
                "/v3/picking/getLicenseDispatchForPicking",
            dispatchLicenseExit: "/v3/picking/dispatchLicenseExit",
            registerForReplenishment: "/v3/picking/registerForReplenishment",
            registerReplenishment: "/v3/picking/registerReplenishment",
            getTargetLocationByLicenseDispatch:
                "/v3/picking/getTargetLocationByLicenseDispatch",
            getWavePickingPendingToLocate:
                "/v3/picking/getWavePickingPendingToLocate",
            getSuggestedDispatchLicense:
                "/v3/picking/getSuggestedDispatchLicense",
            insertPilotFromDispatchLicense:
                "/v3/picking/insertPilotFromDispatchLicense",
            insertVehicleFromDispatchLicence:
                "/v3/picking/insertVehicleFromDispatchLicence",
            insertExitPassFromDispatchLicence:
                "/v3/picking/insertExitPassFromDispatchLicence",
            getWavePickingPendingToDispatch:
                "/v3/picking/getWavePickingPendingToDispatch"
        },
        Masterpack: {
            getMasterPackByLicense: "/v3/masterpack/getMasterPackByLicense",
            getMasterPackDetailByLicence:
                "/v3/masterpack/getMasterPackDetailByLicence",
            getComponentsForImplosionWithProcessedDetail:
                "/v3/masterpack/getComponentsForImplosionWithProcessedDetail",
            validateInventoryForMasterpackImplosion:
                "/v3/masterpack/validateInventoryForMasterpackImplosion",
            explodeMasterPack: "/v3/masterpack/explodeMasterPack",
            validateIsMasterPack: "/v3/masterpack/validateIsMasterPack",
            insertMasterPackImplosion:
                "/v3/masterpack/insertMasterPackImplosion",
            getInventoryByMaterialAndLicense:
                "/v3/masterpack/getInventoryByMaterialAndLicense",
            insertImplosionStepInTaskList:
                "/v3/masterpack/insertImplosionStepInTaskList",
            finishImplosion: "/v3/masterpack/finishImplosion"
        },
        Inventory: {
            getMyCoutingTask: "/v3/inventory/getMyCoutingTask",
            getLocationsForCount: "/v3/inventory/getLocationsForCount",
            validateScannedLocationForCount:
                "/v3/inventory/validateScannedLocationForCount",
            getNextMaterialForCount: "/v3/inventory/getNextMaterialForCount",
            getValidateLicenseExists: "/v3/inventory/getValidateLicenseExists",
            getMaterialByBarcode: "/v3/inventory/getMaterialByBarcode",
            validateRecountedMaterialForTask:
                "/v3/inventory/validateRecountedMaterialForTask",
            insertCountExecutionOperation:
                "/v3/inventory/insertCountExecutionOperation",
            finishLocation: "/v3/inventory/finishLocation",
            getInventoryByLicense: "/v3/inventory/getInventoryByLicense",
            getInventoryByMaterial: "/v3/inventory/getInventoryByMaterial",
            getInventoryByLocationSpot:
                "/v3/inventory/getInventoryByLocationSpot",
            getAvailableLicenseDetail:
                "/v3/inventory/getAvailableLicenseDetail",
            getAvailableLicenseSeries:
                "/v3/inventory/getAvailableLicenseSeries",
            recountLocation: "/v3/inventory/recountLocation",
            getInfoBatch: "/v3/inventory/getInfoBatch"
        },
        ManifestCertification: {
            getManifestHeaderForCertification:
                "/v3/manifestcertification/getManifestHeaderForCertification",
            getMaterialForManifest:
                "/v3/manifestcertification/getMaterialForManifest",
            getConsolidatedCertificationDetail:
                "/v3/manifestcertification/getConsolidatedCertificationDetail",
            getCertificationDetailOfSerialNumber:
                "/v3/manifestcertification/getCertificationDetailOfSerialNumber",
            validateIfCertificationIsComplete:
                "/v3/manifestcertification/validateIfCertificationIsComplete",
            deleteCertificationDetail:
                "/v3/manifestcertification/deleteCertificationDetail",
            insertCertificationDetail:
                "/v3/manifestcertification/insertCertificationDetail",
            markManifestAsCertified:
                "/v3/manifestcertification/markManifestAsCertified",
            insertCertificationHeader:
                "/v3/manifestcertification/insertCertificationHeader",
            insertCertificationBySerialNumber:
                "/v3/manifestcertification/insertCertificationBySerialNumber",
            deleteCertificationBySerialNumber:
                "/v3/manifestcertification/deleteCertificationBySerialNumber"
        },
        Login: {
            login: "/v3/login/login"
        },
        Broadcast: {
            addBroadcast: "/v3/broadcast/addBroadcast",
            getBroadcast: "/v3/broadcast/getBroadcast",
            removeBroadcast: "/v3/broadcast/removeBroadcast"
        },
        Printer: {
            getLicensePrintFormat: "/v3/printer/getLicensePrintFormat",
            getLabelPrintFormat: "/v3/printer/getLabelPrintFormat",
            getMaterialPrintFormat: "/v3/printer/getMaterialPrintFormat",
            getStatusPrintFormat: "/v3/printer/getStatusPrintFormat",
            getTestPrintFormat: "/v3/printer/getTestPrintFormat",
            getLicenseDispatchPrintFormat:
                "/v3/printer/getLicenseDispatchPrintFormat",
            getPrintPassFormatByHH: "/v3/printer/getPrintPassFormatByHH"
        },
        LocationSuggestion: {
            validateSuggestedLocation:
                "/v3/LocationSuggestion/validateConfigurationOfSlottingZoneByLicense",
            getLocationSuggestion:
                "/v3/LocationSuggestion/getGetLocationOfSlottingZoneByLicense",
            getLocationSuggestionByMaterial:
                "/v3/LocationSuggestion/getSuggestedLocationOfMaterialByLicense",
            getLicenseCompatibleClassForLocation:
                "/v3/LocationSuggestion/getLicenseCompatibleClassForLocation"
        },
        CheckPoint: {
            getCheckPointsByUser: "/v3/checkpoint/getCheckPointsByUser"
        },
        GeneralTransfer: {
            registerGeneralTransferReception:
                "/v3/generalTransfer/registerGeneralTransferReception",
            registerGeneralTransferPicking:
                "/v3/generalTransfer/registerGeneralTransferPicking"
        }
    };

    public static V4 = {};
}
