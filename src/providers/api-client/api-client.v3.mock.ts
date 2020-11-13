import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { Enums } from "../../enums/enums";

@Injectable()
export class ApiClientV3Provider {
    public validateCredentials(
        _userCredentials: Model.UserCredentials
    ): Promise<Model.UserConnectionInfo> {
        return Promise.resolve({
            CommunicationAddress: "http://10.101.0.4:6161",
            ValidationType: Enums.ValidationTypes.PerUser
        });
    }

    public login(
        _userCredentials: DataRequest.Login
    ): Promise<DataResponse.Login> {
        return Promise.resolve({
            loginId: "EDER",
            roleId: "OPERADOR",
            loginName: "EDER CHAMALE",
            loginType: "MOVIL",
            loginStatus: "ACTIVO",
            loginPwd: "123",
            loginPwdAlternate: null,
            licenseSerial: "",
            environment: "DESARROLLO",
            guiLayout: "Xmas 2008 Blue",
            isLogged: 1,
            lastLogged: null,
            defaultWarehouseId: null,
            consolidationTerminal: 0,
            generateTasks: "0",
            loadingGate: "0",
            lineId: "GENERAL",
            swift3PlWarehouse: "",
            email: "",
            authorizer: 1,
            isExternal: null,
            relatedClient: null,
            notifyLetterQuota: 1,
            distributionCenterId: "CTR_SUR",
            canRelocate: 1,
            linePosition: null,
            spotColumn: null,
            terminalIp: null,
            externalUserLogin: null,
            externalNameUser: null,
            domainId: 13,
            DOMAIN_ID: 13,
            ENVIRONMENT: "DESARROLLO",
            SetupEnvironment: {
                platform: "OP_WMS",
                environmentName: "DESARROLLO",
                wsHost: "http://192.168.1.135:8088/WMSOnePlan_BusinessServices",
                sqlConnection: "",
                status: "ACTIVO"
            },
            Domain: {
                id: 13,
                domain: "L3W",
                user: "alsersa",
                password: "alsersaServer1237710",
                server: "192.168.1.114",
                port: 1433,
                createdAt: new Date("2018-01-11T18:31:43.685Z"),
                updatedAt: new Date("2018-01-11T18:31:43.685Z")
            },
            pouchDbHost: "localhost",
            pouchDbPort: 6670,
            pouchDbPass: "",
            pouchDbUser: ""
        });
    }

    public createLicense(): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public getReceptionTask(): Promise<
        Array<DataResponse.OP_WMS_SP_GET_RECEPTION_TASK>
    > {
        return Promise.resolve([
            {
                TAREA: 507295,
                CLIENT_CODE: "viscosa",
                CLIENTE: "viscosa",
                POLIZA: "483711",
                ORDEN: "16903",
                TIPO: Enums.TaskType.Reception,
                LOCATION_SPOT_TARGET: "",
                SUBTIPO: Enums.TaskSubType.PurchaseReception,
                REGIMEN: Enums.Regime.General,
                PRIORITY: "Media",
                DOCUMENTO_ERP: "Documento: 16903",
                ES_FACTURA: 0,
                CODE_SUPPLIER: "",
                NAME_SUPPLIER: ""
            }
        ]);
    }

    public completeTask(): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public addMaterialToLicense(): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public validateBarcodeForLicense(): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public rollbackLicense(): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public validateStatusInMaterialsLicense(): Promise<DataResponse.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public getScannedMaterialByLicenseInReceptionTask(): Promise<
        Array<
            DataResponse.OP_WMS_GET_SCANNED_MATERIAL_BY_LICENSE_IN_RECEPTION_TASK
        >
    > {
        let result = [
            {
                CLIENT_OWNER: "autovanguard",
                MATERIAL_ID: "autovanguard/VAA1001",
                BARCODE_ID: "autovanguard/VAA1001",
                ALTERNATE_BARCODE: "",
                MATERIAL_NAME: "ArmorAll Shampoo para Car Wash 624fo",
                SHORT_NAME: "ArmorAll Shampoo para Car",
                VOLUME_FACTOR: 1911,
                MATERIAL_CLASS: "4",
                HIGH: 0,
                LENGTH: 0,
                WIDTH: 0,
                MAX_X_BIN: 7,
                SCAN_BY_ONE: 0,
                REQUIRES_LOGISTICS_INFO: 0,
                WEIGTH: 2,
                IMAGE_1: null,
                IMAGE_2: null,
                IMAGE_3: null,
                LAST_UPDATED: new Date(),
                LAST_UPDATED_BY: "ADMIN",
                IS_CAR: 0,
                MT3: 1911,
                BATCH_REQUESTED: 0,
                SERIAL_NUMBER_REQUESTS: 0,
                IS_MASTER_PACK: 0,
                ERP_AVERAGE_PRICE: 0,
                WEIGHT_MEASUREMENT: "LIBRA",
                EXPLODE_IN_RECEPTION: 0,
                HANDLE_TONE: 0,
                HANDLE_CALIBER: 0,
                QUALITY_CONTROL: 0,
                MEASUREMENT_UNIT: "Unidad",
                MEASUREMENT_QTY: 1
            } as DataResponse.OP_WMS_GET_SCANNED_MATERIAL_BY_LICENSE_IN_RECEPTION_TASK
        ];
        return Promise.resolve(result);
    }

    public insertMaterialBySerialNumber(): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        return Promise.resolve(result);
    }

    public removeBroadcast(
        _request: DataRequest.RemoveBroadcast
    ): Promise<Model.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }
}
