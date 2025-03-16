import { VTextarea, VTextField } from 'vuetify/components';
import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import FileInputComponent from '@/features/autoForm/ui/components/FileInputComponent.vue';
import type { Gallery } from '@/entities/gallery/Gallery';

export const galleryFormFields: AutoFormFields<Gallery> = [
  [
    {
      span: 3,
      items: [
        {
          key: 'logo',
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
          },
        },
        {
          key: 'description',
          type: FieldType.textarea,
          render: () => VTextarea,
          props: {
            label: 'Описание',
            rows: 4,
          },
        },
        {
          key: 'link',
          type: FieldType.textField,
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
