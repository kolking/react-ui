import { defineConfig, loadEnv } from 'vite';
import path from 'path';

import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import svgr from 'vite-plugin-svgr';
import prefixWrap from 'postcss-prefixwrap';
import { watchAndRun } from 'vite-plugin-watch-and-run';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [
      react(),
      svgr({
        svgrOptions: { ref: true },
      }),
      watchAndRun([
        {
          name: 'SVG icon types',
          watchKind: ['add', 'unlink'],
          watch: path.resolve('lib/assets/icons/**/*.svg'),
          run: 'scripts/svg-icons.sh',
          delay: 1000,
        },
      ]),
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
          prefixWrap(':global(#root)', {
            whitelist: ['[.]module[.](css|scss)$'],
            ignoredSelectors: [':global(#root)'],
          }),
          prefixWrap('#root', {
            whitelist: ['(?<!.module)[.](css|scss)$'],
            ignoredSelectors: ['#root', ':root'],
          }),
        ],
      },
      modules: {
        generateScopedName: '[folder]_[local]_[hash:base64:5]',
      },
    },
    resolve: {
      // The @lib alias points to the /lib forder by default
      // or to the /dist folder when VITE_DIST defined
      alias: [
        {
          find: /^@lib(.*)$/,
          replacement: path.resolve(__dirname, env.VITE_DIST ? 'dist$1' : 'lib$1'),
        },
      ],
    },
  };
});
