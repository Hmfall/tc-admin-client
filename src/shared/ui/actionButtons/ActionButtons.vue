<template>
  <div
    :class="[
      'd-flex ga-4',
      {
        'justify-end': position === 'end',
        'justify-center': position === 'center',
        'justify-start': position === 'start',
      },
    ]"
  >
    <v-btn
      v-if="!cancel && typeof confirmButton === 'string'"
      type="submit"
      variant="flat"
      color="primary"
      :class="{ 'btn--locked': lockedConfirmButton }"
      :disabled="disabled"
      :loading="loading"
      @click="!lockedConfirmButton ? emit('confirm') : null"
    >
      {{ confirmButton }}

      <slot name="confirmButtonTooltip" />
    </v-btn>

    <v-btn
      v-if="!confirm && typeof cancelButton === 'string'"
      @click="emit('cancel')"
    >
      {{ cancelButton }}

      <slot name="cancelButtonTooltip" />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    confirm?: boolean;
    cancel?: boolean;
    confirmButton?: string | boolean;
    cancelButton?: string | boolean;
    lockedConfirmButton?: boolean;
    disabled?: boolean;
    loading?: boolean;
    position?: 'start' | 'center' | 'end';
  }>(),
  {
    confirmButton: 'Ок',
    cancelButton: 'Отмена',
    position: 'end',
  },
);

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}>();
</script>

<style scoped lang="scss">
.btn--locked {
  &:hover {
    cursor: not-allowed !important;
    --v-theme-overlay-multiplier: 0;
  }
}
</style>
