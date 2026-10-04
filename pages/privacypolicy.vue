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

<template>
    <div class="container">
        <div class="policy-content">
            <h1>Integritetspolicy för Ramsan.se</h1>
            <p class="updated-date"><strong>Senast uppdaterad:</strong> {{ new Date().getFullYear() }}</p>

            <section>
                <h2>1. Vilken information samlar vi in?</h2>

                <h3>a) Kontaktformulär</h3>
                <p>När du skickar ett meddelande via vårt kontaktformulär sparar vi:</p>
                <ul>
                    <li>Ditt namn</li>
                    <li>Din e-postadress</li>
                    <li>Ditt meddelande</li>
                </ul>
                <p>Denna data används enbart för att besvara din förfrågan och raderas när ärendet är avslutat.</p>

                <h3>b) MP3-uppspelning</h3>
                <p>När du spelar upp musik via vår webbplats:</p>
                <ul>
                    <li>Cloudflares infrastruktur kan logga din IP-adress temporärt för teknikdrift</li>
                    <li>Ingen användardata lagras kopplat till ditt lyssnande</li>
                </ul>

                <h3>c) Låttexter</h3>
                <p>Låttexter hämtas direkt från Google Sheets via vårt API. Ingen användardata sparas eller kopplas till
                    texterna.</p>
            </section>

            <section>
                <h2>2. Så använder vi cookies</h2>
                <p>Vi använder <strong>endast nödvändiga cookies</strong> för:</p>
                <ul>
                    <li>Säkerhetsfunktioner (bot-skydd via Cloudflare)</li>
                    <li>Grundläggande webbplatsfunktionalitet</li>
                </ul>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Cookie-namn</th>
                                <th>Syfte</th>
                                <th>Varaktighet</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>__cf_bm</td>
                                <td>Skydd mot automatiserade attacker</td>
                                <td>30 min</td>
                            </tr>
                            <tr>
                                <td>__cfruid</td>
                                <td>Begränsning av anropstakt</td>
                                <td>Session</td>
                            </tr>
                            <tr>
                                <td>cookieConsent</td>
                                <td>Sparas när du godkänner cookie-banderollen</td>
                                <td>2 år</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>Dessa cookies kräver <strong>inte ditt samtycke</strong> enligt GDPR då de är tekniskt nödvändiga.
                </p>
            </section>

            <section>
                <h2>3. Delning av data</h2>
                <p>Vi delar <strong>inte</strong> din personliga data med tredje part utöver:</p>
                <ul>
                    <li>Cloudflare (för MP3-leverans och säkerhet)</li>
                    <li>Google (för Sheets API-åtkomst)</li>
                </ul>
                <p>Vi säljer inte och handlar inte med användardata.</p>
            </section>

            <section>
                <h2>4. Dataskydd</h2>
                <p>Vi tillämpar följande säkerhetsåtgärder:</p>
                <ul>
                    <li>SSL-kryptering på hela webbplatsen</li>
                    <li>Regelbundna säkerhetsuppdateringar</li>
                    <li>Brandväggsskydd via Cloudflare</li>
                </ul>
            </section>

            <section>
                <h2>5. Dina rättigheter</h2>
                <p>Du har rätt att:</p>
                <ul>
                    <li>Begära en kopia av din sparade data</li>
                    <li>Begära rättelse av felaktig data</li>
                    <li>Begära radering av din data (gäller kontaktformulärsdata)</li>
                </ul>
                <p>Kontakta oss via tipsa@ramsan.se för att utöva dessa rättigheter.</p>
            </section>

            <section>
                <h2>6. Ändringar av denna policy</h2>
                <p>Eventuella policyändringar publiceras på denna sida. Senaste revideringsdatumet finns överst i
                    dokumentet.</p>
            </section>

            <section>
                <h2>7. Kontakt</h2>
                <p>Har du frågor om vår integritetshantering?</p>
                <p>Kontakta oss på:<br>
                    <a href="mailto:tipsa@ramsan.se" class="contact-link">tipsa@ramsan.se</a>
                </p>

                <button @click="resetConsent" class="reset-button">
                    Återställ cookie-inställningar
                </button>
            </section>
        </div>
    </div>
</template>

<script setup>
const resetConsent = () => {
    useCookie('cookieConsent', { path: '/' }).value = null
    localStorage.removeItem('cookieConsent')
    window.location.reload()
}
</script>

<style scoped>
.container {
    margin-top: 2rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    color: var(--color-text, #212529);
}

.policy-content {
    max-width: 800px;
    width: 100%;
}

h1 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    color: var(--color-heading, inherit);
}

.updated-date {
    opacity: 0.8;
    margin-bottom: 2rem;
}

section {
    margin-bottom: 2rem;
}

h2 {
    font-size: 1.4rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    color: var(--color-heading, inherit);
    border-bottom: 1px solid var(--color-border, #e9ecef);
    padding-bottom: 0.3rem;
}

h3 {
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: var(--color-heading, inherit);
}

p {
    line-height: 1.6;
    margin-bottom: 1rem;
}

ul {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
}

li {
    margin-bottom: 0.4rem;
    line-height: 1.5;
}

/* Tabell-styling för dark/light mode */
.table-container {
    overflow-x: auto;
    margin: 1.5rem 0;
}

table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-background-soft, rgba(255, 255, 255, 0.05));
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--color-border, #e9ecef);
}

th,
td {
    padding: 0.75rem 1rem;
    text-align: left;
    border-bottom: 1px solid var(--color-border, #e9ecef);
}

th {
    background: var(--color-background-mute, rgba(0, 0, 0, 0.05));
    font-weight: 600;
}

/* Länkar och knappar */
.contact-link {
    color: var(--color-accent, #007bff);
    text-decoration: underline;
}

.reset-button {
    margin-top: 1rem;
    background: transparent;
    color: var(--color-text, inherit);
    border: 1px solid var(--color-border, #ccc);
    padding: 0.6rem 1.2rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s ease;
}

.reset-button:hover {
    background: var(--color-background-soft, rgba(0, 0, 0, 0.1));
    border-color: var(--color-text, #999);
}
</style>