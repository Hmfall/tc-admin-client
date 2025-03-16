<template>
  <ModuleLayout>
    <template #header>{{ accountsModuleConfig.name }}</template>

    <v-sheet max-width="480">
      <v-list-item class="mb-2">
        <span class="font-weight-medium">Список текущих администраторов</span>

        <template #append>
          <v-menu location="right">
            <template #activator="{ props }">
              <v-btn
                variant="text"
                density="comfortable"
                icon="$mdiDotsVertical"
                v-bind="props"
              />
            </template>

            <v-list>
              <v-list-item @click="onOpenDialogBtn">Добавить</v-list-item>
              <v-list-item @click="onDeleteAllBtn">Очистить всех</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>

      <BaseModule
        ref="moduleRef"
        v-model:dialog="isDialog"
        class="d-flex flex-column ga-3"
        dialog-width="800"
        immediate-submit
        loading-on-delete
        hide-actions
        :module-name="accountsModuleConfig.name"
        :model="accountsModuleConfig.model"
        :store="accountsModuleConfig.store"
        :template-slots="accountsModuleConfig.templateSlots"
        :form-fields="accountsModuleConfig.formFields"
        :delete-all-confirm="['Удалить всех пользователей?', 'Удалить']"
      >
      </BaseModule>
    </v-sheet>
  </ModuleLayout>
</template>

<script setup lang="ts">
import ModuleLayout from '@/app/layouts/moduleLayout/ui/ModuleLayout.vue';
import { accountsModuleConfig } from '@/pages/accounts/domain/config';
import BaseModule from '@/features/baseModule/ui/BaseModule.vue';
import { useUserStore } from '@/entities/user/useUserStore';

const userStore = useUserStore();

userStore.load();

const isDialog = ref(false);

const moduleRef = ref<ComponentInstance<typeof BaseModule> | null>(null);

const onOpenDialogBtn = () => {
  isDialog.value = true;
};

const onDeleteAllBtn = () => {
  moduleRef.value?.deleteAll();
};
</script>
