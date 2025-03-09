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