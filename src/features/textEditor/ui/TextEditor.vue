<template>
  <div class="d-flex">
    <v-btn
      v-for="(item, i) in actions"
      :key="item.type"
      variant="outlined"
      density="comfortable"
      rounded="0"
      icon
      :class="{
        'btn-start': i === 0,
        'btn-end': i === actions.length - 1,
        'border-right-0': i !== actions.length - 1,
      }"
    >
      <v-icon
        v-if="item.icon"
        :icon="item.icon.icon"
        :size="item.icon.size"
      />

      <template v-else>
        <span :style="item.style">
          {{ item.text }}
        </span>
      </template>
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { EditorAction } from '@/features/textEditor/model/types';

const actions: EditorAction[] = [
  {
    type: 'semiBold',
    text: 'B',
    style: {
      fontSize: '16px',
      lineHeight: 0,
      fontWeight: '600',
    },
  },
  {
    type: 'bold',
    text: 'B',
    style: {
      fontSize: '16px',
      lineHeight: 0,
      fontWeight: '800',
    },
  },
  {
    type: 'italic',
    icon: {
      icon: '$mdiFormatItalic',
      size: 20,
    },
  },
  {
    type: 'link',
    icon: {
      icon: '$mdiLinkVariant',
      size: 20,
    },
  },
];
</script>

<style scoped lang="scss">
.v-btn {
  width: 50px !important;
  height: 36px !important;
}

.btn {
  &-start {
    border-radius: 4px 0 0 4px !important;
  }

  &-end {
    border-radius: 0 4px 4px 0 !important;
  }
}

.border-right-0 {
  border-right: 0;
}
</style>
