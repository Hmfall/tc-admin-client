import { VImg } from 'vuetify/components';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import { CardTemplateSlot } from '@/features/autoTemplate/model/types/templates';
import CardTemplate from '@/features/autoTemplate/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/features/autoTemplate/ui/templates/common/card/CardTemplateSkeleton.vue';
import type { About } from '@/entities/about/About';

export const aboutTemplateSlots: AutoTemplateSlots<About> = {
  render: () => CardTemplate,
  skeletonRender: () => CardTemplateSkeleton,
  slots: [
    {
      key: 'name',
      slot: CardTemplateSlot.title,
    },
    {
      key: 'description',
      slot: CardTemplateSlot.subtitle,
    },
    {
      slot: CardTemplateSlot.image,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'logo',
        },
      },
    },
  ],
};
