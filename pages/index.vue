<!--
/**
 * @created 2025
 * @author Bennviddesign (https://bennviddesign.com)
 * @license MIT
 * @website https://ramsan.se
 * @github-repo https://github.com/Bennviddesign/ramsan
 * @github-profile https://github.com/Bennviddesign
 */
-->

<script setup>
definePageMeta({
  title: "/",
});
</script>

<template>
  <main style="text-align: center;">
    <div class="category">
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
        { name: "Degerfors IF", logo: "images/teams-logo/allsvenskan/degerfors.png", path: "/allsvenskan/degerfors" },
        { name: "Öster IF", logo: "images/teams-logo/allsvenskan/oster.webp", path: "/allsvenskan/oster" },
        { name: "BK Häcken", logo: "images/teams-logo/allsvenskan/hacken.png", path: "/allsvenskan/hacken" },
        { name: "IF Brommapojkarna", logo: "images/teams-logo/allsvenskan/brommapojkarna.png", path: "/allsvenskan/brommapojkarna" },
      ],
    };
  },
};
</script>
<style scoped>
.category {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  align-items: center;

  h1 {
    font-size: 25px;
  }

  img {
    background-color: white;
    border-radius: 100%;
    margin-left: 10px;
    width: 50px;
    height: 50px;
  }
}

a {

  img {
    width: 65px;
    height: 65px;

  }

  p {
    font-size: 12px;
  }
}

@media (min-width: 768px) {
  a img {
    width: 100px;
    height: 100px;
  }

  a p {
    font-size: 16px;
  }
}

@media (min-width: 1200px) {
  .category {
    h1 {
      font-size: 35px;
    }

    img {
      width: 75px;
      height: 75px;
    }
  }
}
</style>
