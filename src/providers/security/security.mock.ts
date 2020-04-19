import { Injectable } from "@angular/core";
import { DataResponse, DataRequest } from "../../models/models";
import { UnitTesting } from "../../common/common.unit";

@Injectable()
export class SecurityProvider {
    validateCredentials(
        _userCredentials: DataRequest.Login
    ): Promise<DataResponse.Login> {
        if (
            _userCredentials.loginId !==
            UnitTesting.getTestCredentials().loginId
        )
            return Promise.reject("Invalid test user");

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
}
