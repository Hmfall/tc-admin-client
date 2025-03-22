import { AppRoutes } from '@/app/providers/router/appRoutes';
import { socialFormFields } from '@/pages/socials/domain/form';
import { socialTemplateSlots } from '@/pages/socials/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Social } from '@/entities/social/Social';
import { useSocialStore } from '@/entities/social/useSocialStore';

export const socialsModuleConfig: BaseModuleConfig<Social> = {
  routeName: AppRoutes.Social,
  name: 'Социальные сети',
  model: Social,
  store: useSocialStore,
  formFields: socialFormFields,
  templateSlots: socialTemplateSlots,
};
