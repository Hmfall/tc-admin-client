import { VImg } from 'vuetify/components';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/model/types';
import { CardTemplateSlot } from '@/widgets/templateBuilder/model/types/templates';
import CardTemplate from '@/widgets/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/widgets/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';
import type { Social } from '@/entities/social/Social';

export const socialsTemplateSlots: TemplateBuilderSlots<Social> = {
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
      key: 'link',
      slot: CardTemplateSlot.link,
      render: () => h('a'),
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: {
          bindKey: 'link',
        },
      },
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
