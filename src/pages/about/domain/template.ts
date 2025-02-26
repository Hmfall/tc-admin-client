import { VImg } from 'vuetify/components';
import type { TemplateBuilderSlots } from '@/features/templateBuilder/model/types';
import { CardTemplateSlot } from '@/features/templateBuilder/model/types/templates';
import CardTemplate from '@/features/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/features/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';
import type { About } from '@/entities/about/About';

export const aboutTemplateSlots: TemplateBuilderSlots<About> = {
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
