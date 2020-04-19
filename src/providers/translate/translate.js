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
const core_2 = require("@ngx-translate/core");
const enums_1 = require("../../enums/enums");
/*
  Generated class for the TranslateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let TranslateProvider = class TranslateProvider {
    constructor(translate) {
        this.translate = translate;
    }
    translateGroup(group) {
        return new Promise(resolve => {
            this.translate.get(`${group}`).subscribe((value) => {
                resolve(value);
            });
        });
    }
    translateGroupValue(group, groupValue) {
        return new Promise(resolve => {
            this.translate
                .get(`${group}.${groupValue}`)
                .subscribe((value) => {
                resolve(value);
            });
        });
    }
    translateEntityMessageFromServerErrorCode(code, resource = "Resource", plural = false) {
        return this.translateGroupValue(plural
            ? enums_1.Enums.Translation.Groups.EntityResources
            : enums_1.Enums.Translation.Groups.EntityResource, resource).then(translatedResource => {
            return this.translateMessageFromErrorCode(code, translatedResource);
        });
    }
    translateMessageFromErrorCode(code, resource = "Resource") {
        let label = null;
        switch (code) {
            case enums_1.Enums.CustomErrorCodes.Ok:
                label = "Success-Proccess_";
                break;
            case enums_1.Enums.CustomErrorCodes.UnknownError:
                label = "Server-Error_";
                break;
            case enums_1.Enums.CustomErrorCodes.AuthenticationFailed:
                label = "User-or-password-is-incorrect_";
                break;
            case enums_1.Enums.CustomErrorCodes.InternalServerError:
                label = "The-operation-was-not-executed_";
                break;
            case enums_1.Enums.CustomErrorCodes.NotFound:
                label = "There-is-no-connection-to-the-server_";
                break;
            case enums_1.Enums.CustomErrorCodes.DataBaseError:
                label = "Server-did-not-respond-properly_";
                break;
            case enums_1.Enums.CustomErrorCodes.InsertDataBaseError:
                label = "Resource-was-not-added_";
                break;
            case enums_1.Enums.CustomErrorCodes.UpdateDataBaseError:
                label = "Resource-was-not-updated_";
                break;
            case enums_1.Enums.CustomErrorCodes.DeleteDataError:
                label = "Resource-was-not-removed_";
                break;
            case enums_1.Enums.CustomErrorCodes.GetDataError:
                label = "Cant-get-list-of-resources_";
                break;
            case enums_1.Enums.CustomErrorCodes.DataNotFound:
                label = "Resource-was-not-found_";
                break;
            case enums_1.Enums.CustomErrorCodes.ResourceIsBusy:
                label = "Device-is-busy_";
                break;
            case enums_1.Enums.CustomErrorCodes.Forbidden:
                label = "Operation-is-forbidden_";
                break;
            case enums_1.Enums.CustomErrorCodes.InvalidInput:
                label = "Invalid-input_";
                break;
            case enums_1.Enums.CustomErrorCodes.LoadPage:
                label = "Load-page_";
                break;
            case enums_1.Enums.CustomErrorCodes.InvalidQuantity:
                label = "Invalid_quantity_";
                break;
            case enums_1.Enums.CustomErrorCodes.AllSeriesScanned:
                label = "All_series_scanned_";
                break;
            case enums_1.Enums.CustomErrorCodes.SerieNotInTask:
                label = "Serie_not_in_task_";
                break;
            case enums_1.Enums.CustomErrorCodes.SerieIsReserved:
                label = "Serie_is_reserved_";
                break;
            case enums_1.Enums.CustomErrorCodes.FieldsRequired:
                label = "Fields-required_";
                break;
            case enums_1.Enums.CustomErrorCodes.LicenseDoesntExist:
                label = "License-doesnt-exist_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .TargetLocationIsNotAvailableForRelocation:
                label = "Target-location-is-not-available-for-relocation_";
                break;
            case enums_1.Enums.CustomErrorCodes.LicenseIsAlreadyInLocationTarget:
                label = "License-is-already-in-location-target_";
                break;
            case enums_1.Enums.CustomErrorCodes.LocationDoesntExist:
                label = "Location-doesnt-exist_";
                break;
            case enums_1.Enums.CustomErrorCodes.ClassCompatibilityIssue:
                label = "Class-compatibility-issue_";
                break;
            case enums_1.Enums.CustomErrorCodes.TargetLocationIsNotAvailableForStorage:
                label = "Target-location-is-not-available-for-storage_";
                break;
            case enums_1.Enums.CustomErrorCodes.UserHasNoAccessToLocation:
                label = "User-has-no-access-to-location_";
                break;
            case enums_1.Enums.CustomErrorCodes.LocationShouldBeInWarehouse:
                label = "Location-should-be-in-warehouse_";
                break;
            case enums_1.Enums.CustomErrorCodes.NotEnoughInventoryOnTargetLicense:
                label = "Not-enough-inventory-on-target-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.TaskIsClosed:
                label = "Task-is-closed_";
                break;
            case enums_1.Enums.CustomErrorCodes.InvalidSku:
                label = "Invalid-sku_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialDoesntExist:
                label = "Material-doesnt-exist_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialDoesntBelongToReturn:
                label = "Material-doesnt-belong-to-return_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .ReceptionQuantityIsHigherThanReturnQuantity:
                label = "Reception-quantity-is-higher-than-return-quantity_";
                break;
            case enums_1.Enums.CustomErrorCodes.ToneOrCaliberIsDifferentFromBefore:
                label = "Tone-or-caliber-is-different-from-before_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .CantEnterAProductRelatedToAMasterpackInLicense:
                label =
                    "Cant-enter-a-product-related-to-a-masterpack-in-the-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.VinAlreadyExists:
                label = "Vin-already-exist_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .BatchOrExpirationDateIsDifferentFromBefore:
                label = "Batch-or-expiration-date-is-different-from-before_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialStatusIsDifferentFromBefore:
                label = "Material-status-is-different-from-before_";
                break;
            case enums_1.Enums.CustomErrorCodes.PrinterDidNotRespond:
                label = "Printer-did-not-respond_";
                break;
            case enums_1.Enums.CustomErrorCodes.CouldNotDisconnectPrinter:
                label = "Could-not-disconnect-printer_";
                break;
            case enums_1.Enums.CustomErrorCodes.UnableToSendDocumentToPrinter:
                label = "Unable-to-send-document-to-printer_";
                break;
            case enums_1.Enums.CustomErrorCodes.CannotEstablishConnectionToPrinter:
                label = "Cannot-establish-connection-to-printer_";
                break;
            case enums_1.Enums.CustomErrorCodes.BluetoothDisabled:
                label = "Bluetooth-disabled_";
                break;
            case enums_1.Enums.CustomErrorCodes.PrinterNotConfigured:
                label = "Printer-not-configured_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .QuantityInLicenseIsGreaterThanLicenseSource:
                label = "Quantity-in-license-is-greater-than-license-source_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .StatusOfLicenseNotAllowsRelocationOfLicense:
                label = "Status-of-license-not-allows-relocation-of-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.StatusOfLicenseNotAllowsRelocationOfSku:
                label = "Status-of-license-not-allows-relocation-of-sku_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialDoesntBelongToLicense:
                label = "Material-doesnt-belong-to-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.NoPendingMergeLicenses:
                label = "There-are-no-pending-licenses-to-merge_";
                break;
            case enums_1.Enums.CustomErrorCodes.InvalidDocumentId:
                label = "Invalid-document-id_";
                break;
            case enums_1.Enums.CustomErrorCodes.DocumentDoesntExist:
                label = "Document-doesnt-exist_";
                break;
            case enums_1.Enums.CustomErrorCodes.YouDontHaveAccessToTargetWarehouse:
                label = "You-dont-have-access-to-target-warehouse_";
                break;
            case enums_1.Enums.CustomErrorCodes.CantInsertReceptionsPolicy:
                label = "Cant-insert-receptions-policy_";
                break;
            case enums_1.Enums.CustomErrorCodes.CantInsertReceptionTask:
                label = "Cant-insert-reception-task_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .TheresReceptionTasksStillOpenForTheDocument:
                label =
                    "There-are-reception-tasks-still-open-for-the-document_";
                break;
            case enums_1.Enums.CustomErrorCodes.ManifestAlreadyCertified:
                label = "The-manifest-has-already-been-certified_";
                break;
            case enums_1.Enums.CustomErrorCodes.ManifestStatusIsInvalid:
                label = "Manifest-current-status-is-invalid-for-certifying";
                break;
            case enums_1.Enums.CustomErrorCodes
                .SerialNumberWasAlreadyUsedByAnotherDocument:
                label = "Serial-number-was-already-used-by-another-document_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .ThereAreNoTermsOfTradeConfiguredForTheClientInMergeLicense:
                label =
                    "There-are-no-terms-of-trade-configured-for-the-client-in-merge-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialAlreadyCounted:
                label = "Material-already-counted_";
                break;
            case enums_1.Enums.CustomErrorCodes.TaskReassignedOrUnavailable:
                label = "Task-Reassigned-Or-Unavailable_";
                break;
            case enums_1.Enums.CustomErrorCodes.ThereIsNoConfiguredAsMasterPack:
                label = "There-is-no-configured-as-masterpack_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .MasterPackDoesNotHaveMaterialsForExplode:
                label = "Masterpack-does-not-have-materials-for-explode_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialDoesNotExistsInLicense:
                label = "Material-does-not-exists-in-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.MasterPackDoesNotConfiguredComponents:
                label = "Masterpack-does-not-configured-components_";
                break;
            case enums_1.Enums.CustomErrorCodes.MasterPackAlreadyExplodeInReception:
                label = "Masterpack-already-explode-in-reception_";
                break;
            case enums_1.Enums.CustomErrorCodes.MasterPackWasAlreadyExplode:
                label = "Masterpack-was-already-explode_";
                break;
            case enums_1.Enums.CustomErrorCodes.InputExceedsTasksAssignedQuantity:
                label = "Input-exceeds-tasks-assigned-quantity_";
                break;
            case enums_1.Enums.CustomErrorCodes.InvalidLocation:
                label = "Invalid-location_";
                break;
            case enums_1.Enums.CustomErrorCodes.TargetLocationDoesntMatchStatusLocation:
                label = "Target-location-doesnt-match-status-location_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .LicenseDispatchThereIsAlreadyProductWithThatBach:
                label =
                    "License-dispatch-there-is-already-product-with-that-bach_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .LicenseDispatchThereIsAlreadyProductWithThatToneOrCaliber:
                label =
                    "License-dispatch-there-is-already-product-with-that-tone-or-caliber_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .LocationScannedDoesNotMatchWithTargetLocationDispatch:
                label =
                    "Location-scanned-does-not-match-with-target-location-dispatch_";
                break;
            case enums_1.Enums.CustomErrorCodes.LocationDoesNotScanned:
                label = "Location-does-not-scanned_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .LicenseScannedDoesNotMatchWithLicenseDispatch:
                label = "License-scanned-does-not-match-with-license-dispatch_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .DoesNotExistsAnLicensesWithTargetLocation:
                label = "Does-not-exists-an-license-with-target-location_";
                break;
            case enums_1.Enums.CustomErrorCodes.LicensesDispatchHasBeenLocated:
                label = "License-dispatch-has-been-located_";
                break;
            case enums_1.Enums.CustomErrorCodes.InventoryLockedByInterfaces:
                label = "Inventory-bloqued-by-interfaces_";
                break;
            case enums_1.Enums.CustomErrorCodes.DocumentsNotSendToErp:
                label = "Documents-not-send-to-erp_";
                break;
            case enums_1.Enums.CustomErrorCodes.SerialNumberSuppliedIsAlreadyInUse:
                label = "Serial-number-supplied-is-already-in-use_";
                break;
            case enums_1.Enums.CustomErrorCodes.NotEnoughInventoryOnSourceLicense:
                label = "Not-enough-inventory-on-source-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialDoesntBelongToDocument:
                label = "Material-doesnt-belong-to-document_";
                break;
            case enums_1.Enums.CustomErrorCodes.MaterialInfoWasNotFound:
                label = "Material-info-was-not-found_";
                break;
            case enums_1.Enums.CustomErrorCodes.StartValueMustBeSameLenghtEndValue:
                label = "Start-value-must-be-same-lenght-end-value_";
                break;
            case enums_1.Enums.CustomErrorCodes.ValueIsNotANumber:
                label = "Value-is-not-a-number_";
                break;
            case enums_1.Enums.CustomErrorCodes
                .ExceedMaximunLimitSeriesRankByMaterialInLicense:
                label =
                    "Exceed-maximun-limit-series-rank-by-material-in-license_";
                break;
            case enums_1.Enums.CustomErrorCodes.UserIsBloqued:
                label = "User-is-blocked_";
                break;
            case enums_1.Enums.CustomErrorCodes.ClassincompatibilitiesOfTheZone_:
                label = "Class_incompatibilities_of_the_zone_";
                break;
            case enums_1.Enums.CustomErrorCodes.BatchNumberDifferentFromTheStored:
                label = "Batch-number-different-from-the-stored_";
                break;
            case enums_1.Enums.CustomErrorCodes.ToneDifferentFromTheStored:
                label = "Tone-number-different-from-the-stored_";
                break;
            case enums_1.Enums.CustomErrorCodes.CaliberDifferentFromTheStored:
                label = "Caliber-number-different-from-the-stored_";
                break;
            case enums_1.Enums.CustomErrorCodes.StatusDifferentFromTheStored:
                label = "Status-number-different-from-the-stored_";
                break;
            case enums_1.Enums.CustomErrorCodes.StoredMaterialOfDifferentProject:
                label = "Stored-material-of-different-project_";
                break;
            case enums_1.Enums.CustomErrorCodes.StoredMaterialOfAProject:
                label = "Stored-material-of-a-project_";
                break;
            case enums_1.Enums.CustomErrorCodes.YouMustenterThePhysicalSpaces:
                label = "You-mustenter-the-physical-spaces_";
                break;
            default:
                label = "An-error-was-ocurred_";
                break;
        }
        return Promise.all([
            this.translateGroupValue(enums_1.Enums.Translation.Groups.CustomErrors, label),
            this.translateGroupValue(enums_1.Enums.Translation.Groups.Resources, resource)
        ]).then(translatedLabels => {
            return Promise.resolve(translatedLabels[0].replace("${resource}", translatedLabels[1].indexOf(enums_1.Enums.Translation.Groups.Resources) >= 0
                ? resource
                : translatedLabels[1]));
        });
    }
};
TranslateProvider = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [core_2.TranslateService])
], TranslateProvider);
exports.TranslateProvider = TranslateProvider;
//# sourceMappingURL=translate.js.map