import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { DeviceProvider } from "../providers/device/device";
import { Device } from "@ionic-native/device";

import { Swift3pl } from "./app.component";
import { TranslateProvider } from "../providers/translate/translate";
import { RulesProvider } from "../providers/rules/rules";

import { BaseProvider } from "../providers/base/base";

import { TranslateModule, TranslateLoader } from "@ngx-translate/core";

import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { FinancialProvider } from "../providers/financial/financial";
import { UserInteractionProvider } from "../providers/user-interaction/user-interaction";
import { UtilitiesProvider } from "../providers/utilities/utilities";
import { SecurityProvider } from "../providers/security/security";
import { Diagnostic } from "@ionic-native/diagnostic";
import { BatteryStatus } from "@ionic-native/battery-status";
import { NetworkInterface } from "@ionic-native/network-interface";
import { BluetoothSerial } from "@ionic-native/bluetooth-serial";
import { Hotspot } from "@ionic-native/hotspot";
import { NavigationProvider } from "../providers/navigation/navigation";
import { ApiClientV3Provider } from "../providers/api-client/api-client.v3";
import { TaskProvider } from "../providers/task/task";
import { LicenseProvider } from "../providers/license/license";
import { LocationSuggestionProvider } from "../providers/location-suggestion/location-suggestion";
import { ReceptionProvider } from "../providers/reception/reception";
import { ConfigurationProvider } from "../providers/configuration/configuration";
import { LocationProvider } from "../providers/location/location";
import { PickingProvider } from "../providers/picking/picking";
import { ChargeProvider } from "../providers/charge/charge";
import { UserSettingsProvider } from "../providers/user-settings/user-settings";
import { SocketProvider } from "../providers/socket/socket";
import { WebIntent } from "@ionic-native/web-intent";
import { SocketApiProvider } from "../providers/socket-api/socket-api";
import { MaterialProvider } from "../providers/material/material";
import { RelocateProvider } from "../providers/relocate/relocate";
import { LabelProvider } from "../providers/label/label";
import { BroadcastProvider } from "../providers/broadcast/broadcast";
import { PrinterProvider } from "../providers/printer/printer";
import { ManifestCertificationProvider } from "../providers/manifest-certification/manifest-certification";
import { PhysicalCountProvider } from "../providers/physical-count/physical-count";
import { MasterpackProvider } from "../providers/masterpack/masterpack";
import { LocateDispatchProvider } from "../providers/locate-dispatch/locate-dispatch";
import { TransactionOperatorProvider } from "../providers/transaction-operator/transaction-operator";
import { AppVersion } from "@ionic-native/app-version";
import { AppUpdate } from "@ionic-native/app-update";
import { Badge } from "@ionic-native/badge";
import { CheckpointProvider } from "../providers/checkpoint/checkpoint";
import { GeneralTransferProvider } from "../providers/general-transfer/general-transfer";

export const createTranslateLoader = (http: HttpClient) => {
    return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
};

@NgModule({
    declarations: [Swift3pl],
    imports: [
        BrowserModule,
        IonicModule.forRoot(Swift3pl),
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [Swift3pl],
    providers: [
        {
            provide: UserSettingsProvider,
            useValue: UserSettingsProvider.getInstance()
        },
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        TranslateProvider,
        BaseProvider,
        RulesProvider,
        FinancialProvider,
        UserInteractionProvider,
        UtilitiesProvider,
        SecurityProvider,
        DeviceProvider,
        Device,
        Diagnostic,
        BatteryStatus,
        NetworkInterface,
        Hotspot,
        BluetoothSerial,
        NavigationProvider,
        TaskProvider,
        LicenseProvider,
        LocationSuggestionProvider,
        ReceptionProvider,
        ConfigurationProvider,
        PickingProvider,
        LocationProvider,
        ChargeProvider,
        ApiClientV3Provider,
        WebIntent,
        SocketProvider,
        MaterialProvider,
        RelocateProvider,
        LabelProvider,
        SocketApiProvider,
        BroadcastProvider,
        PrinterProvider,
        ManifestCertificationProvider,
        PhysicalCountProvider,
        MasterpackProvider,
        LocateDispatchProvider,
        TransactionOperatorProvider,
        AppVersion,
        AppUpdate,
        Badge,
        CheckpointProvider,
        GeneralTransferProvider
    ]
})
export class AppModule {}
