import { async, TestBed } from "@angular/core/testing";
import { SocketApiProvider } from "./socket-api";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../user-settings/user-settings.mock";
import { Model } from "../../models/models";

describe("SocketApiProvider", () => {
    let provider: SocketApiProvider;
    let userSettingsProviderMock = UserSettingsProviderMock.instance();

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    SocketApiProvider,
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettingsProviderMock
                    }
                ]
            });
        })
    );

    beforeEach(() => {
        provider = TestBed.get(SocketApiProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof SocketApiProvider).toBe(true);
    });

    it("Should be able to subscribe to an event", () => {
        return new Promise(resolve => {
            provider.handshakeWithServer(data => {
                expect(data).toBeDefined(data);
                resolve();
            });
        });
    });

    it("Should be able to have a subscription to the broadcasts lost ", () => {
        return new Promise(resolve => {
            let subscription = provider.listenToBroadcastTasksLost(() => {});

            expect(subscription).toBeDefined(
                "Must be able to have a subscription to the broadcasts lost."
            );
            resolve();
        });
    });

    it("Should be able to have a subscription to a particular broadcast ", () => {
        return new Promise(resolve => {
            let subscription = provider.listenToBroadcast(() => {});

            expect(subscription).toBeDefined(
                "Must be able to have a subscription to a particular broadcast."
            );
            resolve();
        });
    });

    it("Should be able to validate if a broadcast received is for the current user ", () => {
        return new Promise(resolve => {
            let broadcast: Model.BroadcastFromServer = {
                broadcast: {
                    status: "new",
                    loginId: "BCORADO",
                    operationType: "TRY"
                }
            };
            let validation = provider.broadcastIsForMe(broadcast);

            expect(validation).toBeTruthy(
                "Must be able to validate if the broadcast received is for the current user or not."
            );

            broadcast.broadcast.loginId = "ACAMACHO";
            validation = provider.broadcastIsForMe(broadcast);
            expect(validation).toBeFalsy(
                "Must be able to validate if the broadcast received is not for the current user."
            );

            resolve();
        });
    });
});
