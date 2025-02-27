import { userFormFields } from '@/pages/accounts/domain/form';
import { userTemplateSlots } from '@/pages/accounts/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { User } from '@/entities/user/User';
import { useUserStore } from '@/entities/user/useUserStore';

export const accountsModuleConfig: BaseModuleConfig<User> = {
  routeName: 'accounts',
  name: 'Управление аккаунтами администраторов',
  model: User,
  store: useUserStore,
  formFields: userFormFields,
  templateSlots: userTemplateSlots,
};
