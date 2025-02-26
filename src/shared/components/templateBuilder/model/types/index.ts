export type TemplateSlotAttrs<T> = Record<string, string | number | Record<'bindKey', keyof T>>;

export interface TemplateBuilderSlot<T> {
  key?: keyof T;
  slot: string;
  render?: () => Component | VNode | string;
  attrs?: TemplateSlotAttrs<T>;
}

export type TemplateBuilderSlots<T> = {
  render: () => Component;
  skeletonRender?: () => Component;
  slots: TemplateBuilderSlot<T>[];
};

export type TemplateBuilderMappedSlot<T> = Record<string, TemplateBuilderSlot<T>>;

export interface ModelTemplateEmit {
  (e: 'update'): void;

  (e: 'delete'): void;

  (e: 'reset'): void;
}
