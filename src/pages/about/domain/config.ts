import { AppRoutes } from '@/app/providers/router/appRoutes';
import { aboutFormFields } from '@/pages/about/domain/form';
import { aboutTemplateSlots } from '@/pages/about/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { About } from '@/entities/about/About';
import { useAboutStore } from '@/entities/about/useAboutStore';

export const aboutModuleConfig: BaseModuleConfig<About> = {
  routeName: AppRoutes.About,
  name: 'Об объединении',
  model: About,
  store: useAboutStore,
  formFields: aboutFormFields,
  templateSlots: aboutTemplateSlots,
};
