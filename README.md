# ⚽📢 Ramsan

**A web app for football chants – text and audio!**

Ramsan is a Nuxt 3 application where you can find and listen to football chants from different teams. The app fetches chants dynamically from Google Sheets via the Google API, and audio files are hosted on Cloudflare.

## Features ✨

- 🎶 Team-specific chant collections
- 🔊 Cloudflare-hosted audio playback
- ❤️ Interactive like counter system
- 📱 Responsive mobile-first design
- 📊 Real-time content updates via Google Sheets
- 🛠️ Dynamic routing with `[team].vue`

## Tech Stack 💻

| Category           | Technologies           |
| ------------------ | ---------------------- |
| Framework          | Vue 3 + Nuxt 3         |
| Styling            | SCSS + CSS Modules     |
| State Management   | Composables            |
| Content Management | Google Sheets API      |
| Audio Hosting      | Cloudflare Stream      |
| Deployment         | Node.js + Nitro Server |

## Project Setup 🛠️

### Prerequisites

- Node.js 18+
- Google Sheets API key
- Cloudflare account (for audio hosting)

### Installation

```bash
# Using npm
npm install
```

## Configuration 🔧

1. Create `.env` file:

```env
PUBLIC_GOOGLE_SHEETS_API_KEY=your_api_key
```

2. **Google Sheets setup**:

   - Create spreadsheet with team-specific tabs
   - Format columns: `Title | Description | AudioURL`
   - Share spreadsheet with your service account

3. **Cloudflare audio setup**:
   - Upload MP3 files to Cloudflare Stream
   - Add audio URLs to Google Sheet

## Development 🚀

Start local development server:

```bash
npm run dev
```

Access via: `http://localhost:3000`

## Project Structure 📂

```
RAMSAN/
├── assets/
│   ├── scss/
│   └── base.css
├── components/
│   ├── TeamChants.vue
├── pages/
│   ├── allsvenskan/
│   │   └── [team].vue
├── plugins/
├── public/
│   └── images/
├── server/
├── nuxt.config.ts
└── app.vue
```

## Deployment 🚀

Follow the [Nuxt deployment guide](https://nuxt.com/docs/getting-started/deployment) for platforms like:

- Node.js servers
- Serverless platforms
- Static hosting (pre-rendered)

## Contributing 🤝

1. Fork the repository
2. Create feature branch:

```bash
git checkout -b feature/new-feature
```

3. Commit changes:

```bash
git commit -m 'Add awesome feature'
```

4. Push to branch:

```bash
git push origin feature/new-feature
```

5. Open a Pull Request

## License 📄

Distributed under the MIT License. See `LICENSE` for details.

---

**Note**: Replace placeholder values (`https://ramsan.se`, `your_api_key`) with actual project values before deployment.

## Author ✍️

Developed with ❤️ by **Marcus Bennvid**  
📧 Contact: [bennviddesign@gmail.com]  
🔗 GitHub: [github.com/bennviddesign](https://github.com/bennviddesign)  
🌍 Website: [bennviddesign.se](https://bennviddesign.com)
