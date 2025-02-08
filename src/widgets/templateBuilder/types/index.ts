import type { Component } from 'vue';
import type { CardTemplateSlot } from '@/widgets/templateBuilder/domain';

export type FieldSlot = CardTemplateSlot;

export interface TemplateSlotBuilder<T> {
  key?: keyof T;
  slot: FieldSlot;
  render?: () => Component | VNode | string;
  attrs?: TemplateSlotAttrs<T>;
}

export type TemplateSlotAttrs<T> = Record<string, string | number | Record<'bindKey', keyof T>>;

export type CommonTemplateBuilder<T> = {
  component: () => Component;
  slots: TemplateSlotBuilder<T>[];
};

export type TemplateBuilderMappedSlot<T> = Record<FieldSlot, TemplateSlotBuilder<T>>;
