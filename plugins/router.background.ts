/**
 * @created 2025
 * @author Bennviddesign (https://bennviddesign.com)
 * @license MIT
 * @website https://ramsan.se
 */

// plugins/router.background.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  router.beforeEach((to) => {
    if (process.client) {
      const body = document.body;

      // Nollställ eventuella gamla bakgrundsbilder
      body.style.backgroundImage = "";

      // Vi sätter inga tunga AI-bilder här längre,
      // utan låter din rena CSS-bakgrund (mörka tema) sköta utseendet.

      body.style.backgroundSize = "cover";
    }
  });
});
