import type { _ActionsTree, _GettersTree, StateTree, StoreDefinition } from 'pinia';
import pinia from '@/app/providers/store';

export const storeAdapter = <
    ID extends string,
    S extends StateTree,
    G extends _GettersTree<S>,
    A extends _ActionsTree,
>(
    store: StoreDefinition<ID, S, G, A>,
) => store(pinia);
