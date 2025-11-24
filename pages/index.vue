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
import { ref, computed, onMounted } from "vue";

definePageMeta({
  title: "/",
});

// DITT LAG-SHEET SOM CSV
const SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1EUnZmcCLt-3v1w_qiPugEAZ0lBXKABk02QTdyZTNxxk/export?format=csv";

const rows = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await fetch(SHEET_URL);
    const text = await res.text();

    const lines = text.trim().split("\n");

    // Första raden är header: "Lagets Namn,Ligakod,Logo URL,Slug"
    const dataLines = lines.slice(1);

    rows.value = dataLines
      .map((line) => line.split(","))
      .filter((cols) => cols.length >= 4 && cols[0].trim() !== "")
      .map(([name, leagueCode, logoUrl, slug]) => ({
        name: name.trim(),
        league: Number(leagueCode.trim()),
        logo: logoUrl.trim(),
        slug: slug.trim(),
      }));
  } catch (e) {
    console.error("Kunde inte läsa lag-sheet:", e);
  } finally {
    isLoading.value = false;
  }
});

// Allsvenskan = ligakod 1
const teams = computed(() =>
  rows.value
    .filter((t) => t.league === 1)
    .map((t) => ({
      name: t.name,
      logo: t.logo,
      path: `/allsvenskan/${t.slug}`, // 👈 samma slug som TeamChants använder
    }))
);
</script>

<template>
  <main style="text-align: center;">
    <div class="category">
      <h1>Allsvenskan</h1>
      <img src="public/images/teams-logo/allsvenskan/allsvenskan.webp" alt="" width="60" height="60" />
    </div>

    <div v-if="isLoading">Laddar lag...</div>

    <div v-else class="wrapper">
      <div v-for="team in teams" :key="team.slug">
        <NuxtLink :to="team.path">
          <img :src="team.logo" :alt="team.name" />
          <p>{{ team.name }}</p>
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

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
