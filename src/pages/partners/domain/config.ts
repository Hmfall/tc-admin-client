import { partnersFormFields } from '@/pages/partners/domain/form';
import { partnersTemplateSlots } from '@/pages/partners/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Partner } from '@/entities/partner/Partner';
import { partnerStore } from '@/entities/partner/partnerStore';

export const partnersModuleConfig: BaseModuleConfig<Partner> = {
  routeName: 'partners',
  name: 'Патрнёры/спонсоры',
  model: Partner,
  store: partnerStore,
  formFields: partnersFormFields,
  templateSlots: partnersTemplateSlots,
};
