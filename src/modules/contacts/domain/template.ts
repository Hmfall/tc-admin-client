import { VImg } from 'vuetify/components';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/model/types';
import { CardTemplateSlot } from '@/widgets/templateBuilder/model/types/templates';
import CardTemplate from '@/widgets/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/widgets/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';
import type { Event } from '@/entities/event/Event';

export const eventsTemplateSlots: TemplateBuilderSlots<Event> = {
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
      key: 'details',
      slot: CardTemplateSlot.text,
    },
    {
      slot: CardTemplateSlot.previewImage,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'logo',
        },
      },
    },
    {
      slot: CardTemplateSlot.image,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'background',
        },
      },
    },
  ],
};
