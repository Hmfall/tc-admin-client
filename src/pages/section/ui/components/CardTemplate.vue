<template>
  <v-card :min-height="200">
    <div class="d-flex flex-column flex-md-row ga-6">
      <div class="d-flex flex-column ga-2">
        <v-sheet
          v-if="$slots.previewImage"
          :width="$vuetify.display.lgAndUp ? 200 : 160"
          height="70"
        >
          <v-avatar
            size="100%"
            rounded="0"
            color="secondary"
          >
            <slot name="previewImage" />
          </v-avatar>
        </v-sheet>

        <v-avatar
          v-if="$slots.image"
          :size="$vuetify.display.lgAndUp ? 200 : 160"
          rounded="0"
          color="secondary"
        >
          <slot name="image" />
        </v-avatar>
      </div>

      <div class="d-flex flex-1-1-100 flex-column flex-md-row ga-0 ga-md-2">
        <div class="w-100">
          <div
            v-if="$slots.title"
            class="text-h6 mb-2"
          >
            <slot name="title" />
          </div>

          <div
            v-if="$slots.subtitle"
            :class="['mb-4', $slots.text ? 'subtitle' : 'subtitle--expanded']"
          >
            <slot name="subtitle" />
          </div>

          <div
            v-if="$slots.text"
            class="text mb-4"
          >
            <slot name="text" />
          </div>

          <div
            v-if="$slots.link"
            class="link text-decoration-underline"
          >
            <slot name="link" />
          </div>
        </div>

        <slot />

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
            icon="$mdiDeleteOutline"
            variant="text"
            density="default"
            color="secondary"
            @click="emit('delete')"
          />

          <v-btn
            v-if="value.ID"
            icon="$mdiArrowULeftBottom"
            variant="text"
            density="default"
            color="secondary"
            :disabled="!value.hasDiff"
            @click="emit('reset')"
          />
        </div>
      </div>
    </div>
  </v-card>
</template>

<script setup lang="ts" generic="T extends Model">
import type { Model } from '@/shared/lib/storeFactory';
import type { ModelTemplateEmit } from '@/widgets/templateBuilder/types';

const emit = defineEmits<ModelTemplateEmit>();

defineProps<{
  value: T;
}>();
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/main';

.subtitle {
  @include wordWrap;
  line-clamp: 2;
  -webkit-line-clamp: 2;

  &--expanded {
    @include wordWrap;
    line-clamp: 5;
    -webkit-line-clamp: 5;
  }
}

.text {
  @include wordWrap;
  line-clamp: 6;
  -webkit-line-clamp: 6;
}

.link {
  @include wordWrap;
  line-clamp: 1;
  -webkit-line-clamp: 1;
}
</style>
