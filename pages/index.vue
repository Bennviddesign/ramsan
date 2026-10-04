<!--
/**
 * @created 2025
 * @author Bennviddesign (https://bennviddesign.se/en)
 * @license MIT
 * @website https://ramsan.se
 * @github-repo https://github.com/Bennviddesign/ramsan
 * @github-profile https://github.com/Bennviddesign
 */
-->

<script setup>
import { computed, onMounted, ref } from "vue";
import { getLeague, LEAGUES, parseCsv, TEAM_SHEET_URL } from "~/utils/sheets";

const rows = ref([]);
const isLoading = ref(true);
const selectedLeague = ref(1);

const leagueTabs = Object.entries(LEAGUES).map(([code, league]) => ({
  code: Number(code),
  ...league,
}));

const activeLeague = computed(() => getLeague(selectedLeague.value));

const teams = computed(() =>
  rows.value
    .filter((team) => team.league === Number(selectedLeague.value))
    .map((team) => ({
      ...team,
      path: `/${activeLeague.value.slug}/${team.slug}`,
    }))
);

const loadTeams = async () => {
  try {
    const response = await fetch(TEAM_SHEET_URL);
    if (!response.ok) throw new Error(`Google Sheets svarade ${response.status}`);

    const csv = await response.text();
    const [header, ...dataRows] = parseCsv(csv);

    if (!header || header.length < 4) {
      throw new Error("Lag-sheeten saknar rätt kolumner.");
    }

    rows.value = dataRows
      .filter((row) => row.length >= 4 && row[0].trim())
      .map(([name, leagueCode, logo, slug]) => ({
        name: name.trim(),
        league: Number(leagueCode.trim()),
        logo: logo.trim(),
        slug: slug.trim(),
      }))
      .filter((team) => team.name && team.slug && [1, 2, 3].includes(team.league));
  } catch (error) {
    console.error("Kunde inte läsa lag-sheet:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(loadTeams);
</script>

<template>
  <main class="team-list-page">
    <div class="category">
      <h1>{{ activeLeague.name }}</h1>
      <img v-if="selectedLeague === 1" src="/images/teams-logo/allsvenskan.webp" alt="Allsvenskan" width="60"
        height="60" />
    </div>

    <nav class="league-nav" aria-label="Välj liga">
      <button v-for="league in leagueTabs" :key="league.code" type="button"
        :class="{ active: selectedLeague === league.code }"
        :aria-current="selectedLeague === league.code ? 'page' : undefined" @click="selectedLeague = league.code">
        {{ league.name }}
      </button>
    </nav>

    <div v-if="isLoading" class="status">Laddar lag...</div>

    <div v-else-if="teams.length" class="wrapper">
      <div v-for="team in teams" :key="team.slug">
        <NuxtLink :to="team.path" class="team-card">
          <img :src="team.logo" :alt="team.name" loading="lazy" />
          <p>{{ team.name }}</p>
        </NuxtLink>
      </div>
    </div>

    <p v-else class="status">
      Inga lag finns i {{ activeLeague.name }} ännu.
    </p>
  </main>
</template>

<style scoped>
.team-list-page {
  text-align: center;
}

.category {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  h1 {
    font-size: 25px;
  }

  img {
    background: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    object-fit: contain;
  }
}

.league-nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 auto 28px;
}

.league-nav button {
  appearance: none;
  border: 1px solid var(--color-border-hover);
  border-radius: 999px;
  background: var(--color-background-soft);
  color: var(--color-text);
  padding: 8px 15px;
  font: inherit;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s ease;
}

.league-nav button:hover,
.league-nav button.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: #fff;
}

.team-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 145px;
}

.team-card img {
  width: 65px;
  height: 75px;
  object-fit: contain;
  margin-top: 0.5rem;
}

.team-card p {
  font-size: 12px;
  margin-top: 8px;
}

.status {
  color: var(--color-text-muted);
  margin: 30px auto;
  max-width: 500px;
}

@media (min-width: 768px) {
  .category h1 {
    font-size: 30px;
  }

  .category img {
    width: 60px;
    height: 60px;
  }

  .team-card img {
    width: 100px;
    height: 105px;
  }

  .team-card p {
    font-size: 16px;
  }
}

@media (min-width: 1200px) {
  .category h1 {
    font-size: 35px;
  }

  .category img {
    width: 75px;
    height: 75px;
  }
}
</style>
