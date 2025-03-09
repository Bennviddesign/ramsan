<!-- components/CookieConsent.vue -->
<script setup>
const cookieConsent = useCookie('cookieConsent', {
    maxAge: 365 * 2, // 2 år
    sameSite: 'lax'
})

const showBanner = ref(false)

onMounted(() => {
    if (!cookieConsent.value) {
        showBanner.value = true
    }
})

const acceptCookies = () => {
    cookieConsent.value = 'accepted'
    showBanner.value = false
}
</script>

<template>
    <div v-if="showBanner" class="cookie-banner">
        <div class="content">
            <p>
                Denna webbplats använder cookies för att säkerställa grundläggande funktionalitet.
                <NuxtLink to="/privacypolicy" class="policy-link">
                    Läs mer i vår integritetspolicy
                </NuxtLink>
            </p>
            <button @click="acceptCookies" class="accept-button">
                Godkänn
            </button>
        </div>
    </div>
</template>

<style scoped>
.cookie-banner {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000000b0;
    padding: 1rem;
    /* box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1); */
    color: white;
    z-index: 1000;
}

.content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
}

.policy-link {
    color: #007bff;
    text-decoration: underline;
    margin-left: 0.5rem;
}

.accept-button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 4px;
    cursor: pointer;
    flex-shrink: 0;
}

@media (max-width: 768px) {
    .content {
        flex-direction: column;
        text-align: center;
    }

    .accept-button {
        width: 100%;
    }
}
</style>