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

            <v-card-text :class="closeIcon ? 'pt-2' : compact ? 'pa-5' : 'pa-6'">
                <div v-if="$slots.default">
                    <slot />
                </div>

                <template v-else>
                    {{ text }}
                </template>

                <ActionButtons
                    v-if="actions"
                    :confirm-button="confirmButton"
                    :cancel-button="cancelButton"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                />
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import ActionButtons from '@/shared/ui/actionButtons/ActionButtons.vue';

const props = withDefaults(
    defineProps<{
        modelValue?: boolean;
        actions?: boolean;
        dialogWidth?: string | number;
        confirmButton?: string | boolean;
        closeIcon?: boolean;
        cancelButton?: string | boolean;
        persistentOnConfirm?: boolean;
        disabled?: boolean;
        persistent?: boolean;
        text?: string;
        compact?: boolean;
    }>(),
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
