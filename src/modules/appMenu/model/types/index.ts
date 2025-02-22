import type { BaseModuleConfig2 } from '@/modules/baseModule/model/types';

export interface NavItem extends RequireKeys<Partial<BaseModuleConfig2>, 'name' | 'routeName'> {}
