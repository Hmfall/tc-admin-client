import { VImg, VTextarea, VTextField } from 'vuetify/components';
import type { Contact } from '@/entities/contact/model/Contact';
import { Input } from '@/widgets/formBuilder/domain';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import { CardTemplateSlot } from '@/widgets/templateBuilder/domain/templates';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';
import CardTemplate from '@/widgets/templateBuilder/ui/templates/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/widgets/templateBuilder/ui/templates/card/CardTemplateSkeleton.vue';

export const contactsFormBuilder: FormBuilderFields<Contact> = [
  [
    {
      span: 3,
      items: [
        {
          key: 'logo',
          type: Input.fileInput,
          render: () => FileInputComponent,
          props: {
            label: 'Логотип',
          },
        },
      ],
    },
    {
      span: 9,
      items: [
        {
          key: 'name',
          type: Input.textField,
          render: () => VTextField,
          props: {
            label: 'Название',
            hideDetails: true,
          },
        },
        {
          key: 'description',
          type: Input.textarea,
          render: () => VTextarea,
          props: {
            label: 'Описание',
            rows: 4,
            hideDetails: true,
          },
        },
        {
          key: 'link',
          type: Input.textField,
          render: () => VTextField,
          props: {
            label: 'Ссылка на внешний ресурс',
          },
        },
      ],
    },
    {
      justify: 'end',
    },
  ],
];

export const eventsTemplateBuilder: CommonTemplateBuilder<Contact> = {
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
