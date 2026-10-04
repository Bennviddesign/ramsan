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
import { onMounted, ref } from "vue";

const isDark = ref(true);

const applyTheme = (theme) => {
  isDark.value = theme !== "light";
  document.documentElement.dataset.theme = isDark.value ? "dark" : "light";
};

const toggleTheme = () => {
  const nextTheme = isDark.value ? "light" : "dark";
  applyTheme(nextTheme);
  localStorage.setItem("ramsan-theme", nextTheme);
};

onMounted(() => {
  const savedTheme = localStorage.getItem("ramsan-theme");
  applyTheme(savedTheme === "light" ? "light" : "dark");
});
</script>

<template>
  <header>
    <div class="header">
      <div id="logo">
        <NuxtLink to="/" class="brand-link" aria-label="Ramsan.se startsida">
          <span class="brand-name">Ramsan<span class="brand-dot">.</span></span>
        </NuxtLink>
      </div>

      <div class="header-actions">
        <NuxtLink to="/contact" class="tip-link">Saknas en ramsa? Tipsa oss här!</NuxtLink>
        <button class="theme-toggle" type="button" :aria-label="isDark ? 'Byt till ljust tema' : 'Byt till mörkt tema'"
          :title="isDark ? 'Ljust tema' : 'Mörkt tema'" @click="toggleTheme">
          <span aria-hidden="true">{{ isDark ? "☀" : "☾" }}</span>
        </button>
      </div>
    </div>
  </header>

  <NuxtPage />
  <CookieConsent />
  <AppFooter />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;
  margin: auto;
  padding: 1rem 0;
}

#logo {
  flex-shrink: 0;
}

.brand-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.brand-name {
  font-family: "Poppins", sans-serif;
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--color-heading);
  transition: opacity 0.2s ease;
}

.brand-dot {
  color: #3b82f6;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.tip-link {
  display: none;
  font-size: 13px;
  color: var(--color-heading);
  text-decoration: underline;
}

.theme-toggle {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid var(--color-border-hover);
  border-radius: 50%;
  background: var(--color-surface);
  color: var(--color-heading);
  cursor: pointer;
  transition: 0.2s ease;
}

.theme-toggle:hover {
  background: var(--color-background-soft);
  border-color: var(--color-accent);
}

.theme-toggle span {
  font-size: 17px;
  line-height: 1;
}

@media (min-width: 768px) {
  .brand-name {
    font-size: 36px;
  }

  .tip-link {
    display: block;
    font-size: 14px;
  }
}

@media (min-width: 1200px) {
  .header {
    width: 85%;
  }

  .tip-link {
    font-size: 16px;
  }
}
</style>
