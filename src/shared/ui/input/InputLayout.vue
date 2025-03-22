<template>
  <div class="input-field">
    <div class="input-field__container">
      <div class="input-field__header d-flex align-center">
        <div class="input-field__header-inner d-flex align-center">
          <label class="input-field__label font-weight-medium">
            {{ label }}
          </label>

          <slot name="header" />
        </div>
      </div>

      <div class="input-field__field">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
}>();
</script>

<style scoped lang="scss">
@import '@/shared/assets/styles/colors';

.input-field {
  width: 100%;

  &__header {
    height: 2rem;
  }

  &__label {
    font-size: 0.875rem;
  }

  &__field {
    position: relative;
    font-size: 1rem;
    min-height: 40px;
  }
}
</style>
