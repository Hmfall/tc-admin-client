import type { Component } from 'vue';
import type { CardTemplateSlot } from '@/widgets/templateBuilder/domain/templates';

export type FieldSlot = CardTemplateSlot;

export interface TemplateBuilderField<T> {
  key?: keyof T;
  slot: FieldSlot;
  render?: FunctionExpression<Component | VNode | string>;
  attrs?: TemplateSlotAttrs<T>;
}

export type TemplateSlotAttrs<T> = Record<string, string | number | Record<'bindKey', keyof T>>;

export type CommonTemplateBuilder<T> = {
  render: FunctionExpression<Component>;
  skeletonRender?: FunctionExpression<Component>;
  slots: TemplateBuilderField<T>[];
};

export type TemplateBuilderMappedSlot<T> = Record<FieldSlot, TemplateBuilderField<T>>;
