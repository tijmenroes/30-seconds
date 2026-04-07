// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
    '@nuxt/hints',
    '@nuxt/scripts'
  ],

  ssr: false,

  runtimeConfig: {
    public: {
      siteUrl: 'https://tijmenroes.github.io/30-seconds',
      siteName: '30 Seconds',
      siteDescription:
        'A game where you have 30 seconds to guess as many words as possible.'
    }
  },

  app: {
    baseURL: '/30-seconds',
    buildAssetsDir: '/assets/'
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: false
    }
  }
})
