<template>
  <v-card :min-height="200">
    <div class="d-flex ga-6 pa-1">
      <div class="d-flex flex-column ga-2">
        <v-sheet
          v-if="$slots.previewImage"
          width="200"
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
          size="200"
          rounded="0"
          color="secondary"
        >
          <slot name="image" />
        </v-avatar>
      </div>

      <div class="d-flex flex-1-1-100 flex-column">
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

      <v-btn
        icon="$mdiSquareEditOutline"
        variant="text"
        density="default"
        color="secondary"
        @click="emit('onEdit')"
      />
    </div>
  </v-card>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'onEdit'): void;
}>();
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/main';

.subtitle {
  @include wordWrap;
  -webkit-line-clamp: 2;

  &--expanded {
    @include wordWrap;
    -webkit-line-clamp: 5;
  }
}

.text {
  @include wordWrap;
  -webkit-line-clamp: 6;
}

.link {
  @include wordWrap;
  -webkit-line-clamp: 1;
}
</style>
