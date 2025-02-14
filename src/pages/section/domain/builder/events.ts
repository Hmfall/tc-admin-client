import { VImg, VTextarea, VTextField } from 'vuetify/components';
import type { Event } from '@/entities/event/model/Event';
import { CardTemplateSlot } from '@/pages/section/types';
import CardTemplate from '@/pages/section/ui/components/CardTemplate.vue';
import CardTemplateSkeleton from '@/pages/section/ui/components/CardTemplateSkeleton.vue';
import { FormBuilderFields, Input } from '@/widgets/formBuilder/types';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/types';

export const eventsFormFields: FormBuilderFields<Event> = [
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
        {
          key: 'background',
          type: Input.fileInput,
          render: () => FileInputComponent,
          props: {
            label: 'Фоновое изображение',
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
          key: 'details',
          type: Input.textarea,
          render: () => VTextarea,
          props: {
            rows: 15,
            label: 'Подробное описание',
            hideDetails: true,
          },
        },
      ],
    },
    {
      justify: 'end',
    },
  ],
];

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
