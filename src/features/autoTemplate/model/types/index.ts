export type TemplateSlotAttrs<T> = Record<string, string | number | Record<'bindKey', keyof T>>;

export interface AutoTemplateSlot<T> {
  key?: keyof T;
  slot: string;
  render?: () => Component | VNode;
  attrs?: TemplateSlotAttrs<T>;
}

export type AutoTemplateSlots<T> = {
  render: () => Component;
  skeletonRender?: () => Component | VNode;
  slots: AutoTemplateSlot<T>[];
};

export type AutoTemplateMappedSlot<T> = Record<string, AutoTemplateSlot<T>>;

export interface ModelTemplateEmit {
  (e: 'update'): void;

  (e: 'delete'): void;

  (e: 'reset'): void;
}
