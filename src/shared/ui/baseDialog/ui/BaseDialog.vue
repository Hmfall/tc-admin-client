<template>
  <v-dialog
    v-model="modelValue"
    :persistent="persistent"
    :width="dialogWidth ?? 'auto'"
    @after-leave="emit('afterLeave')"
  >
    <v-card>
      <div
        v-if="closeIcon"
        :class="`d-flex px-2 pt-2 ${$slots.header ? 'justify-space-between' : 'justify-end'}`"
      >
        <slot name="header" />

        <v-btn
          color="secondary"
          icon="$mdiWindowClose"
          variant="text"
          density="default"
          @click="closeDialog"
        />
      </div>

      <v-card-text :class="closeIcon ? 'pt-2' : compact ? 'pa-5' : 'pa-6'">
        <div :class="{ 'd-flex ga-1': icon }">
          <div v-if="icon">
            <v-icon
              class="mr-2 opacity-90"
              size="24"
              :icon="widgetIcons.get(icon)"
            />
          </div>

          <template v-if="$slots.default">
            <slot />
          </template>

          <template v-else>
            {{ text }}
          </template>
        </div>

        <ActionButtons
          v-if="actions"
          class="mt-5"
          :primary-button="confirmButton"
          :secondary-button="cancelButton"
          @on-primary-click="onConfirm"
          @on-secondary-click="onCancel"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { widgetIcons } from '@/shared/constants/widgetIcons';
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';
import type { BaseDialogProps } from '@/shared/ui/baseDialog/model/types';

const props = withDefaults(
  defineProps<
    BaseDialogProps & {
      modelValue?: boolean;
    }
  >(),
  {
    modelValue: false,
    confirmButton: undefined,
    cancelButton: undefined,
    closeIcon: true,
    persistent: true,
    dialogWidth: '1200px',
    actions: true,
  },
);

const emit = defineEmits<{
  (e: 'update:modelValue', modelValue: boolean): void;
  (e: 'onConfirm'): void;
  (e: 'onCancel'): void;
  (e: 'afterLeave'): void;
}>();

const modelValue = useVModel(props, 'modelValue', emit);

const closeDialog = () => {
  modelValue.value = false;
};

const onConfirm = () => {
  emit('onConfirm');

  if (!props.persistentOnConfirm) {
    closeDialog();
  }
};

const onCancel = () => {
  emit('onCancel');
  closeDialog();
};
</script>
