"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Enums;
(function (Enums) {
    class Socket {
    }
    Socket.OwnEvents = {
        Connection: "connection",
        Connect: "connect",
        Disconnect: "disconnect",
        Authenticate: "authenticate"
    };
    Socket.Request = {
        Handshake: "HandshakeRequest",
        GetBroadcast: "GetBroadcastRequest",
        GetBroadcastLost: "GetBroadcastLostRequest"
    };
    Socket.Response = {
        Handshake: "HandshakeResponse",
        GetBroadcast: "GetBroadcastResponse",
        GetBroadcastLost: "GetBroadcastLostResponse"
    };
    Enums.Socket = Socket;
    let Translation;
    (function (Translation) {
        let Groups;
        (function (Groups) {
            Groups["Labels"] = "_label";
            Groups["Buttons"] = "_button";
            Groups["Segments"] = "_segments";
            Groups["TitleView"] = "_title_view";
            Groups["WaitingMessage"] = "_waitingMessage";
            Groups["Info"] = "_info";
            Groups["PlaceHolders"] = "_placeholder";
            Groups["Tabs"] = "_tab";
            Groups["Messages"] = "_message";
            Groups["Alerts"] = "_alert";
            Groups["Draft"] = "DRAFT";
            Groups["Reports"] = "_reports";
            Groups["Abbreviations"] = "_abbreviations";
            Groups["Swift"] = "_Swift";
            Groups["CustomErrors"] = "_customErrors";
            Groups["Resources"] = "_resources";
            Groups["OrderPrint"] = "_checkPrint";
            Groups["NotificationTitles"] = "_notificationTitles";
            Groups["NotificationDescriptions"] = "_notificationDescriptions";
            Groups["EntityResource"] = "_entityResource";
            Groups["EntityResources"] = "_entityResources";
            Groups["Title"] = "_title";
        })(Groups = Translation.Groups || (Translation.Groups = {}));
        let Title;
        (function (Title) {
            Title["Swift3PL"] = "Swift-3PL_";
            Title["EnterYourPin"] = "Enter-Your-Pin_";
        })(Title = Translation.Title || (Translation.Title = {}));
        let Message;
        (function (Message) {
            Message["VerifyPin"] = "Verify-PIN_";
            Message["ConfirmExit"] = "Exit-application_";
            Message["EnterScanData"] = "Enter-scan-data_";
            Message["SerialNumberNotFound"] = "Serial-number-not-found_";
        })(Message = Translation.Message || (Translation.Message = {}));
        let PlaceHolder;
        (function (PlaceHolder) {
            PlaceHolder["Pin"] = "PIN_";
            PlaceHolder["ScanData"] = "Scandata_";
        })(PlaceHolder = Translation.PlaceHolder || (Translation.PlaceHolder = {}));
        let Button;
        (function (Button) {
            Button["Ok"] = "OK_";
            Button["Cancel"] = "CANCEL_";
            Button["Add"] = "Add_";
            Button["Update"] = "Update_";
            Button["Replace"] = "Replace_";
            Button["PrintLicense"] = "Print-license_";
            Button["PrintLabel"] = "Print-label_";
            Button["PrintStatus"] = "Print-status_";
            Button["Yes"] = "YES_";
            Button["No"] = "NO_";
            Button["PartialRelocation"] = "Partial-relocation_";
            Button["CompleteRelocation"] = "Complete-relocation_";
            Button["ShowCountMaterials"] = "Show-count-materials_";
        })(Button = Translation.Button || (Translation.Button = {}));
        let Alert;
        (function (Alert) {
            Alert["MaterialAlreadyInLicense"] = "The-material-is-already-in-the-license-choose-an-action_";
            Alert["RollbackLicense"] = "Rollback-license_";
            Alert["RollbackSeries"] = "Rollback-series_";
            Alert["DeleteSerie"] = "Delete-serie_";
            Alert["FinishWithDifferences"] = "Finish-line-with-differences_";
            Alert["DifferentLocation"] = "Scanned-location-is-different-from-the-task-do-you-wish-to-continue_";
            Alert["BarcodeAlreadyCertified"] = "Barcode-already-certified_";
            Alert["DoYouWishToContinue"] = "Do-you-wish-to-continue_";
            Alert["LocationCompletedDoYouWishToRecount"] = "Location-completed-do-you-wish-to-recount_";
            Alert["QAStatusIsNotAvailable"] = "QA-status-is-not-available_";
            Alert["DoYouWantToProceedNewQuery"] = "Proceed-new-query-info-center_";
            Alert["DoYouWishToChangeTargetLocation"] = "Do-you-wish-to-change-target-location_";
            Alert["CreateANewLicenseWithIncompatibleClasses"] = "Create-a-new-license-with-incompatible-classes?_";
        })(Alert = Translation.Alert || (Translation.Alert = {}));
    })(Translation = Enums.Translation || (Enums.Translation = {}));
    let PromptType;
    (function (PromptType) {
        PromptType["Number"] = "number";
        PromptType["Text"] = "";
        PromptType["Password"] = "password";
    })(PromptType = Enums.PromptType || (Enums.PromptType = {}));
    class Messages {
    }
    Messages.ConnectionChange = "connectionChange";
    Enums.Messages = Messages;
    let InputType;
    (function (InputType) {
        InputType[InputType["RadioButton"] = "radio"] = "RadioButton";
        InputType[InputType["Checkbox"] = "checkbox"] = "Checkbox";
    })(InputType = Enums.InputType || (Enums.InputType = {}));
    let PackageStatus;
    (function (PackageStatus) {
        PackageStatus[PackageStatus["Created"] = 1] = "Created";
        PackageStatus[PackageStatus["SynchronizationPending"] = 2] = "SynchronizationPending";
        PackageStatus[PackageStatus["Synchronized"] = 3] = "Synchronized";
    })(PackageStatus = Enums.PackageStatus || (Enums.PackageStatus = {}));
    let ValidationTypes;
    (function (ValidationTypes) {
        ValidationTypes[ValidationTypes["PerDevice"] = "PerDevice"] = "PerDevice";
        ValidationTypes[ValidationTypes["PerUser"] = "PerUser"] = "PerUser";
    })(ValidationTypes = Enums.ValidationTypes || (Enums.ValidationTypes = {}));
    let YesNo;
    (function (YesNo) {
        YesNo[YesNo["No"] = 0] = "No";
        YesNo[YesNo["Yes"] = 1] = "Yes";
    })(YesNo = Enums.YesNo || (Enums.YesNo = {}));
    let OperationTypeAddSeriesRank;
    (function (OperationTypeAddSeriesRank) {
        OperationTypeAddSeriesRank["Reception"] = "Reception";
        OperationTypeAddSeriesRank["Relocation"] = "Partial Relocation";
        OperationTypeAddSeriesRank["Picking"] = "Picking";
    })(OperationTypeAddSeriesRank = Enums.OperationTypeAddSeriesRank || (Enums.OperationTypeAddSeriesRank = {}));
    class ToastType {
    }
    ToastType.Error = "error";
    ToastType.Info = "info";
    ToastType.Warning = "warning";
    ToastType.Success = "success";
    Enums.ToastType = ToastType;
    let ToastTime;
    (function (ToastTime) {
        ToastTime[ToastTime["Short"] = 1200] = "Short";
        ToastTime[ToastTime["Large"] = 3600] = "Large";
    })(ToastTime = Enums.ToastTime || (Enums.ToastTime = {}));
    let SpinnerType;
    (function (SpinnerType) {
        SpinnerType[SpinnerType["None"] = ""] = "None";
    })(SpinnerType = Enums.SpinnerType || (Enums.SpinnerType = {}));
    let ZebraHorizontalAlignment;
    (function (ZebraHorizontalAlignment) {
        ZebraHorizontalAlignment[ZebraHorizontalAlignment["Center"] = "CENTER"] = "Center";
        ZebraHorizontalAlignment[ZebraHorizontalAlignment["Left"] = "LEFT"] = "Left";
        ZebraHorizontalAlignment[ZebraHorizontalAlignment["Right"] = "RIGHT"] = "Right";
    })(ZebraHorizontalAlignment = Enums.ZebraHorizontalAlignment || (Enums.ZebraHorizontalAlignment = {}));
    let ZebraFonts;
    (function (ZebraFonts) {
        ZebraFonts[ZebraFonts["Standard"] = 0] = "Standard";
        ZebraFonts[ZebraFonts["Letter"] = 1] = "Letter";
        ZebraFonts[ZebraFonts["Type"] = 2] = "Type";
        ZebraFonts[ZebraFonts["Verdana"] = 4] = "Verdana";
        ZebraFonts[ZebraFonts["Times"] = 5] = "Times";
        ZebraFonts[ZebraFonts["Consolas"] = 7] = "Consolas";
    })(ZebraFonts = Enums.ZebraFonts || (Enums.ZebraFonts = {}));
    let CustomErrorCodes;
    (function (CustomErrorCodes) {
        CustomErrorCodes[CustomErrorCodes["Ok"] = 200] = "Ok";
        CustomErrorCodes[CustomErrorCodes["BadRequest"] = 400] = "BadRequest";
        CustomErrorCodes[CustomErrorCodes["AuthenticationFailed"] = 401] = "AuthenticationFailed";
        CustomErrorCodes[CustomErrorCodes["InternalServerError"] = 500] = "InternalServerError";
        CustomErrorCodes[CustomErrorCodes["NotFound"] = 404] = "NotFound";
        CustomErrorCodes[CustomErrorCodes["DataBaseError"] = 800] = "DataBaseError";
        CustomErrorCodes[CustomErrorCodes["InsertDataBaseError"] = 801] = "InsertDataBaseError";
        CustomErrorCodes[CustomErrorCodes["UpdateDataBaseError"] = 802] = "UpdateDataBaseError";
        CustomErrorCodes[CustomErrorCodes["DeleteDataError"] = 803] = "DeleteDataError";
        CustomErrorCodes[CustomErrorCodes["GetDataError"] = 804] = "GetDataError";
        CustomErrorCodes[CustomErrorCodes["DataNotFound"] = 805] = "DataNotFound";
        CustomErrorCodes[CustomErrorCodes["ResourceIsBusy"] = 810] = "ResourceIsBusy";
        CustomErrorCodes[CustomErrorCodes["UnknownError"] = 0] = "UnknownError";
        CustomErrorCodes[CustomErrorCodes["Forbidden"] = 403] = "Forbidden";
        CustomErrorCodes[CustomErrorCodes["FieldsRequired"] = 1000] = "FieldsRequired";
        CustomErrorCodes[CustomErrorCodes["InvalidInput"] = 1001] = "InvalidInput";
        CustomErrorCodes[CustomErrorCodes["LoadPage"] = 1002] = "LoadPage";
        CustomErrorCodes[CustomErrorCodes["InvalidQuantity"] = 1003] = "InvalidQuantity";
        CustomErrorCodes[CustomErrorCodes["AllSeriesScanned"] = 1004] = "AllSeriesScanned";
        CustomErrorCodes[CustomErrorCodes["SerieNotInTask"] = 1005] = "SerieNotInTask";
        CustomErrorCodes[CustomErrorCodes["SerieIsReserved"] = 1006] = "SerieIsReserved";
        CustomErrorCodes[CustomErrorCodes["InvalidLocation"] = 1007] = "InvalidLocation";
        CustomErrorCodes[CustomErrorCodes["LicenseDoesntExist"] = 1101] = "LicenseDoesntExist";
        CustomErrorCodes[CustomErrorCodes["TargetLocationIsNotAvailableForRelocation"] = 1102] = "TargetLocationIsNotAvailableForRelocation";
        CustomErrorCodes[CustomErrorCodes["LicenseIsAlreadyInLocationTarget"] = 1103] = "LicenseIsAlreadyInLocationTarget";
        CustomErrorCodes[CustomErrorCodes["LocationDoesntExist"] = 1104] = "LocationDoesntExist";
        CustomErrorCodes[CustomErrorCodes["ClassCompatibilityIssue"] = 1105] = "ClassCompatibilityIssue";
        CustomErrorCodes[CustomErrorCodes["TargetLocationIsNotAvailableForStorage"] = 1106] = "TargetLocationIsNotAvailableForStorage";
        CustomErrorCodes[CustomErrorCodes["UserHasNoAccessToLocation"] = 1107] = "UserHasNoAccessToLocation";
        CustomErrorCodes[CustomErrorCodes["LocationShouldBeInWarehouse"] = 1108] = "LocationShouldBeInWarehouse";
        CustomErrorCodes[CustomErrorCodes["MaterialDoesntExist"] = 1109] = "MaterialDoesntExist";
        CustomErrorCodes[CustomErrorCodes["MaterialDoesntBelongToReturn"] = 1110] = "MaterialDoesntBelongToReturn";
        CustomErrorCodes[CustomErrorCodes["ReceptionQuantityIsHigherThanReturnQuantity"] = 1111] = "ReceptionQuantityIsHigherThanReturnQuantity";
        CustomErrorCodes[CustomErrorCodes["CantEnterAProductRelatedToAMasterpackInLicense"] = 1112] = "CantEnterAProductRelatedToAMasterpackInLicense";
        CustomErrorCodes[CustomErrorCodes["VinAlreadyExists"] = 1113] = "VinAlreadyExists";
        CustomErrorCodes[CustomErrorCodes["BatchOrExpirationDateIsDifferentFromBefore"] = 1114] = "BatchOrExpirationDateIsDifferentFromBefore";
        CustomErrorCodes[CustomErrorCodes["ToneOrCaliberIsDifferentFromBefore"] = 1115] = "ToneOrCaliberIsDifferentFromBefore";
        CustomErrorCodes[CustomErrorCodes["MaterialStatusIsDifferentFromBefore"] = 1116] = "MaterialStatusIsDifferentFromBefore";
        CustomErrorCodes[CustomErrorCodes["TargetLocationDoesntMatchStatusLocation"] = 1117] = "TargetLocationDoesntMatchStatusLocation";
        CustomErrorCodes[CustomErrorCodes["NotEnoughInventoryOnTargetLicense"] = 1201] = "NotEnoughInventoryOnTargetLicense";
        CustomErrorCodes[CustomErrorCodes["TaskIsClosed"] = 1202] = "TaskIsClosed";
        CustomErrorCodes[CustomErrorCodes["InvalidSku"] = 1203] = "InvalidSku";
        CustomErrorCodes[CustomErrorCodes["CouldNotDisconnectPrinter"] = 1301] = "CouldNotDisconnectPrinter";
        CustomErrorCodes[CustomErrorCodes["PrinterDidNotRespond"] = 1302] = "PrinterDidNotRespond";
        CustomErrorCodes[CustomErrorCodes["UnableToSendDocumentToPrinter"] = 1303] = "UnableToSendDocumentToPrinter";
        CustomErrorCodes[CustomErrorCodes["CannotEstablishConnectionToPrinter"] = 1304] = "CannotEstablishConnectionToPrinter";
        CustomErrorCodes[CustomErrorCodes["SomethingWentWrong"] = 1305] = "SomethingWentWrong";
        CustomErrorCodes[CustomErrorCodes["BluetoothDisabled"] = 1306] = "BluetoothDisabled";
        CustomErrorCodes[CustomErrorCodes["PrinterNotConfigured"] = 1307] = "PrinterNotConfigured";
        CustomErrorCodes[CustomErrorCodes["QuantityInLicenseIsGreaterThanLicenseSource"] = 1308] = "QuantityInLicenseIsGreaterThanLicenseSource";
        CustomErrorCodes[CustomErrorCodes["StatusOfLicenseNotAllowsRelocationOfLicense"] = 1401] = "StatusOfLicenseNotAllowsRelocationOfLicense";
        CustomErrorCodes[CustomErrorCodes["StatusOfLicenseNotAllowsRelocationOfSku"] = 1402] = "StatusOfLicenseNotAllowsRelocationOfSku";
        CustomErrorCodes[CustomErrorCodes["MaterialDoesntBelongToLicense"] = 1403] = "MaterialDoesntBelongToLicense";
        CustomErrorCodes[CustomErrorCodes["InvalidDocumentId"] = 1501] = "InvalidDocumentId";
        CustomErrorCodes[CustomErrorCodes["DocumentDoesntExist"] = 1502] = "DocumentDoesntExist";
        CustomErrorCodes[CustomErrorCodes["YouDontHaveAccessToTargetWarehouse"] = 1503] = "YouDontHaveAccessToTargetWarehouse";
        CustomErrorCodes[CustomErrorCodes["CantInsertReceptionsPolicy"] = 1504] = "CantInsertReceptionsPolicy";
        CustomErrorCodes[CustomErrorCodes["CantInsertReceptionTask"] = 1505] = "CantInsertReceptionTask";
        CustomErrorCodes[CustomErrorCodes["TheresReceptionTasksStillOpenForTheDocument"] = 1506] = "TheresReceptionTasksStillOpenForTheDocument";
        CustomErrorCodes[CustomErrorCodes["NoPendingMergeLicenses"] = 1601] = "NoPendingMergeLicenses";
        CustomErrorCodes[CustomErrorCodes["ThereAreNoTermsOfTradeConfiguredForTheClientInMergeLicense"] = 1602] = "ThereAreNoTermsOfTradeConfiguredForTheClientInMergeLicense";
        CustomErrorCodes[CustomErrorCodes["ThereIsNoConfiguredAsMasterPack"] = 1603] = "ThereIsNoConfiguredAsMasterPack";
        CustomErrorCodes[CustomErrorCodes["MasterPackDoesNotHaveMaterialsForExplode"] = 1604] = "MasterPackDoesNotHaveMaterialsForExplode";
        CustomErrorCodes[CustomErrorCodes["ManifestAlreadyCertified"] = 1701] = "ManifestAlreadyCertified";
        CustomErrorCodes[CustomErrorCodes["ManifestStatusIsInvalid"] = 1702] = "ManifestStatusIsInvalid";
        CustomErrorCodes[CustomErrorCodes["BoxDoesntBelongToCurrentManifest"] = 1703] = "BoxDoesntBelongToCurrentManifest";
        CustomErrorCodes[CustomErrorCodes["SerialNumberWasAlreadyUsedByAnotherDocument"] = 1704] = "SerialNumberWasAlreadyUsedByAnotherDocument";
        CustomErrorCodes[CustomErrorCodes["MaterialDoesNotExistsInLicense"] = 101] = "MaterialDoesNotExistsInLicense";
        CustomErrorCodes[CustomErrorCodes["MasterPackDoesNotConfiguredComponents"] = 102] = "MasterPackDoesNotConfiguredComponents";
        CustomErrorCodes[CustomErrorCodes["MasterPackAlreadyExplodeInReception"] = 103] = "MasterPackAlreadyExplodeInReception";
        CustomErrorCodes[CustomErrorCodes["MasterPackWasAlreadyExplode"] = 104] = "MasterPackWasAlreadyExplode";
        CustomErrorCodes[CustomErrorCodes["MaterialAlreadyCounted"] = 2001] = "MaterialAlreadyCounted";
        CustomErrorCodes[CustomErrorCodes["TaskReassignedOrUnavailable"] = 2002] = "TaskReassignedOrUnavailable";
        CustomErrorCodes[CustomErrorCodes["InputExceedsTasksAssignedQuantity"] = 2101] = "InputExceedsTasksAssignedQuantity";
        CustomErrorCodes[CustomErrorCodes["LicenseDispatchThereIsAlreadyProductWithThatBach"] = 3001] = "LicenseDispatchThereIsAlreadyProductWithThatBach";
        CustomErrorCodes[CustomErrorCodes["LicenseDispatchThereIsAlreadyProductWithThatToneOrCaliber"] = 3002] = "LicenseDispatchThereIsAlreadyProductWithThatToneOrCaliber";
        CustomErrorCodes[CustomErrorCodes["LocationScannedDoesNotMatchWithTargetLocationDispatch"] = 3003] = "LocationScannedDoesNotMatchWithTargetLocationDispatch";
        CustomErrorCodes[CustomErrorCodes["LocationDoesNotScanned"] = 3004] = "LocationDoesNotScanned";
        CustomErrorCodes[CustomErrorCodes["LicenseScannedDoesNotMatchWithLicenseDispatch"] = 3005] = "LicenseScannedDoesNotMatchWithLicenseDispatch";
        CustomErrorCodes[CustomErrorCodes["DoesNotExistsAnLicensesWithTargetLocation"] = 3050] = "DoesNotExistsAnLicensesWithTargetLocation";
        CustomErrorCodes[CustomErrorCodes["LicensesDispatchHasBeenLocated"] = 3051] = "LicensesDispatchHasBeenLocated";
        CustomErrorCodes[CustomErrorCodes["InventoryLockedByInterfaces"] = 3052] = "InventoryLockedByInterfaces";
        CustomErrorCodes[CustomErrorCodes["DocumentsNotSendToErp"] = 3053] = "DocumentsNotSendToErp";
        CustomErrorCodes[CustomErrorCodes["SerialNumberSuppliedIsAlreadyInUse"] = 3054] = "SerialNumberSuppliedIsAlreadyInUse";
        CustomErrorCodes[CustomErrorCodes["NotEnoughInventoryOnSourceLicense"] = 3055] = "NotEnoughInventoryOnSourceLicense";
        CustomErrorCodes[CustomErrorCodes["MaterialDoesntBelongToDocument"] = 3056] = "MaterialDoesntBelongToDocument";
        CustomErrorCodes[CustomErrorCodes["MaterialInfoWasNotFound"] = 3057] = "MaterialInfoWasNotFound";
        CustomErrorCodes[CustomErrorCodes["StartValueMustBeSameLenghtEndValue"] = 3058] = "StartValueMustBeSameLenghtEndValue";
        CustomErrorCodes[CustomErrorCodes["ValueIsNotANumber"] = 3059] = "ValueIsNotANumber";
        CustomErrorCodes[CustomErrorCodes["ExceedMaximunLimitSeriesRankByMaterialInLicense"] = 3060] = "ExceedMaximunLimitSeriesRankByMaterialInLicense";
        CustomErrorCodes[CustomErrorCodes["UserIsBloqued"] = 4000] = "UserIsBloqued";
        CustomErrorCodes[CustomErrorCodes["ClassincompatibilitiesOfTheZone_"] = 6000] = "ClassincompatibilitiesOfTheZone_";
        CustomErrorCodes[CustomErrorCodes["BatchNumberDifferentFromTheStored"] = 5000] = "BatchNumberDifferentFromTheStored";
        CustomErrorCodes[CustomErrorCodes["ToneDifferentFromTheStored"] = 5001] = "ToneDifferentFromTheStored";
        CustomErrorCodes[CustomErrorCodes["CaliberDifferentFromTheStored"] = 5002] = "CaliberDifferentFromTheStored";
        CustomErrorCodes[CustomErrorCodes["StatusDifferentFromTheStored"] = 5003] = "StatusDifferentFromTheStored";
        CustomErrorCodes[CustomErrorCodes["StoredMaterialOfDifferentProject"] = 5004] = "StoredMaterialOfDifferentProject";
        CustomErrorCodes[CustomErrorCodes["StoredMaterialOfAProject"] = 5005] = "StoredMaterialOfAProject";
        CustomErrorCodes[CustomErrorCodes["YouMustenterThePhysicalSpaces"] = 5006] = "YouMustenterThePhysicalSpaces";
    })(CustomErrorCodes = Enums.CustomErrorCodes || (Enums.CustomErrorCodes = {}));
    let MaterialDoesNotBelong;
    (function (MaterialDoesNotBelong) {
        MaterialDoesNotBelong[MaterialDoesNotBelong["DoesNotBelongToDocument"] = "NOT_BELONG_TO_DOCUMENT"] = "DoesNotBelongToDocument";
    })(MaterialDoesNotBelong = Enums.MaterialDoesNotBelong || (Enums.MaterialDoesNotBelong = {}));
    let NotificationLevel;
    (function (NotificationLevel) {
        NotificationLevel[NotificationLevel["Information"] = 1] = "Information";
        NotificationLevel[NotificationLevel["Warning"] = 2] = "Warning";
        NotificationLevel[NotificationLevel["Error"] = 3] = "Error";
    })(NotificationLevel = Enums.NotificationLevel || (Enums.NotificationLevel = {}));
    //use powershell to generate unique ids, the command who you need is [guid]::NewGuid(), make sure it's unique about others
    class Prefixes {
    }
    Prefixes.Parameter = "3caa7001-d4ea-4cbd-99ef-56f012f491da";
    Prefixes.Rule = "98a1b31b-9dad-4611-8c31-b14a43f7186c";
    Prefixes.Currency = "0cf86b95-b0e3-4923-9575-884c42e4e23d";
    Prefixes.Notification = "418e07b2-92ea-4316-9690-d41586d02de7";
    Prefixes.UserCredentials = "aea1bbea-69fa-42b5-8876-bd659437e042";
    Prefixes.Error = "22394f86-d48e-439c-9806-a1ec321b347d";
    Prefixes.Tasks = "6822cd8a-7f6a-4b06-b4f5-feceac4f4590";
    Enums.Prefixes = Prefixes;
    //use powershell to generate unique ids, the command who you need is [guid]::NewGuid(), make sure it's unique about others
    let PackageNames;
    (function (PackageNames) {
        PackageNames["Default"] = "Default";
        PackageNames["Notifications"] = "Notifications";
        PackageNames["Tasks"] = "Tasks";
    })(PackageNames = Enums.PackageNames || (Enums.PackageNames = {}));
    let RoundType;
    (function (RoundType) {
        RoundType[RoundType["Floor"] = "FLOOR"] = "Floor";
        RoundType[RoundType["Round"] = "ROUND"] = "Round";
        RoundType[RoundType["Trunc"] = "TRUNC"] = "Trunc";
        RoundType[RoundType["Ceiling"] = "CEILING"] = "Ceiling";
    })(RoundType = Enums.RoundType || (Enums.RoundType = {}));
    let QuantityType;
    (function (QuantityType) {
        QuantityType[QuantityType["Line"] = "LINE"] = "Line";
        QuantityType[QuantityType["Total"] = "TOTAL"] = "Total";
        QuantityType[QuantityType["Both"] = "BOTH"] = "Both";
    })(QuantityType = Enums.QuantityType || (Enums.QuantityType = {}));
    let CalculatedOptions;
    (function (CalculatedOptions) {
        CalculatedOptions[CalculatedOptions["ToDeposit"] = "_options.Deposit_"] = "ToDeposit";
        CalculatedOptions[CalculatedOptions["Documents"] = "_options.Documents_"] = "Documents";
        CalculatedOptions[CalculatedOptions["Scouting"] = "_options.Scouting_"] = "Scouting";
        CalculatedOptions[CalculatedOptions["TotalSale"] = "_options.TotalSale_"] = "TotalSale";
        CalculatedOptions[CalculatedOptions["Tasks"] = "_options.Tasks_"] = "Tasks";
        CalculatedOptions[CalculatedOptions["Printers"] = "_options.Printers_"] = "Printers";
        CalculatedOptions[CalculatedOptions["TotalTask"] = "_options.TotalTask_"] = "TotalTask";
        CalculatedOptions[CalculatedOptions["CompletedTask"] = "_options.CompletedTask_"] = "CompletedTask";
        CalculatedOptions[CalculatedOptions["CanceledTask"] = "_options.CanceledTask_"] = "CanceledTask";
        CalculatedOptions[CalculatedOptions["ResolutionsAreOk"] = "_options.ResolutionsAreOk_"] = "ResolutionsAreOk";
        CalculatedOptions[CalculatedOptions["SequencesAreOk"] = "_options.SequencesAreOk_"] = "SequencesAreOk";
        CalculatedOptions[CalculatedOptions["Deposited"] = "_options.Deposited_"] = "Deposited";
        CalculatedOptions[CalculatedOptions["Synchronize"] = "_options.Synchronize_"] = "Synchronize";
        CalculatedOptions[CalculatedOptions["FinishRoute"] = "_options.FinishRoute_"] = "FinishRoute";
    })(CalculatedOptions = Enums.CalculatedOptions || (Enums.CalculatedOptions = {}));
    let NotificationType;
    (function (NotificationType) {
        NotificationType[NotificationType["Default"] = 1] = "Default";
    })(NotificationType = Enums.NotificationType || (Enums.NotificationType = {}));
    let DocumentMessageType;
    (function (DocumentMessageType) {
        DocumentMessageType[DocumentMessageType["Added"] = 0] = "Added";
        DocumentMessageType[DocumentMessageType["Changed"] = 1] = "Changed";
        DocumentMessageType[DocumentMessageType["Deleted"] = 2] = "Deleted";
        DocumentMessageType[DocumentMessageType["Obtained"] = 3] = "Obtained";
        DocumentMessageType[DocumentMessageType["Error"] = 4] = "Error";
    })(DocumentMessageType = Enums.DocumentMessageType || (Enums.DocumentMessageType = {}));
    let ParameterGroupId;
    (function (ParameterGroupId) {
        ParameterGroupId["CalculationRules"] = "";
        ParameterGroupId["Certification"] = "CERTIFICATION";
        ParameterGroupId["DispatchLicenseExit"] = "DISPATCH_LICENSE_EXIT";
        ParameterGroupId["SuggestionToLocate"] = "SUGGESTION_TO_LOCATE";
        ParameterGroupId["ValidationFiscal"] = "VALIDATION_FISCAL";
        ParameterGroupId["MaterialSubFamily"] = "MATERIAL_SUB_FAMILY";
    })(ParameterGroupId = Enums.ParameterGroupId || (Enums.ParameterGroupId = {}));
    let StatusLogin;
    (function (StatusLogin) {
        StatusLogin["active"] = "ACTIVO";
        StatusLogin["blocked"] = "BLOQUEADO";
    })(StatusLogin = Enums.StatusLogin || (Enums.StatusLogin = {}));
    let ParameterId;
    (function (ParameterId) {
        ParameterId["Partial"] = "PARTIAL";
        ParameterId["ScanAllLicenses"] = "SCAN_ALL_LICENSES";
        ParameterId["ChangeQty"] = "CHANGE_QTY";
        ParameterId["DisplaySuggestionMaterial"] = "DISPLAY_SUGGESTIONS_MATERIAL";
        ParameterId["HandlesFiscalStorage"] = "HANDLES_FISCAL_STORAGE";
        ParameterId["UseMaterialSubFamily"] = "USE_MATERIAL_SUB_FAMILY";
    })(ParameterId = Enums.ParameterId || (Enums.ParameterId = {}));
    let EventType;
    (function (EventType) {
    })(EventType = Enums.EventType || (Enums.EventType = {}));
    let Tab;
    (function (Tab) {
        Tab[Tab["MyTasks"] = 0] = "MyTasks";
        Tab[Tab["TaskSent"] = 1] = "TaskSent";
        Tab[Tab["InfoCenter"] = 2] = "InfoCenter";
        Tab[Tab["MoreTransactions"] = 3] = "MoreTransactions";
    })(Tab = Enums.Tab || (Enums.Tab = {}));
    let Page;
    (function (Page) {
        Page["Workspace"] = "WorkspacePage";
        Page["InfoCenter"] = "InfoCenterPage";
        Page["MoreTransactions"] = "MoreTransactionsPage";
        Page["MyTasks"] = "MyTasksPage";
        Page["TaskSent"] = "TaskSentPage";
        Page["CreateLicense"] = "CreateLicensePage";
        Page["GeneralReception"] = "GeneralReceptionPage";
        Page["GeneralReceptionSeries"] = "GeneralReceptionSeriesPage";
        Page["LocateGeneralReceptionLicense"] = "LocateGeneralReceptionLicensePage";
        Page["GeneralPicking"] = "GeneralPickingPage";
        Page["BlankPage"] = "BlankPage";
        Page["MaterialInfo"] = "MaterialInfoPage";
        Page["LicenseInfo"] = "LicenseInfoPage";
        Page["LocationInfo"] = "LocationInfoPage";
        Page["LabelInfo"] = "LabelInfoPage";
        Page["RelocateFullLicense"] = "RelocateFullLicensePage";
        Page["ProcessGeneralPickingSeries"] = "ProcessGeneralPickingSeriesPage";
        Page["LicenseCharges"] = "LicenseChargesPage";
        Page["ProcessGeneralPicking"] = "ProcessGeneralPickingPage";
        Page["LocateGeneralPicking"] = "LocateGeneralPickingPage";
        Page["VerifyEnvironment"] = "VerifyEnvironmentPage";
        Page["PrinterConfiguration"] = "PrinterConfigurationPage";
        Page["ReceptionByDocument"] = "ReceptionByDocumentPage";
        Page["ManifestCertification"] = "ManifestCertificationPage";
        Page["ManifiestCertificationSeries"] = "ManifiestCertificationSeriesPage";
        Page["RelocatePartialLicense"] = "RelocatePartialLicensePage";
        Page["LocatePartialLicense"] = "LocatePartialLicensePage";
        Page["RelocatePartialLicenseSeries"] = "RelocatePartialLicenseSeriesPage";
        Page["SuggestedPickingPage"] = "SuggestedPickingPage";
        Page["MergeLicense"] = "MergeLicensePage";
        Page["MergeLicenseDetail"] = "MergeLicenseDetailPage";
        Page["LocationsPhysicalCount"] = "LocationsPhysicalCountPage";
        Page["PhysicalCount"] = "PhysicalCountPage";
        Page["PhysicalCountMaterials"] = "PhysicalCountMaterialsPage";
        Page["ExplodeMasterPack"] = "ExplodeMasterPackPage";
        Page["LocateLicenseDispatch"] = "LocateLicenseDispatch";
        Page["DispatchOfLicense"] = "SearchLicenseDispatchPage";
        Page["WavePickingDispatchConfirm"] = "WavePickingDispatchConfirmPage";
        Page["GeneralReplenishment"] = "GeneralReplenishmentPage";
        Page["ProcessGeneralReplenishment"] = "ProcessGeneralReplenishmentPage";
        Page["ProcessGeneralReplenishmentSeries"] = "ProcessGeneralReplenishmentSeriesPage";
        Page["LocateReplenishment"] = "LocateReplenishmentPage";
        Page["PendingLocatePickingDispatch"] = "PendingLocatePickingDispatchPage";
        Page["ResultOfMaterialSearch"] = "ResultOfMaterialSearchPage";
        Page["GenerateExitPassFromDispatch"] = "GenerateExitPassFromDispatchPage";
        Page["AddSeriesRank"] = "AddSeriesRankPage";
        Page["LocationSuggestion"] = "LocationSuggestionReceptionPage";
        Page["LicenseClassLocation"] = "LicenseClassLocationPage";
        Page["LocationSuggestionFullRelocation"] = "LocationSuggestionFullRelocationPage";
        Page["LocationSuggestionRelocatePartial"] = "LocationSuggestionRelocatePartialPage";
        Page["ModifyMaterialProperties"] = "ModifyMaterialPropertiesPage";
        Page["LocateGeneralTransfer"] = "LocateGeneralTransferPage";
    })(Page = Enums.Page || (Enums.Page = {}));
    let LocationInfoSegments;
    (function (LocationInfoSegments) {
        LocationInfoSegments[LocationInfoSegments["LocationDescription"] = "locationDescription"] = "LocationDescription";
        LocationInfoSegments[LocationInfoSegments["LocationInventoryDetail"] = "locationInventoryDetail"] = "LocationInventoryDetail";
    })(LocationInfoSegments = Enums.LocationInfoSegments || (Enums.LocationInfoSegments = {}));
    let CheckPoints;
    (function (CheckPoints) {
        CheckPoints["OptionChangeMaterialProperties"] = "OPTION_CHANGE_MATERIAL_PROPERTIES";
    })(CheckPoints = Enums.CheckPoints || (Enums.CheckPoints = {}));
    let LicenseInfoSegments;
    (function (LicenseInfoSegments) {
        LicenseInfoSegments["LicenseDetail"] = "LicenseDetail";
        LicenseInfoSegments["DocumentDetail"] = "DocumentDetail";
    })(LicenseInfoSegments = Enums.LicenseInfoSegments || (Enums.LicenseInfoSegments = {}));
    let SocketEvents;
    (function (SocketEvents) {
        SocketEvents["BroadcastTask"] = "RefreshTasks";
        SocketEvents["GetBroadcast"] = "GetBroadcast";
    })(SocketEvents = Enums.SocketEvents || (Enums.SocketEvents = {}));
    let TaskType;
    (function (TaskType) {
        TaskType["Implosion"] = "IMPLOSION_INVENTARIO";
        TaskType["Picking"] = "TAREA_PICKING";
        TaskType["Reception"] = "TAREA_RECEPCION";
        TaskType["Relocation"] = "TAREA_REUBICACION";
        TaskType["PartialRelocation"] = "REUBICACION_PARCIAL";
        TaskType["GeneralDispatch"] = "DESPACHO_GENERAL";
        TaskType["PhysicalCount"] = "TAREA_CONTEO_FISICO";
        TaskType["GeneralTransfer"] = "TRASLADO_GENERAL";
    })(TaskType = Enums.TaskType || (Enums.TaskType = {}));
    let TaskTypeLog;
    (function (TaskTypeLog) {
        TaskTypeLog[TaskTypeLog["Reception"] = "_label.Reception_"] = "Reception";
        TaskTypeLog[TaskTypeLog["Picking"] = "_label.Picking_"] = "Picking";
        TaskTypeLog[TaskTypeLog["PartialRelocation"] = "_label.Partial-relocation_"] = "PartialRelocation";
        TaskTypeLog[TaskTypeLog["CompleteRelocation"] = "_label.Complete-relocation_"] = "CompleteRelocation";
    })(TaskTypeLog = Enums.TaskTypeLog || (Enums.TaskTypeLog = {}));
    let TaskPriority;
    (function (TaskPriority) {
        TaskPriority[TaskPriority["Low"] = 1] = "Low";
        TaskPriority[TaskPriority["Medium"] = 2] = "Medium";
        TaskPriority[TaskPriority["High"] = 3] = "High";
        TaskPriority[TaskPriority["None"] = 4] = "None";
    })(TaskPriority = Enums.TaskPriority || (Enums.TaskPriority = {}));
    let TaskSubType;
    (function (TaskSubType) {
        TaskSubType["GeneralDispatch"] = "DESPACHO_GENERAL";
        TaskSubType["ConsolidatedDispatch"] = "DESPACHO_CONSOLIDADO";
        TaskSubType["PickingLineRelocation"] = "REUBICACION_LP";
        TaskSubType["ReturnInvoice"] = "DEVOLUCION_FACTURA";
        TaskSubType["WarehouseTransferDispatch"] = "DESPACHO_WT";
        TaskSubType["ErpReception"] = "RECEPCION_ERP";
        TaskSubType["PurchaseReception"] = "RECEPCION_COMPRA";
        TaskSubType["WarehouseTransferReception"] = "RECEPCION_TRASLADO";
        TaskSubType["FiscalDispatch"] = "DESPACHO_FISCAL";
        TaskSubType["General"] = "GENERAL";
        TaskSubType["BufferRelocation"] = "REUBICACION_BUFFER";
        TaskSubType["ManualImplotion"] = "IMPLOSION_MANUAL";
        TaskSubType["GeneralReception"] = "INGRESO_GENERAL";
        TaskSubType["FiscalReception"] = "INGRESO_FISCAL";
        TaskSubType["GeneralTransfer"] = "TRASLADO_GENERAL";
    })(TaskSubType = Enums.TaskSubType || (Enums.TaskSubType = {}));
    let Regime;
    (function (Regime) {
        Regime[Regime["Fiscal"] = "FISCAL"] = "Fiscal";
        Regime[Regime["General"] = "GENERAL"] = "General";
    })(Regime = Enums.Regime || (Enums.Regime = {}));
    let TransType;
    (function (TransType) {
        TransType["GeneralPicking"] = "DESPACHO_ALMGEN";
        TransType["FiscalPicking"] = "DESPACHO_FISCAL";
        TransType["Picking"] = "DESPACHO_GENERAL";
        TransType["ExplodeIn"] = "EXPLODE_IN";
        TransType["ExplodeOut"] = "EXPLODE_OUT";
        TransType["InventoryImplosion"] = "IMPLOSION_INVENTARIO";
        TransType["FiscalReception"] = "INGRESO_FISCAL";
        TransType["GeneralReception"] = "INGRESO_GENERAL";
        TransType["FiscalInventoryInit"] = "INICIALIZACION_FISCAL";
        TransType["GeneralInventoryInit"] = "INICIALIZACION_GENERAL";
        TransType["CompleteRelocation"] = "REUBICACION_COMPLETA";
        TransType["PartialRelocation"] = "REUBICACION_PARCIAL";
        TransType["GeneralTransfer"] = "TRASLADO_GENERAL";
    })(TransType = Enums.TransType || (Enums.TransType = {}));
    let TransSubType;
    (function (TransSubType) {
        TransSubType["GeneralPicking"] = "DESPACHO_GENERAL";
        TransSubType["ConsolidatedPicking"] = "DESPACHO_CONSOLIDADO";
        TransSubType["Picking"] = "PICKING";
        TransSubType["ExplodeOut"] = "EXPLODE_OUT";
        TransSubType["ReplenishmentTask"] = "TAREA_REABASTECIMIENTO";
        TransSubType["FinalizingLocation"] = "FINALIZACION UBICACION";
        TransSubType["WarehouseTransferPicking"] = "DESPACHO_WT";
        TransSubType["FinalizingCounting"] = "FINALIZACION OP CONTEO";
        TransSubType["ErpReception"] = "RECEPCION_ERP";
        TransSubType["Replenishment"] = "REABASTECIMIENTO";
        TransSubType["Relocation"] = "REUBICACION";
        TransSubType["PurchaseReception"] = "RECEPCION_COMPRA";
        TransSubType["ExplodeIn"] = "EXPLODE_IN";
        TransSubType["CountingTaskStart"] = "INICIO TAREA DE CONTEO";
        TransSubType["GeneralReception"] = "INGRESO_GENERAL";
        TransSubType["FiscalReception"] = "INGRESO_FISCAL";
        TransSubType["None"] = "";
        TransSubType["GeneralTransfer"] = "TRASLADO_GENERAL";
    })(TransSubType = Enums.TransSubType || (Enums.TransSubType = {}));
    let CountStatus;
    (function (CountStatus) {
        CountStatus[CountStatus["Invalid"] = -1] = "Invalid";
        CountStatus[CountStatus["Canceled"] = 0] = "Canceled";
        CountStatus[CountStatus["Completed"] = 1] = "Completed";
        CountStatus[CountStatus["Available"] = 2] = "Available";
    })(CountStatus = Enums.CountStatus || (Enums.CountStatus = {}));
    let OperationResult;
    (function (OperationResult) {
        OperationResult[OperationResult["Fail"] = -1] = "Fail";
        OperationResult[OperationResult["Success"] = 1] = "Success";
        OperationResult[OperationResult["Unknown"] = 0] = "Unknown";
        OperationResult[OperationResult["CustomResult"] = 2] = "CustomResult";
    })(OperationResult = Enums.OperationResult || (Enums.OperationResult = {}));
    let ReceptionStatus;
    (function (ReceptionStatus) {
        ReceptionStatus["Completed"] = "COMPLETED";
        ReceptionStatus["Accepted"] = "ACCEPTED";
    })(ReceptionStatus = Enums.ReceptionStatus || (Enums.ReceptionStatus = {}));
    let ConfigurationParamGroup;
    (function (ConfigurationParamGroup) {
        ConfigurationParamGroup["Priority"] = "PRIORITY";
        ConfigurationParamGroup["Status"] = "ESTADOS";
        ConfigurationParamGroup["General"] = "GENERAL";
        ConfigurationParamGroup["ReceptionTypeRfc"] = "TIPO_RECEPCION_RFC";
        ConfigurationParamGroup["TypeReception"] = "TYPE_RECEPTION";
    })(ConfigurationParamGroup = Enums.ConfigurationParamGroup || (Enums.ConfigurationParamGroup = {}));
    let ConfigurationParamType;
    (function (ConfigurationParamType) {
        ConfigurationParamType["System"] = "SISTEMA";
        ConfigurationParamType["Status"] = "ESTADO";
    })(ConfigurationParamType = Enums.ConfigurationParamType || (Enums.ConfigurationParamType = {}));
    let ConfigurationParamName;
    (function (ConfigurationParamName) {
        ConfigurationParamName["MaxTransactions"] = "MAXIMO_TRANSACCIONES";
    })(ConfigurationParamName = Enums.ConfigurationParamName || (Enums.ConfigurationParamName = {}));
    let ReceptionScanner;
    (function (ReceptionScanner) {
        ReceptionScanner[ReceptionScanner["None"] = 0] = "None";
        ReceptionScanner[ReceptionScanner["Material"] = 1] = "Material";
        ReceptionScanner[ReceptionScanner["Batch"] = 2] = "Batch";
        ReceptionScanner[ReceptionScanner["VIN"] = 3] = "VIN";
    })(ReceptionScanner = Enums.ReceptionScanner || (Enums.ReceptionScanner = {}));
    let CertificationScanType;
    (function (CertificationScanType) {
        CertificationScanType[CertificationScanType["Material"] = 1] = "Material";
        CertificationScanType[CertificationScanType["Label"] = 2] = "Label";
        CertificationScanType[CertificationScanType["Box"] = 3] = "Box";
    })(CertificationScanType = Enums.CertificationScanType || (Enums.CertificationScanType = {}));
    let CertificationScanner;
    (function (CertificationScanner) {
        CertificationScanner[CertificationScanner["None"] = 0] = "None";
        CertificationScanner[CertificationScanner["Manifest"] = 1] = "Manifest";
        CertificationScanner[CertificationScanner["Material"] = 2] = "Material";
        CertificationScanner[CertificationScanner["Label"] = 3] = "Label";
        CertificationScanner[CertificationScanner["Box"] = 4] = "Box";
    })(CertificationScanner = Enums.CertificationScanner || (Enums.CertificationScanner = {}));
    let LicenseMergeScanner;
    (function (LicenseMergeScanner) {
        LicenseMergeScanner[LicenseMergeScanner["None"] = 0] = "None";
        LicenseMergeScanner[LicenseMergeScanner["Location"] = 1] = "Location";
        LicenseMergeScanner[LicenseMergeScanner["Material"] = 2] = "Material";
    })(LicenseMergeScanner = Enums.LicenseMergeScanner || (Enums.LicenseMergeScanner = {}));
    let PickingScan;
    (function (PickingScan) {
        PickingScan[PickingScan["None"] = 0] = "None";
        PickingScan[PickingScan["SourceLocation"] = 1] = "SourceLocation";
        PickingScan[PickingScan["LicenseId"] = 2] = "LicenseId";
        PickingScan[PickingScan["MaterialBarcode"] = 3] = "MaterialBarcode";
    })(PickingScan = Enums.PickingScan || (Enums.PickingScan = {}));
    let AddSeriesRankScan;
    (function (AddSeriesRankScan) {
        AddSeriesRankScan[AddSeriesRankScan["None"] = 0] = "None";
        AddSeriesRankScan[AddSeriesRankScan["StartValue"] = 1] = "StartValue";
        AddSeriesRankScan[AddSeriesRankScan["EndValue"] = 2] = "EndValue";
    })(AddSeriesRankScan = Enums.AddSeriesRankScan || (Enums.AddSeriesRankScan = {}));
    let LocateLicensePickingScan;
    (function (LocateLicensePickingScan) {
        LocateLicensePickingScan[LocateLicensePickingScan["None"] = 0] = "None";
        LocateLicensePickingScan[LocateLicensePickingScan["TargetLocation"] = 1] = "TargetLocation";
        LocateLicensePickingScan[LocateLicensePickingScan["LicenseId"] = 2] = "LicenseId";
    })(LocateLicensePickingScan = Enums.LocateLicensePickingScan || (Enums.LocateLicensePickingScan = {}));
    let MasterPackScan;
    (function (MasterPackScan) {
        MasterPackScan[MasterPackScan["None"] = 0] = "None";
        MasterPackScan[MasterPackScan["LicenseId"] = 1] = "LicenseId";
        MasterPackScan[MasterPackScan["MaterialBarcode"] = 2] = "MaterialBarcode";
    })(MasterPackScan = Enums.MasterPackScan || (Enums.MasterPackScan = {}));
    let ModifyMaterialScan;
    (function (ModifyMaterialScan) {
        ModifyMaterialScan[ModifyMaterialScan["None"] = 0] = "None";
        ModifyMaterialScan[ModifyMaterialScan["Barcode"] = 1] = "Barcode";
        ModifyMaterialScan[ModifyMaterialScan["AlternateBarcode"] = 2] = "AlternateBarcode";
    })(ModifyMaterialScan = Enums.ModifyMaterialScan || (Enums.ModifyMaterialScan = {}));
    let KeyCode;
    (function (KeyCode) {
        KeyCode[KeyCode["Enter"] = 13] = "Enter";
    })(KeyCode = Enums.KeyCode || (Enums.KeyCode = {}));
    let ReceptionAction;
    (function (ReceptionAction) {
        ReceptionAction["Add"] = "ADD";
        ReceptionAction["Insert"] = "INSERT";
        ReceptionAction["Update"] = "UPDATE";
    })(ReceptionAction = Enums.ReceptionAction || (Enums.ReceptionAction = {}));
    let LocationType;
    (function (LocationType) {
        LocationType["Hall"] = "PASILLO";
        LocationType["StandBy"] = "STANDBY";
        LocationType["Floor"] = "PISO";
        LocationType["Rack"] = "RACK";
        LocationType["Ramp"] = "RAMPA";
        LocationType["Door"] = "PUERTA";
    })(LocationType = Enums.LocationType || (Enums.LocationType = {}));
    let PagePath;
    (function (PagePath) {
        PagePath["ServerPath"] = "http://localhost:6661";
        PagePath["VerifyEnviroment"] = "http://localhost:8100/#/verify-environment";
        PagePath["CreateLicense"] = "http://localhost:8100/#/workspace/my-tasks/create-license";
        PagePath["MyTasks"] = "http://localhost:8100/#/workspace/my-tasks/my-tasks";
    })(PagePath = Enums.PagePath || (Enums.PagePath = {}));
    let InfoCenterOption;
    (function (InfoCenterOption) {
        InfoCenterOption["Sku"] = "Sku";
        InfoCenterOption["License"] = "License";
        InfoCenterOption["Location"] = "Location";
        InfoCenterOption["Vin"] = "Vin";
        InfoCenterOption["Label"] = "Label";
        InfoCenterOption["Box"] = "Box";
    })(InfoCenterOption = Enums.InfoCenterOption || (Enums.InfoCenterOption = {}));
    let PriorityCircles;
    (function (PriorityCircles) {
        PriorityCircles["Low"] = "assets/images/green-circle.png";
        PriorityCircles["Medium"] = "assets/images/yellow-circle.png";
        PriorityCircles["High"] = "assets/images/red-circle.png";
    })(PriorityCircles = Enums.PriorityCircles || (Enums.PriorityCircles = {}));
    let PrinterColors;
    (function (PrinterColors) {
        PrinterColors["Green"] = "green";
        PrinterColors["Transparent"] = "transparent";
    })(PrinterColors = Enums.PrinterColors || (Enums.PrinterColors = {}));
    let BluetoothClass;
    (function (BluetoothClass) {
        BluetoothClass[BluetoothClass["Printer"] = 1664] = "Printer";
    })(BluetoothClass = Enums.BluetoothClass || (Enums.BluetoothClass = {}));
    let TransStatus;
    (function (TransStatus) {
        TransStatus["Processed"] = "PROCESSED";
    })(TransStatus = Enums.TransStatus || (Enums.TransStatus = {}));
    let DocumentType;
    (function (DocumentType) {
        DocumentType["TransferRequest"] = "TRANSFER_REQUEST";
        DocumentType["SalesOrder"] = "SALES_ORDER";
    })(DocumentType = Enums.DocumentType || (Enums.DocumentType = {}));
    let ManifestType;
    (function (ManifestType) {
        ManifestType["SalesOrder"] = "SALES_ORDER";
        ManifestType["TransferRequest"] = "TRANSFER_REQUEST";
    })(ManifestType = Enums.ManifestType || (Enums.ManifestType = {}));
    let CertificationType;
    (function (CertificationType) {
        CertificationType["Material"] = "MATERIAL";
        CertificationType["Label"] = "ETIQUETA";
        CertificationType["Box"] = "CAJA";
    })(CertificationType = Enums.CertificationType || (Enums.CertificationType = {}));
    let StatusCertification;
    (function (StatusCertification) {
        StatusCertification["Completed"] = "COMPLETED";
    })(StatusCertification = Enums.StatusCertification || (Enums.StatusCertification = {}));
    let OK;
    (function (OK) {
        OK["OK"] = "OK";
        OK["Completed"] = "COMPLETED";
    })(OK = Enums.OK || (Enums.OK = {}));
    let PhysicalCountScan;
    (function (PhysicalCountScan) {
        PhysicalCountScan[PhysicalCountScan["LicenseId"] = 1] = "LicenseId";
        PhysicalCountScan[PhysicalCountScan["MaterialBarcode"] = 2] = "MaterialBarcode";
        PhysicalCountScan[PhysicalCountScan["SerialNumber"] = 3] = "SerialNumber";
        PhysicalCountScan[PhysicalCountScan["None"] = 4] = "None";
    })(PhysicalCountScan = Enums.PhysicalCountScan || (Enums.PhysicalCountScan = {}));
    let BaseUnit;
    (function (BaseUnit) {
        BaseUnit["BaseUnit"] = "Unidad Base";
    })(BaseUnit = Enums.BaseUnit || (Enums.BaseUnit = {}));
    let TypeFilterLicenseDispatch;
    (function (TypeFilterLicenseDispatch) {
        TypeFilterLicenseDispatch["DispatchLicense"] = "DISPATCH_LICENSE";
        TypeFilterLicenseDispatch["DocNum"] = "DOC_NUM";
        TypeFilterLicenseDispatch["WavePickingId"] = "WAVE_PICKING_ID";
    })(TypeFilterLicenseDispatch = Enums.TypeFilterLicenseDispatch || (Enums.TypeFilterLicenseDispatch = {}));
    let WaveDispatchConsolidated;
    (function (WaveDispatchConsolidated) {
        WaveDispatchConsolidated["Consolidated"] = "CONSOLIDADO";
    })(WaveDispatchConsolidated = Enums.WaveDispatchConsolidated || (Enums.WaveDispatchConsolidated = {}));
    let WaveDispatchLabel;
    (function (WaveDispatchLabel) {
        WaveDispatchLabel[WaveDispatchLabel["Consolidated"] = "_label.Consolidated_"] = "Consolidated";
        WaveDispatchLabel[WaveDispatchLabel["NoPickingDocument"] = "_label.No-document_"] = "NoPickingDocument";
    })(WaveDispatchLabel = Enums.WaveDispatchLabel || (Enums.WaveDispatchLabel = {}));
    let WaveDispatchCssRowName;
    (function (WaveDispatchCssRowName) {
        WaveDispatchCssRowName[WaveDispatchCssRowName["incompleteRow"] = "incompleteRow"] = "incompleteRow";
        WaveDispatchCssRowName[WaveDispatchCssRowName["completeRow"] = "completeRow"] = "completeRow";
        WaveDispatchCssRowName[WaveDispatchCssRowName["notAllowedRow"] = "notAllowedRow"] = "notAllowedRow";
    })(WaveDispatchCssRowName = Enums.WaveDispatchCssRowName || (Enums.WaveDispatchCssRowName = {}));
    let ShowSuggestedLocation;
    (function (ShowSuggestedLocation) {
        ShowSuggestedLocation[ShowSuggestedLocation["No"] = 0] = "No";
        ShowSuggestedLocation[ShowSuggestedLocation["SlottingByZona"] = 1] = "SlottingByZona";
        ShowSuggestedLocation[ShowSuggestedLocation["Material"] = 2] = "Material";
        ShowSuggestedLocation[ShowSuggestedLocation["All"] = 3] = "All";
    })(ShowSuggestedLocation = Enums.ShowSuggestedLocation || (Enums.ShowSuggestedLocation = {}));
    let SuggestedLocationScan;
    (function (SuggestedLocationScan) {
        SuggestedLocationScan[SuggestedLocationScan["None"] = 0] = "None";
        SuggestedLocationScan[SuggestedLocationScan["LocationByZone"] = 1] = "LocationByZone";
        SuggestedLocationScan[SuggestedLocationScan["Material"] = 2] = "Material";
    })(SuggestedLocationScan = Enums.SuggestedLocationScan || (Enums.SuggestedLocationScan = {}));
    let TypeLocation;
    (function (TypeLocation) {
        TypeLocation[TypeLocation["Rack"] = "RACK"] = "Rack";
        TypeLocation[TypeLocation["Floor"] = "PISO"] = "Floor";
    })(TypeLocation = Enums.TypeLocation || (Enums.TypeLocation = {}));
})(Enums = exports.Enums || (exports.Enums = {}));
//# sourceMappingURL=enums.js.map