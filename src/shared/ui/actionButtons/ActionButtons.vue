<template>
  <div
    :class="[
      'd-flex ga-4',
      {
        'justify-end': position === 'end',
        'justify-center': position === 'center',
        'justify-start': position === 'start',
        'flex-row-reverse': reversed,
      },
    ]"
  >
    <v-btn
      v-if="!primary && typeof secondaryButton === 'string'"
      :class="{ 'btn--locked': lockedSecondaryButton }"
      :loading="loadingSecondaryButton"
      @click="!lockedSecondaryButton ? emit('onSecondaryClick') : null"
    >
      {{ secondaryButton }}

      <v-tooltip
        v-if="secondaryButtonTooltip"
        activator="parent"
        open-delay="100"
        location="top"
        :text="secondaryButtonTooltip"
      />
    </v-btn>

    <v-btn
      v-if="!secondary && typeof primaryButton === 'string'"
      type="submit"
      variant="flat"
      color="primary"
      :class="{ 'btn--locked': lockedPrimaryButton }"
      :disabled="disabled"
      :loading="loadingPrimaryButton"
      @click="!lockedPrimaryButton ? emit('onPrimaryClick') : null"
    >
      {{ primaryButton }}

      <v-tooltip
        v-if="primaryButtonTooltip"
        activator="parent"
        open-delay="100"
        location="top"
        :text="primaryButtonTooltip"
      />
    </v-btn>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    primary?: boolean;
    secondary?: boolean;
    primaryButton?: string | boolean;
    primaryButtonTooltip?: string | null;
    secondaryButtonTooltip?: string | null;
    secondaryButton?: string | boolean;
    lockedPrimaryButton?: boolean;
    lockedSecondaryButton?: boolean;
    loadingPrimaryButton?: boolean;
    loadingSecondaryButton?: boolean;
    disabled?: boolean;
    position?: 'start' | 'center' | 'end';
    reversed?: boolean;
  }>(),
  {
    primaryButton: 'Ок',
    secondaryButton: 'Отмена',
    position: 'end',
  },
);

const emit = defineEmits<{
  (e: 'onPrimaryClick'): void;
  (e: 'onSecondaryClick'): void;
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
