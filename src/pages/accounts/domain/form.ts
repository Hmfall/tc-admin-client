import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import type { User } from '@/entities/user/User';
import TextField from '@/shared/ui/textField/TextField.vue';
import { emailRules, minLengthRule, requiredRule } from '@/shared/utils/validationRules';

export const userFormFields: AutoFormFields<User> = [
  {
    key: 'login',
    type: FieldType.textField,
    render: () => TextField,
    props: {
      label: 'Логин',
      rules: [requiredRule, minLengthRule],
    },
  },
  {
    key: 'email',
    type: FieldType.textField,
    render: () => TextField,
    props: {
      label: 'Email',
      rules: emailRules,
    },
  },
  {
    key: 'password',
    type: FieldType.textField,
    render: () => TextField,
    props: {
      label: 'Пароль',
      rules: [requiredRule],
    },
  },
];
