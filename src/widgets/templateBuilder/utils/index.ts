import type { CommonTemplateBuilder, TemplateBuilderMappedSlot } from '@/widgets/templateBuilder/types';

export const templateMappedSlot = <T>(
  builder: CommonTemplateBuilder<T>,
): TemplateBuilderMappedSlot<T> => {
  return (
    builder.slots.reduce((acc, curr) => {
      if (curr.slot) {
        acc[curr.slot] = curr;
      }
      return acc;
    }, {} as TemplateBuilderMappedSlot<T>) ?? {}
  );
};