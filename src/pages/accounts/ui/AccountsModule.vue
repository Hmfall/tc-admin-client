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
        :model="User"
        :store="userStore"
        :template-slots="userTemplateSlots"
        :form-fields="userFormFields"
        :delete-all-confirm="() => confirm('Удалить всех пользователей?', 'Удалить')"
      />
    </v-sheet>
  </ModuleLayout>
</template>

<script setup lang="ts">
import ModuleLayout from '@/app/layouts/moduleLayout/ui/ModuleLayout.vue';
import { userFormFields } from '@/pages/accounts/domain/form';
import { userTemplateSlots } from '@/pages/accounts/domain/template';
import BaseModule from '@/features/baseModule/ui/BaseModule.vue';
import { User } from '@/entities/user/User';
import { userStore } from '@/entities/user/userStore';
import { useConfirmDialog } from '@/shared/components/confirmDialog/model/useConfirmDialog';

const confirm = useConfirmDialog();

userStore.load();

// TODO: eslit no-undef for global types.d.ts
// eslint-disable-next-line no-undef
const moduleRef = ref<ComponentInstance<typeof BaseModule>>();
const isDialog = ref(false);

const onOpenDialogBtn = () => {
  isDialog.value = true;
};

const onDeleteAllBtn = async () => {
  moduleRef.value?.deleteAll();
};
</script>
