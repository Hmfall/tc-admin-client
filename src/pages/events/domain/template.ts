import { VImg } from 'vuetify/components';
import type { TemplateBuilderSlots } from '@/features/templateBuilder/model/types';
import { CardTemplateSlot } from '@/features/templateBuilder/model/types/templates';
import CardTemplate from '@/features/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/features/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';
import type { Contact } from '@/entities/contact/Contact';

export const contactsTemplateSlots: TemplateBuilderSlots<Contact> = {
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
