<template>
  <v-container
    class="px-8"
    fluid
  >
    <div class="d-flex flex-column ga-10">
      <div class="d-flex align-center text-h6">
        <v-btn
          v-if="$vuetify.display.mdAndDown"
          variant="text"
          icon="$mdiMenu"
          @click="updateDrawerExpanded(true)"
        />

        <div class="w-100 text-center">
          <slot name="header" />
        </div>
      </div>

      <div>
        <slot />
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const { updateDrawerExpanded } = inject('drawerExpanded') as {
  updateDrawerExpanded: (value: boolean) => void;
};
</script>
