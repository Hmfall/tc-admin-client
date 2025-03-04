import { AppRoutes } from '@/app/providers/router/appRoutes';
import { socialsFormFields } from '@/pages/socials/domain/form';
import { socialsTemplateSlots } from '@/pages/socials/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Social } from '@/entities/social/Social';
import { useSocialStore } from '@/entities/social/useSocialStore';

export const socialModuleConfig: BaseModuleConfig<Social> = {
  routeName: AppRoutes.Social,
  name: 'Социальные сети',
  model: Social,
  store: useSocialStore,
  formFields: socialsFormFields,
  templateSlots: socialsTemplateSlots,
};
