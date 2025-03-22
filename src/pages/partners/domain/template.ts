import { VImg } from 'vuetify/components';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import { CardTemplateSlot } from '@/features/autoTemplate/ui/templates/common/card/model/types';
import CardTemplate from '@/features/autoTemplate/ui/templates/common/card/ui/CardTemplate.vue';
import CardTemplateSkeleton from '@/features/autoTemplate/ui/templates/common/card/ui/CardTemplateSkeleton.vue';
import type { Partner } from '@/entities/partner/Partner';

export const partnerTemplateSlots: AutoTemplateSlots<Partner> = {
  render: () => CardTemplate,
  skeletonRender: () => CardTemplateSkeleton,
  slots: [
    {
      key: 'name',
      slot: CardTemplateSlot.Title,
    },
    {
      key: 'description',
      slot: CardTemplateSlot.Subtitle,
    },
    {
      key: 'url',
      slot: CardTemplateSlot.Url,
      render: () => h('a'),
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: {
          bindKey: 'url',
        },
      },
    },
    {
      slot: CardTemplateSlot.Img,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'logo',
        },
      },
    },
  ],
};
