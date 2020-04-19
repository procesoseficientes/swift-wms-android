import { async, TestBed } from "@angular/core/testing";
import { SocketProvider } from "./socket";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../user-settings/user-settings.mock";

describe("SocketProvider", () => {
    let provider: SocketProvider;
    let userSettingsProviderMock = UserSettingsProviderMock.instance();

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    SocketProvider,
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettingsProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(SocketProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof SocketProvider).toBe(true);
    });

    describe("Invalid Tests", () => {
        it("Should be able to see the status of conection", () => {
            return new Promise(resolve => {
                let connectionStatus = provider.socketIsConnected;
                expect(connectionStatus).toBeDefined(
                    "Must be able to see the status of conection."
                );
                resolve();
            });
        });

        it("Should be able to configure the listeners", () => {
            return new Promise(resolve => {
                let operation = provider.configureListeners();
                expect(operation).toBe(
                    undefined,
                    "Must be able to configure the listeners"
                );
                resolve();
            });
        });

        it("Should be able to configure a particular listener", () => {
            return new Promise(resolve => {
                let addListener = provider.addListener("ListenerTest");
                expect(addListener).toBe(
                    undefined,
                    "Must be able to configure a particular listener"
                );

                let listenerAdded = provider.subjects["ListenerTest"];
                expect(listenerAdded).toBeDefined(
                    "Must be able see the listener added previously"
                );
                resolve();
            });
        });

        it("Should be able to subscribe to a particular listener", () => {
            return new Promise(resolve => {
                provider.addListener("ListenerTest");
                let subscription = provider.subscribe("ListenerTest", () => {});
                expect(subscription).toBeDefined(
                    "Must be able to subscribe to a particular listener."
                );
                resolve();
            });
        });

        it("Should be able to subscribe to 'connect' event", () => {
            return new Promise(resolve => {
                provider.configureListeners();
                let subscription = provider.subscribeToConnect();
                expect(subscription).toBeDefined(
                    "Must be able to subscribe to a particular listener."
                );
                resolve();
            });
        });
    });

    describe("Invalid Tests", () => {
        beforeEach(() => {
            userSettingsProviderMock.userCredentials.communicationAddress =
                "http://64.233.191.255";
        });

        it("Should be disconnected from 'http://64.233.191.255' ", () => {
            return new Promise(resolve => {
                expect(provider.socketIsConnected).toBeFalsy(
                    "Must be disconnected from 'http://64.233.191.255' "
                );
                resolve();
            });
        });
    });
});
