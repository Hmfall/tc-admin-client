<template>
  <div class="h-100">
    <div class="d-flex flex-column ga-10">
      <div class="d-flex align-center text-h6">
        <v-btn
          v-if="$vuetify.display.lgAndDown"
          class="ml-n2"
          density="default"
          variant="text"
          icon="$mdiMenu"
          @click="moduleLayoutContext?.updateDrawerExpanded(true)"
        />

        <div class="w-100 text-center px-4">
          <slot name="header" />
        </div>
      </div>

      <div class="d-flex">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { injectKeyModuleLayoutContext } from '@/app/layouts/moduleLayout/model/context';

const moduleLayoutContext = inject(injectKeyModuleLayoutContext);
</script>
