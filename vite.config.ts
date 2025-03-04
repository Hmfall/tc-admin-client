import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Visualizer from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    Vue(),
    Vuetify(),
    AutoImport({
      dts: './src/app/imports/auto-imports.d.ts',
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@vueuse/core': ['useVModel', 'until'],
        },
        {
          from: 'vue',
          imports: ['Ref', 'ShallowRef', 'UnwrapRef', 'MaybeRef', 'WatchSource', 'Component'],
          type: true,
        },
        {
          from: 'vue-router',
          imports: ['RouteRecordRaw', 'RouteRecordName'],
          type: true,
        },
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    Visualizer({
      open: false,
    }) as PluginOption,
  ],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
    ],
  },
});
