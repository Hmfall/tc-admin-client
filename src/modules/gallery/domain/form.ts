import { VTextarea, VTextField } from 'vuetify/components';
import type { Gallery } from '@/entities/gallery/Gallery';
import type { FormBuilderFields } from '@/shared/components/formBuilder/model/types';
import { FieldType } from '@/shared/components/formBuilder/model/types';
import FileInputComponent from '@/shared/components/formBuilder/ui/components/FileInputComponent.vue';

export const galleryFormFields: FormBuilderFields<Gallery> = [
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
