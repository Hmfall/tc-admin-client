import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import FileInputComponent from '@/features/autoForm/ui/components/FileInputComponent.vue';
import type { About } from '@/entities/about/About';
import EditedTextField from '@/shared/components/editedTextField/EditedTextField.vue';
import { requiredRule } from '@/shared/utils/validationRules';

export const aboutFormFields: AutoFormFields<About> = [
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
      ],
    },
    {
      span: 9,
      items: [
        {
          key: 'name',
          type: FieldType.editedTextField,
          render: () => EditedTextField,
          props: {
            label: 'Название',
            rules: [requiredRule],
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
      ],
    },
    {
      justify: 'end',
    },
  ],
];
