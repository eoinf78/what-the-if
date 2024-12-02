// @ts-check
import { defineConfig, envField } from 'astro/config';
import { server } from 'typescript';

import react from '@astrojs/react';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  experimental: {
    env: {
      schema: {
        HUGGINGFACE_TOKEN: envField.string({
          context: 'server',
          access: 'secret',
          startsWith: 'hf_',
          optional: false
        }),
      },
    }
  },

  integrations: [react()],
  output: 'server',

  adapter: node({
    mode: 'standalone'
  })
});