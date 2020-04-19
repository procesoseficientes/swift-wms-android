import { async, TestBed } from "@angular/core/testing";
import { BroadcastProvider } from "./broadcast";
// import { BroadcastProvider as BroadcastProviderMock } from "./broadcast.mock";
import { ApiClientV3Provider } from "../api-client/api-client.v3";
import { SocketApiProvider } from "../socket-api/socket-api";
import { ApiClientV3Provider as ApiClientV3ProviderMock } from "../api-client/api-client.v3.mock";
import { UserSettingsProvider } from "../user-settings/user-settings";
import { UserSettingsProvider as UserSettingsProviderMock } from "../user-settings/user-settings.mock";
import { Model } from "../../models/models";
import { Enums } from "../../enums/enums";

describe("BroadcastProvider", () => {
    let provider: BroadcastProvider;
    let userSettingsProviderMock = UserSettingsProviderMock.instance();

    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [],
                imports: [],
                providers: [
                    BroadcastProvider,
                    {
                        provide: ApiClientV3Provider,
                        useClass: ApiClientV3ProviderMock
                    },
                    {
                        provide: SocketApiProvider,
                        useClass: SocketApiProvider
                    },
                    {
                        provide: UserSettingsProvider,
                        useValue: userSettingsProviderMock
                    }
                ]
            });
        })
    );

    const arrayOfBroadcasts: Array<Model.Broadcast> = [
        {
            id: 1,
            status: "NEW",
            loginId: "BCORADO",
            operationType: "TRY"
        } as Model.Broadcast,
        {
            id: 2,
            status: "NEW",
            loginId: "BCORADO",
            operationType: "TRY"
        } as Model.Broadcast,
        {
            id: 3,
            status: "NEW",
            loginId: "BCORADO",
            operationType: "TRY"
        } as Model.Broadcast,
        {
            id: 4,
            status: "NEW",
            loginId: "BCORADO",
            operationType: "TRY"
        } as Model.Broadcast,
        {
            id: 5,
            status: "NEW",
            loginId: "BCORADO",
            operationType: "TRY"
        } as Model.Broadcast
    ];

    beforeEach(() => {
        userSettingsProviderMock = UserSettingsProviderMock.instance();
        provider = TestBed.get(BroadcastProvider);
    });

    it("Should be created", () => {
        expect(provider instanceof BroadcastProvider).toBe(true);
    });

    it("Should be able to delete a list of broadcasts", () => {
        let execute = async () => {
            let operation = await provider.removeBroadcastTasksLost(
                arrayOfBroadcasts
            );
            return expect(operation.Resultado).toBe(
                Enums.OperationResult.Success,
                "Must be able to delete a list of broadcasts."
            );
        };
        return execute();
    });

    it("Should be able to delete a specific broadcast", () => {
        let execute = async () => {
            let operation = await provider.removeBroadcast(
                arrayOfBroadcasts[0]
            );
            return expect(operation.Resultado).toBe(
                Enums.OperationResult.Success,
                "Must be able to delete a specific broadcast"
            );
        };
        return execute();
    });

    it("Should be able to generate a list of requests for remove broadcasts", () => {
        let execute = async () => {
            let requests = await provider.generateListOfDeleteBroadcastTasksLost(
                arrayOfBroadcasts
            );
            return expect(requests).toBeDefined(
                "Must be able to generate a list of requests for remove broadcasts."
            );
        };
        return execute();
    });

    it("Should be able to request broadcasts lost", () => {
        return new Promise(resolve => {
            let request = provider.requestBroadcastTasksLost();
            expect(request).toBeUndefined(
                "Must be able to request broadcasts lost."
            );
            resolve();
        });
    });
});
