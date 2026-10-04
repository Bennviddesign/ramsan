<script setup>
import { computed, onMounted, ref } from "vue";
import { getCachedData } from "~/utils/cache";
import { parseCsv, TEAM_SHEET_URL, getChantsSheetUrl } from "~/utils/sheets";

const props = defineProps({
  team: { type: String, required: true },
  league: { type: String, required: true },
});

const contents = ref([]);
const teamInfo = ref(null);
const isLoading = ref(true);
const errorMessage = ref("");
const cacheVersion = "v2";

const loadTeamInfo = async () => {
  const data = await getCachedData(`team-list_${cacheVersion}`, async () => {
    const response = await fetch(TEAM_SHEET_URL);
    if (!response.ok) throw new Error(`Google Sheets svarade ${response.status}`);
    return parseCsv(await response.text());
  }, 1);

  const validRows = data.filter((row) => row.some((cell) => cell && cell.trim() !== ""));
  const targetSlug = String(props.team || "").toLowerCase().replace(/[^a-z0-9]/g, "");

  const found = validRows.find((row) => {
    const sheetSlug = String(row[3] || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    return sheetSlug === targetSlug;
  });

  if (found) {
    teamInfo.value = {
      name: found[0]?.trim() || props.team,
      league: Number(found[1]?.trim()),
      logo: found[2]?.trim() || "",
      slug: found[3]?.trim() || props.team,
    };
  }
};

const fetchSheetData = async () => {
  const sheetUrl = getChantsSheetUrl(props.team);
  const cacheKey = `${sheetUrl}_${cacheVersion}`;

  try {
    const data = await getCachedData(cacheKey, async () => {
      const response = await fetch(sheetUrl);
      if (!response.ok) throw new Error(`Google Sheets svarade ${response.status}`);
      return parseCsv(await response.text());
    });

    const [, ...rows] = data;

    contents.value = rows.map((row) => ({
      title: row[0] || "",
      description: row[1] || "",
      audioURL: row[2] || "",
      expanded: false,
    }));
  } catch (error) {
    console.error("Kunde inte hämta ramsor:", error);
    errorMessage.value = "Kunde inte hämta ramsorna just nu.";
  }
};

const teamLogo = computed(() => teamInfo.value?.logo || "");
const teamName = computed(() => teamInfo.value?.name || props.team);

// 🏷️ DYNAMISK FLIKTITEL (Uppdateras automatiskt när teamInfo har laddats)
useHead({
  title: () => {
    const formattedLeague = props.league ? props.league.charAt(0).toUpperCase() + props.league.slice(1) : "";
    return formattedLeague ? `${teamName.value} – ${formattedLeague}` : teamName.value;
  }
});

onMounted(async () => {
  try {
    await loadTeamInfo();
  } catch (error) {
    console.error("Kunde inte hämta laginformation:", error);
  }

  await fetchSheetData();
  isLoading.value = false;
});
</script>

<template>
  <div class="team-page">
    <NuxtLink to="/" class="back-link">← Tillbaka till ligorna</NuxtLink>

    <div class="team-name">
      <img v-if="teamLogo" :src="teamLogo" :alt="teamName" width="80" height="80" />
      <h1>{{ teamName }}</h1>
    </div>

    <div v-if="isLoading" class="status">Laddar ramsor...</div>
    <div v-else-if="errorMessage" class="status">{{ errorMessage }}</div>

    <div v-else-if="contents.length">
      <div v-for="(c, index) in contents" :key="index" class="chant">
        <button class="title" type="button" @click="c.expanded = !c.expanded">
          <span>{{ c.title }}</span>
          <span aria-hidden="true">{{ c.expanded ? "↑" : "↓" }}</span>
        </button>

        <div v-if="c.expanded" class="description">
          <audio v-if="c.audioURL" controls preload="none">
            <source :src="c.audioURL" type="audio/mpeg" />
            Din webbläsare stödjer inte ljuduppspelning.
          </audio>
          <span v-else class="missing-audio">
            <NuxtLink to="/contact">Tyvärr ingen ljudfil, skicka gärna in om ni har!</NuxtLink>
          </span>
          <div class="description-text">{{ c.description }}</div>
        </div>
      </div>
    </div>

    <p v-else class="status">Det finns inga ramsor för detta lag ännu.</p>
  </div>
</template>

<style scoped>
.team-page {
  max-width: 850px;
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin: 10px 0 20px;
  color: var(--color-text-muted);
  font-size: 13px;
}

.team-name {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin: 15px 0 25px;
}

.team-name img {
  width: 65px;
  height: 65px;
  object-fit: contain;
}

.team-name h1 {
  font-size: 24px;
}

.chant {
  border-bottom: 1px solid var(--color-border);
}

.title {
  appearance: none;
  border: 0;
  background: transparent;
  color: var(--color-heading);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 15px;
  font: inherit;
  text-align: left;
}

.title:hover {
  background: var(--color-background-soft);
}

.title span:first-child {
  font-size: 14px;
}

.title span:last-child {
  color: var(--color-accent);
  font-size: 20px;
}

.description {
  display: grid;
  gap: 15px;
  padding: 0 15px 20px;
  color: var(--color-text);
}

.description audio {
  width: min(100%, 420px);
  height: 34px;
  margin: auto;
}

.missing-audio {
  text-align: center;
  font-size: 12px;
}

.description-text {
  white-space: pre-line;
}

.status {
  text-align: center;
  color: var(--color-text-muted);
  margin: 30px auto;
}

@media (min-width: 768px) {
  .team-name h1 {
    font-size: 30px;
  }

  .team-name img {
    width: 85px;
    height: 85px;
  }

  .title span:first-child {
    font-size: 18px;
  }
}

@media (min-width: 1200px) {
  .team-name img {
    width: 100px;
    height: 100px;
  }

  .title,
  .description {
    padding-left: 15px;
    padding-right: 15px;
  }
}
</style>
