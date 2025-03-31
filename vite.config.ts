import { defineConfig } from 'vite';
import { resolve } from 'path';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';
// import prefixWrap from 'postcss-prefixwrap';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { ref: true },
    }),
  ],
  build: {
    sourcemap: true,
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({}),
        // For an embedded app include #root scope to all
        // style rules to minimize the impact of external styles.
        // Remove this when building a stand alone app.
        // prefixWrap(':global(#root)', {
        //   whitelist: ['[.]module[.](css|scss)$'],
        //   ignoredSelectors: [':global(#root)'],
        // }),
        // prefixWrap('#root', {
        //   whitelist: ['(?<!.module)[.](css|scss)$'],
        //   ignoredSelectors: ['#root'],
        // }),
      ],
    },
    modules: {
      generateScopedName: '[folder]_[local]_[hash:base64:5]',
    },
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    // Replace with dist$1 to test after building the library
    alias: [{ find: /^@lib(.*)$/, replacement: resolve(__dirname, 'lib$1') }],
  },
});
