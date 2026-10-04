// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["@/assets/scss/main.scss"],
  runtimeConfig: {
    // 🔒 PRIVATA VARIABLER (Endast tillgängliga på servern – SÄKERT!)
    mailHost: process.env.MAIL_HOST,
    mailPort: process.env.MAIL_PORT,
    mailUser: process.env.MAIL_USER,
    mailPassword: process.env.MAIL_PASSWORD,

    // 🌐 OFFENTLIGA VARIABLER (Tillgängliga i webbläsaren)
    public: {
      useRealIp: process.env.NODE_ENV === "production",
    },
  },
  nitro: {
    preset: "static",
  },
  // ⚡ CACHE-REGLER FÖR BILDER OCH TILLGÅNGAR
  routeRules: {
    "/_nuxt/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
    "/images/**": {
      headers: { "cache-control": "public, max-age=31536000, immutable" },
    },
  },
  app: {
    head: {
      // 🏷️ DYNAMISK TITEL & FALLBACK FÖR ROUTER
      title: "Ramsan.se – Fotbollsramsor & Supporterkultur",
      titleTemplate: "%s | Ramsan.se",
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "192x192",
          href: "/android-chrome-192x192.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "512x512",
          href: "/android-chrome-512x512.png",
        },
      ],
    },
  },
});
