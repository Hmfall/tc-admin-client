import { VTextField } from 'vuetify/components';
import type { FormBuilderFields } from '@/features/formBuilder/model/types';
import { FieldType } from '@/features/formBuilder/model/types';
import type { User } from '@/entities/user/User';

export const userFormFields: FormBuilderFields<User> = [
  {
    key: 'login',
    type: FieldType.textField,
    render: () => VTextField,
    props: {
      label: 'Логин',
    },
  },
  {
    key: 'email',
    type: FieldType.textField,
    render: () => VTextField,
    props: {
      label: 'Email',
    },
  },
];
