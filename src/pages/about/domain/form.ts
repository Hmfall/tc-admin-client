import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import type { About } from '@/entities/about/About';
import EditedTextField from '@/shared/components/editedTextField/EditedTextField.vue';
import { maxLengthRule, minLengthRule, requiredRule } from '@/shared/utils/validationRules';

export const aboutFormFields: AutoFormFields<About> = [
  {
    key: 'name',
    type: FieldType.editedTextField,
    render: () => EditedTextField,
    props: {
      label: 'Название',
      rules: [requiredRule, minLengthRule, maxLengthRule],
    },
  },
  {
    key: 'description',
    type: FieldType.editedTextField,
    render: () => EditedTextField,
    props: {
      label: 'Описание',
      rows: 12,
      rules: [requiredRule],
    },
  },
];
