<template>
  <v-card
    class="overflow-visible bg-transparent"
    rounded="0"
  >
    <div class="d-flex flex-1-1-100">
      <div class="w-100 d-flex flex-column">
        <v-switch
          :model-value="value.isAvailable"
          color="primary"
          disabled
          hide-details
          :class="['mb-2', { selected: value.isAvailable }]"
        >
          <template #label>
            <span class="text-body-2">В разработке</span>
          </template>
        </v-switch>

        <slot name="description" />
      </div>

      <div class="d-flex flex-md-column ga-1">
        <v-btn
          class="mb-1"
          icon="$mdiSquareEditOutline"
          variant="text"
          density="default"
          color="secondary"
          @click="emit('update')"
        />

        <v-btn
          v-if="value.ID || value.$config.singleton"
          icon="$mdiArrowULeftBottom"
          variant="text"
          density="default"
          color="secondary"
          :disabled="!value.hasDiff"
          @click="emit('reset')"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import type { ModelTemplateEmit } from '@/features/autoTemplate/model/types';
import type { InProgress } from '@/entities/inProgress/InProgress';

defineProps<{
  value: InProgress;
}>();

const emit = defineEmits<ModelTemplateEmit>();
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/colors';

.selected {
  :deep(.v-switch__track) {
    background-color: $color-primary;
  }
}
</style>
