import {
    KeyValueChangeRecord,
    KeyValueChanges,
    KeyValueDiffer,
    KeyValueDifferFactory
} from "./keyvalue_differs";

export class DefaultKeyValueDifferFactory {
    supports(_obj: any): any /* boolean */
    {}
    create(): any /* KeyValueDiffer<K, V> */
    {}
}

export class DefaultKeyValueDiffer {
    _records: any;
    _mapHead: any;
    _appendAfter: any;
    _previousMapHead: any;
    _changesHead: any;
    _changesTail: any;
    _additionsHead: any;
    _additionsTail: any;
    _removalsHead: any;
    _removalsTail: any;
    isDirty: boolean;

    forEachItem(_fn: (r: KeyValueChangeRecord<K, V>) => void): any /* void */
    {}
    forEachPreviousItem(
        _fn: (r: KeyValueChangeRecord<K, V>) => void
    ): any /* void */
    {}
    forEachChangedItem(
        _fn: (r: KeyValueChangeRecord<K, V>) => void
    ): any /* void */
    {}
    forEachAddedItem(
        _fn: (r: KeyValueChangeRecord<K, V>) => void
    ): any /* void */
    {}
    forEachRemovedItem(
        _fn: (r: KeyValueChangeRecord<K, V>) => void
    ): any /* void */
    {}
    diff(_map: Map<any, any> | { [k: string]: any } | null): any /* any */
    {}
    onDestroy(): any /* void */
    {}
    check(_map: Map<any, any> | { [k: string]: any }): any /* boolean */
    {}
    _insertBeforeOrAppend(_before: any, _record: any): any /*  */
    {}
    _getOrCreateRecordForKey(_key: any, _value: any): any /*  */
    {}
    _maybeAddToChanges(_record: any, _newValue: any): any /*  */
    {}
    _addToAdditions(_record: any): any /*  */
    {}
    _addToChanges(_record: any): any /*  */
    {}
}
