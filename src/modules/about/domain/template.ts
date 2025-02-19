import { VImg } from 'vuetify/components';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/model/types';
import { CardTemplateSlot } from '@/widgets/templateBuilder/model/types/templates';
import CardTemplate from '@/widgets/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/widgets/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';
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
