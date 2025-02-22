import { VImg } from 'vuetify/components';
import type { Event } from '@/entities/event/Event';
import type { TemplateBuilderSlots } from '@/shared/components/templateBuilder/model/types';
import { CardTemplateSlot } from '@/shared/components/templateBuilder/model/types/templates';
import CardTemplate from '@/shared/components/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/shared/components/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';

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
