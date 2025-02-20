// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/scss/main.scss"],
  runtimeConfig: {
    public: {
      googleSheetsApiKey: process.env.NUXT_PUBLIC_GOOGLE_SHEETS_API_KEY,
      useRealIp: process.env.NODE_ENV === "production",
    },
  },
  nitro: {
    preset: "node-server",
  },
});
