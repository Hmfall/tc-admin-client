<template>
  <v-list-item>
    <template #title>
      <slot name="title" />
    </template>

    <template #subtitle>
      <slot name="subtitle" />
    </template>

    <template #append>
      <v-menu location="right">
        <template #activator="{ props }">
          <v-btn
            variant="text"
            icon="$mdiDotsVertical"
            v-bind="props"
          />
        </template>

        <v-list>
          <v-list-item @click="emit('update')">Редактировать</v-list-item>
          <v-list-item @click="emit('delete')">Удалить</v-list-item>
        </v-list>
      </v-menu>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import type { ModelTemplateEmit } from '@/widgets/templateBuilder/types';

const emit = defineEmits<ModelTemplateEmit>();
</script>
