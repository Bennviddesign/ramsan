<!-- pages/allsvenskan/[team].vue -->
<script setup>
const route = useRoute()

// Get parameter from the URL
const team = route.params.team
</script>

<template>
    <!-- Pass parameter as prop -->
    <TeamChants :team="team" />
</template>