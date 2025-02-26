import { socialsFormFields } from '@/pages/socials/domain/form';
import { socialsTemplateSlots } from '@/pages/socials/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Social } from '@/entities/social/Social';
import { socialStore } from '@/entities/social/socialStore';

export const socialModuleConfig: BaseModuleConfig<Social> = {
  routeName: 'social',
  name: 'Социальные сети',
  model: Social,
  store: socialStore,
  formFields: socialsFormFields,
  templateSlots: socialsTemplateSlots,
};
