<script setup>
import { computed } from "vue";
import { getLeague, LEAGUES } from "~/utils/sheets";

const route = useRoute();
const team = computed(() => String(route.params.team || ""));
const leagueSlug = computed(() => String(route.params.league || ""));

const league = computed(() =>
  Object.values(LEAGUES).find((item) => item.slug === leagueSlug.value)
);

if (!league.value) {
  throw createError({ statusCode: 404, statusMessage: "Liga hittades inte" });
}

useHead(() => ({
  title: `${team.value} – ${league.value?.name || getLeague(3).name} | Ramsan`,
}));
</script>

<template>
  <TeamChants :team="team" :league="leagueSlug" />
</template>
