import type { PluginOption } from 'vite';
import { defineConfig, loadEnv } from 'vite';
import Vue from '@vitejs/plugin-vue';
import Visualizer from 'rollup-plugin-visualizer';
import AutoImport from 'unplugin-auto-import/vite';
import Vuetify from 'vite-plugin-vuetify';
import { appConfig } from './src/app/config';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  const server =
    mode === 'development'
      ? {
          proxy: {
            [`/${appConfig.APP_BASE_URL}/${appConfig.API_DEV_BASE_URL}`]: {
              target: appConfig.API_BASE_URL,
              changeOrigin: true,
              secure: false,
              rewrite: (path) =>
                path.replace(
                  new RegExp(`^/${appConfig.APP_BASE_URL}/${appConfig.API_DEV_BASE_URL}`),
                  '',
                ),
            },
          },
        }
      : {};

  return defineConfig({
    base: appConfig.APP_BASE_URL,
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
