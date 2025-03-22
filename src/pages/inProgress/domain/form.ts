import { VSwitch } from 'vuetify/components';
import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import type { InProgress } from '@/entities/inProgress/InProgress';
import EditedTextField from '@/shared/components/editedTextField/EditedTextField.vue';
import { requiredRule } from '@/shared/utils/validationRules';

export const inProgressFormFields: AutoFormFields<InProgress> = [
  {
    key: 'isAvailable',
    type: FieldType.switch,
    render: () => h(VSwitch),
    props: {
      label: 'В разработке',
      hideDetails: true,
      color: 'primary',
    },
  },
  {
    key: 'description',
    type: FieldType.editedTextField,
    render: () => EditedTextField,
    props: {
      label: 'Описание',
      rules: [requiredRule],
      rows: 3,
    },
  },
];
