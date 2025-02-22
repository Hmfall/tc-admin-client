import type { BaseModuleConfig } from '@/modules/baseModule/model/types';
import { socialsFormFields } from '@/modules/socials/domain/form';
import { socialsTemplateSlots } from '@/modules/socials/domain/template';
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
