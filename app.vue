<script setup>
</script>

<template>
  <header>
    <div class="header">
      <div>
        <NuxtLink to="/" style=" display: flex; align-items: center;  text-decoration: none;">
          <img alt="Vue logo" class="logo" src="@/assets/ramsan.webp" width="150" height="150" />
          <h1>Ramsan</h1>
        </NuxtLink>
      </div>
      <div><a href="/contact">Saknas en ramsa? Tipsa oss här!</a></div>
    </div>
  </header>
  <NuxtPage />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: auto;
  width: 100%;
}

a img {
  width: 150px;
  height: 150px;
}

.logo {
  display: block;
}

@media (min-width: 1200px) {

  .header {
    width: 85%;
    align-items: center;
  }

}
</style>
