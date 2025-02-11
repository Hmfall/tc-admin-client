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
      v-if="typeof confirmButton === 'string'"
      type="submit"
      variant="flat"
      color="primary"
      :text="confirmButton"
      :disabled="disabled"
      :loading="loading"
      @click="emit('onConfirm')"
    />

    <v-btn
      v-if="typeof cancelButton === 'string'"
      :text="cancelButton"
      @click="emit('onCancel')"
    />
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    confirmButton?: string | boolean;
    cancelButton?: string | boolean;
    disabled?: boolean;
    loading?: boolean;
    position?: 'start' | 'center' | 'end';
  }>(),
  {
    confirmButton: 'Oк',
    cancelButton: 'Отмена',
    position: 'end',
  },
);

console.log(props)

const emit = defineEmits<{
  (e: 'onConfirm'): void;
  (e: 'onCancel'): void;
}>();
</script>
