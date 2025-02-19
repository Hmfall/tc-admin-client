import { aboutFormFields } from '@/modules/about/domain/form';
import { aboutTemplateSlots } from '@/modules/about/domain/template';
import type { BaseModuleConfig } from '@/widgets/baseModule/model/types';
import { About } from '@/entities/about/About';
import { aboutStore } from '@/entities/about/aboutStore';

export const aboutModuleConfig: BaseModuleConfig<About> = {
  routeName: 'about',
  name: 'Об объединении',
  model: About,
  store: aboutStore,
  formFields: aboutFormFields,
  templateSlots: aboutTemplateSlots,
  singleton: true,
};
