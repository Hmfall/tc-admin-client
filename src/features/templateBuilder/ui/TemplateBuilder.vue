<template>
  <component
    :is="props.slots.render()"
    v-if="Object.keys(mappedSlots).length"
    v-bind="{ value }"
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
        {{ props.value[templateMappedSlot(props.slots)[slot.slot]?.key as keyof T] }}
      </component>

      <template v-else>
        {{ props.value[templateMappedSlot(props.slots)[slot.slot]?.key as keyof T] }}
      </template>
    </template>
  </component>
</template>

<script setup lang="ts" generic="T">
import type {
  TemplateBuilderSlots,
  TemplateSlotAttrs,
} from '@/features/templateBuilder/model/types';
import { templateMappedSlot } from '@/features/templateBuilder/utils';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';

const props = defineProps<{
  value: T;
  slots: TemplateBuilderSlots<T>;
}>();

const mappedSlots = computed(() => templateMappedSlot(props.slots));

const bindProps = (slotProp?: TemplateSlotAttrs<T>) =>
  Object.entries(slotProp ?? {}).reduce<Record<string, any>>((acc, [slot, key]) => {
    if (typeof key === 'object' && key.bindKey) {
      const value = props.value?.[key.bindKey];

      if (value) {
        acc[slot] = (value instanceof ObjectUrl ? value.objectUrl ?? value.url : value) ?? key;
      }
    } else {
      acc[slot] = key;
    }
    return acc;
  }, {});
</script>
