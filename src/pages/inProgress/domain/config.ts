import { AppRoutes } from '@/app/providers/router/appRoutes';
import { inProgressFormFields } from '@/pages/inProgress/domain/form';
import { inProgressTemplateSlots } from '@/pages/inProgress/domain/template';
import type { BaseModuleConfig } from '@/features/baseModule/model/types';
import { InProgress } from '@/entities/inProgress/InProgress';
import { useInProgressStore } from '@/entities/inProgress/useInProgressStore';

export const inProgressModuleConfig: BaseModuleConfig<InProgress> = {
  routeName: AppRoutes.InProgress,
  name: 'В разработке',
  model: InProgress,
  store: useInProgressStore,
  formFields: inProgressFormFields,
  templateSlots: inProgressTemplateSlots,
  immediateSubmit: true,
  rawName: true,
};
