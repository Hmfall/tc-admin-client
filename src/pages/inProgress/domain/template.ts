import { VSkeletonLoader } from 'vuetify/components';
import InProgressCardTemplate from '@/pages/inProgress/ui/InProgressCardTemplate.vue';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import type { InProgress } from '@/entities/inProgress/InProgress';

export const inProgressTemplateSlots: AutoTemplateSlots<InProgress> = {
  render: () => InProgressCardTemplate,
  skeletonRender: () =>
    h(VSkeletonLoader, {
      type: 'list-item-two-line',
    }),
  slots: [
    {
      key: 'description',
      slot: 'description',
    },
  ],
};
