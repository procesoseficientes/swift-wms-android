import { Component } from "@angular/core";
import { IonicPage, NavParams, NavController } from "ionic-angular";
import { NavigationProvider } from "../../providers/navigation/navigation";
import { WorkspacePage } from "../workspace/workspace";
import { Model, DataRequest, DataResponse } from "../../models/models";
import { PickingProvider } from "../../providers/picking/picking";
import { UserSettingsProvider } from "../../providers/user-settings/user-settings";
import { UserInteractionProvider } from "../../providers/user-interaction/user-interaction";
import { Enums } from "../../enums/enums";
import { TranslateProvider } from "../../providers/translate/translate";
import { PrinterProvider } from "../../providers/printer/printer";

@IonicPage()
@Component({
    selector: "generate-exit-pass-from-dispatch",
    templateUrl: "generate-exit-pass-from-dispatch.html"
})
export class GenerateExitPassFromDispatchPage {
    exitPassId: number = 0;
    dispatchNumber: number = 0;
    inputName: string = "";
    inputLastName: string = "";
    inputplateNumber: string = "";
    pilotId: number = 0;
    vehicleId: number = 0;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public navigation: NavigationProvider,
        public workspace: WorkspacePage,
        private picking: PickingProvider,
        private userInteraction: UserInteractionProvider,
        private settings: UserSettingsProvider,
        private translateProvider: TranslateProvider,
        private printer: PrinterProvider
    ) {}

    async ionViewDidEnter(): Promise<void> {
        await this.userInteraction.hideLoading();
        let params = <Model.GenerateExitPassFromDispatchnParam>this.navParams
            .data;
        this.dispatchNumber = params.dispatchNumber;
    }

    backButtonAction(): Promise<any> {
        return this.navigation.popPage(
            this.workspace,
            this.navCtrl
        );
    }

    checkCompletedData(): Boolean {
        let validated: boolean = true;

        if (this.inputName === "") {
            validated = false;
        } else if (this.inputLastName === "") {
            validated = false;
        } else if (this.inputplateNumber === "") {
            validated = false;
        } else if (this.exitPassId > 0) {
            validated = false;
        }
        return validated;
    }

    checkCompletedExitPass(): Boolean {
        let validated: boolean = false;

        if (this.exitPassId > 0) {
            validated = true;
        }

        return validated;
    }

    async printExitPass():Promise<void>{
        try {

            if (!this.settings.printer) {
                this.userInteraction.showCustomError(
                    Enums.CustomErrorCodes.PrinterNotConfigured
                );
                return;
            }

            await this.userInteraction.showLoading();


            let request: DataRequest.GetPrintPassFormatByHH = DataRequest.Factory.createGetPrintPassFormatByHH(
                this.exitPassId,
                this.settings.userCredentials                                
            );

            let result = await this.printer.getPrintPassFormatByHH(request);
            


            await this.printer.printDocument(
                this.settings.printer,
                result.FORMAT
            );

            this.userInteraction.hideLoading();

        } catch (e) { console.log(e)
            await this.userInteraction.hideLoading();
            this.userInteraction.showCustomError(e);
        }
    }

    async completedProcessExitPass(): Promise<DataResponse.Operation> {
        try {
            await this.userInteraction.showLoading();

            let request: DataRequest.InsertPilotFromDispatchLicense = DataRequest.Factory.createInsertPilotFromDispatchLicenseRequest(
                this.inputName,
                this.inputLastName,
                this.settings.userCredentials
            );

            let operation: DataResponse.Operation = await this.picking.insertPilotFromDispatchLicense(
                request
            );

            if (operation.Resultado === Enums.OperationResult.Success) {
                this.pilotId = parseInt(operation.DbData);

                let requestVehicle: DataRequest.InsertVehicleFromDispatchLicence = DataRequest.Factory.createInsertVehicleFromDispatchLicenceRequest(
                    this.inputplateNumber,
                    this.settings.userCredentials
                );

                operation = await this.picking.insertVehicleFromDispatchLicence(
                    requestVehicle
                );

                if (operation.Resultado === Enums.OperationResult.Success) {
                    this.vehicleId = parseInt(operation.DbData);

                    let requestExitPass: DataRequest.InsertExitPassFromDispatchLicence = DataRequest.Factory.createInsertExitPassFromDispatchLicenceRequest(
                        this.dispatchNumber,
                        this.vehicleId,
                        this.pilotId,
                        this.settings.userCredentials
                    );

                    operation = await this.picking.insertExitPassFromDispatchLicence(
                        requestExitPass
                    );

                    if (operation.Resultado === Enums.OperationResult.Success) {
                        this.exitPassId = parseInt(operation.DbData);
                        await this.userInteraction.hideLoading();
                        await this.userInteraction.showMessage(await this.translateProvider.translateGroupValue(
                            Enums.Translation.Groups.Messages,
                            "Successful_process_"
                        ),);
                    } else {
                        await this.userInteraction.hideLoading();
                        await this.userInteraction.showCustomError(
                            operation.Codigo && operation.Codigo > 0
                                ? operation.Codigo
                                : Enums.CustomErrorCodes.UnknownError
                        );
                    }
                } else {
                    await this.userInteraction.hideLoading();
                    await this.userInteraction.showCustomError(
                        operation.Codigo && operation.Codigo > 0
                            ? operation.Codigo
                            : Enums.CustomErrorCodes.UnknownError
                    );
                }
            } else {
                await this.userInteraction.hideLoading();
                await this.userInteraction.showCustomError(
                    operation.Codigo && operation.Codigo > 0
                        ? operation.Codigo
                        : Enums.CustomErrorCodes.UnknownError
                );
            }
        } catch (reason) { console.log(reason)
            this.userInteraction.showCustomError(
                Enums.CustomErrorCodes.UnknownError
            );
            await this.userInteraction.hideLoading();
            return Promise.resolve(
                Model.Factory.createFaultOperation(
                    Model.Factory.createCustomError(
                        reason,
                        Enums.CustomErrorCodes.DataBaseError
                    )
                )
            );
        }
    }
}
