import { VImg, VTextarea, VTextField } from 'vuetify/components';
import type { Event } from '@/entities/event/model/Event';
import { Input } from '@/widgets/formBuilder/domain';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import { CardTemplateSlot } from '@/widgets/templateBuilder/domain';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';
import CardTemplate from '@/widgets/templateBuilder/ui/components/CardTemplate.vue';

export const eventsFormBuilder: FormBuilderFields<Event> = [
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

export const eventsTemplateBuilder: CommonTemplateBuilder<Event> = {
  component: () => CardTemplate,
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
