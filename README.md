# ⚽📢 Ramsan

A web app for Swedish football chants – text and audio.

## Features

- Team-specific chant collections
- Audio playback from external hosting
- Dynamic team/league list from Google Sheets
- Allsvenskan, Superettan and Övriga
- Dark mode by default + persistent light mode
- Responsive mobile-first design
- No Google API key shipped to the browser

## Tech stack

- Vue 3 + Nuxt 3
- SCSS + CSS variables
- Google Sheets public CSV / gviz endpoints
- Static Nuxt/Nitro deployment

## Google Sheets – teams

The team list is read from the public CSV export of the configured team spreadsheet.
The first row must contain these columns:

```text
Lagets Namn | Ligakod | Logo URL | Slug
```

Use these league codes:

| Ligakod | Liga |
| ---: | --- |
| `1` | Allsvenskan |
| `2` | Superettan |
| `3` | Övriga |

Example:

```text
Malmö FF | 1 | https://.../malmo.png | malmo
Exempel FC | 2 | https://.../exempel.png | exempel-fc
Lokalt lag | 3 | https://.../lokalt.png | lokalt-lag
```

**To move a team between leagues, only change `Ligakod` in the sheet.**

The site will automatically place it under the corresponding league tab.

## Google Sheets – chants

Each team should have a sheet/tab whose name matches its `Slug`.
The expected columns are:

```text
Title | Description | AudioURL
```

The chant sheet is read through Google's public `gviz` CSV endpoint. This means there is no Google API key in the frontend bundle.

The spreadsheets therefore need to be readable publicly. Do not put private information or secrets in them.

## Security

Do **not** add API keys, passwords or SMTP credentials to `runtimeConfig.public`, `.env` committed to the repository, or frontend JavaScript. Anything used by the browser can be inspected by visitors.

This project intentionally does not use the Google Sheets API key. The previous `NUXT_PUBLIC_GOOGLE_SHEETS_API_KEY` configuration has been removed.

For local development, copy `.env.example` to `.env` only if you later add server-only credentials.

## Setup

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Generate a static site:

```bash
npm run generate
```

## License

MIT. See `LICENSE`.
