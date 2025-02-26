export interface ModuleLayoutContext {
  updateDrawerExpanded: (value: boolean) => void;
}

export const injectKeyModuleLayoutContext: InjectionKey<ModuleLayoutContext> = Symbol();
