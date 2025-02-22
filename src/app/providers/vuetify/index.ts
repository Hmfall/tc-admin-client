import { createVuetify } from 'vuetify';
import { mdi } from 'vuetify/iconsets/mdi-svg';
import { ru } from 'vuetify/locale';
import aliases from '@/app/providers/vuetify/icons';

export default createVuetify({
    locale: {
        locale: 'ru',
        fallback: 'ru',
        messages: { ru },
    },
    display: {
        mobileBreakpoint: 'md',
        thresholds: {
            xs: 0,
            sm: 576,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    primary: '#1F75CBFF',
                    'on-primary': '#FFFFFF',
                    secondary: '#626168FF',
                    surface: '#FFFFFF',
                    background: '#F0F0F0FF',
                },
            },
        },
    },
    defaults: {
        VContainer: {
            class: 'w-100 h-100',
        },
        VSheet: {
            class: 'bg-transparent',
        },
        VBtn: {
            flat: true,
            ripple: false,
            class: 'text-none',
            variant: 'outlined',
            density: 'compact',
        },
        VTextField: {
            variant: 'outlined',
            density: 'compact',
        },
        VTextarea: {
            variant: 'outlined',
        },
        VCard: {
            flat: true,
        },
        VTab: {
            ripple: false,
        },
        VFileInput: {
            prependIcon: '',
            prependInnerIcon: '$mdiFolderOpen',
            variant: 'outlined',
            density: 'compact',
        },
        VList: {
            density: 'compact',
        },
    },
    icons: {
        aliases,
        sets: {
            mdi,
        },
    },
});
