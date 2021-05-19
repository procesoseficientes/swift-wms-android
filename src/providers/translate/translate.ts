import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Enums } from "../../enums/enums";
/*
  Generated class for the TranslateProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TranslateProvider {
    constructor(private translate: TranslateService) {}

    public translateGroup(group: Enums.Translation.Groups): Promise<any> {
        return new Promise(resolve => {
            this.translate.get(`${group}`).subscribe((value: any) => {
                resolve(value);
            });
        });
    }

    public translateGroupValue(
        group: Enums.Translation.Groups,
        groupValue: string
    ): Promise<string> {
        return new Promise(resolve => {
            this.translate
                .get(`${group}.${groupValue}`)
                .subscribe((value: string) => {
                    resolve(value);
                });
        });
    }

    public translateEntityMessageFromServerErrorCode(
        code: Enums.CustomErrorCodes,
        resource: string = "Resource",
        plural: boolean = false
    ): Promise<string> {
        return this.translateGroupValue(
            plural
                ? Enums.Translation.Groups.EntityResources
                : Enums.Translation.Groups.EntityResource,
            resource
        ).then(translatedResource => {
            return this.translateMessageFromErrorCode(code, translatedResource);
        });
    }

    public translateMessageFromErrorCode(
        code: Enums.CustomErrorCodes,
        resource: string = "Resource"
    ): Promise<any> {
        let label: string = null;

        switch (code) {
            case Enums.CustomErrorCodes.Ok:
                label = "Success-Proccess_";
                break;
            case Enums.CustomErrorCodes.UnknownError:
                label = "Server-Error_";
                break;
            case Enums.CustomErrorCodes.AuthenticationFailed:
                label = "User-or-password-is-incorrect_";
                break;
            case Enums.CustomErrorCodes.InternalServerError:
                label = "The-operation-was-not-executed_";
                break;
            case Enums.CustomErrorCodes.NotFound:
                label = "There-is-no-connection-to-the-server_";
                break;
            case Enums.CustomErrorCodes.DataBaseError:
                label = "Server-did-not-respond-properly_";
                break;
            case Enums.CustomErrorCodes.InsertDataBaseError:
                label = "Resource-was-not-added_";
                break;
            case Enums.CustomErrorCodes.UpdateDataBaseError:
                label = "Resource-was-not-updated_";
                break;
            case Enums.CustomErrorCodes.DeleteDataError:
                label = "Resource-was-not-removed_";
                break;
            case Enums.CustomErrorCodes.GetDataError:
                label = "Cant-get-list-of-resources_";
                break;
            case Enums.CustomErrorCodes.DataNotFound:
                label = "Resource-was-not-found_";
                break;
            case Enums.CustomErrorCodes.ResourceIsBusy:
                label = "Device-is-busy_";
                break;
            case Enums.CustomErrorCodes.Forbidden:
                label = "Operation-is-forbidden_";
                break;
            case Enums.CustomErrorCodes.InvalidInput:
                label = "Invalid-input_";
                break;
            case Enums.CustomErrorCodes.LoadPage:
                label = "Load-page_";
                break;
            case Enums.CustomErrorCodes.InvalidQuantity:
                label = "Invalid_quantity_";
                break;
            case Enums.CustomErrorCodes.AllSeriesScanned:
                label = "All_series_scanned_";
                break;
            case Enums.CustomErrorCodes.SerieNotInTask:
                label = "Serie_not_in_task_";
                break;
            case Enums.CustomErrorCodes.SerieIsReserved:
                label = "Serie_is_reserved_";
                break;
            case Enums.CustomErrorCodes.FieldsRequired:
                label = "Fields-required_";
                break;
            case Enums.CustomErrorCodes.LicenseDoesntExist:
                label = "License-doesnt-exist_";
                break;
            case Enums.CustomErrorCodes
                .TargetLocationIsNotAvailableForRelocation:
                label = "Target-location-is-not-available-for-relocation_";
                break;
            case Enums.CustomErrorCodes.LicenseIsAlreadyInLocationTarget:
                label = "License-is-already-in-location-target_";
                break;
            case Enums.CustomErrorCodes.LocationDoesntExist:
                label = "Location-doesnt-exist_";
                break;
            case Enums.CustomErrorCodes.ClassCompatibilityIssue:
                label = "Class-compatibility-issue_";
                break;
            case Enums.CustomErrorCodes.TargetLocationIsNotAvailableForStorage:
                label = "Target-location-is-not-available-for-storage_";
                break;
            case Enums.CustomErrorCodes.UserHasNoAccessToLocation:
                label = "User-has-no-access-to-location_";
                break;
            case Enums.CustomErrorCodes.LocationShouldBeInWarehouse:
                label = "Location-should-be-in-warehouse_";
                break;
            case Enums.CustomErrorCodes.NotEnoughInventoryOnTargetLicense:
                label = "Not-enough-inventory-on-target-license_";
                break;
            case Enums.CustomErrorCodes.TaskIsClosed:
                label = "Task-is-closed_";
                break;
            case Enums.CustomErrorCodes.InvalidSku:
                label = "Invalid-sku_";
                break;
            case Enums.CustomErrorCodes.MaterialDoesntExist:
                label = "Material-doesnt-exist_";
                break;
            case Enums.CustomErrorCodes.MaterialDoesntBelongToReturn:
                label = "Material-doesnt-belong-to-return_";
                break;
            case Enums.CustomErrorCodes
                .ReceptionQuantityIsHigherThanReturnQuantity:
                label = "Reception-quantity-is-higher-than-return-quantity_";
                break;
            case Enums.CustomErrorCodes.ToneOrCaliberIsDifferentFromBefore:
                label = "Tone-or-caliber-is-different-from-before_";
                break;
            case Enums.CustomErrorCodes
                .CantEnterAProductRelatedToAMasterpackInLicense:
                label =
                    "Cant-enter-a-product-related-to-a-masterpack-in-the-license_";
                break;
            case Enums.CustomErrorCodes.VinAlreadyExists:
                label = "Vin-already-exist_";
                break;
            case Enums.CustomErrorCodes
                .BatchOrExpirationDateIsDifferentFromBefore:
                label = "Batch-or-expiration-date-is-different-from-before_";
                break;
            case Enums.CustomErrorCodes.MaterialStatusIsDifferentFromBefore:
                label = "Material-status-is-different-from-before_";
                break;
            case Enums.CustomErrorCodes.PrinterDidNotRespond:
                label = "Printer-did-not-respond_";
                break;
            case Enums.CustomErrorCodes.CouldNotDisconnectPrinter:
                label = "Could-not-disconnect-printer_";
                break;
            case Enums.CustomErrorCodes.UnableToSendDocumentToPrinter:
                label = "Unable-to-send-document-to-printer_";
                break;
            case Enums.CustomErrorCodes.CannotEstablishConnectionToPrinter:
                label = "Cannot-establish-connection-to-printer_";
                break;
            case Enums.CustomErrorCodes.BluetoothDisabled:
                label = "Bluetooth-disabled_";
                break;
            case Enums.CustomErrorCodes.PrinterNotConfigured:
                label = "Printer-not-configured_";
                break;
            case Enums.CustomErrorCodes
                .QuantityInLicenseIsGreaterThanLicenseSource:
                label = "Quantity-in-license-is-greater-than-license-source_";
                break;
            case Enums.CustomErrorCodes
                .StatusOfLicenseNotAllowsRelocationOfLicense:
                label = "Status-of-license-not-allows-relocation-of-license_";
                break;
            case Enums.CustomErrorCodes.StatusOfLicenseNotAllowsRelocationOfSku:
                label = "Status-of-license-not-allows-relocation-of-sku_";
                break;
            case Enums.CustomErrorCodes.MaterialDoesntBelongToLicense:
                label = "Material-doesnt-belong-to-license_";
                break;
            case Enums.CustomErrorCodes.NoPendingMergeLicenses:
                label = "There-are-no-pending-licenses-to-merge_";
                break;
            case Enums.CustomErrorCodes.InvalidDocumentId:
                label = "Invalid-document-id_";
                break;
            case Enums.CustomErrorCodes.DocumentDoesntExist:
                label = "Document-doesnt-exist_";
                break;
            case Enums.CustomErrorCodes.YouDontHaveAccessToTargetWarehouse:
                label = "You-dont-have-access-to-target-warehouse_";
                break;
            case Enums.CustomErrorCodes.CantInsertReceptionsPolicy:
                label = "Cant-insert-receptions-policy_";
                break;
            case Enums.CustomErrorCodes.CantInsertReceptionTask:
                label = "Cant-insert-reception-task_";
                break;
            case Enums.CustomErrorCodes
                .TheresReceptionTasksStillOpenForTheDocument:
                label =
                    "There-are-reception-tasks-still-open-for-the-document_";
                break;
            case Enums.CustomErrorCodes.ManifestAlreadyCertified:
                label = "The-manifest-has-already-been-certified_";
                break;
            case Enums.CustomErrorCodes.ManifestStatusIsInvalid:
                label = "Manifest-current-status-is-invalid-for-certifying";
                break;
            case Enums.CustomErrorCodes
                .SerialNumberWasAlreadyUsedByAnotherDocument:
                label = "Serial-number-was-already-used-by-another-document_";
                break;
            case Enums.CustomErrorCodes
                .ThereAreNoTermsOfTradeConfiguredForTheClientInMergeLicense:
                label =
                    "There-are-no-terms-of-trade-configured-for-the-client-in-merge-license_";
                break;
            case Enums.CustomErrorCodes.MaterialAlreadyCounted:
                label = "Material-already-counted_";
                break;
            case Enums.CustomErrorCodes.TaskReassignedOrUnavailable:
                label = "Task-Reassigned-Or-Unavailable_";
                break;
            case Enums.CustomErrorCodes.ThereIsNoConfiguredAsMasterPack:
                label = "There-is-no-configured-as-masterpack_";
                break;
            case Enums.CustomErrorCodes
                .MasterPackDoesNotHaveMaterialsForExplode:
                label = "Masterpack-does-not-have-materials-for-explode_";
                break;
            case Enums.CustomErrorCodes.MaterialDoesNotExistsInLicense:
                label = "Material-does-not-exists-in-license_";
                break;
            case Enums.CustomErrorCodes.MasterPackDoesNotConfiguredComponents:
                label = "Masterpack-does-not-configured-components_";
                break;
            case Enums.CustomErrorCodes.MasterPackAlreadyExplodeInReception:
                label = "Masterpack-already-explode-in-reception_";
                break;
            case Enums.CustomErrorCodes.MasterPackWasAlreadyExplode:
                label = "Masterpack-was-already-explode_";
                break;
            case Enums.CustomErrorCodes.InputExceedsTasksAssignedQuantity:
                label = "Input-exceeds-tasks-assigned-quantity_";
                break;
            case Enums.CustomErrorCodes.InvalidLocation:
                label = "Invalid-location_";
                break;
            case Enums.CustomErrorCodes.TargetLocationDoesntMatchStatusLocation:
                label = "Target-location-doesnt-match-status-location_";
                break;
            case Enums.CustomErrorCodes
                .LicenseDispatchThereIsAlreadyProductWithThatBach:
                label =
                    "License-dispatch-there-is-already-product-with-that-bach_";
                break;
            case Enums.CustomErrorCodes
                .LicenseDispatchThereIsAlreadyProductWithThatToneOrCaliber:
                label =
                    "License-dispatch-there-is-already-product-with-that-tone-or-caliber_";
                break;

            case Enums.CustomErrorCodes
                .LocationScannedDoesNotMatchWithTargetLocationDispatch:
                label =
                    "Location-scanned-does-not-match-with-target-location-dispatch_";
                break;

            case Enums.CustomErrorCodes.LocationDoesNotScanned:
                label = "Location-does-not-scanned_";
                break;

            case Enums.CustomErrorCodes
                .LicenseScannedDoesNotMatchWithLicenseDispatch:
                label = "License-scanned-does-not-match-with-license-dispatch_";
                break;
            case Enums.CustomErrorCodes
                .DoesNotExistsAnLicensesWithTargetLocation:
                label = "Does-not-exists-an-license-with-target-location_";
                break;
            case Enums.CustomErrorCodes.LicensesDispatchHasBeenLocated:
                label = "License-dispatch-has-been-located_";
                break;
            case Enums.CustomErrorCodes.InventoryLockedByInterfaces:
                label = "Inventory-bloqued-by-interfaces_";
                break;
            case Enums.CustomErrorCodes.DocumentsNotSendToErp:
                label = "Documents-not-send-to-erp_";
                break;
            case Enums.CustomErrorCodes.SerialNumberSuppliedIsAlreadyInUse:
                label = "Serial-number-supplied-is-already-in-use_";
                break;
            case Enums.CustomErrorCodes.NotEnoughInventoryOnSourceLicense:
                label = "Not-enough-inventory-on-source-license_";
                break;
            case Enums.CustomErrorCodes.MaterialDoesntBelongToDocument:
                label = "Material-doesnt-belong-to-document_";
                break;
            case Enums.CustomErrorCodes.MaterialInfoWasNotFound:
                label = "Material-info-was-not-found_";
                break;
            case Enums.CustomErrorCodes.StartValueMustBeSameLenghtEndValue:
                label = "Start-value-must-be-same-lenght-end-value_";
                break;
            case Enums.CustomErrorCodes.ValueIsNotANumber:
                label = "Value-is-not-a-number_";
                break;
            case Enums.CustomErrorCodes
                .ExceedMaximunLimitSeriesRankByMaterialInLicense:
                label =
                    "Exceed-maximun-limit-series-rank-by-material-in-license_";
                break;
            case Enums.CustomErrorCodes.UserIsBloqued:
                label = "User-is-blocked_";
                break;
            case Enums.CustomErrorCodes.ClassincompatibilitiesOfTheZone_:
                label = "Class_incompatibilities_of_the_zone_";
                break;
            case Enums.CustomErrorCodes.BatchNumberDifferentFromTheStored:
                label = "Batch-number-different-from-the-stored_";
                break;
            case Enums.CustomErrorCodes.ToneDifferentFromTheStored:
                label = "Tone-number-different-from-the-stored_";
                break;
            case Enums.CustomErrorCodes.CaliberDifferentFromTheStored:
                label = "Caliber-number-different-from-the-stored_";
                break;
            case Enums.CustomErrorCodes.StatusDifferentFromTheStored:
                label = "Status-number-different-from-the-stored_";
                break;
            case Enums.CustomErrorCodes.StoredMaterialOfDifferentProject:
                label = "Stored-material-of-different-project_";
                break;
            case Enums.CustomErrorCodes.StoredMaterialOfAProject:
                label = "Stored-material-of-a-project_";
                break;
            case Enums.CustomErrorCodes.YouMustenterThePhysicalSpaces:
                label = "You-mustenter-the-physical-spaces_";
            break;
            case Enums.CustomErrorCodes.MaterialStatusDoesNotMatch:
                label = "Material-status-does-not-match_";
            break;
            default:
                label = "An-error-was-ocurred_";
                break;
        }

        return Promise.all([
            this.translateGroupValue(
                Enums.Translation.Groups.CustomErrors,
                label
            ),
            this.translateGroupValue(
                Enums.Translation.Groups.Resources,
                resource
            )
        ]).then(translatedLabels => {
            return Promise.resolve(
                translatedLabels[0].replace(
                    "${resource}",
                    translatedLabels[1].indexOf(
                        Enums.Translation.Groups.Resources
                    ) >= 0
                        ? resource
                        : translatedLabels[1]
                )
            );
        });
    }
}
