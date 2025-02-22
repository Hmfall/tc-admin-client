<template>
    <template v-if="render && loading">
        <component
            :is="render"
            v-for="i in +length"
            :key="i"
        />
    </template>

    <template v-else>
        <slot />
    </template>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        loading: boolean;
        render?: (() => Component) | Component;
        length?: number | string;
    }>(),
    {
        length: 1,
    },
);

const render = computed(() =>
    typeof props.render === 'function' ? (props.render as () => Component)() : props.render,
);
</script>
