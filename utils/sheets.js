const TEAM_SHEET_ID = "1EUnZmcCLt-3v1w_qiPugEAZ0lBXKABk02QTdyZTNxxk";
const CHANTS_SHEET_ID = "19tGjwPE8Zd_CQe0Ar2eNUJlSzlD5K4u3Mf2amHHAGrQ";

/**
 * Public Google Sheets endpoints. No API key is used, so no secret is shipped
 * to the browser. The spreadsheets must be shared/published so they can be read.
 */
export const TEAM_SHEET_URL = `https://docs.google.com/spreadsheets/d/${TEAM_SHEET_ID}/export?format=csv`;

export const getChantsSheetUrl = (team) =>
  `https://docs.google.com/spreadsheets/d/${CHANTS_SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(team)}`;

// Small CSV parser that also handles quoted values containing commas/newlines.
export const parseCsv = (csv) => {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let i = 0; i < csv.length; i += 1) {
    const char = csv[i];
    const next = csv[i + 1];

    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => cell.trim() !== "")) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }

  if (value !== "" || row.length) {
    row.push(value);
    if (row.some((cell) => cell.trim() !== "")) rows.push(row);
  }

  return rows;
};

export const LEAGUES = {
  1: { name: "Allsvenskan", slug: "allsvenskan" },
  2: { name: "Superettan", slug: "superettan" },
  3: { name: "Övriga", slug: "ovriga" },
};

export const getLeague = (code) => LEAGUES[Number(code)] ?? LEAGUES[3];
