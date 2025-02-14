<template>
  <component
    :is="props.slots.render()"
    v-if="Object.keys(mappedSlots).length"
  >
    <template
      v-for="slot in mappedSlots"
      #[slot.slot]
      :key="slot.key"
    >
      <component
        :is="slot.render()"
        v-if="slot.render"
        v-bind="bindProps(slot.attrs)"
      >
        {{ props.item[templateMappedSlot(props.slots)[slot.slot]?.key as keyof T] }}
      </component>

      <template v-else>
        {{ props.item[templateMappedSlot(props.slots)[slot.slot]?.key as keyof T] }}
      </template>
    </template>
  </component>
</template>

<script setup lang="ts" generic="T">
import { ObjectUrl } from '@/entities/objectURL/model/ObjectUrl';
import type { TemplateBuilderSlots, TemplateSlotAttrs } from '@/widgets/templateBuilder/types';
import { templateMappedSlot } from '@/widgets/templateBuilder/utils';

const props = defineProps<{
  item: T;
  slots: TemplateBuilderSlots<T>;
}>();

const mappedSlots = computed(() => templateMappedSlot(props.slots));

const bindProps = (slotProp?: TemplateSlotAttrs<T>) =>
  Object.entries(slotProp ?? {}).reduce<Record<string, any>>((acc, [slot, key]) => {
    if (typeof key === 'object' && key.bindKey) {
      const value = props.item?.[key.bindKey];

      if (value) {
        acc[slot] = (value instanceof ObjectUrl ? value.objectUrl ?? value.url : value) ?? key;
      }
    } else {
      acc[slot] = key;
    }
    return acc;
  }, {});
</script>
