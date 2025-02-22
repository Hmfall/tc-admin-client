<template>
    <v-app>
        <v-layout>
            <ConfirmProvider>
                <MessageProvider>
                    <component :is="layout" />
                </MessageProvider>
            </ConfirmProvider>
        </v-layout>
    </v-app>
</template>

<script setup lang="ts">
import EmptyLayout from '@/app/layouts/EmptyLayout.vue';
import ConfirmProvider from '@/shared/components/confirmDialog/ui/ConfirmProvider.vue';
import MessageProvider from '@/shared/components/messageAlert/ui/MessageProvider.vue';
import '@/shared/assets/styles/index.scss';

const route = useRoute();

const layout = computed(() => route.meta?.layout || EmptyLayout);
</script>
