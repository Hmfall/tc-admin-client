<template>
  <ModuleLayout>
    <template #header>{{ accountsModuleConfig.name }}</template>

    <v-sheet class="w-100">
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

              <v-list-item
                :disabled="deleteAllBtnDisabled"
                @click="onDeleteAllBtn"
              >
                Удалить всех
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>

      <BaseModule
        ref="baseModuleRef"
        v-model:dialog="isDialogVisible"
        class="d-flex flex-column ga-3"
        dialog-width="800"
        immediate-submit
        hide-actions
        :module-name="accountsModuleConfig.name"
        :model="accountsModuleConfig.model"
        :store="accountsModuleConfig.store"
        :template-slots="accountsModuleConfig.templateSlots"
        :form-fields="accountsModuleConfig.formFields"
        :delete-all-confirm="deleteAllConfirm"
        :loading-on="['delete']"
        @delete="onDeleteUser"
      >
      </BaseModule>
    </v-sheet>
  </ModuleLayout>
</template>

<script setup lang="ts">
import ModuleLayout from '@/app/layouts/moduleLayout/ui/ModuleLayout.vue';
import { accountsModuleConfig } from '@/pages/accounts/domain/config';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import BaseModule from '@/features/baseModule/ui/BaseModule.vue';
import type { User } from '@/entities/user/User';
import { useUserStore } from '@/entities/user/useUserStore';
import type { ConfirmOptions } from '@/shared/components/confirmDialog/model/types';

const authStore = useAuthStore();
const userStore = useUserStore();

userStore.load();

const isDialogVisible = ref(false);

const baseModuleRef = ref<ComponentInstance<typeof BaseModule> | null>(null);

const deleteAllBtnDisabled = computed(
  () => !userStore.items.filter((item) => !item.isNotDeletedUser).length,
);

const onOpenDialogBtn = () => {
  isDialogVisible.value = true;
};

const onDeleteAllBtn = () => {
  baseModuleRef.value?.deleteAll();
};

const onDeleteUser = async (user: User) => {
  if (authStore.jwtPayload?.sub === user.login) {
    await authStore.logout();
  }
};

const deleteAllConfirm: ConfirmOptions = {
  message: 'Удалить всех пользователей?',
  confirmBtn: 'Удалить',
  icon: 'info',
};
</script>
