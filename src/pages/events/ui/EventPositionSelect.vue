<template>
  <v-select
    v-bind="$attrs"
    v-model="position"
    item-title="name"
    return-object
    :items="eventsPositions"
    :rules="validationRules"
  />
</template>

<script setup lang="ts">
import { eventsLayoutPositions, eventsLayoutPositionsMap } from '@/pages/events/constants';
import type { SelectField } from '@/features/autoForm/model/types';
import type { Event } from '@/entities/event/model/Event';
import type { EventLayoutPosition, EventPosition } from '@/entities/event/model/types';
import { useEventStore } from '@/entities/event/store/useEventStore';
import { requiredRule } from '@/shared/utils/validationRules';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<
  // eslint-disable-next-line vue/no-reserved-props,vue/no-reserved-keys,vue/prop-name-casing
  SelectField & {
    item: Event;
  }
>();

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: EventPosition): void;
}>();

const eventStore = useEventStore();

const validationRules = computed(() => (eventsPositions.value.length ? [requiredRule] : []));

const eventsPositions = computed(() =>
  eventsLayoutPositions.filter(
    (item) =>
      !eventStore.items
        .reduce<string[]>((acc, curr) => {
          if (curr?.position) {
            acc.push(curr.position);
          }
          return acc;
        }, [])
        .includes(item.value),
  ),
);

const position = ref<EventLayoutPosition | null>(
  eventsLayoutPositionsMap.get(props.item?.position) ?? null,
);

watch(position, () => {
  if (position.value) {
    emit('update:modelValue', position.value.value);
  }
});
</script>
