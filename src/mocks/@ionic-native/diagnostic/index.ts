export class Diagnostic {
    permission: {
        READ_CALENDAR: string;
        WRITE_CALENDAR: string;
        CAMERA: string;
        READ_CONTACTS: string;
        WRITE_CONTACTS: string;
        GET_ACCOUNTS: string;
        ACCESS_FINE_LOCATION: string;
        ACCESS_COARSE_LOCATION: string;
        RECORD_AUDIO: string;
        READ_PHONE_STATE: string;
        CALL_PHONE: string;
        ADD_VOICEMAIL: string;
        USE_SIP: string;
        PROCESS_OUTGOING_CALLS: string;
        READ_CALL_LOG: string;
        WRITE_CALL_LOG: string;
        SEND_SMS: string;
        RECEIVE_SMS: string;
        READ_SMS: string;
        RECEIVE_WAP_PUSH: string;
        RECEIVE_MMS: string;
        WRITE_EXTERNAL_STORAGE: string;
        READ_EXTERNAL_STORAGE: string;
        BODY_SENSORS: string;
    };
    permissionStatus: {
        GRANTED: string;
        DENIED: string;
        NOT_REQUESTED: string;
        DENIED_ALWAYS: string;
        RESTRICTED: string;
        GRANTED_WHEN_IN_USE: string;
    };
    locationAuthorizationMode: { ALWAYS: string; WHEN_IN_USE: string };
    permissionGroups: {
        CALENDAR: string[];
        CAMERA: string[];
        CONTACTS: string[];
        LOCATION: string[];
        MICROPHONE: string[];
        PHONE: string[];
        SENSORS: string[];
        SMS: string[];
        STORAGE: string[];
    };
    locationMode: {
        HIGH_ACCURACY: string;
        DEVICE_ONLY: string;
        BATTERY_SAVING: string;
        LOCATION_OFF: string;
    };
    bluetoothState: {
        UNKNOWN: string;
        RESETTING: string;
        UNSUPPORTED: string;
        UNAUTHORIZED: string;
        POWERED_OFF: string;
        POWERED_ON: string;
        POWERING_OFF: string;
        POWERING_ON: string;
    };
    NFCState: {
        UNKNOWN: string;
        POWERED_OFF: string;
        POWERED_ON: string;
        POWERING_ON: string;
        POWERING_OFF: string;
    };
    motionStatus: {
        NOT_REQUESTED: string;
        GRANTED: string;
        DENIED: string;
        RESTRICTED: string;
        NOT_AVAILABLE: string;
        NOT_DETERMINED: string;
        UNKNOWN: string;
    };

    isLocationAvailable(): any /* Promise<any> */ {}
    isWifiAvailable(): any /* Promise<any> */ {}
    isCameraAvailable(_externalStorage: boolean): any /* Promise<any> */ {}
    isBluetoothAvailable(): any /* Promise<any> */ {}
    switchToLocationSettings(): any /* void */ {}
    switchToMobileDataSettings(): any /* void */ {}
    switchToBluetoothSettings(): any /* void */ {}
    switchToWifiSettings(): any /* void */ {}
    isWifiEnabled(): any /* Promise<boolean> */ {}
    setWifiState(_state: boolean): any /* Promise<any> */ {}
    setBluetoothState(_state: boolean): any /* Promise<any> */ {}
    isLocationEnabled(): any /* Promise<boolean> */ {}
    isLocationAuthorized(): any /* Promise<any> */ {}
    getLocationAuthorizationStatus(): any /* Promise<any> */ {}
    requestLocationAuthorization(_mode: string): any /* Promise<any> */ {}
    isCameraPresent(): any /* Promise<any> */ {}
    isCameraAuthorized(_externalStorage: boolean): any /* Promise<any> */ {}
    getCameraAuthorizationStatus(
        _externalStorage: boolean
    ): any /* Promise<any> */ {}
    requestCameraAuthorization(
        _externalStorage: boolean
    ): any /* Promise<any> */ {}
    isMicrophoneAuthorized(): any /* Promise<boolean> */ {}
    getMicrophoneAuthorizationStatus(): any /* Promise<any> */ {}
    requestMicrophoneAuthorization(): any /* Promise<any> */ {}
    isContactsAuthorized(): any /* Promise<boolean> */ {}
    getContactsAuthorizationStatus(): any /* Promise<any> */ {}
    requestContactsAuthorization(): any /* Promise<any> */ {}
    isCalendarAuthorized(): any /* Promise<boolean> */ {}
    getCalendarAuthorizationStatus(): any /* Promise<any> */ {}
    requestCalendarAuthorization(): any /* Promise<any> */ {}
    switchToSettings(): any /* Promise<any> */ {}
    getBluetoothState(): any /* Promise<any> */ {}
    registerBluetoothStateChangeHandler(_handler: Function): any /* void */ {}
    registerLocationStateChangeHandler(_handler: Function): any /* void */ {}
    isGpsLocationAvailable(): any /* Promise<boolean> */ {}
    isGpsLocationEnabled(): any /* Promise<any> */ {}
    isNetworkLocationAvailable(): any /* Promise<any> */ {}
    isNetworkLocationEnabled(): any /* Promise<any> */ {}
    getLocationMode(): any /* Promise<any> */ {}
    getPermissionAuthorizationStatus(
        _permission: any
    ): any /* Promise<any> */ {}
    getPermissionsAuthorizationStatus(
        _permissions: any[]
    ): any /* Promise<any> */ {}
    requestRuntimePermission(_permission: any): any /* Promise<any> */ {}
    requestRuntimePermissions(_permissions: any[]): any /* Promise<any> */ {}
    isRequestingPermission(): any /* boolean */ {}
    registerPermissionRequestCompleteHandler(
        _handler: Function
    ): any /* void */ {}
    isBluetoothEnabled(): any /* Promise<boolean> */ {}
    hasBluetoothSupport(): any /* Promise<boolean> */ {}
    hasBluetoothLESupport(): any /* Promise<boolean> */ {}
    hasBluetoothLEPeripheralSupport(): any /* Promise<boolean> */ {}
    isExternalStorageAuthorized(): any /* Promise<boolean> */ {}
    getExternalStorageAuthorizationStatus(): any /* Promise<any> */ {}
    requestExternalStorageAuthorization(): any /* Promise<any> */ {}
    getExternalSdCardDetails(): any /* Promise<any> */ {}
    switchToWirelessSettings(): any /* void */ {}
    switchToNFCSettings(): any /* void */ {}
    isNFCPresent(): any /* Promise<boolean> */ {}
    isNFCEnabled(): any /* Promise<boolean> */ {}
    isNFCAvailable(): any /* Promise<boolean> */ {}
    registerNFCStateChangeHandler(_handler: Function): any /* void */ {}
    isDataRoamingEnabled(): any /* Promise<boolean> */ {}
    isADBModeEnabled(): any /* Promise<boolean> */ {}
    isDeviceRooted(): any /* Promise<boolean> */ {}
    isCameraRollAuthorized(): any /* Promise<boolean> */ {}
    getCameraRollAuthorizationStatus(): any /* Promise<string> */ {}
    requestCameraRollAuthorization(): any /* Promise<any> */ {}
    isRemoteNotificationsEnabled(): any /* Promise<boolean> */ {}
    isRegisteredForRemoteNotifications(): any /* Promise<boolean> */ {}
    getRemoteNotificationsAuthorizationStatus(): any /* Promise<string> */ {}
    getRemoteNotificationTypes(): any /* Promise<any> */ {}
    isRemindersAuthorized(): any /* Promise<boolean> */ {}
    getRemindersAuthorizationStatus(): any /* Promise<any> */ {}
    requestRemindersAuthorization(): any /* Promise<any> */ {}
    isBackgroundRefreshAuthorized(): any /* Promise<boolean> */ {}
    getBackgroundRefreshStatus(): any /* Promise<any> */ {}
    requestBluetoothAuthorization(): any /* Promise<any> */ {}
    isMotionAvailable(): any /* Promise<boolean> */ {}
    isMotionRequestOutcomeAvailable(): any /* Promise<boolean> */ {}
    requestMotionAuthorization(): any /* Promise<string> */ {}
    getMotionAuthorizationStatus(): any /* Promise<string> */ {}
}
