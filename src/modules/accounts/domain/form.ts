import { VTextField } from 'vuetify/components';
import type { User } from '@/entities/user/User';
import type { FormBuilderFields } from '@/shared/components/formBuilder/model/types';
import { FieldType } from '@/shared/components/formBuilder/model/types';

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
