"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_1 = require("@angular/platform-browser");
const core_1 = require("@angular/core");
const ionic_angular_1 = require("ionic-angular");
const splash_screen_1 = require("@ionic-native/splash-screen");
const status_bar_1 = require("@ionic-native/status-bar");
const device_1 = require("../providers/device/device");
const device_2 = require("@ionic-native/device");
const app_component_1 = require("./app.component");
const translate_1 = require("../providers/translate/translate");
const rules_1 = require("../providers/rules/rules");
const base_1 = require("../providers/base/base");
const core_2 = require("@ngx-translate/core");
const http_loader_1 = require("@ngx-translate/http-loader");
const http_1 = require("@angular/common/http");
const financial_1 = require("../providers/financial/financial");
const user_interaction_1 = require("../providers/user-interaction/user-interaction");
const utilities_1 = require("../providers/utilities/utilities");
const security_1 = require("../providers/security/security");
const diagnostic_1 = require("@ionic-native/diagnostic");
const battery_status_1 = require("@ionic-native/battery-status");
const network_interface_1 = require("@ionic-native/network-interface");
const bluetooth_serial_1 = require("@ionic-native/bluetooth-serial");
const hotspot_1 = require("@ionic-native/hotspot");
const navigation_1 = require("../providers/navigation/navigation");
const api_client_v3_1 = require("../providers/api-client/api-client.v3");
const task_1 = require("../providers/task/task");
const license_1 = require("../providers/license/license");
const location_suggestion_1 = require("../providers/location-suggestion/location-suggestion");
const reception_1 = require("../providers/reception/reception");
const configuration_1 = require("../providers/configuration/configuration");
const location_1 = require("../providers/location/location");
const picking_1 = require("../providers/picking/picking");
const charge_1 = require("../providers/charge/charge");
const user_settings_1 = require("../providers/user-settings/user-settings");
const socket_1 = require("../providers/socket/socket");
const web_intent_1 = require("@ionic-native/web-intent");
const socket_api_1 = require("../providers/socket-api/socket-api");
const material_1 = require("../providers/material/material");
const relocate_1 = require("../providers/relocate/relocate");
const label_1 = require("../providers/label/label");
const broadcast_1 = require("../providers/broadcast/broadcast");
const printer_1 = require("../providers/printer/printer");
const manifest_certification_1 = require("../providers/manifest-certification/manifest-certification");
const physical_count_1 = require("../providers/physical-count/physical-count");
const masterpack_1 = require("../providers/masterpack/masterpack");
const locate_dispatch_1 = require("../providers/locate-dispatch/locate-dispatch");
const transaction_operator_1 = require("../providers/transaction-operator/transaction-operator");
const app_version_1 = require("@ionic-native/app-version");
const app_update_1 = require("@ionic-native/app-update");
const badge_1 = require("@ionic-native/badge");
const checkpoint_1 = require("../providers/checkpoint/checkpoint");
const general_transfer_1 = require("../providers/general-transfer/general-transfer");
exports.createTranslateLoader = (http) => {
    return new http_loader_1.TranslateHttpLoader(http, "./assets/i18n/", ".json");
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        declarations: [app_component_1.Swift3pl],
        imports: [
            platform_browser_1.BrowserModule,
            ionic_angular_1.IonicModule.forRoot(app_component_1.Swift3pl),
            http_1.HttpClientModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: exports.createTranslateLoader,
                    deps: [http_1.HttpClient]
                }
            })
        ],
        bootstrap: [ionic_angular_1.IonicApp],
        entryComponents: [app_component_1.Swift3pl],
        providers: [
            {
                provide: user_settings_1.UserSettingsProvider,
                useValue: user_settings_1.UserSettingsProvider.getInstance()
            },
            status_bar_1.StatusBar,
            splash_screen_1.SplashScreen,
            { provide: core_1.ErrorHandler, useClass: ionic_angular_1.IonicErrorHandler },
            translate_1.TranslateProvider,
            base_1.BaseProvider,
            rules_1.RulesProvider,
            financial_1.FinancialProvider,
            user_interaction_1.UserInteractionProvider,
            utilities_1.UtilitiesProvider,
            security_1.SecurityProvider,
            device_1.DeviceProvider,
            device_2.Device,
            diagnostic_1.Diagnostic,
            battery_status_1.BatteryStatus,
            network_interface_1.NetworkInterface,
            hotspot_1.Hotspot,
            bluetooth_serial_1.BluetoothSerial,
            navigation_1.NavigationProvider,
            task_1.TaskProvider,
            license_1.LicenseProvider,
            location_suggestion_1.LocationSuggestionProvider,
            reception_1.ReceptionProvider,
            configuration_1.ConfigurationProvider,
            picking_1.PickingProvider,
            location_1.LocationProvider,
            charge_1.ChargeProvider,
            api_client_v3_1.ApiClientV3Provider,
            web_intent_1.WebIntent,
            socket_1.SocketProvider,
            material_1.MaterialProvider,
            relocate_1.RelocateProvider,
            label_1.LabelProvider,
            socket_api_1.SocketApiProvider,
            broadcast_1.BroadcastProvider,
            printer_1.PrinterProvider,
            manifest_certification_1.ManifestCertificationProvider,
            physical_count_1.PhysicalCountProvider,
            masterpack_1.MasterpackProvider,
            locate_dispatch_1.LocateDispatchProvider,
            transaction_operator_1.TransactionOperatorProvider,
            app_version_1.AppVersion,
            app_update_1.AppUpdate,
            badge_1.Badge,
            checkpoint_1.CheckpointProvider,
            general_transfer_1.GeneralTransferProvider
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map