// plugins/router.background.client.ts
export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  router.beforeEach((to) => {
    if (process.client) {
      const body = document.body;
      const basePath = "/images/teams-logo/allsvenskan/background/";

      // Reset styles
      body.style.backgroundImage = "";

      // Debug: logga aktuell route
      // console.log("Aktuell route:", to.path);
      // console.log("Params:", to.params);

      // Manage home/contact page
      if (to.name === "index" || to.name === "contact") {
        const imageUrl = `${basePath}allsvenskan-background.webp`;
        console.log("Laddar generell bakgrund:", imageUrl);
        body.style.backgroundImage = `url('${imageUrl}')`;
      }
      // Manage team pages
      else if (to.path.startsWith("/allsvenskan")) {
        const teamSlug = to.params.team?.toString();
        console.log(teamSlug);
        if (teamSlug) {
          // Clear special characters and spaces
          const cleanSlug = teamSlug
            .toLowerCase()
            .replace(/å/g, "a")
            .replace(/ä/g, "a")
            .replace(/ö/g, "o")
            .replace(/\s+/g, "-");

          const imageUrl = `${basePath}${cleanSlug}-background.webp`;
          // console.log(imageUrl);

          // Load image
          const img = new Image();
          img.src = imageUrl;
          img.onload = () => {
            body.style.backgroundImage = `url('${imageUrl}')`;
          };
        }
      }

      // Global styles for background
      body.style.backgroundSize = "cover";
      body.style.backgroundAttachment = "scroll";
    }
  });
});
