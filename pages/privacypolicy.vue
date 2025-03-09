<!-- pages/integritetspolicy.vue -->
<template>
    <div class="container">
        <div>
            <h1>Integritetspolicy för Ramsan.se</h1>
            <p><strong>Senast uppdaterad:</strong> {{ new Date().getFullYear() }}</p>
            <br>
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
            <br>
            <h2>2. Så använder vi cookies</h2>
            <p>Vi använder <strong>endast nödvändiga cookies</strong> för:</p>
            <ul>
                <li>Säkerhetsfunktioner (bot-skydd via Cloudflare)</li>
                <li>Grundläggande webbplatsfunktionalitet</li>
            </ul>

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
                </tbody>
            </table>
            <p>Dessa cookies kräver <strong>inte ditt samtycke</strong> enligt GDPR då de är tekniskt nödvändiga.</p>
            <br>
            <h2>3. Delning av data</h2>
            <p>Vi delar <strong>inte</strong> din personliga data med tredje part utöver:</p>
            <ul>
                <li>Cloudflare (för MP3-leverans och säkerhet)</li>
                <li>Google (för Sheets API-åtkomst)</li>
            </ul>
            <p>Vi säljer inte och handlar inte med användardata.</p>
            <br>
            <h2>4. Dataskydd</h2>
            <p>Vi tillämpar följande säkerhetsåtgärder:</p>
            <ul>
                <li>SSL-kryptering på hela webbplatsen</li>
                <li>Regelbundna säkerhetsuppdateringar</li>
                <li>Brandväggsskydd via Cloudflare</li>
            </ul>
            <br>
            <h2>5. Dina rättigheter</h2>
            <p>Du har rätt att:</p>
            <ul>
                <li>Begära en kopia av din sparade data</li>
                <li>Begära rättelse av felaktig data</li>
                <li>Begära radering av din data (gäller kontaktformulärsdata)</li>
            </ul>
            <p>Kontakta oss via tipsa@ramsan.se för att utöva dessa rättigheter.</p>
            <br>
            <h2>6. Ändringar av denna policy</h2>
            <p>Eventuella policyändringar publiceras på denna sida. Senaste revideringsdatumet finns överst i
                dokumentet.</p>
            <br>
            <h2>7. Kontakt</h2>
            <p>Har du frågor om vår integritetshantering?</p>
            <p>Kontakta oss på:<br>
                tipsa@ramsan.se<br><br>
            </p>
            <button @click="resetConsent">Återställ cookie-inställningar</button>
        </div>
    </div>

</template>

<script setup>
const resetConsent = () => {
    useCookie('cookieConsent').value = null
    window.location.reload()
}
</script>

<style scoped>
.container {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    color: white;
}
</style>