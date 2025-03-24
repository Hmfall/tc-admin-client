import { AppRoutes } from '@/app/providers/router/appRoutes';
import { partnerFormFields } from '@/pages/partners/domain/form';
import { partnerTemplateSlots } from '@/pages/partners/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { Partner } from '@/entities/partner/Partner';
import { usePartnerStore } from '@/entities/partner/usePartnerStore';

export const partnersModuleConfig: BaseModuleConfig<Partner> = {
  routeName: AppRoutes.Partners,
  name: 'Партнёры/спонсоры',
  model: Partner,
  store: usePartnerStore,
  formFields: partnerFormFields,
  templateSlots: partnerTemplateSlots,
};
