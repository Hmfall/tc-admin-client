<template>
  <v-dialog
    :persistent="persistent"
    :model-value="modelValue"
    :width="dialogWidth ?? 'auto'"
    @after-leave="emit('afterLeave')"
    @update:model-value="updateModelValue"
  >
    <v-card class="text-body-2">
      <div
        v-if="closeIcon"
        class="d-flex justify-end px-2 pt-2"
      >
        <v-btn
          color="secondary"
          icon="$mdiWindowClose"
          variant="text"
          density="default"
          @click="updateModelValue(false)"
        />
      </div>

      <v-card-text :class="closeIcon ? 'pt-2' : 'pa-6'">
        <div>
          <slot />
        </div>

        <div
          v-if="actions"
          class="d-flex justify-end ga-4 mt-6"
        >
          <v-btn
            v-if="typeof confirmButton === 'string'"
            variant="flat"
            color="primary"
            :text="confirmButton"
            :disabled="disabled"
            @click="onConfirm"
          />

          <v-btn
            v-if="typeof cancelButton === 'string'"
            :text="cancelButton"
            @click="onCancel"
          />
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    actions?: boolean;
    dialogWidth?: string | number;
    confirmButton?: string | boolean;
    closeIcon?: boolean;
    cancelButton?: string | boolean;
    persistentOnConfirm?: boolean;
    disabled?: boolean;
    persistent?: boolean;
  }>(),
  {
    confirmButton: 'Oк',
    cancelButton: 'Отмена',
    closeIcon: true,
    persistent: true,
    dialogWidth: '1200px',
    actions: true,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
  (e: 'onConfirm'): void;
  (e: 'onCancel'): void;
  (e: 'afterLeave'): void;
}>();

const updateModelValue = (value: boolean) => emit('update:modelValue', value);

const onConfirm = () => {
  emit('onConfirm');

  if (!props.persistentOnConfirm) {
    updateModelValue(false);
  }
};

const onCancel = () => {
  emit('onCancel');
  updateModelValue(false);
};
</script>
