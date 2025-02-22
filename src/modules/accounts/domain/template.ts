import { VSkeletonLoader } from 'vuetify/components';
import { UserTemplateSlot } from '@/modules/accounts/model/types';
import UserTemplate from '@/modules/accounts/ui/components/UserTemplate.vue';
import type { User } from '@/entities/user/User';
import type { TemplateBuilderSlots } from '@/shared/components/templateBuilder/model/types';

export const userTemplateSlots: TemplateBuilderSlots<User> = {
    render: () => UserTemplate,
    skeletonRender: () =>
        h(VSkeletonLoader, {
            type: 'list-item-two-line',
        }),
    slots: [
        {
            key: 'login',
            slot: UserTemplateSlot.title,
        },
        {
            key: 'email',
            slot: UserTemplateSlot.subtitle,
        },
    ],
};
