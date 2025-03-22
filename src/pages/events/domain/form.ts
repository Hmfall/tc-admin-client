import EventPositionSelect from '@/pages/events/ui/EventPositionSelect.vue';
import type { AutoFormFields } from '@/features/autoForm/model/types';
import { FieldType } from '@/features/autoForm/model/types';
import FileInputComponent from '@/features/autoForm/ui/components/FileInputComponent.vue';
import type { Event } from '@/entities/event/model/Event';
import EditedTextField from '@/shared/components/editedTextField/EditedTextField.vue';
import {
  maxLengthRule,
  minLengthRule,
  requiredObjectUrlRule,
  requiredRule,
} from '@/shared/utils/validationRules';

export const eventFormFields: AutoFormFields<Event> = [
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
            rules: [requiredObjectUrlRule],
            accept: ['image/png, image/jpeg'],
          },
        },
        {
          key: 'position',
          type: FieldType.select,
          render: () => EventPositionSelect,
          props: {
            label: 'Расположение',
          },
        },
        {
          key: 'img',
          type: FieldType.fileInput,
          render: () => FileInputComponent,
          props: {
            label: 'Фоновое изображение',
            rules: [requiredObjectUrlRule],
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
            rules: [requiredRule, minLengthRule, maxLengthRule],
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
        {
          key: 'details',
          type: FieldType.editedTextField,
          render: () => EditedTextField,
          props: {
            label: 'Подробное описание',
            rows: 12,
          },
        },
      ],
    },
    {
      justify: 'end',
    },
  ],
];
