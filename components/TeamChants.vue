<script setup>
const props = defineProps({
    team: {
        type: String,
        required: true
    }
})

const contents = ref([])
const config = useRuntimeConfig()

const addLineBreaks = (text) => {
    return text.replace(/(?:\r\n|\r|\n)/g, '<br>')
}

const fetchSheetData = async () => {
    const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/19tGjwPE8Zd_CQe0Ar2eNUJlSzlD5K4u3Mf2amHHAGrQ/values/${props.team}?key=${config.public.googleSheetsApiKey}`

    try {
        const { data } = await useFetch(apiUrl)
        const rows = data.value.values

        if (rows && rows.length > 1) {
            contents.value = rows.slice(1).map((row) => ({
                title: row[0] || '',
                description: addLineBreaks(row[1] || ''),
                audioURL: row[2] || '',
                expanded: false
            }))
        }
    } catch (error) {
        console.error('Kunde inte hämta in data:', error)
    }
    console.log(props.team);

}

onMounted(fetchSheetData)
</script>

<template>
    <div>
        <div class="team-name">
            <!-- Dynamic image path -->
            <img :src="`/images/teams-logo/allsvenskan/${team}.png`" :alt="team" width="80" height="80">
            <h1>{{ team.toUpperCase() }}</h1>
        </div>

        <!-- Reusable chant list -->
        <div v-for="(c, index) in contents" :key="index">
            <div class="title" @click="c.expanded = !c.expanded">
                <div>
                    <h3>{{ c.title }}</h3>
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
                <span style="font-style: italic; margin: auto;" v-else>Tyvärr ingen ljudfil, skicka gärna in om ni
                    har!</span>
                <div class="description" v-html="c.description"></div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.title {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 85%;
    margin: auto;
}

.title,
.description {
    padding: 15px;
    color: white;
}

.description {
    display: grid;
    margin: auto;
}

.description audio {
    width: 300px;
    height: 30px;
    margin: auto
}
</style>