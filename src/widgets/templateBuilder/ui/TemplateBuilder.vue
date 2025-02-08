<template>
  <component
    :is="props.builder.component()"
    v-if="Object.keys(slots).length"
    @on-edit="emit('onEditItem', props.item)"
  >
    <template
      v-for="slot in slots"
      #[slot.slot]
      :key="slot.key"
    >
      <component
        :is="slot.render()"
        v-if="slot.render"
        v-bind="bindProps(slot.attrs)"
      >
        {{ props.item[templateMappedSlot(props.builder)[slot.slot]?.key as keyof T] }}
      </component>

      <template v-else>
        {{ props.item[templateMappedSlot(props.builder)[slot.slot]?.key as keyof T] }}
      </template>
    </template>
  </component>
</template>

<script setup lang="ts" , generic="T extends BaseModel">
import type { BaseModel } from '@/shared/lib/storeFactory';
import type { CommonTemplateBuilder, TemplateSlotAttrs } from '@/widgets/templateBuilder/types';
import { templateMappedSlot } from '@/widgets/templateBuilder/utils';

const props = defineProps<{
  item: T;
  builder: CommonTemplateBuilder<T>;
}>();

const emit = defineEmits<{
  (e: 'onEditItem', item: T): void;
}>();

const slots = computed(() => templateMappedSlot(props.builder));

const bindProps = (slotProp?: TemplateSlotAttrs<T>) =>
  Object.entries(slotProp ?? {}).reduce<Record<string, any>>((acc, [slot, key]) => {
    if (typeof key === 'object' && key.bindKey) {
      acc[slot] = props.item?.[key.bindKey] ?? key;
    } else {
      acc[slot] = key;
    }
    return acc;
  }, {});
</script>
