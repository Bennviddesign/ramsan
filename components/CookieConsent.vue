<!-- components/CookieConsent.vue -->
<script setup>
import { onMounted, ref } from 'vue'

const cookieConsent = useCookie('cookieConsent', {
    maxAge: 365 * 24 * 60 * 60 * 2, // 2 år i sekunder
    path: '/',
    sameSite: 'lax',
})

const showBanner = ref(false)

onMounted(() => {
    const localConsent = localStorage.getItem('cookieConsent')

    if (!cookieConsent.value && !localConsent) {
        showBanner.value = true
    }
})

const acceptCookies = () => {
    cookieConsent.value = 'accepted'
    localStorage.setItem('cookieConsent', 'accepted')
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
    /* Använder tema-variabler med fallback ifall de saknas */
    background: var(--color-background-soft, #f8f9fa);
    color: var(--color-text, #212529);
    border-top: 1px solid var(--color-border, #e9ecef);
    padding: 1rem;
    z-index: 1000;
    backdrop-filter: blur(8px);
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
    color: var(--color-accent, #007bff);
    text-decoration: underline;
    margin-left: 0.5rem;
}

.accept-button {
    background: var(--color-accent, #007bff);
    color: #ffffff;
    border: none;
    padding: 0.5rem 1.5rem;
    border-radius: 6px;
    font-weight: 500;
    cursor: pointer;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
}

.accept-button:hover {
    opacity: 0.9;
}

/* Stöd för mörkt läge via systemets prefers-color-scheme ifall tema-variabler inte används globalt */
@media (prefers-color-scheme: dark) {
    .cookie-banner {
        background: var(--color-background-soft, rgba(15, 23, 42, 0.95));
        color: var(--color-text, #f8fafc);
        border-top-color: var(--color-border, #1e293b);
    }
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