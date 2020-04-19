import {
    IterableChangeRecord,
    IterableChanges,
    IterableDiffer,
    IterableDifferFactory,
    NgIterable,
    TrackByFunction
} from "./iterable_differs";

export class DefaultIterableDifferFactory {
    supports(_obj: Object | null | undefined): any /* boolean */
    {}
    create(_trackByFn: TrackByFunction<V>): any /* DefaultIterableDiffer<V> */
    {}
}

export class DefaultIterableDiffer {
    length: number;
    collection: V[] | Iterable<V> | null;
    _linkedRecords: any;
    _unlinkedRecords: any;
    _previousItHead: any;
    _itHead: any;
    _itTail: any;
    _additionsHead: any;
    _additionsTail: any;
    _movesHead: any;
    _movesTail: any;
    _removalsHead: any;
    _removalsTail: any;
    _identityChangesHead: any;
    _identityChangesTail: any;
    _trackByFn: any;
    isDirty: boolean;

    forEachItem(_fn: (record: IterableChangeRecord_<V>) => void): any /* void */
    {}
    forEachOperation(
        _fn: (
            item: IterableChangeRecord<V>,
            previousIndex: number | null,
            currentIndex: number | null
        ) => void
    ): any /* void */
    {}
    forEachPreviousItem(
        _fn: (record: IterableChangeRecord_<V>) => void
    ): any /* void */
    {}
    forEachAddedItem(
        _fn: (record: IterableChangeRecord_<V>) => void
    ): any /* void */
    {}
    forEachMovedItem(
        _fn: (record: IterableChangeRecord_<V>) => void
    ): any /* void */
    {}
    forEachRemovedItem(
        _fn: (record: IterableChangeRecord_<V>) => void
    ): any /* void */
    {}
    forEachIdentityChange(
        _fn: (record: IterableChangeRecord_<V>) => void
    ): any /* void */
    {}
    diff(_collection: NgIterable<V>): any /* DefaultIterableDiffer<V> | null */
    {}
    onDestroy(): any /* void */
    {}
    check(_collection: NgIterable<V>): any /* boolean */
    {}
    _addToRemovals(_record: any): any /*  */
    {}
}

export class IterableChangeRecord_ {
    item: V;
    trackById: any;
    currentIndex: number | null;
    previousIndex: number | null;
}
