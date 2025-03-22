import { VSkeletonLoader } from 'vuetify/components';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import { CardTemplateSlot } from '@/features/autoTemplate/ui/templates/common/card/model/types';
import CardTemplate from '@/features/autoTemplate/ui/templates/common/card/ui/CardTemplate.vue';
import type { About } from '@/entities/about/About';

export const aboutTemplateSlots: AutoTemplateSlots<About> = {
  render: () => CardTemplate,
  skeletonRender: () =>
    h(VSkeletonLoader, {
      type: 'list-item-three-line',
    }),
  slots: [
    {
      key: 'name',
      slot: CardTemplateSlot.Title,
    },
    {
      key: 'description',
      slot: CardTemplateSlot.Subtitle,
    },
  ],
};
