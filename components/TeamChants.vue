<script setup>
// Define component props
const props = defineProps({
    team: {
        type: String,
        required: true // The "team" prop is required and must be a string
    }
})

// Reactive state variables
const contents = ref([]);
const config = useRuntimeConfig();
const isLoading = ref(true);

const cacheVersion = 'v1.0'; // Cache version to help manage cache updates

// Utility function to add line breaks in text for proper formatting
const addLineBreaks = (text) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>');
};

// Fetches data from Google Sheets API with caching
const fetchSheetData = async () => {
    // Construct API URL using the provided team name and Google Sheets API key
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/19tGjwPE8Zd_CQe0Ar2eNUJlSzlD5K4u3Mf2amHHAGrQ/values/${props.team}?key=${config.public.googleSheetsApiKey}`;
    const cacheKey = `${apiUrl}_${cacheVersion}`;

    try {
        // Attempt to retrieve cached data, otherwise fetch fresh data
        const data = await getCachedData(cacheKey, () => $fetch(apiUrl));
        const rows = data.values;

        if (rows && rows.length > 1) {
            // Transform raw data into an array of objects with structured properties
            contents.value = rows.slice(1).map((row) => ({
                title: row[0] || '',
                description: addLineBreaks(row[1] || ''),
                audioURL: row[2] || '',
                expanded: false
            }));
        }
    } catch (error) {
        console.error('Kunde inte hämta in data:', error);
    } finally {
        // Set loading state to false once data fetching is completed (success or failure)
        isLoading.value = false;
    }
};

// Fetch data when the component is mounted
onMounted(fetchSheetData);
</script>

<template>
    <div>
        <div class="team-name">
            <!-- Dynamic image path -->
            <img :src="`/images/teams-logo/allsvenskan/${team}.png`" :alt="team" width="80" height="80">
            <!-- <h1>{{ team.toUpperCase() }}</h1> -->
        </div>

        <!-- Reusable chant list -->
        <div v-for="(c, index) in contents" :key="index">
            <div class="title" @click="c.expanded = !c.expanded">
                <div>
                    <h3 v-if="c.expanded"
                        style="border: 1px solid white; border-radius: 50px; padding: 5px 10px; margin-left: -10px; margin-top: -5px;">
                        {{
                        c.title }}</h3>
                    <h3 v-else>{{ c.title }}</h3>
                </div>
                <div>
                    <span v-if="c.expanded">&#x2191;</span>
                    <span v-else>&#x2193;</span>
                </div>
            </div>

            <div class="description" v-if="c.expanded">
                <audio controls v-if="c.audioURL">
                    <source :src="c.audioURL" type="audio/mpeg" />
                    Your browser does not support the audio element.
                </audio>
                <span style="font-style: italic; margin: auto;" v-else><a href="/contact">Tyvärr ingen ljudfil, skicka
                        gärna in om ni
                        har!</a></span>
                <div class="description" v-html="c.description"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
h3 {
    font-size: 14px;
}

.title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    margin: auto;
}

.title,
.description {
    padding-top: 15px;
    padding-bottom: 15px;
    color: white;
}

.description {
    display: grid;
    margin: auto;

    audio {
        width: 300px;
        height: 30px;
        margin: auto
    }

    span {
        font-size: 12px;
        text-decoration: underline;
    }
}

.team-name {
    margin-top: 20px;
    margin-bottom: 20px;

    img {
        width: 65px;
        height: 65px;
    }
}

@media (min-width: 768px) {
    h3 {
        font-size: 18px;
    }

    .title {
        width: 85%;
    }
}

@media (min-width: 1200px) {

    .title,
    .description {
        padding: 15px;
    }

    .team-name {


        img {
            width: 100px;
            height: 100px;
        }
    }
}
</style>