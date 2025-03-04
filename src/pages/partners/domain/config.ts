import { AppRoutes } from '@/app/providers/router/appRoutes';
import { partnersFormFields } from '@/pages/partners/domain/form';
import { partnersTemplateSlots } from '@/pages/partners/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Partner } from '@/entities/partner/Partner';
import { usePartnerStore } from '@/entities/partner/usePartnerStore';

export const partnersModuleConfig: BaseModuleConfig<Partner> = {
  routeName: AppRoutes.Partners,
  name: 'Патрнёры/спонсоры',
  model: Partner,
  store: usePartnerStore,
  formFields: partnersFormFields,
  templateSlots: partnersTemplateSlots,
};
