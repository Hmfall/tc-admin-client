import type { PluginOption } from 'vite';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import visualizer from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    vueDevTools(),
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
      ],
      eslintrc: {
        enabled: true,
      },
    }),
    visualizer({
      open: true,
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
