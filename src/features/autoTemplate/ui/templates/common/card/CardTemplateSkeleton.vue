<template>
  <div class="d-flex flex-column flex-md-row ga-2">
    <v-skeleton-loader
      class="flex-0-0"
      width="200"
      height="200"
      type="image"
    />

    <v-skeleton-loader
      class="flex-1-1 align-start"
      type="subtitle, list-item-three-line, list-item-two-line"
    />
  </div>
</template>

<style scoped lang="scss">
:deep(.v-skeleton-loader__image) {
  height: 100%;
}
</style>
