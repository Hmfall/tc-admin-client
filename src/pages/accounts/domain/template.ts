import { VSkeletonLoader } from 'vuetify/components';
import { UserTemplateSlot } from '@/pages/accounts/model/types';
import UserTemplate from '@/pages/accounts/ui/components/UserTemplate.vue';
import type { TemplateBuilderSlots } from '@/features/templateBuilder/model/types';
import type { User } from '@/entities/user/User';

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
