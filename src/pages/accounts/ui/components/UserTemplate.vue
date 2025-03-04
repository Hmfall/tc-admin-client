<template>
  <v-list-item>
    <template #title>
      <span :class="{ 'font-weight-medium': value.isAdmin }">
        <slot name="title" />
      </span>
    </template>

    <template #subtitle>
      <span :class="{ 'font-weight-medium': value.isAdmin }">
        <slot name="subtitle" />
      </span>
    </template>

    <template #append>
      <v-menu location="right">
        <template #activator="{ props }">
          <v-btn
            density="comfortable"
            variant="text"
            icon="$mdiDotsVertical"
            v-bind="props"
          />
        </template>

        <v-list>
          <v-list-item @click="emit('update')">Редактировать</v-list-item>
          <v-list-item
            v-if="!value.isAdmin"
            @click="emit('delete')"
          >
            Удалить
          </v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>

<script setup lang="ts" generic="T extends User">
import type { ModelTemplateEmit } from '@/features/autoTemplate/model/types';
import type { User } from '@/entities/user/User';

defineProps<{
  value: T;
}>();

const emit = defineEmits<ModelTemplateEmit>();
</script>
