import { VSkeletonLoader, VTextField } from 'vuetify/components';
import type { User } from '@/entities/user/model/User';
import { UserTemplateSlot } from '@/pages/accounts/types';
import UserTemplate from '@/pages/accounts/ui/components/UserTemplate.vue';
import type { FormBuilderFields } from '@/widgets/formBuilder/types';
import { Input } from '@/widgets/formBuilder/types';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/types';

export const userFormFields: FormBuilderFields<User> = [
  {
    key: 'login',
    type: Input.textField,
    render: () => VTextField,
    props: {
      label: 'Логин',
    },
  },
  {
    key: 'email',
    type: Input.textField,
    render: () => VTextField,
    props: {
      label: 'Email',
    },
  },
];

export const userTemplateSlots: TemplateBuilderSlots<User> = {
  render: () => UserTemplate,
  skeletonRender: () =>
    h(VSkeletonLoader, {
      type: 'list-item-two-line',
    }),
  slots: [
    {
      key: 'login',
      slot: UserTemplateSlot.title,
    },
    {
      key: 'email',
      slot: UserTemplateSlot.subtitle,
    },
  ],
};
