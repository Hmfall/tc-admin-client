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
        <div
          class="render-slot"
          v-html="props.value[templateMappedSlot(props.slots)[slot.slot]?.key as keyof T]"
        />
      </component>

      <template v-else>
        <div
          class="render-slot"
          v-html="props.value[templateMappedSlot(props.slots)[slot.slot]?.key as keyof T]"
        />
      </template>
    </template>
  </component>
</template>

<script setup lang="ts" generic="T">
import type { AutoTemplateSlots, TemplateSlotAttrs } from '@/features/autoTemplate/model/types';
import { templateMappedSlot } from '@/features/autoTemplate/utils';
import { ObjectUrl } from '@/entities/objectURL/ObjectUrl';

const props = defineProps<{
  value: T;
  slots: AutoTemplateSlots<T>;
}>();

const mappedSlots = computed(() => templateMappedSlot(props.slots));

const bindProps = (slotProp?: TemplateSlotAttrs<T>) =>
  Object.entries(slotProp ?? {}).reduce<Record<string, any>>((acc, [slot, key]) => {
    if (typeof key === 'object' && key.bindKey) {
      const value = props.value?.[key.bindKey];
      acc[slot] = (value instanceof ObjectUrl ? value.objectUrl ?? value.url : value) ?? key;
    } else {
      acc[slot] = key;
    }
    return acc;
  }, {});
</script>
