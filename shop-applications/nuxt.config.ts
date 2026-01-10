// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: "%s",
      title: "Shop Application",
      htmlAttrs: {
        lang: "en",
      },
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Prompt&display=swap",
        },
      ],
      script: [{ src: "https://cdn.omise.co/omise.js" }],
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  css: ["@/assets/styles/main.css"],
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxtjs/i18n",
    "dayjs-nuxt",
  ],
  vite: {
    plugins: [vuetify({ autoImport: true })],
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "en",
        name: "English",
        files: ["en-US.ts"],
      },
      {
        code: "th",
        name: "ไทย",
        files: ["th-TH.ts"],
      },
    ],
    defaultLocale: "th",
  },
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL,
      OMISE_PUBLIC: process.env.OMISE_PUBLIC,
      API_LOCATION: process.env.API_LOCATION,
    },
    OMISE_SECRET: process.env.OMISE_SECRET,
  },
});
