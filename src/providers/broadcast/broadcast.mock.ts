import { Model } from "../../models/models";

export class BroadcastProvider {

    public static instance(): BroadcastProvider{
        return new BroadcastProvider();
    }

    public removeBroadcastTasksLost(
        _broadcastTasks: Array<Model.Broadcast>
    ): Promise<Model.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public removeBroadcast(
        _broadcast: Model.Broadcast
    ): Promise<Model.Operation> {
        return Promise.resolve(Model.Factory.createSuccessOperation());
    }

    public generateListOfDeleteBroadcastTasksLost(
        broadcastTasks: Array<Model.Broadcast>
    ): Array<Promise<Model.Operation>> {
        return broadcastTasks.map(() => {
            return Promise.resolve(Model.Factory.createSuccessOperation());
        });
    }

    public requestBroadcastTasksLost(): void {
        Promise.resolve();
    }
}
