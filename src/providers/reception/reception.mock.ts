import { DataRequest, DataResponse, Model } from "../../models/models";
import { Enums } from "../../enums/enums";

export class ReceptionProvider {
    public completeTask(
        request: DataRequest.Reception
    ): Promise<DataResponse.Operation> {
        if (request.taskId === null) {
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        "Bad request",
                        Enums.CustomErrorCodes.DataBaseError
                    )
                )
            );
        }
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public getReceptionTaskHeader(): Promise<
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

    public validateBarcodeForLicense(
        materialRequest: DataRequest.GetScannedMaterialByLicenseInReceptionTask
    ): Promise<Model.Operation> {
        if (materialRequest.barcode === "ERROR") {
            throw new TypeError("Material doesn't exist for current client");
        } else if (materialRequest.barcode === "NONE") {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: -1,
                    message: "Material doesn't exist for current client"
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    public getScannedMaterialByLicenseInReceptionTask(
        materialRequest: DataRequest.GetScannedMaterialByLicenseInReceptionTask
    ): Promise<Model.Material> {
        let material: Model.Material;
        if (materialRequest.barcode === "BATCH") {
            material = {
                materialId: "motorganica/VBW1101",
                clientOwner: "motorganica",
                barcodeId: "motorganica/VBW1101",
                alternateBarcode: "",
                materialName: "BALDWIN FILTRO PA2635FN",
                shortName: "",
                volumeFactor: 0,
                materialClass: "",
                high: 0,
                length: 0,
                width: 0,
                maxXBin: 0,
                scanByOne: 0,
                requiresLogisticsInfo: 0,
                weight: 2,
                image1:
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAMp0lEQVR4XtWaCXQUVbrH/9+tqu7qdCcBzAoGwhK2J8gimxl98JxFUBw2GcVBWVQQNDCOwOiA4IGBOaIwHnB9AqM8VJ6CgDx4Z1QUBQFNRGQLSyCBSGjMoiSd7uquuvfdbpIm6aZDx+eMx985/9Od6tT3ff/vLpXTNySEwM8Zhp87P8IIdJW6AT+c/lILpG6RavmvHIFeDjs2Ajgq9YVNxe5mGHFI3Zpgp08B7HM5aC4R3lcVuO1aKGb/f6aBbJkwmGR/Wgt2x8o8HW/OdSA7g/Unwh4A90kpuDKdpfIcNhQB2N49mw16fY4Dxetcyv6XXLRooq61voYND5qS5oKx7pZyoQlCi5iIEAfJjLCACNOdOinPPayzEbkadBtCVHsF8lb48NZHAcjPCz0+MR5APi4xOdFBE+Xv5EJy1xANU27TMLDbJZ/h7AIImNJZvomn1/t5/gmLSbMVXj/mAnjphxpgUnfLQH/zBZCSN9KGR0bY0CaFhZMCAvXsK7QwZbnPPP4NrxYiZCBRamDvjgp/YJjGbu6hoFNmjIEXaMReGev59/x4+1MTckQO1RpiPoCN8RpQpMbIG5fIG9uPuFHFkkl2tM9gMZMeKuZYtyOAl7cFLJlMYYwEgYTFOcv7rQ1PT7aHvUYhYl/76GsLi9YbfPcRiwFYLBU0YjZlYIh0vFw6vv72ASoeHWXDjd2VmMnf2hmQhZvi/f0mOR0qvzY9nTl0G74qPI1B13fFiTPnzPKqi2pOayZWTNVpcA8lRvGiSUMvbQ9g5qsGNAU7A1ZofZSpaEzrZCct/d4jxrXPIL7gHh3DpYFQMAtRbNpjYtm7fuvz45aS0sKBnp2z0DYjhamqglJ3BYKkt2qBtJYtVHdFFYrPldKtT3owS07DWaM0JDnoikYoxsg89GsN7VMZ7l7mvYkx5BsBjI4cgS1Sw1fP0DHmFxps6pW6IbDtCxPz1vn54TOcZVzjQse2WUhtmQyqS+01/Dh0sgTfVdfgVwN7N3rmnDxbhiNFJUhNJr7k93Y27iYVofQi/ilVViXwi3m1VmmFOBs5AnuCBjQFsJFo1HWScssbp71sYGu+icyURHZTn7ZIaZGESPwBE7U+A0nOBDSEiJDTtjVap7ZC4aliNmllFZ7dzMTDQzUa2V9BSyfFKjxMwALWyHV2rlIwADsYGrNE1/DK+GU+FJzgII6wtu4z0W9WLd9xUIgBPbpgYM/rwsXHhhBGXJZT19G3e1fk9uoOr5VMD71ioMejXv7MpgAuVAmA47Ksy+9ragVGLfWJp97xgzE8BmDylRaxYtdwKD2ZcnYvSgi+xxNvGHj1w2DXk0SPnI7kdOhoApnIhwPHT8OyLNzc5zpcje9qPCg6W4oz5yvRIoH4Y7dpbOot6uU1IoAiN8e4FwzzwBkuuMBvAWxvahdqr2vY1TaFpYOAM+Vg3Tu2p3aZaWgSgRAW5zh6+qws6FsMy70B8VLj9YWMFJ/7FokO4vcMUtj8kRp2HOaYvMqwuMB5XwC3A/gqnufAcKktRMAvB/SCK8ERo+BouBAoLA4W4o7DQHRMuX6kiXOorqniGgVESQVXFIZNFsdoADyev4UmqQrW1s/iwyeO8VPfnIfH62s4l2MiuADnHHESFTNBt6NLdju4nC1ZsHhcIqWuqdSUgaQEGzYAWDWmn5q8eaYdHz+hI7ejnx2Uc/r9vfvF5wcPibLySjSF1zDkFupBYoIjnqKjKCm7gA/25fMLFW7xwj0aZsj10DGVBgDYJOs7COBm1KHiMlm6hu0WR7c3p9ox+gYF9Qx8wI5nxgp8dNSi53d4xN6Dx3BNki66dehAwf0/koBlwTQtOHR7w4KvirvyOxwvPo3yiz6MH6iwRSPsaJ1MCPL0aE3LL+aYsT7QNb+E79Q1vOYLYEb9GsiVF/7baaeMrTPsrG87hoZQRPJPjnHM3uAXBSWcenTKRqeszKgOHjhxGp2z2qBr9rW4GqJuzRSWlKJXFhN/HanRLV0YQFc2/vpeC/f/lx9CYEv9CMyWblofekpHu1YAuGhyl7k5h7Bnjp0WvBfA4u3FKK8qt67r1ElxORzhgoKyaWpcW+iRoiLurvKwRXdomP1rlYga5xNCCgAjhMjtyGBTYBkmXGp9U6XumPuuH8+M0ZCeRFcddpJ6ariGwTkKpr3loZ0FB0SHa9tQu4w0iLrEftNEU5xxfyufF0WiSzrR+on2UGFXghqMxNEygSHLDc4IhwH8ruE2OtquYk2CjZxLR2lsXH8FmoK4qDGAP28O4LW9FvcYgl2b1goghuzMNKS2iF4jlhV8ThTjRKkb4wcoWHGXDU4brsruIo7bVhochJMeI7SQ3Q0tbzBMdAtYYkdwfvX+i89auM1EPLjswHNjNZxeZGdzh6mo9VRZpe5ynHO7UVVdg4ZU13qx9+DBUPFPj9Kw+t74in/7Swv/sdxAgKNAFj8AgLupB9ntKsOzJkfncf0UzBumoVMaIV4u+oB1+0w8+4HJSyoFS2/pFBkpaeQ1/HKBl1k92wArf6cpfdoyxMPsjQEs/9CEwvCOxTEBgCeeJ/FAqT02FeAc4pfdFMobospdgpDqis+MLwB8ctLCkv81+a6TPFzt9MEqlo3RwOII8/zHJma+HYBkrdS9cX8rodsAImD9/AQsfUinwxc4H7bSQNvHfWLcKj9OlwtcDV0DBmQz2FWESHKS2a2DYgWLyl1qiOKK2DG8AWDyWn+oeCIYAP7crK9VTAskRDCptP0bDfmvuNhHf3Ni2ggb7SzivPtTvmBnUemJbeTLMxx9FhvWZ6c4VxVYc+7X1YK3E5V//KcLxd8LkfOkL1TkB4UcDTnmFhi8zODv7Of8wTvtUJVwrfEbIEBAEjARJBSkZweG+RPs2POik00facOCrQFcv8jga/dZEBE+Xtxp4salBrIyGS3Pc6gAWG5vBUTATX1V7N+QxBY+ouPTEsGHrjDwgNw4FsuGTH0jGNMnqgWwa52LTRlrg8WhxjKgIgbJLkos/15AtxEiaeEiPCmN3DdUw4LVBk163S9Hg/i0f1fZ4M4Mf9luine+tOiR0TrmTXKwzbsC4ALUNpOhnpRWhMcmOfCHCQ724psGlq3xWdVfmRAC9KcHHWzGeJ0SXQx75TUJNduAqmCiLs23y6BLbav3QRR+bddawZq5Ntp7xMTC1V42a2NAmBaIEejlOUm48xY7AMJ3HhN2jYQzUSUoDCCgPqCiAA/fp2H6eJfiNQS4ICQ6CUBdTkWETAHQmmXAplHntJZErkQVIAoXTmEDl5MM6qlh23MJKCvntGWXgX7dbejTzRY2ylQ/BCRMA6mNDYTjguC0ow4Km0zPYPUGBkkVxj8CKiUlOogUVQsnkor9XiozE5g6Vo/67KKXgg0RqsNO0ELG60JRlJloAxocOllen+gDYE3cBnyGSOvQRiUEDRCkLgelcPfD1yJMscv3gEJfg2RnaXAl6wBiFB7DgFMFFIUEIGzNmkIg4mAE0hpOoYjORxgJG4s0SAw2GxOk2oHozjc5Chu3VKHGw1UAxc0yIAAmATRbg2LC3Y/ofOS1xl1VVAUWp2Cs+usRxdabb2zq8wIP7p1WzBWFNliWeLY5BpIqv+cJ7bN0UEMDkuiRiH6liI5eqLQgNwMiVYvseOTPYU4W+XDrqKNcCBTI4icA8DfLQMAU1uoNVYrfIjZ7SgYy01QAUTtR9FQgghAA1X3mMzg+3nORjx2dyqAoiIcvCmow4q4jprz3G9MUwwHUQtIcA2WcozcjjFy3ufLxN7ZUuhb+MYsmjE2F3cYAitjuIqCIa91zEujYcS+/2omQ7DReXnUeM+eckl7pc1n8GADu/+8JTTpjeJxzzMjOsvP5f8hio4a2QnN4YukZ7M6vtr74pJeCGGzaWoHFS0ut/QdqlLrTmJlSxo9xRubmPBSst/vbwLaJj57EgNsP8ne3VyJeAgEBxghX4j0Zp9eg/dadvy9E4bHaAwBypR6SMn7sQ76vvD4+HMDwklLjwARpZNIfi3D2nIEfQkWliSl5JzHq7qM4UeT9GsBvZPx+AD77Zx+zbvUavA+Aif/zYVVFn1u/Fs+/5sbFagvRxJ4uXXrlW6+tu2AAuN/vF8F4/5Di/8pz4r/7DN5ZCKx44q8l6PmrA1bevNPYU1B95UR1mV79+3kEp4unlr9nWeLfAKzCJegnOKkP01e3s5dUhWoAiP69XNbDEzLE2uc6icpD/cTMBzNF394uvnBeOwFAMIYX0Bj6iQ2ESZK6TZr5TFPJDUC0ybD5c9rrfqJQ4VzX2dyf/n8l4p+ePaVWS1VLCamhkPwMDEQxRGq6lIYfmf8DzLdVIkz/+Z4AAAAASUVORK5CYII=",
                image2: "",
                image3: "",
                lastUpdated: new Date(),
                lastUpdatedBy: "",
                isCar: 1,
                mt3: 0,
                batchRequested: 1,
                serialNumberRequests: 0,
                isMasterPack: 0,
                erpAveragePrice: 0,
                weightMeasurement: "",
                explodeInReception: 0,
                handleTone: 0,
                handleCaliber: 0,
                usePickingLine: 0,
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
        } else if (materialRequest.barcode === "SERIAL") {
            material = {
                materialId: "motorganica/VBW1132",
                clientOwner: "motorganica",
                barcodeId: "motorganica/VBW1132",
                alternateBarcode: "",
                materialName: "BALDWIN FILTRO PA3610",
                shortName: "",
                volumeFactor: 0,
                materialClass: "",
                high: 0,
                length: 0,
                width: 0,
                maxXBin: 0,
                scanByOne: 0,
                requiresLogisticsInfo: 0,
                weight: 2,
                image1:
                    "data:image/png;base64,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",
                image2: "",
                image3: "",
                lastUpdated: new Date(),
                lastUpdatedBy: "",
                isCar: 0,
                mt3: 0,
                batchRequested: 0,
                serialNumberRequests: 1,
                isMasterPack: 0,
                erpAveragePrice: 0,
                weightMeasurement: "",
                explodeInReception: 0,
                handleTone: 0,
                handleCaliber: 0,
                usePickingLine: 0,
                quantity: 1,
                batch: "",
                expirationDate: new Date(),
                tone: "",
                caliber: "",
                vin: "",
                showDetails: false,
                icon: "arrow-dropright",
                SerialNumbers: []
            };
        } else if (materialRequest.barcode === "VIN") {
            material = {
                materialId: "motorganica/VBW1133",
                clientOwner: "motorganica",
                barcodeId: "motorganica/VBW1133",
                alternateBarcode: "",
                materialName: "BALDWIN FILTRO PA3610",
                shortName: "",
                volumeFactor: 0,
                materialClass: "",
                high: 0,
                length: 0,
                width: 0,
                maxXBin: 0,
                scanByOne: 0,
                requiresLogisticsInfo: 0,
                weight: 2,
                image1:
                    "data:image/png;base64,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",
                image2: "",
                image3: "",
                lastUpdated: new Date(),
                lastUpdatedBy: "",
                isCar: 1,
                mt3: 0,
                batchRequested: 0,
                serialNumberRequests: 0,
                isMasterPack: 0,
                erpAveragePrice: 0,
                weightMeasurement: "",
                explodeInReception: 0,
                handleTone: 0,
                handleCaliber: 0,
                usePickingLine: 0,
                quantity: 1,
                batch: "",
                expirationDate: new Date(),
                tone: "",
                caliber: "",
                vin: "",
                showDetails: false,
                icon: "arrow-dropright",
                SerialNumbers: []
            };
        } else if (materialRequest.barcode === "EMPTY") {
            material = {
                materialId: "motorganica/VBW1134",
                clientOwner: "motorganica",
                barcodeId: "motorganica/VBW1134",
                alternateBarcode: "",
                materialName: "BALDWIN FILTRO PA3610",
                shortName: "",
                volumeFactor: 0,
                materialClass: "",
                high: 0,
                length: 0,
                width: 0,
                maxXBin: 0,
                scanByOne: 0,
                requiresLogisticsInfo: 0,
                weight: 2,
                image1:
                    "data:image/png;base64,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",
                image2: "",
                image3: "",
                lastUpdated: new Date(),
                lastUpdatedBy: "",
                isCar: 0,
                mt3: 0,
                batchRequested: 0,
                serialNumberRequests: 0,
                isMasterPack: 0,
                erpAveragePrice: 0,
                weightMeasurement: "",
                explodeInReception: 0,
                handleTone: 0,
                handleCaliber: 0,
                usePickingLine: 0,
                quantity: 1,
                batch: "",
                expirationDate: new Date(),
                tone: "",
                caliber: "",
                vin: "",
                showDetails: false,
                icon: "arrow-dropright",
                SerialNumbers: []
            };
        }
        return Promise.resolve(material);
    }

    public addMaterialToLicense(
        addMaterial: DataRequest.AddMaterialToLicense
    ): Promise<Model.Operation> {
        if (addMaterial.barcode === "ERROR") {
            throw new TypeError("Operation was not executed");
        } else if (addMaterial.barcode === "NONE") {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: -1,
                    message: "Operation was not executed"
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    public rollbackLicense(): Promise<Model.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public validateStatusInMaterialsLicense(
        license: DataRequest.ValidateStatusInMaterialsLicense
    ): Promise<Model.Operation> {
        if (license.licenseId === -1) {
            throw new TypeError("Operation was not executed");
        } else if (license.licenseId === 0) {
            return Promise.resolve(
                Model.Factory.createFaultOperation({
                    code: -1,
                    message: "Operation was not executed"
                })
            );
        } else {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        }
    }

    public validateScannedDocumentForReception(
        request: DataRequest.ValidateScannedDocumentForReception
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.Codigo = 3161;
        result.DbData = "TRANSFER_REQUEST";
        return Promise.resolve(result);
    }

    public generateReceptionDocumentFromCargoManifest(
        request: DataRequest.GenerateReceptionDocumentFromCargoManifest
    ): Promise<DataResponse.Operation> {
        let result = Model.Factory.createSuccessOperation();
        result.Codigo = 3161;
        result.DbData = "TRANSFER_REQUEST";
        return Promise.resolve(result);
    }
}
