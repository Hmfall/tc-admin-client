<template>
  <PageLayout>
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
              <v-list-item @click="onCreateDialog">Добавить</v-list-item>
              <v-list-item @click="onDeleteAll">Очистить всех</v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-list-item>

      <TemplateFormBuilder
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
  </PageLayout>
</template>

<script setup lang="ts">
import { User } from '@/entities/user/model/User';
import { userStore } from '@/entities/user/store/userStore';
import { userFormFields, userTemplateSlots } from '@/pages/accounts/domain/builder';
import PageLayout from '@/shared/ui/layouts/PageLayout.vue';
import TemplateFormBuilder from '@/widgets/templateFormBuilder/ui/TemplateFormBuilder.vue';

userStore.fetch();

const isDialog = ref(false);

const onCreateDialog = () => {
  isDialog.value = true;
};

const onDeleteAll = () => {};
</script>
