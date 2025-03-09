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

<template>
  <header>
    <div class="header">
      <div id="logo">
        <NuxtLink to="/" style=" display: flex; align-items: center;  text-decoration: none;">
          <img alt="Vue logo" class="logo" src="@/assets/ramsan.webp" width="150" height="150" />
          <h1>Ramsan</h1>
        </NuxtLink>
      </div>
      <div id="contact"><a href="/contact">Saknas en ramsa? Tipsa oss här!</a></div>
    </div>
  </header>
  <NuxtPage />
  <CookieConsent />
  <AppFooter />
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  margin: auto;
  width: 100%;
}

#contact {
  position: absolute;

  a {
    font-size: 12px;
    text-decoration: underline;
  }
}

#logo {
  margin-top: 20px;
}

a img {
  width: 75px;
  height: 75px;
}

.logo {
  display: block;
}

@media (min-width: 768px) {
  a img {
    width: 120px;
    height: 120px;
  }
}

@media (min-width: 1200px) {

  .header {
    width: 85%;
    align-items: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  a img {
    width: 150px;
    height: 150px;
  }

  #contact {
    position: relative;
  }

  #logo {
    margin-top: 0;
  }

  #contact {
    a {
      font-size: 16px;
    }
  }
}
</style>