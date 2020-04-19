import { StaticProvider } from "../../di";

export class NgIterable {}

export class IterableDiffer {
    diff(_object: NgIterable<V>): any /* IterableChanges<V> | null */
    {}
}

export class IterableChanges {
    forEachItem(_fn: (record: IterableChangeRecord<V>) => void): any /* void */
    {}
    forEachOperation(
        _fn: (
            record: IterableChangeRecord<V>,
            previousIndex: number | null,
            currentIndex: number | null
        ) => void
    ): any /* void */
    {}
    forEachPreviousItem(
        _fn: (record: IterableChangeRecord<V>) => void
    ): any /* void */
    {}
    forEachAddedItem(
        _fn: (record: IterableChangeRecord<V>) => void
    ): any /* void */
    {}
    forEachMovedItem(
        _fn: (record: IterableChangeRecord<V>) => void
    ): any /* void */
    {}
    forEachRemovedItem(
        _fn: (record: IterableChangeRecord<V>) => void
    ): any /* void */
    {}
    forEachIdentityChange(
        _fn: (record: IterableChangeRecord<V>) => void
    ): any /* void */
    {}
}

export class IterableChangeRecord {
    currentIndex: number | null;
    previousIndex: number | null;
    item: V;
    trackById: any;
}

export class CollectionChangeRecord {}

export class TrackByFunction {}

export class IterableDifferFactory {
    supports(_objects: any): any /* boolean */
    {}
    create(_trackByFn: TrackByFunction<V>): any /* IterableDiffer<V> */
    {}
}

export class IterableDiffers {
    factories: IterableDifferFactory[];

    create(
        _factories: IterableDifferFactory[],
        _parent: IterableDiffers
    ): any /* IterableDiffers */
    {}
    extend(_factories: IterableDifferFactory[]): any /* StaticProvider */
    {}
    find(_iterable: any): any /* IterableDifferFactory */
    {}
}

export class getTypeNameForDebugging {}
