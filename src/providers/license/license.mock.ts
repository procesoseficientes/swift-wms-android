import { Injectable } from "@angular/core";
import { DataRequest, DataResponse, Model } from "../../models/models";
import { Enums } from "../../enums/enums";

@Injectable()
export class LicenseProvider {
    createLicense(
        _createLicense: DataRequest.CreateLicense
    ): Promise<DataResponse.Operation> {
        if (_createLicense.login.split("@")[1] == "L3W") {
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        "Invalid user credentials",
                        Enums.CustomErrorCodes.DataBaseError
                    )
                )
            );
        }
        let operation = Model.Factory.createSuccessOperation();
        return Promise.resolve(operation);
    }

    getInventoryByLicense(): Promise<Array<Model.Inventory>> {
        let response: Array<Model.Inventory> = [
            {
                licenseId: 22732,
                currentLocation: "B05-TA-C02-NU",
                policyCode: "K5KPPH3P5",
                clientOwner: "C00030",
                materialId: "C00030/LECENTERPOL",
                qty: 920,
                vin: null,
                batch: "2026xiv",
                dateExpiration: new Date(),
                tone: null,
                caliber: null,
                serialNumberRequests: Enums.YesNo.Yes,
                materialName: "",
                statusName: "",
                shortName: ""
            }
        ];
        return Promise.resolve(response);
    }

    getInventoryByMaterial(): Promise<Array<Model.Inventory>> {
        let response: Array<Model.Inventory> = [
            {
                licenseId: 418543,
                currentLocation: "B01-R01-C01-NB",
                policyCode: "493718",
                clientOwner: "viscosa",
                materialId: "viscosa/VCA1030",
                qty: 1,
                vin: "",
                batch: "",
                dateExpiration: null,
                tone: null,
                caliber: null,
                serialNumberRequests: 1,
                materialName: "",
                statusName: "",
                shortName: ""
            },
            {
                licenseId: 418545,
                currentLocation: "B01-R01-C01-NB",
                policyCode: "493718",
                clientOwner: "viscosa",
                materialId: "viscosa/VCA1030",
                qty: 1,
                vin: "",
                batch: "",
                dateExpiration: null,
                tone: null,
                caliber: null,
                serialNumberRequests: 1,
                materialName: "",
                statusName: "",
                shortName: ""
            }
        ];

        return Promise.resolve(response);
    }

    async getInventoryByLocationSpot(
        request: DataRequest.GetInventoryByLocationSpot
    ): Promise<Array<Model.Inventory>> {
        if (!request.locationSpot) {
            return Promise.reject("Must provide locationSpot");
        } else {
            let response: Array<Model.Inventory> = [
                {
                    licenseId: 418543,
                    currentLocation: "B01-R01-C01-NB",
                    policyCode: "493718",
                    clientOwner: "viscosa",
                    materialId: "viscosa/VCA1030",
                    qty: 1,
                    vin: "",
                    batch: "",
                    dateExpiration: null,
                    tone: null,
                    caliber: null,
                    serialNumberRequests: 1,
                    materialName: "",
                    statusName: "",
                    shortName: ""
                },
                {
                    licenseId: 418545,
                    currentLocation: "B01-R01-C01-NB",
                    policyCode: "493718",
                    clientOwner: "viscosa",
                    materialId: "viscosa/VCA1030",
                    qty: 1,
                    vin: "",
                    batch: "",
                    dateExpiration: null,
                    tone: null,
                    caliber: null,
                    serialNumberRequests: 1,
                    materialName: "",
                    statusName: "",
                    shortName: ""
                }
            ];
            return Promise.resolve(response);
        }
    }

    public getAvailableLicenseSeries(
        request: DataRequest.GetAvailableLicenseSeries
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_SERIES>> {
        return Promise.resolve([
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: "SERIAL"
            },
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: ""
            },
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: "1/19/20180.7093430251947719"
            },
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: "1/19/20180.18014580036064443"
            },
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: "1/19/20180.6721042279285983"
            },
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: "1/19/20180.54379691492302"
            },
            {
                LICENSE_ID: 5,
                MATERIAL_ID: "viscosa/VCA1030",
                SERIAL: "2018-1-190.34087526028618087"
            }
        ]);
    }

    public validateIfStatusOfLicenseAllowsRealloc(
        _request: DataRequest.ValidateIfStatusOfLicenseAllowsRelocation
    ): Promise<DataResponse.Operation> {
        let operation = Model.Factory.createSuccessOperation();
        return Promise.resolve(operation);
    }

    public getAvailableLicenseDetail(
        request: DataRequest.GetAvailableLicenseDetail
    ): Promise<Array<DataResponse.OP_WMS_SP_GET_AVAILABLE_LICENSE_DETAIL>> {
        let response = [
            {
                "LICENSE_ID": 439466,
                "MATERIAL_ID": "motorganica/VBW1134",
                "MATERIAL_NAME": "BALDWIN FILTRO PA3610",
                "QTY": 100,
                "COMMITED_QTY": 0,
                "AVAILABLE_QTY": 100,
                "SERIAL_NUMBER_REQUESTS": 0,
                "IS_CAR": 0,
                "VIN": "",
                "BATCH_REQUESTED": 0,
                "BATCH": "",
                "DATE_EXPIRATION": null,
                "STATUS_ID": 1449,
                "HANDLE_TONE": 0,
                "TONE": null,
                "HANDLE_CALIBER": 0,
                "CALIBER": null,
                "STATUS_CODE":null,
                "STATUS_NAME":null
            },
            {
                "LICENSE_ID": 439466,
                "MATERIAL_ID": "motorganica/VBW1133",
                "MATERIAL_NAME": "BALDWIN FILTRO PA3610",
                "QTY": 66,
                "COMMITED_QTY": 23,
                "AVAILABLE_QTY": 43,
                "SERIAL_NUMBER_REQUESTS": 0,
                "IS_CAR": 1,
                "VIN": "1122",
                "BATCH_REQUESTED": 0,
                "BATCH": "",
                "DATE_EXPIRATION": null,
                "STATUS_ID": 1449,
                "HANDLE_TONE": 0,
                "TONE": null,
                "HANDLE_CALIBER": 0,
                "CALIBER": null,
                "STATUS_CODE":null,
                "STATUS_NAME":null
            },
            {
                "LICENSE_ID": 439466,
                "MATERIAL_ID": "motorganica/VBW1132",
                "MATERIAL_NAME": "BALDWIN FILTRO PA3610",
                "QTY": 94,
                "COMMITED_QTY": 1,
                "AVAILABLE_QTY": 93,
                "SERIAL_NUMBER_REQUESTS": 1,
                "IS_CAR": 0,
                "VIN": "",
                "BATCH_REQUESTED": 1,
                "BATCH": "",
                "DATE_EXPIRATION": null,
                "STATUS_ID": 1449,
                "HANDLE_TONE": 0,
                "TONE": null,
                "HANDLE_CALIBER": 0,
                "CALIBER": null,
                "STATUS_CODE":null,
                "STATUS_NAME":null
            },
            {
                "LICENSE_ID": 439466,
                "MATERIAL_ID": "motorganica/VBW1101",
                "MATERIAL_NAME": "BALDWIN FILTRO PA2635FN",
                "QTY": 100,
                "COMMITED_QTY": 0,
                "AVAILABLE_QTY": 100,
                "SERIAL_NUMBER_REQUESTS": 0,
                "IS_CAR": 0,
                "VIN": "",
                "BATCH_REQUESTED": 1,
                "BATCH": "123",
                "DATE_EXPIRATION": new Date(),
                "STATUS_ID": 1449,
                "HANDLE_TONE": 0,
                "TONE": null,
                "HANDLE_CALIBER": 0,
                "CALIBER": null,
                "STATUS_CODE":null,
                "STATUS_NAME":null
            }
        ];

        return Promise.resolve(response);
    }


    getInfoOfLicenseInLocationForMerge(
        request: DataRequest.GetInfoOfLicenseInLocationForMerge
    ): Promise<Array<Model.MergeLicense>> {
        let result: Array<Model.MergeLicense> = [
            {
                licenseId: 1,
                licenseDescription: "1-arium",
                icon: "arrow-right",
                showDetails: false,
                detail: [
                    <Model.MergeDetail>{
                        materialId: "arium/10001",
                        quantity: 100
                    },
                    <Model.MergeDetail>{
                        materialId: "arium/10003",
                        quantity: 100,
                        batch: "123",
                        expirationDate: new Date()
                    }
                ]
            },
            {
                licenseId: 2,
                licenseDescription: "2-viscosa",
                icon: "arrow-right",
                showDetails: false,
                detail: [
                    <Model.MergeDetail>{
                        materialId: "viscosa/VCA1030",
                        quantity: 456
                    },
                    <Model.MergeDetail>{
                        materialId: "viscosa/VCA1032",
                        quantity: 456
                    },
                    <Model.MergeDetail>{
                        materialId: "viscosa/VCA1031",
                        quantity: 875,
                        tone: "123",
                        caliber: "22"
                    }
                ]
            }
        ];
        return Promise.resolve(result);
    }

    mergeLicenseInLocationWithoutDetail(
        request: any
    ): Promise<DataResponse.Operation> {
        let operation = Model.Factory.createSuccessOperation();
        operation.DbData = "1-arium|2-motorganica";
        return Promise.resolve(operation);
    }
}
