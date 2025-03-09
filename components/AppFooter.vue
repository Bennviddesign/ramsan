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

<script setup lang="ts">

</script>

<template>
    <div>
        <p>© {{ new Date().getFullYear() }} Ramsan.se. Alla rättigheter förbehållna.</p>

    </div>


</template>

<style scoped>
div {
    position: absolute;
    bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;

    p {
        color: white;
        font-size: 12px !important;
        text-align: center;
    }
}

@media (min-width: 768px) {
    div {
        left: 50%;
        transform: translateX(-50%);
    }

}
</style>