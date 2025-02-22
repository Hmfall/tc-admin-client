import type {
    TemplateBuilderMappedSlot,
    TemplateBuilderSlots,
} from '@/shared/components/templateBuilder/model/types';

export const templateMappedSlot = <T>(
    builder: TemplateBuilderSlots<T>,
): TemplateBuilderMappedSlot<T> => {
    return (
        builder?.slots.reduce((acc, curr) => {
            if (curr.slot) {
                acc[curr.slot] = curr;
            }
            return acc;
        }, {} as TemplateBuilderMappedSlot<T>) ?? {}
    );
};
