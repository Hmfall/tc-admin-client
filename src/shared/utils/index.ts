import type { _ActionsTree, _GettersTree, StateTree, Store } from 'pinia';

export const isPiniaStore = <
  ID extends string,
  S extends StateTree,
  G extends _GettersTree<S>,
  A extends _ActionsTree,
>(
  value: any,
): value is Store<ID, S, G, A> => {
  return (
    value && typeof value === 'object' && '$id' in value && '$state' in value && '$dispose' in value
  );
};
