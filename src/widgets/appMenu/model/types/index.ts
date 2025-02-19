import type { BaseModuleConfig2 } from '@/widgets/baseModule/model/types';

export interface NavItem extends RequireKeys<Partial<BaseModuleConfig2>, 'name' | 'routeName'> {}
