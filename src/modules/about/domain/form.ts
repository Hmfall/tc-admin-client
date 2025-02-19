import { VTextarea, VTextField } from 'vuetify/components';
import type { FormBuilderFields } from '@/widgets/formBuilder/model/types';
import { FieldType } from '@/widgets/formBuilder/model/types';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import type { About } from '@/entities/about/About';
import { requiredRule } from '@/shared/utils/validationRules';

export const aboutFormFields: FormBuilderFields<About> = [
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
          },
        },
      ],
    },
    {
      span: 9,
      items: [
        {
          key: 'name',
          type: FieldType.textField,
          render: () => VTextField,
          props: {
            label: 'Название',
            rules: [requiredRule],
          },
        },
        {
          key: 'description',
          type: FieldType.textarea,
          render: () => VTextarea,
          props: {
            label: 'Описание',
            rows: 4,
            hideDetails: true,
          },
        },
      ],
    },
    {
      justify: 'end',
    },
  ],
];
