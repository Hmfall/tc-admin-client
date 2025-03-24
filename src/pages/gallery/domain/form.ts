import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import FileInputComponent from '@/features/autoForm/ui/components/FileInputComponent.vue';
import type { Gallery } from '@/entities/gallery/Gallery';
import EditedTextField from '@/shared/components/editedTextField/EditedTextField.vue';
import TextField from '@/shared/ui/textField/TextField.vue';
import { minLengthRule, requiredObjectUrlRule, requiredRule } from '@/shared/utils/validationRules';

export const galleryFormFields: AutoFormFields<Gallery> = [
  [
    {
      span: { md: 3 },
      items: [
        {
          key: 'logo',
          type: FieldType.fileInput,
          render: () => FileInputComponent,
          span: { sm: 6, md: 12 },
          props: {
            label: 'Логотип',
            rules: [requiredObjectUrlRule],
            accept: ['image/png, image/jpeg'],
          },
        },
        {
          key: 'background',
          type: FieldType.fileInput,
          render: () => FileInputComponent,
          span: { sm: 6, md: 12 },
          props: {
            label: 'Фоновое изображение',
            rules: [requiredObjectUrlRule],
            accept: ['image/png, image/jpeg'],
          },
        },
      ],
    },
    {
      span: { md: 9 },
      items: [
        {
          key: 'name',
          type: FieldType.editedTextField,
          render: () => EditedTextField,
          props: {
            label: 'Название',
            rules: [requiredRule, minLengthRule],
          },
        },
        {
          key: 'description',
          type: FieldType.editedTextField,
          render: () => EditedTextField,
          props: {
            label: 'Описание',
            rows: 3,
            rules: [requiredRule],
          },
        },
        {
          key: 'url',
          type: FieldType.textField,
          render: () => TextField,
          props: {
            label: 'Ссылка на внешний ресурс',
            rules: [requiredRule],
          },
        },
      ],
    },
    {
      justify: 'end',
    },
  ],
];
