import { StaticProvider } from "../../di";

export class KeyValueDiffer {
    diff(_object: Map<K, V>): any /* KeyValueChanges<K, V> */
    {}
    diff(_object: { [key: string]: V }): any /* KeyValueChanges<string, V> */
    {}
}

export class KeyValueChanges {
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
}

export class KeyValueChangeRecord {
    key: K;
    currentValue: V | null;
    previousValue: V | null;
}

export class KeyValueDifferFactory {
    supports(_objects: any): any /* boolean */
    {}
    create(): any /* KeyValueDiffer<K, V> */
    {}
}

export class KeyValueDiffers {
    factories: KeyValueDifferFactory[];

    create(
        _factories: KeyValueDifferFactory[],
        _parent: KeyValueDiffers
    ): any /* KeyValueDiffers */
    {}
    extend(_factories: KeyValueDifferFactory[]): any /* StaticProvider */
    {}
    find(_kv: any): any /* KeyValueDifferFactory */
    {}
}
