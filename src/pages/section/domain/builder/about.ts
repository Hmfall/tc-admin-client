import { VImg, VTextarea, VTextField } from 'vuetify/components';
import type { About } from '@/entities/about/model/About';
import { CardTemplateSlot } from '@/pages/section/types';
import CardTemplate from '@/pages/section/ui/components/CardTemplate.vue';
import CardTemplateSkeleton from '@/pages/section/ui/components/CardTemplateSkeleton.vue';
import type { FormBuilderFields } from '@/widgets/formBuilder/types';
import { Input } from '@/widgets/formBuilder/types';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import type { TemplateBuilderSlots } from '@/widgets/templateBuilder/types';

export const aboutFormFields: FormBuilderFields<About> = [
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

export const aboutTemplateSlots: TemplateBuilderSlots<About> = {
  render: () => CardTemplate,
  skeletonRender: () => CardTemplateSkeleton,
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
