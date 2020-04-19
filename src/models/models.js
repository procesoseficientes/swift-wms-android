"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enums_1 = require("../enums/enums");
var Docs;
(function (Docs) {
    class Factory {
        static createCurrency(doc) {
            return {
                _rev: doc._rev,
                _id: doc._id,
                currency: Model.Factory.createCurrency(doc.currency),
                docType: enums_1.Enums.Prefixes.Currency
            };
        }
    }
    Docs.Factory = Factory;
})(Docs = exports.Docs || (exports.Docs = {}));
var DataRequest;
(function (DataRequest) {
    class Factory {
        static createGetInfoLicenseDispatch(licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRecountLocationRequest(taskId, location, userCredentials) {
            let entity = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLicenseDispatchByWavePicking(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                preparedBy: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetTargetLocationByLicenseDispatch(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                preparedBy: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createFinishLocationRequest(taskId, location, userCredentials) {
            let entity = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertCountExecutionOperationRequest(taskId, location, licenseId, materialId, qtyScanned, expirationDate, batch, serial, type, userCredentials) {
            let entity = {
                taskId: taskId,
                location: location,
                licenseId: licenseId,
                materialId: materialId,
                qtyScanned: qtyScanned,
                expirationDate: expirationDate,
                batch: batch,
                serial: serial,
                type: type,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateRecountedMaterialForTaskRequest(taskId, location, licenceId, materialId, batch, serial, userCredentials) {
            let entity = {
                taskId: taskId,
                location: location,
                licenceId: licenceId,
                materialId: materialId,
                batch: batch,
                serial: serial,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMaterialByBarcodeRequest(barcodeId, licenseId, userCredentials) {
            let entity = {
                barcodeId: barcodeId,
                licenceId: licenseId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetValidateLicenseExistsRequest(licenseId, userCredentials) {
            let entity = {
                licenceId: licenseId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetNextMaterialForCountRequest(taskId, location, userCredentials) {
            let entity = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateScannedLocationForCountRequest(taskId, location, userCredentials) {
            let entity = {
                taskId: taskId,
                location: location,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLocationsForCountRequest(taskId, userCredentials) {
            let entity = {
                taskId: taskId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMyCoutingTaskRequest(userCredentials) {
            let entity = {
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetPickingMaterialsWithMeasurementUnitRequest(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createDeleteCertificationBySerialNumberRequest(certificationHeaderId, materialId, serialNumber, userCredentials) {
            let entity = {
                certificationHeaderId: certificationHeaderId,
                materialId: materialId,
                serialNumber: serialNumber,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertCertificationBySerialNumberRequest(certificationHeaderId, manifestHedaerId, materialId, serialNumber, userCredentials) {
            let entity = {
                certificationHeaderId: certificationHeaderId,
                manifestHedaerId: manifestHedaerId,
                materialId: materialId,
                serialNumber: serialNumber,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetParameterRequest(groupId, parameterId, userCredentials) {
            let entity = {
                groupId: groupId,
                parameterId: parameterId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertCertificationHeaderRequest(manifestId, userCredentials) {
            let entity = {
                manifestHeaderId: manifestId,
                createBy: userCredentials.login,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createDeleteCertificationDetailRequest(certificationId, boxBarcode, userCredentials) {
            let entity = {
                certificationDetailId: certificationId,
                boxBarcode: boxBarcode ? boxBarcode : null,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createMarkManifestAsCertifiedRequest(manifestHeaderId, certificationHeaderId, lastUpdateBy, userCredentials) {
            let entity = {
                manifestHeaderId: manifestHeaderId,
                certificationHeaderId: certificationHeaderId,
                lastUpdateBy: lastUpdateBy,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetConsolidatedCertificationDetailRequest(certificationId, userCredentials) {
            let entity = {
                certificationHeaderId: certificationId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetCertificationDetailOfSerialNumberRequest(certificationId, userCredentials) {
            let entity = {
                certificationHeaderId: certificationId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMaterialForManifestRequest(manifestId, barcodeId, userCredentials) {
            let entity = {
                manifestHeaderId: manifestId,
                barcodeId: barcodeId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertCertificationDetailRequest(certificationHeaderId, labelId, qty, certificationType, lastUpdate, materialId, boxBarcode, userCredentials) {
            let entity = {
                certificationHeaderId: certificationHeaderId,
                labelId: labelId,
                qty: qty,
                certificationType: certificationType,
                lastUpdate: lastUpdate,
                materialId: materialId,
                boxBarcode: boxBarcode,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetManifestHeaderForCertificationRequest(manifestId, userCredentials) {
            let entity = {
                manifestHeaderId: manifestId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateIfCertificationIsCompleteRequest(certificationId, userCredentials) {
            let entity = {
                certificationHeaderId: certificationId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createMergeLicenseInLocationWithoutDetail(location, materialId, userCredentials) {
            let entity = {
                location: location,
                materialId: materialId,
                password: "",
                login: userCredentials.login,
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetInfoOfLicenseInLocationForMergeRequest(location, materialId, userCredentials) {
            let entity = {
                location: location,
                materialId: materialId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGenerateReceptionDocumentFromCargoManifestRequest(manifestId, userCredentials) {
            let entity = {
                manifestId: manifestId,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateScannedDocumentForReceptionRequest(document, userCredentials) {
            let entity = {
                document: document,
                login: userCredentials.login,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLabelInfoRequest(labelId, userCredentials) {
            let entity = {
                labelId: labelId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRelocateLicenseRequest(licenseId, mt2, paramName, newLocationSpot, userCredentials, totalPosition) {
            let entity = {
                licenseId: licenseId,
                mt2: mt2,
                paramName: paramName,
                newLocationSpot: newLocationSpot,
                result: "",
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                totalPosition: totalPosition
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetInventoryByLocationSpotRequest(locationSpot, userCredentials) {
            let entity = {
                locationSpot: locationSpot,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetInventoryByMaterialRequest(materialId, userCredentials) {
            let entity = {
                materialId: materialId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createUpdateMaterialPropertiesRequest(materialInfo, userCredentials) {
            let entity = {
                alternateBarcode: materialInfo.newAlternateBarcode ||
                    materialInfo.alternateBarcode,
                barcodeId: materialInfo.newBarcode || materialInfo.barcodeId,
                batchRequested: materialInfo.batchRequested,
                materialId: materialInfo.materialId,
                owner: materialInfo.clientOwner,
                handleTone: materialInfo.handleTone,
                handleCaliber: materialInfo.handleCaliber,
                serialNumberRequests: materialInfo.serialNumberRequests,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetCheckPointsByUserRequest(userCredentials) {
            let entity = {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static getLocationSugestionRequest(userCredentials, licenceId) {
            let entity = {
                licenseId: licenceId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static getBroadcastLost(userCredentials) {
            return {
                password: userCredentials.password,
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                domain: userCredentials.domain,
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
        }
        static removeBroadcast(broadcast, userCredentials) {
            let entity = {
                broadcast: broadcast,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterGeneralDispatch(processSku, task, userCredentials) {
            let entity = {
                loginId: userCredentials.loginId,
                clientOwner: task.clientOwner,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                codePolicy: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                locationType: processSku.locationType,
                mt2: processSku.usedMt2,
                taskId: task.wavePickingId,
                serialNumber: task.id,
                result: "",
                password: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetInfoBatch(materialId, licenseId, userCredentials) {
            let entity = {
                materialId: materialId,
                licenseId: licenseId,
                login: userCredentials.loginId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateIfPickingLicenseIsAvailableRequest(processSku, userCredentials) {
            let entity = {
                wavePickingId: processSku.wavePickingId,
                currentLocation: processSku.sourceLocation,
                materialId: processSku.materialId,
                licenseId: processSku.licenseId,
                login: userCredentials.loginId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createCreateLicenseRequest(codePolicy, login, clientOwner, regime, taskId, userCredentials) {
            let entity = {
                codePolicy: codePolicy,
                login: login,
                licenseId: 0,
                clientOwner: clientOwner,
                regime: regime,
                result: "",
                taskId: taskId,
                location: null,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createReceptionRequest(userCredentials) {
            let entity = {
                regime: enums_1.Enums.Regime.General,
                serialNumber: 0,
                taskAssignedTo: "",
                transType: enums_1.Enums.TransType.GeneralReception,
                login: "",
                policyCode: "",
                taskId: 0,
                status: "",
                completeTask: enums_1.Enums.YesNo.No,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetScannedMaterialByLicenseInReceptionTaskRequest(barcode, clientOwner, licenseId, taskId, userCredentials) {
            let entity = {
                barcode: barcode,
                clientOwner: clientOwner,
                licenseId: licenseId,
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateIfStatusOfLicenseAllowsRelocationRequest(userCredentials) {
            let entity = {
                licenseId: 0,
                materialId: "",
                result: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateInventoryForRealloc(userCredentials) {
            let entity = {
                materialId: "",
                quantityUnits: 0,
                sourceLicense: 0,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createAddMaterialToLicenseRequest(userCredentials) {
            let entity = {
                licenseId: 0,
                barcode: "",
                qty: 0,
                lastLogin: "",
                volumeFactor: 0,
                weight: 0,
                comments: "N/A",
                serial: "",
                tradeAgreementId: "2020",
                totalMaterials: 0,
                status: "",
                result: "",
                dateExpiration: new Date(),
                batch: "",
                vin: "",
                paramName: "",
                action: enums_1.Enums.ReceptionAction.Insert,
                tone: "",
                caliber: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                enteredMeasurementUnit: "",
                enteredMeasurementUnitQty: 0,
                enteredMeasurementUnitConversionFactor: 0
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createSuggestedLocation(licenceId, userCredentials) {
            let entity = {
                licenseId: licenceId,
                zone: "",
                warehouse: "",
                location: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                loginId: userCredentials.loginId,
                login: userCredentials.login,
                domain: userCredentials.domain,
                userName: userCredentials.userName,
                password: userCredentials.password,
                userRole: userCredentials.userRole
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRollBackLicenseRequest(licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createAddSeriesRankRequest(licenseId, materialId, batch, dateExpiration, prefix, startValue, endValue, sufix, status, wavePickingId, operationType, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                batch: batch,
                dateExpiration: dateExpiration,
                prefix: prefix,
                startValue: startValue,
                endValue: endValue,
                sufix: sufix,
                status: status,
                wavePickingId: wavePickingId,
                operationType: operationType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createAvailableLicenseDetailRequest(userCredentials, licensenId) {
            let entity = {
                licenseId: licensenId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetConfigurationRequest(userCredentials) {
            let entity = {
                paramType: "",
                paramGroup: "",
                paramName: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMaterialRequest(userCredentials) {
            let entity = {
                materialId: "",
                clientOwner: "",
                barcodeId: "",
                alternateBarcode: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertMaterialBySerialNumberRequest(licenseId, materialId, serial, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                serial: serial,
                batch: null,
                dateExpiration: null,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createDeleteMaterialBySerialNumberRequest(correlative, userCredentials) {
            let entity = {
                correlative: correlative,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterLicenseReceptionRequest(licenseId, locationId, mt2, taskId, userCredentials, totalPosition) {
            let entity = {
                transType: enums_1.Enums.TransType.GeneralReception,
                licenseId: licenseId,
                locationId: locationId,
                mt2: mt2,
                taskId: taskId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                totalPosition: totalPosition
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateStatusInMaterialsLicenseRequest(licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLocationRequest(location, userCredentials) {
            let entity = {
                location: location,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLocationInfoRequest(location, userCredentials) {
            let entity = {
                locationSpot: location,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateLocationForStorageRequest(licenseId, location, taskId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                login: userCredentials.login,
                locationSpot: location,
                taskId: taskId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateLocationMaxWeightAndVolumeRequest(location, licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                locationSpot: location,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetTaskListRequest(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createTypeChangeXLicenseRequest(charge, userCredentials) {
            let entity = {
                licenseId: charge.licenseId,
                typeChargeId: charge.typeChargeId,
                qty: charge.qty,
                lastUpdatedBy: userCredentials.login,
                transType: charge.transType,
                result: "",
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createCancelPickingDetailLineRequest(wavePickingId, materialId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                materialId: materialId,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetRequestedSerialNumbersInDiscretionalPickingByLicenseRequest(licenseId, wavePickingId, materialId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                wavePickingId: wavePickingId,
                materialId: materialId,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createChargeByMobileRequest(licenseId, transType, userCredentials) {
            let entity = {
                licenseId: licenseId,
                transType: transType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createLastLicenseReallocByUser(licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                login: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMaterialPrintFormat(materialId, userCredentials) {
            let entity = {
                materialId: materialId,
                login: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetPrintPassFormatByHH(passId, userCredentials) {
            let entity = {
                passId: passId,
                login: userCredentials.loginId.split("@")[0],
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetInventoryByLicenseRequest(licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMaterialBySerialNumberRequest(licenseId, materialId, serial, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                serial: serial,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createUpdateScannedSerialNumberToProcessRequest(serialNumber, licenseId, status, wavePickingId, materialId, taskType, userCredentials) {
            let entity = {
                serialNumber: serialNumber,
                licenseId: licenseId,
                status: status,
                wavePickingId: wavePickingId,
                materialId: materialId,
                login: userCredentials.login,
                taskType: taskType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRollbackSerialNumbersOnProcessRequest(licenseId, wavePickingId, materialId, taskType, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                login: userCredentials.login,
                wavePickingId: wavePickingId,
                taskType: taskType,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createUpdateSetActiveSerialNumberRequest(licenseId, wavePickingId, materialId, serialNumber, taskType, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                serialNumber: serialNumber,
                wavePickingId: wavePickingId,
                taskType: taskType,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createUpdateLocationTargetTaskRequest(wavePickingId, locationSpotTarget, userCredentials) {
            let entity = {
                login: userCredentials.login,
                wavePickingId: wavePickingId,
                locationSpotTarget: locationSpotTarget,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLicensePrintFormatRequest(licenseId, reprint, userCredentials) {
            let entity = {
                login: userCredentials.login,
                licenseId: licenseId,
                reprint: reprint,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetStatusPrintFormatRequest(codeStatus, taskId, clientOwner, userCredentials) {
            let entity = {
                taskId: taskId,
                login: userCredentials.login,
                codeStatus: codeStatus,
                clientOwner: clientOwner,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLicenseDispatchPrintFormatRequest(licenceId, userCredentials) {
            let entity = {
                licenseId: licenceId,
                login: userCredentials.login,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLabelPrintFormatRequest(labelId, userCredentials) {
            let entity = {
                login: userCredentials.login,
                labelId: labelId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetConsolidatedCertificationDetail(certificationHeaderId, userCredentials) {
            let entity = {
                login: userCredentials.login,
                certificationHeaderId: certificationHeaderId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertPickingLabelsRequest(wavePickingId, clientCode, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                clientCode: clientCode,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetCertificationDetailOfSerialNumber(certificationHeaderId, userCredentials) {
            let entity = {
                login: userCredentials.login,
                certificationHeaderId: certificationHeaderId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetAvailableLicenseDetailRequest(licenseId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createDeletePickingLabelRequest(labelId, userCredentials) {
            let entity = {
                labelId: labelId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetAvailableLicenseSeriesRequest(licenseId, materialId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetWavePickingPendingToLocate(userCredentials) {
            let entity = {
                loginUser: userCredentials.loginId,
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetSuggestedDispatchLicense(materialId, wavePickingId, projectId, userCredentials) {
            let entity = {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                materialId: materialId,
                wavePickingId: wavePickingId,
                projectId: projectId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetWavePickingPendingToDispatchRequest(wavePickingId, userCredentials) {
            let entity = {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                wavePickingId: wavePickingId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createUpdatePickingLabelRequest(labelId, clientCode, licenseId, barcode, qty, codePolicy, sourceLocation, targetLocation, transitLocation, serialNumber, wavePickingId, userCredentials) {
            let entity = {
                labelId: labelId,
                clientCode: clientCode,
                licenseId: licenseId,
                barcode: barcode,
                qty: qty,
                codePolicy: codePolicy,
                sourceLocation: sourceLocation,
                targetLocation: targetLocation,
                transitLocation: transitLocation,
                serialNumber: serialNumber,
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterPartialRelocationRequest(sourceLicense, targetLicense, quantityUnits, transMt2, codePolicy, targetLocation, clientOwner, materialBarcode, materialCode, userCredentials, totalPosition) {
            let entity = {
                sourceLicense: sourceLicense,
                targetLicense: targetLicense,
                quantityUnits: quantityUnits,
                licenseId: targetLicense,
                wavePickingId: 0,
                transMt2: transMt2,
                taskId: null,
                result: "",
                status: enums_1.Enums.TransStatus.Processed,
                sourceWarehouse: "",
                targetWarehouse: "",
                transSubtype: enums_1.Enums.TransSubType.None,
                codePolicy: codePolicy,
                sourceLocation: "",
                targetLocation: targetLocation,
                clientOwner: clientOwner,
                tradeAgreement: null,
                transType: enums_1.Enums.TransType.PartialRelocation,
                transExtraComments: "N/A",
                materialBarcode: materialBarcode,
                materialCode: materialCode,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                totalPosition: totalPosition
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidateIsMasterPackRequest(material, userCredentials) {
            let entity = {
                material: material,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMasterPackDetailByLicenceRequest(licenseId, materialId, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createExplodeMasterPackRequest(licenseId, materialId, lastUpdateBy, manualExplosion, userCredentials) {
            let entity = {
                licenseId: licenseId,
                materialId: materialId,
                lastUpdateBy: lastUpdateBy,
                manualExplosion: manualExplosion,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetMasterPackByLicenseRequest(materialId, licenseId, userCredentials) {
            let entity = {
                materialId: materialId,
                licenseId: licenseId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLastDispatchLicenseGeneratedByWavePicking(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertLicenseDispatch(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                password: "",
                preparedBy: userCredentials.loginId.split("@")[0],
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterGeneralDispatchByRegimeGeneral(processSku, task, licenseDispatchId, userCredentials) {
            let entity = {
                loginId: userCredentials.loginId,
                clientOwner: task.clientOwner,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                codePolicy: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                locationType: processSku.locationType,
                mt2: processSku.usedMt2,
                taskId: task.wavePickingId,
                serialNumber: task.id,
                result: "",
                password: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                licenseDispatchId: licenseDispatchId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterReplenishment(processSku, task, licenseDispatchId, userCredentials) {
            let entity = {
                loginId: userCredentials.loginId,
                clientOwner: task.clientOwner,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                codePolicy: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                locationType: processSku.locationType,
                mt2: processSku.usedMt2,
                taskId: task.wavePickingId,
                serialNumber: task.id,
                result: "",
                password: "",
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress,
                licenseDispatchId: licenseDispatchId
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createLocateLicenseDispatch(location, licenseId, userCredentials) {
            let entity = {
                location: location,
                licenseId: licenseId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterForReplenishment(location, licenseId, loginUser, userCredentials) {
            let entity = {
                location: location,
                licenseId: licenseId,
                loginUser: loginUser,
                password: "",
                loginId: userCredentials.loginId,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createValidatedIfJoinSpotExists(location, userCredentials) {
            let entity = {
                locationSpot: location,
                warehouseParent: null,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetWavePickingForLicenseDispatchRequest(number, type, userCredentials) {
            let entity = {
                number: number,
                type: type,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetLicenseDispatchForPickingRequest(wavePickingId, userCredentials) {
            let entity = {
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createDispatchLicenseExitRequest(listLicenseDispatch, wavePickingId, userCredentials) {
            let entity = {
                listLicenseDispatch: listLicenseDispatch,
                wavePickingId: wavePickingId,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertPilotFromDispatchLicenseRequest(namePilot, lastName, userCredentials) {
            let entity = {
                namePilot: namePilot,
                lastName: lastName,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertVehicleFromDispatchLicenceRequest(plateNumber, userCredentials) {
            let entity = {
                plateNumber: plateNumber,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createInsertExitPassFromDispatchLicenceRequest(dispatchLicenseExitHeader, vehicleCode, pilotCode, userCredentials) {
            let entity = {
                dispatchLicenseExitHeader: dispatchLicenseExitHeader,
                vehicleCode: vehicleCode,
                pilotCode: pilotCode,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createGetTaskDetailForReceptionConsolidatedRequest(serialNumber, userCredentials) {
            let entity = {
                serialNumber: serialNumber,
                password: "",
                loginId: userCredentials.login,
                userRole: "Host",
                userName: "",
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterGeneralTransferReceptionRequest(task, transMt2, userCredentials, targetLicenseId, materialId, targetLocation) {
            let entity = {
                loginId: userCredentials.loginId,
                materialId: materialId,
                sourceLicense: task.licenseIdSource,
                targetLicense: targetLicenseId,
                targetLocation: targetLocation,
                policyCode: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                serialNumber: task.id,
                transMt2: transMt2,
                result: "",
                taskId: task.id,
                password: userCredentials.password,
                userRole: "Host",
                userName: userCredentials.userName,
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
        static createRegisterGeneralTransferPickingRequest(processSku, task, transMt2, dispatchLicenseId, userCredentials) {
            let entity = {
                loginId: userCredentials.loginId,
                materialId: processSku.materialId,
                materialBarcode: task.barcodeId,
                sourceLicense: processSku.licenseId,
                targetLicense: dispatchLicenseId,
                sourceLocation: processSku.sourceLocation,
                quantityUnits: processSku.quantity * processSku.unitMsrQty,
                policyCode: task.targetPolicyCode,
                wavePickingId: task.wavePickingId,
                serialNumber: task.id,
                transMt2: transMt2,
                locationType: processSku.locationType,
                result: "",
                taskId: task.id,
                password: userCredentials.password,
                userRole: "Host",
                userName: userCredentials.userName,
                loginImage: userCredentials.loginImage,
                validationType: userCredentials.validationType,
                dbUser: userCredentials.dbUser,
                dbPassword: userCredentials.dbPassword,
                deviceId: userCredentials.deviceId,
                serverIp: userCredentials.serverIp,
                communicationAddress: userCredentials.communicationAddress
            };
            return Model.Factory.mergeEntities(userCredentials, entity);
        }
    }
    DataRequest.Factory = Factory;
})(DataRequest = exports.DataRequest || (exports.DataRequest = {}));
var Model;
(function (Model) {
    class DocumentMessage {
        static createDocumentMessage(primaryKey, messageType, Document) {
            let message = new DocumentMessage();
            message.primaryKey = primaryKey;
            message.messageType = messageType;
            message.Document = Document;
            return message;
        }
        get messageType() {
            return this._messageType;
        }
        set messageType(v) {
            this._messageType = v;
        }
        get Document() {
            return this._Document;
        }
        set Document(v) {
            this._Document = v;
        }
        get primaryKey() {
            return this._primaryKey;
        }
        set primaryKey(v) {
            this._primaryKey = v;
        }
    }
    Model.DocumentMessage = DocumentMessage;
    class CalculatedValue {
    }
    Model.CalculatedValue = CalculatedValue;
    class ProcessSku {
    }
    Model.ProcessSku = ProcessSku;
    class Factory {
        static createLabelInfo() {
            return {
                labelId: 0,
                loginId: "",
                licenseId: 0,
                materialId: "...",
                materialName: "...",
                qty: 0,
                policyCode: "",
                sourceLocation: "",
                targetLocation: "...",
                transitLocation: "",
                batch: "",
                vin: "",
                tone: "",
                caliber: "",
                serialNumber: "",
                status: "...",
                weight: 0,
                wavePickingId: 0,
                taskSubType: "",
                warehouseTarget: "",
                clientName: "...",
                clientCode: "...",
                stateCode: 0,
                regime: "",
                transferRequestId: 0,
                dateTime: new Date(),
                loginName: "",
                docNum: 0,
                docEntry: 0
            };
        }
        static createLocationInfo() {
            return {
                locationSpot: "",
                warehouseParent: "",
                spotType: enums_1.Enums.LocationType.StandBy,
                zone: "",
                allowPicking: 0,
                allowStorage: 0,
                allowRealloc: 0,
                availableVolume: 0,
                availableWeight: 0
            };
        }
        static mergeEntities(newEntity, defaultEntity) {
            if (newEntity == undefined)
                return defaultEntity;
            for (var key in newEntity) {
                if (newEntity.hasOwnProperty(key)) {
                    defaultEntity[key] = newEntity[key];
                }
            }
            return defaultEntity;
        }
        static createSuccessOperation() {
            return {
                Codigo: 0,
                Mensaje: "",
                DbData: "0",
                Resultado: enums_1.Enums.OperationResult.Success
            };
        }
        static createProcessSku() {
            return {
                licenseId: null,
                sourceLocation: "",
                materialBarcode: "",
                quantity: null,
                requestSerial: false,
                usedMt2: 0,
                useMt2: false,
                locationType: enums_1.Enums.LocationType.Rack
            };
        }
        static createFaultOperation(reason) {
            return {
                Codigo: reason.code || enums_1.Enums.CustomErrorCodes.BadRequest,
                Mensaje: reason.message,
                DbData: null,
                Resultado: enums_1.Enums.OperationResult.Fail
            };
        }
        static createCustomError(reason, code) {
            return { code: code, message: reason };
        }
        static createUserCredentials() {
            return {
                password: "",
                loginId: "",
                userRole: "Host",
                userName: "",
                communicationAddress: "",
                deviceId: "1a6acc5f-18a3-4686-b6fe-7c4c14e37c23"
            };
        }
        static createCalculationRule() {
            return {
                displayDecimalsRoundType: enums_1.Enums.RoundType.Round,
                displayDecimalsRoundConfiguration: enums_1.Enums.QuantityType.Total,
                defaultDisplayDecimals: 4,
                defaultCalculationsDecimals: 3
            };
        }
        static createCurrency(doc) {
            return {
                docType: enums_1.Enums.Prefixes.Currency,
                CURRENCY_ID: doc.CURRENCY_ID,
                CODE_CURRENCY: doc.CODE_CURRENCY,
                NAME_CURRENCY: doc.NAME_CURRENCY,
                SYMBOL_CURRENCY: doc.SYMBOL_CURRENCY,
                IS_DEFAULT: doc.IS_DEFAULT
            };
        }
        static createEmptyDocumentViewModelFilter() {
            return {
                selector: null,
                filter: () => true
            };
        }
        static createWirelessInfo() {
            return {
                icon: "close-circle",
                iconColor: "danger",
                ip: "0.0.0.0",
                name: "",
                status: false
            };
        }
        static createBluetoothInfo() {
            return { icon: "close-circle", iconColor: "danger", status: false };
        }
        static createNavigationTabs() {
            return [
                {
                    isActive: true,
                    navigationStack: new Array(),
                    tabName: enums_1.Enums.Page.MyTasks,
                    currentRoot: enums_1.Enums.Page.MyTasks
                },
                {
                    isActive: false,
                    navigationStack: new Array(),
                    tabName: enums_1.Enums.Page.TaskSent,
                    currentRoot: enums_1.Enums.Page.TaskSent
                },
                {
                    isActive: false,
                    navigationStack: new Array(),
                    tabName: enums_1.Enums.Page.InfoCenter,
                    currentRoot: enums_1.Enums.Page.InfoCenter
                },
                {
                    isActive: false,
                    navigationStack: new Array(),
                    tabName: enums_1.Enums.Page.MoreTransactions,
                    currentRoot: enums_1.Enums.Page.MoreTransactions
                }
            ];
        }
        static createConfiguration() {
            return {
                paramType: "",
                paramGroup: "",
                paramGroupCaption: "",
                paramName: "",
                paramCaption: "",
                numericValue: 0,
                moneyValue: 0,
                textValue: "",
                dateValue: new Date(),
                rangeNumStart: 0,
                rangeNumEnd: 0,
                rangeDateStart: new Date(),
                rangeDateEnd: new Date(),
                spare1: "",
                spare2: "",
                decimalValue: 0,
                spare3: "",
                spare4: "",
                spare5: "",
                color: ""
            };
        }
        static createTask() {
            return {
                id: 0,
                wavePickingId: 0,
                transOwner: 0,
                taskType: enums_1.Enums.TaskType.Picking,
                taskSubtype: enums_1.Enums.TaskSubType.General,
                taskOwner: "",
                taskAssignedTo: "",
                taskComments: "",
                assignedDate: new Date(),
                quantityPending: 0,
                quantityAssigned: 0,
                sourcePolicyCode: "",
                targetPolicyCode: "",
                licenseIdSource: 0,
                regime: enums_1.Enums.Regime.General,
                isCompleted: enums_1.Enums.YesNo.No,
                isDiscretional: enums_1.Enums.YesNo.No,
                isPaused: 0,
                isCanceled: enums_1.Enums.YesNo.No,
                materialId: "",
                barcodeId: "",
                alternateBarcode: "",
                materialName: "",
                warehouseSource: "",
                warehouseTarget: "",
                locationSpotSource: "",
                locationSpotTarget: "",
                clientOwner: "",
                clientName: "",
                acceptedDate: new Date(),
                completedDate: new Date(),
                canceledDatetime: new Date(),
                canceledBy: "",
                materialShortName: "",
                isLocked: "",
                isDiscretionary: 0,
                typeDiscretionary: "",
                lineNumberSourcePolicy: 0,
                lineNumberTargetPolicy: 0,
                docIdSource: 0,
                docIdTarget: 0,
                isAccepted: enums_1.Enums.YesNo.No,
                isFromSonda: enums_1.Enums.YesNo.No,
                isFromErp: enums_1.Enums.YesNo.No,
                priority: 0,
                replenishMaterialIdTarget: "",
                fromMasterpack: enums_1.Enums.YesNo.No,
                masterPackCode: "",
                owner: "",
                sourceType: "",
                transferRequestId: 0,
                tone: "",
                caliber: "",
                licenseIdTarget: 0,
                inPickingLine: enums_1.Enums.YesNo.No,
                isForDeliveryImmediate: enums_1.Enums.YesNo.No,
                Material: this.createMaterial(),
                Configuration: this.createConfiguration(),
                icon: "arrow-dropdown",
                showDetails: false,
                projectId: "",
                projectCode: "",
                projectName: "",
                projectShortName: "",
                reference: "",
                statusCode: ""
            };
        }
        static createReceptionTaskHeader() {
            return {
                taskId: 0,
                clientCode: "",
                clientName: "",
                policyCode: "",
                order: "",
                receptionType: enums_1.Enums.TaskType.Reception,
                locationSpotTarget: "",
                receptionSubType: enums_1.Enums.TaskSubType.GeneralReception,
                regime: enums_1.Enums.Regime.General,
                document: "",
                isInvoice: 0,
                supplierCode: "",
                supplierName: ""
            };
        }
        static createMaterial() {
            return {
                materialId: "",
                clientOwner: "",
                barcodeId: "",
                alternateBarcode: "",
                materialName: "",
                shortName: "",
                volumeFactor: 0,
                materialClass: "",
                high: 0,
                length: 0,
                width: 0,
                maxXBin: 0,
                scanByOne: enums_1.Enums.YesNo.No,
                requiresLogisticsInfo: 0,
                weight: 0,
                image1: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMp0lEQVR4XtWaCXQUVbrH/9+tqu7qdCcBzAoGwhK2J8gimxl98JxFUBw2GcVBWVQQNDCOwOiA4IGBOaIwHnB9AqM8VJ6CgDx4Z1QUBQFNRGQLSyCBSGjMoiSd7uquuvfdbpIm6aZDx+eMx985/9Od6tT3ff/vLpXTNySEwM8Zhp87P8IIdJW6AT+c/lILpG6RavmvHIFeDjs2Ajgq9YVNxe5mGHFI3Zpgp08B7HM5aC4R3lcVuO1aKGb/f6aBbJkwmGR/Wgt2x8o8HW/OdSA7g/Unwh4A90kpuDKdpfIcNhQB2N49mw16fY4Dxetcyv6XXLRooq61voYND5qS5oKx7pZyoQlCi5iIEAfJjLCACNOdOinPPayzEbkadBtCVHsF8lb48NZHAcjPCz0+MR5APi4xOdFBE+Xv5EJy1xANU27TMLDbJZ/h7AIImNJZvomn1/t5/gmLSbMVXj/mAnjphxpgUnfLQH/zBZCSN9KGR0bY0CaFhZMCAvXsK7QwZbnPPP4NrxYiZCBRamDvjgp/YJjGbu6hoFNmjIEXaMReGev59/x4+1MTckQO1RpiPoCN8RpQpMbIG5fIG9uPuFHFkkl2tM9gMZMeKuZYtyOAl7cFLJlMYYwEgYTFOcv7rQ1PT7aHvUYhYl/76GsLi9YbfPcRiwFYLBU0YjZlYIh0vFw6vv72ASoeHWXDjd2VmMnf2hmQhZvi/f0mOR0qvzY9nTl0G74qPI1B13fFiTPnzPKqi2pOayZWTNVpcA8lRvGiSUMvbQ9g5qsGNAU7A1ZofZSpaEzrZCct/d4jxrXPIL7gHh3DpYFQMAtRbNpjYtm7fuvz45aS0sKBnp2z0DYjhamqglJ3BYKkt2qBtJYtVHdFFYrPldKtT3owS07DWaM0JDnoikYoxsg89GsN7VMZ7l7mvYkx5BsBjI4cgS1Sw1fP0DHmFxps6pW6IbDtCxPz1vn54TOcZVzjQse2WUhtmQyqS+01/Dh0sgTfVdfgVwN7N3rmnDxbhiNFJUhNJr7k93Y27iYVofQi/ilVViXwi3m1VmmFOBs5AnuCBjQFsJFo1HWScssbp71sYGu+icyURHZTn7ZIaZGESPwBE7U+A0nOBDSEiJDTtjVap7ZC4aliNmllFZ7dzMTDQzUa2V9BSyfFKjxMwALWyHV2rlIwADsYGrNE1/DK+GU+FJzgII6wtu4z0W9WLd9xUIgBPbpgYM/rwsXHhhBGXJZT19G3e1fk9uoOr5VMD71ioMejXv7MpgAuVAmA47Ksy+9ragVGLfWJp97xgzE8BmDylRaxYtdwKD2ZcnYvSgi+xxNvGHj1w2DXk0SPnI7kdOhoApnIhwPHT8OyLNzc5zpcje9qPCg6W4oz5yvRIoH4Y7dpbOot6uU1IoAiN8e4FwzzwBkuuMBvAWxvahdqr2vY1TaFpYOAM+Vg3Tu2p3aZaWgSgRAW5zh6+qws6FsMy70B8VLj9YWMFJ/7FokO4vcMUtj8kRp2HOaYvMqwuMB5XwC3A/gqnufAcKktRMAvB/SCK8ERo+BouBAoLA4W4o7DQHRMuX6kiXOorqniGgVESQVXFIZNFsdoADyev4UmqQrW1s/iwyeO8VPfnIfH62s4l2MiuADnHHESFTNBt6NLdju4nC1ZsHhcIqWuqdSUgaQEGzYAWDWmn5q8eaYdHz+hI7ejnx2Uc/r9vfvF5wcPibLySjSF1zDkFupBYoIjnqKjKCm7gA/25fMLFW7xwj0aZsj10DGVBgDYJOs7COBm1KHiMlm6hu0WR7c3p9ox+gYF9Qx8wI5nxgp8dNSi53d4xN6Dx3BNki66dehAwf0/koBlwTQtOHR7w4KvirvyOxwvPo3yiz6MH6iwRSPsaJ1MCPL0aE3LL+aYsT7QNb+E79Q1vOYLYEb9GsiVF/7baaeMrTPsrG87hoZQRPJPjnHM3uAXBSWcenTKRqeszKgOHjhxGp2z2qBr9rW4GqJuzRSWlKJXFhN/HanRLV0YQFc2/vpeC/f/lx9CYEv9CMyWblofekpHu1YAuGhyl7k5h7Bnjp0WvBfA4u3FKK8qt67r1ElxORzhgoKyaWpcW+iRoiLurvKwRXdomP1rlYga5xNCCgAjhMjtyGBTYBkmXGp9U6XumPuuH8+M0ZCeRFcddpJ6ariGwTkKpr3loZ0FB0SHa9tQu4w0iLrEftNEU5xxfyufF0WiSzrR+on2UGFXghqMxNEygSHLDc4IhwH8ruE2OtquYk2CjZxLR2lsXH8FmoK4qDGAP28O4LW9FvcYgl2b1goghuzMNKS2iF4jlhV8ThTjRKkb4wcoWHGXDU4brsruIo7bVhochJMeI7SQ3Q0tbzBMdAtYYkdwfvX+i89auM1EPLjswHNjNZxeZGdzh6mo9VRZpe5ynHO7UVVdg4ZU13qx9+DBUPFPj9Kw+t74in/7Swv/sdxAgKNAFj8AgLupB9ntKsOzJkfncf0UzBumoVMaIV4u+oB1+0w8+4HJSyoFS2/pFBkpaeQ1/HKBl1k92wArf6cpfdoyxMPsjQEs/9CEwvCOxTEBgCeeJ/FAqT02FeAc4pfdFMobospdgpDqis+MLwB8ctLCkv81+a6TPFzt9MEqlo3RwOII8/zHJma+HYBkrdS9cX8rodsAImD9/AQsfUinwxc4H7bSQNvHfWLcKj9OlwtcDV0DBmQz2FWESHKS2a2DYgWLyl1qiOKK2DG8AWDyWn+oeCIYAP7crK9VTAskRDCptP0bDfmvuNhHf3Ni2ggb7SzivPtTvmBnUemJbeTLMxx9FhvWZ6c4VxVYc+7X1YK3E5V//KcLxd8LkfOkL1TkB4UcDTnmFhi8zODv7Of8wTvtUJVwrfEbIEBAEjARJBSkZweG+RPs2POik00facOCrQFcv8jga/dZEBE+Xtxp4salBrIyGS3Pc6gAWG5vBUTATX1V7N+QxBY+ouPTEsGHrjDwgNw4FsuGTH0jGNMnqgWwa52LTRlrg8WhxjKgIgbJLkos/15AtxEiaeEiPCmN3DdUw4LVBk163S9Hg/i0f1fZ4M4Mf9luine+tOiR0TrmTXKwzbsC4ALUNpOhnpRWhMcmOfCHCQ724psGlq3xWdVfmRAC9KcHHWzGeJ0SXQx75TUJNduAqmCiLs23y6BLbav3QRR+bddawZq5Ntp7xMTC1V42a2NAmBaIEejlOUm48xY7AMJ3HhN2jYQzUSUoDCCgPqCiAA/fp2H6eJfiNQS4ICQ6CUBdTkWETAHQmmXAplHntJZErkQVIAoXTmEDl5MM6qlh23MJKCvntGWXgX7dbejTzRY2ylQ/BCRMA6mNDYTjguC0ow4Km0zPYPUGBkkVxj8CKiUlOogUVQsnkor9XiozE5g6Vo/67KKXgg0RqsNO0ELG60JRlJloAxocOllen+gDYE3cBnyGSOvQRiUEDRCkLgelcPfD1yJMscv3gEJfg2RnaXAl6wBiFB7DgFMFFIUEIGzNmkIg4mAE0hpOoYjORxgJG4s0SAw2GxOk2oHozjc5Chu3VKHGw1UAxc0yIAAmATRbg2LC3Y/ofOS1xl1VVAUWp2Cs+usRxdabb2zq8wIP7p1WzBWFNliWeLY5BpIqv+cJ7bN0UEMDkuiRiH6liI5eqLQgNwMiVYvseOTPYU4W+XDrqKNcCBTI4icA8DfLQMAU1uoNVYrfIjZ7SgYy01QAUTtR9FQgghAA1X3mMzg+3nORjx2dyqAoiIcvCmow4q4jprz3G9MUwwHUQtIcA2WcozcjjFy3ufLxN7ZUuhb+MYsmjE2F3cYAitjuIqCIa91zEujYcS+/2omQ7DReXnUeM+eckl7pc1n8GADu/+8JTTpjeJxzzMjOsvP5f8hio4a2QnN4YukZ7M6vtr74pJeCGGzaWoHFS0ut/QdqlLrTmJlSxo9xRubmPBSst/vbwLaJj57EgNsP8ne3VyJeAgEBxghX4j0Zp9eg/dadvy9E4bHaAwBypR6SMn7sQ76vvD4+HMDwklLjwARpZNIfi3D2nIEfQkWliSl5JzHq7qM4UeT9GsBvZPx+AD77Zx+zbvUavA+Aif/zYVVFn1u/Fs+/5sbFagvRxJ4uXXrlW6+tu2AAuN/vF8F4/5Di/8pz4r/7DN5ZCKx44q8l6PmrA1bevNPYU1B95UR1mV79+3kEp4unlr9nWeLfAKzCJegnOKkP01e3s5dUhWoAiP69XNbDEzLE2uc6icpD/cTMBzNF394uvnBeOwFAMIYX0Bj6iQ2ESZK6TZr5TFPJDUC0ybD5c9rrfqJQ4VzX2dyf/n8l4p+ePaVWS1VLCamhkPwMDEQxRGq6lIYfmf8DzLdVIkz/+Z4AAAAASUVORK5CYII=",
                image2: "",
                image3: "",
                lastUpdated: new Date(),
                lastUpdatedBy: "",
                isCar: enums_1.Enums.YesNo.No,
                mt3: 0,
                batchRequested: enums_1.Enums.YesNo.No,
                serialNumberRequests: enums_1.Enums.YesNo.No,
                isMasterPack: enums_1.Enums.YesNo.No,
                erpAveragePrice: 0,
                weightMeasurement: "",
                explodeInReception: enums_1.Enums.YesNo.No,
                handleTone: enums_1.Enums.YesNo.No,
                handleCaliber: enums_1.Enums.YesNo.No,
                usePickingLine: enums_1.Enums.YesNo.No,
                qualityControl: enums_1.Enums.YesNo.No,
                measurementUnit: "Unidad",
                measurementQty: 1,
                quantity: 1,
                batch: "",
                expirationDate: new Date(),
                tone: "",
                caliber: "",
                vin: "",
                showDetails: false,
                icon: "",
                SerialNumbers: []
            };
        }
        static createMaterialMasterPack() {
            return {
                MASTER_PACK_HEADER_ID: 0,
                LICENSE_ID: 0,
                MATERIAL_ID: "",
                MATERIAL_NAME: "",
                POLICY_HEADER_ID: 0,
                LAST_UPDATED: new Date(),
                LAST_UPDATE_BY: "",
                EXPLODED: enums_1.Enums.YesNo.No,
                EXPLODED_DATE: new Date(),
                RECEPTION_DATE: new Date(),
                QTY: 0,
                BATCH: "",
                DATE_EXPIRATION: new Date()
            };
        }
        static createSerialNumber() {
            return {
                id: 0,
                licenseId: 0,
                materialId: "",
                serial: "",
                batch: "",
                dateExpiration: new Date(),
                status: 0,
                assignedTo: "",
                wavePickingId: 0
            };
        }
        static createCharge() {
            return {
                typeChargeId: 0,
                charge: "",
                description: "",
                warehouseWeather: "",
                regime: enums_1.Enums.Regime.General,
                comment: "",
                dayTrip: "",
                serviceCode: "",
                toMovil: 1,
                qty: 0
            };
        }
        static createShelfSpot() {
            return {
                warehouseParent: "",
                zone: "",
                locationSpot: "",
                spotType: enums_1.Enums.LocationType.Hall,
                spotOrderby: 0,
                spotAisle: 0,
                spotColumn: "",
                spotLevel: "",
                spotPartition: 0,
                spotLabel: "",
                allowPicking: enums_1.Enums.YesNo.No,
                allowStorage: enums_1.Enums.YesNo.No,
                allowRealloc: enums_1.Enums.YesNo.No,
                available: enums_1.Enums.YesNo.No,
                lineId: "",
                spotLine: "",
                locationOverloaded: 0,
                maxMt2Occupancy: 0,
                maxWeight: 0,
                section: "",
                volume: 0,
                ShelfSpotVolumeAndWeight: this.createShelfSpotVolumeAndWeight(),
                isWaste: 0,
                allowFastPicking: 0
            };
        }
        static createShelfSpotVolumeAndWeight() {
            return {
                availableWeight: 0,
                weightIcon: "close",
                weightIconColor: "danger",
                availableVolume: 0,
                volumeIcon: "close",
                volumeIconColor: "danger"
            };
        }
        static createPickingTaskHeader() {
            return {
                wavePickingId: 0,
                qtyPending: 0,
                qtyAssigned: 0,
                Material: this.createMaterial(),
                Tasks: [this.createTask()],
                icon: "arrow-dropdown",
                showDetails: false,
                SerialNumbers: [],
                qty: 0
            };
        }
        static createWavePickingForLicenseDispatch() {
            return {
                WAVE_PICKING_ID: 0,
                DOC_NUM: 0,
                CLIENT_NAME: "",
                DELIVERY_DATE: new Date()
            };
        }
        static createLicenseDispatch() {
            return {
                licenseId: 0,
                location: "",
                pickedBy: "",
                detail: [],
                showDetails: false,
                icon: "arrow-dropright-circle",
                isComplete: false,
                showScanIcon: false,
                correlative: 0
            };
        }
        static createDetailLicenseDispatch() {
            return {
                materialId: "",
                materialName: "",
                qty: 0,
                qtyOrigin: 0
            };
        }
        static createLicenseDispatchForPickingRequest() {
            return {
                CURRENT_LOCATION: "",
                LAST_UPDATED_BY: "",
                LICENSE_ID: 0,
                MATERIAL_ID: "",
                MATERIAL_NAME: "",
                QTY: 0,
                QTY_ORIGIN: 0
            };
        }
    }
    Model.Factory = Factory;
})(Model = exports.Model || (exports.Model = {}));
//# sourceMappingURL=models.js.map