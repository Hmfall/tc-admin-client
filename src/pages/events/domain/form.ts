import { VTextarea, VTextField } from 'vuetify/components';
import type { FormBuilderFields } from '@/features/formBuilder/model/types';
import { FieldType } from '@/features/formBuilder/model/types';
import FileInputComponent from '@/features/formBuilder/ui/components/FileInputComponent.vue';
import type { Event } from '@/entities/event/Event';

export const eventsFormFields: FormBuilderFields<Event> = [
  [
    {
      span: 3,
      items: [
        {
          key: 'logo',
          type: FieldType.fileInput,
          render: () => FileInputComponent,
          props: {
            label: 'Логотип',
            accept: ['image/png, image/jpeg'],
          },
        },
        {
          key: 'background',
          type: FieldType.fileInput,
          render: () => FileInputComponent,
          props: {
            label: 'Фоновое изображение',
            accept: ['image/png, image/jpeg'],
          },
        },
      ],
    },
    {
      span: 9,
      items: [
        {
          key: 'name',
          type: FieldType.textField,
          render: () => VTextField,
          props: {
            label: 'Название',
            hideDetails: true,
          },
        },
        {
          key: 'description',
          type: FieldType.textarea,
          render: () => VTextarea,
          props: {
            label: 'Описание',
            rows: 4,
            hideDetails: true,
          },
        },
        {
          key: 'details',
          type: FieldType.textarea,
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
