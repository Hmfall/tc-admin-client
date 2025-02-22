import { VImg } from 'vuetify/components';
import type { Partner } from '@/entities/partner/Partner';
import type { TemplateBuilderSlots } from '@/shared/components/templateBuilder/model/types';
import { CardTemplateSlot } from '@/shared/components/templateBuilder/model/types/templates';
import CardTemplate from '@/shared/components/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/shared/components/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';

export const partnersTemplateSlots: TemplateBuilderSlots<Partner> = {
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
