import { VImg, VTextarea, VTextField } from 'vuetify/components';
import type { About } from '@/entities/about/model/About';
import { Input } from '@/widgets/formBuilder/domain';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import { CardTemplateSlot } from '@/widgets/templateBuilder/domain';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';
import CardTemplate from '@/widgets/templateBuilder/ui/components/CardTemplate.vue';

export const aboutFormBuilder: FormBuilderFields<About> = [
  [
    {
      span: 3,
      items: [
        {
          key: 'logo',
          type: Input.fileInput,
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
          type: Input.textField,
          render: () => VTextField,
          props: {
            label: 'Название',
            hideDetails: true,
          },
        },
        {
          key: 'description',
          type: Input.textarea,
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

export const aboutTemplateBuilder: CommonTemplateBuilder<About> = {
  component: () => CardTemplate,
  slots: [
    {
      key: 'name',
      slot: CardTemplateSlot.title,
    },
    {
      key: 'description',
      slot: CardTemplateSlot.subtitle,
    },
    {
      slot: CardTemplateSlot.image,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'logo',
        },
      },
    },
  ],
};
