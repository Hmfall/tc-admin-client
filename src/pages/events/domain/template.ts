import { VImg } from 'vuetify/components';
import type { AutoTemplateSlots } from '@/features/autoTemplate/model/types';
import { CardTemplateSlot } from '@/features/autoTemplate/ui/templates/common/card/model/types';
import CardTemplate from '@/features/autoTemplate/ui/templates/common/card/ui/CardTemplate.vue';
import CardTemplateSkeleton from '@/features/autoTemplate/ui/templates/common/card/ui/CardTemplateSkeleton.vue';
import type { Event } from '@/entities/event/model/Event';

export const eventTemplateSlots: AutoTemplateSlots<Event> = {
  render: () => CardTemplate,
  skeletonRender: () =>
    h(CardTemplateSkeleton, {
      topImg: true,
    }),
  slots: [
    {
      key: 'name',
      slot: CardTemplateSlot.Title,
    },
    {
      key: 'shortDescription',
      slot: CardTemplateSlot.Subtitle,
    },
    {
      key: 'longDescription',
      slot: CardTemplateSlot.Text,
    },
    {
      slot: CardTemplateSlot.TopImg,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'logo',
        },
      },
    },
    {
      slot: CardTemplateSlot.BottomImg,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'img',
        },
      },
    },
  ],
};
