import type { BaseModuleConfig } from '@/features/baseModule/model/types';

export interface NavItem
  extends RequireKeys<Partial<BaseModuleConfig<any>>, 'name' | 'routeName'> {}
