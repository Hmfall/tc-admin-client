import { VImg } from 'vuetify/components';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import { CardTemplateSlot } from '@/features/autoTemplate/model/types/templates';
import CardTemplate from '@/features/autoTemplate/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/features/autoTemplate/ui/templates/common/card/CardTemplateSkeleton.vue';
import type { Partner } from '@/entities/partner/Partner';

export const partnersTemplateSlots: AutoTemplateSlots<Partner> = {
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
