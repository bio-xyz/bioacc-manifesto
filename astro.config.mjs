import { defineConfig } from 'astro/config'
import mdx from '@astrojs/mdx'
import tailwind from '@astrojs/tailwind'
import react from '@astrojs/react'
import vercelServerless from '@astrojs/vercel/serverless'

import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [
    mdx(),
    tailwind({
      applyBaseStyles: false,
    }),
    react(),
    icon(),
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
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zn'],
    // routing: {
    //   prefixDefaultLocale: false,
    //   redirectToDefaultLocale: true,
    // },
  },
})
