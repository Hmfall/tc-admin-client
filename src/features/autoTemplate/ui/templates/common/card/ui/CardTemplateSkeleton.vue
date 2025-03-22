<template>
  <div class="d-flex flex-column flex-md-row ga-2">
    <div class="d-flex flex-column justify-center ga-3">
      <v-skeleton-loader
        v-if="topImg"
        class="flex-0-0"
        width="200"
        height="70"
        type="image"
      />

      <v-skeleton-loader
        class="flex-0-0"
        width="200"
        height="200"
        type="image"
      />
    </div>

    <v-skeleton-loader
      class="flex-1-1 align-start"
      type="subtitle, list-item-three-line, list-item-two-line"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  topImg?: boolean;
}>();
</script>

<style scoped lang="scss">
:deep(.v-skeleton-loader__image) {
  height: 100%;
}
</style>
