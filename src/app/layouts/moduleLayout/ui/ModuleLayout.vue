<template>
  <v-container
    class="px-8 page-wrapper"
    fluid
  >
    <div class="h-100 d-flex flex-column ga-10">
      <div class="d-flex align-center text-h6">
        <v-btn
          v-if="$vuetify.display.mdAndDown"
          density="default"
          variant="text"
          icon="$mdiMenu"
          @click="moduleLayoutContext?.updateDrawerExpanded(true)"
        />

        <div class="w-100 text-center">
          <slot name="header" />
        </div>
      </div>

      <div class="h-100 d-flex">
        <slot />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { injectKeyModuleLayoutContext } from '@/app/layouts/moduleLayout/model/context';

const moduleLayoutContext = inject(injectKeyModuleLayoutContext);
</script>
