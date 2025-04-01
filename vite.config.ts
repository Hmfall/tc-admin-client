import type { PluginOption } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Visualizer from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Vuetify from 'vite-plugin-vuetify';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const server =
    mode === 'development'
      ? {
          proxy: {
            '/api': {
              target: process.env.VITE_API_BASE_URL,
              changeOrigin: true,
              secure: false,
              rewrite: (path) => path.replace(/^\/api/, ''),
            },
          },
        }
      : {};

  return defineConfig({
    server,
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
            '@vueuse/core': ['useVModel'],
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
};
