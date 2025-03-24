import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import FileInputComponent from '@/features/autoForm/ui/components/FileInputComponent.vue';
import type { Partner } from '@/entities/partner/Partner';
import EditedTextField from '@/shared/components/editedTextField/EditedTextField.vue';
import TextField from '@/shared/ui/textField/TextField.vue';
import { minLengthRule, requiredObjectUrlRule, requiredRule } from '@/shared/utils/validationRules';

export const partnerFormFields: AutoFormFields<Partner> = [
  [
    {
      span: { md: 3 },
      items: [
        {
          key: 'logo',
          type: FieldType.fileInput,
          render: () => FileInputComponent,
          props: {
            label: 'Логотип',
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
