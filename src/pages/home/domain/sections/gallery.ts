import { VImg, VTextarea, VTextField } from 'vuetify/components';
import type { Gallery } from '@/entities/gallery/model/Gallery';
import { Input } from '@/widgets/formBuilder/domain';
import type { FormBuilderFields } from '@/widgets/formBuilder/types/formBuilder';
import FileInputComponent from '@/widgets/formBuilder/ui/components/FileInputComponent.vue';
import { CardTemplateSlot } from '@/widgets/templateBuilder/domain';
import type { CommonTemplateBuilder } from '@/widgets/templateBuilder/types';
import CardTemplate from '@/widgets/templateBuilder/ui/components/CardTemplate.vue';

export const galleryFormBuilder: FormBuilderFields<Gallery> = [
  [
    {
      span: 3,
      items: [
        {
          key: 'logoImgFile',
          type: Input.fileInput,
          render: () => FileInputComponent,
          props: {
            foreignKey: 'logoImg',
            label: 'Фоновое изображение',
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
        {
          key: 'link',
          type: Input.textField,
          render: () => VTextField,
          props: {
            label: 'Ссылка на внешний ресурс',
          },
        },
      ],
    },
    {
      justify: 'end',
    },
  ],
];

export const galleryTemplateBuilder: CommonTemplateBuilder<Gallery> = {
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
      key: 'link',
      slot: CardTemplateSlot.link,
      attrs: {
        target: '_blank',
        rel: 'noopener noreferrer',
        href: {
          bindKey: 'link',
        },
      },
    },
    {
      slot: CardTemplateSlot.image,
      render: () => VImg,
      attrs: {
        src: {
          bindKey: 'logoImg',
        },
      },
    },
  ],
};
