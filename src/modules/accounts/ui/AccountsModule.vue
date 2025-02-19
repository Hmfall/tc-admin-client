<template>
  <ModuleLayout>
    <template #header>Управление аккаунтами администраторов</template>

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
              <v-list-item @click="onDeleteBtn">Очистить всех</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>

      <BaseModule
        v-model:dialog="isDialog"
        class="d-flex flex-column ga-3"
        dialog-width="800"
        immediate-submit
        loading-on-delete
        hide-actions
        :model="User"
        :store="userStore"
        :template-slots="userTemplateSlots"
        :form-fields="userFormFields"
      />
    </v-sheet>
  </ModuleLayout>
</template>

<script setup lang="ts">
import { userFormFields } from '@/modules/accounts/domain/form';
import { userTemplateSlots } from '@/modules/accounts/domain/template';
import BaseModule from '@/widgets/baseModule/ui/BaseModule.vue';
import { User } from '@/entities/user/User';
import { useUserStore } from '@/entities/user/userStore';
import ModuleLayout from '@/shared/ui/layouts/ModuleLayout.vue';

const userStore = useUserStore();

userStore.fetch();

const isDialog = ref(false);

const onOpenDialogBtn = () => {
  isDialog.value = true;
};

const onDeleteBtn = () => {};
</script>
