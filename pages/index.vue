<script setup>
definePageMeta({
  title: "/",
});
</script>

<template>
  <main style="text-align: center;">
    <div class="category" style="display: flex; justify-content: center; margin-bottom: 20px; align-items: center;">
      <h1>Allsvenskan</h1><img src="/public/images/teams-logo/allsvenskan/allsvenskan.webp" alt="" width="60"
        height="60">
    </div>


    <div class="wrapper">

      <div v-for="team in teams" :key="team.name">
        <NuxtLink :to="team.path">
          <img :src="team.logo" :alt="team.name" />
          <p>{{ team.name }}</p>
        </NuxtLink>
      </div>

    </div>
  </main>
</template>

<script>
export default {
  name: "TeamList",
  data() {
    return {
      teams: [
        { name: "Malmö FF", logo: "images/teams-logo/allsvenskan/malmo.png", path: "/allsvenskan/malmo" },
        { name: "IFK Göteborg", logo: "images/teams-logo/allsvenskan/goteborg.png", path: "/allsvenskan/goteborg" },
        { name: "IF Elfsborg", logo: "images/teams-logo/allsvenskan/elfsborg.png", path: "/allsvenskan/elfsborg" },
        { name: "Djurgården IF", logo: "images/teams-logo/allsvenskan/djurgarden.png", path: "/allsvenskan/djurgarden" },
        { name: "AIK", logo: "images/teams-logo/allsvenskan/aik.png", path: "/allsvenskan/aik" },
        { name: "IFK Värnamo", logo: "images/teams-logo/allsvenskan/varnamo.png", path: "/allsvenskan/varnamo" },
        { name: "GAIS", logo: "images/teams-logo/allsvenskan/gais.webp", path: "/allsvenskan/gais" },
        { name: "Hammarby IF", logo: "images/teams-logo/allsvenskan/hammarby.png", path: "/allsvenskan/hammarby" },
        { name: "IK Sirius", logo: "images/teams-logo/allsvenskan/sirius.png", path: "/allsvenskan/sirius" },
        { name: "IFK Norrköping", logo: "images/teams-logo/allsvenskan/norrkoping.png", path: "/allsvenskan/norrkoping" },
        { name: "Mjällby AIF", logo: "images/teams-logo/allsvenskan/mjallby.png", path: "/allsvenskan/mjallby" },
        { name: "Halmstads BK", logo: "images/teams-logo/allsvenskan/halmstad.png", path: "/allsvenskan/halmstad" },
        { name: "IF Brommapojkarna", logo: "images/teams-logo/allsvenskan/brommapojkarna.png", path: "/allsvenskan/brommapojkarna" },
        { name: "Degerfors IF", logo: "images/teams-logo/allsvenskan/degerfors.png", path: "/allsvenskan/degerfors" },
        { name: "Öster IF", logo: "images/teams-logo/allsvenskan/oster.webp", path: "/allsvenskan/oster" },
        { name: "BK Häcken", logo: "images/teams-logo/allsvenskan/hacken.png", path: "/allsvenskan/hacken" },
      ],
    };
  },
};
</script>
<style scoped>
.category img {
  background-color: white;
  border-radius: 100%;
  margin-left: 10px;
}
</style>
