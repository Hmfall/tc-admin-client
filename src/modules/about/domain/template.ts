import { VImg } from 'vuetify/components';
import type { About } from '@/entities/about/About';
import type { TemplateBuilderSlots } from '@/shared/components/templateBuilder/model/types';
import { CardTemplateSlot } from '@/shared/components/templateBuilder/model/types/templates';
import CardTemplate from '@/shared/components/templateBuilder/ui/templates/common/card/CardTemplate.vue';
import CardTemplateSkeleton from '@/shared/components/templateBuilder/ui/templates/common/card/CardTemplateSkeleton.vue';

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
