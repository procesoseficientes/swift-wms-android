export namespace Enums {
    export class Socket {
        public static OwnEvents = {
            Connection: "connection",
            Connect: "connect",
            Disconnect: "disconnect",
            Authenticate: "authenticate"
        };
        public static Request = {
            Handshake: "HandshakeRequest",
            GetBroadcast: "GetBroadcastRequest",
            GetBroadcastLost: "GetBroadcastLostRequest"
        };

        public static Response = {
            Handshake: "HandshakeResponse",
            GetBroadcast: "GetBroadcastResponse",
            GetBroadcastLost: "GetBroadcastLostResponse"
        };
    }

    export namespace Translation {
        export enum Groups {
            "Labels" = "_label",
            "Buttons" = "_button",
            "Segments" = "_segments",
            "TitleView" = "_title_view",
            "WaitingMessage" = "_waitingMessage",
            "Info" = "_info",
            "PlaceHolders" = "_placeholder",
            "Tabs" = "_tab",
            "Messages" = "_message",
            "Alerts" = "_alert",
            "Draft" = "DRAFT",
            "Reports" = "_reports",
            "Abbreviations" = "_abbreviations",
            "Swift" = "_Swift",
            "CustomErrors" = "_customErrors",
            "Resources" = "_resources",
            "OrderPrint" = "_checkPrint",
            "NotificationTitles" = "_notificationTitles",
            "NotificationDescriptions" = "_notificationDescriptions",
            "EntityResource" = "_entityResource",
            "EntityResources" = "_entityResources",
            "Title" = "_title"
        }

        export enum Title {
            WMS = "WMS_",
            EnterYourPin = "Enter-Your-Pin_",
            Url = "url"
        }

        export enum Message {
            VerifyPin = "Verify-PIN_",
            ConfirmExit = "Exit-application_",
            EnterScanData = "Enter-scan-data_",
            SerialNumberNotFound = "Serial-number-not-found_"
        }

        export enum PlaceHolder {
            Pin = "PIN_",
            ScanData = "Scandata_",
            Url = "url"
        }

        export enum Button {
            Ok = "OK_",
            Cancel = "CANCEL_",
            Add = "Add_",
            Update = "Update_",
            Replace = "Replace_",
            PrintLicense = "Print-license_",
            PrintLabel = "Print-label_",
            PrintStatus = "Print-status_",
            Yes = "YES_",
            No = "NO_",
            PartialRelocation = "Partial-relocation_",
            CompleteRelocation = "Complete-relocation_",
            ShowCountMaterials = "Show-count-materials_"
        }

        export enum Alert {
            MaterialAlreadyInLicense = "The-material-is-already-in-the-license-choose-an-action_",
            RollbackLicense = "Rollback-license_",
            RollbackSeries = "Rollback-series_",
            DeleteSerie = "Delete-serie_",
            FinishWithDifferences = "Finish-line-with-differences_",
            DifferentLocation = "Scanned-location-is-different-from-the-task-do-you-wish-to-continue_",
            BarcodeAlreadyCertified = "Barcode-already-certified_",
            DoYouWishToContinue = "Do-you-wish-to-continue_",
            LocationCompletedDoYouWishToRecount = "Location-completed-do-you-wish-to-recount_",
            QAStatusIsNotAvailable = "QA-status-is-not-available_",
            DoYouWantToProceedNewQuery = "Proceed-new-query-info-center_",
            DoYouWishToChangeTargetLocation = "Do-you-wish-to-change-target-location_",
            CreateANewLicenseWithIncompatibleClasses = "Create-a-new-license-with-incompatible-classes?_"
        }
    }

    export enum PromptType {
        Number = "number",
        Text = "",
        Password = "password"
    }

    export class Messages {
        public static ConnectionChange = "connectionChange";
    }

    export enum InputType {
        "RadioButton" = <any>"radio",
        "Checkbox" = <any>"checkbox"
    }

    export enum PackageStatus {
        Created = 1,
        SynchronizationPending = 2,
        Synchronized = 3
    }

    export enum ValidationTypes {
        PerDevice = <any>"PerDevice",
        PerUser = <any>"PerUser"
    }
    export enum YesNo {
        No = 0,
        Yes = 1
    }

    export enum OperationTypeAddSeriesRank {
        Reception = "Reception",
        Relocation = "Partial Relocation",
        Picking = "Picking"
    }

    export class ToastType {
        public static Error = "error";
        public static Info = "info";
        public static Warning = "warning";
        public static Success = "success";
    }

    export enum ToastTime {
        Short = 1200,
        Large = 3600
    }

    export enum SpinnerType {
        "None" = <any>""
    }

    export enum ZebraHorizontalAlignment {
        Center = <any>"CENTER",
        Left = <any>"LEFT",
        Right = <any>"RIGHT"
    }

    export enum ZebraFonts {
        Standard = 0,
        Letter = 1,
        Type = 2,
        Verdana = 4,
        Times = 5,
        Consolas = 7
    }

    export enum CustomErrorCodes {
        Ok = 200,
        BadRequest = 400,
        AuthenticationFailed = 401,
        InternalServerError = 500,
        NotFound = 404,
        DataBaseError = 800,
        InsertDataBaseError = 801,
        UpdateDataBaseError = 802,
        DeleteDataError = 803,
        GetDataError = 804,
        DataNotFound = 805,
        ResourceIsBusy = 810,
        UnknownError = 0,
        Forbidden = 403,
        FieldsRequired = 1000,
        InvalidInput = 1001,
        LoadPage = 1002,
        InvalidQuantity = 1003,
        AllSeriesScanned = 1004,
        SerieNotInTask = 1005,
        SerieIsReserved = 1006,
        InvalidLocation = 1007,
        LicenseDoesntExist = 1101,
        TargetLocationIsNotAvailableForRelocation = 1102,
        LicenseIsAlreadyInLocationTarget = 1103,
        LocationDoesntExist = 1104,
        ClassCompatibilityIssue = 1105,
        TargetLocationIsNotAvailableForStorage = 1106,
        UserHasNoAccessToLocation = 1107,
        LocationShouldBeInWarehouse = 1108,
        MaterialDoesntExist = 1109,
        MaterialDoesntBelongToReturn = 1110,
        ReceptionQuantityIsHigherThanReturnQuantity = 1111,
        CantEnterAProductRelatedToAMasterpackInLicense = 1112,
        VinAlreadyExists = 1113,
        BatchOrExpirationDateIsDifferentFromBefore = 1114,
        ToneOrCaliberIsDifferentFromBefore = 1115,
        MaterialStatusIsDifferentFromBefore = 1116,
        TargetLocationDoesntMatchStatusLocation = 1117,
        NotEnoughInventoryOnTargetLicense = 1201,
        TaskIsClosed = 1202,
        InvalidSku = 1203,
        CouldNotDisconnectPrinter = 1301,
        PrinterDidNotRespond = 1302,
        UnableToSendDocumentToPrinter = 1303,
        CannotEstablishConnectionToPrinter = 1304,
        SomethingWentWrong = 1305,
        BluetoothDisabled = 1306,
        PrinterNotConfigured = 1307,
        QuantityInLicenseIsGreaterThanLicenseSource = 1308,
        StatusOfLicenseNotAllowsRelocationOfLicense = 1401,
        StatusOfLicenseNotAllowsRelocationOfSku = 1402,
        MaterialDoesntBelongToLicense = 1403,
        InvalidDocumentId = 1501,
        DocumentDoesntExist = 1502,
        YouDontHaveAccessToTargetWarehouse = 1503,
        CantInsertReceptionsPolicy = 1504,
        CantInsertReceptionTask = 1505,
        TheresReceptionTasksStillOpenForTheDocument = 1506,
        NoPendingMergeLicenses = 1601,
        ThereAreNoTermsOfTradeConfiguredForTheClientInMergeLicense = 1602,
        ThereIsNoConfiguredAsMasterPack = 1603,
        MasterPackDoesNotHaveMaterialsForExplode = 1604,
        ManifestAlreadyCertified = 1701,
        ManifestStatusIsInvalid = 1702,
        BoxDoesntBelongToCurrentManifest = 1703,
        SerialNumberWasAlreadyUsedByAnotherDocument = 1704,
        MaterialDoesNotExistsInLicense = 101,
        MasterPackDoesNotConfiguredComponents = 102,
        MasterPackAlreadyExplodeInReception = 103,
        MasterPackWasAlreadyExplode = 104,
        MaterialAlreadyCounted = 2001,
        TaskReassignedOrUnavailable = 2002,
        InputExceedsTasksAssignedQuantity = 2101,
        LicenseDispatchThereIsAlreadyProductWithThatBach = 3001,
        LicenseDispatchThereIsAlreadyProductWithThatToneOrCaliber = 3002,
        LocationScannedDoesNotMatchWithTargetLocationDispatch = 3003,
        LocationDoesNotScanned = 3004,
        LicenseScannedDoesNotMatchWithLicenseDispatch = 3005,
        DoesNotExistsAnLicensesWithTargetLocation = 3050,
        LicensesDispatchHasBeenLocated = 3051,
        InventoryLockedByInterfaces = 3052,
        DocumentsNotSendToErp = 3053,
        SerialNumberSuppliedIsAlreadyInUse = 3054,
        NotEnoughInventoryOnSourceLicense = 3055,
        MaterialDoesntBelongToDocument = 3056,
        MaterialInfoWasNotFound = 3057,
        StartValueMustBeSameLenghtEndValue = 3058,
        ValueIsNotANumber = 3059,
        ExceedMaximunLimitSeriesRankByMaterialInLicense = 3060,
        UserIsBloqued = 4000,
        ClassincompatibilitiesOfTheZone_ = 6000,
        BatchNumberDifferentFromTheStored = 5000,
        ToneDifferentFromTheStored = 5001,
        CaliberDifferentFromTheStored = 5002,
        StatusDifferentFromTheStored = 5003,
        StoredMaterialOfDifferentProject = 5004,
        StoredMaterialOfAProject = 5005,
        YouMustenterThePhysicalSpaces = 5006
    }

    export enum MaterialDoesNotBelong {
        DoesNotBelongToDocument = <any>"NOT_BELONG_TO_DOCUMENT"
    }

    export enum NotificationLevel {
        Information = 1,
        Warning = 2,
        Error = 3
    }

    //use powershell to generate unique ids, the command who you need is [guid]::NewGuid(), make sure it's unique about others
    export class Prefixes {
        public static Parameter: string = "3caa7001-d4ea-4cbd-99ef-56f012f491da";
        public static Rule: string = "98a1b31b-9dad-4611-8c31-b14a43f7186c";
        public static Currency: string = "0cf86b95-b0e3-4923-9575-884c42e4e23d";
        public static Notification: string = "418e07b2-92ea-4316-9690-d41586d02de7";
        public static UserCredentials: string = "aea1bbea-69fa-42b5-8876-bd659437e042";
        public static Error: string = "22394f86-d48e-439c-9806-a1ec321b347d";
        public static Tasks: string = "6822cd8a-7f6a-4b06-b4f5-feceac4f4590";
    }
    //use powershell to generate unique ids, the command who you need is [guid]::NewGuid(), make sure it's unique about others

    export enum PackageNames {
        Default = "Default",
        Notifications = "Notifications",
        Tasks = "Tasks"
    }

    export enum RoundType {
        "Floor" = <any>"FLOOR",
        "Round" = <any>"ROUND",
        "Trunc" = <any>"TRUNC",
        "Ceiling" = <any>"CEILING"
    }

    export enum QuantityType {
        "Line" = <any>"LINE",
        "Total" = <any>"TOTAL",
        "Both" = <any>"BOTH"
    }

    export enum CalculatedOptions {
        "ToDeposit" = <any>"_options.Deposit_",
        "Documents" = <any>"_options.Documents_",
        "Scouting" = <any>"_options.Scouting_",
        "TotalSale" = <any>"_options.TotalSale_",
        "Tasks" = <any>"_options.Tasks_",
        "Printers" = <any>"_options.Printers_",
        "TotalTask" = <any>"_options.TotalTask_",
        "CompletedTask" = <any>"_options.CompletedTask_",
        "CanceledTask" = <any>"_options.CanceledTask_",
        "ResolutionsAreOk" = <any>"_options.ResolutionsAreOk_",
        "SequencesAreOk" = <any>"_options.SequencesAreOk_",
        "Deposited" = <any>"_options.Deposited_",
        "Synchronize" = <any>"_options.Synchronize_",
        "FinishRoute" = <any>"_options.FinishRoute_"
    }

    export enum NotificationType {
        Default = 1
    }

    export enum DocumentMessageType {
        Added = 0,
        Changed = 1,
        Deleted = 2,
        Obtained = 3,
        Error = 4
    }

    export enum ParameterGroupId {
        CalculationRules = "",
        Certification = "CERTIFICATION",
        DispatchLicenseExit = "DISPATCH_LICENSE_EXIT",
        SuggestionToLocate = "SUGGESTION_TO_LOCATE",
        ValidationFiscal = "VALIDATION_FISCAL",
        MaterialSubFamily = "MATERIAL_SUB_FAMILY",
        System = "SYSTEM"
    }

    export enum StatusLogin {
        active = "ACTIVO",
        blocked = "BLOQUEADO"
    }

    export enum ParameterId {
        Partial = "PARTIAL",
        ScanAllLicenses = "SCAN_ALL_LICENSES",
        ChangeQty = "CHANGE_QTY",
        DisplaySuggestionMaterial = "DISPLAY_SUGGESTIONS_MATERIAL",
        HandlesFiscalStorage = "HANDLES_FISCAL_STORAGE",
        UseMaterialSubFamily = "USE_MATERIAL_SUB_FAMILY",
        MaxPrintingQuantity = "MAX_PRINT_QTY"
    }

    export enum EventType {}

    export enum Tab {
        MyTasks = 0,
        TaskSent = 1,
        InfoCenter = 2,
        MoreTransactions = 3
    }

    export enum Page {
        Workspace = "WorkspacePage",
        InfoCenter = "InfoCenterPage",
        MoreTransactions = "MoreTransactionsPage",
        MyTasks = "MyTasksPage",
        TaskSent = "TaskSentPage",
        CreateLicense = "CreateLicensePage",
        GeneralReception = "GeneralReceptionPage",
        GeneralReceptionSeries = "GeneralReceptionSeriesPage",
        LocateGeneralReceptionLicense = "LocateGeneralReceptionLicensePage",
        GeneralPicking = "GeneralPickingPage",
        BlankPage = "BlankPage",
        MaterialInfo = "MaterialInfoPage",
        LicenseInfo = "LicenseInfoPage",
        LocationInfo = "LocationInfoPage",
        LabelInfo = "LabelInfoPage",
        RelocateFullLicense = "RelocateFullLicensePage",
        ProcessGeneralPickingSeries = "ProcessGeneralPickingSeriesPage",
        LicenseCharges = "LicenseChargesPage",
        ProcessGeneralPicking = "ProcessGeneralPickingPage",
        LocateGeneralPicking = "LocateGeneralPickingPage",
        VerifyEnvironment = "VerifyEnvironmentPage",
        PrinterConfiguration = "PrinterConfigurationPage",
        ReceptionByDocument = "ReceptionByDocumentPage",
        ManifestCertification = "ManifestCertificationPage",
        ManifiestCertificationSeries = "ManifiestCertificationSeriesPage",
        RelocatePartialLicense = "RelocatePartialLicensePage",
        LocatePartialLicense = "LocatePartialLicensePage",
        RelocatePartialLicenseSeries = "RelocatePartialLicenseSeriesPage",
        SuggestedPickingPage = "SuggestedPickingPage",
        MergeLicense = "MergeLicensePage",
        MergeLicenseDetail = "MergeLicenseDetailPage",
        LocationsPhysicalCount = "LocationsPhysicalCountPage",
        PhysicalCount = "PhysicalCountPage",
        PhysicalCountMaterials = "PhysicalCountMaterialsPage",
        ExplodeMasterPack = "ExplodeMasterPackPage",
        LocateLicenseDispatch = "LocateLicenseDispatch",
        DispatchOfLicense = "SearchLicenseDispatchPage",
        WavePickingDispatchConfirm = "WavePickingDispatchConfirmPage",
        GeneralReplenishment = "GeneralReplenishmentPage",
        ProcessGeneralReplenishment = "ProcessGeneralReplenishmentPage",
        ProcessGeneralReplenishmentSeries = "ProcessGeneralReplenishmentSeriesPage",
        LocateReplenishment = "LocateReplenishmentPage",
        PendingLocatePickingDispatch = "PendingLocatePickingDispatchPage",
        ResultOfMaterialSearch = "ResultOfMaterialSearchPage",
        GenerateExitPassFromDispatch = "GenerateExitPassFromDispatchPage",
        AddSeriesRank = "AddSeriesRankPage",
        LocationSuggestion = "LocationSuggestionReceptionPage",
        LicenseClassLocation = "LicenseClassLocationPage",
        LocationSuggestionFullRelocation = "LocationSuggestionFullRelocationPage",
        LocationSuggestionRelocatePartial = "LocationSuggestionRelocatePartialPage",
        ModifyMaterialProperties = "ModifyMaterialPropertiesPage",
        LocateGeneralTransfer = "LocateGeneralTransferPage"
    }

    export enum LocationInfoSegments {
        LocationDescription = <any>"locationDescription",
        LocationInventoryDetail = <any>"locationInventoryDetail"
    }

    export enum CheckPoints {
        OptionChangeMaterialProperties = "OPTION_CHANGE_MATERIAL_PROPERTIES"
    }

    export enum LicenseInfoSegments {
        LicenseDetail = "LicenseDetail",
        DocumentDetail = "DocumentDetail"
    }

    export enum SocketEvents {
        BroadcastTask = "RefreshTasks",
        GetBroadcast = "GetBroadcast"
    }

    export enum TaskType {
        Implosion = "IMPLOSION_INVENTARIO",
        Picking = "TAREA_PICKING",
        Reception = "TAREA_RECEPCION",
        Relocation = "TAREA_REUBICACION",
        PartialRelocation = "REUBICACION_PARCIAL",
        GeneralDispatch = "DESPACHO_GENERAL",
        PhysicalCount = "TAREA_CONTEO_FISICO",
        GeneralTransfer = "TRASLADO_GENERAL"
    }

    export enum TaskTypeLog {
        Reception = <any>"_label.Reception_",
        Picking = <any>"_label.Picking_",
        PartialRelocation = <any>"_label.Partial-relocation_",
        CompleteRelocation = <any>"_label.Complete-relocation_"
    }

    export enum TaskPriority {
        Low = 1,
        Medium = 2,
        High = 3,
        None = 4
    }

    export enum TaskSubType {
        GeneralDispatch = "DESPACHO_GENERAL",
        ConsolidatedDispatch = "DESPACHO_CONSOLIDADO",
        PickingLineRelocation = "REUBICACION_LP",
        ReturnInvoice = "DEVOLUCION_FACTURA",
        WarehouseTransferDispatch = "DESPACHO_WT",
        ErpReception = "RECEPCION_ERP",
        PurchaseReception = "RECEPCION_COMPRA",
        WarehouseTransferReception = "RECEPCION_TRASLADO",
        FiscalDispatch = "DESPACHO_FISCAL",
        General = "GENERAL",
        BufferRelocation = "REUBICACION_BUFFER",
        ManualImplotion = "IMPLOSION_MANUAL",
        GeneralReception = "INGRESO_GENERAL",
        FiscalReception = "INGRESO_FISCAL",
        GeneralTransfer = "TRASLADO_GENERAL"
    }

    export enum Regime {
        Fiscal = <any>"FISCAL",
        General = <any>"GENERAL"
    }

    export enum TransType {
        GeneralPicking = "DESPACHO_ALMGEN",
        FiscalPicking = "DESPACHO_FISCAL",
        Picking = "DESPACHO_GENERAL",
        ExplodeIn = "EXPLODE_IN",
        ExplodeOut = "EXPLODE_OUT",
        InventoryImplosion = "IMPLOSION_INVENTARIO",
        FiscalReception = "INGRESO_FISCAL",
        GeneralReception = "INGRESO_GENERAL",
        FiscalInventoryInit = "INICIALIZACION_FISCAL",
        GeneralInventoryInit = "INICIALIZACION_GENERAL",
        CompleteRelocation = "REUBICACION_COMPLETA",
        PartialRelocation = "REUBICACION_PARCIAL",
        GeneralTransfer = "TRASLADO_GENERAL"
    }

    export enum TransSubType {
        GeneralPicking = "DESPACHO_GENERAL",
        ConsolidatedPicking = "DESPACHO_CONSOLIDADO",
        Picking = "PICKING",
        ExplodeOut = "EXPLODE_OUT",
        ReplenishmentTask = "TAREA_REABASTECIMIENTO",
        FinalizingLocation = "FINALIZACION UBICACION",
        WarehouseTransferPicking = "DESPACHO_WT",
        FinalizingCounting = "FINALIZACION OP CONTEO",
        ErpReception = "RECEPCION_ERP",
        Replenishment = "REABASTECIMIENTO",
        Relocation = "REUBICACION",
        PurchaseReception = "RECEPCION_COMPRA",
        ExplodeIn = "EXPLODE_IN",
        CountingTaskStart = "INICIO TAREA DE CONTEO",
        GeneralReception = "INGRESO_GENERAL",
        FiscalReception = "INGRESO_FISCAL",
        None = "",
        GeneralTransfer = "TRASLADO_GENERAL"
    }

    export enum CountStatus {
        Invalid = -1,
        Canceled = 0,
        Completed = 1,
        Available = 2
    }

    export enum OperationResult {
        Fail = -1,
        Success = 1,
        Unknown = 0,
        CustomResult = 2
    }

    export enum ReceptionStatus {
        Completed = "COMPLETED",
        Accepted = "ACCEPTED"
    }

    export enum ConfigurationParamGroup {
        Priority = "PRIORITY",
        Status = "ESTADOS",
        General = "GENERAL",
        ReceptionTypeRfc = "TIPO_RECEPCION_RFC",
        TypeReception = "TYPE_RECEPTION"
    }

    export enum ConfigurationParamType {
        System = "SISTEMA",
        Status = "ESTADO"
    }

    export enum ConfigurationParamName {
        MaxTransactions = "MAXIMO_TRANSACCIONES"
    }

    export enum ReceptionScanner {
        None = 0,
        Material = 1,
        Batch = 2,
        VIN = 3
    }

    export enum CertificationScanType {
        Material = 1,
        Label = 2,
        Box = 3
    }

    export enum CertificationScanner {
        None = 0,
        Manifest = 1,
        Material = 2,
        Label = 3,
        Box = 4
    }

    export enum LicenseMergeScanner {
        None = 0,
        Location = 1,
        Material = 2
    }

    export enum PickingScan {
        None = 0,
        SourceLocation = 1,
        LicenseId = 2,
        MaterialBarcode = 3
    }

    export enum AddSeriesRankScan {
        None = 0,
        StartValue = 1,
        EndValue = 2
    }

    export enum LocateLicensePickingScan {
        None = 0,
        TargetLocation = 1,
        LicenseId = 2
    }

    export enum MasterPackScan {
        None = 0,
        LicenseId = 1,
        MaterialBarcode = 2
    }

    export enum ModifyMaterialScan {
        None = 0,
        Barcode = 1,
        AlternateBarcode = 2
    }

    export enum KeyCode {
        Enter = 13
    }

    export enum ReceptionAction {
        Add = "ADD",
        Insert = "INSERT",
        Update = "UPDATE"
    }

    export enum LocationType {
        Hall = "PASILLO",
        StandBy = "STANDBY",
        Floor = "PISO",
        Rack = "RACK",
        Ramp = "RAMPA",
        Door = "PUERTA"
    }

    export enum PagePath {
        ServerPath = "http://10.101.0.4:6161",
        VerifyEnviroment = "http://localhost:8100/#/verify-environment",
        CreateLicense = "http://localhost:8100/#/workspace/my-tasks/create-license",
        MyTasks = "http://localhost:8100/#/workspace/my-tasks/my-tasks"
    }

    export enum InfoCenterOption {
        Sku = "Sku",
        License = "License",
        Location = "Location",
        Vin = "Vin",
        Label = "Label",
        Box = "Box"
    }

    export enum PriorityCircles {
        Low = "assets/images/green-circle.png",
        Medium = "assets/images/yellow-circle.png",
        High = "assets/images/red-circle.png"
    }

    export enum PrinterColors {
        Green = "green",
        Transparent = "transparent"
    }

    export enum BluetoothClass {
        Printer = 1664
    }

    export enum TransStatus {
        Processed = "PROCESSED"
    }

    export enum DocumentType {
        TransferRequest = "TRANSFER_REQUEST",
        SalesOrder = "SALES_ORDER"
    }

    export enum ManifestType {
        SalesOrder = "SALES_ORDER",
        TransferRequest = "TRANSFER_REQUEST"
    }

    export enum CertificationType {
        Material = "MATERIAL",
        Label = "ETIQUETA",
        Box = "CAJA"
    }

    export enum StatusCertification {
        Completed = "COMPLETED"
    }

    export enum OK {
        OK = "OK",
        Completed = "COMPLETED"
    }

    export enum PhysicalCountScan {
        LicenseId = 1,
        MaterialBarcode = 2,
        SerialNumber = 3,
        None = 4
    }

    export enum BaseUnit {
        BaseUnit = "Unidad Base"
    }

    export enum TypeFilterLicenseDispatch {
        DispatchLicense = "DISPATCH_LICENSE",
        DocNum = "DOC_NUM",
        WavePickingId = "WAVE_PICKING_ID"
    }

    export enum WaveDispatchConsolidated {
        Consolidated = "CONSOLIDADO"
    }

    export enum WaveDispatchLabel {
        Consolidated = <any>"_label.Consolidated_",
        NoPickingDocument = <any>"_label.No-document_"
    }

    export enum WaveDispatchCssRowName {
        incompleteRow = <any>"incompleteRow",
        completeRow = <any>"completeRow",
        notAllowedRow = <any>"notAllowedRow"
    }

    export enum ShowSuggestedLocation {
        No = 0,
        SlottingByZona = 1,
        Material = 2,
        All = 3
    }

    export enum SuggestedLocationScan {
        None = 0,
        LocationByZone = 1,
        Material = 2
    }

    export enum TypeLocation {
        Rack = <any>"RACK",
        Floor = <any>"PISO"
    }
}
