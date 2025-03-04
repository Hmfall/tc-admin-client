import { VTextField } from 'vuetify/components';
import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import type { User } from '@/entities/user/User';

export const userFormFields: AutoFormFields<User> = [
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
