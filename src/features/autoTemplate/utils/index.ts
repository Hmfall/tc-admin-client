import type {
  AutoTemplateMappedSlot,
  AutoTemplateSlots,
} from '@/features/autoTemplate/model/types';

export const templateMappedSlot = <T>(
  template: AutoTemplateSlots<T>,
): AutoTemplateMappedSlot<T> => {
  return (
    template?.slots.reduce((acc, curr) => {
      if (curr.slot) {
        acc[curr.slot] = curr;
      }
      return acc;
    }, {} as AutoTemplateMappedSlot<T>) ?? {}
  );
};
