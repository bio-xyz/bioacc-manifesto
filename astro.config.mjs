import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'

import vercelServerless from '@astrojs/vercel/serverless'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
  ],
  adapter: vercelServerless({
    imageService: true,
    edgeMiddleware: true,
    isr: {
      expiration: 60,
    },
  }),
  vite: {
    ssr: {
      noExternal: 'react-tweet',
    },
  },
})
